import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import UniqueFeature from "@/components/UniqueFeature";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <Services />
      <UniqueFeature />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
