import React from 'react'
import HeroSection from '@/components/store/HeroSection'
import BrandMeaning from '@/components/store/BrandMeaning'
import FeaturedProducts from '@/components/store/FeaturedProducts'
import BrandStory from '@/components/store/BrandStory'
import CollectionPreview from '@/components/store/CollectionPreview'

export default function Home() {
  return (
    <>
      <HeroSection />
      <BrandMeaning />
      <FeaturedProducts />
      <BrandStory />
      <CollectionPreview />
    </>
  )
}
