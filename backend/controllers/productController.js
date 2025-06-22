const Product = require("../models/Product");

const { upload } = require('../middleware/UploadMiddleware'); 
// Get all products
const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch products", error: err.message });
  }
};
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(400).json({ message: 'Invalid product ID' });
  }
};

// Seed products (one-time function)
const seedProducts = async (req, res) => {
  // Sample products (same as what you have in seedProducts)
   const sampleProducts = [
   {
    name: "Multivitamin and Minerals",
    image: "/uploads/products/productthirteen.png",
    price: 399,
    description: "Multivitamin & Minerals tablets are dietary supplements formulated to provide essential vitamins, minerals, and nutrients that support overall health. Designed for people with active lifestyles, nutrient gaps, or dietary restrictions, these tablets contribute to energy levels, immunity, skin health, and metabolic function.",
    features: [
      "Boosts energy and immunity with B-complex and Vitamin C",
      "Supports bone health with Calcium and Vitamin D",
      "Antioxidant protection with Vitamins A, E, and Zinc",
      "Promotes mental clarity and heart health",
      "GMP-certified, non-GMO, and gluten-free"
    ]
  },
    {
      name: "Pre and Probiotic Tablets",
      image: "/uploads/products/productten.webp",  // Assuming image path for seeded products
      price: 599,
      description: "Pre and Probiotic tablets support gut health by balancing the microbiome, improving digestion, and boosting immune function. Formulated with a blend of beneficial bacteria and prebiotic fibers, they help maintain a healthy digestive system. Ideal for enhancing nutrient absorption and reducing bloating.",
      features: [
  "Supports gut health and digestive function with beneficial bacteria",
  "Helps maintain a healthy balance of gut microbiota",
  "Improves nutrient absorption and reduces bloating",
  "Boosts immune function by enhancing gut flora",
  "GMP-certified, non-GMO, and gluten-free"
]

    },
    
    {
      name: "Sleep Gummies",
      image: "/uploads/products/productthree.webp",  // Assuming image path for seeded products
      price: 699,
      description: "Sleep gummies are a natural supplement designed to promote restful sleep and reduce nighttime restlessness. Formulated with melatonin, chamomile, and other calming ingredients, these gummies help you unwind and fall asleep faster. Ideal for those struggling with occasional sleeplessness or irregular sleep patterns.",
      features: [
  "Promotes restful sleep with melatonin and calming ingredients",
  "Helps reduce nighttime restlessness and anxiety",
  "Supports healthy sleep cycles for improved overall well-being",
  "Contains chamomile and valerian root for relaxation",
  "GMP-certified, non-GMO, and gluten-free"
]

    },
    {
      name: "Clear Skin Gummies",
      image: "/uploads/products/productsix.webp",  // Assuming image path for seeded products
      price: 499,
      description: "Clear Skin gummies are formulated with a blend of vitamins and antioxidants to support healthy, glowing skin. Packed with ingredients like Vitamin C, Zinc, and Biotin, these gummies help reduce acne and promote a clear complexion. Ideal for those seeking a natural boost to their skincare routine from within.",
      features: [
  "Supports healthy, glowing skin with Vitamin C, Zinc, and Biotin",
  "Reduces acne and blemishes for a clearer complexion",
  "Promotes collagen production for skin elasticity",
  "Packed with antioxidants to fight free radical damage",
  "GMP-certified, non-GMO, and gluten-free"
]

    },
    {
      name: "Keto ACV gummies",
      image: "/uploads/products/productfive.webp",  // Assuming image path for seeded products
      price: 499,
      description: "Keto ACV gummies combine the power of apple cider vinegar with ketogenic support to promote weight management and improve digestion. Formulated with B-vitamins and antioxidants, they help boost metabolism and enhance energy levels. Perfect for those following a keto diet or looking for a natural detox boost.",
      features: [
  "Supports weight management and metabolism with Apple Cider Vinegar",
  "Boosts energy levels and enhances digestion",
  "Helps detoxify the body and support the keto lifestyle",
  "Rich in B-vitamins and antioxidants for overall well-being",
  "GMP-certified, non-GMO, and gluten-free"
]

    },
     {
      name: "Biotin Tablets",
      image: "/uploads/products/productfour.jpg",  // Assuming image path for seeded products
      price: 399,
      description: "Biotin tablets are designed to support healthy hair, skin, and nails with a high dose of Vitamin B7. Known for its beauty benefits, biotin helps promote strong, thick hair, enhances skin radiance, and strengthens nails. Ideal for those looking to improve their beauty regimen from the inside out.",
      features: [
  "Promotes healthy hair growth and thickness with high-dose Biotin",
  "Enhances skin radiance and supports nail strength",
  "Supports overall beauty with Vitamin B7 (Biotin)",
  "Helps maintain healthy metabolism and energy levels",
  "GMP-certified, non-GMO, and gluten-free"
]

    },
     {
      name: "Turmeric Curcumin Tablets",
      image: "/uploads/products/producteight.webp",  // Assuming image path for seeded products
      price: 399,
      description: "Turmeric Curcumin tablets are formulated with potent turmeric extract to support joint health, reduce inflammation, and provide antioxidant protection. Curcumin, the active compound in turmeric, helps promote overall wellness and improve immune function. Ideal for those seeking natural relief from inflammation and pain.",
      features: [
  "Supports joint health and reduces inflammation with Curcumin",
  "Provides antioxidant protection for overall wellness",
  "Promotes a healthy immune system and improves vitality",
  "Helps reduce pain and discomfort naturally",
  "GMP-certified, non-GMO, and gluten-free"
]

    },
     {
      name: "Vitamin C & Zinc Gummies",
      image: "/uploads/products/productnine.webp",  // Assuming image path for seeded products
      price: 499,
      description: "Vitamin C & Zinc gummies are formulated to boost immune function and promote overall health. Packed with antioxidant-rich Vitamin C and immune-supporting Zinc, these gummies help fight free radicals and support skin health. Ideal for maintaining a strong immune system, especially during flu season.",
      features: [
  "Boosts immune function with high doses of Vitamin C and Zinc",
  "Supports healthy skin and wound healing with Vitamin C",
  "Provides antioxidant protection to fight free radicals",
  "Helps maintain a strong immune system year-round",
  "GMP-certified, non-GMO, and gluten-free"
]

    },
    {
      name: "Kids Multivitamin",
      image: "/uploads/products/producttwo.webp",  // Assuming image path for seeded products
      price: 699,
      description: "Kids Multivitamins are specially formulated to support the growth and development of children. Packed with essential vitamins and minerals, they help boost immunity, enhance energy, and promote healthy bones and teeth. Perfect for kids with picky eating habits or nutritional gaps.",
      features: [
  "Supports growth and development with essential vitamins and minerals",
  "Boosts immunity and enhances energy levels for active kids",
  "Promotes healthy bones, teeth, and overall well-being",
  "Tasty and easy-to-consume gummy format for kids",
  "GMP-certified, non-GMO, and gluten-free"
]

    },
     {
      name: "Calcuim",
      image: "/uploads/products/producttwelve.png",  // Assuming image path for seeded products
      price: 499,
      description: "Calcium tablets are designed to support strong bones and teeth, ensuring optimal bone health. Rich in calcium and Vitamin D, these tablets help improve bone density and prevent osteoporosis. Ideal for individuals seeking to maintain healthy bones at any age.",
      features: [
  "Supports strong bones and teeth with Calcium and Vitamin D",
  "Helps improve bone density and prevent osteoporosis",
  "Promotes overall bone health for individuals of all ages",
  "Assists in muscle function and nerve signaling",
  "GMP-certified, non-GMO, and gluten-free"
]

    },
     {
      name: "Hair Health Gummies",
      image: "/uploads/products/producteleven.png",  // Assuming image path for seeded products
      price: 499,
      description: "Hair Health gummies are packed with essential vitamins and nutrients to promote strong, healthy hair. Formulated with Biotin, Vitamin C, and other hair-boosting ingredients, they help improve hair growth, thickness, and shine. Perfect for those looking to enhance their hair care routine from within.",
      features: [
  "Promotes healthy hair growth and thickness with Biotin",
  "Improves hair shine and strength with Vitamin C and other nutrients",
  "Supports overall hair health and reduces hair thinning",
  "Provides essential nutrients for stronger, healthier hair",
  "GMP-certified, non-GMO, and gluten-free"
]

    },
     {
      name: "Healthy Lungs",
      image: "/uploads/products/productseven.jpg",  // Assuming image path for seeded products
      price: 599,
      description: "Healthy Lungs tablets are formulated with natural ingredients to support respiratory health and improve lung function. Rich in antioxidants and anti-inflammatory compounds, these tablets help clear airways, reduce inflammation, and promote overall lung vitality. Ideal for those looking to maintain healthy lungs and respiratory well-being.",
      features: [
  "Supports respiratory health and lung function with natural ingredients",
  "Helps clear airways and reduce inflammation for easier breathing",
  "Promotes overall lung vitality and oxygen flow",
  "Rich in antioxidants to protect lungs from free radical damage",
  "GMP-certified, non-GMO, and gluten-free"
]

    },
     
     
  ];


  try {
    await Product.deleteMany({});
    const created = await Product.insertMany(sampleProducts);
    res.json({ created });
  } catch (err) {
    res.status(500).json({ message: "Failed to seed products", error: err.message });
  }
};

// Add a new product
const addProduct = async (req, res) => {
  try {
    const { name, price, description, features } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Image upload failed" });
    }

    const product = new Product({
      name,
      price,
      description,
      features: features.split(','),
      image: `/uploads/${req.file.filename}`,
    });

    await product.save();
    res.status(201).json({ message: 'Product added successfully!', product });
  } catch (error) {
    res.status(500).json({ message: 'Error adding product', error });
  }
};


// Update a product
const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, image, price, description, features } = req.body;

  try {
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Update fields safely
    product.name = name || product.name;
    product.image = image || product.image;
    product.price = price || product.price;
    product.description = description || product.description;

    if (typeof features === "string") {
      product.features = features.split(",").map(f => f.trim());
    } else if (Array.isArray(features)) {
      product.features = features;
    }

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (err) {
    res.status(500).json({ message: "Failed to update product", error: err.message });
  }
};

// Delete a product
const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete product", error: err.message });
  }
};

module.exports = { getProducts, getProductById, seedProducts, addProduct, updateProduct, deleteProduct };
