import React, { useEffect, Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

// Components (Eager Load)
import Navbar from "Components/Navbar/Navbar";
import Footer from "Components/Footer/Footer";

// Pages (Lazy Load)
const Home = lazy(() => import("Pages/Home/Home"));
const Contact = lazy(() => import("Pages/Contact/Contact"));
const NotFound = lazy(() => import("Pages/NotFound/NotFound"));

function App() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const Loading = () => (
    <div className="min-h-screen flex items-center justify-center">Loading...</div>
  );

  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </>
  );
}

export default App;