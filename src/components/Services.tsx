import { MapPin, Search, Megaphone, Users, ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

// Google Brand Colors
const GoogleBlue = "#4285F4";
const GoogleRed = "#EA4335";
const GoogleYellow = "#FBBC05";
const GoogleGreen = "#34A853";

const Services = () => {
  const { t } = useTranslation();
  
  const services = [
    {
      icon: MapPin,
      titleKey: "services.gbp.title",
      descriptionKey: "services.gbp.description",
      detailKey: "services.gbp.detail",
      color: GoogleBlue,
      href: "/blog?category=gbp"
    },
    {
      icon: Search,
      titleKey: "services.localSeo.title",
      descriptionKey: "services.localSeo.description",
      detailKey: "services.localSeo.detail",
      color: GoogleGreen,
      href: "/blog?category=seo"
    },
    {
      icon: Megaphone,
      titleKey: "services.digitalMarketing.title",
      descriptionKey: "services.digitalMarketing.description",
      detailKey: "services.digitalMarketing.detail",
      color: GoogleRed,
      href: "/blog?category=marketing"
    },
    {
      icon: Users,
      titleKey: "services.reputation.title",
      descriptionKey: "services.reputation.description",
      detailKey: "services.reputation.detail",
      color: GoogleYellow,
      href: "/blog?category=reputation"
    },
  ];

  return (
    <section id="services" className="section-padding bg-background">
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-border rounded-2xl overflow-hidden">
          {services.map((service, index) => (
            <Link
              key={service.titleKey}
              to={service.href}
              className="group relative p-8 md:p-10 bg-card hover:bg-muted/50 transition-all duration-300 border-border"
              style={{
                borderRight: index % 2 === 0 ? '1px solid hsl(var(--border))' : 'none',
                borderBottom: index < 2 ? '1px solid hsl(var(--border))' : 'none',
              }}
            >
              {/* Icon */}
              <div 
                className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110"
                style={{ backgroundColor: `${service.color}15` }}
              >
                <service.icon className="w-8 h-8" style={{ color: service.color }} />
              </div>
              
              {/* Title */}
              <h3 className="font-display text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                {t(service.titleKey)}
              </h3>
              
              {/* Short Description */}
              <p className="text-muted-foreground leading-relaxed mb-4">
                {t(service.descriptionKey)}
              </p>
              
              {/* Detailed Explanation */}
              <p className="text-sm text-muted-foreground/80 leading-relaxed mb-6">
                {t(service.detailKey)}
              </p>
              
              {/* CTA Link */}
              <div className="flex items-center gap-2 text-primary font-medium text-sm group-hover:gap-3 transition-all">
                {t('services.learnMore')}
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;