import {
  ADEYINKA_CAL_URL,
  ADEYINKA_EMAIL,
  ADEYINKA_LINKEDIN_URL,
  ADEYINKA_TELEGRAM_URL,
} from "@/static";

const [emailUser, emailDomain] = ADEYINKA_EMAIL.split("@");

const Contact = () => {
  return (
    <section className="b-contact" id="contact">
      <div className="wrap">
        <h2 className="site-h2">
          Have a project in mind? <span>Let&apos;s talk.</span>
        </h2>
        <p>
          Open to full-time roles, contracts and collaborations. Email me or
          book a call and I&apos;ll get back to you within a day.
        </p>
        <a className="b-email" href={`mailto:${ADEYINKA_EMAIL}`}>
          {/* Break after the @ on narrow screens rather than mid-word. */}
          {emailUser}@<wbr />
          <span className="whitespace-nowrap">
            {emailDomain}
            <span className="arr" aria-hidden="true">
              ↗
            </span>
          </span>
        </a>
        <div className="b-ctas">
          <a
            className="b-btn"
            href={ADEYINKA_CAL_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            Book a call ↗
          </a>
          <a
            className="b-btn alt"
            href={ADEYINKA_LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          <a
            className="b-btn alt"
            href={ADEYINKA_TELEGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            Telegram
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;
