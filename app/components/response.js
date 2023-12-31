import React, { useEffect, useRef } from "react";

export default function Response({ query, data }) {
  const responseRef = useRef();

  // scroll to results on load
  useEffect(() => {
    responseRef.current.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <div className="response" ref={responseRef} dangerouslySetInnerHTML={{
      __html: data,
    }}>

    </div>
  );
}
