"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signIn } from "@/lib/services/auth/signIn";
import { useState } from "react";
import { useRouter } from "next/navigation";

const validateEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorInfo, setErrorInfo] = useState<{ email?: string; auth?: string }>(
    {},
  );
  const router = useRouter();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);

    if (value === "") {
      setErrorInfo((prev) => ({ ...prev, email: "Мэйл хаягаа оруулна уу" }));
    } else if (!validateEmail.test(value)) {
      setErrorInfo((prev) => ({ ...prev, email: "Зөв мэйл хаяг оруулна уу" }));
    } else {
      setErrorInfo((prev) => ({ ...prev, email: "" }));
    }
  };

  const onSubmit = async () => {
    setErrorInfo((prev) => ({ ...prev, auth: "" }));
    try {
      const res = await signIn({ email, password });
      if (res.success) {
        router.push("/foods");
      } else {
        setErrorInfo((prev) => ({
          ...prev,
          auth: res.message ?? "Нэвтрэх мэдээлэл буруу байна",
        }));
      }
    } catch (err) {
      setErrorInfo((prev) => ({
        ...prev,
        auth: "Нэвтрэх мэдээлэл буруу байна",
      }));
    }
  };

  return (
    <div className="font-mono flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-[24px] font-semibold">Log in</h1>
        <p className="text-[16px] text-[#71717A]">
          Log in to enjoy your favorite dishes.
        </p>
      </div>
      {errorInfo.auth && (
        <p className="text-red-500 text-xs">{errorInfo.auth}</p>
      )}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <Input
            placeholder="Enter your email address"
            type="email"
            name="email"
            value={email}
            onChange={handleEmailChange}
            className="h-[36px] w-[416px] px-3 py-2"
          />
          {errorInfo.email && (
            <p className="text-red-500 text-xs">{errorInfo.email}</p>
          )}
        </div>
        <Input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="h-[36px] w-[416px] px-3 py-2"
        />
      </div>
      <Button
        onClick={onSubmit}
        disabled={!email || !password || !!errorInfo.email}
      >
        Let's Go
      </Button>
    </div>
  );
};
