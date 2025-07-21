import { Button } from "@/components/ui/button";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Instagram, 
  Linkedin, 
  Facebook,
  ArrowUp
} from "lucide-react";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  const services = [
    "Webdesign",
    "Webentwicklung",
    "SEO Optimierung",
    "E-Commerce",
    "Mobile Apps",
    "Wartung & Support"
  ];

  const quickLinks = [
    { name: "Über uns", href: "#about" },
    { name: "Leistungen", href: "#services" },
    { name: "Projekte", href: "#showcase" },
    { name: "Referenzen", href: "#testimonials" },
    { name: "Kontakt", href: "#contact" }
  ];

  return (
    <footer className="bg-neutral-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary to-accent-nova"></div>
      </div>

      <div className="container mx-auto px-6 relative">
        {/* Main Footer Content */}
        <div className="grid lg:grid-cols-4 gap-12 py-16">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-12 h-12 rounded-lg gradient-nova flex items-center justify-center">
                <span className="text-white font-bold text-xl">N</span>
              </div>
              <div>
                <h3 className="font-heading font-bold text-xl">Nova WebDesign</h3>
                <p className="text-neutral-400 text-sm">Wiesbaden</p>
              </div>
            </div>
            
            <p className="text-neutral-300 mb-6 leading-relaxed">
              Ihre digitale Zukunft beginnt hier. Wir entwickeln maßgeschneiderte 
              Websites für lokale Unternehmen in Wiesbaden und der Region.
            </p>

            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-accent-nova flex-shrink-0" />
                <span className="text-neutral-300">Wilhelmstraße 123, 65183 Wiesbaden</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-accent-nova flex-shrink-0" />
                <span className="text-neutral-300">+49 611 123 456</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-accent-nova flex-shrink-0" />
                <span className="text-neutral-300">hallo@nova-webdesign.de</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-6">Unsere Leistungen</h4>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index}>
                  <a
                    href="#services"
                    className="text-neutral-300 hover:text-accent-nova transition-colors duration-300 text-sm"
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-6">Navigation</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-neutral-300 hover:text-accent-nova transition-colors duration-300 text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <h5 className="font-semibold text-sm mb-3">Rechtliches</h5>
              <ul className="space-y-2">
                <li>
                  <a href="/impressum" className="text-neutral-400 hover:text-neutral-300 transition-colors text-xs">
                    Impressum
                  </a>
                </li>
                <li>
                  <a href="/datenschutz" className="text-neutral-400 hover:text-neutral-300 transition-colors text-xs">
                    Datenschutz
                  </a>
                </li>
                <li>
                  <a href="/agb" className="text-neutral-400 hover:text-neutral-300 transition-colors text-xs">
                    AGB
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Contact & Social */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-6">Kontakt & Social</h4>
            
            <div className="mb-6">
              <p className="text-neutral-300 text-sm mb-4">
                Folgen Sie uns für Updates und Inspiration:
              </p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center hover:bg-accent-nova transition-all duration-300 hover:scale-110"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center hover:bg-accent-nova transition-all duration-300 hover:scale-110"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center hover:bg-accent-nova transition-all duration-300 hover:scale-110"
                >
                  <Facebook className="w-5 h-5" />
                </a>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <h5 className="font-semibold text-sm mb-2">Kostenlose Erstberatung</h5>
              <p className="text-xs text-neutral-400 mb-3">
                Vereinbaren Sie noch heute Ihren Termin
              </p>
              <Button 
                size="sm" 
                className="w-full bg-accent-nova hover:bg-accent-nova/90 text-white"
                onClick={() => {
                  const contactSection = document.getElementById('contact');
                  contactSection?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Jetzt kontaktieren
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-neutral-800 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-neutral-400 text-sm">
              © {currentYear} Nova WebDesign. Alle Rechte vorbehalten.
              <span className="mx-2">•</span>
              <span className="text-accent-nova">Made with ❤️ in Wiesbaden</span>
            </div>

            <button
              onClick={scrollToTop}
              className="flex items-center space-x-2 text-neutral-400 hover:text-accent-nova transition-colors duration-300 text-sm group"
            >
              <span>Nach oben</span>
              <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;