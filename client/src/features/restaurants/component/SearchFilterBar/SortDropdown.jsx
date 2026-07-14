
import { useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpDown, ChevronDown, Check } from "lucide-react";
import { sortOptions } from "./filterData";
import useClickOutside from "./useClickOutside";

export default function SortDropdown({
  sortBy,
  setSortBy,
  isOpen,
  setOpen,
}) {
  const ref=useRef(null);

  useClickOutside(ref,()=>{
    if(isOpen) setOpen(null);
  });

  return(
    <div ref={ref} className="relative shrink-0">
      <button
        onClick={()=>setOpen(isOpen?null:"sort")}
        className={`flex items-center gap-2 rounded-full border px-5 py-3 font-medium transition ${
          isOpen
          ?"border-violet-500 bg-violet-100 text-violet-700"
          :"border-slate-200 bg-white hover:border-violet-300 hover:bg-violet-50"
        }`}
      >
        <ArrowUpDown size={18}/>
        <span>Sort</span>
        <ChevronDown size={16} className={isOpen?"rotate-180 transition":"transition"}/>
      </button>

      <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{opacity:0,y:8,scale:.96}}
          animate={{opacity:1,y:0,scale:1}}
          exit={{opacity:0,y:8,scale:.96}}
          className="absolute right-0 top-[calc(100%+12px)] z-[100] w-72 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_25px_60px_rgba(0,0,0,.12)]"
        >
          <div className="border-b bg-slate-50 px-5 py-4 font-semibold">
            Sort Restaurants
          </div>

          <div className="p-2">
            {sortOptions.map(option=>(
              <button
                key={option}
                onClick={()=>{
                  setSortBy(option);
                  setOpen(null);
                }}
                className={`flex w-full items-center justify-between rounded-xl px-3 py-3 transition ${
                  sortBy===option
                  ?"bg-violet-50 text-violet-700"
                  :"hover:bg-slate-50"
                }`}
              >
                <span>{option}</span>
                {sortBy===option && <Check size={18}/>}
              </button>
            ))}
          </div>
        </motion.div>
      )}
      </AnimatePresence>
    </div>
  );
}
