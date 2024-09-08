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
    <div>
      <svg
        className="fixed h-screen w-auto top-0 left-1/2 -translate-x-1/2 -z-10 "
        width="1512"
        height="1010"
        viewBox="0 0 1512 1010"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0_326_14)">
          <g opacity="0.9">
            <g filter="url(#filter0_f_326_14)">
              <path
                d="M110.5 892L1 1008H428L321 881L299.5 785L321 656.5L291.5 579.5L236 562L254.5 625.5L168 785L110.5 892Z"
                fill="#FFE920"
              />
              <path
                d="M322 890L272.5 1007.5H455L430 935V865L479.5 853L526 794H391.5V719.5L455 653H391.5L354.5 692L241.5 704.5L229 783L322 890Z"
                fill="#FF5E3B"
              />
              <path
                d="M367 831.5L432 1009.5H665.5L594.5 899.5L684 853V760L540.5 681.5L684 615L764.5 539L522 576L443 557.5L460 615L367 831.5Z"
                fill="#35F4F4"
              />
              <path
                d="M566 887.5L665 1010H1035V982L867.5 857L1001 742.5V632.5L895.5 547.5L770.5 510L721 532L762.5 573.5L566 643.5L646.5 818L566 887.5Z"
                fill="#B924FF"
              />
              <path
                d="M961 773L1053.5 1005.5H1386.5L1346 866L1401.5 751.5L1477.5 624.5L1323 577L1230 504L1053.5 550.5L961 773Z"
                fill="#00F0FF"
              />
              <path
                d="M720 1007.5H548.5L468 787.5L548.5 661L720 753.5L636.5 883.5L720 1007.5Z"
                fill="#FF0000"
              />
            </g>
          </g>
        </g>
        <defs>
          <filter
            id="filter0_f_326_14"
            x="-453"
            y="50"
            width="2384.5"
            height="1414"
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
          >
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            />
            <feGaussianBlur
              stdDeviation="227"
              result="effect1_foregroundBlur_326_14"
            />
          </filter>
          <clipPath id="clip0_326_14">
            <rect width="1512" height="1010" fill="white" />
          </clipPath>
        </defs>
      </svg>

      <h1 className="text-5xl mb-16">Welcome to Reside Hub</h1>

      <div className="flex flex-col gap-4 w-full justify-center bg-white/20 border border-gray-300 p-4 rounded-2xl shadow-2xl shadow-lack">
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

      <p className="text-black mt-4 text-center">
        Don't have an account?{' '}
        <a
          className="text-blue-600 hover:underline"
          href="https://app.supabase.io/"
          target="_blank"
          rel="noreferrer"
        >
          Sign up
        </a>
      </p>
    </div>
  );
}
