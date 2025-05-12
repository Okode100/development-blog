'use client';

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Navbar from "@/components/navbar";
import NavbarAlt from "@/components/navbaralt";
import Footer from "@/components/footer";

export default function Layout({
  children,
  modal
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  const pathname = usePathname();

  // Restore scroll position when navigating
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      {pathname === "/" ? <Navbar /> : <NavbarAlt />}
      <div className="min-h-screen">
        {children}
        {modal}
      </div>
      <Footer />
    </>
  );
}
