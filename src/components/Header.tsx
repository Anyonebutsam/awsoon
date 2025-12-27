import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial position
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Services", href: "#services" },
    { name: "How We Work", href: "#process" },
    { name: "Pricing", href: "#pricing" },
    { name: "FAQ", href: "#faq" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "#contact" },
  ];

  const scrollToSection = (href: string) => {
    if (href.startsWith("#")) {
      if (!isHomePage) {
        window.location.href = "/" + href;
        return;
      }
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
    setMobileMenuOpen(false);
  };

  const scrollProgress = Math.min(window.scrollY / 100, 1);
  const isScrolled = scrolled || !isHomePage;

  return (
    <header 
      dir="ltr"
      className="fixed top-0 left-0 right-0 z-50 border-b transition-all duration-500 ease-out"
      style={{
        backgroundColor: isScrolled ? 'hsl(var(--background) / 0.95)' : 'transparent',
        backdropFilter: isScrolled ? 'blur(12px)' : 'none',
        borderColor: isScrolled ? 'hsl(var(--border))' : 'transparent',
        boxShadow: isScrolled ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
      }}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo Text */}
          <Link to="/" className="flex items-center gap-2">
            <span 
              className="font-display text-xl md:text-2xl font-bold transition-all duration-500"
              style={{ color: isScrolled ? 'hsl(var(--foreground))' : 'white' }}
            >
              AWSOON
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              link.href.startsWith("/") ? (
                <Link
                  key={link.name}
                  to={link.href}
                  className="px-4 py-2 text-sm font-medium rounded-lg transition-all duration-500"
                  style={{
                    color: isScrolled ? 'hsl(var(--muted-foreground))' : 'rgba(255,255,255,0.8)',
                  }}
                >
                  {link.name}
                </Link>
              ) : (
                <button
                  key={link.name}
                  onClick={() => scrollToSection(link.href)}
                  className="px-4 py-2 text-sm font-medium rounded-lg transition-all duration-500"
                  style={{
                    color: isScrolled ? 'hsl(var(--muted-foreground))' : 'rgba(255,255,255,0.8)',
                  }}
                >
                  {link.name}
                </button>
              )
            ))}
          </nav>

          {/* Language Switcher & CTA Button */}
          <div className="hidden md:flex items-center gap-3">
            <LanguageSwitcher scrolled={scrolled} isHomePage={isHomePage} />
            <Button
              onClick={() => scrollToSection("#contact")}
              className="bg-primary hover:bg-primary-hover text-primary-foreground font-semibold px-6"
            >
              Get Started
            </Button>
          </div>

          {/* Mobile: Language Switcher & Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <LanguageSwitcher scrolled={scrolled} isHomePage={isHomePage} />
            <button
              className={`p-2 rounded-lg transition-colors ${scrolled || !isHomePage ? "hover:bg-muted" : "hover:bg-white/10"}`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className={`w-6 h-6 ${scrolled || !isHomePage ? "text-foreground" : "text-white"}`} />
              ) : (
                <Menu className={`w-6 h-6 ${scrolled || !isHomePage ? "text-foreground" : "text-white"}`} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className={`md:hidden py-4 border-t animate-fade-in ${scrolled || !isHomePage ? "border-border bg-background" : "border-white/20 bg-primary/95"}`}>
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                link.href.startsWith("/") ? (
                  <Link
                    key={link.name}
                    to={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-4 py-3 text-left text-sm font-medium transition-colors rounded-lg ${scrolled || !isHomePage ? "text-muted-foreground hover:text-foreground hover:bg-muted" : "text-white/80 hover:text-white hover:bg-white/10"}`}
                  >
                    {link.name}
                  </Link>
                ) : (
                  <button
                    key={link.name}
                    onClick={() => scrollToSection(link.href)}
                    className={`px-4 py-3 text-left text-sm font-medium transition-colors rounded-lg ${scrolled || !isHomePage ? "text-muted-foreground hover:text-foreground hover:bg-muted" : "text-white/80 hover:text-white hover:bg-white/10"}`}
                  >
                    {link.name}
                  </button>
                )
              ))}
              <Button
                onClick={() => scrollToSection("#contact")}
                className="mt-2 bg-primary hover:bg-primary-hover text-primary-foreground font-semibold"
              >
                Get Started
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
