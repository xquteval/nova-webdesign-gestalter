import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  BarChart3, 
  CheckCircle, 
  Shield, 
  Clock, 
  HardDrive, 
  Zap,
  ArrowRight,
  Server
} from "lucide-react";

const WebHosting = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const features = [
    "99.9% Uptime Garantie",
    "SSL-Zertifikate inklusive",
    "Tägliche automatische Backups",
    "DDoS-Schutz und Firewall",
    "24/7 Monitoring und Support",
    "CDN für weltweite Performance"
  ];

  const benefits = [
    {
      icon: Clock,
      title: "99.9% Uptime",
      description: "Zuverlässige Verfügbarkeit rund um die Uhr"
    },
    {
      icon: Shield,
      title: "Maximale Sicherheit",
      description: "SSL-Verschlüsselung und moderne Sicherheitsmaßnahmen"
    },
    {
      icon: Zap,
      title: "Blitzschnell",
      description: "Optimierte Server für beste Performance"
    }
  ];

  const packages = [
    {
      name: "Starter",
      price: "9,99€",
      period: "/Monat",
      features: [
        "5 GB SSD Speicher",
        "1 Domain inklusive",
        "SSL-Zertifikat",
        "E-Mail Support"
      ]
    },
    {
      name: "Business",
      price: "19,99€",
      period: "/Monat",
      features: [
        "25 GB SSD Speicher",
        "5 Domains inklusive",
        "SSL-Zertifikat",
        "Prioritäts-Support",
        "Erweiterte Backups"
      ],
      popular: true
    },
    {
      name: "Enterprise",
      price: "39,99€",
      period: "/Monat",
      features: [
        "100 GB SSD Speicher",
        "Unbegrenzte Domains",
        "SSL-Zertifikat",
        "24/7 Premium Support",
        "CDN inklusive",
        "DDoS-Schutz"
      ]
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
                <BarChart3 className="w-12 h-12 text-accent-nova-light mr-4" />
                <span className="text-accent-nova-light font-medium text-xl">
                  Zuverlässiges Web-Hosting
                </span>
              </div>
              
              <h1 className="font-heading font-bold text-5xl md:text-6xl mb-6">
                Web-Hosting
                <span className="block text-accent-nova">das funktioniert</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
                Schnelles, sicheres und zuverlässiges Hosting für Ihre Website 
                mit 99.9% Uptime-Garantie und erstklassigem Support.
              </p>
              
              <Button 
                size="lg" 
                className="bg-white text-primary hover:bg-white/90 px-8 py-4 text-lg"
                onClick={() => {
                  const contactSection = document.getElementById('contact');
                  contactSection?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Hosting-Beratung anfragen
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
                Warum unser Hosting?
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Professionelles Hosting mit allem was Sie für eine erfolgreiche 
                Website brauchen - zuverlässig, sicher und schnell.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-16">
              <div>
                <h3 className="font-heading font-semibold text-2xl text-foreground mb-6">
                  Inklusive Features
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

      {/* Pricing Section */}
      <section className="py-20 bg-gradient-subtle">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-heading font-bold text-4xl md:text-5xl text-foreground mb-6">
                Hosting-Pakete
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Wählen Sie das passende Hosting-Paket für Ihre Bedürfnisse. 
                Alle Pakete enthalten SSL-Zertifikat und Support.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {packages.map((pkg, index) => (
                <Card 
                  key={index} 
                  className={`relative hover-lift ${pkg.popular ? 'ring-2 ring-accent-nova' : ''}`}
                >
                  {pkg.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="bg-accent-nova text-white px-4 py-1 rounded-full text-sm font-medium">
                        Beliebt
                      </span>
                    </div>
                  )}
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center mx-auto mb-6">
                      <Server className="w-8 h-8 text-white" />
                    </div>
                    
                    <h3 className="font-heading font-semibold text-2xl text-foreground mb-4">
                      {pkg.name}
                    </h3>
                    
                    <div className="mb-6">
                      <span className="text-4xl font-bold text-foreground">{pkg.price}</span>
                      <span className="text-muted-foreground">{pkg.period}</span>
                    </div>
                    
                    <ul className="space-y-3 mb-8">
                      {pkg.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center justify-center text-sm text-muted-foreground">
                          <CheckCircle className="w-4 h-4 text-accent-nova mr-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    
                    <Button 
                      variant={pkg.popular ? "nova" : "outline"}
                      className="w-full"
                      onClick={() => {
                        const contactSection = document.getElementById('contact');
                        contactSection?.scrollIntoView({ behavior: 'smooth' });
                      }}
                    >
                      Paket wählen
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-6">
              Bereit für zuverlässiges Hosting?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Migrieren Sie noch heute zu unserem leistungsstarken Hosting 
              oder starten Sie Ihr neues Projekt bei uns.
            </p>
            <Button 
              size="lg" 
              variant="nova"
              onClick={() => {
                const contactSection = document.getElementById('contact');
                contactSection?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Kostenloses Hosting-Gespräch
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

export default WebHosting;