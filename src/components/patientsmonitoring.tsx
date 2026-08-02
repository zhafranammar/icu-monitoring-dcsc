import Link from "next/link";

interface Patient {

  id:string;
  name:string;
  risk_score:number;
  urgency_level:string;
  case_status:string;
  rank:number;

}

export default function PatientsMonitoring({
  patients
}:{
  patients:Patient[]
}){


return (

<div className="overflow-x-auto">


<table className="w-full">


<thead>

<tr className="text-left border-b">

<th className="p-3">
Nama
</th>

<th>
Risk Score
</th>

<th>
Prioritas
</th>

<th>
Status
</th>


</tr>

</thead>



<tbody>


{
patients.map((patient,index)=>(


<tr
key={index}
className="border-b"
>


<td className="p-3">
{patient.name}
</td>


<td>
{patient.risk_score}%
</td>

<td>

<span
className={`
px-3 py-1 rounded-full text-xs

${
patient.urgency_level==="critical"
?"bg-red-100 text-red-600"

:
patient.urgency_level==="high"
?"bg-orange-100 text-orange-600"

:
"bg-green-100 text-green-600"

}

`}
>

{patient.urgency_level}

</span>


</td>



<td>

{patient.case_status}

</td>

<td>

<Link href={`/pasien/${patient.id}`}
className="
text-cyan-600
hover:text-cyan-800
font-medium
text-sm
"
>

View

</Link>


</td>

</tr>


))

}


</tbody>


</table>


</div>


);


}