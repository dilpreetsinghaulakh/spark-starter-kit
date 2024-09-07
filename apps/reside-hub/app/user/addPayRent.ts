import { supabase } from '../api/supabase';

export default function addPayRent(
  house_id: string,
  history: any[],
    rent: number


) {
  async function fetchData(house_id: string) {
    let { data, error } = await supabase
      .from('house')
      .update({
        pending_rent: 0,
        history: [...history, { payment: new Date().toISOString(), rent: rent }],
      })
      .eq('id', house_id);

    if (error) {
      throw error;
    }

    return data;
  }

  return fetchData(house_id);
}
