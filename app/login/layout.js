import React, {Suspense} from "react";
import LoadingScreen from "../components/loadingScreen";
import {Inter, Ubuntu, Dosis} from "next/font/google";
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

const LoginLayout = ({children}) => {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <div>{children}</div>
    </Suspense>
  );
};

export default LoginLayout;
