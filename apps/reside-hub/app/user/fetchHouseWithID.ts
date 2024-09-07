import { supabase } from '../api/supabase';

export default function fetchHouseWithID(house_id: string) {
  async function fetchData(house_id: string) {
    let { data, error } = await supabase
      .from('house')
      .select('*')
      .eq('id', house_id);
      
    if (error) {
      throw error;
    }
    

    return data;
  }

  return fetchData(house_id);
}
