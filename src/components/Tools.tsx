import { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Globe, 
  Search, 
  ArrowRight,
  Zap,
  Shield,
  BarChart3
} from "lucide-react";
import DomainChecker from "./DomainChecker";
import SEOChecker from "./SEOChecker";

type ActiveTool = null | 'domain' | 'seo';

const Tools = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTool, setActiveTool] = useState<ActiveTool>(null);
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

  const tools = [
    {
      id: 'domain' as const,
      icon: Globe,
      title: "Domain-Checker",
      description: "Prüfen Sie die Verfügbarkeit und Details von Domains",
      features: ["Verfügbarkeitsprüfung", "Registrar-Info", "Expiry-Datum"],
      color: "primary"
    },
    {
      id: 'seo' as const,
      icon: Search,
      title: "SEO-Analyzer",
      description: "Analysieren Sie die SEO-Performance Ihrer Website",
      features: ["Performance-Check", "Meta-Tags", "Mobile-Test"],
      color: "accent-nova"
    }
  ];

  if (activeTool === 'domain') {
    return (
      <section id="tools" className="py-20 bg-gradient-subtle">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <Button
                variant="outline"
                onClick={() => setActiveTool(null)}
                className="mb-4"
              >
                ← Zurück zu Tools
              </Button>
            </div>
            <DomainChecker />
          </div>
        </div>
      </section>
    );
  }

  if (activeTool === 'seo') {
    return (
      <section id="tools" className="py-20 bg-gradient-subtle">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <Button
                variant="outline"
                onClick={() => setActiveTool(null)}
                className="mb-4"
              >
                ← Zurück zu Tools
              </Button>
            </div>
            <SEOChecker />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      id="tools"
      className="py-20 bg-gradient-subtle relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="grid grid-cols-12 gap-4 h-full">
            {Array.from({ length: 144 }).map((_, i) => (
              <div key={i} className="bg-accent-nova rounded-sm"></div>
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
            <span className="text-primary font-semibold text-lg mb-4 block">
              Kostenlose Tools
            </span>
            <h2 className="font-heading font-bold text-4xl md:text-5xl text-foreground mb-6">
              Professionelle
              <span className="text-gradient block">Web-Tools</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Nutzen Sie unsere kostenlosen Tools zur Analyse Ihrer Website 
              und entdecken Sie Optimierungspotentiale.
            </p>
          </div>

          {/* Tools Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {tools.map((tool, index) => (
              <Card
                key={tool.id}
                className={`group hover-lift transition-all duration-500 delay-${index * 100} ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
              >
                <CardContent className="p-8">
                  <div className={`w-16 h-16 rounded-2xl bg-${tool.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <tool.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="font-heading font-semibold text-xl text-foreground mb-4">
                    {tool.title}
                  </h3>
                  
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {tool.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {tool.features.map((feature, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                  
                  <Button 
                    variant="nova"
                    className="w-full"
                    onClick={() => setActiveTool(tool.id)}
                  >
                    Tool öffnen
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Features Section */}
          <div
            className={`grid md:grid-cols-3 gap-8 transition-all duration-1000 delay-600 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <h4 className="font-semibold text-foreground mb-2">Schnell & Präzise</h4>
              <p className="text-sm text-muted-foreground">
                Erhalten Sie in Sekunden detaillierte Analysen Ihrer Website
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <h4 className="font-semibold text-foreground mb-2">100% Kostenlos</h4>
              <p className="text-sm text-muted-foreground">
                Alle Tools sind vollständig kostenlos und ohne Anmeldung nutzbar
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="w-6 h-6 text-primary" />
              </div>
              <h4 className="font-semibold text-foreground mb-2">Professionell</h4>
              <p className="text-sm text-muted-foreground">
                Entwickelt mit derselben Technologie, die wir für Kunden nutzen
              </p>
            </div>
          </div>

          {/* CTA Section */}
          <div
            className={`text-center mt-16 transition-all duration-1000 delay-800 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <div className="bg-white/60 backdrop-blur-sm p-8 rounded-3xl border border-primary/20">
              <h3 className="font-heading font-semibold text-2xl text-foreground mb-4">
                Professionelle Website gewünscht?
              </h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Nach der Analyse wissen Sie, was optimiert werden kann. 
                Lassen Sie uns gemeinsam eine perfekte Website erstellen.
              </p>
              <Button 
                size="lg" 
                variant="nova"
                onClick={() => {
                  const contactSection = document.getElementById('contact');
                  contactSection?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Website-Projekt starten
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Tools;