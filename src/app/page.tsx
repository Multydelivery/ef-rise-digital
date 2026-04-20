import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Services from "../components/Services";
import Work from "../components/Work";
import Pricing from "../components/Pricing";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-amber-50 overflow-x-hidden">
      <Navbar />
      <Hero />
      <Services />
      <Work />
      <Pricing />
      <Contact />
      <Footer />
    </main>
  );
}
