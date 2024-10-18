"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import localFont from "next/font/local";
import "../globals.css";
import { Toaster } from "sonner";
import Sidebar from "@/components/Sidenav";

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        router.push("/"); // Redirect to login if no token is found
        return;
      }

      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/check-token`, {
          method: "GET",
          headers: {
            "Authorization": token,
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();

        if (data.success) {
          setIsAuthenticated(true); // Set auth state to true if token is valid
        } else {
          router.push("/"); // Redirect to login if token is invalid
        }
      } catch (error) {
        console.error("Failed to validate token", error);
        router.push("/");
      }
    };

    checkToken();
  }, [router]);

  if (!isAuthenticated) {
    return <div>Loading...</div>; // Display a loading state while checking token
  }

  return (
    <div className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <Sidebar>
        <div>
          <Toaster richColors position="top-center" />
          {children}
        </div>
      </Sidebar>
    </div>
  );
}
