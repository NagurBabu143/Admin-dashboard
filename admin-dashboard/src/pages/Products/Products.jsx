import React, { useState, useEffect } from "react";
import "./Products.css";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Slider,
} from "@mui/material";

const productList = [
  { id: 1, name: "Smartphone", price: 599, category: "Electronics", rating: 4.5, image: "/images/smartphone.jpg" },
  { id: 2, name: "Headphones", price: 199, category: "Electronics", rating: 4.2, image: "/images/headphones.jpg" },
  { id: 3, name: "Running Shoes", price: 120, category: "Footwear", rating: 4.7, image: "/images/shoes.jpg" },
  { id: 4, name: "Watch", price: 250, category: "Accessories", rating: 4.3, image: "/images/watch.jpg" },
  { id: 5, name: "Laptop", price: 1099, category: "Electronics", rating: 4.8, image: "/images/laptop.jpg" },
  { id: 6, name: "Backpack", price: 80, category: "Accessories", rating: 4.4, image: "/images/backpack.jpg" },
];

const Products = () => {
  const [products, setProducts] = useState(productList);
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");
  const [priceRange, setPriceRange] = useState([0, 1200]);

  useEffect(() => {
    let filteredProducts = [...productList];

    if (category) {
      filteredProducts = filteredProducts.filter((p) => p.category === category);
    }

    filteredProducts = filteredProducts.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    if (sort === "price") {
      filteredProducts.sort((a, b) => a.price - b.price);
    } else if (sort === "name") {
      filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sort === "rating") {
      filteredProducts.sort((a, b) => b.rating - a.rating);
    }

    setProducts(filteredProducts);
  }, [category, sort, priceRange]);

  return (
    <div className="products">
      <Typography variant="h4" className="title">Product Catalog</Typography>

      <div className="filters">
        <FormControl>
          <InputLabel>Category</InputLabel>
          <Select value={category} onChange={(e) => setCategory(e.target.value)}>
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Electronics">Electronics</MenuItem>
            <MenuItem value="Footwear">Footwear</MenuItem>
            <MenuItem value="Accessories">Accessories</MenuItem>
          </Select>
        </FormControl>

        <FormControl>
          <InputLabel>Sort By</InputLabel>
          <Select value={sort} onChange={(e) => setSort(e.target.value)}>
            <MenuItem value="">None</MenuItem>
            <MenuItem value="price">Price</MenuItem>
            <MenuItem value="name">Name</MenuItem>
            <MenuItem value="rating">Rating</MenuItem>
          </Select>
        </FormControl>

        <div className="price-filter">
          <Typography>Price Range: Rs.{priceRange[0]} - Rs.{priceRange[1]}</Typography>
          <Slider
            value={priceRange}
            onChange={(e, newValue) => setPriceRange(newValue)}
            valueLabelDisplay="auto"
            min={0}
            max={1200}
          />
        </div>
      </div>

      <div className="product-grid">
        {products.map((product) => (
          <Card key={product.id} className="product-card">
            <CardMedia component="img" height="200" image={product.image} alt={product.name} />
            <CardContent>
              <Typography variant="h6">{product.name}</Typography>
              <Typography variant="body1">Price: Rs.{product.price}</Typography>
              <Typography variant="body2">Rating: ⭐ {product.rating}</Typography>
              <Button variant="contained" color="primary" className="cart-button">
                Add to Cart
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Products;
