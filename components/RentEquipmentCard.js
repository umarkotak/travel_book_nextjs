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

  function specsToIcon(specKey) {
    const size = 18
    if (specKey === "size") { return(<Tent size={size} />) }
    if (specKey === "pax") { return(<Users size={size} />) }
    if (specKey === "toilet") { return(<ShowerHead size={size} />) }
    if (specKey === "park") { return(<ParkingSquare size={size} />) }
    if (specKey === "bonfire") { return(<FlameKindling size={size} />) }
    return(<Circle size={size} />)
  }

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
            <img className='w-20 rounded-lg' src={oneEquipment.image} />
          </Zoom>
        </div>

        <div className='w-full'>
          <div className='flex justify-between items-center'>
            <p className='text-2xl font-bold text-[#8ac16e]'>{oneEquipment.name}</p>

            <span className='font-bold'>Price: {utils.FormatMoney(oneEquipment.price)}</span>
          </div>

          {/* <div className='flex overflow-auto gap-2 mt-2'>
            {campingPacket.thumbnails.map((oneThumbnail) => (
              <div className='flex-none' key={oneThumbnail}>
                <Zoom>
                  <img src={oneThumbnail} className='h-16 w-16 object-cover rounded-lg overflow-hidden' />
                </Zoom>
              </div>
            ))}
          </div> */}

          {/* <p className='mt-4 text-sm md:text-md tracking-wide'>{campingPacket.description}</p> */}

          <div className='flex justify-between items-center gap-4'>
            <div>
              <span className='text-sm'>
                Tersisa: {oneEquipment.remaining_stock - (props.bookingParams.packets[oneEquipment.id] || 0)} / {oneEquipment.remaining_stock}
              </span>
            </div>

            <div className='flex items-center gap-2'>
              {/* <button className='btn btn-xs btn-outline'><Minus size={12} /></button> */}
              <label className="input input-sm input-bordered flex items-center gap-2">
                <input
                  type="number"
                  className=""
                  placeholder="Jumlah"
                  onChange={(e) => changeQuantity(e.target.value)}
                  // value={props.bookingParams.packets[campingPacket.slug] || 0}
                />
              </label>
              {/* <button className='btn btn-xs btn-outline'><Plus size={12} /></button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
