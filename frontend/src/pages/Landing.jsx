import React from "react";
import DotGrid from "../components/DotGrid";
import Dock from "../components/LandingNavbar/LandingNavbar";
import BlurText from "../components/BlurText";
import ShinyText from "../components/ShinyText";
import SpotlightCard from "../components/SpotlightCard";
import "./Landing.css";

import {
  VscHome,
  VscArchive,
  VscAccount,
  VscSettingsGear,
} from "react-icons/vsc";

const Landing = () => {
  const items = [
    { icon: <VscHome size={18} />, label: "Home" },
    { icon: <VscArchive size={18} />, label: "Services" },

    { icon: <VscSettingsGear size={18} />, label: "Pricing" },
    { icon: <VscAccount size={18} />, label: "About Us" },
  ];

  return (
    <>
      {/* Floating Dock Navbar at top */}
      <div
        style={{
          position: "fixed",
          top: 20,
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 2rem",
          zIndex: 10,
          background: "transparent",
        }}
      >
        {/* Left: Dock */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <Dock
            items={items}
            panelHeight={68}
            baseItemSize={50}
            magnification={25}
          />
        </div>

        {/* Right: GooeyNav for Signup/Login */}
        <div
          style={{
            display: "flex",
            gap: "1rem",
            alignItems: "center",
            backgroundColor: "#27272a",
            padding: "0.75rem 1.25rem",
            borderRadius: "12px",
            position: "absolute",
            top: "0rem",
            right: "1rem",
            zIndex: 10,
            border: "2px solid #222",
          }}
        >
          <a
            href="/register"
            className="btn btn-primary btn-lg"
            id="signup"
            style={{ backgroundColor: "#27272a" }}
          >
            Register
          </a>
          <a
            href="/login"
            className="btn btn-primary btn-lg"
            id="login"
            style={{
              color: "#616263ff",
              backgroundColor: "#27272a",
              border: "2px solid #616263ff",
              fontWeight: 500,
            }}
          >
            Login
          </a>
        </div>
      </div>

      {/* Full-screen DotGrid background */}
      <div
        style={{
          position: "relative",
          height: "100vh",
          width: "100vw",
          overflow: "hidden",
          zIndex: 0,
          marginTop: "5%",
        }}
      >
        <DotGrid
          dotSize={5}
          gap={15}
          baseColor="#ffffff"
          activeColor="#0d6efd"
          proximity={120}
          shockRadius={250}
          shockStrength={5}
          resistance={750}
          returnDuration={1.5}
          margin-top={50}
        />

        <div
          style={{
            position: "absolute",
            top: "40%",
            left: "53%",
            transform: "translate(-50%, -50%)",
            zIndex: 5,
            width: "50%",
            alignItems: "center",
            backgroundColor: "transparent",
            marginRight: "1rem",
            overflowY: "hidden",
            borderRadius: "20px",
          }}
        >
          <BlurText
            text="Welcome to Finsyte!"
            delay={100}
            animateBy="words"
            direction="top"
            className="blur-text"
          />
          <div
            className="shiny-text"
            style={{
              marginTop: "1rem",
              textAlign: "center",
              marginLeft: "-2rem",
              height: "100%",
              width: "100%",
              position: "relative",
              zIndex: 10,
            }}
          >
            <ShinyText
              text="Automate. Analyze. Ascend.
Your all-in-one AI-powered personal finance navigator."
              disabled={false}
              speed={1}
            />
          </div>

          <div
            className="get-started"
            style={{
              marginTop: "2rem",
              textAlign: "center",
              position: "relative",
              zIndex: 10,
              marginLeft: "-4rem",
            }}
          >
            <button
              type="button"
              className="btn btn-outline-primary me-2 btn-lg"
              style={{ backgroundColor: "#27272a" }}
              onClick={() => {
                window.location.href = "/register";
              }}
            >
              Get started
            </button>
            <button
              type="button"
              className="btn btn-outline-secondary ms-2 btn-lg"
              style={{ backgroundColor: "#27272a" }}
            >
              Learn more
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Landing;
