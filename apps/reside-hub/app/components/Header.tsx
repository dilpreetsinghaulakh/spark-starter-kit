"use client";
export default function Header() {
  const handleLogout = () => {
    sessionStorage.removeItem('user_id');
    window.location.reload();
  };
  return (
    <div className="flex justify-between items-center px-8 py-4 mb-8">
      <p className="text-4xl">RH</p>
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
