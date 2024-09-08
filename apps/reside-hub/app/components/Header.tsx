"use client";

import Image from "next/image";

export default function Header() {
  const handleLogout = () => {
    sessionStorage.removeItem('user_id');
    window.location.reload();
  };
  return (
    <div className="flex justify-between items-center px-8 py-4 mb-8">
      <Image src="/logo.png" alt="Logo" className="h-12 w-auto" width={364} height={153} />
      <img src="/logo.png" alt="Logo" className="h-12 w-auto" />
      <div className="flex gap-4">
        <button
          onClick={handleLogout}
          className="border border-red-500/50 bg-red-500/10 text-black px-6 py-2 font-semibold rounded-lg"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
