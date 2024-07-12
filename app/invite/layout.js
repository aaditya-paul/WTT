import React, {Suspense} from "react";
import LoadingScreen from "../components/loadingScreen";

const InviteLayout = ({children}) => {
  return <Suspense fallback={<LoadingScreen />}>{children}</Suspense>;
};

export default InviteLayout;
