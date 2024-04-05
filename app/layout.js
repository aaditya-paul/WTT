// import {Inter, Ubuntu} from "next/font/google";
import {doasis, inter, ubuntu} from "./components/utils/fonts";
import "./globals.css";

export const metadata = {
  title: "WTT",
  description: "Manage task and workflow of waiveer with ease.",
};

export default function RootLayout({children}) {
  return (
    <html lang="en">
      <body className={` ${ubuntu} ${inter} ${doasis}`}>{children}</body>
    </html>
  );
}
