import { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock,
  Send,
  CheckCircle2
} from "lucide-react";

const Contact = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    // Here you would typically handle the form submission
    setTimeout(() => setFormSubmitted(false), 3000);
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Adresse",
      content: "Wilhelmstraße 123\n65183 Wiesbaden",
      color: "primary"
    },
    {
      icon: Phone,
      title: "Telefon",
      content: "+49 611 123 456\n+49 172 987 654",
      color: "accent-nova"
    },
    {
      icon: Mail,
      title: "E-Mail",
      content: "hallo@nova-webdesign.de\ninfo@nova-webdesign.de",
      color: "primary"
    },
    {
      icon: Clock,
      title: "Öffnungszeiten",
      content: "Mo-Fr: 9:00 - 18:00\nSa: 10:00 - 14:00",
      color: "accent-nova"
    }
  ];

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="py-20 bg-gradient-subtle relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 rounded-l-full"></div>
      <div className="absolute bottom-0 left-0 w-1/4 h-1/2 bg-accent-nova/5 rounded-tr-full"></div>

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
              Kontakt
            </span>
            <h2 className="font-heading font-bold text-4xl md:text-5xl text-foreground mb-6">
              Lassen Sie uns
              <span className="text-gradient block">sprechen</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Bereit für Ihr nächstes Digitalprojekt? Kontaktieren Sie uns für 
              eine kostenlose Erstberatung und lassen Sie uns gemeinsam Ihre Vision verwirklichen.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Contact Form */}
            <div
              className={`transition-all duration-1000 delay-300 ${
                isVisible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-8"
              }`}
            >
              <Card className="hover-lift">
                <CardHeader>
                  <CardTitle className="font-heading text-2xl">
                    Kostenlose Erstberatung
                  </CardTitle>
                  <p className="text-muted-foreground">
                    Erzählen Sie uns von Ihrem Projekt und wir melden uns innerhalb von 24 Stunden bei Ihnen.
                  </p>
                </CardHeader>
                <CardContent>
                  {!formSubmitted ? (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">
                            Vorname *
                          </label>
                          <Input
                            type="text"
                            required
                            className="w-full"
                            placeholder="Ihr Vorname"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">
                            Nachname *
                          </label>
                          <Input
                            type="text"
                            required
                            className="w-full"
                            placeholder="Ihr Nachname"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          E-Mail Adresse *
                        </label>
                        <Input
                          type="email"
                          required
                          className="w-full"
                          placeholder="ihre.email@beispiel.de"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Telefon
                        </label>
                        <Input
                          type="tel"
                          className="w-full"
                          placeholder="+49 611 123 456"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Unternehmen
                        </label>
                        <Input
                          type="text"
                          className="w-full"
                          placeholder="Ihr Unternehmen"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Projektbeschreibung *
                        </label>
                        <Textarea
                          required
                          rows={4}
                          className="w-full"
                          placeholder="Beschreiben Sie kurz Ihr Projekt und Ihre Ziele..."
                        />
                      </div>

                      <div className="flex items-start space-x-3">
                        <input
                          type="checkbox"
                          id="privacy"
                          required
                          className="mt-1"
                        />
                        <label htmlFor="privacy" className="text-sm text-muted-foreground">
                          Ich habe die Datenschutzerklärung gelesen und stimme der Verarbeitung 
                          meiner Daten zu. *
                        </label>
                      </div>

                      <Button
                        type="submit"
                        size="lg"
                        variant="nova"
                        className="w-full"
                      >
                        Kostenlose Beratung anfragen
                        <Send className="ml-2 w-5 h-5" />
                      </Button>
                    </form>
                  ) : (
                    <div className="text-center py-8">
                      <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
                      <h3 className="font-heading font-semibold text-xl text-foreground mb-2">
                        Vielen Dank!
                      </h3>
                      <p className="text-muted-foreground">
                        Ihre Anfrage wurde erfolgreich gesendet. Wir melden uns 
                        innerhalb von 24 Stunden bei Ihnen.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Contact Info */}
            <div
              className={`transition-all duration-1000 delay-500 ${
                isVisible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-8"
              }`}
            >
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <Card key={index} className="hover-lift">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className={`w-12 h-12 rounded-lg bg-${info.color} flex items-center justify-center flex-shrink-0`}>
                          <info.icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-lg text-foreground mb-1">
                            {info.title}
                          </h4>
                          <p className="text-muted-foreground whitespace-pre-line">
                            {info.content}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {/* Map Placeholder */}
                <Card className="hover-lift">
                  <CardContent className="p-0">
                    <div className="h-48 gradient-nova relative rounded-lg overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center text-white">
                          <MapPin className="w-12 h-12 mx-auto mb-2" />
                          <p className="font-medium">Wiesbaden Zentrum</p>
                          <p className="text-sm opacity-80">Wilhelmstraße 123</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Contact */}
                <Card className="gradient-nova text-white hover-lift">
                  <CardContent className="p-6 text-center">
                    <h4 className="font-heading font-semibold text-xl mb-2">
                      Schnellkontakt
                    </h4>
                    <p className="mb-4 opacity-90">
                      Für dringende Anfragen erreichen Sie uns auch direkt:
                    </p>
                    <div className="space-y-2">
                      <a
                        href="tel:+496111234567"
                        className="block font-semibold hover:opacity-80 transition-opacity"
                      >
                        📞 +49 611 123 456
                      </a>
                      <a
                        href="mailto:hallo@nova-webdesign.de"
                        className="block font-semibold hover:opacity-80 transition-opacity"
                      >
                        ✉️ hallo@nova-webdesign.de
                      </a>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;