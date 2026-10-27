


import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import { FaStar, FaQuoteLeft } from "react-icons/fa";


const CustomerReviews = () => {

    const reviews = [
    {
      id: 1,
      name: "Ahmed Khan",
      location: "Peshawar",
      review:
        "The honey quality is amazing. Pure taste and very fast delivery. Highly recommended.",
    },

    {
      id: 2,
      name: "Ali Raza",
      location: "Islamabad",
      review:
        "I purchased Sidr Honey and the quality was excellent. It feels 100% natural.",
    },

    {
      id: 3,
      name: "Muhammad Usman",
      location: "Lahore",
      review:
        "HoneyTop Foods provides premium honey with great packaging and service.",
    },

    {
      id: 4,
      name: "Sara Ahmed",
      location: "Karachi",
      review:
        "Best honey brand. My family loves the taste and freshness.",
    },
    {
      id: 5,
      name: "Ahmed Khan",
      location: "Peshawar",
      review:
        "The honey quality is amazing. Pure taste and very fast delivery. Highly recommended.",
    },

    {
      id: 6,
      name: "Ali Raza",
      location: "Islamabad",
      review:
        "I purchased Sidr Honey and the quality was excellent. It feels 100% natural.",
    },

    {
      id: 7,
      name: "Muhammad Usman",
      location: "Lahore",
      review:
        "HoneyTop Foods provides premium honey with great packaging and service.",
    },

    {
      id: 8,
      name: "Sara Ahmed",
      location: "Karachi",
      review:
        "Best honey brand. My family loves the taste and freshness.",
    },
    {
      id: 9,
      name: "Ahmed Khan",
      location: "Peshawar",
      review:
        "The honey quality is amazing. Pure taste and very fast delivery. Highly recommended.",
    },

    {
      id: 10,
      name: "Ali Raza",
      location: "Islamabad",
      review:
        "I purchased Sidr Honey and the quality was excellent. It feels 100% natural.",
    },

    {
      id: 11,
      name: "Muhammad Usman",
      location: "Lahore",
      review:
        "HoneyTop Foods provides premium honey with great packaging and service.",
    },

    {
      id: 12,
      name: "Sara Ahmed",
      location: "Karachi",
      review:
        "Best honey brand. My family loves the taste and freshness.",
    },
  ];

  return (

    <section className="bg-gray-50 py-20">


      <div className="max-w-7xl mx-auto px-6">


        {/* Title */}

        <div className="text-center mb-14">

          <h2 className="text-4xl md:text-5xl font-bold text-gray-800">
            Customer Reviews
          </h2>

          <p className="text-gray-600 mt-4">
            What our customers say about HoneyTop Foods
          </p>

        </div>



        <Swiper

          modules={[Autoplay, Pagination]}

          autoplay={{
            delay:5000,
            disableOnInteraction:false,
          }}

          pagination={{
            clickable:true,
          }}

          loop={true}

          centeredSlides={true}

          spaceBetween={40}

          slidesPerView={3}


          breakpoints={{

            320:{
              slidesPerView:1,
            },

            640:{
              slidesPerView:2,
            },

            1024:{
              slidesPerView:3,
            },

          }}

        >


          {
            reviews.map((item)=>(

              <SwiperSlide key={item.id}>


                {({isActive})=>(


                  <div

                    className={`
                      p-8
                      rounded-2xl
                      text-center
                      transition-all
                      duration-500
                      my-10

                      ${
                        isActive
                        ?
                        "bg-yellow-500 text-white scale-110 shadow-2xl"
                        :
                        "bg-white text-gray-800 shadow-md"
                      }

                    `}

                  >


                    {/* Quote */}

                    <FaQuoteLeft

                      className={`
                        text-4xl
                        mx-auto
                        mb-5

                        ${
                          isActive
                          ?
                          "text-white"
                          :
                          "text-yellow-500"
                        }

                      `}

                    />



                    {/* Review */}

                    <p

                      className={`
                        leading-7

                        ${
                          isActive
                          ?
                          "text-white"
                          :
                          "text-gray-600"
                        }

                      `}

                    >

                      {item.review}

                    </p>




                    {/* Stars */}

                    <div className="flex justify-center gap-1 mt-5">

                      {
                        [1,2,3,4,5].map((star)=>(

                          <FaStar

                            key={star}

                            className={
                              isActive
                              ?
                              "text-white"
                              :
                              "text-yellow-500"
                            }

                          />

                        ))
                      }

                    </div>



                    {/* Name */}

                    <h3

                      className={`
                        text-xl
                        font-semibold
                        mt-5

                        ${
                          isActive
                          ?
                          "text-white"
                          :
                          "text-gray-800"
                        }

                      `}

                    >

                      {item.name}

                    </h3>



                    <p

                      className={

                        isActive
                        ?
                        "text-yellow-100"
                        :
                        "text-gray-500"

                      }

                    >

                      {item.location}

                    </p>


                  </div>


                )}


              </SwiperSlide>

            ))
          }


        </Swiper>


      </div>


    </section>

  );
};


export default CustomerReviews;