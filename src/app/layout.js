"use client";
import { useRef, useState } from "react";
import Sidebar from "@/components/sidebar";
import "./globals.css";
import { Provider } from "react-redux";
import { makeStore } from "../../store/store";

export default function RootLayout({ children }) {
  const [isOpen, setIsOpen] = useState(true);
  const storeRef = useRef();
  if (!storeRef.current) {
    storeRef.current = makeStore()
  }
  return (
    <html lang="en">
      <body>
        <Provider store={storeRef.current}>
          <div className="p-6 bg-white">
            <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
            <div
              className={`transition-all duration-300 ${
                isOpen ? "md:pl-[288px]" : "pl-0"
              }`}>
              {children}
            </div>
          </div>
        </Provider>
      </body>
    </html>
  );
}
