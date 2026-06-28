import { useState, useEffect } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import { DollarSign, Calendar as CalendarIcon, AlertTriangle, Loader2 } from 'lucide-react';
import api from '../utils/api';
import { getOrders, getProducts } from '../utils/mockDb';

export default function AgingSchedule() {
  const [isLoading, setIsLoading] = useState(true);
  const [agingData, setAgingData] = useState({
    cards: {
      totalPiutang: 0,
      current30: 0,
      d60_90: 0,
      d180_plus: 0
    },
    table: []
  });

  const loadLocalAging = () => {
    const orders = getOrders();
    const monthsId = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Ags', 'Sep', 'Okt', 'Nov', 'Des'];

    const parseDueDate = (dateStr) => {
      if (!dateStr) return new Date();
      const parts = dateStr.split(' ');
      if (parts.length < 3) return new Date();
      const day = parseInt(parts[0]);
      const monthName = parts[1];
      const year = parseInt(parts[2]);
      const monthIdx = monthsId.indexOf(monthName);
      return new Date(year, monthIdx, day);
    };

    const unpaidOrders = orders.filter(o => o.paymentMethod === 'Tempo' && o.statusBayar !== 'Lunas');
    const now = new Date(2026, 5, 12); // 12 June 2026

    const customerMap = {};
    unpaidOrders.forEach(o => {
      if (!customerMap[o.customer]) {
        customerMap[o.customer] = {
          name: o.customer,
          city: o.address ? o.address.split(',').pop().trim() : 'Banjarmasin',
          current: 0,
          d1_30: 0,
          d31_60: 0,
          d61_90: 0,
          d91_180: 0,
          d180_plus: 0,
          total: 0
        };
      }

      const dueDate = parseDueDate(o.dueDate);
      const diffTime = now.getTime() - dueDate.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      const amt = Number(o.total || 0);

      if (diffDays <= 0) {
        customerMap[o.customer].current += amt;
      } else if (diffDays <= 30) {
        customerMap[o.customer].d1_30 += amt;
      } else if (diffDays <= 60) {
        customerMap[o.customer].d31_60 += amt;
      } else if (diffDays <= 90) {
        customerMap[o.customer].d61_90 += amt;
      } else if (diffDays <= 180) {
        customerMap[o.customer].d91_180 += amt;
      } else {
        customerMap[o.customer].d180_plus += amt;
      }
      customerMap[o.customer].total += amt;
    });

    const tableData = Object.values(customerMap).filter(c => c.total > 0);

    let totalPiutang = 0;
    let current30 = 0;
    let d60_90 = 0;
    let d180_plus = 0;

    tableData.forEach(c => {
      totalPiutang += c.total;
      current30 += c.current + c.d1_30;
      d60_90 += c.d31_60 + c.d61_90;
      d180_plus += c.d91_180 + c.d180_plus;
    });

    return {
      cards: { totalPiutang, current30, d60_90, d180_plus },
      table: tableData
    };
  };

  const fetchAging = () => {
    setIsLoading(true);
    api.get('/api/owner/aging-schedule')
      .then(res => {
        if (res.data && res.data.success) {
          setAgingData({
            cards: res.data.cards,
            table: res.data.table
          });
        }
        setIsLoading(false);
      })
      .catch(err => {
        console.error("Gagal memuat aging schedule dari API, gunakan fallback lokal:", err);
        const localData = loadLocalAging();
        setAgingData(localData);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchAging();
  }, []);

  // Compute column totals
  const totalRow = agingData.table.reduce((acc, row) => {
    acc.current += row.current;
    acc.d1_30 += row.d1_30;
    acc.d31_60 += row.d31_60;
    acc.d61_90 += row.d61_90;
    acc.d91_180 += row.d91_180;
    acc.d180_plus += row.d180_plus;
    acc.total += row.total;
    return acc;
  }, { current: 0, d1_30: 0, d31_60: 0, d61_90: 0, d91_180: 0, d180_plus: 0, total: 0 });

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div>
          <h2 className="text-xl font-bold text-[#1E293B]">Jadwal Umur Piutang (Aging Schedule)</h2>
          <p className="text-sm text-[#64748B] mt-1">Tabel piutang dengan indikator 30, 60, 90, 180 hingga 800+ hari</p>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <Loader2 className="w-8 h-8 text-[#4F46E5] animate-spin" />
            <p className="text-xs font-bold text-[#64748B]">Memuat data aging...</p>
          </div>
        ) : (
          <>
            {/* Top Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white rounded-xl shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)] border border-[#E2E8F0] p-5 flex flex-col gap-2">
                <DollarSign className="w-5 h-5 text-[#3B82F6]" />
                <p className="text-xs font-semibold text-[#64748B]">Total Piutang</p>
                <h3 className="text-[22px] font-bold text-[#1E293B]">
                  Rp {(agingData.cards.totalPiutang / 1000000).toFixed(1)}jt
                </h3>
              </div>
              <div className="bg-white rounded-xl shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)] border border-[#E2E8F0] p-5 flex flex-col gap-2">
                <div className="w-3 h-3 rounded-full bg-[#22C55E]"></div>
                <p className="text-xs font-semibold text-[#64748B]">Belum Jatuh Tempo + 30 Hari</p>
                <h3 className="text-[22px] font-bold text-[#22C55E]">
                  Rp {(agingData.cards.current30 / 1000000).toFixed(1)}jt
                </h3>
              </div>
              <div className="bg-white rounded-xl shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)] border border-[#E2E8F0] p-5 flex flex-col gap-2">
                <div className="w-3 h-3 rounded-full bg-[#F59E0B]"></div>
                <p className="text-xs font-semibold text-[#64748B]">60-90 Hari</p>
                <h3 className="text-[22px] font-bold text-[#F59E0B]">
                  Rp {(agingData.cards.d60_90 / 1000000).toFixed(1)}jt
                </h3>
              </div>
              <div className="bg-white rounded-xl shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)] border border-[#E2E8F0] p-5 flex flex-col gap-2">
                <div className="w-3 h-3 rounded-full bg-[#EF4444]"></div>
                <p className="text-xs font-semibold text-[#64748B]">180+ Hari (Kritis)</p>
                <h3 className="text-[22px] font-bold text-[#EF4444]">
                  Rp {(agingData.cards.d180_plus / 1000000).toFixed(1)}jt
                </h3>
              </div>
            </div>

            {/* Aging Table */}
            <div className="bg-white rounded-xl shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)] border border-[#E2E8F0] overflow-hidden mt-2">
              <div className="p-5 border-b border-[#E2E8F0] flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#EEF2FF] flex items-center justify-center">
                  <CalendarIcon className="w-5 h-5 text-[#4F46E5]" />
                </div>
                <div>
                  <h3 className="font-bold text-[#1E293B]">Tabel Umur Piutang</h3>
                  <p className="text-xs text-[#64748B] mt-0.5">
                    Per tanggal {new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </p>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left whitespace-nowrap">
                  <thead>
                    <tr className="bg-[#F8FAFC] text-[11px] font-bold text-[#64748B] uppercase tracking-wider">
                      <th className="py-4 px-6 border-b border-[#E2E8F0]">NAMA BENGKEL</th>
                      <th className="py-4 px-6 border-b border-[#E2E8F0]">BELUM JATUH TEMPO</th>
                      <th className="py-4 px-6 border-b border-[#E2E8F0]">1-30 HARI</th>
                      <th className="py-4 px-6 border-b border-[#E2E8F0]">31-60 HARI</th>
                      <th className="py-4 px-6 border-b border-[#E2E8F0]">61-90 HARI</th>
                      <th className="py-4 px-6 border-b border-[#E2E8F0]">91-180 HARI</th>
                      <th className="py-4 px-6 border-b border-[#E2E8F0]">180+ HARI</th>
                      <th className="py-4 px-6 border-b border-[#E2E8F0]">TOTAL</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    {agingData.table.length > 0 ? (
                      agingData.table.map((row, idx) => {
                        const hasOverdue = (row.d1_30 + row.d31_60 + row.d61_90 + row.d91_180 + row.d180_plus) > 0;
                        return (
                          <tr 
                            key={idx} 
                            className={`border-b border-[#E2E8F0] transition-colors ${
                              hasOverdue ? 'bg-red-50/50 hover:bg-red-50' : 'hover:bg-[#F8FAFC]'
                            }`}
                          >
                            <td className="py-4 px-6 font-semibold text-[#1E293B] flex items-center gap-2">
                              {row.name} {hasOverdue && <AlertTriangle className="w-4 h-4 text-[#EF4444]" />}
                            </td>
                            <td className="py-4 px-6 text-[#475569]">
                              {row.current > 0 ? `Rp ${(row.current / 1000000).toFixed(1)}jt` : '-'}
                            </td>
                            <td className="py-4 px-6 font-bold text-[#22C55E]">
                              {row.d1_30 > 0 ? `Rp ${(row.d1_30 / 1000000).toFixed(1)}jt` : '-'}
                            </td>
                            <td className="py-4 px-6 font-bold text-[#F59E0B]">
                              {row.d31_60 > 0 ? `Rp ${(row.d31_60 / 1000000).toFixed(1)}jt` : '-'}
                            </td>
                            <td className="py-4 px-6 font-bold text-[#F97316]">
                              {row.d61_90 > 0 ? `Rp ${(row.d61_90 / 1000000).toFixed(1)}jt` : '-'}
                            </td>
                            <td className="py-4 px-6 font-bold text-[#EF4444]">
                              {row.d91_180 > 0 ? `Rp ${(row.d91_180 / 1000000).toFixed(1)}jt` : '-'}
                            </td>
                            <td className="py-4 px-6 font-bold text-[#EF4444]">
                              {row.d180_plus > 0 ? `Rp ${(row.d180_plus / 1000000).toFixed(1)}jt` : '-'}
                            </td>
                            <td className="py-4 px-6 font-bold text-[#1E293B]">
                              Rp {(row.total / 1000000).toFixed(1)}jt
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan="8" className="py-8 text-center text-[#64748B]">Tidak ada data aging schedule.</td>
                      </tr>
                    )}
                    {/* Total Row */}
                    {agingData.table.length > 0 && (
                      <tr className="bg-[#F8FAFC]">
                        <td className="py-4 px-6 font-bold text-[#1E293B]">TOTAL</td>
                        <td className="py-4 px-6 font-bold text-[#1E293B]">
                          {totalRow.current > 0 ? `Rp ${(totalRow.current / 1000000).toFixed(1)}jt` : '-'}
                        </td>
                        <td className="py-4 px-6 font-bold text-[#22C55E]">
                          {totalRow.d1_30 > 0 ? `Rp ${(totalRow.d1_30 / 1000000).toFixed(1)}jt` : '-'}
                        </td>
                        <td className="py-4 px-6 font-bold text-[#F59E0B]">
                          {totalRow.d31_60 > 0 ? `Rp ${(totalRow.d31_60 / 1000000).toFixed(1)}jt` : '-'}
                        </td>
                        <td className="py-4 px-6 font-bold text-[#F97316]">
                          {totalRow.d61_90 > 0 ? `Rp ${(totalRow.d61_90 / 1000000).toFixed(1)}jt` : '-'}
                        </td>
                        <td className="py-4 px-6 font-bold text-[#EF4444]">
                          {totalRow.d91_180 > 0 ? `Rp ${(totalRow.d91_180 / 1000000).toFixed(1)}jt` : '-'}
                        </td>
                        <td className="py-4 px-6 font-bold text-[#EF4444]">
                          {totalRow.d180_plus > 0 ? `Rp ${(totalRow.d180_plus / 1000000).toFixed(1)}jt` : '-'}
                        </td>
                        <td className="py-4 px-6 font-bold text-[#1E293B]">
                          Rp {(totalRow.total / 1000000).toFixed(1)}jt
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Legend */}
              <div className="p-6 border-t border-[#E2E8F0] bg-white">
                <h4 className="font-bold text-sm text-[#1E293B] mb-4">Keterangan Warna Aging</h4>
                <div className="flex flex-wrap items-center gap-8">
                  <div className="flex items-center gap-2">
                    <div className="w-3.5 h-3.5 rounded-full bg-[#22C55E]"></div>
                    <span className="text-xs text-[#475569]">1-30 hari (Normal)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3.5 h-3.5 rounded-full bg-[#F59E0B]"></div>
                    <span className="text-xs text-[#475569]">31-60 hari (Perhatian)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3.5 h-3.5 rounded-full bg-[#F97316]"></div>
                    <span className="text-xs text-[#475569]">61-90 hari (Waspada)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3.5 h-3.5 rounded-full bg-[#EF4444]"></div>
                    <span className="text-xs text-[#475569]">180+ hari (Kritis)</span>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

      </div>
    </DashboardLayout>
  );
}
