import React from "react";
import DotGrid from "../components/DotGrid";
import Dock from "../components/LandingNavbar/LandingNavbar";
import BlurText from "../components/BlurText"; // Adjust path if needed
import GooeyNav from "../components/GooeyNav";
import ShinyText from "../components/ShinyText";

import ScrollStack, { ScrollStackItem } from "../components/ScrollStack";
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
            top: "1rem",
            right: "1rem",
            zIndex: 10,
          }}
        >
          <a href="/signup" className="btn btn-primary">
            Signup
          </a>
          <a
            href="/login"
            style={{
              color: "#0d6efd",
              textDecoration: "none",
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
      <div
        style={{ backgroundColor: "#1a1a1a", padding: "5rem 2rem", zIndex: 2 }}
      >
        <h2
          style={{
            color: "#ffffff",
            textAlign: "center",
            fontSize: "2.5rem",
            marginBottom: "3rem",
          }}
        >
          Our Services
        </h2>
        <ScrollStack
          itemDistance={120}
          itemScale={0.04}
          itemStackDistance={40}
          stackPosition="25%"
          scaleEndPosition="10%"
          baseScale={0.85}
          rotationAmount={0}
          blurAmount={1.5}
        >
          <ScrollStackItem>
            <h3>💸 Budget Automation</h3>
            <p>
              Automatically track and allocate your expenses to maintain a smart
              budget without lifting a finger.
            </p>
          </ScrollStackItem>
          <ScrollStackItem>
            <h3>📊 Expense Categorization</h3>
            <p>
              AI categorizes your transactions in real time so you can stay
              aware of where your money goes.
            </p>
          </ScrollStackItem>
          <ScrollStackItem>
            <h3>📈 Cash Flow Forecasting</h3>
            <p>
              Project future spending and income trends using predictive models
              tailored for you.
            </p>
          </ScrollStackItem>
          <ScrollStackItem>
            <h3>🤖 AI Financial Advisor</h3>
            <p>
              Get insights, alerts, and recommendations from our smart system to
              optimize financial habits.
            </p>
          </ScrollStackItem>
          <ScrollStackItem>
            <h3>🔗 Bank Sync via Setu</h3>
            <p>
              Securely link all your bank accounts via Setu's Account Aggregator
              and view everything in one dashboard.
            </p>
          </ScrollStackItem>
        </ScrollStack>
      </div>
    </>
  );
};

export default Landing;
