import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Tools from "@/components/Tools";
import Showcase from "@/components/Showcase";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <About />
      <Services />
      <Tools />
      <Showcase />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
