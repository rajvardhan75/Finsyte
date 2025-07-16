import { useEffect, useState } from "react";
import { PlaidLink } from "react-plaid-link";
import API from "../services/api";

const PlaidLinkButton = () => {
  const [linkToken, setLinkToken] = useState(null);

  useEffect(() => {
    const getLinkToken = async () => {
      const res = await API.get("/plaid/create-link-token");
      setLinkToken(res.data.link_token);
    };
    getLinkToken();
  }, []);

  if (!linkToken) return null;

  return (
    <PlaidLink
      token={linkToken}
      onSuccess={(public_token, metadata) => {
        console.log("✅ Public token:", public_token);
        console.log("✅ Institution metadata:", metadata);
      }}
      onExit={(err) => {
        console.log("❌ Link exited", err);
      }}
    >
      Connect Your Bank
    </PlaidLink>
  );
};

export default PlaidLinkButton;
