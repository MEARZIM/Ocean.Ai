import { Button } from '@/components/ui/button'
import { UserButton } from '@clerk/nextjs'
import {  Menu } from 'lucide-react'
import MobileSidebar from '@/components/layouts/Sidebar/MobileSidebar'

const Navbar = () => {
  return (
    <nav className='flex items-center p-4'>
        <MobileSidebar />
        <div className='w-full flex justify-end'>
            <UserButton afterSignOutUrl='/' />
        </div>
    </nav>
  )
}

export default Navbar
