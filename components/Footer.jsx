import { Twitter } from 'lucide-react'
import { Instagram } from 'lucide-react'
import { X } from 'lucide-react'
import { Facebook } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <div className="w-full border-t-2 px-3">
      <div  className="mx-auto  max-w-[1200px]  py-6 space-y-2 flex md:flex-row md:justify-around md:items-start flex-col text-left border-b-2">
        <div className='space-y-2.5'>
        <p><strong>About DeEmpire</strong></p>
        <p className='w-[150px]'> Your trusted online marketplace for quality products.</p>
        </div>
        <div className='space-y-2.5'>
        <p><strong>Quick Links</strong></p>
        <p  className='flex flex-col'>
          <Link href={'/'} className='mx-4 hover:underline'>Home</Link>
            <Link href={'/about'} className='mx-4 hover:underline'>About</Link>
            <Link href={'/contact'} className='mx-4 hover:underline'>Contact Us</Link>
        </p>
        </div>
        <div className='space-y-2.5' >
        <p><strong>Connect with US</strong></p>
        <div className='flex gap-4'>
        <Link href='https://www.facebook.com/profile.php?id=61574558004952'><Facebook /></Link>
        <Link href='https://x.com/Phoe_nix_Ash?t=g7HituTXeiaqApdVM8wu6w&s=09'><Twitter /></Link>
        <Link href='https://www.instagram.com/emma_nu_e.l?igsh=MXQ3cXV4NDY4czlneQ=='><Instagram /></Link>
        </div>
      </div>
        </div>
        <div className='mx-auto  max-w-[1200px] py-4 flex justify-between'>
          <p>copyright © 2023 DeEmpire. </p>
          <p>All rights reserved.</p>
        </div>
    </div>
  )
}

export default Footer

