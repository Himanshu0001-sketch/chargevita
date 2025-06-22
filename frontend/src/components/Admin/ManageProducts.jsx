import React, { useEffect, useState } from "react";
import axios from "axios";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [newProduct, setNewProduct] = useState({
    name: "",
    image: null,
    price: "",
    description: "",
    features: "",
  });

const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    sessionStorage.removeItem("fromDashboard");
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${apiUrl}/api/products`);

      setProducts(res.data);
    } catch (error) {
      console.error("Failed to load products", error);
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", newProduct.name);
    formData.append("price", newProduct.price);
    formData.append("description", newProduct.description);
    formData.append("features", newProduct.features);
    if (newProduct.image) formData.append("image", newProduct.image);

    try {
      if (editingId) {
  const updatePayload = {
    ...newProduct,
    features: newProduct.features.split(',').map(f => f.trim()), // ✅ convert to array
  };

  await axios.put(`http://localhost:5000/api/products/${editingId}`, updatePayload, {
    headers: {
      username: "admin",
      password: "adminpassword",
    },
  });

  alert("Product updated successfully!");
}


      setNewProduct({
        name: "",
        image: null,
        price: "",
        description: "",
        features: "",
      });
      setEditingId(null);
      fetchProducts();
    } catch (err) {
      console.error(err);
      alert("Failed to save product");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`, {
        headers: {
          username: "admin",
          password: "adminpassword",
        },
      });
      fetchProducts();
    } catch (error) {
      console.error("Failed to delete product", error);
      alert("Failed to delete product");
    }
  };

  const handleEdit = (product) => {
    setEditingId(product._id);
    setNewProduct({
      name: product.name,
      price: product.price,
      description: product.description,
      features: product.features?.join(", "),
      image: null,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">Manage Products</h2>

      <form
        onSubmit={handleAddProduct}
        className="bg-gray-100 p-6 rounded-lg shadow mb-8"
        encType="multipart/form-data"
      >
        <h3 className="text-xl font-semibold mb-4">
          {editingId ? "Edit Product" : "Add New Product"}
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Name"
            value={newProduct.name}
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            className="p-2 border rounded"
            required
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setNewProduct({ ...newProduct, image: e.target.files[0] })}
            className="p-2 border rounded"
            required={!editingId}
          />
          <input
            type="number"
            placeholder="Price"
            value={newProduct.price}
            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
            className="p-2 border rounded"
            required
          />
          <input
            type="text"
            placeholder="Features (comma separated)"
            value={newProduct.features}
            onChange={(e) => setNewProduct({ ...newProduct, features: e.target.value })}
            className="p-2 border rounded"
            required
          />
        </div>
        <textarea
          placeholder="Description"
          value={newProduct.description}
          onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
          className="w-full mt-4 p-2 border rounded"
        />

        {newProduct.image && (
          <div className="mt-4">
            <p className="text-sm text-gray-700 mb-1">Image Preview:</p>
            <img
              src={URL.createObjectURL(newProduct.image)}
              alt="Preview"
              className="w-40 h-35 object-cover rounded shadow"
            />
          </div>
        )}

        <button
          type="submit"
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
        >
          {editingId ? "Update Product" : "Add Product"}
        </button>
      </form>

      <div>
        <h3 className="text-2xl font-semibold mb-4">Product List</h3>
        <div className="grid gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="border p-4 rounded shadow flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                {product.image && (
                  <img
                    src={`http://localhost:5000${product.image}`}
                    alt={product.name}
                    className="w-20 h-20 object-cover rounded"
                  />
                )}
                <div>
                  <h4 className="text-lg font-bold">{product.name}</h4>
                  <p className="text-gray-700">₹{product.price}</p>
                  <p className="text-sm text-gray-600">{product.description}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(product)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(product._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManageProducts;
