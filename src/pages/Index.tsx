import { motion } from "framer-motion";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Process from "@/components/Process";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

const Index = () => {
  return (
    <motion.div 
      className="min-h-screen bg-background"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.3 }}
    >
      <SEO page="home" />
      <Header />
      <main>
        <div className="hero-gradient">
          <Hero />
          <Services />
        </div>
        <Process />
        <Pricing />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </motion.div>
  );
};

export default Index;
