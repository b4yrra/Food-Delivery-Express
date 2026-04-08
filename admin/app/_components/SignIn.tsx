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

    setErrorInfo((prev) => ({ ...prev, email: "", auth: "" }));

    if (value === "") {
      setErrorInfo((prev) => ({ ...prev, email: "Мэйл хаягаа оруулна уу" }));
    } else if (!validateEmail.test(value)) {
      setErrorInfo((prev) => ({ ...prev, email: "Зөв мэйл хаяг оруулна уу" }));
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (errorInfo.auth) {
      setErrorInfo((prev) => ({ ...prev, auth: "" }));
    }
  };

  const onSubmit = async () => {
    setErrorInfo((prev) => ({ ...prev, auth: "" }));
    try {
      const res = await signIn({ email, password });

      if (res.success) {
        if (res.role === "Admin") {
          // ← fixed: capital A to match Prisma enum
          router.push("/foods");
        } else {
          window.location.href =
            "https://https://food-delivery-client-liart.vercel.app";
        }
      } else {
        let errorMessage = "Нэвтрэх мэдээлэл буруу байна";
        if (res.message === "User not found")
          errorMessage = "Хэрэглэгч олдсонгүй";
        else if (res.message === "Invalid password")
          errorMessage = "Нууц үг буруу байна";
        setErrorInfo((prev) => ({ ...prev, auth: errorMessage }));
      }
    } catch (err) {
      setErrorInfo((prev) => ({
        ...prev,
        auth: "Системийн алдаа гарлаа. Дахин оролдоно уу",
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
          {(errorInfo.email || errorInfo.auth) && (
            <p className="text-red-500 text-xs">
              {errorInfo.email || errorInfo.auth}
            </p>
          )}
        </div>
        <Input
          placeholder="Password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
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
