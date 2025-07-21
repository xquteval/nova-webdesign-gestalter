import { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, ArrowRight } from "lucide-react";

const Showcase = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeProject, setActiveProject] = useState(0);
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

  const projects = [
    {
      title: "Restaurant Goldener Hirsch",
      category: "Gastronomie",
      description: "Moderne Website mit Online-Reservierungssystem und Speisekarte",
      image: "/placeholder-restaurant.jpg",
      technologies: ["React", "Node.js", "Stripe"],
      results: "+150% Online-Reservierungen"
    },
    {
      title: "Zahnarztpraxis Dr. Schmidt",
      category: "Gesundheitswesen",
      description: "Responsive Website mit Terminbuchung und Patienteninformationen",
      image: "/placeholder-medical.jpg",
      technologies: ["WordPress", "Custom PHP", "Calendar API"],
      results: "+200% Neue Patienten"
    },
    {
      title: "Boutique Eleganz",
      category: "E-Commerce",
      description: "Eleganter Online-Shop mit integriertem Inventory Management",
      image: "/placeholder-fashion.jpg",
      technologies: ["WooCommerce", "Custom Theme", "Payment Gateway"],
      results: "+300% Online-Umsatz"
    },
    {
      title: "Anwaltskanzlei Weber",
      category: "Rechtswesen",
      description: "Professionelle Corporate Website mit Mandantenportal",
      image: "/placeholder-law.jpg",
      technologies: ["Custom CMS", "Security Features", "Document Management"],
      results: "+180% Mandatsanfragen"
    }
  ];

  return (
    <section
      ref={sectionRef}
      id="showcase"
      className="py-20 bg-gradient-subtle relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-primary/5 rounded-br-full"></div>
      <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-accent-nova/5 rounded-tl-full"></div>

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
              Unsere Projekte
            </span>
            <h2 className="font-heading font-bold text-4xl md:text-5xl text-foreground mb-6">
              Erfolgreiche 
              <span className="text-gradient block">Digitalprojekte</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Entdecken Sie eine Auswahl unserer erfolgreichen Projekte für 
              lokale Unternehmen in Wiesbaden und der Region.
            </p>
          </div>

          {/* Project Tabs */}
          <div
            className={`flex flex-wrap justify-center gap-4 mb-12 transition-all duration-1000 delay-300 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            {projects.map((project, index) => (
              <button
                key={index}
                onClick={() => setActiveProject(index)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  activeProject === index
                    ? "bg-primary text-white shadow-lg"
                    : "bg-white text-foreground hover:bg-neutral-100"
                }`}
              >
                {project.category}
              </button>
            ))}
          </div>

          {/* Active Project Display */}
          <div
            className={`transition-all duration-1000 delay-500 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <Card className="overflow-hidden hover-lift">
              <div className="grid lg:grid-cols-2 gap-0">
                {/* Project Image */}
                <div className="relative h-64 lg:h-full bg-gradient-nova">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white">
                      <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4">
                        <ExternalLink className="w-12 h-12" />
                      </div>
                      <p className="text-lg font-medium">Projekt Vorschau</p>
                      <p className="text-sm opacity-80">Bild wird geladen...</p>
                    </div>
                  </div>
                </div>

                {/* Project Details */}
                <CardContent className="p-8 lg:p-12">
                  <span className="text-accent-nova font-semibold text-sm uppercase tracking-wide">
                    {projects[activeProject].category}
                  </span>
                  
                  <h3 className="font-heading font-bold text-2xl lg:text-3xl text-foreground mt-2 mb-4">
                    {projects[activeProject].title}
                  </h3>
                  
                  <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                    {projects[activeProject].description}
                  </p>

                  {/* Technologies */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-foreground mb-3">Verwendete Technologien:</h4>
                    <div className="flex flex-wrap gap-2">
                      {projects[activeProject].technologies.map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-neutral-100 text-foreground rounded-full text-sm font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Results */}
                  <div className="mb-8">
                    <div className="p-4 bg-accent-nova-light rounded-lg">
                      <h4 className="font-semibold text-primary mb-1">Erfolgsmessung:</h4>
                      <p className="text-primary font-bold text-lg">
                        {projects[activeProject].results}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button variant="nova">
                      Projekt ansehen
                      <ExternalLink className="ml-2 w-4 h-4" />
                    </Button>
                    <Button variant="outline">
                      Ähnliches Projekt starten
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </div>
            </Card>
          </div>

          {/* Project Grid Preview */}
          <div
            className={`grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16 transition-all duration-1000 delay-700 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            {projects.map((project, index) => (
              <div
                key={index}
                className={`cursor-pointer transition-all duration-300 ${
                  index === activeProject
                    ? "opacity-100 scale-105"
                    : "opacity-60 hover:opacity-80"
                }`}
                onClick={() => setActiveProject(index)}
              >
                <Card className="overflow-hidden">
                  <div className="h-32 bg-gradient-nova relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-white font-medium text-sm">
                        {project.category}
                      </span>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h4 className="font-semibold text-foreground text-sm mb-1">
                      {project.title}
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      {project.results}
                    </p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Showcase;