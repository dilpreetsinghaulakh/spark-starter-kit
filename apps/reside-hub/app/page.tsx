'use client';
import { useEffect, useState } from 'react';
import { supabase } from './api/supabase';
import LoginFrom from './components/Login';
import fetchUserData from './api/fetchUserData';

export default function Index() {
  const [user, setUser] = useState('');
  const [userName, setUserName] = useState('');

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userId = sessionStorage.getItem('user_id');
    if (userId) {
      setUser(userId);

      async function fetchData(id: string) {
        let data = await fetchUserData(id);

        if (data && data[0]) {
          setUserName(data[0].name);
        }
      }

      fetchData(userId);
    }

    setLoading(false);
  }, [user]);

  return loading ? (
    <div>Loading...</div>
  ) : (
    <div className="px-8">
      {user ? (
        <div>Welcome, {userName}</div>
      ) : (
        <LoginFrom setUserId={setUser} />
      )}
    </div>
  );
}
