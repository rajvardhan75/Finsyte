import ProfileCard from "./ProfileCard"
import "./AboutUs.css"

import AvatarRaj from "../images/Avatar-Raj.png"
import AvatarShreyash from "../images/Avatar-Shreyash.png"
import AvatarSoham from "../images/Avatar-Soham.png"

const AboutUs = () => {
  const teamMembers = [
    {
      name: "Raj Vardhan Singh",
      title: "Team Member",
      handle: "rajvardhan751",
      status: "Available",
      avatarUrl: AvatarRaj,
      contactText: "Contact Me",
      linkedInUrl: "www.linkedin.com/in/raj-vardhan-singh-050795290", // ✅ update this
    },
    {
      name: "Shreyash Singh",
      title: "Team Member",
      handle: "shreyash69",
      status: "Online",
      avatarUrl: AvatarShreyash,
      contactText: "Get in Touch",
      linkedInUrl: "https://www.linkedin.com/in/shreyash-singh-329973288/", // ✅ update this
    },
    {
      name: "Soham Padalia",
      title: "Team Member",
      handle: "sohampadalia",
      status: "Always Available",
      avatarUrl: AvatarSoham,
      contactText: "Say Hello",
      linkedInUrl: "https://www.linkedin.com/in/soham-padalia-2b42ab31b/", // ✅ update this
    },
  ]

  const handleContactClick = (url) => {
    window.open(url, "_blank")
  }

  return (
    <div className="about-us-container">
      <div className="about-header">
        <h1>Meet Our Team</h1>
        <p>Get to know the passionate individuals who drive our success and bring innovation to life.</p>
      </div>

      <div className="profile-cards-grid">
        {teamMembers.map((member, index) => (
          <ProfileCard
            key={index}
            name={member.name}
            title={member.title}
            handle={member.handle}
            status={member.status}
            contactText={member.contactText}
            avatarUrl={member.avatarUrl}
            showUserInfo={true}
            enableTilt={true}
            onContactClick={() => handleContactClick(member.linkedInUrl)} // ✅ updated
          />
        ))}
      </div>
    </div>
  )
}

export default AboutUs
