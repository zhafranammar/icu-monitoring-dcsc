"use client";

import { useState } from "react";

import {
  FiUser,
  FiPhone,
  FiActivity,
  FiHeart,
  FiSave,
  FiArrowLeft,
} from "react-icons/fi";


export default function PendaftaranICU() {


const initialForm = {

medicalRecord:"",
name:"",
nik:"",
birthDate:"",
age:"",
gender:"",
bloodType:"",
address:"",

payment:"",
bpjs:"",
admissionDate:"",
doctor:"",

familyName:"",
relationship:"",
phone:"",
familyAddress:"",

room:"",
priority:"",
icuDate:"",
source:"",

complaint:"",
medicalHistory:"",
diagnosis:"",
icuReason:"",

heartRate:"",
bloodPressure:"",
spo2:"",
respiratoryRate:"",
temperature:"",
gcs:"",

ventilator:"",
therapy:""

};



const [formData,setFormData] = useState(initialForm);


const [showPopup,setShowPopup] = useState(false);



function handleChange(
e:React.ChangeEvent<
HTMLInputElement |
HTMLTextAreaElement |
HTMLSelectElement
>
){


setFormData({

...formData,

[e.target.name]:e.target.value

});


}




function handleSubmit(){


console.log(
"DATA PASIEN ICU",
formData
);


// nanti diganti API DATABASE


setShowPopup(true);


}




function resetForm(){


setFormData(initialForm);

setShowPopup(false);


}



return (

<div className="min-h-screen bg-gray-300">

<main>


{/* HEADER */}

<div className="bg-white border-b px-8 py-5">

<div className="flex items-center gap-3">

<button className="p-2 hover:bg-gray-100 rounded-lg">

<FiArrowLeft/>

</button>


<div>

<h1 className="text-xl font-bold text-gray-900">
Pendaftaran Pasien ICU
</h1>

<p className="text-sm text-gray-500">
Form registrasi pasien baru ICU
</p>

</div>

</div>

</div>





<div className="mt-6 px-6 pb-10">


<div className="
max-w-7xl
mx-auto
bg-white
rounded-2xl
shadow-sm
border
p-6
space-y-8
">





{/* IDENTITAS */}

<section>

<h2 className="text-lg font-bold border-b pb-3 flex gap-2 items-center">

<FiUser className="text-blue-600"/>

Identitas Pasien

</h2>


<div className="grid md:grid-cols-2 gap-5 mt-5">


<Input name="medicalRecord" label="Nomor Rekam Medis" placeholder="RM-2026001" value={formData.medicalRecord} onChange={handleChange}/>


<Input name="name" label="Nama Lengkap" placeholder="Nama pasien" value={formData.name} onChange={handleChange}/>


<Input name="nik" label="NIK" placeholder="Nomor KTP" value={formData.nik} onChange={handleChange}/>


<Input name="birthDate" label="Tanggal Lahir" type="date" value={formData.birthDate} onChange={handleChange}/>


<Input name="age" label="Umur" placeholder="65 tahun" value={formData.age} onChange={handleChange}/>



<Select
name="gender"
label="Jenis Kelamin"
value={formData.gender}
onChange={handleChange}
options={[
"Laki-laki",
"Perempuan"
]}
/>



<Input name="bloodType" label="Golongan Darah" placeholder="O+" value={formData.bloodType} onChange={handleChange}/>


<Input name="address" label="Alamat" placeholder="Alamat lengkap" value={formData.address} onChange={handleChange}/>



</div>


</section>






{/* ADMIN */}

<section>

<h2 className="text-lg font-bold border-b pb-3">

Informasi Administrasi

</h2>



<div className="grid md:grid-cols-2 gap-5 mt-5">


<Select
name="payment"
label="Jenis Pembayaran"
value={formData.payment}
onChange={handleChange}
options={[
"BPJS",
"Umum",
"Asuransi"
]}
/>



<Input
name="bpjs"
label="Nomor BPJS"
placeholder="Nomor peserta"
value={formData.bpjs}
onChange={handleChange}
/>



<Input
name="admissionDate"
label="Tanggal Masuk Rumah Sakit"
type="date"
value={formData.admissionDate}
onChange={handleChange}
/>



<Input
name="doctor"
label="Dokter Penanggung Jawab"
placeholder="dr. Nama dokter"
value={formData.doctor}
onChange={handleChange}
/>



</div>


</section>







{/* KELUARGA */}

<section>


<h2 className="text-lg font-bold border-b pb-3 flex gap-2">

<FiPhone/>

Kontak Keluarga

</h2>


<div className="grid md:grid-cols-2 gap-5 mt-5">


<Input
name="familyName"
label="Nama Keluarga"
value={formData.familyName}
onChange={handleChange}
/>


<Input
name="relationship"
label="Hubungan"
value={formData.relationship}
onChange={handleChange}
/>


<Input
name="phone"
label="Nomor Telepon"
value={formData.phone}
onChange={handleChange}
/>


<Input
name="familyAddress"
label="Alamat Keluarga"
value={formData.familyAddress}
onChange={handleChange}
/>


</div>

</section>







{/* ICU */}

<section>


<h2 className="text-lg font-bold border-b pb-3 flex gap-2">

<FiActivity/>

Informasi Masuk ICU

</h2>


<div className="grid md:grid-cols-2 gap-5 mt-5">


<Select
name="room"
label="Ruangan ICU"
value={formData.room}
onChange={handleChange}
options={[
"ICU-01",
"ICU-02",
"ICU-03"
]}
/>



<Select
name="priority"
label="Prioritas ICU"
value={formData.priority}
onChange={handleChange}
options={[
"Critical",
"High Risk",
"Stable"
]}
/>


<Input
name="icuDate"
label="Tanggal Masuk ICU"
type="date"
value={formData.icuDate}
onChange={handleChange}
/>



<Input
name="source"
label="Sumber Masuk"
placeholder="IGD/Ruangan/Rujukan"
value={formData.source}
onChange={handleChange}
/>



</div>


</section>







{/* KLINIS */}

<section>


<h2 className="text-lg font-bold border-b pb-3">

Kondisi Klinis Awal

</h2>


<div className="grid md:grid-cols-2 gap-5 mt-5">


<TextArea
name="complaint"
label="Keluhan Utama"
value={formData.complaint}
onChange={handleChange}
/>


<TextArea
name="medicalHistory"
label="Riwayat Penyakit"
value={formData.medicalHistory}
onChange={handleChange}
/>


<TextArea
name="diagnosis"
label="Diagnosis Awal"
value={formData.diagnosis}
onChange={handleChange}
/>


<TextArea
name="icuReason"
label="Alasan Masuk ICU"
value={formData.icuReason}
onChange={handleChange}
/>


</div>


</section>







{/* VITAL */}

<section>


<h2 className="text-lg font-bold border-b pb-3 flex gap-2">

<FiHeart/>

Vital Sign Awal ICU

</h2>


<div className="grid md:grid-cols-3 gap-5 mt-5">


<Input
name="heartRate"
label="Heart Rate"
placeholder="110 bpm"
value={formData.heartRate}
onChange={handleChange}
/>


<Input
name="bloodPressure"
label="Blood Pressure"
placeholder="120/80 mmHg"
value={formData.bloodPressure}
onChange={handleChange}
/>


<Input
name="spo2"
label="SpO2"
placeholder="92%"
value={formData.spo2}
onChange={handleChange}
/>


<Input
name="respiratoryRate"
label="Respiratory Rate"
placeholder="24 rpm"
value={formData.respiratoryRate}
onChange={handleChange}
/>


<Input
name="temperature"
label="Temperature"
placeholder="37.5°C"
value={formData.temperature}
onChange={handleChange}
/>


<Input
name="gcs"
label="GCS Score"
placeholder="15"
value={formData.gcs}
onChange={handleChange}
/>


</div>


</section>






{/* TERAPI */}

<section>

<h2 className="text-lg font-bold border-b pb-3">

Terapi Awal ICU

</h2>


<div className="grid md:grid-cols-2 gap-5 mt-5">


<TextArea
name="ventilator"
label="Ventilator / Respiratory Support"
value={formData.ventilator}
onChange={handleChange}
/>


<TextArea
name="therapy"
label="Obat dan Terapi"
value={formData.therapy}
onChange={handleChange}
/>


</div>


</section>







<button

onClick={handleSubmit}

className="
w-full
bg-emerald-600
hover:bg-emerald-700
text-white
py-3
rounded-xl
font-semibold
flex
justify-center
items-center
gap-2
"

>

<FiSave/>

Simpan Data Pasien ICU

</button>



</div>

</div>





{/* POPUP */}

{
showPopup &&

<div className="
fixed
inset-0
bg-black/40
flex
items-center
justify-center
z-50
">


<div className="
bg-white
rounded-2xl
p-8
text-center
shadow-xl
w-96
">


<div className="
text-5xl
text-green-600
mb-4
">

✓

</div>


<h2 className="text-xl font-bold">

Data Berhasil Disimpan

</h2>


<p className="text-gray-500 mt-2">

Data pasien ICU berhasil ditambahkan.

</p>


<button

onClick={resetForm}

className="
mt-6
bg-emerald-600
text-white
px-8
py-2
rounded-xl
"

>

OK

</button>


</div>


</div>

}



</main>

</div>


);


}







interface InputProps {
  name: string;
  label: string;
  placeholder?: string;
  type?: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
}


function Input({
  name,
  label,
  placeholder,
  type = "text",
  value,
  onChange
}: InputProps) {

  return (
    <div>

      <label className="text-sm text-gray-600">
        {label}
      </label>


      <input
        name={name}
        value={value}
        onChange={onChange}
        type={type}
        placeholder={placeholder}

        className="
        w-full
        mt-1
        px-4
        py-3
        bg-gray-50
        rounded-xl
        border
        "
      />

    </div>
  );
}





interface SelectProps {

  name:string;

  label:string;

  options:string[];

  value:string;

  onChange:(
    e:React.ChangeEvent<HTMLSelectElement>
  )=>void;

}



function Select({
  name,
  label,
  options,
  value,
  onChange
}:SelectProps){


return (

<div>

<label className="text-sm text-gray-600">
{label}
</label>


<select

name={name}

value={value}

onChange={onChange}

className="
w-full
mt-1
px-4
py-3
bg-gray-50
rounded-xl
border
"

>

<option value="">
Pilih
</option>


{
options.map((item)=>(
<option
key={item}
value={item}
>
{item}
</option>
))
}


</select>


</div>

)

}






interface TextAreaProps {

name:string;

label:string;

value:string;

onChange:(
e:React.ChangeEvent<HTMLTextAreaElement>
)=>void;

}



function TextArea({

name,

label,

value,

onChange

}:TextAreaProps){


return (

<div>


<label className="text-sm text-gray-600">

{label}

</label>


<textarea

name={name}

value={value}

onChange={onChange}

className="
w-full
mt-1
px-4
py-3
bg-gray-50
rounded-xl
border
h-28
"

/>


</div>

)

}