import { Calendar } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

const bannerList = [
  "/images/banner-01.jpeg",
  "/images/banner-02.jpeg",
  "/images/banner-03.jpeg",
  "/images/banner-04.jpeg",
]

export default function Home() {
  const [bannerIndex, setBannerIndex] = useState(0)

  return (
    <div>
      <div className="">
        <div className="z-0 mt-[-68px]">
          <img className="relative object-cover h-screen w-full" src={bannerList[bannerIndex]} />
          <div className="text-white absolute top-[132px] px-6 w-2/3 xl:w-1/2">
            <p className="xl:text-[28px]">D-Rajih Nature Camp</p>

            <p className="text-[28px] xl:text-[48px] font-bold mt-2 xl:mt-4">
              Pengalaman Tak Terlupakan di Tengah Keindahan Alam!
            </p>

            <p className="text-md mt-4">
              Keunikan Glamping untuk menjadi pengalaman baru liburan kamu, pingin coba glamping nyaman, aman? D’Rajih Nature Camp jawabannya!
            </p>

            <Link href="/" className="btn btn-outline mt-8 text-white">
              <Calendar /> Reservasi Disini
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
