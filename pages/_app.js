import AdminLayout from "@/components/AdminLayout";
import Footer from "@/components/Footer";
import LandingLayout from "@/components/LandingLayout";
import UserLayout from "@/components/UserLayout";
import "@/styles/globals.css";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'

export default function App({ Component, pageProps }) {
  const [layoutMode, setLayoutMode] = useState("LandingLayout")
  const pathName = usePathname()

  useEffect(() => {
    if (!pathName) { return }

    if (pathName.includes("/d/")) { setLayoutMode("UserLayout") }
    else if (pathName.includes("/a/")) { setLayoutMode("AdminLayout") }
    else { setLayoutMode("LandingLayout") }
  }, [pathName])

  const options = {
    position: positions.BOTTOM_RIGHT,
    transition: transitions.FADE,
    timeout: 5000,
  }

  return (
    <>
      <AlertProvider template={AlertTemplate} {...options}>
        {
          layoutMode === "LandingLayout" &&
          <LandingLayout>
            <Component {...pageProps} />
          </LandingLayout>
        }
        {
          layoutMode === "UserLayout" &&
          <UserLayout>
            <Component {...pageProps} />
          </UserLayout>
        }
        {
          layoutMode === "AdminLayout" &&
          <AdminLayout>
            <Component {...pageProps} />
          </AdminLayout>
        }

        <Footer />
      </AlertProvider>
    </>
  )
}
