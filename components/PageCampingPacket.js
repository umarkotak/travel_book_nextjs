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
    console.log("DATESELECT", item)

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
        {[{}, {}, {}].map((campingPacket, idx) => (
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
