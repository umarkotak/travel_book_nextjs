import AdminLayout from "@/components/AdminLayout";
import LandingLayout from "@/components/LandingLayout";
import UserLayout from "@/components/UserLayout";
import "@/styles/globals.css";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function App({ Component, pageProps }) {
  const [layoutMode, setLayoutMode] = useState("LandingLayout")
  const pathName = usePathname()

  useEffect(() => {
    if (!pathName) { return }

    if (pathName.includes("/d/")) { setLayoutMode("UserLayout") }
    else if (pathName.includes("/a/")) { setLayoutMode("AdminLayout") }
    else { setLayoutMode("LandingLayout") }
  }, [pathName])

  return (
    <>
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
    </>
  )
}
