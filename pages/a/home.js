import { HomeIcon } from "lucide-react";
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

export default function Home() {
  const alert = useAlert()
  const [cookies, setCookies] = useCookies(['tvb'])
  const [bookingSummary, setBookingSummary] = useState([])

  useEffect(() => {
    GetAdminBookingSummary()
  }, [])

  async function GetAdminBookingSummary() {
    try {
      const response = await travelBookAPI.GetAdminBookingSummary(cookies.tvb_at, {})
      const body = await response.json()
      if (response.status !== 200) {
        alert.error(`Get booking summary failed: ${body.error}`)
        return
      }

      setBookingSummary(body.data)
    } catch (e) {

      alert.error(`Get booking summary failed: ${e.message}`)
      console.error(e)
    }
  }

  return (
    <div className='container max-w-3xl min-h-screen mx-auto py-4'>
      <div className='px-2 flex items-center justify-between'>
        <span className='text-xl flex-none flex gap-2 items-center'><HomeIcon /> Home</span>

        <div className="drawer drawer-end">
        </div>
      </div>

      <div className='mt-4 px-2 grid grid-cols-4 gap-2'>
        {bookingSummary.map((oneBookingSummary) => (
          <div className="rounded-lg w-full flex flex-col p-2 shadow bg-green-100">
            <p className="text-center">{oneBookingSummary["human_status"]}</p>
            <p className="mt-4 font-bold text-2xl text-center">{oneBookingSummary["booking_count"]}</p>
            <Link href={`/a/bookings?status=${oneBookingSummary["status"]}`} className="mt-4 text-center btn btn-outline btn-sm">See Detail</Link>
          </div>
        ))}
      </div>
    </div>
  )
}
