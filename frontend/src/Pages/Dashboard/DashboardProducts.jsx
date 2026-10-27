import {
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
  X,
} from "lucide-react";
import { useState, useEffect  } from "react";

const DashboardProducts = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [showModal, setShowModal] = useState(false);
const [showViewModal, setShowViewModal] = useState(false);
const [showDeleteModal, setShowDeleteModal] = useState(false);

const [selectedProduct, setSelectedProduct] = useState(null);
const [editingProduct, setEditingProduct] = useState(null);

  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Premium Sidr Honey",
      category: "Sidr Honey",
      price: 3499,
      stock: 25,
      image: "/src/assets/honey1.png",
      status: "Active",
      description: "Premium quality natural Sidr honey.",
    },
    {
      id: 2,
      name: "Wild Sidr Honey",
      category: "Sidr Honey",
      price: 3499,
      stock: 12,
      image: "/src/assets/honey2.png",
      status: "Active",
      description: "Pure wild Sidr honey.",
    },
    {
      id: 3,
      name: "Wildflower Honey",
      category: "Wild Honey",
      price: 1550,
      stock: 8,
      image: "/src/assets/honey3.png",
      status: "Active",
      description: "Natural wildflower honey.",
    },
    {
      id: 4,
      name: "Natural Honey",
      category: "Natural Honey",
      price: 2200,
      stock: 3,
      image: "/src/assets/honey4.png",
      status: "Low Stock",
      description: "100% natural honey.",
    },
    {
      id: 5,
      name: "Forest Bee Honey",
      category: "Natural Honey",
      price: 1800,
      stock: 0,
      image: "/src/assets/honey5.png",
      status: "Out of Stock",
      description: "Pure forest bee honey.",
    },
  ]);

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    image: "",
    description: "",
  status: "Active",
  });



  useEffect(() => {
    const fetchProducts = async () => {
  try{
      const response = await fetch("http://localhost:5000/api/contact");
      const data = await response.json();
       
      if(!response.ok){
        console.error(data.message);
        return;
      }
      setProducts(
        data.data.map((product) => ({
          id:product._id,
          name: product.name || "",
          category: product.category || "",
          price: Number(product.price) || 0,
          stock: Number(product.stock) || 0,

          image: product.image
                ? `http://localhost:5000${product.image}`
                : "/src/assets/honey1.png",
                
          description: product.description || "",

          status:
          Number(product.stock) === 0
          ? "Out of Stock"
          :Number(product.stock) <= 5
          ? "Low Stock"
          : "Active",
        }))
      );
  }catch(error){
    console.error("error fetching products:", error)
  }
      };
      fetchProducts();
    }, [])

  // =========================
  // FORM INPUT
  // =========================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };



  const handleViewProduct = (product) => {
  setSelectedProduct(product);
  setShowViewModal(true);
};

const handleDeleteClick = (product) => {
  setSelectedProduct(product);
  setShowDeleteModal(true);
};

const handleDeleteProduct = async () => {
  try {
    const response = await fetch(
      `http://localhost:5000/api/contact/${selectedProduct.id}`,
      {
        method: "DELETE",
        headers: {
      Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
      },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      alert(data.message || "Failed to delete product");
      return;
    }

    console.log("Product deleted:", data);

    // Remove product from React state
    setProducts((prev) =>
      prev.filter(
        (product) => product.id !== selectedProduct.id
      )
    );

    setSelectedProduct(null);
    setShowDeleteModal(false);

  } catch (error) {
    console.error("Delete product error:", error);
    alert("Unable to connect to backend");
  }
};

 
const handleEditProduct = (product) => {
  setEditingProduct(product);

  setFormData({
    name: product.name,
    category: product.category,
    price: product.price,
    stock: product.stock,
    image: null,
    description: product.description || "",
    status: product.status || "Active",
  });

  setShowModal(true);
};

  // =========================
  // ADD PRODUCT
  // =========================

//   const handleAddProduct = (e) => {
//     e.preventDefault();

//     if (
//       !formData.name ||
//       !formData.category ||
//       !formData.price ||
//       !formData.stock
//     ) {
//       alert("Please fill all required fields.");
//       return;
//     }

//     const stock = Number(formData.stock);
//     const price = Number(formData.price);

//     const newProduct = {
//       id: Date.now(),
//       name: formData.name,
//       category: formData.category,
//       price,
//       stock,
//       image: formData.image || "/src/assets/honey1.png",
//       description: formData.description,
//       status:
//         stock === 0
//           ? "Out of Stock"
//           : stock <= 5
//           ? "Low Stock"
//           : "Active",
//     };

//     setProducts((prev) => [newProduct, ...prev]);

//     setFormData({
//       name: "",
//       category: "",
//       price: "",
//       stock: "",
//       image: "",
//       description: "",
//     });

//     setShowModal(false);
//   };
const handleAddProduct =async (e) => {
  e.preventDefault();

  if (
    !formData.name ||
    !formData.category ||
    !formData.price ||
    formData.stock === ""
  ) {
    alert("Please fill all required fields.");
    return;
  }

  const stock = Number(formData.stock);
  const price = Number(formData.price);

  const status =
    stock === 0
      ? "Out of Stock"
      : stock <= 5
      ? "Low Stock"
      : "Active";

  // ================= EDIT =================

  if (editingProduct) {
  try {
    const productData = new FormData();

    productData.append("name", formData.name);
    productData.append("category", formData.category);
    productData.append("price", price);
    productData.append("stock", stock);
    productData.append("description", formData.description);
    productData.append("status", status);

    // Only send a new image if the user selected one
    if (formData.image instanceof File) {
      productData.append("image", formData.image);
    }

    
const response = await fetch(
  `http://localhost:5000/api/contact/${editingProduct.id}`,
  {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
    },
    body: productData,
  }
);


    const data = await response.json();

    if (!response.ok) {
      alert(data.message || "Failed to update product");
      return;
    }


    console.log("Product updated:", data);

    setProducts((prev) =>
      prev.map((product) =>
        product.id === editingProduct.id
          ? {
              ...product,
              id: data.data._id,
              name: data.data.name,
              category: data.data.category,
              price: data.data.price,
              stock: data.data.stock,
              image: data.data.image
                ? `http://localhost:5000${data.data.image}`
                : product.image,
              description: data.data.description,
              status:
                Number(data.data.stock) === 0
                  ? "Out of Stock"
                  : Number(data.data.stock) <= 5
                  ? "Low Stock"
                  : "Active",
                          }
                        : product
                    )
    );

    setEditingProduct(null);

  } catch (error) {
    console.error("Update product error:", error);
    alert("Unable to connect to backend");
    return;
  }
}

  // ================= ADD =================

  // else {
  //   const newProduct = {
  //     id: Date.now(),
  //     name: formData.name,
  //     category: formData.category,
  //     price,
  //     stock,
  //     image:
  //       formData.image ||
  //       "/src/assets/honey1.png",
  //     description: formData.description,
  //     status,
  //   };

  //   setProducts((prev) => [
  //     newProduct,
  //     ...prev,
  //   ]);
  // }

  else {
  try {
    // const response = await fetch("http://localhost:5000/api/contact", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     name: formData.name,
    //     category: formData.category,
    //     price: price,
    //     stock: stock,
    //     image:formData.image,
    //     description:formData.description,
    //   }),
    // });

    const productData = new FormData();

productData.append("name", formData.name);
productData.append("category", formData.category);
productData.append("price", price);
productData.append("stock", stock);
productData.append("description", formData.description);
productData.append("status", formData.status);

if (formData.image) {
  productData.append("image", formData.image);
}

const response = await fetch(
  "http://localhost:5000/api/contact",
  {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
    },
    body: productData,
  }
);

    const data = await response.json();

    if (!response.ok) {
      alert(data.message || "Failed to add product");
      return;
    }

    console.log("Product created:", data);

    const newProduct = {
  id: data.data._id,
  name: data.data.name,
  category: data.data.category,
  price: data.data.price,
  stock: data.data.stock,
  image: data.data.image
    ? `http://localhost:5000${data.data.image}`
    : "/src/assets/honey1.png",
  description: data.data.description,
  status:
  Number(data.data.stock) === 0
    ? "Out of Stock"
    : Number(data.data.stock) <= 5
    ? "Low Stock"
    : "Active",
};

    setProducts((prev) => [
      newProduct,
      ...prev,
    ]);

  } catch (error) {
    console.error("Create product error:", error);
    alert("Unable to connect to backend");
    return;
  }
}

  // Reset form

  setFormData({
    name: "",
    category: "",
    price: "",
    stock: "",
    image: "",
    description: "",
  });

  setShowModal(false);
};

  // =========================
  // FILTER
  // =========================

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || product.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="w-full">

      {/* ================= HEADER ================= */}

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-8">

        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
            Products
          </h1>

          <p className="text-gray-500 mt-2">
            Manage your honey products
          </p>
        </div>

        <button
          onClick={() => {
                        setEditingProduct(null);

                        setFormData({
                            name: "",
                            category: "",
                            price: "",
                            stock: "",
                            image: "",
                            description: "",
                        });

                        setShowModal(true);
                        }}
          className="w-full lg:w-auto flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-3 rounded-xl font-semibold transition"
        >
          <Plus size={19} />

          Add Product
        </button>

      </div>

      {/* ================= FILTER BAR ================= */}

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 sm:p-5 mb-6">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* Search */}

          <div className="relative">

            <Search
              size={19}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-100"
            />

          </div>

          {/* Category */}

          <div className="relative">

            <Filter
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
            />

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full appearance-none pl-11 pr-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-100 bg-white"
            >
              <option value="All">All Categories</option>
              <option value="Sidr Honey">Sidr Honey</option>
              <option value="Wild Honey">Wild Honey</option>
              <option value="Natural Honey">Natural Honey</option>
            </select>

          </div>

        </div>

      </div>

      {/* ================= PRODUCTS TABLE ================= */}

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">

        <div className="p-5 sm:p-6 border-b border-gray-200">

          <h2 className="text-xl font-bold text-gray-800">
            All Products
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            {filteredProducts.length} products found
          </p>

        </div>

        <div className="overflow-x-auto">

          <table className="w-full min-w-[950px]">

            <thead className="bg-gray-50">

              <tr className="text-left text-xs uppercase tracking-wide text-gray-500">

                <th className="px-6 py-4">
                  Product
                </th>

                <th className="px-6 py-4">
                  Category
                </th>

                <th className="px-6 py-4">
                  Price
                </th>

                <th className="px-6 py-4">
                  Stock
                </th>

                <th className="px-6 py-4">
                  Status
                </th>

                <th className="px-6 py-4 text-center">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody className="divide-y divide-gray-100">

              {filteredProducts.length > 0 ? (

                filteredProducts.map((product) => (

                  <tr
                    key={product.id}
                    className="hover:bg-gray-50 transition"
                  >

                    {/* Product */}

                    <td className="px-6 py-4">

                      <div className="flex items-center gap-4">

                        <div className="w-14 h-14 rounded-xl bg-gray-100 overflow-hidden shrink-0">

                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-contain"
                          />

                        </div>

                        <div>

                          <p className="font-semibold text-gray-800">
                            {product.name}
                          </p>

                          <p className="text-xs text-gray-400 mt-1">
                            ID: {product.id}
                          </p>

                        </div>

                      </div>

                    </td>

                    {/* Category */}

                    <td className="px-6 py-4 text-gray-600">
                      {product.category}
                    </td>

                    {/* Price */}

                    <td className="px-6 py-4">

                      <span className="font-semibold text-gray-800">
                        Rs. {product.price.toLocaleString()}
                      </span>

                    </td>

                    {/* Stock */}

                    <td className="px-6 py-4">

                      <span
                        className={`font-semibold ${
                          product.stock === 0
                            ? "text-red-600"
                            : product.stock <= 5
                            ? "text-yellow-600"
                            : "text-green-600"
                        }`}
                      >
                        {product.stock}
                      </span>

                    </td>

                    {/* Status */}

                    <td className="px-6 py-4">

                      <span
                        className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                          product.status === "Active"
                            ? "bg-green-100 text-green-700"
                            : product.status === "Low Stock"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {product.status}
                      </span>

                    </td>

                    {/* Actions */}

                    <td className="px-6 py-4">

                      <div className="flex items-center justify-center gap-2">

                        <button
                        onClick={() => handleViewProduct(product)}
                        className="w-9 h-9 rounded-lg flex items-center justify-center text-gray-500 hover:bg-blue-50 hover:text-blue-600 transition"
                        title="View"
                        >
                        <Eye size={17} />
                        </button>

                        <button
                        onClick={() => handleEditProduct(product)}
                        className="w-9 h-9 rounded-lg flex items-center justify-center text-gray-500 hover:bg-yellow-50 hover:text-yellow-600 transition"
                        title="Edit"
                        >
                        <Edit size={17} />
                        </button>

                        <button
                        onClick={() => handleDeleteClick(product)}
                        className="w-9 h-9 rounded-lg flex items-center justify-center text-gray-500 hover:bg-red-50 hover:text-red-600 transition"
                        title="Delete"
                        >
                        <Trash2 size={17} />
                        </button>

                      </div>

                    </td>

                  </tr>

                ))

              ) : (

                <tr>

                  <td
                    colSpan="6"
                    className="text-center py-12 text-gray-500"
                  >
                    No products found.
                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

      </div>

      {/* ================= ADD PRODUCT MODAL ================= */}

      {showModal && (

        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">

          {/* Overlay */}

          <div
            onClick={() => setShowModal(false)}
            className="absolute inset-0 bg-black/50"
          ></div>

          {/* Modal */}

          <div className="relative z-10 bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl">

            {/* Modal Header */}

            <div className="sticky top-0 bg-white border-b border-gray-200 px-5 sm:px-6 py-4 flex items-center justify-between">

              <div>
                <h2 className="text-xl font-bold text-gray-800">
                    {editingProduct
                        ? "Edit Product"
                        : "Add New Product"}
                    </h2>

                <p className="text-sm text-gray-500 mt-1">
                    {editingProduct
                        ? "Update product information"
                        : "Add a new honey product to your store"}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="w-9 h-9 rounded-lg flex items-center justify-center hover:bg-gray-100 text-gray-500"
              >
                <X size={20} />
              </button>

            </div>

            {/* Form */}

            <form
              onSubmit={handleAddProduct}
              className="p-5 sm:p-6 space-y-5"
            >

              {/* Product Name */}

              <div>

                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Product Name *
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter product name"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-100"
                />

              </div>

              {/* Category */}

              <div>

                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Category *
                </label>

                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-100 bg-white"
                >

                  <option value="">
                    Select Category
                  </option>

                  <option value="Sidr Honey">
                    Sidr Honey
                  </option>

                  <option value="Wild Honey">
                    Wild Honey
                  </option>

                  <option value="Natural Honey">
                    Natural Honey
                  </option>

                </select>

              </div>

              {/* Price + Stock */}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                <div>

                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Price (Rs.) *
                  </label>

                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="3499"
                    min="0"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-100"
                  />

                </div>

                <div>

                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Stock *
                  </label>

                  <input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleChange}
                    placeholder="25"
                    min="0"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-100"
                  />

                </div>

              </div>

              {/* Image */}

              <div>

                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Image URL
                </label>

                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0];

                      setFormData((prev) => ({
                        ...prev,
                        image: file || null,
                      }));
                    }}
                    className="w-full border rounded-lg p-2"
                  />

                <p className="text-xs text-gray-400 mt-2">
                  For now, enter the path of an image from your assets folder.
                </p>

              </div>

              {/* Description */}

              <div>

                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Description
                </label>

                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Enter product description..."
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none resize-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-100"
                ></textarea>

              </div>

              {/* Buttons */}

              <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 pt-3 border-t border-gray-100">

                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="w-full sm:w-auto px-5 py-3 rounded-xl border border-gray-200 text-gray-700 font-semibold hover:bg-gray-50 transition"
                >
                  Cancel
                </button>

                    <button
                    type="submit"
                    className="w-full sm:w-auto px-5 py-3 rounded-xl bg-yellow-500 hover:bg-yellow-600 text-white font-semibold transition"
                    >
                    {editingProduct
                        ? "Update Product"
                        : "Add Product"}
                    </button>

              </div>

            </form>

          </div>

        </div>

      )}



      {/* ================= VIEW PRODUCT MODAL ================= */}

{showViewModal && selectedProduct && (

  <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">

    {/* Overlay */}

    <div
      onClick={() => setShowViewModal(false)}
      className="absolute inset-0 bg-black/50"
    ></div>

    {/* Modal */}

    <div className="relative z-10 bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden">

      {/* Header */}

      <div className="flex items-center justify-between px-6 py-4 border-b">

        <div>
          <h2 className="text-xl font-bold text-gray-800">
            Product Details
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Product information
          </p>
        </div>

        <button
          onClick={() => setShowViewModal(false)}
          className="w-9 h-9 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-500"
        >
          <X size={20} />
        </button>

      </div>

      {/* Product */}

      <div className="p-6">

        {/* Image */}

        <div className="w-40 h-40 mx-auto bg-gray-100 rounded-2xl overflow-hidden">

          <img
            src={selectedProduct.image}
            alt={selectedProduct.name}
            className="w-full h-full object-contain"
          />

        </div>

        {/* Name */}

        <h3 className="text-2xl font-bold text-center text-gray-800 mt-5">
          {selectedProduct.name}
        </h3>

        {/* Details */}

        <div className="mt-6 space-y-4">

          <div className="flex justify-between border-b pb-3">

            <span className="text-gray-500">
              Category
            </span>

            <span className="font-semibold text-gray-800">
              {selectedProduct.category}
            </span>

          </div>

          <div className="flex justify-between border-b pb-3">

            <span className="text-gray-500">
              Price
            </span>

            <span className="font-semibold text-gray-800">
              Rs. {selectedProduct.price.toLocaleString()}
            </span>

          </div>

          <div className="flex justify-between border-b pb-3">

            <span className="text-gray-500">
              Stock
            </span>

            <span className="font-semibold text-gray-800">
              {selectedProduct.stock}
            </span>

          </div>

          <div className="flex justify-between border-b pb-3">

            <span className="text-gray-500">
              Status
            </span>

            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                selectedProduct.status === "Active"
                  ? "bg-green-100 text-green-700"
                  : selectedProduct.status === "Low Stock"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {selectedProduct.status}
            </span>

          </div>

          <div>

            <p className="text-gray-500 mb-2">
              Description
            </p>

            <p className="text-gray-700 leading-relaxed">
              {selectedProduct.description ||
                "No description available."}
            </p>

          </div>

        </div>

        {/* Close */}

        <button
          onClick={() => setShowViewModal(false)}
          className="w-full mt-6 bg-gray-900 hover:bg-gray-800 text-white py-3 rounded-xl font-semibold transition"
        >
          Close
        </button>

      </div>

    </div>

  </div>

)}



{/* ================= DELETE MODAL ================= */}

{showDeleteModal && selectedProduct && (

  <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">

    {/* Overlay */}

    <div
      onClick={() => setShowDeleteModal(false)}
      className="absolute inset-0 bg-black/50"
    ></div>

    {/* Modal */}

    <div className="relative z-10 bg-white w-full max-w-md rounded-2xl shadow-2xl p-6">

      {/* Icon */}

      <div className="w-14 h-14 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto">

        <Trash2 size={25} />

      </div>

      <h2 className="text-xl font-bold text-center text-gray-800 mt-5">
        Delete Product?
      </h2>

      <p className="text-center text-gray-500 mt-2">
        Are you sure you want to delete
        <span className="font-semibold text-gray-700">
          {" "}{selectedProduct.name}
        </span>
        ?
      </p>

      <p className="text-center text-sm text-red-500 mt-2">
        This action cannot be undone.
      </p>

      {/* Buttons */}

      <div className="grid grid-cols-2 gap-3 mt-6">

        <button
          onClick={() => setShowDeleteModal(false)}
          className="py-3 rounded-xl border border-gray-200 text-gray-700 font-semibold hover:bg-gray-50 transition"
        >
          Cancel
        </button>

        <button
          onClick={handleDeleteProduct}
          className="py-3 rounded-xl bg-red-500 hover:bg-red-600 text-white font-semibold transition"
        >
          Delete
        </button>

      </div>

    </div>

  </div>

)}

    </div>
  );
};

export default DashboardProducts;