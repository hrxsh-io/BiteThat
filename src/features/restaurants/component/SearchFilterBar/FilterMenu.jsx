
import { motion } from "framer-motion";
import { Check } from "lucide-react";

export default function FilterMenu({
  title,
  type,
  options,
  selected,
  onToggle,
  onClose,
}) {
  return (
    <motion.div
      initial={{opacity:0,y:8,scale:.96}}
      animate={{opacity:1,y:0,scale:1}}
      exit={{opacity:0,y:8,scale:.96}}
      transition={{duration:.18}}
      className="absolute left-0 top-[calc(100%+12px)] z-[100] w-72 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_25px_60px_rgba(0,0,0,.12)]"
    >
      <div className="flex items-center justify-between border-b bg-slate-50 px-5 py-4">
        <h3 className="font-semibold text-slate-800">{title}</h3>
        <span className="rounded-full bg-violet-100 px-2 py-1 text-xs font-semibold text-violet-700">
          {selected.length} Selected
        </span>
      </div>

      <div className="max-h-72 overflow-y-auto p-2">
        {options.map((option)=>{
          const checked=selected.includes(option);
          return(
            <button
              key={option}
              onClick={()=>onToggle(type,option)}
              className={`flex w-full items-center justify-between rounded-xl px-3 py-3 transition ${
                checked
                ?"bg-violet-50 text-violet-700"
                :"hover:bg-slate-50"
              }`}
            >
              <span>{option}</span>

              <div className={`flex h-6 w-6 items-center justify-center rounded-lg border ${
                checked
                ?"border-violet-600 bg-violet-600 text-white"
                :"border-slate-300"
              }`}>
                {checked && <Check size={14}/>}
              </div>
            </button>
          );
        })}
      </div>

      <div className="sticky bottom-0 flex items-center justify-between border-t bg-white px-4 py-3">
        <button
          onClick={()=>selected.forEach(item=>onToggle(type,item))}
          className="text-sm font-semibold text-red-500 hover:text-red-600"
        >
          Clear
        </button>

        <button
          onClick={onClose}
          className="rounded-xl bg-violet-600 px-4 py-2 text-sm font-semibold text-white hover:bg-violet-700"
        >
          Done
        </button>
      </div>
    </motion.div>
  );
}
