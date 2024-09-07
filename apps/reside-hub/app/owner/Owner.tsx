'use client';
import { useEffect, useState } from 'react';
import fetchUserData from '../api/fetchUserData';
import fetchHouseData from './fetchHouseData';
import AddHouse from './AddHouse';
import { ChevronDown, Edit, MapPin, X } from 'react-feather';
import EditHouse from './EditHouse';
import editHouseData from './editHouseData';
import editNotification from './editNotification';
import editPendingRent from './editPendingRent';

function HouseCard({
  house,
  setEditHouseId,
  setEditHouseOverlay,
  editHouseOverlay,
}: {
  house: any;
  setEditHouseId: any;
  setEditHouseOverlay: any;
  editHouseOverlay: any;
}) {
  const [notificationLength, setNotificationLength] = useState(0);
  const [input, setInput] = useState('');
  const [inputOpen, setInputOpen] = useState(false);

  useEffect(() => {
    if (house.notification) {
      setNotificationLength(house.notification.length);
    }
  }, [house]);

  const addNotification = async () => {
    async function addNotification() {
      await editNotification(house.id, house.notification);
    }

    await addNotification();
  };

  const [historyOpen, setHistoryOpen] = useState(false);

  //   console.log(
  //     'history',
  //     house.history[house.history.length - 1].payment.toString().split('T')[0]
  //   );
  //   console.log('lease', house.lease_date.toString().split('T')[0].split('-')[2]);

  //   console.log('today', new Date().toISOString().split('T')[0].split('-')[2]);

  const todayDate = new Date().toISOString().split('T')[0].split('-')[2];
  const todayMonth = new Date().toISOString().split('T')[0].split('-')[1];

  const editPending = async (house_id: string, pending_rent: number) => {
    async function edit(house_id: string, pending_rent: number) {
      await editPendingRent(house_id, pending_rent);
    }

    await edit(house_id, pending_rent);
  };

  const historyDate = house.history[house.history.length - 1].payment
    .toString()
    .split('T')[0]
    .split('-')[2];
  const historyMonth = house.history[house.history.length - 1].payment
    .toString()
    .split('T')[0]
    .split('-')[1];

  const leaseDate = house.lease_date.toString().split('T')[0].split('-')[2];

  //   console.log('history', historyDate, historyMonth);
  //   console.log('today', todayDate, todayMonth);
  //   console.log('lease', leaseDate);

  if (todayDate >= leaseDate && todayMonth != historyMonth) {
    console.log('Rent is due', house.house_name);

    if (house.pending_rent <= 0) {
      editPending(house.id, house.rent_price);
    }
  }

  return (
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
      <p className="font-bold italic text-3xl text-gray-500"># {house.id}</p>
      <p className="text-lg font-semibold">{house.house_name}</p>
      <p className="flex items-center gap-2 text-gray-600">
        <MapPin /> {house.house_address}
      </p>

      {house.tenant_id ? (
        <>
          <div className="flex gap-2 items-center">
            {house.pending_rent > 0 ? (
              <>
                <div className="w-2 h-2 mx-2 rounded-full bg-red-500 animate-pulse"></div>
                <p>Rent is due (${house.pending_rent})</p>
              </>
            ) : (
              <>
                <div className="w-2 h-2 mx-2 rounded-full bg-green-500"></div>
                Property is occupied
              </>
            )}
          </div>

          {house.history ? (
            <div className="">
              <button
                onClick={() => {
                  setHistoryOpen(!historyOpen);
                }}
                className="flex gap-2 items-center"
              >
                <div className="p-1">
                  <ChevronDown
                    className={
                      'w-4 h-auto ' + (historyOpen ? 'rotate-180' : '')
                    }
                  />
                </div>
                <p>Payment History</p>
              </button>

              <div className={historyOpen ? 'h-full' : 'h-0 overflow-hidden'}>
                {house.history.map((history: any, index: number) => (
                  <div
                    key={index}
                    className="flex gap-2 items-center justify-between "
                  >
                    <p>{history.payment}</p>
                    <p>$ {history.rent}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          <div className="bg-white p-2 rounded-xl">
            {notificationLength ? (
              <>
                <p className="text-sm font-semibold">
                  Notifications • {notificationLength}
                </p>

                {house.notification.map((notification: any, index: number) => (
                  <div
                    key={index}
                    className="flex gap-2 items-center justify-between bg-gay-200  rounded-lg"
                  >
                    <p>{notification}</p>
                    <button
                      onClick={() => {
                        house.notification.splice(index, 1);
                        setNotificationLength(house.notification.length);
                        addNotification();
                      }}
                      className="text-red-500 py-2 font-semibold rounded-lg"
                    >
                      <X className="stroke-[3]" />
                    </button>
                  </div>
                ))}
              </>
            ) : null}

            {inputOpen ? (
              <div className="flex gap-2 items-center">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => {
                    setInput(e.target.value);
                  }}
                  placeholder="Add a notification"
                  className="bg-gray-100 p-2 rounded-lg"
                />
              </div>
            ) : null}

            <button
              onClick={() => {
                if (inputOpen) {
                  if (input) {
                    house.notification.push(input);

                    setNotificationLength(house.notification.length);
                    addNotification();
                    setInput('');
                  }
                }
                setInputOpen(!inputOpen);
              }}
              className="bg-lime-300 w-full text-black px-8 py-2 font-semibold rounded-lg flex items-center justify-center gap-2"
            >
              {inputOpen ? 'Done' : 'Add Notification'}
            </button>
          </div>
        </>
      ) : (
        <div className="flex gap-2 items-center">
          <div className="w-2 h-2 mx-2 rounded-full bg-amber-500"></div>
          Vacant
        </div>
      )}
    </div>
  );
}

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
    // setTimeout(() => {
    getHouseData(userId);
    // }, 100);
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
          //   <>
          houseData.map((house, index) => (
            <HouseCard
              key={index}
              house={house}
              setEditHouseId={setEditHouseId}
              setEditHouseOverlay={setEditHouseOverlay}
              editHouseOverlay={editHouseOverlay}
            />
          ))
        ) : (
          //     <p>Have house</p>
          //     <button
          //       onClick={() => {
          //         setAddHouseOverlay(!addHouseOverlay);
          //       }}
          //       className="bg-lime-300 text-black px-8 py-2 font-semibold rounded-lg"
          //     >
          //       Add a house
          //     </button>
          //   </>
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
