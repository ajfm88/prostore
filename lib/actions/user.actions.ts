"use server";

import { signIn, signOut as signOutAuth } from "@/auth";
import { signInFormSchema } from "../validator";
import { AuthError } from "next-auth";

// Sign in the user with credentials
export async function signInWithCredentials(
  prevState: unknown,
  formData: FormData,
) {
  try {
    // Set user from form and validate it with Zod schema
    const user = signInFormSchema.parse({
      email: formData.get("email"),
      password: formData.get("password"),
    });

    await signIn("credentials", user);

    return { success: true, message: "Signed in successfully" };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { success: false, message: "Invalid email or password" };
        default:
          return { success: false, message: "Something went wrong" };
      }
    }
    throw error; // Re-throw other errors (like redirects)
  }
}

// Sign the user out
export async function signOut() {
  await signOutAuth();
}
