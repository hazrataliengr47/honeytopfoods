
import { FaCalendarAlt, FaUser } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
const BlogDetail = () => {
  const location = useLocation();
  const blog = location.state?.blog;
  console.log(blog);


  return (
    <>
    <Navbar />
    <section className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-5 grid lg:grid-cols-3 gap-10">

        {/* Main Blog Content */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-md overflow-hidden">

          {/* Blog Image */}
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-100 object-cover"
          />

          <div className="p-6 md:p-10">

            {/* Title */}
            <h1 className="text-3xl md:text-5xl font-bold text-gray-800 leading-tight">
              {blog.title}
            </h1>

            {/* Meta */}
            <div className="flex flex-wrap gap-5 mt-5 text-gray-500 text-sm">

              <span className="flex items-center gap-2">
                <FaUser className="text-yellow-600" />
                {blog.postby}
              </span>

              <span className="flex items-center gap-2">
                <FaCalendarAlt className="text-yellow-600" />
                {blog.date}
              </span>

            </div>


            {/* Blog Detail */}
            <div className="mt-8 text-gray-700 leading-8 space-y-5">

              <p>
                {blog.detail}
              </p>


            </div>

          </div>

        </div>
      </div>
    </section>
    <Footer />
    </>
  );
};

export default BlogDetail;