import { DefaultSession } from "next-auth";

declare module "next-auth" {
  export interface Session {
    user: {
      id: string;
      role: string;
    } & DefaultSession["user"];
  }

  // Returned by `authorize` and passed to the `jwt` callback as `user`
  export interface User {
    role: string;
  }
}

// `next-auth/jwt` is a bare `export * from "@auth/core/jwt"`, so augmenting it
// declares a new unrelated interface instead of merging. Augment the source.
declare module "@auth/core/jwt" {
  export interface JWT {
    role: string;
  }
}
