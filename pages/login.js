import travelBookAPI from "@/commons/TravelBookAPI";
import { Lock, LockKeyhole, Mail, Phone, User2 } from "lucide-react";
import { useRouter } from "next/router";
import { useState } from "react";
import { useAlert } from "react-alert";
import { useCookies } from 'react-cookie'

export default function Login() {
  const alert = useAlert()
  const router = useRouter()
  const [cookies, setCookies] = useCookies(['tvb'])

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  })
  const [registerData, setRegisterData] = useState({

  })

  async function Login() {
    try {
      const response = await travelBookAPI.PostLogin(loginData)
      const body = await response.json()
      if (response.status !== 200) {
        alert.error(`Login failed: ${body.error}`)
        return
      }

      alert.success("Login success")
      setCookies("tvb_at", body.data.session, {path: "/"})
      setCookies("tvb_rl", body.data.role, {path: "/"})
      setCookies("tvb_nm", body.data.name, {path: "/"})
      setCookies("tvb_em", body.data.email, {path: "/"})

      router.push('/d/home')
    } catch (e) {

      alert.error(`Login failed: ${e.message}`)
      console.error(e)
    }
  }

  async function Register() {

  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-sky-500 to-indigo-500 z-0 mt-[-70px]">
      <div className="absolute top-[90px] w-full">
        <div className="w-full max-w-sm mx-auto">
          <div className="bg-white p-4 rounded-xl divide-y divide-dashed shadow-lg">
            <div className="pb-4">
              <p className="text-xl">Login</p>

              <label className="input input-sm input-bordered flex items-center gap-2 mt-4">
                <Mail size={16} />
                <input type="text" className="grow" placeholder="Email" value={loginData.email} onChange={(e)=>setLoginData({...loginData, "email": e.target.value})} />
              </label>

              <label className="input input-sm input-bordered flex items-center gap-2 mt-4">
                <Lock size={16} />
                <input type="password" className="grow" placeholder="Password" value={loginData.password} onChange={(e)=>setLoginData({...loginData, "password": e.target.value})} />
              </label>

              <div className="flex justify-between items-center mt-4">
                <button className="btn btn-outline btn-sm">
                  Forgot Password
                </button>

                <button className="btn btn-outline btn-sm" onClick={()=>Login()}>
                  Login
                </button>
              </div>
            </div>

            <div className="pt-4">
              <p className="text-xl">Register</p>

              <label className="input input-sm input-bordered flex items-center gap-2 mt-4">
                <User2 size={16} />
                <input type="text" className="grow" placeholder="Name" />
              </label>

              <label className="input input-sm input-bordered flex items-center gap-2 mt-4">
                <Mail size={16} />
                <input type="text" className="grow" placeholder="Email" />
              </label>

              <label className="input input-sm input-bordered flex items-center gap-2 mt-4">
                <Phone size={16} />
                <input type="text" className="grow" placeholder="Phone" />
              </label>

              <label className="input input-sm input-bordered flex items-center gap-2 mt-4">
                <Lock size={16} />
                <input type="password" className="grow" placeholder="Password" />
              </label>

              <label className="input input-sm input-bordered flex items-center gap-2 mt-4">
                <LockKeyhole size={16} />
                <input type="password" className="grow" placeholder="Password Confirmation" />
              </label>

              <div className="flex justify-end items-center mt-4">
                <button className="btn btn-outline btn-sm">
                  Register
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
