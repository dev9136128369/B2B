"use client";
import React, { useState, useEffect } from "react";
import styles from "@/styles/home/hero.module.css";
import Image from "next/image";

const images = [
  "/images/hadphone.jpeg",
  "/images/tablate.jpeg",
  "/images/earphone.webp",
  "/images/mobile.jpeg",
];

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 3000); // 3 sec me slide change hoga

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.imageSection}>
      <div className={styles.slider}>
        {images.map((image, index) => (
          <div 
            key={"slide" + index} 
            className={`${styles.slide} ${index === currentSlide ? styles.active : ''}`}
          >
            <Image 
              alt={"slide " + index} 
              src={image} 
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className={styles.image} 
              
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slider;
