import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import DataProduk from './pages/DataProduk';
import DataPelanggan from './pages/DataPelanggan';
import UserManagement from './pages/UserManagement';
import DaftarPenjualan from './pages/DaftarPenjualan';
import ApprovalStokMasuk from './pages/ApprovalStokMasuk';
import RiwayatStok from './pages/RiwayatStok';
import PengirimanBarang from './pages/PengirimanBarang';
import InputStokMasuk from './pages/InputStokMasuk';
import AgingSchedule from './pages/AgingSchedule';
import LaporanPenjualan from './pages/LaporanPenjualan';
import MonitoringPiutang from './pages/MonitoringPiutang';
import InputPesanan from './pages/InputPesanan';
import LaporanKunjungan from './pages/LaporanKunjungan';
import TargetPenjualan from './pages/TargetPenjualan';
import { ProtectedRoute, PublicRoute } from './components/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path="/login" 
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          } 
        />
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/data-produk" 
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <DataProduk />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/data-pelanggan" 
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <DataPelanggan />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/user-management" 
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <UserManagement />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/daftar-penjualan" 
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <DaftarPenjualan />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/approval-stok" 
          element={
            <ProtectedRoute allowedRoles={['kepala_gudang']}>
              <ApprovalStokMasuk />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/riwayat-stok" 
          element={
            <ProtectedRoute allowedRoles={['kepala_gudang']}>
              <RiwayatStok />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/pengiriman-barang" 
          element={
            <ProtectedRoute allowedRoles={['kepala_gudang', 'staff_gudang']}>
              <PengirimanBarang />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/input-stok-masuk" 
          element={
            <ProtectedRoute allowedRoles={['staff_gudang']}>
              <InputStokMasuk />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/aging-schedule" 
          element={
            <ProtectedRoute allowedRoles={['owner']}>
              <AgingSchedule />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/laporan-penjualan" 
          element={
            <ProtectedRoute allowedRoles={['owner']}>
              <LaporanPenjualan />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/monitoring-piutang" 
          element={
            <ProtectedRoute allowedRoles={['owner', 'sales']}>
              <MonitoringPiutang />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/input-pesanan" 
          element={
            <ProtectedRoute allowedRoles={['sales']}>
              <InputPesanan />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/laporan-kunjungan" 
          element={
            <ProtectedRoute allowedRoles={['sales']}>
              <LaporanKunjungan />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/target-penjualan" 
          element={
            <ProtectedRoute allowedRoles={['admin', 'owner', 'sales']}>
              <TargetPenjualan />
            </ProtectedRoute>
          } 
        />
        {/* Default route redirects to login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
