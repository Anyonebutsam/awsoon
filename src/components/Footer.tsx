import { Globe } from "lucide-react";
import awsoonLogo from "@/assets/awsoon-logo.jpg";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const links = {
    services: [
      { name: "Google Business Profile", href: "#services" },
      { name: "Local SEO", href: "#services" },
      { name: "Digital Marketing", href: "#services" },
      { name: "Reputation Management", href: "#services" },
    ],
    company: [
      { name: "How We Work", href: "#process" },
      { name: "Pricing", href: "#pricing" },
      { name: "FAQ", href: "#faq" },
      { name: "Contact", href: "#contact" },
    ],
  };

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-foreground text-background">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <img src={awsoonLogo} alt="AWSOON" className="h-12 rounded-lg mb-4" />
            <p className="text-background/70 mb-6 max-w-md leading-relaxed">
              Swedish quality and precision with Bulgarian prices. We help businesses grow their 
              online presence with expert digital marketing solutions.
            </p>
            <div className="flex items-center gap-2 text-sm text-background/50">
              <Globe className="w-4 h-4" />
              <span>Serving clients in 7 languages</span>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display font-bold text-lg mb-4">Services</h4>
            <ul className="space-y-3">
              {links.services.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-background/70 hover:text-background transition-colors"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-display font-bold text-lg mb-4">Company</h4>
            <ul className="space-y-3">
              {links.company.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-background/70 hover:text-background transition-colors"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-background/10 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-background/50">
            © {currentYear} AWSOON. All rights reserved.
          </p>
          <p className="text-sm text-background/50">
            Based in Sofia, Bulgaria
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
