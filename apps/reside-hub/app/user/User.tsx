import { ReactNode, useEffect, useState } from 'react';
import fetchTenantData from './fetchTenantData';
import EnterHouseCode from './EnterHouseCode';
import { AlertCircle, MapPin } from 'react-feather';
import fetchUserData from '../api/fetchUserData';

interface HouseData {
  house_address: ReactNode;
  house_name: ReactNode;
  id: string;
  rent_price: number;
  notification: string[];
  pending_rent: number; // Add the 'pending_rent' property
}

interface UserScreenProps {
  userId: string;
}

export default function UserScreen({ userId }: UserScreenProps) {
  const [houseData, setHouseData] = useState<HouseData[]>([]);

  const [userName, setUserName] = useState('');

  // Fetch house data for the tenant
  async function getHouseData(tenant_id: string) {
    let data = await fetchTenantData(tenant_id);
    if (data) {
      setHouseData([...data]);
    }
  }

  useEffect(() => {
    getHouseData(userId);
    async function getUserName(id: string) {
      let data = await fetchUserData(id);

      if (data && data[0]) {
        setUserName(data[0].name);
        console.log(data[0].name);
      }
    }

    getUserName(userId);

    getHouseData(userId);
  }, [userId]);

  return (
    <div className="flex flex-col ">
      {houseData.length ? (
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2 items-center">
            {houseData[0].notification.length
              ? houseData[0].notification.map((notification, index: number) => (
                  <div
                    key={index}
                    className="bg-slate-100 border border-dashed border-slate-400 flex items-center gap-2 px-4 py-2 rounded-3xl"
                  >
                    <AlertCircle /> <p>{notification}</p>
                  </div>
                ))
              : null}
          </div>
          <h1 className="text-5xl">
            <span className=" italic font-thin">Welcome,</span> {userName}{' '}
            <span className=" italic font-thin">to</span>{' '}
            {houseData[0].house_name}
          </h1>
          <p className="flex items-center gap-1 italic text-gray-600">
            <MapPin className="w-4 h-auto" />
            {houseData[0].house_address}
          </p>
          <h2 className="text-4xl font-semibold  text-black ">Payment</h2>
          <div className="bg-gradient-to-br from-sky-600 to-purple-500 p-4 rounded-2xl shadow-2xl text-white">
            <div>
              <p className="text-2xl font-semibold">Rent</p>
              <p className="text-4xl font-bold">
                {houseData[0].rent_price}
                <span className="text-2xl font-semibold"> USD</span>
              </p>
              <p>Per month</p>
            </div>
            <div className="border-b border-dashed border-white/50 my-4"></div>
            <div>
              <p className="text-2xl font-semibold">Pending Amount</p>
              <p className="text-4xl font-bold">{houseData[0].pending_rent}</p>
            </div>
            <button
              className="bg-white text-black w-full font-semibold px-2 py-2 rounded-full mt-4"
              onClick={() => window.location.reload()}
            >
              Pay Now
            </button>
          </div>
        </div>
      ) : (
        <EnterHouseCode tenant_id={userId} />
      )}
    </div>
  );
}
