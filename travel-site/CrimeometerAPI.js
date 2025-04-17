const BASE_URL = "https://api.crimeometer.com/v1";

export class CrimeometerAPI {
  constructor(apiKey = import.meta.env.VITE_CRIMEOMETER_API_KEY) {
    this.apiKey = apiKey;
  }

  async getCrimesByLocation({ lat, lon, distance = "1mi", datetimeInit, datetimeEnd }) {
    const endpoint = `${BASE_URL}/incidents/raw-data`;

    const body = {
      lat,
      lon,
      distance,
      datetime_ini: datetimeInit,
      datetime_end: datetimeEnd
    };

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": this.apiKey
      },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Error fetching crimes: ${error.message}`);
    }

    const data = await response.json();
    return data;
  }
}
