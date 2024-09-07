import { supabase } from '../api/supabase';

export default function fetchHouseData(owner_id: string) {
  async function fetchData(owner_id: string) {
    let { data, error } = await supabase
      .from('house')
      .select('*')
      .eq('owner_id', owner_id);

    if (error) {
      throw error;
    }

    return data;
  }

  return fetchData(owner_id);
}
