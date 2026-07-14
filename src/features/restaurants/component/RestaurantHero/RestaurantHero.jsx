
import HeroBackground from "./HeroBackground";
import HeroContent from "./HeroContent";
import HeroIllustration from "./HeroIllustration";
export default function RestaurantHero(){
return <section className="relative overflow-hidden bg-[#FAF8FF]">
<HeroBackground/>
<div className="relative mx-auto max-w-7xl min-h-[60vh] px-6 lg:px-8 py-16 grid lg:grid-cols-2 gap-12 items-center">
<HeroContent/>
<HeroIllustration/>
</div>
</section>}
