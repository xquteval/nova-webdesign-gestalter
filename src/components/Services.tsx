import { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Palette, 
  Code, 
  Search, 
  Smartphone, 
  ShoppingCart, 
  BarChart3,
  ArrowRight,
  CheckCircle
} from "lucide-react";

const Services = () => {
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

  const services = [
    {
      icon: Palette,
      title: "Webdesign",
      description: "Modernes, responsive Design das Ihre Marke perfekt repräsentiert",
      features: ["Custom Design", "Mobile-First", "UX/UI Optimierung"],
      color: "accent-nova"
    },
    {
      icon: Code,
      title: "Webentwicklung",
      description: "Technische Umsetzung mit modernsten Technologien und Standards",
      features: ["React/Vue.js", "Performance", "Sicherheit"],
      color: "primary"
    },
    {
      icon: Search,
      title: "SEO Optimierung",
      description: "Bessere Sichtbarkeit in Google für mehr qualifizierte Leads",
      features: ["Local SEO", "Keyword Research", "Content Marketing"],
      color: "accent-nova"
    },
    {
      icon: Smartphone,
      title: "Mobile Apps",
      description: "Native und Progressive Web Apps für alle Plattformen",
      features: ["iOS & Android", "PWA", "App Store Veröffentlichung"],
      color: "primary"
    },
    {
      icon: ShoppingCart,
      title: "E-Commerce",
      description: "Professionelle Online-Shops mit allen wichtigen Features",
      features: ["WooCommerce", "Payment Integration", "Inventory Management"],
      color: "accent-nova"
    },
    {
      icon: BarChart3,
      title: "Analytics & Wartung",
      description: "Kontinuierliche Optimierung und technische Betreuung",
      features: ["Google Analytics", "Updates", "Support"],
      color: "primary"
    }
  ];

  return (
    <section
      ref={sectionRef}
      id="services"
      className="py-20 bg-white relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="grid grid-cols-12 gap-4 h-full">
            {Array.from({ length: 144 }).map((_, i) => (
              <div key={i} className="bg-primary rounded-sm"></div>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 relative">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div
            className={`text-center mb-16 transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <span className="text-accent-nova font-semibold text-lg mb-4 block">
              Unsere Leistungen
            </span>
            <h2 className="font-heading font-bold text-4xl md:text-5xl text-foreground mb-6">
              Vollumfängliche 
              <span className="text-gradient block">Digitalservices</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Von der ersten Idee bis zur erfolgreichen Website - 
              wir begleiten Sie durch den gesamten Entwicklungsprozess.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card
                key={index}
                className={`group hover-lift transition-all duration-500 delay-${index * 100} ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
              >
                <CardContent className="p-8">
                  <div className={`w-16 h-16 rounded-2xl bg-${service.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <service.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="font-heading font-semibold text-xl text-foreground mb-4">
                    {service.title}
                  </h3>
                  
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm text-muted-foreground">
                        <CheckCircle className="w-4 h-4 text-accent-nova mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    variant="outline" 
                    className="w-full group-hover:bg-primary group-hover:text-white transition-all duration-300"
                  >
                    Mehr erfahren
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* CTA Section */}
          <div
            className={`text-center mt-16 transition-all duration-1000 delay-800 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <div className="bg-gradient-subtle p-8 rounded-3xl">
              <h3 className="font-heading font-semibold text-2xl text-foreground mb-4">
                Bereit für Ihr nächstes Projekt?
              </h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Lassen Sie uns gemeinsam Ihre digitale Vision verwirklichen. 
                Kontaktieren Sie uns für eine kostenlose Erstberatung.
              </p>
              <Button size="lg" className="gradient-nova text-white hover:scale-105 transition-all duration-300">
                Kostenlose Beratung anfragen
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;