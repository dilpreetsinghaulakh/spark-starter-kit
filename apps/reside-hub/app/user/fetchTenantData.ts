import { supabase } from '../api/supabase';

export default function fetchTenantData(tenant_id: string) {
  async function fetchData(tenant_id: string) {
    let { data, error } = await supabase
      .from('house')
      .select('*')
      .eq('tenant_id', tenant_id);

    if (error) {
      throw error;
    }
    

    return data;
  }

  return fetchData(tenant_id);
}
