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

export const inter = inter_init.variable;
export const ubuntu = ubuntu_init.variable;
export const doasis = dosis_init.variable;

// add to tailwind config
// add to _layout
