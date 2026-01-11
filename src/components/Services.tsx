import { MapPin, Search, Megaphone, Users } from "lucide-react";
import { useTranslation } from "react-i18next";

// Google Brand Colors
const GoogleBlue = "#4285F4";
const GoogleRed = "#EA4335";
const GoogleYellow = "#FBBC05";
const GoogleGreen = "#34A853";

const Services = () => {
  const { t } = useTranslation();

  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  const services = [
    {
      icon: MapPin,
      titleKey: "services.gbp.title",
      descriptionKey: "services.gbp.description",
      color: GoogleBlue,
    },
    {
      icon: Search,
      titleKey: "services.localSeo.title",
      descriptionKey: "services.localSeo.description",
      color: GoogleGreen,
    },
    {
      icon: Megaphone,
      titleKey: "services.digitalMarketing.title",
      descriptionKey: "services.digitalMarketing.description",
      color: GoogleRed,
    },
    {
      icon: Users,
      titleKey: "services.reputation.title",
      descriptionKey: "services.reputation.description",
      color: GoogleYellow,
    },
  ];

  return (
    <section id="services" className="section-padding bg-muted/30">
      <div className="container-custom">
        <div className="text-center mb-16">
          <p className="text-sm font-medium text-primary uppercase tracking-wider mb-2">
            {t('services.label')}
          </p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {t('services.title')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('services.subtitle')}
          </p>
        </div>

        {/* Vertical Service List - Clean like Digiwise */}
        <div className="max-w-4xl mx-auto space-y-6">
          {services.map((service, index) => (
            <button
              key={service.titleKey}
              onClick={scrollToContact}
              className="group w-full text-left bg-card hover:bg-card/80 border border-border hover:border-primary/30 rounded-xl p-6 md:p-8 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5"
            >
              <div className="flex items-start gap-5">
                {/* Icon */}
                <div 
                  className="flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110"
                  style={{ backgroundColor: `${service.color}12` }}
                >
                  <service.icon className="w-7 h-7" style={{ color: service.color }} />
                </div>
                
                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-display text-xl md:text-2xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {t(service.titleKey)}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {t(service.descriptionKey)}
                  </p>
                </div>

                {/* Arrow indicator */}
                <div className="hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-muted group-hover:bg-primary/10 transition-colors flex-shrink-0 mt-2">
                  <svg 
                    className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            {t('services.ctaText')}
          </p>
          <button
            onClick={scrollToContact}
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-3 rounded-lg transition-colors"
          >
            {t('services.ctaButton')}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Services;