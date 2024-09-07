import { supabase } from '../api/supabase';

export default function editHouseData(
  owner_id: string,
  house_id: string,
  house_name: string,
  address: string,
  rent: string,
  emergencyContacts: any[]
) {
  async function pushData(house_id: string) {
    let { data, error } = await supabase
      .from('house')
      .update({
        house_name,
        house_address: address,
        rent_price: rent,
        contacts: emergencyContacts,
      })
      .eq('id', house_id);

    if (error) {
      throw error;
    }
    return data;
  }
  return pushData(house_id);
}
