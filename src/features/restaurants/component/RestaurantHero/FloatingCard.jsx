
export default function FloatingCard({title,value,className=""}){
 return(
 <div className={`absolute rounded-2xl bg-white/80 backdrop-blur border border-violet-100 shadow-xl p-4 ${className}`}>
  <p className="text-xs text-slate-500">{title}</p>
  <h4 className="font-bold text-slate-900">{value}</h4>
 </div>);
}
