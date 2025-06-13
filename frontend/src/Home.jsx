import React from 'react'
import imageone from "./assets/image/banner3.png"
import imagetwo from "./assets/image/banne1.png"
import imagethree from "./assets/image/banner2.png"
import imagefour from "./assets/image/banner4.png"
import imagefive from "./assets/image/banner5.png"
import ProductList from './components/ProductList'
import TestimonialSection from './components/TestimonialSection'
import AboutSection from './components/AboutSection'
import WhyChooseChargeVita from './components/Whychooseus'
import OrderConfirmationPage from './components/OrderConfirmationPage'
export const Home = () => {
  return (
   <>
   <div className='mt-5'>
    <img src={imageone} alt="" className='w-full h-auto'/>
   </div>
   
   <ProductList/>
   <div className='hidden md:block'>
    <img src={imagetwo} alt="" className='md:w-full md:h-auto h-30 '/>
   </div>
   <AboutSection/>
   <WhyChooseChargeVita/>
   <div className='w-full container flex  mx-auto px-2 md:gap-5'>
    <div className='md:w-1/2'>
    <img src={imagethree} alt="" className='md:w-full md:h-auto h-45 '/>
    </div>
    <div className='md:w-1/2'>
    <img src={imagefour} alt="" className='md:w-full md:h-auto h-45 '/>
    </div>
    
   </div>
   <TestimonialSection/>
   <div className='md:hidden'>
    <img src={imagetwo} alt="" className='md:w-full md:h-auto h-30 '/>
   </div>

    <div className='hidden md:block'>
    <img src={imagefive} alt="" className='md:w-full md:h-auto h-30 '/>
   </div>
   </>
  )
}
