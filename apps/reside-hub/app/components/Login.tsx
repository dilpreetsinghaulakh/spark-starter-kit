'use client';
import { useState } from 'react';
import { supabase } from '../api/supabase';

export default function LoginFrom({
  setUserId,
}: {
  setUserId: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const signIn = async () => {
    let { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      setError(error.message);
      return;
    }

    setUserId(data.user!.id);

    sessionStorage.setItem('user_id', data.user!.id);
  };

  const handleLoginClick = () => {
    error && setError('');
    signIn();
  };

  return (
    <div className="flex flex-col gap-4 h-screen w-full justify-center">
      <h1 className="text-5xl font-bold mb-8">Login</h1>
      <label htmlFor="email">Email</label>
      <input
        id="email"
        className="border border-gray-300 px-4 py-2 rounded-lg"
        type="text"
        placeholder="user@email.com"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <label htmlFor="password">Password</label>

      <input
        id="password"
        className="border border-gray-300 px-4 py-2 rounded-lg"
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <p className="text-red-500">{error ? error : ' '}</p>

      <button
        className="border-2 border-transparent bg-blue-600 text-white hover:border-blue-800 active:border-blue-800 font-bold py-2 rounded-lg transition-colors"
        onClick={handleLoginClick}
      >
        Login
      </button>
    </div>
  );
}
