import { HomeIcon, LayoutDashboard, LogIn, LogOut, Menu, Newspaper, Phone, ReceiptText, Tent, User, UserIcon } from 'lucide-react'
import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import Footer from './Footer'
import { useAlert } from "react-alert";
import { useRouter } from 'next/router'

export default function UserLayout({ children }) {
  const alert = useAlert()
  const router = useRouter()
  const [loggedIn, setLoggedIn] = useState(false)
  const [role, setRole] = useState("user")
  const [cookies, setCookies] = useCookies(['tvb'])

  useEffect(() => {
    if (!cookies.tvb_rl || cookies.tvb_rl === "") {
      router.push("/login")
    }

    if (cookies.tvb_rl === "user") {
      setLoggedIn(true)
      setRole("user")
    }
    if (cookies.tvb_rl === "admin") {
      setLoggedIn(true)
      setRole("admin")
    }
  }, [])

  function Logout(e) {
    e.preventDefault()
    alert.success("Logout success")
    setCookies("tvb_at", "", {path: "/"})
    setCookies("tvb_rl", "", {path: "/"})
    setCookies("tvb_nm", "", {path: "/"})
    setCookies("tvb_em", "", {path: "/"})
    router.push("/")
  }

  return(
    <div className="drawer">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />

      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <div className="z-20 w-full navbar bg-[#8ac16e]">
          <div className="flex-none lg:hidden">
            <label htmlFor="my-drawer-3" aria-label="open sidebar" className="btn btn-square btn-ghost">
              <Menu />
            </label>
          </div>
          <div className="flex-1 px-2 mx-2">
            <Link href="/">
              <img className='h-12 w-12' src={"/images/logo-drajih-color.png"} />
            </Link>
          </div>
          <div className="flex-none hidden lg:block">
            <ul className="menu menu-horizontal">
              {/* Navbar menu content here */}
              <li><Link href="/d/home"><HomeIcon size={14} /> Home</Link></li>
              <li><Link href="/d/camping_packets"><Tent size={14} /> Paket Camping</Link></li>
              <li><Link href="/d/my_booking"><ReceiptText size={14} /> Booking</Link></li>
              <li><Link href="#" className='text-red-800' onClick={(e)=>Logout(e)}><LogOut size={14} /> Logout</Link></li>
            </ul>
          </div>
        </div>

        {/* Page content here */}
        <div className='min-h-screen'>
          {children}
        </div>

        <Footer />
      </div>

      <div className="drawer-side z-20">
        <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 min-h-full bg-base-200">
          {/* Sidebar content here */}
          <li><Link href="/d/home"><HomeIcon size={14} /> Home</Link></li>
          <li><Link href="/d/camping_packets"><Tent size={14} /> Paket Camping</Link></li>
          <li><Link href="/d/my_booking"><ReceiptText size={14} /> Booking</Link></li>
          <li><Link href="#" className='text-red-800' onClick={(e)=>Logout(e)}><LogOut size={14} /> Logout</Link></li>
        </ul>
      </div>
    </div>
  )
}
