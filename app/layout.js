// import {Inter, Ubuntu} from "next/font/google";
import Head from "next/head";
import {doasis, inter, ubuntu} from "./components/utils/fonts";
import "./globals.css";

export const metadata = {
  title: "WTT",
  description: "Manage task and workflow of waiveer with ease.",
  // openGraph: {
  //   images: "/public/logo.png",
  // },
  // twitter: {
  //   images: "/public/logo.png",
  // },
};

export default function RootLayout({children}) {
  return (
    <html lang="en">
      <Head>
        <link
          rel="icon"
          href="/icon?<generated>"
          type="image/<generated>"
          sizes="<generated>"
        />
      </Head>
      <body className={` ${ubuntu} ${inter} ${doasis}`}>{children}</body>
    </html>
  );
}
