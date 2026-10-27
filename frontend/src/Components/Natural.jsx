
import { FaShoppingCart } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useCart } from "../Context/UseCart";
import { Link } from "react-router-dom";




const Natural = () => {
  const { addToCart } = useCart();

  const [products, setProducts] = useState([]);

  useEffect(() =>{
    const fetchProducts =async () => {
      try{
        const response = await fetch(`http://localhost:5000/api/contact`);
        const data= await response.json();

        const formattedProducts = data.data
        .filter((product) => product.category === "Natural Honey")
        .map((product) => ({
          _id:product._id,
          name:product.name,
          price:product.price,
          oldPrice:"",
          image:product.image
          ? `http://localhost:5000${product.image}`
          : "",
          sale:false,

         
        }))
         setProducts(formattedProducts);
      }catch(error){
        console.log("error fetching products:", error)
      }
    }

    fetchProducts();
  },[])
  return (
    <section className="max-w-7xl mx-auto px-5 py-16">

      {/* Heading */}
      <div className="flex items-center justify-between mb-12">
        <div></div>

        <h2 className="text-3xl md:text-5xl font-bold text-center">
          Natural Honey
        </h2>

        <button className="text-gray-600 hover:text-yellow-600 transition">
          View All
        </button>
      </div>

      {/* Products */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

        {products.map((item) => (
          <div
            key={item._id}
            className="group relative bg-white rounded-xl overflow-hidden"
          >
            {/* Sale Badge */}
            {item.sale && (
              <span className="absolute top-4 left-4 font-bold text-black text-xs px-3 py-1 rounded-full z-10">
                Sale
              </span>
            )}

            {/* Image */}
            <div className="overflow-hidden bg-white rounded-xl">
              <Link to="/product/pdetail"
              state={{products: item}}>
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-80 object-contain group-hover:scale-105 duration-300"
              /></Link>
            </div>

            {/* Product Info */}
            <div className="pt-5">

              <h3 className="text-lg font-medium leading-7 text-gray-800">
                {item.name}
              </h3>

              <div className="flex items-center gap-2 mt-3">
                <span className="font-bold text-xl">
                  Rs: {item.price}
                </span>

                {item.oldPrice && (
                  <span className="line-through text-gray-400">
                    {item.oldPrice}
                  </span>
                )}
              </div>

              <button
               onClick={() => addToCart(item)}
               className="mt-5 w-full bg-yellow-500 hover:bg-yellow-600 text-white py-3 rounded-lg flex items-center justify-center gap-2 duration-300 opacity-0 group-hover:opacity-100">
                <FaShoppingCart />
                Add to Cart
              </button>

            </div>
          </div>
        ))}

      </div>
    </section>
  );
};

export default Natural