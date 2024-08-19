"use client";
import { useSession } from "next-auth/react";

import NoSession from "./component/noSession";
import WithSession from "./component/withSession";

export default function Home() {
  const { data: session } = useSession();

  return (
    <div className="flex min-h-[85vh] w-screen bg-gradient-to-b items-center justify-center from-teal-300  to-blue-500">
      <div className="flex flex-col bg-white p-10 rounded-lg">
        <h1 className="text-3xl font-extrabold text-black mb-6">
          Aplikasi Todo List
        </h1>
        {session ? (
          <WithSession
            user={session.user.id || session.user.email.match(/[a-zA-Z0-9]+/g)}
          />
        ) : (
          <NoSession />
        )}
      </div>
    </div>
  );
}
