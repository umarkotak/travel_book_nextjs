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
  const [bookingDetail, setBookingDetail] = useState({
    booking_details: [],
  })
  const pathParams = useParams()

  useEffect(() => {
    GetMyBookingDetail()
  }, [pathParams])

  async function GetMyBookingDetail() {
    if (!pathParams || !pathParams.number || pathParams.number === "") { return }

    try {
      const response = await travelBookAPI.GetMyBookingDetail(cookies.tvb_at, {
        booking_number: pathParams.number,
      })
      const body = await response.json()
      if (response.status !== 200) {
        alert.error(`Get booking detail failed: ${body.error}`)
        return
      }

      setBookingDetail(body.data)
    } catch (e) {

      alert.error(`Get booking detail failed: ${e.message}`)
      console.error(e)
    }
  }

  return (
    <div className='container max-w-3xl min-h-screen mx-auto py-4'>
      <div className='flex flex-col gap-4 px-2 mt-4'>
        <div key={bookingDetail.number} className='border rounded-lg flex flex-col gap-4 w-full shadow-md p-4'>
          <div className='flex flex-col gap-4'>
            <div className='flex text-xs md:text-md items-center justify-between'>
              <div className='flex items-center gap-2'>
                <Tent size={18} />
                <span>Paket Camping</span>
              </div>
              <span className='px-2 py-1 bg-[#dcecd3]'>{bookingDetail.human_status}</span>
            </div>
            <div className='text-xs'>
              <span>No:</span>
              <span className='ml-2'>{bookingDetail.number}</span>
            </div>
            <div className='text-xs'>
              ({bookingDetail.num_nights} nights) | {utils.FormatDate(bookingDetail.started_at)} - {utils.FormatDate(bookingDetail.ended_at)}
            </div>
            <div className='flex flex-col gap-2'>
              {bookingDetail.booking_details.map((oneBookingDetail) => (
                <div key={oneBookingDetail.id} className='flex items-center justify-between'>
                  <div className='flex items-center gap-2'>
                    <img src={oneBookingDetail.image} className='h-12 w-12 rounded-lg' />
                    <div className='flex flex-col'>
                      <span className='text-sm'>{oneBookingDetail.quantity}x | {oneBookingDetail.name}</span>
                      <span className='text-xs flex items-center'>
                        <span>
                          weekday: {utils.FormatMoney(oneBookingDetail.weekday_price)} x {oneBookingDetail.weekday_quantity}
                        </span>
                        <span className='mx-1'>|</span>
                        <span>
                          weekend: {utils.FormatMoney(oneBookingDetail.weekend_price)} x {oneBookingDetail.weekend_quantity}
                        </span>
                      </span>
                    </div>
                  </div>
                  <div className='flex flex-col gap-1 text-right'>
                    <span className='text-xs'>Total Harga</span>
                    <span className='text-sm'>{utils.FormatMoney(oneBookingDetail.total_price)}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className='flex justify-end'>
              <div className='flex flex-col text-right'>
                <div className='flex gap-4'>
                  <span>Total Harga</span>
                  <span>{utils.FormatMoney(bookingDetail.total_price)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
