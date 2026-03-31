"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signIn } from "@/lib/services/auth/signIn";
import { useState } from "react";

export default function Home() {
  return (
    <div>
      <div>
        <SignIn />
      </div>
      <div>
        <img src="" />
      </div>
    </div>
  );
}

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async () => {
    const credentials = {
      email,
      password,
    };
    try {
      await signIn(credentials);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Input
        placeholder="email"
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <Input
        placeholder="password"
        type="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      <Button onClick={onSubmit}>Sign In</Button>
    </div>
  );
};
