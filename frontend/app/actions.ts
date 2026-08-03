"use server";

import { auth, currentUser } from "@clerk/nextjs/server";
import { prisma } from "../lib/prisma";

export async function saveResume(targetRole: string, jsonData: string) {
  try {
    const { userId } = await auth();
    const user = await currentUser();

    if (!userId || !user) {
      return { success: false, error: "Unauthorized" };
    }

    const email = user.emailAddresses[0]?.emailAddress || "";

    await prisma.user.upsert({
      where: { id: userId },
      update: { email },
      create: { id: userId, email },
    });

    const resume = await prisma.resume.create({
      data: {
        userId,
        targetRole,
        jsonData,
      },
    });

    return { success: true, id: resume.id };
  } catch (error) {
    console.error("Failed to save resume:", error);
    return { success: false, error: "Internal Server Error" };
  }
}

export async function getUserResumes() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return { success: false, error: "Unauthorized" };
    }

    const rawResumes = await prisma.resume.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });

    const resumes = rawResumes.map((item) => ({
      ...item,
      jsonData: JSON.parse(item.jsonData),
    }));

    return { success: true, resumes };
  } catch (error) {
    console.error("Failed to fetch history:", error);
    return { success: false, error: "Internal Server Error" };
  }
}

export async function syncUserAndGetCredits() {
  try {
    const { userId } = await auth();
    const user = await currentUser();

    if (!userId || !user) {
      return { success: false, credits: 0 };
    }

    const email = user.emailAddresses[0]?.emailAddress || "";

    const dbUser = await prisma.user.upsert({
      where: { id: userId },
      update: {},
      create: { id: userId, email, credits: 3 },
    });

    return { success: true, credits: dbUser.credits };
  } catch (error) {
    console.error("Failed to sync user:", error);
    return { success: false, credits: 0}
  }
}

export async function deductCredit() {
  try {
    const { userId } = await auth();
    if (!userId) return { success: false, error: "Unauthorized" };

    const user = await prisma.user.findUnique({ where: {id: userId } });
    if (!user || user.credits <= 0) {
      return { success: false, error: "Insufficient credits. Please upgrade." };
    }

    await prisma.user.update({
      where: { id: userId },
      data: { credits: { decrement: 1 } },
    });

    return { success: true };
  } catch (error) {
    console.error("Failed to deduct credit:", error);
    return { success: false, error: "Internal Server Error" };
  }
}

export async function saveMasterResumeUrl(url: string) {
  try {
    const { userId } = await auth();
    if (!userId) return { success: false, error: "Unauthorized" };

    await prisma.user.update({
      where: { id: userId },
      data: { masterResumeUrl: url },
    });

    return { success: true };
  } catch (error) {
    console.error("Failed to save master resume URL:", error);
    return { success: false, error: "Database error" };
  }
}

export async function getMasterResumeUrl() {
  try {
    const { userId } = await auth();
    if (!userId) return { success: false, url: null };

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { masterResumeUrl: true },
    });

    return { success: true, url: user?.masterResumeUrl || null };
  } catch {
    return { success: false, url: null };
  }
}

export async function deleteUserResume(id: string) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return { success: false, error: "Unauthorized - Please log in." };
    }

    const existingResume = await prisma.resume.findUnique({
      where: { id },
    });

    if (!existingResume) {
      return { success: false, error: "Resume not found" };
    }

    if (existingResume.userId !== userId) {
      return { success: false, error: "You do not have permission to delete this resume" };
    }

    await prisma.resume.delete({
      where: { id },
    });

    return { success: true };
  } catch (error) {
    console.error("Failed to delete resume:", error);
    return { success: false, error: "Failed to delete resume" };
  }
}