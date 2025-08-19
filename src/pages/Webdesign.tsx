import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Palette, 
  CheckCircle, 
  Monitor, 
  Smartphone, 
  Users, 
  Zap,
  ArrowRight 
} from "lucide-react";

const Webdesign = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const features = [
    "Individuelles, maßgeschneidertes Design",
    "Mobile-First Responsive Design",
    "Moderne UI/UX Prinzipien",
    "Barrierefreie Gestaltung",
    "Cross-Browser Kompatibilität",
    "Optimierte Ladezeiten"
  ];

  const benefits = [
    {
      icon: Monitor,
      title: "Responsive auf allen Geräten",
      description: "Perfekte Darstellung auf Desktop, Tablet und Smartphone"
    },
    {
      icon: Users,
      title: "Nutzerfreundliche Bedienung",
      description: "Intuitive Navigation und optimale User Experience"
    },
    {
      icon: Zap,
      title: "Schnelle Ladezeiten",
      description: "Optimierte Performance für bessere SEO-Rankings"
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
                <Palette className="w-12 h-12 text-accent-nova-light mr-4" />
                <span className="text-accent-nova-light font-medium text-xl">
                  Professionelles Webdesign
                </span>
              </div>
              
              <h1 className="font-heading font-bold text-5xl md:text-6xl mb-6">
                Webdesign
                <span className="block text-accent-nova">das begeistert</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
                Modernes, responsive Design das Ihre Marke perfekt repräsentiert und 
                Ihre Besucher zu Kunden macht.
              </p>
              
              <Button 
                size="lg" 
                className="bg-white text-primary hover:bg-white/90 px-8 py-4 text-lg"
                onClick={() => {
                  const contactSection = document.getElementById('contact');
                  contactSection?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Jetzt Beratung anfragen
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-heading font-bold text-4xl md:text-5xl text-foreground mb-6">
                Was Sie erhalten
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Unser Webdesign-Service umfasst alle Aspekte einer modernen, 
                professionellen Website.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-16">
              <div>
                <h3 className="font-heading font-semibold text-2xl text-foreground mb-6">
                  Unsere Design-Features
                </h3>
                <ul className="space-y-4">
                  {features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="w-6 h-6 text-accent-nova mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="grid gap-6">
                {benefits.map((benefit, index) => (
                  <Card key={index} className="hover-lift">
                    <CardContent className="p-6">
                      <div className="flex items-start">
                        <div className="w-12 h-12 rounded-xl bg-accent-nova flex items-center justify-center mr-4 flex-shrink-0">
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
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-subtle">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-6">
              Bereit für Ihr neues Webdesign?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Lassen Sie uns gemeinsam ein Design entwickeln, das Ihre Marke 
              perfekt repräsentiert und Ihre Zielgruppe begeistert.
            </p>
            <Button 
              size="lg" 
              variant="nova"
              onClick={() => {
                const contactSection = document.getElementById('contact');
                contactSection?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Kostenloses Erstgespräch vereinbaren
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      <div id="contact">
        <Footer />
      </div>
    </div>
  );
};

export default Webdesign;