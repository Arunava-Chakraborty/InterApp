"use client"
import React, { useEffect } from 'react'
import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

function Header() {

  const path = usePathname();
  useEffect(()=>{
    console.log(path)
  })

     
  return (
    <div className='flex p-4 items-center justify-between bg-secondary shadow-sm '>
        <Image src={'/logo.svg'} width={120} height={80} alt='logo'/>
        
        <ul className=' hidden md:flex gap-6'>
           <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer 
           ${path == '/dashboard' && 'text-primary font-bold' }
           `
           }>
            Dashboard
           </li>
           <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer 
           ${path == '/dashboard/Interviews' && 'text-primary font-bold' }
           `
           }>
            Interviews
           </li>
           <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer 
           ${path == '/dashboard/Quiestions' && 'text-primary font-bold' }
           `
           }>
            Quiestions
           </li>
           <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer 
           ${path == '/dashboard/Guide' && 'text-primary font-bold' }
           `
           }>
           Guide
            </li>
        </ul>
        <UserButton/>
    
    </div>
  )
}

export default Header