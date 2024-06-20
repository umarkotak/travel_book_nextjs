import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation'
import { useEffect } from 'react'

export default function Footer() {
  return(
    <footer className="footer p-10 bg-[#8ac16e] text-base-content mt-16">
      <aside>
        <img className='w-52 h-52' src={"/images/logo-drajih-color.png"} />
        <p className='max-w-sm'>D’Rajih Nature Camp adalah tempat wisata glamping dengan view yang indah, bermalam yang tepat bagi Anda berlibur bersama keluarga. Nikmati segala fasilitas hiburan untuk Anda dan keluarga</p>
      </aside>
      <nav>
        <h6 className="footer-title">Services</h6>
        <a className="link link-hover">Branding</a>
        <a className="link link-hover">Design</a>
        <a className="link link-hover">Marketing</a>
        <a className="link link-hover">Advertisement</a>
      </nav>
      <nav>
        <h6 className="footer-title">Company</h6>
        <a className="link link-hover">About us</a>
        <a className="link link-hover">Contact</a>
        <a className="link link-hover">Jobs</a>
        <a className="link link-hover">Press kit</a>
      </nav>
      <nav>
        <h6 className="footer-title">Legal</h6>
        <a className="link link-hover">Terms of use</a>
        <a className="link link-hover">Privacy policy</a>
        <a className="link link-hover">Cookie policy</a>
      </nav>
    </footer>
  )
}
