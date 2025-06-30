import React from 'react'
import imageone from "./assets/image/banner3.webp"
import imagetwo from "./assets/image/banne1.webp"
import imagethree from "./assets/image/banner2.webp"
import imagefour from "./assets/image/banner4.webp"
import imagefive from "./assets/image/banner5.webp"
import ProductList from './components/ProductList'
import TestimonialSection from './components/TestimonialSection'
import AboutSection from './components/AboutSection'
import WhyChooseChargeVita from './components/Whychooseus'

export const Home = () => {
  return (
   <>
   <div>
    <img src={imageone} alt="" loading='lazy' className='w-full h-auto'/>
   </div>
   
   <ProductList/>
   <div className='hidden md:block'>
    <img src={imagetwo} alt="" loading='lazy' className='md:w-full md:h-auto h-30 '/>
   </div>
   <AboutSection/>
   <WhyChooseChargeVita/>
   <div className='w-full container flex  mx-auto px-2 gap-2 md:gap-5'>
    <div className='md:w-1/2'>
    <img src={imagethree} alt="" loading='lazy' className='md:w-full md:h-auto h-40 '/>
    </div>
    <div className='md:w-1/2'>
    <img src={imagefour} alt="" loading='lazy' className='md:w-full md:h-auto h-40 '/>
    </div>
    
   </div>
   <TestimonialSection/>
   <div className='md:hidden'>
    <img src={imagetwo} alt="" loading='lazy' className='md:w-full md:h-auto h-35 '/>
   </div>

    <div className='hidden md:block'>
    <img src={imagefive} alt="" loading='lazy' className='md:w-full md:h-auto h-30 '/>
   </div>
   </>
  )
}
