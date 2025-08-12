// finsyte-frontend/src/services/aa.js
import api from "./api"; // you already have src/services/api.jsx (axios instance)

export const initConsent = (mobile) =>
  api.post("/aa/consent/init", { mobile });

export const fetchAAData = (consentId) =>
  api.post("/aa/fetch", { consentId }); // consentId optional in demo
