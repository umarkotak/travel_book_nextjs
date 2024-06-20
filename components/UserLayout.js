import { HomeIcon, LayoutDashboard, LogIn, LogOut, Menu, Newspaper, Phone, ReceiptText, Tent, User, UserIcon } from 'lucide-react'
import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'

export default function UserLayout({ children }) {
  const [loggedIn, setLoggedIn] = useState(false)
  const [role, setRole] = useState("user")
  const [cookies, setCookies] = useCookies(['tvb'])

  useEffect(() => {
    if (cookies.tvb_rl === "user") { setLoggedIn(true); setRole("user") }
    if (cookies.tvb_rl === "admin") { setLoggedIn(true); setRole("admin") }
  }, [])

  function Logout() {

  }

  return(
    <div className="w-full bg-white">
      <div className='container mx-auto max-w-xl'>
        <div className='min-h-screen bg-blue-100 p-2 border shadow-lg'>
          {children}
        </div>
      </div>

      <div className='w-full bg-white fixed bottom-0'>
        <div className='container mx-auto max-w-xl p-2 bg-blue-500'>
          <div className='flex justify-between items-center gap-1'>
            <Link href="#" className='flex-1 flex flex-col items-center p-2 hover:bg-white rounded-lg'><HomeIcon size={14} /> Home</Link>
            <Link href="#" className='flex-1 flex flex-col items-center p-2 hover:bg-white rounded-lg'><Tent size={14} /> Camping</Link>
            <Link href="#" className='flex-1 flex flex-col items-center p-2 hover:bg-white rounded-lg'><ReceiptText size={14} /> Booking</Link>
            <Link href="#" className='flex-1 flex flex-col items-center p-2 hover:bg-white rounded-lg'><Newspaper size={14} /> News</Link>
            <Link href="#" className='flex-1 flex flex-col items-center p-2 hover:bg-white rounded-lg'><UserIcon size={14} /> Account</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
