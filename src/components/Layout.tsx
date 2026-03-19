import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const Layout = () => {
  return (
    <section className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 p-3 flex">
        <Outlet />
      </main>
      <Footer />
    </section>
  );
};
export default Layout;
