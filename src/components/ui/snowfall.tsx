"use client";

import ReactSnowfall from "react-snowfall";

const Snowfall = () => {
  const isDecember = new Date().getMonth() === 11;
  if (!isDecember) return null;
  return (
    <ReactSnowfall
      color="white"
      style={{
        position: "fixed",
        width: "100vw",
        height: "100vh",
      }}
    />
  );
};

export default Snowfall;
