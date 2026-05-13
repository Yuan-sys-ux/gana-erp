import Sidebar from '../components/Sidebar';
import { useState, useEffect } from 'react';

export default function DashboardLayout({ children }) {
  const [role, setRole] = useState(() => localStorage.getItem('userRole') || 'admin');
  const [fullName, setFullName] = useState(() => localStorage.getItem('userFullName') || 'Admin');

  useEffect(() => {
    setRole(localStorage.getItem('userRole') || 'admin');
    setFullName(localStorage.getItem('userFullName') || 'Admin');
  }, []);

  let headerTitle = 'Admin - Central Control';
  if (role === 'kepala_gudang') {
    headerTitle = 'Kepala Gudang - Inventory Supervisor';
  } else if (role === 'staff_gudang') {
    headerTitle = 'Staff Gudang - Warehouse Operations';
  } else if (role === 'owner') {
    headerTitle = 'Owner - Executive Dashboard';
  } else if (role === 'sales') {
    headerTitle = 'Sales - Field Operations';
  }

  const initial = fullName.charAt(0).toUpperCase();

  return (
    <div className="min-h-screen flex bg-white font-sans text-[#1E293B]">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 bg-[#F8FAFC]">
        {/* Simple Header */}
        <header className="h-16 bg-white border-b border-[#E2E8F0] flex items-center justify-between px-8 sticky top-0 z-10 shrink-0">
          <div>
            <h2 className="text-base font-bold text-[#1E293B]">{headerTitle}</h2>
            <p className="text-xs text-[#64748B]">Selamat datang di sistem GANA</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex flex-col items-end">
              <span className="text-sm font-bold text-[#1E293B] block">{fullName}</span>
              <span className="text-xs text-[#64748B] capitalize">{role.replace('_', ' ')}</span>
            </div>
            <div className="w-10 h-10 rounded-full bg-[#4F46E5] flex items-center justify-center font-bold text-white shadow-sm">
              {initial}
            </div>
          </div>
        </header>

        <main className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-[1200px]">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
