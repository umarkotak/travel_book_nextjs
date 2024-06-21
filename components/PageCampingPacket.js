import { Check, FlameKindling, Minus, ParkingSquare, Plus, Search, ShoppingCart, ShowerHead, Tent, Users } from 'lucide-react'
import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import { DateRange } from 'react-date-range';
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import CampingPacketCard from './CampingPacketCard'
import utils from '@/commons/Utils'
import RentEquipmentCard from './RentEquipmentCard'

export default function PageCampingPacket() {
  const [activeTab, setActiveTab] = useState("camping_packets")
  const [campingList, setCampingList] = useState([
    {
      slug: "drajih-glamping-camp",
      main_thumbnail: "https://d-rajihnaturecamp.com/wp-content/uploads/2024/06/glamp.png",
      thumbnails: [
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
    {
      slug: "drajih-camp-ground",
      main_thumbnail: "https://d-rajihnaturecamp.com/wp-content/uploads/2024/06/2-1.png",
      thumbnails: [
        "https://d-rajihnaturecamp.com/wp-content/uploads/2024/06/3-1.png",
        "https://d-rajihnaturecamp.com/wp-content/uploads/2024/06/1-1.png",
        "https://d-rajihnaturecamp.com/wp-content/uploads/2024/06/WhatsApp-Image-2024-06-15-at-16.42.46.jpeg",
        "https://d-rajihnaturecamp.com/wp-content/uploads/2024/06/WhatsApp-Image-2024-06-15-at-16.42.46-1.jpeg",
        "https://d-rajihnaturecamp.com/wp-content/uploads/2024/06/WhatsApp-Image-2024-06-15-at-14.34.03.jpeg",
        "https://d-rajihnaturecamp.com/wp-content/uploads/2024/06/banner-03.jpeg",
      ],
      name: "Drajih Camp Ground",
      description: "Camp Ground untuk kamu yang ingin mencoba di kavling area drajih nature camp, dengan membawa tenda dan peralatan sendiri untuk menambah pengalaman baru nge-camp kamu di D’Rajih Nature Camp.",
      specs: [
        {key: "pax", value: "1 Pax"},
        {key: "toilet", value: "Toilet Bersama"},
        {key: "park", value: "Parkir"},
        {key: "bonfire", value: "Area Api Unggun"},
      ],
      facilitates: [],
      weekday_price: 35000,
      weekend_price: 35000,
      remaining_slot: 1000,
    },
  ])
  const [rentEquipmentList, setRentEquipmentList] = useState([
    {
      id: 1,
      image: "https://placehold.co/200x200",
      name: "kursi lipat",
      price: 30000,
      remaining_stock: 10,
    },
    {
      id: 2,
      image: "https://placehold.co/200x200",
      name: "meja lipat",
      price: 35000,
      remaining_stock: 10,
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

  function proceedBooking() {
    bookingParams.date_start_wib = utils.FormatDateObjToDateStr(dateRange[0].startDate),
    bookingParams.date_end_wib = utils.FormatDateObjToDateStr(dateRange[0].endDate),

    console.log("BOOKING", bookingParams)
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

      <div className='flex px-2 gap-2 mt-6'>
        <button className='flex-1 btn btn-md btn-outline btn-block' onClick={()=>setActiveTab("camping_packets")}>Paket Camping</button>
        <button className='flex-1 btn btn-md btn-outline btn-block' onClick={()=>setActiveTab("rent_equipment")}>Sewa Perlengkapan</button>
      </div>

      <div className='flex flex-col gap-4 px-2 mt-4'>
        {activeTab === "camping_packets" && campingList.map((campingPacket, idx) => (
          <CampingPacketCard
            key={idx}
            campingPacket={campingPacket}
            bookingParams={bookingParams}
            setBookingParams={setBookingParams}
          />
        ))}
        {activeTab === "rent_equipment" && rentEquipmentList.map((oneEquipment, idx) => (
          <RentEquipmentCard
            key={idx}
            oneEquipment={oneEquipment}
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
          <div className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
            {/* Sidebar content here */}
            <div>
              {Object.keys(bookingParams.packets).filter((slug) => bookingParams.packets[slug] > 0).map((slug) => (
                <div className='flex justify-between items-center text-md mb-2'>
                  <div className='flex items-center'>
                    <Zoom>
                      <img
                        className='h-12 w-12 object-cover rounded-lg overflow-hidden mr-2'
                        src={campingList.filter((obj) => obj.slug === slug)[0].main_thumbnail}
                      />
                    </Zoom>
                    <span>{campingList.filter((obj) => obj.slug === slug)[0].name}</span>
                  </div>
                  <span>{bookingParams.packets[slug]}x</span>
                </div>
              ))}
            </div>

            <div className='flex justify-end mt-8'>
              <button
                className='btn btn-sm btn-outline'
                onClick={()=>proceedBooking()}
              ><Check size={14} /> Lanjutkan</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
