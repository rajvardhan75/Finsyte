import React from "react";
import DotGrid from "../components/DotGrid";
import Dock from "../components/LandingNavbar/LandingNavbar";
import BlurText from "../components/BlurText"; // Adjust path if needed
import ShinyText from "../components/ShinyText";
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
    { icon: <VscAccount size={18} />, label: "About Us" },
    { icon: <VscSettingsGear size={18} />, label: "Pricing" },
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
          justifyContent: "center",
          zIndex: 10,
          backgroundColor: "transparent",
        }}
      >
        <Dock
          items={items}
          panelHeight={68}
          baseItemSize={50}
          magnification={25}
        />
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
          activeColor="#5227FF"
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
            height: "50%",
            alignItems: "center",
            backgroundColor: "transparent",
            marginRight: "1rem",
            overflowY: "hidden",
            borderRadius: "20px",
          }}
        >
          <BlurText
            text="Welcome to Finsyte!"
            delay={150}
            animateBy="words"
            direction="top"
            className="blur-text"
          />
          <div className="shiny-text">
            <ShinyText
              text="Your Smartest Step Toward Financial Clarity"
              disabled={false}
              speed={3}
            />
          </div>
        </div>
      </div>

      {/* Floating BlurText centered on top of DotGrid */}
    </>
  );
};

export default Landing;
