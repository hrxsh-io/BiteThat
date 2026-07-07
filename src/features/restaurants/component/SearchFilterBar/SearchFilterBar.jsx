
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Search, X } from "lucide-react";
import FilterDropdown from "./FilterDropdown";
import SortDropdown from "./SortDropdown";
import { dropdowns } from "./filterData";

export default function SearchFilterBar() {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("Recommended");
  const [openDropdown, setOpenDropdown] = useState(null);

  const [filters, setFilters] = useState({
    cuisine: [],
    rating: [],
    delivery: [],
    price: [],
  });

  const toggleFilter = (type, value) => {
    setFilters(prev => ({
      ...prev,
      [type]: prev[type].includes(value)
        ? prev[type].filter(v => v !== value)
        : [...prev[type], value]
    }));
  };

  const clearAll = () => {
    setFilters({
      cuisine: [],
      rating: [],
      delivery: [],
      price: [],
    });
    setSortBy("Recommended");
    setOpenDropdown(null);
  };

  const activeFilters = useMemo(() =>
    Object.entries(filters).flatMap(([key, values]) =>
      values.map(value => ({ key, value }))
    ), [filters]);

  return (
    <motion.section
      initial={{opacity:0,y:20}}
      animate={{opacity:1,y:0}}
      className="sticky top-20 z-40 px-6 py-6"
    >
      <div className="mx-auto max-w-7xl rounded-3xl border border-white/60 bg-white/75 backdrop-blur-xl p-5 shadow-[0_20px_60px_rgba(124,58,237,.12)]">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center">
          <div className="relative flex-1">
            <Search size={20} className="absolute left-5 top-1/2 -translate-y-1/2 text-violet-600"/>
            <input
              value={search}
              onChange={(e)=>setSearch(e.target.value)}
              placeholder="Search restaurants or cuisines..."
              className="h-14 w-full rounded-2xl border border-slate-200 bg-slate-50 pl-14 pr-4 outline-none focus:border-violet-300 focus:ring-4 focus:ring-violet-100"
            />
          </div>

          <div className="flex gap-3 overflow-x-auto">
            {dropdowns.map(item=>(
              <FilterDropdown
                key={item.key}
                type={item.key}
                title={item.title}
                icon={item.icon}
                options={item.options}
                selected={filters[item.key]}
                isOpen={openDropdown===item.key}
                setOpen={setOpenDropdown}
                onToggle={toggleFilter}
              />
            ))}
            <SortDropdown
              sortBy={sortBy}
              setSortBy={setSortBy}
              isOpen={openDropdown==="sort"}
              setOpen={setOpenDropdown}
            />
          </div>
        </div>

        {activeFilters.length>0 && (
          <div className="mt-5 flex flex-wrap gap-2">
            {activeFilters.map(item=>(
              <button
                key={item.key+item.value}
                onClick={()=>toggleFilter(item.key,item.value)}
                className="flex items-center gap-2 rounded-full bg-violet-100 px-4 py-2 text-sm font-medium text-violet-700"
              >
                {item.value}
                <X size={14}/>
              </button>
            ))}
            <button
              onClick={clearAll}
              className="rounded-full border border-red-200 px-4 py-2 text-sm font-semibold text-red-500"
            >
              Clear All
            </button>
          </div>
        )}
      </div>
    </motion.section>
  );
}
