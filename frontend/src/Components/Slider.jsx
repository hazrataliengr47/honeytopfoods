import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { banner1, banner2, banner3 ,banner4 } from "../assets";

const Slider = () => {
  const slides = [
    {
      id: 1,
      image: banner1,
      title: "100% Natural Premium Honey",
      description: "Pure and healthy honey directly from nature",
    },
    {
      id: 2,
      image: banner2,
      title: "Fresh Organic Honey",
      description: "Taste the goodness of natural sweetness",
    },
    {
      id: 3,
      image: banner3,
      title: "Premium Sidr Honey",
      description: "Quality honey for a healthy lifestyle",
    },
    {
      id: 4,
      image: banner4,
      title: "Premium Sidr Honey",
      description: "Quality honey for a healthy lifestyle",
    },
  ];

  return (
    <section className="w-full">

      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        loop={true}
        className="w-full h-[450px] md:h-[600px]"
      >

        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>

            <div className="relative w-full h-full">

              {/* Image */}
              <img
                src={slide.image}
                alt={slide.title}
                className="
                  w-full 
                  h-full 
                  object-cover
                "
              />

              {/* Overlay */}
              <div
                className="
                absolute 
                inset-0 
                bg-black/40 
                flex 
                items-center 
                justify-center
                "
              >

                <div className="text-center text-white px-5">

                  <h1
                    className="
                    text-3xl 
                    md:text-5xl 
                    font-bold 
                    mb-4
                    "
                  >
                    {slide.title}
                  </h1>

                  <p
                    className="
                    text-base 
                    md:text-xl
                    "
                  >
                    {slide.description}
                  </p>

                  <button 
                    className="
                    mt-6
                    bg-yellow-500
                    hover:bg-yellow-600
                    text-black
                    font-semibold
                    px-8
                    py-3
                    rounded-full
                    transition
                    "
                  >
                    Shop Now
                  </button>
                </div>

              </div>

            </div>

          </SwiperSlide>
        ))}

      </Swiper>

    </section>
  );
};

export default Slider;