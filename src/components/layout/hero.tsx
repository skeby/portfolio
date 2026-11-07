import { ADEYINKA_CAL_URL } from "@/static";
import Image from "next/image";
import profile from "../../../public/images/profile-4.webp";

const Hero = () => {
  return (
    <div className="wrap">
      <section className="b-hero" id="hero">
        <div>
          <h1>
            Adeyinka <span>Akinsanya</span>
          </h1>
          <p className="b-lead">
            Software engineer and frontend developer, currently available for
            work.
          </p>
          <div className="b-ctas">
            <a
              className="b-btn"
              href={ADEYINKA_CAL_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              Book a call ↗
            </a>
            <a className="b-btn alt" href="#work">
              See my work
            </a>
          </div>
        </div>
        <div className="b-photo">
          <Image
            src={profile}
            alt="Portrait of Adeyinka Akinsanya"
            sizes="(max-width: 760px) 290px, 360px"
            placeholder="blur"
            priority
          />
          <div className="b-badge" role="img" aria-label="Available for work">
            <svg viewBox="0 0 124 124" aria-hidden="true">
              <defs>
                <path
                  id="badge-circle"
                  d="M62,62 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0"
                />
              </defs>
              <text>
                <textPath
                  href="#badge-circle"
                  textLength="272"
                  lengthAdjust="spacing"
                >
                  AVAILABLE FOR WORK • OPEN TO ROLES •
                </textPath>
              </text>
            </svg>
            <b aria-hidden="true">✦</b>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
