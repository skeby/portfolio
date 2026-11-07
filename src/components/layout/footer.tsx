const Footer = () => {
  return (
    <footer className="b-foot">
      <div className="wrap">
        <span className="b-wordmark" aria-hidden="true">
          adeyinka<span>.</span>
        </span>
        <div className="b-footrow">
          <span>© {new Date().getFullYear()} Adeyinka Akinsanya</span>
          <a href="#top">Back to top ↑</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
