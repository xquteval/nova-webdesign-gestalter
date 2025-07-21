import { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";

const Testimonials = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
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

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const testimonials = [
    {
      name: "Klaus Müller",
      company: "Restaurant Goldener Hirsch",
      role: "Inhaber",
      content: "Nova WebDesign hat unsere Erwartungen übertroffen. Die neue Website ist nicht nur wunderschön, sondern hat auch unsere Online-Reservierungen um 150% gesteigert. Das Team war professionell und immer erreichbar.",
      rating: 5,
      location: "Wiesbaden"
    },
    {
      name: "Dr. Sarah Schmidt",
      company: "Zahnarztpraxis Dr. Schmidt",
      role: "Zahnärztin",
      content: "Endlich eine Website, die unsere Praxis professionell repräsentiert. Das Online-Terminbuchungssystem funktioniert einwandfrei und wir haben deutlich mehr Neupatienten gewonnen. Vielen Dank!",
      rating: 5,
      location: "Mainz"
    },
    {
      name: "Marina Weber",
      company: "Boutique Eleganz",
      role: "Geschäftsführerin",
      content: "Der Online-Shop von Nova WebDesign hat unser Geschäft revolutioniert. Modernes Design, einfache Bedienung und unser Umsatz ist um 300% gestiegen. Absolut empfehlenswert!",
      rating: 5,
      location: "Wiesbaden"
    },
    {
      name: "Thomas Hofmann",
      company: "Anwaltskanzlei Weber & Partner",
      role: "Rechtsanwalt",
      content: "Eine sehr professionelle Website, die das Vertrauen unserer Mandanten stärkt. Das Mandantenportal ist innovativ und benutzerfreundlich. Hervorragende Arbeit!",
      rating: 5,
      location: "Frankfurt"
    }
  ];

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="py-20 bg-white relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute top-10 right-10 w-32 h-32 bg-accent-nova/10 rounded-full"></div>
      <div className="absolute bottom-10 left-10 w-24 h-24 bg-primary/10 rounded-full"></div>
      <div className="absolute top-1/2 left-1/4 w-2 h-2 bg-accent-nova rounded-full animate-pulse"></div>
      <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-primary rounded-full animate-pulse"></div>

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
              Kundenstimmen
            </span>
            <h2 className="font-heading font-bold text-4xl md:text-5xl text-foreground mb-6">
              Was unsere Kunden
              <span className="text-gradient block">über uns sagen</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Lesen Sie authentische Erfahrungsberichte von lokalen Unternehmen, 
              die mit Nova WebDesign erfolgreich digital durchgestartet sind.
            </p>
          </div>

          {/* Main Testimonial */}
          <div
            className={`transition-all duration-1000 delay-300 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <Card className="relative overflow-hidden hover-lift max-w-4xl mx-auto">
              <CardContent className="p-8 lg:p-12">
                {/* Quote Icon */}
                <div className="absolute top-8 right-8 opacity-10">
                  <Quote className="w-24 h-24 text-primary" />
                </div>

                <div className="relative">
                  {/* Rating */}
                  <div className="flex items-center mb-6">
                    {Array.from({ length: testimonials[activeTestimonial].rating }).map((_, i) => (
                      <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                    ))}
                  </div>

                  {/* Content */}
                  <blockquote className="text-xl lg:text-2xl text-foreground leading-relaxed mb-8 font-medium">
                    "{testimonials[activeTestimonial].content}"
                  </blockquote>

                  {/* Author */}
                  <div className="flex items-center justify-between">
                    <div>
                      <cite className="font-semibold text-lg text-foreground not-italic">
                        {testimonials[activeTestimonial].name}
                      </cite>
                      <p className="text-muted-foreground">
                        {testimonials[activeTestimonial].role}, {testimonials[activeTestimonial].company}
                      </p>
                      <p className="text-sm text-accent-nova font-medium">
                        📍 {testimonials[activeTestimonial].location}
                      </p>
                    </div>

                    {/* Navigation Dots */}
                    <div className="flex space-x-2">
                      {testimonials.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setActiveTestimonial(index)}
                          className={`w-3 h-3 rounded-full transition-all duration-300 ${
                            index === activeTestimonial
                              ? "bg-primary scale-125"
                              : "bg-neutral-200 hover:bg-neutral-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Testimonial Grid */}
          <div
            className={`grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16 transition-all duration-1000 delay-500 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className={`cursor-pointer transition-all duration-300 ${
                  index === activeTestimonial
                    ? "ring-2 ring-primary shadow-lg scale-105"
                    : "hover:shadow-md hover:scale-102"
                }`}
                onClick={() => setActiveTestimonial(index)}
              >
                <CardContent className="p-6">
                  <div className="flex items-center mb-3">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  
                  <h4 className="font-semibold text-foreground mb-1">
                    {testimonial.name}
                  </h4>
                  
                  <p className="text-sm text-muted-foreground mb-2">
                    {testimonial.company}
                  </p>
                  
                  <p className="text-xs text-accent-nova">
                    📍 {testimonial.location}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Trust Indicators */}
          <div
            className={`text-center mt-16 transition-all duration-1000 delay-700 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="font-heading font-bold text-3xl text-primary mb-2">
                  50+
                </div>
                <p className="text-muted-foreground">Zufriedene Kunden</p>
              </div>
              
              <div className="text-center">
                <div className="font-heading font-bold text-3xl text-primary mb-2">
                  100%
                </div>
                <p className="text-muted-foreground">Kundenzufriedenheit</p>
              </div>
              
              <div className="text-center">
                <div className="font-heading font-bold text-3xl text-primary mb-2">
                  4.9★
                </div>
                <p className="text-muted-foreground">Durchschnittsbewertung</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;