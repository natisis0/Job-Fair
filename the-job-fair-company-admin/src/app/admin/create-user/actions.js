"use server";

import { clerkClient } from "@clerk/nextjs/server";
import { auth } from "@clerk/nextjs/server";

export async function createAdminUser(formData) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const email = formData.get("email");
  const password = formData.get("password");
 

  if (!email || !password) {
    throw new Error("Email and password are required");
  }

  try {

    const client = await clerkClient();
    const user = await client.users.createUser({
      emailAddress: [email],
      password: password,
      publicMetadata: {
        role: "admin",
      },
    });

    return { success: true, user: { id: user.id, email: email } };
  } catch (error) {
    // Log full error details for debugging
    if (error.errors) {
      console.error("Clerk API Errors:", JSON.stringify(error.errors, null, 2));
    } else {
      console.error("Error creating user:", error);
    }
    
    // Return a more descriptive error if available
    const errorMessage = error.errors?.[0]?.message || error.message || "Failed to create user";
    return { success: false, error: errorMessage };
  }
}
