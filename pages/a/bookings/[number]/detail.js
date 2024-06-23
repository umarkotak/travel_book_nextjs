import { Axe, Check, EyeIcon, FlameKindling, Minus, ParkingSquare, Plus, Receipt, Search, ShoppingCart, ShowerHead, Tent, Users, X } from 'lucide-react'
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

export default function BookingDetail() {
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
      const response = await travelBookAPI.GetAdminBookingDetail(cookies.tvb_at, {
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

  async function BookingAction(action) {
    if (!confirm("Apakah anda yakin untuk melakukan ini?")) { return }

    try {
      const response = await travelBookAPI.PostBookingAction(cookies.tvb_at, {
        booking_number: pathParams.number,
        action: action
      })
      const body = await response.json()
      if (response.status !== 200) {
        alert.error(`Update booking failed: ${body.error}`)
        return
      }

      alert.success(`Update booking successfull`)

      window.location.reload()
    } catch (e) {

      alert.error(`Update booking failed: ${e.message}`)
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
              <span>Detail</span>

              {bookingDetail.booking_details.map((oneBookingDetail) => (
                <div key={oneBookingDetail.id} className='flex items-center justify-between border-b pb-2'>
                  <div className='flex items-center gap-2'>
                    <img src={oneBookingDetail.image} className='h-12 w-12 rounded-lg border' />
                    <div className='flex flex-col'>
                      <span className='text-sm'>{oneBookingDetail.quantity}x | {oneBookingDetail.name}</span>
                      <span className='text-xs flex items-center'>
                        {oneBookingDetail.weekday_quantity > 0 && <span>
                          weekday: {utils.FormatMoney(oneBookingDetail.weekday_price)} x {oneBookingDetail.weekday_quantity}
                        </span>}
                        <span className='mx-1'>|</span>
                        {oneBookingDetail.item_type === "camping_packet" && oneBookingDetail.weekend_quantity > 0 && <span>
                          weekend: {utils.FormatMoney(oneBookingDetail.weekend_price)} x {oneBookingDetail.weekend_quantity}
                        </span>}
                        {oneBookingDetail.item_type === "camping_item" && <span>
                          price: {utils.FormatMoney(oneBookingDetail.weekend_price)}
                        </span>}
                      </span>
                    </div>
                  </div>
                  <div className='flex flex-col gap-1 text-right'>
                    <span className='text-sm'>{utils.FormatMoney(oneBookingDetail.total_price)}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className='flex justify-end'>
              <div className='flex flex-col text-right mt-6 gap-2'>
                <div className='flex justify-end gap-4'>
                  <span>Total Harga:</span>
                  <span>{utils.FormatMoney(bookingDetail.total_price)}</span>
                </div>
                <div className='flex justify-end gap-2'>
                  {bookingDetail.status === "initialized" && <>
                    <button className='btn btn-sm btn-outline btn-error' onClick={()=>BookingAction("rejected")}><X /> Tolak</button>
                    <button className='btn btn-sm btn-outline' onClick={()=>BookingAction("accepted")}><Check /> Konfirmasi</button>
                  </>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
