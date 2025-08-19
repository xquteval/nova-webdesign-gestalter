import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Code, 
  CheckCircle, 
  Shield, 
  Zap, 
  Smartphone, 
  Search,
  ArrowRight 
} from "lucide-react";

const Webentwicklung = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const technologies = [
    "React / Vue.js für moderne Frontend-Entwicklung",
    "TypeScript für typsichere Programmierung",
    "Responsive CSS mit Tailwind",
    "Node.js Backend-Entwicklung",
    "REST API & GraphQL Integration",
    "Progressive Web App (PWA) Features"
  ];

  const benefits = [
    {
      icon: Zap,
      title: "Höchste Performance",
      description: "Optimierte Ladezeiten und reibungslose Benutzererfahrung"
    },
    {
      icon: Shield,
      title: "Maximale Sicherheit",
      description: "Moderne Sicherheitsstandards und regelmäßige Updates"
    },
    {
      icon: Search,
      title: "SEO-Optimiert",
      description: "Technische SEO-Grundlagen für bessere Suchmaschinen-Rankings"
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-20 bg-gradient-to-br from-primary via-primary-dark to-accent-nova text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div
              className={`transition-all duration-1000 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <div className="flex items-center justify-center mb-6">
                <Code className="w-12 h-12 text-accent-nova-light mr-4" />
                <span className="text-accent-nova-light font-medium text-xl">
                  Moderne Webentwicklung
                </span>
              </div>
              
              <h1 className="font-heading font-bold text-5xl md:text-6xl mb-6">
                Webentwicklung
                <span className="block text-accent-nova">mit modernsten Standards</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
                Technische Umsetzung mit modernsten Technologien, höchster Performance 
                und maximaler Sicherheit für Ihr digitales Projekt.
              </p>
              
              <Button 
                size="lg" 
                className="bg-white text-primary hover:bg-white/90 px-8 py-4 text-lg"
              onClick={() => {
                window.location.href = '/#contact';
              }}
              >
                Technische Beratung anfragen
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-heading font-bold text-4xl md:text-5xl text-foreground mb-6">
                Moderne Technologien
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Wir verwenden die neuesten Technologien und Best Practices für 
                zukunftssichere Webanwendungen.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-16">
              <div>
                <h3 className="font-heading font-semibold text-2xl text-foreground mb-6">
                  Unsere Tech-Stack
                </h3>
                <ul className="space-y-4">
                  {technologies.map((tech, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="w-6 h-6 text-accent-nova mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{tech}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="grid gap-6">
                {benefits.map((benefit, index) => (
                  <Card key={index} className="hover-lift">
                    <CardContent className="p-6">
                      <div className="flex items-start">
                        <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center mr-4 flex-shrink-0">
                          <benefit.icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-lg text-foreground mb-2">
                            {benefit.title}
                          </h4>
                          <p className="text-muted-foreground">
                            {benefit.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Development Process */}
            <div className="bg-gradient-subtle p-8 rounded-2xl">
              <h3 className="font-heading font-semibold text-2xl text-foreground mb-6 text-center">
                Unser Entwicklungsprozess
              </h3>
              <div className="grid md:grid-cols-4 gap-6">
                {[
                  { step: "1", title: "Planung", desc: "Anforderungsanalyse und Konzeption" },
                  { step: "2", title: "Entwicklung", desc: "Agile Entwicklung mit regelmäßigen Updates" },
                  { step: "3", title: "Testing", desc: "Umfangreiche Tests und Qualitätssicherung" },
                  { step: "4", title: "Launch", desc: "Deployment und kontinuierliche Betreuung" }
                ].map((process, index) => (
                  <div key={index} className="text-center">
                    <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg mx-auto mb-4">
                      {process.step}
                    </div>
                    <h4 className="font-semibold text-foreground mb-2">{process.title}</h4>
                    <p className="text-sm text-muted-foreground">{process.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-subtle">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-6">
              Bereit für moderne Webentwicklung?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Lassen Sie uns Ihr Projekt mit den neuesten Technologien und 
              höchsten Standards umsetzen.
            </p>
            <Button 
              size="lg" 
              variant="nova"
              onClick={() => {
                window.location.href = '/#contact';
              }}
            >
              Technisches Gespräch vereinbaren
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Webentwicklung;