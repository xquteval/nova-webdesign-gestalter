import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Monitor, Smartphone } from "lucide-react";
import StarField from "./StarField";
import FloatingElements from "./FloatingElements";

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Star Field Background */}
      <StarField />
      <FloatingElements />
      
      {/* Overlay for content readability */}
      <div className="absolute inset-0 bg-black/30 z-10"></div>

      <div className="container mx-auto px-6 relative z-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Headline */}
          <div
            className={`transition-all duration-1000 delay-300 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <div className="flex items-center justify-center mb-6">
              <Sparkles className="w-8 h-8 text-accent-nova mr-3" />
              <span className="text-accent-nova-light font-medium text-lg">
                Ihre digitale Zukunft beginnt hier
              </span>
            </div>
            
            <h1 className="font-heading font-bold text-5xl md:text-7xl text-white mb-6 leading-tight">
              Websites erstellen
              <span className="block text-accent-nova">& hosten</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
              Professionelle Website-Erstellung mit zuverlässigem Hosting für lokale Unternehmen 
              in Wiesbaden. Alles aus einer Hand - von der Idee bis zum Live-Gang.
            </p>
          </div>

          {/* CTA Buttons */}
          <div
            className={`flex flex-col sm:flex-row gap-4 justify-center mb-12 transition-all duration-1000 delay-500 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <Button 
              size="lg" 
              className="bg-white text-primary hover:bg-white/90 hover:scale-105 transition-all duration-300 font-semibold px-8 py-4 text-lg"
              onClick={() => {
                const contactSection = document.getElementById('contact');
                contactSection?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Projekt starten
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            
            <Button 
              size="lg" 
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10 hover:scale-105 transition-all duration-300 font-semibold px-8 py-4 text-lg backdrop-blur-sm"
              onClick={() => {
                const toolsSection = document.getElementById('tools');
                toolsSection?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Tools ansehen
            </Button>
          </div>

          {/* Feature Icons */}
          <div
            className={`flex flex-wrap justify-center gap-8 transition-all duration-1000 delay-700 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <div className="flex flex-col items-center text-white/80 hover:text-white transition-colors duration-300">
              <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-2 hover:bg-white/20 transition-all duration-300">
                <Monitor className="w-8 h-8" />
              </div>
              <span className="text-sm font-medium">Responsive Design</span>
            </div>
            
            <div className="flex flex-col items-center text-white/80 hover:text-white transition-colors duration-300">
              <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-2 hover:bg-white/20 transition-all duration-300">
                <Smartphone className="w-8 h-8" />
              </div>
              <span className="text-sm font-medium">Mobile First</span>
            </div>
            
            <div className="flex flex-col items-center text-white/80 hover:text-white transition-colors duration-300">
              <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-2 hover:bg-white/20 transition-all duration-300">
                <Sparkles className="w-8 h-8" />
              </div>
              <span className="text-sm font-medium">SEO Optimiert</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;