import PatientIdentity from "@/components/monitoring/PatientIdentity";
import VitalSignsCard from "@/components/monitoring/VitalSignscard";
import MonitoringSummary from "@/components/monitoring/MonitoringSummary";
import AIExplanation from "@/components/monitoring/AIExplanation";
import RiskFactorAnalysis 
from "@/components/monitoring/RiskFactorAnalysis";

const API_URL =
  "https://dcse-icu-patient-risk.onrender.com";


export default async function PatientPage({
  params,
}: {
  params: Promise<{ id:string }>;
}) {


  const { id } = await params;


  const response = await fetch(
    `${API_URL}/api/patients/${id}`,
    {
      cache:"no-store"
    }
  );


  if(!response.ok){

    return(
      <div className="p-6">
        Patient tidak ditemukan
      </div>
    );

  }


  const patient = await response.json();
console.log(patient);
console.log(patient.clinical_data);


  return (

    <main
      className="
      min-h-screen
      bg-slate-100
      pt-24
      px-6
      pb-6
      space-y-6
      "
    >


      {/* HEADER */}

      <div
        className="
        bg-white
        rounded-2xl
        p-6
        shadow-sm
        flex
        justify-between
        "
      >


        <div>

          <h1 className="
          text-2xl
          font-bold
          text-slate-800
          ">
            Patient Monitoring
          </h1>


          <p className="text-slate-500">

            {patient.patient_code}
            {" - "}
            {patient.name}

          </p>


        </div>


        <div
        className="
        bg-red-100
        text-red-600
        px-4
        py-2
        rounded-full
        "
        >

          {patient.urgency_level}

        </div>


      </div>



      {/* IDENTITAS PASIEN */}

      <PatientIdentity

        data={{

          medicalRecord:
          patient.patient_code,

          name:
          patient.name,

          age:
          patient.clinical_data?.age ?? "-",

          gender:
          patient.clinical_data?.gender ?? "-",

          bloodType:
          "-",

          birthDate:
          "-",

          address:
          "-",

          room:
          "-",

          doctor:
          "-",

          admissionDate:
          patient.created_at ?? "-"

        }}

      />




      {/* DATA VITAL */}

<VitalSignsCard
  data={patient.clinical_data}
/>





      {/* AI SUMMARY */}

<MonitoringSummary

  data={{

    condition:
    patient.urgency_level,


    observation:[

  `Risk Score : ${
    patient.prediction?.risk_score ?? patient.risk_score ?? "-"
  }%`,

  `Priority Rank : ${
    patient.prediction?.urgency_priority ?? "-"
  }`,

  `Status : ${patient.case_status}`

],


    recommendation:[

      "Continue ICU monitoring"

    ]

  }}

/>

<AIExplanation

data={{

summary:
patient.llm_explanation?.summary 
?? "No AI explanation available",


generated_at:
patient.llm_explanation?.generated_at
?? patient.created_at

}}

/>

<RiskFactorAnalysis

data={
  patient.shap_explanation?.top_features ?? []
}

/>




    </main>


  );

}