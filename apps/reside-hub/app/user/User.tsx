'use client';

import { useEffect, useState } from 'react';
import fetchTenantData from './fetchTenantData';
import EnterHouseCode from './EnterHouseCode';

export default function UserScreen({ userId }: { userId: string }) {
  const [houseData, setHouseData] = useState<any[]>([]);

  async function getHouseData(tenant_id: string) {
    let data = await fetchTenantData(tenant_id);

    if (data) {
      setHouseData([...data]);
    }
  }

  useEffect(() => {
    getHouseData(userId);
  }, []);

  return (
    <div>
      {houseData.length ? (
        <p>User has a house</p>
      ) : (
        <EnterHouseCode tenant_id={userId} />
      )}
    </div>
  );
}
