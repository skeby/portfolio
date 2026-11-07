import { skills } from "@/static";
import { Fragment } from "react";

/** Scrolling ticker of skills. The list is rendered twice so the loop is seamless. */
const Marquee = () => {
  const run = (
    <span>
      {skills.map((s) => (
        <Fragment key={s}>
          {s}&nbsp;&nbsp;<em>✦</em>&nbsp;&nbsp;
        </Fragment>
      ))}
    </span>
  );

  return (
    <div className="b-marquee" aria-hidden="true">
      <div className="b-track">
        {run}
        {run}
      </div>
    </div>
  );
};

export default Marquee;
