import React from "react";
import AppContent from "../component/AppContent/AppContent";
import AppHeader from "../component/AppHeader/AppHeader";
//import AppSidebar from '../component/AppSidebar/AppSidebar'
//import AppFooter from '../component/AppFooter/AppFooter'

function DefaultLayout() {
  return (
    <div className="wrapper d-flex flex-column min-vh-100 bg-light">
      <AppHeader />
      <div className="bg-[#FBF9F6] inline-flex my-0 mx-auto">
        {/* <AppSidebar /> */}
        <div className="w-full">
          <AppContent />
        </div>
      </div>
      {/* <AppFooter /> */}
    </div>
  );
}

export default DefaultLayout;
