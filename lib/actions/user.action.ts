"use server";

import { createAdminClient, createSessionClient } from "@/lib/appwrite";
import { appwriteConfig } from "@/lib/appwrite/config";
import { ID, Query } from "node-appwrite";
import { parseStringify } from "@/lib/utils";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { avatarPlaceholderUrl } from "@/constant";

async function getUserByEmail(email: string) {
  const { databases } = await createAdminClient();
  const result = await databases.listDocuments(
    appwriteConfig.databaseId,
    appwriteConfig.usersCollectionId,
    [Query.equal("email", [email])],
  );
  return result.total > 0 ? result.documents[0] : null;
}

const handleError = (error: unknown, message: string) => {
  console.error(error, message);
  throw error;
};

export async function sendEmailOTP({ email }: { email: string }) {
  const { account } = await createAdminClient();
  try {
    const sessions = await account.createEmailToken(ID.unique(), email);
    return sessions.userId;
  } catch (error) {
    handleError(error, "Failed to send email OTP");
  }
}

export async function createAccount({
  fullName,
  email,
}: {
  fullName: string;
  email: string;
}) {
  const existingUser = await getUserByEmail(email);
  const accountId = await sendEmailOTP({ email });
  if (!accountId) {
    throw new Error("Failed to send an OTP");
  }
  if (!existingUser) {
    const { databases } = await createAdminClient();
    await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      ID.unique(),
      {
        fullName,
        email,
        avatar: avatarPlaceholderUrl,
        accountId,
      },
    );
  }
  return parseStringify({ accountId });
}

export async function verifySecret({
  accountId,
  password,
}: {
  accountId: string;
  password: string;
}) {
  try {
    const { account } = await createAdminClient();
    const session = await account.createSession(accountId, password);

    (await cookies()).set("appwrite-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    return parseStringify({ sessionId: session.$id });
  } catch (error) {
    handleError(error, "Failed to verify secret");
  }
}

export async function getCurrentUser() {
  const { databases, account } = await createSessionClient();

  const result = await account.get();

  const user = await databases.listDocuments(
    appwriteConfig.databaseId,
    appwriteConfig.usersCollectionId,
    [Query.equal("accountId", result.$id)],
  );

  if (user.total <= 0) return null;

  return parseStringify(user.documents[0]);
}

export async function signOutUser() {
  const { account } = await createSessionClient();
  try {
    await account.deleteSession("current");
    (await cookies()).delete("appwrite-session");
  } catch (error) {
    handleError(error, "Failed to sign out user");
  } finally {
    redirect(`/sign-in`);
  }
}

export async function singInUser({ email }: { email: string }) {
  try {
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      await sendEmailOTP({ email });
      return parseStringify({ accountId: existingUser.accountId });
    }
    return parseStringify({ accountId: null, error: "user not found" });
  } catch (error) {
    handleError(error, "Failed to send email OTP");
  }
}
