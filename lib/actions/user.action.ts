"use server";

import { createAdminClient } from "@/lib/appwrite";
import { appwriteConfig } from "@/lib/appwrite/config";
import { Query, ID } from "node-appwrite";
import { parseStringify } from "@/lib/utils";

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

async function sendEmailOTP({ email }: { email: string }) {
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
        avatar:
          "https://cloud.appwrite.io/v1/avatars/initials?name=Alireza+Akbarzadeh&width=80&height=80&project=console&name=Alireza+Akbarzadeh&width=80&height=80&project=console",
        accountId,
      },
    );
  }
  return parseStringify({ accountId });
}
