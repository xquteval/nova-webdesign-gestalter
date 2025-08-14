import { useEffect, useRef, useState } from "react";
import { Award, Users, Clock, Target } from "lucide-react";

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const stats = [
    { icon: Users, value: "15+", label: "Aktuelle Projekte" },
    { icon: Award, value: "99%", label: "Uptime garantiert" },
    { icon: Clock, value: "24h", label: "Support-Reaktionszeit" },
    { icon: Target, value: "SSL", label: "Sicherheit inklusive" },
  ];

  return (
    <section
      ref={sectionRef}
      id="about"
      className="py-20 bg-gradient-subtle relative overflow-hidden"
    >
      
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-accent-nova/5 rounded-l-full"></div>
      <div className="absolute bottom-0 left-0 w-1/4 h-1/2 bg-primary/5 rounded-tr-full"></div>

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
              Über Nova WebDesign
            </span>
            <h2 className="font-heading font-bold text-4xl md:text-5xl text-foreground mb-6">
              Digitale Lösungen aus
              <span className="text-gradient block">Wiesbaden</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Wir sind Ihr lokaler Partner für Website-Erstellung und zuverlässiges Hosting. 
              Mit Leidenschaft und Expertise bringen wir Ihr Unternehmen 
              erfolgreich ins Internet - alles aus einer Hand.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Content */}
            <div
              className={`transition-all duration-1000 delay-300 ${
                isVisible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-8"
              }`}
            >
              <h3 className="font-heading font-semibold text-2xl text-foreground mb-6">
                Warum Nova WebDesign?
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-lg gradient-nova flex items-center justify-center flex-shrink-0">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg text-foreground mb-2">
                      Maßgeschneiderte Lösungen
                    </h4>
                    <p className="text-muted-foreground">
                      Jede Website wird individuell nach Ihren Bedürfnissen entwickelt 
                      und auf unserem zuverlässigen Hosting-System betrieben.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-lg bg-accent-nova flex items-center justify-center flex-shrink-0">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg text-foreground mb-2">
                      Hosting inklusive
                    </h4>
                    <p className="text-muted-foreground">
                      Ihre Website läuft auf unserem schnellen und sicheren 
                      Hosting - mit SSL-Zertifikat und regelmäßigen Backups.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center flex-shrink-0">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg text-foreground mb-2">
                      Alles aus einer Hand
                    </h4>
                    <p className="text-muted-foreground">
                      Von der Website-Erstellung bis zum Hosting und Support - 
                      Sie haben nur einen Ansprechpartner für alles.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div
              className={`transition-all duration-1000 delay-500 ${
                isVisible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-8"
              }`}
            >
              <div className="grid grid-cols-2 gap-6">
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className={`text-center p-6 rounded-2xl bg-white hover-lift transition-all duration-300 delay-${index * 100}`}
                  >
                    <div className="w-16 h-16 rounded-full gradient-nova flex items-center justify-center mx-auto mb-4">
                      <stat.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="font-heading font-bold text-3xl text-foreground mb-2">
                      {stat.value}
                    </div>
                    <div className="text-muted-foreground font-medium">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-6 rounded-2xl bg-white/50 backdrop-blur-sm border border-white/20">
                <blockquote className="text-lg text-foreground italic text-center">
                  "Wir erstellen nicht nur Websites, sondern bieten 
                  das komplette Paket: Design, Entwicklung und 
                  zuverlässiges Hosting - alles aus einer Hand."
                </blockquote>
                <cite className="block text-center mt-4 text-accent-nova font-semibold">
                  — Das Nova Team
                </cite>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;