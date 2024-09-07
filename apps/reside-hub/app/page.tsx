'use client';
import { useEffect, useState } from 'react';
import { supabase } from './api/supabase';
import LoginFrom from './components/Login';
import fetchUserData from './api/fetchUserData';
import Owner from './owner/Owner';

export default function Index() {
  const [user, setUser] = useState('');
  const [isOwner, setIsOwner] = useState('');

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userId = sessionStorage.getItem('user_id');
    if (userId) {
      setUser(userId);

      async function fetchData(id: string) {
        let data = await fetchUserData(id);

        if (data && data[0]) {
          setIsOwner(data[0].is_owner);
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
        isOwner ? (
          <Owner userId={user} />
        ) : (
          <div>Not an owner</div>
        )
      ) : (
        <LoginFrom setUserId={setUser} />
      )}
    </div>
  );
}
