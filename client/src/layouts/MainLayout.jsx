import { useEffect } from "react";
import { useDispatch } from "react-redux"
import NavigationBar from "../components/NavigationBar";
import Cart from "../components/Cart";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";

const MainLayout = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        // dispatch()
    })
  return (
    <>
      <NavigationBar />
      <Cart />
      <Outlet />
      <Footer />
    </>
  )
}

export default MainLayout
