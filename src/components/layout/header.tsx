import { ADEYINKA_GITHUB_URL, ADEYINKA_RESUME_URL } from "@/static";
import PaletteSwitcher from "@/components/misc/palette-switcher";
import Image from "next/image";
import logo from "../../../public/android-chrome-192x192.png";

const Header = () => {
  return (
    <div className="wrap">
      <nav className="b-nav" aria-label="Main">
        <a href="#top" className="b-mark" aria-label="Adeyinka, back to top">
          <Image src={logo} alt="" width={40} height={40} priority />
          adeyinka<span className="b-dot">.</span>
        </a>
        <div className="b-links">
          <a href="#work">Work</a>
          <a href="#contact">Contact</a>
          <a
            href={ADEYINKA_GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <a
            href={ADEYINKA_RESUME_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            Résumé
          </a>
        </div>
        <PaletteSwitcher />
      </nav>
    </div>
  );
};

export default Header;
