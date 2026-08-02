"use client";

import { useEffect, useState } from "react";

import { RxPeople } from "react-icons/rx";
import { LuSiren } from "react-icons/lu";
import { LuActivity } from "react-icons/lu";
import { LuShieldCheck } from "react-icons/lu";

import StatCard from "@/components/statcard";
import PatientsMonitoring from "@/components/patientsmonitoring";


interface Patient {

  id:string;

  name:string;

  patient_code:string;

  risk_score:number;

  urgency_level:
  "critical" |
  "high" |
  "moderate" |
  "low";

  case_status:string;

  rank:number;

}


export default function BerandaPage() {


  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
const [lastUpdate, setLastUpdate] = useState("");


  // =========================
  // GET DATA API QUEUE
  // =========================

useEffect(() => {

  setLastUpdate(
    new Date().toLocaleTimeString()
  );


  async function fetchPatients(){

    try {

      const response = await fetch(
        "https://dcse-icu-patient-risk.onrender.com/api/patients/queue"
      );


const data = await response.json();

console.log("API DATA:", data.items);


setPatients(
  data.items ?? []
);


    } catch(error){

      console.error(error);

    } finally {

      setLoading(false);

    }

  }


  fetchPatients();


},[]);



  // =========================
  // STATISTIC
  // =========================


  const totalPatient = patients.length;


const criticalPatient =
patients.filter(
p => p.urgency_level === "critical"
).length;



const highRiskPatient =
patients.filter(
p => p.urgency_level === "high"
).length;



const stablePatient =
patients.filter(
  p => p.urgency_level === "low"
).length;



  return (

    <div className="w-full min-h-screen bg-slate-100">


      <div className="p-6 py-25 space-y-6">


        {/* HEADER */}

        <div className="bg-white rounded-2xl p-6 shadow-sm">

          <h1 className="text-2xl font-bold text-slate-800">
            🏥 ICU Monitoring Dashboard
          </h1>


          <p className="text-sm text-slate-500 mt-2">
            API Status : 
            <span className="text-green-600 font-semibold ml-1">
              Online
            </span>
          </p>


          <p className="text-sm text-slate-500">
            Last Update : {new Date().toLocaleTimeString()}
          </p>


        </div>



        {/* ======================
            KPI CARD
        ======================= */}


        <div className="
          grid 
          grid-cols-1 
          md:grid-cols-2 
          xl:grid-cols-4 
          gap-5
        ">


          <StatCard
            icon={
              <RxPeople className="text-cyan-600 text-3xl"/>
            }
            value={
              loading 
              ? "..."
              : totalPatient.toString()
            }
            label="Total Patient"
            color="text-cyan-600"
          />



          <StatCard
            icon={
              <LuSiren className="text-red-500 text-3xl"/>
            }
            value={
              criticalPatient.toString()
            }
            label="Critical"
            color="text-red-500"
          />



          <StatCard
            icon={
              <LuActivity className="text-orange-500 text-3xl"/>
            }
            value={
              highRiskPatient.toString()
            }
            label="High Risk"
            color="text-orange-500"
          />



          <StatCard
            icon={
              <LuShieldCheck className="text-green-600 text-3xl"/>
            }
            value={
              stablePatient.toString()
            }
            label="Stable"
            color="text-green-600"
          />



        </div>




        {/* ======================
            PATIENT QUEUE
        ======================= */}


        <div className="
          bg-white 
          rounded-2xl 
          p-5 
          shadow-sm
        ">


          <div className="flex justify-between items-center mb-5">


            <h2 className="
              text-lg 
              font-semibold 
              text-slate-800
            ">
              Antrean Prioritas ICU
            </h2>


            <button
              className="
              text-cyan-600
              text-sm
              font-medium
              "
            >
              View All →
            </button>


          </div>



          <PatientsMonitoring 
            patients={patients}
          />



        </div>



        {/* ======================
             RISK DISTRIBUTION
        ======================= */}


        <div className="
          bg-white 
          rounded-2xl 
          p-6
          shadow-sm
        ">


          <h2 className="
            font-semibold 
            text-slate-800
            mb-4
          ">
            Grafik Distribusi Risiko
          </h2>


          <div className="space-y-3">


            <RiskBar
              label="Critical"
              value={criticalPatient}
              total={totalPatient}
            />


            <RiskBar
              label="High Risk"
              value={highRiskPatient}
              total={totalPatient}
            />


            <RiskBar
              label="Stable"
              value={stablePatient}
              total={totalPatient}
            />


          </div>


        </div>



      </div>


    </div>

  );

}




function RiskBar({
  label,
  value,
  total
}:{
  label:string;
  value:number;
  total:number;
}){


  const percent =
    total===0
    ? 0
    : (value/total)*100;


  return (

    <div>

      <div className="
        flex 
        justify-between 
        text-sm
        mb-1
      ">

        <span>
          {label}
        </span>

        <span>
          {value}
        </span>

      </div>


      <div className="
        w-full 
        bg-slate-200 
        rounded-full 
        h-3
      ">


        <div
          className="
          bg-cyan-500
          h-3
          rounded-full
          "
          style={{
            width:`${percent}%`
          }}
        />


      </div>


    </div>

  );

}