import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Slider from "@/components/Slider";
import Categories from "@/components/Categories";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <div className="home">
        <Slider />
        <Categories />
        {/* <FeaturedProducts type="featured" />
        
        <FeaturedProducts type="trending" />
        <Contact /> */}
      </div>
    </>
  );
}
