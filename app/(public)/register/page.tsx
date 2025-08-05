"use client";

import React, { useState } from "react";
import Input from "@/components/ui/input";
import PasswordInput from "@/components/ui/passwordInput";
import Button from "@/components/ui/button";
import { RegisterRequest } from "@/core/types/RegisterRequest";
import { useRouter } from "next/navigation";
import { ErrorResponse } from "@/core/types/ErrorResponse";
import { api } from "@/core/services/api";

export default function Register() {
  const router = useRouter();

  const [loading, setLoading] = useState<boolean>();
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState<RegisterRequest>({
    name: "",
    email: "",
    password: "",
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
      submitRegister();
    }
  };

  const submitRegister = async () => {
    try {
      setLoading(true);

      if (form.password.length < 8) {
        setError("Password must be at least 8 characters long." );
        return;
      }

      if (!isValidEmail(form.email)) {
        setError("The email provided is invalid.");
        return;
      }

      await api.post("/auth/register", form);

      router.replace("/login");
    } catch (e: unknown) {
      const error = e as ErrorResponse;
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <div className="absolute inset-0 w-full h-full px-4 flex items-center justify-center bg-primary">
      <div className="bg-white w-full rounded-xl p-6">
        <span className="text-xl font-black text-primary">WOD LOG</span>

        <h1 className="text-2xl font-bold text-center mt-8 mb-4">
          Create an account
        </h1>

        <form onKeyDown={handleKeyDown} className="space-y-10">
          <Input
            label="Name"
            placeholder="Your name"
            name="name"
            value={form.name}
            onChange={handleForm}
            error={!!error}
          />
          <Input
            label="Email"
            placeholder="your@email.com"
            name="email"
            type="email"
            value={form.email}
            onChange={handleForm}
            error={!!error}
          />
          <PasswordInput
            label="Password"
            placeholder="********"
            name="password"
            value={form.password}
            onChange={handleForm}
            error={!!error}
          />

          <Button type="button" onClick={submitRegister} disabled={loading}>
            {loading ? "Loading..." : "Register"}
          </Button>
        </form>

        {error && <span className="text-red-600 text-sm">{error}</span>}

        <p className="text-center text-gray-500 text-sm mt-2">
          Already have an account?{" "}
          <a
            href="register"
            className="text-primary hover:underline font-semibold"
          >
            Log in
          </a>
        </p>
      </div>
    </div>
  );
}
