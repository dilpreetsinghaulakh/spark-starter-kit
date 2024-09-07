import { supabase } from '../api/supabase';

export default function deleteHouseData(house_id: string) {
  async function deleteData(house_id: string) {
    let { data, error } = await supabase
      .from('house')
      .delete()
      .eq('id', house_id);

    if (error) {
      throw error;
    }
    return data;
  }
  return deleteData(house_id);
}
