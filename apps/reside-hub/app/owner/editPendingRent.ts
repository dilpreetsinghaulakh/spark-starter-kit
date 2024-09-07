import { supabase } from '../api/supabase';

export default function editPendingRent(
  house_id: string,
  pending_rent: number
) {
  async function pushData(house_id: string) {
    let { data, error } = await supabase
      .from('house')
      .update({
        pending_rent: pending_rent,
      })
      .eq('id', house_id);

    if (error) {
      throw error;
    }
    return data;
  }
  return pushData(house_id);
}
