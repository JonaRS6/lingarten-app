import { SearchResult } from '@/models/SearchResult';
import axios from 'axios';
export const searchCustomersAndReceipts = async (search: string) : Promise<SearchResult[]> => {
  const response = await axios.post(`/api/v1/search`, { search });
  const data = await response.data;
  return data;
}