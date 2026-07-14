import { Store, Star, Clock3 } from "lucide-react";

const stats = [
  { i: Store, v: "500+", l: "Restaurants" },
  { i: Star, v: "4.9", l: "Rating" },
  { i: Clock3, v: "25 min", l: "Delivery" },
];

export default function HeroStats() {
  return (
    <div className="mt-10 grid grid-cols-3 gap-4">
      {stats.map((s) => (
        <div
          key={s.l}
          className="flex flex-col items-center justify-center rounded-3xl border border-violet-100 bg-white/80 p-5 text-center shadow"
        >
          <s.i className="mb-3 text-violet-600" size={28} />

          <h3 className="text-2xl font-bold">{s.v}</h3>

          <p className="mt-1 text-sm text-slate-500">{s.l}</p>
        </div>
      ))}
    </div>
  );
}