import { TrendingUp } from 'lucide-react';

export default function StatCard({ title, value, icon, bgClass, trend }) {
  return (
    <div className="bg-white rounded-xl shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)] p-5 flex flex-col justify-between border border-[#E2E8F0] h-full gap-4">
      <div className="flex justify-between items-start">
        <div className="flex flex-col">
          <p className="text-xs font-semibold text-[#64748B] mb-2">{title}</p>
          <h3 className="text-[22px] font-bold text-[#1E293B] leading-none">{value}</h3>
        </div>
        <div className={`w-[42px] h-[42px] rounded-lg flex items-center justify-center shrink-0 ${bgClass} text-white`}>
          {icon}
        </div>
      </div>
      {trend && (
        <div className="flex items-center gap-1.5 mt-auto">
          <TrendingUp className="w-3.5 h-3.5 text-[#22C55E]" />
          <span className="text-[11px] font-semibold text-[#22C55E]">{trend}</span>
        </div>
      )}
    </div>
  );
}
