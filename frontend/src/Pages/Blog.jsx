import { Link } from "react-router-dom";
import {blog1,blog2,blog3} from "../assets";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const Blog = () => {

  const blogs = [
    {
      id: 1,
      image: blog1,
      title: "Benefits of Natural Honey",
      postby: "Hazrat ALi admin",
      date: "August 04, 2026",
      description:
        "Discover the amazing health benefits of pure natural honey and why it is an essential part of a healthy lifestyle.",
      detail:`1. Boosts Immunity
            Natural honey helps strengthen the immune system because it contains antioxidants and antibacterial properties. Regular use of quality honey can support your body's natural defense.

            2. Provides Natural Energy
            Honey provides quick and natural energy because it contains natural sugars like glucose and fructose. It is a healthier alternative to processed sugar.

            3. Improves Digestion
            Honey has been traditionally used to support digestion. It helps maintain a healthy digestive system and provides soothing effects.

            Conclusion
            Choosing pure and natural honey ensures you get maximum benefits. Always buy honey from a trusted source to enjoy its original taste and quality.`
    },

    {
      id: 2,
      image: blog2,
      title: "How to Identify Pure Honey",
      postby: "Hassan admin",
      date: "July 25, 2026",
      description:
        "Learn simple ways to check the quality and purity of honey before buying.",
        detail:`1. Boosts Immunity
            Natural honey helps strengthen the immune system because it contains antioxidants and antibacterial properties. Regular use of quality honey can support your body's natural defense.

            2. Provides Natural Energy
            Honey provides quick and natural energy because it contains natural sugars like glucose and fructose. It is a healthier alternative to processed sugar.

            3. Improves Digestion
            Honey has been traditionally used to support digestion. It helps maintain a healthy digestive system and provides soothing effects.

            Conclusion
            Choosing pure and natural honey ensures you get maximum benefits. Always buy honey from a trusted source to enjoy its original taste and quality.`
    },

    {
      id: 3,
      image: blog3,
      title: "Sidr Honey: Nature's Premium Gift",
      postby: "ALi admin",
      date: "July 15, 2026",
      description:
        "Explore why Sidr honey is considered one of the most valuable and nutritious types of honey.",
        detail:`1. Boosts Immunity
            Natural honey helps strengthen the immune system because it contains antioxidants and antibacterial properties. Regular use of quality honey can support your body's natural defense.

            2. Provides Natural Energy
            Honey provides quick and natural energy because it contains natural sugars like glucose and fructose. It is a healthier alternative to processed sugar.

            3. Improves Digestion
            Honey has been traditionally used to support digestion. It helps maintain a healthy digestive system and provides soothing effects.

            Conclusion
            Choosing pure and natural honey ensures you get maximum benefits. Always buy honey from a trusted source to enjoy its original taste and quality.`
    },
  ];


  return (

    <div className="bg-gray-50 min-h-screen">
      <Navbar />

      {/* Header Section */}

      <section className="bg-yellow-500 py-20">

        <div className="max-w-7xl mx-auto px-6 text-center">

          <h1 className="text-4xl md:text-5xl font-bold text-white">
            Our Blog
          </h1>

          <p className="text-white mt-4 text-lg">
            Learn more about honey, health benefits, and natural products.
          </p>

        </div>

      </section>



      {/* Blog Cards */}

      <section className="max-w-7xl mx-auto px-6 py-20">


        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">


          {
            blogs.map((blog)=>(
              
              <div
                key={blog.id}
                className="
                bg-white
                rounded-xl
                overflow-hidden
                shadow-md
                hover:shadow-xl
                transition
                duration-300
                "
              >


                {/* Image */}

                <img
                  src={blog.image}
                  alt={blog.title}
                  className="
                  w-full
                  h-60
                  object-cover
                  "
                />



                <div className="p-6">


                  <p className="text-sm text-yellow-600 font-medium">
                    {blog.date}
                  </p>


                  <h2 className="
                  text-xl
                  font-bold
                  mt-3
                  text-gray-800
                  ">
                    {blog.title}
                  </h2>

                  <p className="
                  text-gray-600
                  mt-3
                  leading-7
                  ">    
                    {blog.description}
                  </p>

                  <Link
                    to="./blogdetail"
                    state={{ blog }}
                    className="
                    inline-block
                    mt-5
                    text-yellow-600
                    font-semibold
                    hover:text-yellow-700
                    "
                  >
                    Read More →
                  </Link>
                </div>
              </div>
            ))
          }
        </div>
      </section>
      <Footer />
    </div>
  );
};


export default Blog;