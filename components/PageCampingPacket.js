import { FlameKindling, Minus, ParkingSquare, Plus, Search, ShoppingCart, ShowerHead, Tent, Users } from 'lucide-react'
import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import { DateRange } from 'react-date-range';
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import CampingPacketCard from './CampingPacketCard'

export default function PageCampingPacket() {
  const [campingList, setCampingList] = useState([
    {
      slug: "drajih-glamping-camp",
      main_thumbnail: "https://d-rajihnaturecamp.com/wp-content/uploads/2024/06/glamp.png",
      thumbnails: [
        "https://d-rajihnaturecamp.com/wp-content/uploads/2024/06/bg-contact.jpeg",
        "https://d-rajihnaturecamp.com/wp-content/uploads/2024/06/5.png",
        "https://d-rajihnaturecamp.com/wp-content/uploads/2024/06/4.png",
        "https://d-rajihnaturecamp.com/wp-content/uploads/2024/06/1.png",
        "https://d-rajihnaturecamp.com/wp-content/uploads/2024/06/2.png",
        "https://d-rajihnaturecamp.com/wp-content/uploads/2024/06/3.png",
        "https://d-rajihnaturecamp.com/wp-content/uploads/2024/06/banner-04.jpeg",
        "https://d-rajihnaturecamp.com/wp-content/uploads/2024/06/banner-03.jpeg",
        "https://d-rajihnaturecamp.com/wp-content/uploads/2024/06/WhatsApp-Image-2024-06-15-at-14.34.03.jpeg",
        "https://d-rajihnaturecamp.com/wp-content/uploads/2024/06/WhatsApp-Image-2024-06-15-at-16.42.46.jpeg",
      ],
      name: "Drajih Glamping Camp",
      description: "Keunikan Glamping untuk menjadi pengalaman baru liburan kamu, pingin coba type drajih glamping nyaman, aman? D'Rajih Nature Camp jawabannya!",
      specs: [
        {key: "size", value: "4x3 m2"},
        {key: "pax", value: "4 Pax"},
        {key: "toilet", value: "Toilet Bersama"},
        {key: "park", value: "Parkir"},
        {key: "bonfire", value: "Area Api Unggun"},
      ],
      facilitates: [
        "kasur 2", "coffee & tea", "breakfast 4 pax", "folding chair 2", "folding table 1", "cooking set", "kompor portable", "grill pan", "hicook gas 2", "stop kontak ", "teko listrik", "payung 2", "rak sepatu", "gantungan baju", "air mineral galon 1", "extrabed 1"
      ],
      weekday_price: 500000,
      weekend_price: 750000,
      remaining_slot: 5,
    },
    {
      slug: "drajih-dome-tent",
      main_thumbnail: "https://d-rajihnaturecamp.com/wp-content/uploads/2024/06/WhatsApp-Image-2024-06-15-at-14.34.04-150x150.jpeg",
      thumbnails: [
        "https://d-rajihnaturecamp.com/wp-content/uploads/2024/06/WhatsApp-Image-2024-06-15-at-14.34.04-150x150.jpeg",
        "https://d-rajihnaturecamp.com/wp-content/uploads/2024/05/dome-150x150.jpg",
        "https://d-rajihnaturecamp.com/wp-content/uploads/2024/06/WhatsApp-Image-2024-06-15-at-14.34.23-150x150.jpeg",
        "https://d-rajihnaturecamp.com/wp-content/uploads/2024/06/WhatsApp-Image-2024-06-15-at-14.34.01-150x150.jpeg",
        "https://d-rajihnaturecamp.com/wp-content/uploads/2024/06/WhatsApp-Image-2024-06-15-at-14.34.03-150x150.jpeg",
        "https://d-rajihnaturecamp.com/wp-content/uploads/2024/06/WhatsApp-Image-2024-06-15-at-16.42.46-1-150x150.jpeg",
        "https://d-rajihnaturecamp.com/wp-content/uploads/2024/06/WhatsApp-Image-2024-06-15-at-16.42.46-150x150.jpeg",
        "https://d-rajihnaturecamp.com/wp-content/uploads/2024/05/campgrpund-150x150.jpg",
      ],
      name: "Drajih Dome Tent",
      description: "Tenda Dome dapat menjadi pengalaman baru liburan kamu, pingin coba type dome tent dengan nyaman, aman? D’Rajih Nature Camp jawabannya!",
      specs: [
        {key: "size", value: "10 m2"},
        {key: "pax", value: "4 Pax"},
        {key: "toilet", value: "Toilet Bersama"},
        {key: "park", value: "Parkir"},
        {key: "bonfire", value: "Area Api Unggun"},
      ],
      facilitates: [
        "tenda dome 1", "matras spoon 4", "sleeping bag 4", "lampu tenda 1", "bantal tiup 4", "cooking set 1", "kompor portable 1", "tiang flysheet 1", "flysheet (3x4) 1", "grill pan 1", "gas hicook 2", "folding chair 4", "folding table 1", "colokan terminal 1", "kasur untuk 4 org 1", "payung 1",
      ],
      weekday_price: 350000,
      weekend_price: 450000,
      remaining_slot: 10,
    },
  ])
  const [bookingParams, setBookingParams] = useState({
    date_start_wib: "",
    date_end_wib: "",
    packets: {},
  })
  const [dateRange, setDateRange] = useState(
    [
      {
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection',
      }
    ]
  )

  function handleSelectDateRange(item) {
    setDateRange([item.selection])
  }

  return(
    <div className='container max-w-3xl min-h-screen mx-auto py-6'>
      <div className='p-4 mx-2 bg-[#8ac16e] rounded-lg'>
        <div className='flex justify-between'>
          <p className='text-2xl'>Pilih Tanggal Menginap</p>

          <button className='btn btn-sm btn-outline'><Search size={14} /> Cari</button>
        </div>

        <div className='mt-2 flex justify-center'>
          <div className='bg-white w-full rounded-lg overflow-hidden'>
            <DateRange
              className='w-full'
              editableDateInputs={true}
              onChange={item => handleSelectDateRange(item)}
              moveRangeOnFirstSelection={false}
              months={2}
              direction="horizontal"
              ranges={dateRange}
            />
          </div>
        </div>
      </div>

      <div className='flex flex-col gap-4 px-2 mt-6'>
        {campingList.map((campingPacket, idx) => (
          <CampingPacketCard
            key={idx}
            campingPacket={campingPacket}
            bookingParams={bookingParams}
            setBookingParams={setBookingParams}
          />
        ))}
      </div>

      <div className="drawer drawer-end">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Page content here */}
          <label htmlFor="my-drawer-4" className="fixed bottom-8 right-8 drawer-button btn btn-sm btn-primary"><ShoppingCart size={14} /> Konfirmasi Booking</label>
        </div>
        <div className="drawer-side z-30">
          <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
            {/* Sidebar content here */}
            <li><a>Sidebar Item 1</a></li>
            <li><a>Sidebar Item 2</a></li>
          </ul>
        </div>
      </div>
    </div>
  )
}
