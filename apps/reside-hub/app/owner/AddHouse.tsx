'use client';

import { useEffect, useRef, useState } from 'react';
import { FilePlus, Plus, X } from 'react-feather';
import insertHouse from './insertHouse';

function AddEmergencyContact({
  emergencyContacts,
  setEmergencyContacts,
}: {
  emergencyContacts: any[];
  setEmergencyContacts: any;
}) {
  const [isEditing, setIsEditing] = useState(false);

  const addContact = (name: string, phone: string) => {
    setEmergencyContacts([...emergencyContacts, { name: name, phone: phone }]);
    setIsEditing(false);
  };

  function AddForm() {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');

    return (
      <div className="flex flex-col">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2"
        />
        <label className="mt-2" htmlFor="phone">
          Phone
        </label>
        <input
          type="text"
          id="phone"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2"
        />
        <div className="flex justify-around gap-2 mt-2">
          <button
            onClick={() => addContact(name, phone)}
            className="bg-green-200 text-green-900 border border-green-400 flex-gow flex justify-center items-center p-4 rounded-full"
          >
            <FilePlus className="w-6 h-auto" />
          </button>
          <button
            onClick={() => setIsEditing(false)}
            className="bg-red-100 text-red-900 border border-red-400 flex-row flex justify-center items-center p-4 rounded-full"
          >
            <X className="w-6 h-auto" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 border rounded-lg p-1 bg-white">
      {isEditing ? (
        <AddForm />
      ) : (
        <div className="flex flex-col gap-4">
          {emergencyContacts.length ? (
            emergencyContacts.map((contact, index) => (
              <div key={index} className="flex gap-4 items-center">
                <p className="font-bold">{contact.name}</p>
                <p>{contact.phone}</p>
                <button
                  onClick={() =>
                    setEmergencyContacts(
                      emergencyContacts.filter((_, i) => i !== index)
                    )
                  }
                  className="bg-red-100 text-red-900 border border-red-400 flex-row flex justify-center items-center p-2 rounded-full"
                >
                  <X className="w-4 h-auto" />
                </button>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-700 italic mt-4">
              No contacts added
            </p>
          )}
        </div>
      )}
      {isEditing ? null : (
        <button
          onClick={() => setIsEditing(true)}
          className="bg-gray-200 text-black px-8 py-2 font-semibold rounded-lg flex justify-center items-center gap-2"
        >
          Add Contact <Plus className="w-4 h-auto" />
        </button>
      )}
    </div>
  );
}

export default function AddHouse({
  owner_id,
  overlay,
  setOverlay,
}: {
  owner_id: string;
  overlay: any;
  setOverlay: any;
}) {
  const overlayRef = useRef<HTMLDivElement>(null);

  const [emergencyContacts, setEmergencyContacts] = useState<any[]>([]);

  const [houseName, setHouseName] = useState('');
  const [address, setAddress] = useState('');
  const [rent, setRent] = useState('');

  useEffect(() => {
    setTimeout(() => {
      if (!overlayRef.current) return;

      overlayRef.current.classList.toggle('opacity-0');
      overlayRef.current.classList.toggle('opacity-100');
      overlayRef.current.classList.toggle('backdrop-blur-none');
      overlayRef.current.classList.toggle('backdrop-blur-lg');
    }, 1);
  }, [overlay]);

  async function addHouseToDB() {
    insertHouse(owner_id, houseName, address, rent, emergencyContacts);
    setOverlay(false);
    setEmergencyContacts([]);
    setHouseName('');
    setAddress('');
    setRent('');
  }

  return overlay ? (
    <div
      ref={overlayRef}
      className="fixed top-0 left-0 z-50 w-full opacity-0 h-full bg-black/10 backdrop-blur-none flex justify-center items-center p-8 transition duration-500"
    >
      <div className="bg-white/80 p-4 rounded-3xl relative border border-gray-300 w-full flex flex-col gap-4">
        <button
          onClick={() => {
            setOverlay(false);
            setEmergencyContacts([]);
          }}
          className="absolute right-4 p-2 border border-gray-300 bg-white text-black font-semibold rounded-full"
        >
          <X className="w-4 h-auto" />
        </button>
        <h2 className="text-3xl">Add a house</h2>
        <div className="flex flex-col">
          <label htmlFor="house_name">House Name</label>
          <input
            type="text"
            id="house_name"
            placeholder="House Name"
            value={houseName}
            onChange={(e) => setHouseName(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2"
          />
          <label className="mt-4" htmlFor="address">
            Address
          </label>
          <input
            type="text"
            id="address"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2"
          />
          <label className="mt-4" htmlFor="rent">
            Rent
          </label>
          <input
            type="number"
            id="rent"
            placeholder="1200"
            value={rent}
            onChange={(e) => setRent(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2"
          />

          <label className="mt-4" htmlFor="emergency_contacts">
            Emergency Contacts
          </label>

          <AddEmergencyContact
            emergencyContacts={emergencyContacts}
            setEmergencyContacts={setEmergencyContacts}
          />

          <button
            onClick={addHouseToDB}
            className="mt-4 bg-black text-white px-8 py-2 font-semibold rounded-lg"
          >
            Add House
          </button>
        </div>
      </div>
    </div>
  ) : null;
}
