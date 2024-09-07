import { supabase } from '../api/supabase';

export default async function insertHouse(
  owner_id: string,
  house_name: string,
  address: string,
  rent: string,
  emergencyContacts: any[]
) {
  async function pushData(owner_id: string) {
    let { data, error } = await supabase.from('house').insert([
      {
        owner_id,
        house_name,
        house_address: address,
        rent_price: rent,
        contacts: emergencyContacts,
      },
    ]);
    if (error) {
      throw error;
    }

    return data;
  }
  return pushData(owner_id);
}
