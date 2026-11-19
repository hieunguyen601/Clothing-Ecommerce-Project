import { useState, useEffect } from "react";

function HeroSection() {
  type Product = {
    id: number;
    title: string;
    price: number;
    description: string;
    images: string[];
    category: string;
  };
  const [clothes, setClothes] = useState<Product[]>([]);
  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await fetch(
          "https://scenesku.com/api/v1/public-packs/womens-fashion",
        );
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data: { products: Product[] } = await response.json();
        setClothes(data.products);
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
          <img src={item.image_url} alt={item.title} />
          <h3>{item.title}</h3>
          <p>${item.price}</p>
        </div>
      ))}
    </>
  );
}

export default HeroSection;
