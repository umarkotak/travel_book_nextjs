import { Circle, FlameKindling, Minus, ParkingSquare, Plus, Search, ShowerHead, Tent, Users } from 'lucide-react'
import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import { DateRange } from 'react-date-range';
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'

export default function CampingPacketCard(props) {
  var campingPacket = props.campingPacket

  campingPacket = {
    main_thumbnail: "https://d-rajihnaturecamp.com/wp-content/uploads/2024/06/glamp.png",
    thumbnails: [
      "https://d-rajihnaturecamp.com/wp-content/uploads/2024/06/glamp.png",
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
  }

  function specsToIcon(specKey) {
    const size = 18
    if (specKey === "size") { return(<Tent size={size} />) }
    if (specKey === "pax") { return(<Users size={size} />) }
    if (specKey === "toilet") { return(<ShowerHead size={size} />) }
    if (specKey === "park") { return(<ParkingSquare size={size} />) }
    if (specKey === "bonfire") { return(<FlameKindling size={size} />) }
    return(<Circle size={size} />)
  }

  return(
    <div className='border rounded-lg flex flex-col gap-4 w-full shadow-md p-4'>
      <div className='flex w-full gap-4'>
        <div>
          <Zoom>
            <img className='w-28 md:w-40 rounded-lg' src={campingPacket.main_thumbnail} />
          </Zoom>
        </div>

        <div className='w-full'>
          <p className='text-2xl font-bold text-[#8ac16e]'>{campingPacket.name}</p>

          <p className='mt-4 text-sm md:text-md tracking-wide'>{campingPacket.description}</p>

          <div className='mt-4 flex items-center flex-wrap gap-4 text-sm md:text-md'>
            {campingPacket.specs.map((oneSpec) => (
              <span key={oneSpec.key} className='flex gap-2 items-center'>{specsToIcon(oneSpec.key)} {oneSpec.value}</span>
            ))}
          </div>

          <div className='mt-4'>
            <div className='text-sm font-bold'>Include:</div>
            <div className='mt-2 flex items-center flex-wrap gap-y-1 gap-x-2 text-sm'>
              {campingPacket.facilitates.map((oneFacilitate) => (
                <span key={oneFacilitate} className='px-2 bg-slate-100'>{oneFacilitate}</span>
              ))}
            </div>
          </div>

          <div className='mt-4 flex items-center flex-wrap gap-4 text-sm md:text-md'>
            <span className='font-bold'>Weekday: {campingPacket.weekday_price}</span>
            <span>|</span>
            <span className='font-bold'>Weekend: {campingPacket.weekend_price}</span>
          </div>
        </div>
      </div>
      <div className='flex justify-between items-center gap-4'>
        <div>
          <span>Tersisa: {campingPacket.remaining_slot}</span>
        </div>

        <div className='flex items-center gap-2'>
          <button className='btn btn-xs btn-outline'><Minus size={12} /></button>
          <label className="input input-xs input-bordered flex items-center gap-2">
            <input type="text" className="" placeholder="Jumlah"  />
          </label>
          <button className='btn btn-xs btn-outline'><Plus size={12} /></button>
        </div>
      </div>
    </div>
  )
}
