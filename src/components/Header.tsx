import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { 
      name: "Leistungen", 
      href: "#services",
      dropdown: [
        { name: "Webdesign", href: "/webdesign" },
        { name: "Webentwicklung", href: "/webentwicklung" },
        { name: "Web-Hosting", href: "/web-hosting" }
      ]
    },
    { name: "Kontakt", href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-lg border-b border-neutral-200 shadow-sm"
          : "bg-white/90 backdrop-blur-sm shadow-sm"
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <img src="/nova-logo-new.svg" alt="Nova WebDesign Logo" className="w-10 h-10" />
            <div>
              <h1 className="font-heading font-bold text-xl text-foreground">
                Nova WebDesign
              </h1>
              <p className="text-xs text-muted-foreground -mt-1">
                Wiesbaden
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <div key={item.name} className="relative group">
                <a
                  href={item.href}
                  className="text-foreground hover:text-accent-nova transition-colors duration-300 font-medium relative"
                >
                  {item.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent-nova transition-all duration-300 group-hover:w-full"></span>
                </a>
                
                {/* Dropdown Menu */}
                {item.dropdown && (
                  <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 border border-neutral-200">
                    <div className="py-2">
                      {item.dropdown.map((dropdownItem, index) => (
                        <a 
                          key={dropdownItem.name}
                          href={dropdownItem.href}
                          className="block px-4 py-2 text-gray-800 hover:bg-gray-100 transition-colors duration-200"
                        >
                          <div className="flex items-center">
                            <div className={`w-8 h-8 rounded ${index === 0 ? 'bg-accent-nova/10' : index === 1 ? 'bg-primary/10' : 'bg-accent-nova/10'} flex items-center justify-center mr-3`}>
                              <span className={`${index === 0 ? 'text-accent-nova' : index === 1 ? 'text-primary' : 'text-accent-nova'} font-semibold text-sm`}>
                                {dropdownItem.name.charAt(0)}
                              </span>
                            </div>
                            <div>
                              <div className="font-medium">{dropdownItem.name}</div>
                              <div className="text-xs text-gray-500">
                                {index === 0 ? 'Modernes Design' : index === 1 ? 'Moderne Technologien' : 'Zuverlässig & schnell'}
                              </div>
                            </div>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button 
              variant="nova"
              onClick={() => {
                const contactSection = document.getElementById('contact');
                contactSection?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Kostenlose Beratung
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-neutral-100 transition-colors"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-neutral-200 animate-fade-up">
            <nav className="flex flex-col space-y-4 mt-4">
              {navItems.map((item) => (
                <div key={item.name}>
                  <a
                    href={item.href}
                    className="text-foreground hover:text-accent-nova transition-colors duration-300 font-medium py-2 block"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </a>
                  {/* Mobile Dropdown */}
                  {item.dropdown && (
                    <div className="pl-4 mt-2 space-y-2">
                      {item.dropdown.map((dropdownItem) => (
                        <a
                          key={dropdownItem.name}
                          href={dropdownItem.href}
                          className="block text-gray-600 hover:text-primary transition-colors duration-200 py-1"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {dropdownItem.name}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <Button 
                variant="nova" 
                className="mt-4 w-full"
                onClick={() => {
                  const contactSection = document.getElementById('contact');
                  contactSection?.scrollIntoView({ behavior: 'smooth' });
                  setIsMobileMenuOpen(false);
                }}
              >
                Kostenlose Beratung
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;