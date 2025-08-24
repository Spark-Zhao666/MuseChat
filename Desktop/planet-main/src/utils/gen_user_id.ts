import http from '@/utils/http';
import {config} from "../../config.ts";

export async function gen_user_id(): Promise<string> {
  const res = await http(`${config.apiBaseUrl}/api/gen_user_id`, 'get');
  return res.data.user_id;
}

