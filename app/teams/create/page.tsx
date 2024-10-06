"use client";
import { FormEvent, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { register } from "@/app/actions/auth/register";
import { useSession } from "next-auth/react";
import { createTeam } from "@/app/actions/teams/createTeam";


export default function CreateTeam() {
    const [error, setError] = useState<string>();
    const router = useRouter();
    const ref = useRef<HTMLFormElement>(null);
    const {data} = useSession()

    const handleSubmit = async (formData: FormData) => {

        formData.set('leader_email', data?.user?.email || '');

        console.log(formData);

        const r = await createTeam({
            name: formData.get("name"),
            description: formData.get("description"),
            leader_email: formData.get("leader_email")
        });
        ref.current?.reset();

        console.log("Created the team");
        
        // if (r?.error) {
        //     setError(r.error);
        //     return;
        // } else {
        //     return router.push("/login");
        // }
    };

    return (
        <section className="w-full h-screen flex items-center justify-center">
            <form ref={ref}
                action={handleSubmit}
                className="p-6 w-full max-w-[400px] flex flex-col justify-between items-center gap-2 
            border border-solid border-black bg-white rounded">
                {error && <div className="">{error}</div>}
                <h1 className="mb-5 w-full text-2xl font-bold">Create team</h1>

                <label className="w-full text-sm">Team name</label>
                <input
                    type="text"
                    placeholder="Team name"
                    className="w-full h-8 border border-solid border-black py-1 px-2.5 rounded text-[13px]"
                    name="name"
                />

                <label className="w-full text-sm">Team description</label>
                <input
                    type="text"
                    placeholder="Description"
                    className="w-full h-8 border border-solid border-black py-1 px-2.5 rounded"
                    name="description"
                />

               

                <button className="w-full border border-solid border-black py-1.5 mt-2.5 rounded
            transition duration-150 ease hover:bg-black">
                    Create
                </button>
            </form>
        </section>
    )
}
