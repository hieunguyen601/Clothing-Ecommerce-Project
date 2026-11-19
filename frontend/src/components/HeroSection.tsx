import { useState, useEffect } from "react";
import api from "../api";

function HeroSection() {
  interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    images: string[];
    category: "men" | "women" | "kids" | "accessories";
    rating: number;
    stock: number;
    brand: string;
    sizes: string[];
    colors: string[];
  }
  const [clothes, setClothes] = useState<Product[]>([]);
  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await api.get<Product[]>("/products");
        setClothes(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getProducts();
  }, []);

  return (
    <>
      {clothes.map((item) => (
        <div key={item.id}>
          <img src={item.images[0]} alt={item.title} />
          <h3>{item.title}</h3>
          <p>${item.price}</p>
        </div>
      ))}
    </>
  );
}

export default HeroSection;
