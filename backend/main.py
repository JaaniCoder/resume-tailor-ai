# backend/main.py
from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from groq import Groq
from bs4 import BeautifulSoup
import fitz
import json
import os
from pydantic import BaseModel
import requests
from datetime import datetime

load_dotenv()

app = FastAPI(title="Resume AI SaaS API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

GROQ_API_KEY = os.getenv("GROQ_API_KEY")
if not GROQ_API_KEY:
    print("WARNING: GROQ_API_KEY is not set in the environment.")
client = Groq(api_key=GROQ_API_KEY)

def extract_text_from_pdf(file_bytes: bytes) -> str:
    """Extracts raw text from a PDF file securely in-memory."""
    try:
        doc = fitz.open(stream=file_bytes, filetype="pdf")
        text = ""
        for page in doc:
            text += page.get_text()
        return text
    except Exception as e:
        raise ValueError(f"Failed to parse PDF: {str(e)}")

@app.post("/api/generate-resume")
async def generate_resume(
    target_role: str = Form(...),
    job_description: str = Form(None),
    file: UploadFile = File(None),
    file_url: str = Form(""), 
    custom_skills: str = Form(""),
    custom_instructions: str = Form("")
):
    if not file and not file_url:
        raise HTTPException(status_code=400, detail="Must provide either a PDF file or a file_url.")

    try:
        if file_url:
            response = requests.get(file_url)
            if response.status_code != 200:
                raise ValueError("Failed to download Master Resume from cloud storage.")
            file_bytes = response.content

        else:
            if not file.filename.endswith(".pdf"):
                raise HTTPException(status_code=400, detail="Only PDF files are supported.")
            file_bytes = await file.read()

        raw_text = extract_text_from_pdf(file_bytes)

    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

    system_prompt = (
        "You are an expert Executive Resume Writer and ATS Optimization Specialist. "
        "Your job is to rewrite the provided resume to perfectly match the target job role. "
        "CRITICAL RULES:\n"
        "1. Rewrite experience bullet points using the Google X-Y-Z formula: 'Accomplished [X] as measured by [Y], by doing [Z]'. "
        "DO NOT output the literal letters 'X', 'Y', or 'Z'. Blend the formula naturally into a professional sentence.\n"
        "2. ANTI-HALLUCINATION PROTOCOL: NEVER invent numbers. Use qualitative impact if numbers are missing.\n"
        "3. Inject highly relevant industry keywords natively into the text.\n"
        "4. Write a compelling, 3-sentence professional summary.\n"
        "5. Analyze the match to generate an ATS match score (0-100) and identify key industry keywords.\n"
        "6. You MUST return ONLY a valid JSON object matching this exact structure: "
        "{ 'personalInfo': {'name': '', 'email': '', 'phone': '', 'location': ''}, "
        "'summary': '', "
        "'skills': [], "
        "'experience': [ {'company': '', 'role': '', 'dates': '', 'points': []} ], "
        "'projects': [ {'name': '', 'role': '', 'dates': '', 'points': []} ], " 
        "'education': [ {'school': '', 'degree': '', 'dates': ''} ], "
        "'ats_insights': {'match_score': 0, 'matched_keywords': [], 'missing_keywords_added': []} }"
    )

    user_prompt = f"TARGET ROLE: {target_role}\n\n"

    if job_description:
        user_prompt += f"\nTARGET JOB DESCRIPTION TO MATCH:\n{job_description}"
        user_prompt += "CRITICAL INSTRUCTION: Analyze the above job description. You MUST weave the exact keywords, tools, and phrasing from this JD into the summary, skills and experience bullets.\n"

    user_prompt += f"\nOriginal Resume Text:\n{raw_text}\n"

    if custom_skills.strip():
        user_prompt += f"\nForce include these Skills: {custom_skills}\n"
    if custom_instructions.strip():
        user_prompt += f"\nSpecial Instructions: {custom_instructions}\n"

    try:
        completion = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_prompt}
            ],
            temperature=0.3,
            response_format={"type": "json_object"}
        )
        
        llm_response = json.loads(completion.choices[0].message.content)
        return {"status": "success", "data": llm_response}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"AI Generation failed: {str(e)}")


class TweakRequest(BaseModel):
    current_json: dict
    user_instruction: str

@app.post("/api/tweak-resume")
async def tweak_resume(request: TweakRequest):
    system_prompt = (
        "You are an expert AI Resume Editor Agent. "
        "You will receive an existing resume JSON object and a specific refinement instruction from the user. "
        "CRITICAL RULES:\n"
        "1. ANTI-DATA LOSS RULE: NEVER delete, shorten, or summarize existing experience bullets, projects, or education unless the user EXPLICITLY asks you to 'delete' or 'condense'. Keep all unchanged data 100% intact.\n"
        "2. If the user asks to add a Project or Education, add it to the 'projects' or 'education' arrays.\n"
        "3. Apply the user's requested edits precisely without altering the surrounding context.\n"
        "4. Recalculate the `ats_insights` if skills were altered.\n"
        "5. You MUST return ONLY the updated JSON object with the standard schema (personal_info, summary, skills, experience, projects, education, ats_insights)."
    )

    user_prompt = (
        f"CURRENT RESUME JSON:\n{json.dumps(request.current_json)}\n\n"
        f"USER REFINEMENT COMMAND:\n{request.user_instruction}"
    )

    try:
        completion = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_prompt}
            ],
            temperature=0.2, # Lower temperature for precise edits
            response_format={"type": "json_object"}
        )
        
        updated_json = json.loads(completion.choices[0].message.content)
        return {"status": "success", "data": updated_json}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"AI Tweak failed: {str(e)}")

class CoverLetterRequest(BaseModel):
    target_role: str
    company_name: str = "Hiring Manager"
    job_description: str = ""
    resume_json: dict

@app.post("/api/generate-cover-letter")
async def generate_cover_letter(request: CoverLetterRequest):
    current_date = datetime.now().strftime("%B %d, %Y")

    system_prompt = (
        "You are an Executive Career Coach and Professional Cover Letter Specialist. "
        "Your task is to write a compelling, tailored, 3-paragraph cover letter.\n"
        "RULES:\n"
        "1. FORMATTING: You must use the exact following header format with blank lines:\n"
        f"{current_date}\n\n"
        f"{request.company_name}\n\n"
        f"Dear {request.company_name},\n\n"
        "2. Paragraph 1: Hook the reader, mention the target role, and express enthusiastic interest.\n"
        "3. Paragraph 2: Highlight 2-3 key achievements from the resume that directly align with the role/job description.\n"
        "4. Paragraph 3: Strong closing with a confident call-to-action.\n"
        "5. Output ONLY the raw cover letter text. Do not include markdown code blocks or conversational filler."
    )

    user_prompt = (
        f"TARGET ROLE: {request.target_role}\n"
        f"COMPANY NAME / RECIPIENT: {request.company_name}\n"
        f"JOB DESCRIPTION:\n{request.job_description}\n\n"
        f"CANDIDATE RESUME DATA:\n{json.dumps(request.resume_json)}"
    )

    try:
        completion = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_prompt}
            ],
            temperature=0.4
        )
        
        cover_letter_text = completion.choices[0].message.content
        return {"status": "success", "cover_letter": cover_letter_text}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Cover letter generation failed: {str(e)}")

class LinkedInRequest(BaseModel):
    resume_json: dict

@app.post("/api/generate-linkedin")
async def generate_linkedin(request: LinkedInRequest):
    system_prompt = (
        "You are an expert LinkedIn Profile Optimizer. "
        "Your task is to take a provided resume JSON and convert it into a highly engaging, "
        "ready-to-paste LinkedIn profile format.\n"
        "RULES:\n"
        "1. Create 4 clear sections: '📝 ABOUT', '💼 EXPERIENCE', '🎓 EDUCATION', and '🛠️ SKILLS'.\n"
        "2. ABOUT: Write an engaging, first-person summary that sounds human, professional, and approachable. Keep it to 2-3 short paragraphs. End with a call to connect.\n"
        "3. EXPERIENCE: Format each role with the Company, Title, Dates, and a short summary of the best achievements (using 3-4 bullet points max per role, use this emoji for bullets: 🔹).\n"
        "4. EDUCATION & SKILLS: Format neatly as a list.\n"
        "5. Output ONLY the raw text to be copied. Do not use markdown code blocks like ```text."
    )

    user_prompt = f"RESUME JSON:\n{json.dumps(request.resume_json)}"

    try:
        completion = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_prompt}
            ],
            temperature=0.4
        )
        
        linkedin_text = completion.choices[0].message.content
        return {"status": "success", "linkedin_text": linkedin_text}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"LinkedIn generation failed: {str(e)}")

class ScrapeRequest(BaseModel):
    url: str

@app.post("/api/scrape-jd")
async def scrape_job_description(request: ScrapeRequest):
    try:
        headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'}
        response = requests.get(request.url, headers=headers, timeout=10)
        response.raise_for_status()

        soup = BeautifulSoup(response.text, 'html.parser')

        for script in soup(["script", "style", "nav", "footer", "header"]):
            script.extract()

        text = soup.get_text(separator=' ')

        lines = (line.strip() for line in text.splitlines())
        chunks = (phrase.strip() for line in lines for phrase in line.split("  "))
        clean_text = '\n'.join(chunk for chunk in chunks if chunk)

        return {"status": "success", "text": clean_text[:5000]}

    except Exception as e:
        raise HTTPException(status_code=400, detail="Could not scrape this URL due to website security. Please copy and paste the text manually.")