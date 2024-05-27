// import {Inter, Ubuntu} from "next/font/google";
import Head from "next/head";
import {Inter,Ubuntu,Dosis} from "next/font/google"
const inter_init = Inter({subsets: ["latin"], variable: "--font-inter"});
const ubuntu_init = Ubuntu({
  subsets: ["latin"],
  weight: ["500", "300", "400", "700"],
  variable: "--font-ubuntu",
});

const dosis_init = Dosis({
  subsets: ["latin"],
  weight: ["300", "200", "400", "500", "600", "700", "800"],
  variable: "--font-doasis",
});
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
      <body
        className={` ${ubuntu_init.variable} ${inter_init.variable} ${dosis_init} `}
      >
        <div className=""> {children}</div>
      </body>
    </html>
  );
}
