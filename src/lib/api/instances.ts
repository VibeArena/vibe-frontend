import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, "") ?? "";

export const publicInstance = axios.create({
  baseURL,
  timeout: 7000
});
