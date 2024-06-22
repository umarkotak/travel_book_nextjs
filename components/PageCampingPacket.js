import { Axe, Check, FlameKindling, Minus, ParkingSquare, Plus, Search, ShoppingCart, ShowerHead, Tent, Users } from 'lucide-react'
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
import travelBookAPI from '@/commons/TravelBookAPI'
import { useCookies } from 'react-cookie'
import { useAlert } from "react-alert";

export default function PageCampingPacket() {
  const alert = useAlert()
  const [cookies, setCookies] = useCookies(['tvb'])
  const [activeTab, setActiveTab] = useState("camping_packets")
  const [campingList, setCampingList] = useState([])
  const [rentEquipmentList, setRentEquipmentList] = useState([])
  const [bookingParams, setBookingParams] = useState({
    date_start_wib: "",
    date_end_wib: "",
    packets: {},
    rent_equipments: {},
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

  async function execSearch() {
    GetCampingPacketList()

    GetCampingItemList()
  }

  async function GetCampingPacketList() {
    try {
      const response = await travelBookAPI.GetCampingPackets("", {})
      const body = await response.json()
      if (response.status !== 200) {
        alert.error(`Get camping packets failed: ${body.error}`)
        return
      }

      setCampingList(body.data)
    } catch (e) {

      alert.error(`Get camping packets failed: ${e.message}`)
      console.error(e)
    }
  }

  async function GetCampingItemList() {
    try {
      const response = await travelBookAPI.GetCampingItems("", {})
      const body = await response.json()
      if (response.status !== 200) {
        alert.error(`Get camping items failed: ${body.error}`)
        return
      }

      setRentEquipmentList(body.data)
    } catch (e) {

      alert.error(`Get camping items failed: ${e.message}`)
      console.error(e)
    }
  }

  async function proceedBooking() {
    var tmpBookingParams = bookingParams

    tmpBookingParams.date_start_wib = utils.FormatDateObjToDateStr(dateRange[0].startDate)
    tmpBookingParams.date_end_wib = utils.FormatDateObjToDateStr(dateRange[0].endDate)

    try {
      const response = await travelBookAPI.PostCreateBooking(cookies.tvb_at, tmpBookingParams)
      const body = await response.json()
      if (response.status !== 200) {
        alert.error(`Create booking failed: ${body.error}`)
        return
      }

      alert.success("Create booking success")

      router.push('/d/my_booking')
    } catch (e) {

      alert.error(`Create booking failed: ${e.message}`)
      console.error(e)
    }
  }

  return(
    <div className='container max-w-3xl min-h-screen mx-auto py-6'>
      <div className='p-4 mx-2 bg-[#8ac16e] rounded-lg'>
        <div className='flex justify-between'>
          <p className='text-2xl'>Pilih Tanggal Menginap</p>

          <button
            className='btn btn-sm btn-outline'
            onClick={() => execSearch()}
          ><Search size={14} /> Cari</button>
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
              <p className='flex items-center'><Tent size={16} className='mr-2' /> Paket Camping:</p>

              <div className='mt-2'>
                {Object.keys(bookingParams.packets).filter((slug) => bookingParams.packets[slug] > 0).map((slug) => (
                  <div className='flex justify-between items-center text-md mb-2'>
                    <div className='flex items-center'>
                      <Zoom>
                        <img
                          className='h-12 w-12 object-cover rounded-lg overflow-hidden mr-2 border'
                          src={campingList.filter((obj) => obj.slug === slug)[0].main_thumbnail}
                        />
                      </Zoom>
                      <span>{campingList.filter((obj) => obj.slug === slug)[0].name}</span>
                    </div>
                    <span>{bookingParams.packets[slug]}x</span>
                  </div>
                ))}
              </div>
            </div>

            <div className='mt-2'>
              <p className='flex items-center'><Axe size={16} className='mr-2' /> Sewa Perlengkapan:</p>

              <div className='mt-2'>
                {Object.keys(bookingParams.rent_equipments).filter((slug) => bookingParams.rent_equipments[slug] > 0).map((slug) => (
                  <div key={slug} className='flex justify-between items-center text-md mb-2'>
                    <div className='flex items-center'>
                      <Zoom>
                        <img
                          className='h-12 w-12 object-cover rounded-lg overflow-hidden mr-2 border'
                          src={rentEquipmentList.filter((obj) => obj.slug === slug)[0].image}
                        />
                      </Zoom>
                      <span>{rentEquipmentList.filter((obj) => obj.slug === slug)[0].name}</span>
                    </div>
                    <span>{bookingParams.rent_equipments[slug]}x</span>
                  </div>
                ))}
              </div>
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
