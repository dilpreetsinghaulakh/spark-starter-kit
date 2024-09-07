import { supabase } from '../api/supabase';

export default function linkUserWithHouse(
  house_id: string,
  tenant_id: string,
  rent: number
) {
  async function fetchData(house_id: string) {
    let { data, error } = await supabase
      .from('house')
      .update({
        tenant_id: tenant_id,
        lease_date: new Date().toISOString(),
        pending_rent: 0,
        notification: [],
        history: [{ payment: new Date().toISOString(), rent: rent }],
      })
      .eq('id', house_id);

    if (error) {
      throw error;
    }

    return data;
  }

  return fetchData(house_id);
}
