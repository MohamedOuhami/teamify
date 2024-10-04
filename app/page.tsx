"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
  const { status } = useSession();
  const router = useRouter();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-r from-[#0d1b2a] to-[#1b263b] text-white">
      <div className="text-center">
        <h1 className="text-5xl font-bold font-roboto mb-2">
          Start making teamwork
          <br />
          more FUN
        </h1>
        <h2 className="text-2xl font-roboto mb-8">
          Teamify is a simple and fun
          platform to gamify<br /> your teamwork experience
        </h2>
        <Link href="/register">
          <button className="bg-blue-500 text-white py-2 px-4 rounded shadow-lg hover:bg-blue-600 transition">
            Get Started
          </button>
        </Link>
      </div>
    </main>
  );
}
