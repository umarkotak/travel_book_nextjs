import { LayoutDashboard, LogIn, Menu, Phone } from 'lucide-react'
import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import Footer from './Footer'

export default function LandingLayout({ children }) {
  const [loggedIn, setLoggedIn] = useState(false)
  const [role, setRole] = useState("user")
  const [cookies, setCookies] = useCookies(['tvb'])

  useEffect(() => {
    if (cookies.tvb_rl === "user") { setLoggedIn(true); setRole("user") }
    if (cookies.tvb_rl === "admin") { setLoggedIn(true); setRole("admin") }
  }, [])

  return(
    <div className="drawer">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />

      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <div className="z-20 w-full navbar bg-white bg-opacity-10 backdrop-blur-sm">
          <div className="flex-none lg:hidden">
            <label htmlFor="my-drawer-3" aria-label="open sidebar" className="btn btn-square btn-ghost text-white">
              <Menu />
            </label>
          </div>
          <div className="flex-1 px-2 mx-2">
            <Link href="/">
              <img className='h-full w-14' src={"/images/logo-drajih-white.png"} />
            </Link>
          </div>
          <div className="flex-none hidden lg:block">
            <ul className="menu menu-horizontal text-white">
              {/* Navbar menu content here */}
              <li><Link href="/camping_packets">Paket Camping</Link></li>
              <li><Link href="/about_us">Tentang Kami</Link></li>
              <li><Link href="/gallery">Galeri</Link></li>
              <li><Link href="/contact_us">Kontak Kami</Link></li>
              <li><Link className='border' href="/contact_us"><Phone size={14} /> Tanya Admin</Link></li>
              {!loggedIn && <li><Link href="/login"><LogIn size={14} /> Login</Link></li>}
              {loggedIn && role==="user" && <li><Link href="/d/dashboard"><LayoutDashboard size={14} /> Dashboard</Link></li>}
              {loggedIn && role==="admin" && <li><Link href="/a/dashboard"><LayoutDashboard size={14} /> Admin</Link></li>}
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
          <li><Link href="/camping_packets">Paket Camping</Link></li>
          <li><Link href="/about_us">Tentang Kami</Link></li>
          <li><Link href="/gallery">Galeri</Link></li>
          <li><Link href="/contact_us">Kontak Kami</Link></li>
          <li><Link className='border' href="/contact_us"><Phone size={14} /> Tanya Admin</Link></li>
          {!loggedIn && <li><Link href="/login"><LogIn size={14} /> Login</Link></li>}
          {loggedIn && role==="user" && <li><Link href="/d/dashboard"><LayoutDashboard size={14} /> Dashboard</Link></li>}
          {loggedIn && role==="admin" && <li><Link href="/a/dashboard"><LayoutDashboard size={14} /> Admin</Link></li>}
        </ul>
      </div>
    </div>
  )
}
