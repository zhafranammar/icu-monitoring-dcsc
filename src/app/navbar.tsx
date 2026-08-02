"use client";

import { FiBell, FiSettings } from "react-icons/fi";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const pageInfo: Record<
    string,
    {
      title: string;
      subtitle: string;
    }
  > = {

    "/beranda": {
      title: "Beranda",
      subtitle: getCurrentSession(),
    },


    "/monitoring": {
      title: "ICU Monitoring",
      subtitle: getCurrentSession(),
    },


    "/pasien": {
      title: "Daftar Pasien ICU",
      subtitle: getCurrentSession(),
    },


    "/tambahpasien": {
      title: "Pendaftaran Pasien ICU",
      subtitle: getCurrentSession(),
    },


  };


  const current =
    pageInfo[pathname] ??
    {
      title: "SIMRS ICU",
      subtitle: getCurrentSession(),
    };


  return (
    <nav className="bg-white border-b border-gray-200 h-20 px-6 flex items-center justify-between">

      {/* Kiri */}
      <div>

        <h1 className="text-2xl font-bold text-gray-800">
          {current.title}
        </h1>


        <p className="text-sm text-gray-500">
          {current.subtitle}
        </p>

      </div>



      {/* Kanan */}
      <div className="flex items-center gap-6">


        <div className="
          flex 
          items-center 
          gap-2 
          bg-green-100 
          text-green-700 
          px-4 
          py-2 
          rounded-xl
        ">

          <FiSettings />

          <span className="font-medium">
            Sistem Aktif
          </span>

        </div>



        <div className="
          flex 
          items-center 
          gap-2 
          bg-gray-100 
          px-4 
          py-2 
          rounded-xl
        ">

          <FiBell className="text-lg text-orange-500" />

          <span className="font-semibold">
            3
          </span>

        </div>


      </div>


    </nav>
  );
}



function getCurrentSession() {

  const now = new Date();


  const date = now.toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });


  const hour = now.getHours();


  let session = "Sesi Pagi";


  if (hour >= 12 && hour < 17) {

    session = "Sesi Siang";

  } else if (hour >= 17) {

    session = "Sesi Malam";

  }


  return `${date} • ${session}`;

}