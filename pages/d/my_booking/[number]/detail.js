import { Axe, Check, EyeIcon, FlameKindling, Minus, ParkingSquare, Plus, Receipt, Search, ShoppingCart, ShowerHead, Tent, Users } from 'lucide-react'
import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import { DateRange } from 'react-date-range'
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import utils from '@/commons/Utils'
import travelBookAPI from '@/commons/TravelBookAPI'
import { useCookies } from 'react-cookie'
import { useAlert } from "react-alert"

export default function MyBooking() {
  const alert = useAlert()
  const [cookies, setCookies] = useCookies(['tvb'])
  const [bookingList, setBookingList] = useState([])

  useEffect(() => {
    GetMyBookingList()
  }, [])

  async function GetMyBookingList() {
    try {
      const response = await travelBookAPI.GetMyBookingList(cookies.tvb_at, {})
      const body = await response.json()
      if (response.status !== 200) {
        alert.error(`Get booking list failed: ${body.error}`)
        return
      }

      setBookingList(body.data)
    } catch (e) {

      alert.error(`Get booking list failed: ${e.message}`)
      console.error(e)
    }
  }

  return (
    <div className='container max-w-3xl min-h-screen mx-auto py-6'>
      <div className='flex flex-col gap-4 px-2 mt-4'>
        {bookingList.map((oneBooking) => (
          <div key={oneBooking.number} className='border rounded-lg flex flex-col gap-4 w-full shadow-md p-4'>
            <div className='flex flex-col gap-4'>
              <div className='flex text-xs md:text-md items-center gap-2 md:gap-4'>
                <Tent size={18} />
                <span>Paket Camping</span>
                <span>{utils.FormatDate(oneBooking.started_at)} - {utils.FormatDate(oneBooking.ended_at)}</span>
                <span>({oneBooking.num_nights} nights)</span>
              </div>
              <div className='text-xs'>
                <span>No:</span>
                <span className='ml-2'>{oneBooking.number}</span>
              </div>
              <div className='text-xs'>
                <span className='px-1 bg-[#dcecd3]'>{oneBooking.status}</span>
              </div>
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                  <img src={"https://d-rajihnaturecamp.com/wp-content/uploads/2024/06/glamp.png"} className='h-20 w-20 rounded-lg' />
                  <div className='flex flex-col'>
                    <span className='text-xl'>Temporary stuff here</span>
                    <span className='text-xs'>Another stuff here</span>
                  </div>
                </div>
                <div className='flex flex-col gap-1'>
                  <span className='text-xs'>Total Harga</span>
                  <span>{utils.FormatMoney(oneBooking.grand_total_price)}</span>
                </div>
              </div>
              <div className='flex items-center justify-end'>
                <Link href={`/d/my_booking/`} className='font-bold text-[#355524] flex items-center gap-1'><EyeIcon size={18} /> Lihat Detail</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
