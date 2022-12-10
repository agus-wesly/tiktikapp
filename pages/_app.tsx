import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Sidebar from "../components/Sidebar";

const myApp = ({ Component, pageProps }: AppProps) => {
  const [isSSr, setIsSSr] = useState(true);

  useEffect(() => {
    setIsSSr(false);
  }, []);

  if (isSSr) return null;

  return (
    <div className="xl:px-12 overflow-hidden max-h-screen">
      <GoogleOAuthProvider clientId={`${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}`}>
        <Navbar />
        <div className="flex">
          <Sidebar />
          <div className="flex-1 xl:py-7 px-3 overflow-y-scroll h-[90vh]">
            <Component {...pageProps} />
          </div>
        </div>
      </GoogleOAuthProvider>
    </div>
  );
};

export default myApp;
