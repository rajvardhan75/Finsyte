// ESM version
import { createConsent, establishSession, fetchFinancialData } from "../utils/accountAggregator.js";

export const initConsent = async (req, res, next) => {
  try {
    const { mobile } = req.body;
    const out = await createConsent({ mobile });
    res.json(out); // { url, consentId }
  } catch (e) { next(e); }
};

export const fetchData = async (req, res, next) => {
  try {
    const { consentId } = req.body; // optional in demo
    const { sessionId } = await establishSession(consentId || "CONSENT_DEMO_123");
    const bundle = await fetchFinancialData(sessionId);
    res.json(bundle); // { accounts[], transactions[] }
  } catch (e) { next(e); }
};
