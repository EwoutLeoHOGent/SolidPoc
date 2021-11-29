import React from "react";

export default function Home() {
  const [session, setSession] = useState(getDefaultSession());

  return (
    <div>
      <p>logged in as ${session.info.webId}</p>
    </div>
  );
}
