'use client';
import { useState } from "react";
import { initConsent, fetchAAData } from "../services/aaApi"; // ← updated import
import "./Login.css";

export default function LinkAccount() {
  const [mobile, setMobile] = useState("");
  const [bundle, setBundle] = useState(null);
  const [loading, setLoading] = useState(false);

  const startConsent = async () => {
    setLoading(true);
    try {
      const { data } = await initConsent(mobile);
      console.log("Journey URL:", data.url);
      const fetched = await fetchAAData(data.consentId);
      setBundle(fetched.data || fetched);
    } catch (e) {
      console.error(e);
      alert("Failed to start consent/fetch data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page-container">
      <div className="login-wrapper">
        <div className="login-card">
          <div className="login-card-content">
            <div className="login-form">
              <div className="form-header">
                <h1>Connect your bank</h1>
                <p>Securely via Account Aggregator (demo)</p>
              </div>

              <div className="form-group">
                <label htmlFor="mobile">Bank-linked mobile</label>
                <input
                  id="mobile"
                  type="tel"
                  placeholder="98XXXXXXXX"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                />
              </div>

              <button className="login-button" onClick={startConsent} disabled={loading || !mobile}>
                {loading ? "Connecting..." : "Connect via AA (Demo)"}
              </button>

              {bundle && (
                <>
                  <div className="separator"><span>Accounts</span></div>
                  <div className="form-group" style={{marginBottom: "1.5rem"}}>
                    {bundle.accounts?.map((a, i) => (
                      <div key={i} style={{padding: "0.5rem 0", borderBottom: "1px solid var(--border)"}}>
                        <strong>{a.fip}</strong> — {a.type} — {a.maskedAccount}
                      </div>
                    ))}
                  </div>

                  <div className="separator"><span>Recent transactions</span></div>
                  <div className="form-group" style={{maxHeight: 320, overflow: "auto"}}>
                    {bundle.transactions?.slice(0, 25).map((t, i) => (
                      <div key={i} style={{display: "flex", justifyContent:"space-between", borderBottom: "1px solid var(--border)", padding: "6px 0"}}>
                        <div>
                          <div style={{fontWeight:600}}>{t.narration || "Txn"}</div>
                          <div style={{fontSize:12, color:"var(--muted-foreground)"}}>{t.date} — {t.accountMasked}</div>
                        </div>
                        <div style={{color: t.amount < 0 ? "#f87171" : "#34d399"}}>
                          {t.amount < 0 ? "-" : "+"}₹{Math.abs(t.amount)}
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>

            <div className="image-section">
              <img src="/placeholder.svg?height=600&width=600" alt="Abstract purple background" />
            </div>
          </div>
        </div>

        <div className="terms-text">Demo only. No live banking data used.</div>
      </div>
    </div>
  );
}
