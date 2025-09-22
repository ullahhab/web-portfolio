import React, { useEffect, useState } from "react";

export default function NetworthPage() {
  const [equity, setEquity] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNetworth() {
      try {
        const res = await fetch("https://alpaca-project-d30e2ic1y-hammadullahris-1789s-projects.vercel.app/api/networth"); // works if frontend+backend are on same Vercel project
        const data = await res.json();
        setEquity(data.equity);
      } catch (err) {
        console.error("Failed to fetch networth:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchNetworth();
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h2>My Net Worth (Realtime)</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <p style={{ fontSize: "1.5rem" }}>
          💰 ${equity}
        </p>
      )}
    </div>
  );
}
