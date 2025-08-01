"use client";

import React, { useState } from "react";
import Button from "@/components/ui/button";
import Checkbox from "@/components/ui/checkbox";
import Input from "@/components/ui/input";
import PasswordInput from "@/components/ui/passwordInput";
import { LoginRequest } from "@/core/types/LoginRequest";
import { ErrorResponse } from "@/core/types/ErrorResponse";
import { LoginResponse } from "@/core/types/LoginResponse";
import { api } from "@/core/services/api";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();

  const [loading, setLoading] = useState<boolean>();
  const [error, setError] = useState<ErrorResponse | null>(null);
  const [form, setForm] = useState<LoginRequest>({
    email: "",
    password: "",
    rememberMe: false,
  });

  const handleForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      submitLogin();
    }
  };

  const setCookie = (name: string, value: string, remember: boolean) => {
    const maxAge = remember ? 160000000 : "";
    document.cookie = `${name}=${value}; path=/; max-age=${maxAge}; Secure; SameSite=Strict`;
  };

  const submitLogin = async () => {
    try {
      setLoading(true);

      const response: LoginResponse = await api.post("/auth/login", form);

      setCookie("authToken", response.token, form.rememberMe);
      setCookie("userId", response.user._id, form.rememberMe);

      router.replace("/");
    } catch (e: unknown) {
      setError(e as ErrorResponse);
      setLoading(false);
    }
  };

  return (
    <div className="absolute inset-0 w-full h-full px-4 flex items-center justify-center bg-primary">
      <div className="bg-white w-full rounded-xl p-6">
        <span className="text-xl font-black text-primary">WOD LOG</span>

        <h1 className="text-2xl font-bold text-center mt-8 mb-4">Sign in</h1>

        <form onKeyDown={handleKeyDown} className="space-y-10">
          <Input
            label="Email"
            placeholder="your@email.com"
            name="email"
            type="email"
            value={form.email}
            onChange={handleForm}
            error={!!error}
          />

          <div className="flex flex-col gap-3">
            <PasswordInput
              label="Password"
              placeholder="********"
              name="password"
              value={form.password}
              onChange={handleForm}
              error={!!error}
            />

            <Checkbox
              label="Remember me"
              checked={form.rememberMe}
              onChange={(e) =>
                setForm({ ...form, rememberMe: e.target.checked })
              }
            />
          </div>

          <Button type="button" onClick={submitLogin} disabled={loading}>
            {loading ? "Loading..." : "Sign in"}
          </Button>
        </form>

        {error && <span className="text-red-600 text-sm">{error.message}</span>}

        <p className="text-center text-gray-500 text-sm mt-2">
          Don't have an account?{" "}
          <a
            href="register"
            className="text-primary hover:underline font-semibold"
          >
            Register
          </a>
        </p>
      </div>
    </div>
  );
}
