import React from 'react'
import Navbar from './home/Navbar'
import HeroSection from './home/HeroSection'
import About from './home/About'
import { KeyFeatures } from './home/KeyFeatures'
import FAQs from './home/FAQs'
import Footer from './home/Footer'

const Home = () => {
  return (
    <div className="min-h-screen bg-[#003153]">
      <Navbar />
      <HeroSection />
      <About />
      <KeyFeatures />
      <FAQs />
      <Footer />
    </div>
  )
}

export default Home
