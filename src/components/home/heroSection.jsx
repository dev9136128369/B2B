import React from 'react'
import Slider from './Slider'
import Container from "@/components/Container"; 
import styles from "@/styles/home/hero.module.css"
// import Link from 'next/link';

const HeroSection = () => {
  return (
   <Container>
    <section className={styles.hero}>
      <div className= {`${styles.textSection} text-gray-700`}>
        <h1>One stop solution <span className='text-pink-500'>E-store</span></h1>
        <p>Discover the latest headphones, earphones, mobiles, tablets etc.</p>
        <p>Exclusive deals just for you</p>
        <a href={"/SignUp"}>
        <button className={styles.ctaButton}>Shop Now </button>
</a>

      </div>
      <Slider />
      </section>
      </Container> 
  )
}

export default HeroSection
