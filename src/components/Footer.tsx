import { Globe } from "lucide-react";
import { useTranslation } from "react-i18next";
import awsoonLogo from "@/assets/awsoon-logo.jpg";

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

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
              {t('footer.description')}
            </p>
            <div className="flex items-center gap-2 text-sm text-background/50">
              <Globe className="w-4 h-4" />
              <span>{t('footer.languages')}</span>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display font-bold text-lg mb-4">{t('footer.services')}</h4>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => scrollToSection("#services")}
                  className="text-background/70 hover:text-background transition-colors"
                >
                  {t('services.gbp.title')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("#services")}
                  className="text-background/70 hover:text-background transition-colors"
                >
                  {t('services.localSeo.title')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("#services")}
                  className="text-background/70 hover:text-background transition-colors"
                >
                  {t('services.digitalMarketing.title')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("#services")}
                  className="text-background/70 hover:text-background transition-colors"
                >
                  {t('services.reputation.title')}
                </button>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-display font-bold text-lg mb-4">{t('footer.quickLinks')}</h4>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => scrollToSection("#process")}
                  className="text-background/70 hover:text-background transition-colors"
                >
                  {t('nav.howWeWork')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("#pricing")}
                  className="text-background/70 hover:text-background transition-colors"
                >
                  {t('nav.pricing')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("#faq")}
                  className="text-background/70 hover:text-background transition-colors"
                >
                  {t('nav.faq')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("#contact")}
                  className="text-background/70 hover:text-background transition-colors"
                >
                  {t('nav.contact')}
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-background/10 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-background/50">
            © {currentYear} AWSOON. {t('footer.rights')}
          </p>
          <p className="text-sm text-background/50">
            {t('contact.info.locationValue')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;