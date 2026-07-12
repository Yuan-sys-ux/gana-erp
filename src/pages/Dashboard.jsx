import { useEffect, useState } from 'react';
import DashboardAdmin from './DashboardAdmin';
import DashboardKepalaGudang from './DashboardKepalaGudang';
import DashboardStaffGudang from './DashboardStaffGudang';
import DashboardOwner from './DashboardOwner';
import DashboardSales from './DashboardSales';

export default function Dashboard() {
  const [role, setRole] = useState('admin');

  useEffect(() => {
    const savedRole = sessionStorage.getItem('userRole') || 'admin';
    setRole(savedRole);
  }, []);

  if (role === 'kepala_gudang') {
    return <DashboardKepalaGudang />;
  } else if (role === 'staff_gudang') {
    return <DashboardStaffGudang />;
  } else if (role === 'owner') {
    return <DashboardOwner />;
  } else if (role === 'sales') {
    return <DashboardSales />;
  }

  return <DashboardAdmin />;
}
