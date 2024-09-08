'use client';

import { useEffect, useState } from 'react';

export default function Header() {
  const [userid, setUserId] = useState('');
  useEffect(() => {
    setUserId(sessionStorage.getItem('user_id') || '');

    window.addEventListener('click', () => {
      setUserId(sessionStorage.getItem('user_id') || '');
    }); // This is a hack to update the user id when the user logs in

    return () => {
      setUserId('');
    };
  }, []);
  const handleLogout = () => {
    sessionStorage.removeItem('user_id');
    window.location.reload();
  };
  return (
    <div className="flex justify-between items-center px-8 py-4 mb-8">
      <p className="text-xl">RH</p>

      {userid ? (
        <button
          onClick={handleLogout}
          className="border border-red-500/50 bg-red-500/10 text-black px-6 py-2 font-semibold rounded-lg"
        >
          Logout
        </button>
      ) : null}
    </div>
  );
}
