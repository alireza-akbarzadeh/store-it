// node-appwrite

import { Account, Client, Databases } from "node-appwrite";
import { appwriteConfig } from "@/lib/appwrite/config";
import { cookies } from "next/headers";

export async function createSessionClient() {
  const client = new Client()
    .setEndpoint(appwriteConfig.endpointUrl)
    .setProject(appwriteConfig.projectId);

  const session = (await cookies()).get("appwrite-session");
  if (!session || !session.value) throw new Error("No Session");
  client.setSession(session.value);

  return {
    get account() {
      return new Account(client);
    },
    get dateBases() {
      return new Databases(client);
    },
  };
}

export async function createAdminClient() {}
