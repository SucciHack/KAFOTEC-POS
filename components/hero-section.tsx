import React from 'react'
import { Button } from './ui/button'
import { Code2, Folder, Github, MoveRight } from 'lucide-react'
import AnimatedAvatars from './AnimatedAvatars'
// import { AvatarCirclesDemo } from './AnimatedAvatars'

export default function HeroSection() {
  return (
    <div className='h-[800px] bg-[#030712] flex justify-center text-gray-300 pt-48'>
        <div className='max-w-3xl text-center relative'>
            <h1 className='text-5xl font-semibold'>The Best Trusted Milling Company In Uganda</h1>
            <p className='max-w-2xl mx-auto mt-8 text-lg'>KAFOTEC Milling Technologies Uganda specializes in high-quality, precision-milled maize flour and grains, using advanced technology to deliver top-notch products to both local and international markets.</p>
            <div className="flex justify-center gap-3 mt-3 mx-auto">
                <Button className='bg-[#3663EB] py-6 px-6 rounded-full text-md'>
                    Get Started  <span><MoveRight /></span>
                </Button>
                <Button className='bg-white text-black py-6 px-6 rounded-full text-md'>
                    Explore Page Sections
                </Button>
            </div>
                <div className="absolute top-[-10px] left-[-80px] text-3xl bg-white/5 p-4 rounded-lg transition-transform duration-300 origin-center hover:-rotate-6 rotate-6">
                <Code2/>
                </div>
                <div className="absolute top-[-90px] right-[50%] text-3xl bg-white/5 p-4 rounded-lg transition-transform duration-300 origin-center hover:-rotate-6 rotate-6">
                    <Folder/>
                </div>
                <div className="absolute top-10 right-[-80px] text-3xl bg-white/5 p-4 rounded-lg transition-transform duration-300 origin-center hover:rotate-6 -rotate-6">
                    <Github/>
                </div>
                <div className="flex justify-center mt-6">
                    <AnimatedAvatars/>
                </div>
        </div>
    </div>
  )
}
