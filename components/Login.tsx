// components/Login.tsx
"use client";

import { withAuthenticator } from "@aws-amplify/ui-react";
import { AuthUser } from "aws-amplify/auth";
import { redirect } from "next/navigation";
import { useEffect } from "react";

function Login({ user }: { user?: AuthUser }) {
  useEffect(() => {
    if (user) {
        console.log(user, "user logged in")   
      redirect("/");
    }
  }, [user]);
  return null;
}

export default withAuthenticator(Login);