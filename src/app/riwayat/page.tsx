import { getPatientHistory } from "@/lib/api";


interface PatientHistory {
  id: string;
  patient_code: string;
  name: string;
  risk_score: number;
  urgency_level: string;
  case_status: string;
  updated_at: string;
}


export default async function RiwayatPage() {

  const data = await getPatientHistory();


  // menyesuaikan jika API mengembalikan array langsung
const patients: PatientHistory[] = data.items ?? [];

  return (
    <div className="p-6">

      <h1 className="text-2xl font-bold mb-6">
        Riwayat Pasien ICU
      </h1>


      <div className="bg-white rounded-xl shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-blue-950 text-white">

            <tr>

              <th className="p-3 text-left">
                ID Pasien
              </th>

              <th className="p-3 text-left">
                Nama
              </th>

              <th className="p-3 text-left">
                Risk Score
              </th>

              <th className="p-3 text-left">
                Prioritas
              </th>

              <th className="p-3 text-left">
                Status
              </th>

              <th className="p-3 text-left">
                Update Terakhir
              </th>

            </tr>

          </thead>


          <tbody>

          {patients.length > 0 ? (

            patients.map((patient)=>(

              <tr 
                key={patient.id}
                className="border-b hover:bg-gray-50"
              >

                <td className="p-3">
                  {patient.patient_code || "-"}
                </td>


                <td className="p-3 font-medium">
                  {patient.name || "-"}
                </td>


                <td className="p-3">

                  {patient.risk_score !== undefined
                    ? `${patient.risk_score}%`
                    : "-"
                  }

                </td>


                <td className="p-3">

                <PriorityBadge
                    priority={patient.urgency_level}
                    />

                </td>


                <td className="p-3">
                  {patient.case_status}
                </td>


                <td className="p-3">
                  {
                    patient.updated_at
                    ? new Date(
                        patient.updated_at
                      ).toLocaleDateString()
                    : "-"
                  }
                </td>


              </tr>

            ))

          ) : (

            <tr>
              <td
                colSpan={6}
                className="text-center p-6 text-gray-500"
              >
                Belum ada riwayat pasien
              </td>
            </tr>

          )}

          </tbody>

        </table>

      </div>


    </div>
  );
}



function PriorityBadge({
  priority,
}: {
  priority?: string;
}) {

  switch (priority?.toLowerCase()) {

    case "critical":
      return (
        <span className="
          bg-red-100 
          text-red-700 
          px-3 py-1 
          rounded-full
          text-sm
        ">
          Critical
        </span>
      );


    case "high":
      return (
        <span className="
          bg-orange-100 
          text-orange-700 
          px-3 py-1 
          rounded-full
          text-sm
        ">
          High
        </span>
      );


    case "moderate":
      return (
        <span className="
          bg-yellow-100 
          text-yellow-700 
          px-3 py-1 
          rounded-full
          text-sm
        ">
          Moderate
        </span>
      );


    case "low":
      return (
        <span className="
          bg-green-100 
          text-green-700 
          px-3 py-1 
          rounded-full
          text-sm
        ">
          Low
        </span>
      );


    default:
      return (
        <span className="
          bg-gray-100 
          text-gray-700 
          px-3 py-1 
          rounded-full
          text-sm
        ">
          Unknown
        </span>
      );

  }

}
