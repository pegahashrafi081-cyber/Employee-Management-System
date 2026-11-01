import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://ems-server-teal.vercel.app/api',
  headers: {
    'Content-Type': 'application/json',
  },
});
