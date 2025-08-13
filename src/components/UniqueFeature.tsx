import { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Sparkles, 
  Zap, 
  Globe, 
  ArrowRight,
  CheckCircle2
} from "lucide-react";

const UniqueFeature = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const features = [
    {
      icon: Zap,
      title: "Blitzschnell",
      description: "99% Uptime garantiert"
    },
    {
      icon: Globe,
      title: "Modern",
      description: "Neueste Technologien"
    },
    {
      icon: CheckCircle2,
      title: "Sicher",
      description: "SSL & Backups inklusive"
    }
  ];

  return (
    <section
      ref={sectionRef}
      className="py-20 bg-gradient-to-br from-primary/5 via-white to-accent-nova/5 relative overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-1/4 w-64 h-64 bg-gradient-nova opacity-10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-1/4 w-48 h-48 bg-accent-nova opacity-10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-6 relative">
        <div className="max-w-6xl mx-auto">
          <div
            className={`transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            {/* Main Feature Card */}
            <Card className="bg-white/80 backdrop-blur-sm border-2 border-primary/20 shadow-2xl">
              <CardContent className="p-12 text-center">
                <div className="w-20 h-20 rounded-full gradient-nova flex items-center justify-center mx-auto mb-8 animate-bounce">
                  <Sparkles className="w-10 h-10 text-white" />
                </div>
                
                <h2 className="font-heading font-bold text-4xl md:text-5xl text-foreground mb-6">
                  Warum Nova WebDesign?
                </h2>
                
                <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                  Wir sind nicht nur ein Webdesign-Unternehmen. Wir sind Ihr digitaler Partner für nachhaltigen Erfolg in Wiesbaden.
                </p>

                <div className="grid md:grid-cols-3 gap-8 mb-10">
                  {features.map((feature, index) => (
                    <div 
                      key={index}
                      className={`transition-all duration-500 delay-${index * 200} ${
                        isVisible
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-4"
                      }`}
                    >
                      <div className="w-16 h-16 rounded-2xl bg-gradient-subtle flex items-center justify-center mx-auto mb-4">
                        <feature.icon className="w-8 h-8 text-primary" />
                      </div>
                      <h3 className="font-heading font-semibold text-xl text-foreground mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        {feature.description}
                      </p>
                    </div>
                  ))}
                </div>

                <Button 
                  size="lg" 
                  variant="nova"
                  className="animate-pulse"
                  onClick={() => {
                    const contactSection = document.getElementById('contact');
                    contactSection?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Jetzt durchstarten
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UniqueFeature;