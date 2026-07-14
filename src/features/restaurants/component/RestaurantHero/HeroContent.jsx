
import {motion} from "framer-motion";
import {fadeLeft} from "./animations";
import HeroStats from "./HeroStats";
export default function HeroContent(){
return <motion.div {...fadeLeft}>
<span className="inline-flex rounded-full bg-violet-100 px-4 py-2 text-violet-700 font-semibold">🍽 Discover Nearby Restaurants</span>
<h1 className="mt-6 text-5xl lg:text-6xl font-black">Discover Your <span className="block bg-gradient-to-r from-violet-600 to-fuchsia-500 bg-clip-text text-transparent">Next Favorite Meal</span></h1>
<p className="mt-6 text-lg text-slate-600 max-w-xl">Browse top-rated restaurants and discover exclusive offers.</p>
<HeroStats/>
</motion.div>}
