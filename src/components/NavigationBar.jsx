import { Link } from "react-router";
import { FiMenu } from "react-icons/fi";
import SizedBox from "./SizedBox";
import "./css/NavigationBar.css";

const NavItems = [
  {
    label: "About",
    to: "/",
  },
  {
    label: "Brochure",
    to: "https://drive.usercontent.google.com/u/0/uc?id=12eOYQRaA81OAGWeMCmwZ7xQnuFeAPvhW&export=download",
  },
  {
    label: "Contact",
    to: "#",
  },
  {
    label: "FAQs",
    to: "/FAQ",
  },
];

export default function NavigationBar() {
  return (
    <>
      <SizedBox outerClassName="outer-nav-box">
        <nav>
          <Link className="logo-div" to={"/"}>
            <img src="/images/logo.svg" alt="UNOSQ Logo" />
            UNOSQ
          </Link>

          <input
            type="checkbox"
            name="menu-toggle-checkbox"
            id="menu-toggle-checkbox"
            hidden
          />

          <label htmlFor="menu-toggle-checkbox" className="menu-toggle">
            <FiMenu />
          </label>

          <ul className="nav-links">
            {NavItems.map((e, i) => (
              <Link to={e.to} key={i}>
                {e.label}
              </Link>
            ))}
          </ul>
        </nav>
      </SizedBox>
    </>
  );
}
