const API_URL = "https://dcse-icu-patient-risk.onrender.com";


export async function getPatientHistory() {
  const response = await fetch(
    `${API_URL}/api/patients/history`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch patient history");
  }

  return response.json();
}
