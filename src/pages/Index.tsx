import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import UniqueFeature from "@/components/UniqueFeature";
import Tools from "@/components/Tools";
import Showcase from "@/components/Showcase";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <About />
      <Services />
      <UniqueFeature />
      <Tools />
      <Showcase />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
