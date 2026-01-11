import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const Services = () => {
  const { t } = useTranslation();
  
  const services = [
    {
      id: "google-business-profile",
      titleKey: "services.gbp.title",
      descriptionKey: "services.gbp.description",
    },
    {
      id: "google-ads",
      titleKey: "services.googleAds.title",
      descriptionKey: "services.googleAds.description",
    },
    {
      id: "meta-ads",
      titleKey: "services.metaAds.title",
      descriptionKey: "services.metaAds.description",
    },
    {
      id: "local-seo",
      titleKey: "services.localSeo.title",
      descriptionKey: "services.localSeo.description",
    },
    {
      id: "reputation-management",
      titleKey: "services.reputation.title",
      descriptionKey: "services.reputation.description",
    },
  ];

  return (
    <section id="services" className="py-20 md:py-28 bg-[#2a2a2a]">
      <div className="container-custom">
        {/* Section Title */}
        <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-center text-white mb-16 md:mb-20">
          {t('services.title')}
        </h2>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              className="group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="h-full flex flex-col items-center text-center p-6 md:p-8 bg-[#333333] rounded-xl border border-[#444444] hover:border-[#c9a962] transition-all duration-300">
                {/* Title */}
                <h3 className="font-display text-xl md:text-2xl font-bold text-[#c9a962] mb-4">
                  {t(service.titleKey)}
                </h3>
                
                {/* Description */}
                <p className="text-gray-300 leading-relaxed mb-6 flex-1">
                  {t(service.descriptionKey)}
                </p>
                
                {/* Button */}
                <Link
                  to={`/services/${service.id}`}
                  className="inline-flex items-center justify-center px-6 py-2.5 border-2 border-white text-white text-sm font-medium rounded-full hover:bg-white hover:text-[#2a2a2a] transition-all duration-300 group"
                >
                  {t('services.readMore')}
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
