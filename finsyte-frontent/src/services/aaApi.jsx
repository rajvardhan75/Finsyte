import axios from "axios";

// Point straight at the AA router, not /users
const BASE =
  (import.meta.env?.VITE_API_URL?.replace(/\/+$/, "") || "http://localhost:8000") +
  "/api/v1/aa";

const aaApi = axios.create({
  baseURL: BASE,
  withCredentials: true, // keep if you use cookies/JWT
});

// Calls
export const initConsent = (mobile) =>
  aaApi.post("/consent/init", { mobile });

export const fetchAAData = (consentId) =>
  aaApi.post("/fetch", { consentId });

export default aaApi;
