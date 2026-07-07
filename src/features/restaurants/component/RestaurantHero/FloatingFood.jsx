
import {motion} from "framer-motion";
import {floatAnim} from "./animations";
export default function FloatingFood({emoji,className=""}){
 return <motion.div {...floatAnim} className={`absolute h-14 w-14 rounded-2xl bg-white/80 backdrop-blur shadow-xl flex items-center justify-center text-3xl ${className}`}>{emoji}</motion.div>
}
