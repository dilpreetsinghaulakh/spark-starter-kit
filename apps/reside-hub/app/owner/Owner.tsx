'use client';
import { useEffect, useState } from 'react';
import fetchUserData from '../api/fetchUserData';
import fetchHouseData from './fetchHouseData';
import AddHouse from './AddHouse';
import { Edit, MapPin } from 'react-feather';
import EditHouse from './EditHouse';

export default function Owner({ userId }: { userId: string }) {
  //   const [overlay, setOverlay] = useState(false);
  const [addHouseOverlay, setAddHouseOverlay] = useState(false);
  const [editHouseOverlay, setEditHouseOverlay] = useState(false);
  const [editHouseId, setEditHouseId] = useState('');

  const [userName, setUserName] = useState('');

  const [loading, setLoading] = useState(true);
  const [houseData, setHouseData] = useState<any[]>([]);

  async function getHouseData(owner_id: string) {
    let data = await fetchHouseData(owner_id);

    if (data) {
      setHouseData([...data]);
    }
  }

  useEffect(() => {
    async function getUserName(id: string) {
      let data = await fetchUserData(id);

      if (data && data[0]) {
        setUserName(data[0].name);
      }
    }

    getUserName(userId);

    getHouseData(userId);

    setLoading(false);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      getHouseData(userId);
    }, 100);
  }, [addHouseOverlay, editHouseOverlay]);

  return loading ? (
    <div>Loading...</div>
  ) : (
    <div className="flex flex-col gap-8">
      <AddHouse
        owner_id={userId}
        overlay={addHouseOverlay as boolean}
        setOverlay={setAddHouseOverlay}
      />
      <EditHouse
        owner_id={userId}
        house_id={editHouseId}
        overlay={editHouseOverlay as boolean}
        setOverlay={setEditHouseOverlay}
      />
      <h1 className="text-5xl">
        <span className=" italic font-thin">Welcome,</span> {userName}
      </h1>

      <div className="flex flex-col gap-8">
        <h2 className="text-3xl">Your Houses</h2>
        {houseData.length ? (
          <>
            {houseData.map((house) => (
              <div
                className="flex flex-col relative gap-2 bg-gray-100 border border-gray-300 p-2 rounded-xl"
                key={house.id}
              >
                <button
                  onClick={() => {
                    setEditHouseId(house.id);
                    setEditHouseOverlay(!editHouseOverlay);
                  }}
                  className="absolute right-2"
                >
                  <Edit />
                </button>
                <p className="font-bold italic text-3xl text-gray-500">
                  # {house.id}
                </p>
                <p className="text-lg font-semibold">{house.house_name}</p>
                <p className="flex items-center gap-2 text-gray-600">
                  <MapPin /> {house.house_address}
                </p>
              </div>
            ))}
            <button
              onClick={() => {
                setAddHouseOverlay(!addHouseOverlay);
              }}
              className="bg-lime-300 text-black px-8 py-2 font-semibold rounded-lg"
            >
              Add a house
            </button>
          </>
        ) : (
          <div className="flex flex-col justify-center gap-8">
            <p className="text-center italic text-gray-600">
              You have not added any house.
            </p>
            <button
              onClick={() => {
                setAddHouseOverlay(!addHouseOverlay);
              }}
              className="bg-lime-300 text-black px-8 py-2 font-semibold rounded-lg"
            >
              Add a house
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
