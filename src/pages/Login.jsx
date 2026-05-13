import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2, Building2 } from 'lucide-react';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (!username || !password) return;
    setErrorMsg('');

    setIsLoading(true);

    // Mock Authentication Logic
    // Valid Credentials Dictionary
    const validUsers = {
      'admin': { pass: 'admin123', role: 'admin', fullName: 'Admin' },
      'kepala': { pass: 'gudang123', role: 'kepala_gudang', fullName: 'Kepala Gudang' },
      'staff': { pass: 'staff123', role: 'staff_gudang', fullName: 'Staff Gudang' },
      'owner': { pass: 'owner123', role: 'owner', fullName: 'Owner' },
      'sales': { pass: 'sales123', role: 'sales', fullName: 'Sales' }
    };

    const userKey = username.toLowerCase();
    const validUser = validUsers[userKey];

    if (!validUser || validUser.pass !== password) {
      setTimeout(() => {
        setIsLoading(false);
        setErrorMsg('Username atau password salah!');
      }, 600);
      return;
    }

    // Save to localStorage
    localStorage.setItem('userRole', validUser.role);
    localStorage.setItem('userFullName', validUser.fullName);

    setTimeout(() => {
      setIsLoading(false);
      navigate('/dashboard');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4 font-sans">
      <div className="bg-white p-8 md:p-10 rounded-xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] w-full max-w-[400px] flex flex-col items-center">

        {/* Logo Section */}
        <div className="flex flex-col items-center mb-8 w-full">
          <div className="h-14 w-14 bg-[#0B56A6] rounded-xl flex items-center justify-center mb-3">
            <Building2 className="text-white w-7 h-7" />
          </div>
          <h1 className="text-2xl font-bold text-[#1E293B] tracking-tight">GANA</h1>
          <p className="text-sm text-[#64748B]">Sistem Distribusi</p>
        </div>

        {errorMsg && (
          <div className="w-full bg-[#FEE2E2] text-[#DC2626] text-sm font-semibold p-3 rounded-lg mb-4 text-center">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleLogin} className="w-full flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-[#334155]">Username</label>
            <input
              type="text"
              placeholder="Masukkan username"
              className="w-full px-3.5 py-2.5 rounded-lg border border-[#E2E8F0] focus:outline-none focus:ring-1 focus:ring-[#0B56A6] focus:border-[#0B56A6] transition-all text-sm placeholder:text-[#94A3B8]"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-[#334155]">Password</label>
            <input
              type="password"
              placeholder="Masukkan password"
              className="w-full px-3.5 py-2.5 rounded-lg border border-[#E2E8F0] focus:outline-none focus:ring-1 focus:ring-[#0B56A6] focus:border-[#0B56A6] transition-all text-sm placeholder:text-[#94A3B8]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="mt-2 w-full bg-[#8cc63f] hover:bg-[#7db338] active:bg-[#6c9c30] text-white font-semibold py-2.5 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed text-sm"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              'Masuk'
            )}
          </button>

          {/* Demo Credentials Reminder */}
          <div className="mt-6 bg-[#F8FAFC] rounded-lg p-4 border border-[#E2E8F0]">
            <p className="text-[11px] text-center font-semibold text-[#94A3B8] mb-2 uppercase tracking-wide">Demo Credentials:</p>
            <ul className="text-xs text-center text-[#475569] space-y-1 font-medium">
              <li><span className="font-bold text-[#1E293B]">admin</span> / admin123 - Admin</li>
              <li><span className="font-bold text-[#1E293B]">kepala</span> / gudang123 - Kepala Gudang</li>
              <li><span className="font-bold text-[#1E293B]">staff</span> / staff123 - Staff Gudang</li>
              <li><span className="font-bold text-[#1E293B]">owner</span> / owner123 - Owner</li>
              <li><span className="font-bold text-[#1E293B]">sales</span> / sales123 - Sales</li>
            </ul>
          </div>
        </form>

        <div className="mt-8 text-center pt-5 w-full">
          <p className="text-xs text-[#94A3B8] font-medium">
            Sistem ERP untuk Manajemen Distribusi
          </p>
        </div>
      </div>
    </div>
  );
}
