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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Function to check token validity
    const checkToken = async () => {
      const token = localStorage.getItem("token");

      // If no token found, redirect to login
      if (!token) {
        router.push("/");
        return;
      }

      // Call the API to validate the token
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/check-token`, {
            method: "GET",
            headers: {
              "Authorization": token,
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();

        // If token is valid, update state
        if (data.success) {
          setIsAuthenticated(true);
        } else {
          // If invalid token, redirect to login
          router.push("/");
        }
      } catch (error) {
        console.error("Failed to validate token", error);
        router.push("/");
      }
    };

    checkToken();
  }, [router]);

  // Render nothing or a loader if token validation is in progress
  if (!isAuthenticated) {
    return <div>Loading...</div>;
  }

  // Render layout and children once authenticated
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Sidebar>
          <div>
            <Toaster richColors position="top-center" />
            {children}
          </div>
        </Sidebar>
      </body>
    </html>
  );
}
