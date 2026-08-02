import PatientMonitoringTable from "@/components/patientsmonitoring";


interface Patient {

  id:string;
  name:string;
  risk_score:number;
  urgency_level:string;
  case_status:string;
  rank:number;

}



export default async function MonitoringPage() {


  const response = await fetch(
    "https://dcse-icu-patient-risk.onrender.com/api/patients/queue",
    {
      cache:"no-store"
    }
  );


  const data = await response.json();


  const patients:Patient[] = data.items ?? [];



  return (

    <div className="w-full min-h-screen bg-gray-300 py-10">


      <div className="p-6 pt-20">


        <div className="
          bg-white 
          rounded-2xl 
          p-5 
          shadow-sm
        ">


          <div className="
            flex 
            items-center 
            justify-between 
            p-5
          ">


            <div>

              <h2 className="
                text-lg 
                font-semibold 
                text-gray-800
              ">
                Patient Queue
              </h2>


              <p className="
                text-sm 
                text-gray-500
              ">
                Antrean prioritas pasien ICU
              </p>


            </div>


          </div>



          <PatientMonitoringTable
            patients={patients}
          />


        </div>


      </div>


    </div>

  );

}