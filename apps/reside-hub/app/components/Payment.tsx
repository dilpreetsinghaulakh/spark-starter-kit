'use client';

import { useEffect, useState } from 'react';
import { ArrowRight } from 'react-feather';

export default function Payment({
  amount,
  setIsPaymentSuccess,
}: {
  amount: number;
  setIsPaymentSuccess: Function;
}) {
  const [name, setName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  useEffect(() => {
    if (
      amount &&
      cardNumber.length === 12 &&
      expiryDate.length === 4 &&
      cvv.length === 3
    ) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [amount, cardNumber, expiryDate, cvv]);

  const handlePayment = () => {
    console.log('Payment successful! Transaction ID: 123456');
    setIsPaymentSuccess(true);
  };

  const inputClasses =
    'bg-gray-100 border-2 border-gray-300 px-4 py-2 rounded-xl mb-3 w-full max-w-md';
  const payButton =
    'bg-blue-600 w-full flex items-center justify-center p-4 text-lg font-semibold text-white rounded-full mt-4 transition duration-300 ease-in-out';
  return (
    <>
      <div className="flex flex-col gap-4 w-full">
        <p className="text-3xl font-semibold">Payment Details</p>
        <div className="row gx-3">
          <div className="">
            <div className="d-flex flex-column">
              <p className="text mb-1">Person Name</p>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={inputClasses}
                placeholder="Name"
              />
            </div>
          </div>
          <div className="col-12">
            <div className="d-flex flex-column">
              <p className="text mb-1">Card Number</p>
              <input
                className={inputClasses}
                type="text"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                placeholder="1234 5678 4356 7834"
              />
            </div>
          </div>
          <div className="col-6">
            <div className="d-flex flex-column">
              <p className="text mb-1">Expiry</p>
              <input
                className={inputClasses}
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                type="text"
                placeholder="MM/YY"
              />
            </div>
          </div>
          <div className="col-6">
            <p className="text mb-1">CVV/CVC</p>
            <input
              className={inputClasses}
              type="password"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              placeholder="***"
            />
          </div>
          <button
            disabled={isButtonDisabled}
            onClick={handlePayment}
            className={` ${
              isButtonDisabled ? 'opacity-50 cursor-not-allowed' : ''
            } ${payButton}`}
          >
            <span className="ps-3 ">Pay ${amount} </span>
            <ArrowRight />
          </button>
        </div>
      </div>
    </>
  );
}
