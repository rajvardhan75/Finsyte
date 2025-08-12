// ESM version
import axios from "axios";

const {
  AA_USE_DEMO = "true",
  AA_BASE_URL = "",
  AA_CLIENT_ID = "",
  AA_CLIENT_SECRET = "",
} = process.env;

const aa = axios.create({
  baseURL: AA_BASE_URL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
    ...(AA_CLIENT_ID && { "x-client-id": AA_CLIENT_ID }),
    ...(AA_CLIENT_SECRET && { "x-client-secret": AA_CLIENT_SECRET }),
  },
});

function toISODate(d) {
  const dt = new Date(d || Date.now());
  return dt.toISOString().slice(0, 10);
}

function demoBundle() {
  const accounts = [{ fip: "HDFC", maskedAccount: "XXXX1234", type: "SAVINGS", ifsc: "HDFC0001234" }];
  const now = new Date();
  const tx = [];

  // Salary credits (3 months)
  for (let m = 0; m < 3; m++) {
    tx.push({
      accountMasked: "XXXX1234",
      date: toISODate(new Date(now.getFullYear(), now.getMonth() - m, 30)),
      amount: 65000,
      direction: "credit",
      narration: "SALARY CREDIT",
      txnId: `SAL${m}`,
    });
  }
  // Subscriptions
  const subs = [
    { note: "NETFLIX.COM AUTOPAY", amt: -499 },
    { note: "SPOTIFY PREMIUM AUTOPAY", amt: -289 },
    { note: "JIO FIBER SI", amt: -699 },
  ];
  const start = new Date(now.getFullYear(), now.getMonth() - 3, 5);
  subs.forEach((s, i) => {
    for (let k = 0; k < 4; k++) {
      const d = new Date(start.getTime() + k * 30 * 86400000);
      tx.push({
        accountMasked: "XXXX1234",
        date: toISODate(d),
        amount: s.amt,
        direction: "debit",
        narration: s.note,
        txnId: `SUB${i}-${k}`,
      });
    }
  });
  // Random spends
  const rand = (a, b) => Math.floor(Math.random() * (b - a + 1)) + a;
  const notes = ["SWIGGY UPI", "ZOMATO UPI", "AMAZON PAY", "FLIPKART UPI", "BIGBASKET UPI"];
  for (let i = 0; i < 30; i++) {
    tx.push({
      accountMasked: "XXXX1234",
      date: toISODate(new Date(now.getTime() - rand(5, 80) * 86400000)),
      amount: -rand(150, 2500),
      direction: "debit",
      narration: notes[i % notes.length],
      txnId: `R${i}`,
    });
  }
  return { accounts, transactions: tx };
}

export async function createConsent({ mobile }) {
  if (!mobile) throw new Error("mobile is required");
  if (AA_USE_DEMO === "true") {
    return { url: "https://demo-aa.example/link?cid=CONSENT_DEMO_123", consentId: "CONSENT_DEMO_123" };
  }
  const { data } = await aa.post("/aa/consents", {
    mobile,
    dataTypes: ["TRANSACTIONS"],
    durationDays: 90,
    purpose: "PFM",
  });
  return { url: data.journeyUrl, consentId: data.consentId };
}

export async function establishSession(consentId) {
  if (AA_USE_DEMO === "true") return { sessionId: "SESSION_DEMO_123" };
  const { data } = await aa.post("/aa/sessions", { consentId });
  return { sessionId: data.sessionId };
}

export async function fetchFinancialData(sessionId) {
  if (AA_USE_DEMO === "true") return demoBundle();
  const { data } = await aa.get(`/aa/sessions/${sessionId}/financial-data`);
  return data; // map if provider shape differs
}
