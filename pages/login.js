import { Lock, LockKeyhole, Mail, Phone, User2 } from "lucide-react";
import { useState } from "react";

export default function Login() {
  const [loginData, setLoginData] = useState({

  })
  const [registerData, setRegisterData] = useState({

  })

  return (
    <div className="min-h-screen bg-gradient-to-r from-sky-500 to-indigo-500 z-0 mt-[-70px]">
      <div className="absolute top-[90px] w-full">
        <div className="w-full max-w-sm mx-auto">
          <div className="bg-white p-4 rounded-xl divide-y divide-dashed shadow-lg">
            <div className="pb-4">
              <p className="text-xl">Login</p>

              <label className="input input-sm input-bordered flex items-center gap-2 mt-4">
                <Mail size={16} />
                <input type="text" className="grow" placeholder="Email" />
              </label>

              <label className="input input-sm input-bordered flex items-center gap-2 mt-4">
                <Lock size={16} />
                <input type="password" className="grow" placeholder="Password" />
              </label>

              <div className="flex justify-between items-center mt-4">
                <button className="btn btn-outline btn-sm">
                  Forgot Password
                </button>

                <button className="btn btn-outline btn-sm">
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
