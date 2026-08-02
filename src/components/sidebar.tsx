"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaBars } from "react-icons/fa";
import { CiGrid41 } from "react-icons/ci";
import { HiOutlineTrendingUp } from "react-icons/hi";

import { TfiListOl } from "react-icons/tfi";

import { FaHeartbeat } from "react-icons/fa";

type SidebarProps = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
};

const navItems = [
  { 
    href: "/beranda", 
    label: "Dashboard ICU", 
    icon: <CiGrid41 size={20} /> 
  },

  { 
    href: "/tambahpasien", 
    label: "Pendaftaran Pasien", 
    icon: <TfiListOl size={18} /> 
  },

  { 
    href: "/antrean", 
    label: "Antrean ICU", 
    icon: <HiOutlineTrendingUp size={20} /> 
  },
  { 
    href: "/riwayat", 
    label: "Riwayat Pasien", 
    icon: <HiOutlineTrendingUp size={20} /> 
  },
];

export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      <aside
        className={`fixed top-0 left-0 h-screen bg-white text-green-700 transition-all duration-300 z-50 flex flex-col shadow-2xl ${
          isOpen ? "w-64" : "w-20"
        }`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-4 py-4">
  {isOpen ? (
    <div className="flex items-center gap-3">
      {/* Logo */}
      <div className="bg-emerald-600 p-2.5 rounded-xl flex items-center justify-center">
        <FaHeartbeat className="w-6 h-6 text-white" />
      </div>

      {/* Judul */}
      <div>
        <h1 className="text-lg font-bold text-black">
          SIRS UGM
        </h1>
        <p className="text-[10px] text-gray-600">
          Sistem Informasi Rumah Sakit
        </p>
      </div>
    </div>
  ) : (
    <div />
  )}

  <button
    onClick={() => setIsOpen(!isOpen)}
    className="p-2 rounded-lg hover:bg-green-200 transition"
    title="Toggle sidebar"
  >
    <FaBars size={16} />
  </button>
</div>

        {/* Navigation */}
        <nav className="flex-1 px-2 py-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-300 ${
                  isActive
                    ? "bg-green-300 shadow-lg scale-105"
                    : "text-gray-600 hover:bg-green-300/50 hover:text-green-600"
                }`}
                title={!isOpen ? item.label : undefined}
              >
                <span className="shrink-0">{item.icon}</span>
                <span
                  className={`text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                    isOpen ? "opacity-100 w-auto" : "opacity-0 w-0 overflow-hidden"
                  }`}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        {isOpen && (
          <div className="px-4 py-3">
            <p className="text-xs text-blue-400">Manajemen Informasi Biomedis v1.0 — Prototipe</p>
          </div>
        )}
      </aside>

      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
