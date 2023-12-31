import { Gradient } from "./home-svg-gradient";
function Logo({ className = "" }) {
  return (
    <svg
      className={`${className}`}
      xmlns="http://www.w3.org/2000/svg"
      x="0"
      y="0"
      viewBox="0 0 25 25"
    >
      <Gradient />
      <path
        fill={"url(#gradient)"}
        d="M16.86 3.41H8.14a3.5 3.5 0 00-3.5 3.5v11.18a3.5 3.5 0 003.5 3.5h6.27a.406.406 0 00.19-.04h.01a.418.418 0 00.15-.11.234.234 0 00.07-.07l5.31-5.31.07-.07c.02-.01.03-.03.05-.05a.879.879 0 00.06-.1v-.01a.433.433 0 00.04-.19V6.91a3.5 3.5 0 00-3.5-3.5zM8.93 8.22h7.14a.5.5 0 01.5.5.5.5 0 01-.5.5H8.93a.5.5 0 01-.5-.5.5.5 0 01.5-.5zm0 3.78h7.14a.5.5 0 010 1H8.93a.5.5 0 010-1zm3.8 4.78h-3.8a.5.5 0 01-.5-.5.5.5 0 01.5-.5h3.8a.5.5 0 01.5.5.5.5 0 01-.5.5zm2.18 3.1v-1.24a2.5 2.5 0 012.5-2.5h1.24z"
      ></path>
    </svg>
  );
}

export default Logo;
