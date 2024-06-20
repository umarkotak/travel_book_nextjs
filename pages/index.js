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
        <div className="z-0 mt-[-70px]">
          <img className="relative object-cover h-screen w-full rounded-b-3xl" src={bannerList[bannerIndex]} />
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

      <div className="w-full bg-white">
        <div className="container max-w-4xl mx-auto mt-20">
          <div className="flex flex-col lg:flex-row items-center gap-6">
            <div>
              <img className="w-full" src={"/images/asset-01.jpg"} />
            </div>

            <div className="px-2">
              <p className="text-[28px]">Selamat Datang di D'Rajih Nature Camp</p>

              <p className="mt-4 text-md">D’Rajih Nature Camp adalah tempat wisata glamping dengan view yang indah, bermalam yang tepat bagi Anda berlibur bersama keluarga. Nikmati segala fasilitas hiburan untuk Anda dan keluarga</p>

              <Link href="/about_us" className="mt-4 btn btn-outline">Tentang Kami</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
