import { supabase } from '../api/supabase';

export default function removeTenant(house_id: string) {
  async function pushData(house_id: string) {
    let { data, error } = await supabase
      .from('house')
      .update({
        tenant_id: null,
        lease_date: null,
        pending_rent: null,
        notification: [],
        history: [],
      })
      .eq('id', house_id);

    if (error) {
      throw error;
    }
    return data;
  }
  return pushData(house_id);
}
