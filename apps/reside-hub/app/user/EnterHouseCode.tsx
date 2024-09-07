'use client';

import { use, useEffect, useState } from 'react';
import fetchHouseWithID from './fetchHouseWithID';
import { MapPin } from 'react-feather';
import linkUserWithHouse from './linkUserWithHouse';
import Payment from '../components/Payment';

function AddHomeForm({
  handleSubmit,
  houseCode,
  setHouseCode,
}: {
  handleSubmit: any;
  houseCode: string;
  setHouseCode: any;
}) {
  return (
    <>
      <h1 className="text-5xl"> Enter your house code</h1>
      <input
        className="border border-gray-300 rounded-lg px-4 py-2"
        type="text"
        placeholder="House Code"
        value={houseCode}
        onChange={(e) => setHouseCode(e.target.value)}
      />

      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        onClick={handleSubmit}
      >
        Submit
      </button>
    </>
  );
}

export default function EnterHouseCode({ tenant_id }: { tenant_id: string }) {
  const [houseCode, setHouseCode] = useState('');

  const [rent, setRent] = useState(0);

  const [houseData, setHouseData] = useState<any[]>([]);

  const [paymentOpen, setPaymentOpen] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  async function getHouseData(houseCode: string) {
    const data = await fetchHouseWithID(houseCode);

    if (data) {
      setHouseData([...data]);
    }
  }

  useEffect(() => {
    if (!houseData.length) {
      return;
    }
    if (houseData[0].tenant_id) {
      throw new Error('House already has a tenant');
    } else {
      setRent(houseData[0].rent_price);
      console.log(rent);
    }
  }, [houseData]);

  const handleSubmit = async () => {
    setRent(0);
    await getHouseData(houseCode);
  };

  const handleRent = async () => {
    setPaymentOpen(true);
  };

  useEffect(() => {
    if (!paymentSuccess) {
      return;
    }

    const link = async (house_id: string, tenant_id: string) => {
      await link(houseData[0].id, tenant_id);
    };

    linkUserWithHouse(houseData[0].id, tenant_id);

    setTimeout(() => {
      window.location.reload();
    }, 5000);
  }, [paymentSuccess == true]);

  return (
    <div className="flex flex-col gap-8 items-center justify-center h-[calc(100vh-12rem)]">
      {rent ? (
        paymentOpen ? (
          paymentSuccess ? (
            <div className="flex flex-col gap-4 bg-gray-100 text-black border border-gray-300 p-8 rounded-2xl">
              <p className="text-5xl font-bold">Payment Successful</p>
              <p className="text-2xl font-semibold">
               For {houseData[0].house_name} of ${rent}
              </p>
            </div>
          ) : (
            <Payment amount={rent} setIsPaymentSuccess={setPaymentSuccess} />
          )
        ) : (
          <>
            <div className="flex flex-col gap-4 bg-gray-100 text-black border border-gray-300 p-8 rounded-2xl">
              <p className="text-5xl font-bold">$ {rent}</p>
              <p className="italic text-sm text-right -mt-4">per month</p>
              <p className="text-2xl font-semibold">
                {houseData[0].house_name}
              </p>
              <p className="flex items-center gap-2">
                <MapPin />
                {houseData[0].house_address}
              </p>
            </div>

            <button
              onClick={handleRent}
              className="bg-blue-500 text-white font-semibold px-8 py-2 rounded-full"
            >
              Rent this house
            </button>

            <button
              onClick={() => window.location.reload()}
              className="bg-red-500 text-white font-semibold px-8 py-2 rounded-full"
            >
              Cancel
            </button>
          </>
        )
      ) : (
        <AddHomeForm
          handleSubmit={handleSubmit}
          houseCode={houseCode}
          setHouseCode={setHouseCode}
        />
      )}
    </div>
  );
}
