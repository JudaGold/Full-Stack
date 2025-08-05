import ProfilePic from "../assets/profile-pic.png";

export default function Info() {
  return (
    <>
      <header>
        <img className="profile-img" src={ProfilePic} alt="Profile picture." />
        <h1>Yehuda Goldberg</h1>
        <p>Full-Stack Developer</p>
        <a href="https://stellular-lolly-314152.netlify.app/" target="_blank">
          My Portfolio
        </a>
      </header>
    </>
  );
}
