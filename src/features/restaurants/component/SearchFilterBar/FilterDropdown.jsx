
import { useRef } from "react";
import { AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import FilterMenu from "./FilterMenu";
import useClickOutside from "./useClickOutside";

export default function FilterDropdown({
  type,
  title,
  icon: Icon,
  options,
  selected,
  isOpen,
  setOpen,
  onToggle,
}) {
  const ref = useRef(null);

  useClickOutside(ref, () => {
    if (isOpen) setOpen(null);
  });

  return (
    <div ref={ref} className="relative shrink-0">
      <button
        onClick={() => setOpen(isOpen ? null : type)}
        className={`flex items-center gap-2 rounded-full border px-5 py-3 font-medium transition-all duration-300
        ${
          isOpen
            ? "border-violet-500 bg-violet-100 text-violet-700 shadow-md"
            : "border-slate-200 bg-white hover:border-violet-300 hover:bg-violet-50"
        }`}
      >
        <Icon size={18} />

        <span className="flex items-center gap-2">
          {title}

          {selected.length > 0 && (
            <span className="rounded-full bg-violet-600 px-2 py-0.5 text-xs text-white">
              {selected.length}
            </span>
          )}
        </span>

        <ChevronDown
          size={16}
          className={`transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <FilterMenu
            title={title}
            type={type}
            options={options}
            selected={selected}
            onToggle={onToggle}
            onClose={() => setOpen(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
