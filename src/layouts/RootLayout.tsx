import Header from "../components/Header";
import Footer from "../components/Footer";
import { Outlet } from "react-router";

export default function RootLayout() {
  return (
    <div className="w-full mx-auto px-4 max-w-full sm:max-w-[640px] md:max-w-[768px] lg:max-w-[1024px]">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}
