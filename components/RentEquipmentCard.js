import { Circle, FlameKindling, Minus, ParkingSquare, Plus, Search, ShowerHead, Tent, Users } from 'lucide-react'
import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import { DateRange } from 'react-date-range';
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import utils from '@/commons/Utils'

export default function RentEquipmentCard(props) {
  var oneEquipment = props.oneEquipment

  function changeQuantity(val) {
    // var finalVal = parseInt(val) || 0
    // if (finalVal < 0) { finalVal = 0 }
    // if (finalVal > campingPacket.remaining_slot) { finalVal = campingPacket.remaining_slot }

    // var tmpPackets = props.bookingParams.packets
    // tmpPackets[campingPacket.slug] = finalVal

    // props.setBookingParams({
    //   ...props.bookingParams,
    //   packets: tmpPackets,
    // })
  }

  return(
    <div className='border rounded-lg flex flex-col gap-4 w-full shadow-md p-4'>
      <div className='flex w-full gap-4'>
        <div>
          <Zoom>
            <img className='w-20 rounded-lg border' src={oneEquipment.image} />
          </Zoom>
        </div>

        <div className='w-full'>
          <div className='flex justify-between items-center'>
            <p className='text-2xl text-[#8ac16e]'>{oneEquipment.name}</p>

            <span className='text-md'>Price: {utils.FormatMoney(oneEquipment.price)}</span>
          </div>

          <div className='flex justify-between items-center gap-4'>
            <div>
              <span className='text-sm'>
                Tersisa: {oneEquipment.remaining_stock - (props.bookingParams.packets[oneEquipment.id] || 0)} / {oneEquipment.remaining_stock}
              </span>
            </div>

            <div className='flex items-center gap-2'>
              <label className="input input-sm input-bordered flex items-center gap-2">
                <input
                  type="number"
                  className=""
                  placeholder="Jumlah"
                  onChange={(e) => changeQuantity(e.target.value)}
                  // value={props.bookingParams.packets[campingPacket.slug] || 0}
                />
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
