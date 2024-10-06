"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@mui/material";

export default function Home() {
  const { status } = useSession();
  const router = useRouter();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-r from-[#0d1b2a] to-[#1b263b] text-white relative">
      <div className="relative w-full"> {/* Full width container */}
        {/* Image container */}
        <Image
          src={"/macbook.png"} // Ensure the path to the image is correct
          alt="Macbook Image"
          width={6000} // Increased width to 6000px
          height={3500} // Adjusted height proportionally
          style={{ opacity: 0.8 }}
          className="w-full h-auto max-w-[5000px] object-cover" // Ensure full width with max size
        />

        {/* Text over the image */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-5xl font-bold font-roboto mb-2 z-10">
            Start making teamwork
            <br className="my-5" />
            <span className="bg-white text-[#303036] px-2">more FUN</span>
          </h1>
          <h2 className="text-2xl font-roboto my-4 z-10">
            Teamify is a simple and fun
            platform to gamify<br /> your teamwork experience
          </h2>
          <Button
            sx={{ bgcolor: "#EF76FF", ml: 1, fontSize: 15 }}
            variant="contained"
          >
            <Link href="/register" className="text-white">Get started</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
