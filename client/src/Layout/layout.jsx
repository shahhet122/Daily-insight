import { children } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";


const Layout = ({ children }) => {
  return (
    <div>
      {/* NAVBAR */}
      <NavBar />
      {/* main body */}
      <section>
        <div className="main-body">{children}</div>
      </section>
      {/* footer */}
      <Footer />
    </div>
  );
};

export default Layout;
