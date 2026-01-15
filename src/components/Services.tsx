import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, MapPin, Target, Share2, Search, Star, Globe } from "lucide-react";

const Services = () => {
  const { t } = useTranslation();
  
  const services = [
    {
      id: "google-business-profile",
      titleKey: "services.gbp.title",
      descriptionKey: "services.gbp.description",
      icon: MapPin,
      color: "#4285F4",
    },
    {
      id: "google-ads",
      titleKey: "services.googleAds.title",
      descriptionKey: "services.googleAds.description",
      icon: Target,
      color: "#EA4335",
    },
    {
      id: "meta-ads",
      titleKey: "services.metaAds.title",
      descriptionKey: "services.metaAds.description",
      icon: Share2,
      color: "#1877F2",
    },
    {
      id: "local-seo",
      titleKey: "services.localSeo.title",
      descriptionKey: "services.localSeo.description",
      icon: Search,
      color: "#34A853",
    },
    {
      id: "reputation-management",
      titleKey: "services.reputation.title",
      descriptionKey: "services.reputation.description",
      icon: Star,
      color: "#FBBC05",
    },
    {
      id: "website-development",
      titleKey: "services.website.title",
      descriptionKey: "services.website.description",
      icon: Globe,
      color: "#9333EA",
    },
  ];

  return (
    <section id="services" className="scroll-mt-24 md:scroll-mt-28 py-20 md:py-28 hero-gradient">
      <div className="container-custom">
        {/* Section Title */}
        <motion.h2 
          className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-center text-white mb-16 md:mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          {t('services.title')}
        </motion.h2>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.id}
                className="group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Link to={`/services/${service.id}`}>
                  <motion.div 
                    className="h-full flex flex-col items-center text-center p-6 md:p-8 bg-card/10 backdrop-blur-sm rounded-xl border border-white/10 transition-all duration-500 cursor-pointer overflow-hidden relative"
                    whileHover={{ 
                      y: -8,
                      borderColor: service.color,
                      boxShadow: `0 20px 40px -15px ${service.color}40`
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Background glow effect */}
                    <div 
                      className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500"
                      style={{ 
                        background: `radial-gradient(circle at center, ${service.color} 0%, transparent 70%)` 
                      }}
                    />
                    
                    {/* Icon */}
                    <motion.div 
                      className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 relative z-10"
                      style={{ backgroundColor: `${service.color}20` }}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Icon 
                        className="w-7 h-7 transition-all duration-300 group-hover:scale-110" 
                        style={{ color: service.color }}
                      />
                    </motion.div>
                    
                    {/* Title */}
                    <h3 className="font-display text-xl md:text-2xl font-bold text-[#c9a962] mb-4 relative z-10 group-hover:text-white transition-colors duration-300">
                      {t(service.titleKey)}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-gray-300 leading-relaxed mb-6 flex-1 relative z-10 group-hover:text-gray-200 transition-colors duration-300">
                      {t(service.descriptionKey)}
                    </p>
                    
                    {/* Button */}
                    <motion.div 
                      className="inline-flex items-center justify-center px-6 py-2.5 border-2 border-white text-white text-sm font-medium rounded-full transition-all duration-300 group-hover:bg-white group-hover:text-foreground relative z-10"
                      whileHover={{ scale: 1.05 }}
                    >
                      {t('services.readMore')}
                      <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                    </motion.div>
                  </motion.div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
