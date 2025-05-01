import React, { useState } from "react";

export default function TravelSafetyChecker() {
  const [countryCode, setCountryCode] = useState("");
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    if (!countryCode) return;
    setLoading(true);
    setError(null);
    setData(null);
    try {
      const response = await fetch(`/api/country/${countryCode}`);
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Failed to fetch data.");
      setData(result);
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Travel Safety Checker</h1>

      <div className="flex gap-2 mb-4">
        <input
          className="border border-gray-300 rounded px-3 py-2 w-full"
          placeholder="Enter country code (e.g., US, FR, JP)"
          value={countryCode}
          onChange={(e) => setCountryCode(e.target.value.toUpperCase())}
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={fetchData}
          disabled={loading}
        >
          {loading ? "Loading..." : "Check"}
        </button>
      </div>

      {error && (
        <p className="text-red-500 font-semibold mb-4">{error}</p>
      )}

      {data && (
        <div className="bg-white shadow-md rounded-xl p-4 space-y-2 border mt-4">
          <h2 className="text-xl font-semibold">{data.name}</h2>
          <p><strong>Advisory:</strong> {data.advisories?.text || "No data available."}</p>
          <p><strong>Vaccinations:</strong> {data.vaccinations?.map((v: any) => v.name).join(", ") || "None required."}</p>
          <p><strong>Entry Requirements:</strong> {data.entry?.text || "No information."}</p>
          <p><strong>Health Info:</strong> {data.health?.text || "No health updates."}</p>
        </div>
      )}
    </div>
  );
}
