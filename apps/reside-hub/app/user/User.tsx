import { ReactNode, useEffect, useState } from 'react';
import fetchTenantData from './fetchTenantData';
import EnterHouseCode from './EnterHouseCode';
import { AlertCircle, MapPin } from 'react-feather';
import fetchUserData from '../api/fetchUserData';
import Payment from '../components/Payment';
import editPendingRent from '../owner/editPendingRent';
import addPayRent from './addPayRent';

interface HouseData {
  house_address: ReactNode;
  house_name: ReactNode;
  id: string;
  rent_price: number;
  notification: string[];
  pending_rent: number; // Add the 'pending_rent' property
  history: any[]; // Add the 'history' property
  lease_date: string; // Add the 'lease_date' property
  contacts?: any[]; // Add the 'emergency_contacts' property
}

interface UserScreenProps {
  userId: string;
}

export default function UserScreen({ userId }: UserScreenProps) {
  const [houseData, setHouseData] = useState<HouseData[]>([]);

  const [userName, setUserName] = useState('');

  const [paymentOpen, setPaymentOpen] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // Fetch house data for the tenant
  async function getHouseData(tenant_id: string) {
    let data = await fetchTenantData(tenant_id);
    if (data) {
      setHouseData([...data]);
    }
  }

  async function payRent(house_id: string, history: any[], rent: number) {
    async function pay(house_id: string, history: any[], rent: number) {
      await addPayRent(house_id, history, rent);
    }

    await pay(house_id, history, rent);
  }

  useEffect(() => {
    getHouseData(userId);
    async function getUserName(id: string) {
      let data = await fetchUserData(id);

      if (data && data[0]) {
        setUserName(data[0].name);
      }
    }

    getUserName(userId);

    getHouseData(userId);
  }, [userId]);

  useEffect(() => {
    if (paymentSuccess) {
      payRent(houseData[0].id, houseData[0].history, houseData[0].rent_price);

      setTimeout(() => {
        setPaymentSuccess(false);
        setPaymentOpen(false);

        window.location.reload();
      }, 3000);
    }
  }, [paymentSuccess]);

  useEffect(() => {
    if (!houseData.length) return;

    const todayDate = new Date().toISOString().split('T')[0].split('-')[2];
    const todayMonth = new Date().toISOString().split('T')[0].split('-')[1];

    const editPending = async (house_id: string, pending_rent: number) => {
      async function edit(house_id: string, pending_rent: number) {
        await editPendingRent(house_id, pending_rent);
      }

      await edit(house_id, pending_rent);
    };

    console.log(houseData);

    if (houseData[0].history !== undefined && houseData[0].history.length > 0) {
      let historyDate;
      let historyMonth;
      historyDate = houseData[0].history[
        houseData[0].history.length - 1
      ].payment
        .toString()
        .split('T')[0]
        .split('-')[2];
      historyMonth = houseData[0].history[
        houseData[0].history.length - 1
      ].payment
        .toString()
        .split('T')[0]
        .split('-')[1];

      const leaseDate = houseData[0].lease_date
        .toString()
        .split('T')[0]
        .split('-')[2];

      if (todayDate >= leaseDate && todayMonth != historyMonth) {
        if (houseData[0].pending_rent <= 0) {
          editPending(houseData[0].id, houseData[0].rent_price);
        }
      }
    }
  }, [houseData.length === 1]);

  return (
    <div className="flex flex-col ">
      {houseData.length ? (
        paymentOpen ? (
          paymentSuccess ? (
            <div className="bg-green-200 p-4 rounded-2xl text-green-800">
              Payment successful!
            </div>
          ) : (
            <>
              <Payment
                amount={houseData[0].pending_rent}
                setIsPaymentSuccess={setPaymentSuccess}
              />
              <button
                className="bg-white border border-black text-black w-full font-semibold px-2 py-2 rounded-full mt-4"
                onClick={() => setPaymentOpen(false)}
              >
                Cancel Payment
              </button>
            </>
          )
        ) : (
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2 items-center">
              {houseData[0].notification.length
                ? houseData[0].notification.map(
                    (notification, index: number) => (
                      <div
                        key={index}
                        className="bg-slate-100 border border-dashed border-slate-400 flex items-center gap-2 px-4 py-2 rounded-3xl"
                      >
                        <AlertCircle /> <p>{notification}</p>
                      </div>
                    )
                  )
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
                <p className="text-4xl font-bold">
                  {houseData[0].pending_rent}
                </p>
              </div>
              <button
                disabled={houseData[0].pending_rent === 0}
                className="bg-white text-black w-full font-semibold px-2 py-2 rounded-full mt-4 disabled:opacity-50"
                onClick={() => setPaymentOpen(true)}
              >
                Pay Now
              </button>
            </div>
            <div className="flex flex-col gap-4">
              <h2 className="text-4xl font-semibold  text-black ">History</h2>
              <div className="bg-gray-100 border border-gray-300 p-4 rounded-2xl shadow-2xl">
                {houseData[0].history.length ? (
                  houseData[0].history.map((history, index: number) => (
                    <div
                      key={index}
                      className="flex justify-between items-center"
                    >
                      <p className="font-semibold">
                        {history.payment.split('T')[0]}
                      </p>
                      <p className="font-semibold">
                        {history.rent}
                        <span className="text-xs font-bold"> USD</span>
                      </p>
                    </div>
                  ))
                ) : (
                  <p>No payment history</p>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-4 mb-16">
              <h2 className="text-4xl font-semibold  text-black ">
                Emergency Contacts
              </h2>
              <div className="bg-gray-100 border border-gray-300 p-4 rounded-2xl shadow-2xl">
                {houseData[0].contacts ? (
                  houseData[0].contacts.map(
                    (contact, index: number) => (
                      <div
                        key={index}
                        className="flex justify-between items-center"
                      >
                        <p className="font-semibold">{contact.name}</p>
                        <p className="font-semibold">{contact.phone}</p>
                      </div>
                    )
                  )
                ) : (
                  <p>No emergency contacts</p>
                )}
              </div>
            </div>
          </div>
        )
      ) : (
        <EnterHouseCode tenant_id={userId} />
      )}
    </div>
  );
}
