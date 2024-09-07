import { supabase } from '../api/supabase';

export default function editNotification(house_id: string, notification: []) {
  async function pushData(house_id: string) {
    let { data, error } = await supabase
      .from('house')
      .update({
        notification: notification,
      })
      .eq('id', house_id);

    if (error) {
      throw error;
    }
    return data;
  }
  return pushData(house_id);
}
