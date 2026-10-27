import AOS from "aos"
import "aos/dist/aos.css"
import { useEffect } from "react"

const Hero2 = () => {
    useEffect   (() => {
        AOS.init({
            duration: 1000,
            once: false,
            mirror:true,
            offset: 120,
        });
    }, []);

    
  return (
    <div>
      {/* Hero Section */}
            <section className="bg-yellow-500 py-20">
              <div className="max-w-7xl mx-auto px-6 text-center">
                <h1 data-aos="fade-down" className="text-4xl md:text-5xl font-bold text-white">
                  Natural HoneyTop Foods
                </h1>
      
                <p
                    data-aos="fade-up"
                    data-aos-delay="300"
                className="text-white mt-5 max-w-3xl mx-auto text-lg">
                  Delivering premium quality natural honey with purity, freshness,
                  and trust for every family.
                </p>
              </div>
            </section>
    </div>
  )
}

export default Hero2
