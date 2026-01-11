import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { ArrowLeft, Check } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

const serviceData: Record<string, { 
  color: string; 
  gradient: string;
}> = {
  "google-business-profile": {
    color: "#4285F4",
    gradient: "from-[#4285F4] to-[#1a5fd4]",
  },
  "google-ads": {
    color: "#EA4335",
    gradient: "from-[#EA4335] to-[#c5221f]",
  },
  "meta-ads": {
    color: "#1877F2",
    gradient: "from-[#1877F2] to-[#0d5cc9]",
  },
  "local-seo": {
    color: "#34A853",
    gradient: "from-[#34A853] to-[#1e7e34]",
  },
  "reputation-management": {
    color: "#FBBC05",
    gradient: "from-[#FBBC05] to-[#d4a000]",
  },
};

const ServiceDetail = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const { t } = useTranslation();
  
  const service = serviceId ? serviceData[serviceId] : null;
  
  if (!service) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-32 pb-20 text-center">
          <h1 className="text-3xl font-bold mb-4">Service not found</h1>
          <Link to="/#services" className="text-primary hover:underline">
            Back to Services
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  // Get translated content
  const title = t(`services.pages.${serviceId}.title`);
  const subtitle = t(`services.pages.${serviceId}.subtitle`);
  const description = t(`services.pages.${serviceId}.description`);
  
  // Get features array
  const features: string[] = [];
  for (let i = 1; i <= 8; i++) {
    const featureKey = `services.pages.${serviceId}.features.feature${i}`;
    const feature = t(featureKey);
    if (feature !== featureKey) {
      features.push(feature);
    }
  }

  // Get benefits array
  const benefits: string[] = [];
  for (let i = 1; i <= 6; i++) {
    const benefitKey = `services.pages.${serviceId}.benefits.benefit${i}`;
    const benefit = t(benefitKey);
    if (benefit !== benefitKey) {
      benefits.push(benefit);
    }
  }

  return (
    <motion.div 
      className="min-h-screen bg-background"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ 
        type: "spring",
        stiffness: 100,
        damping: 20,
        duration: 0.4 
      }}
    >
      <Header />
      
      {/* Hero Section */}
      <section className={`pt-28 pb-16 md:pt-36 md:pb-24 bg-gradient-to-br ${service.gradient}`}>
        <div className="container-custom">
          <Link 
            to="/#services" 
            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {t('services.backToServices')}
          </Link>
          
          <motion.h1 
            className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            {title}
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-white/90 max-w-3xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {subtitle}
          </motion.p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 md:py-24">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Left Column - Description */}
            <div>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-6">
                {t('services.whatWeOffer')}
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                {description}
              </p>
              
              {/* Features List */}
              <div className="space-y-4">
                {features.map((feature, index) => (
                  <motion.div 
                    key={index}
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                  >
                    <div 
                      className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-0.5"
                      style={{ backgroundColor: `${service.color}20` }}
                    >
                      <Check className="w-4 h-4" style={{ color: service.color }} />
                    </div>
                    <span className="text-foreground">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right Column - Benefits */}
            <div className="bg-muted/50 rounded-2xl p-8 md:p-10">
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-6">
                {t('services.whyChooseUs')}
              </h2>
              
              <div className="space-y-6">
                {benefits.map((benefit, index) => (
                  <motion.div 
                    key={index}
                    className="flex items-start gap-4"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 * index }}
                  >
                    <div 
                      className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm"
                      style={{ backgroundColor: service.color }}
                    >
                      {index + 1}
                    </div>
                    <span className="text-muted-foreground leading-relaxed pt-1">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-muted/30 border-t border-border">
        <div className="container-custom text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t('services.cta.title')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            {t('services.cta.description')}
          </p>
          <Button 
            size="lg" 
            className="font-semibold px-8"
            style={{ backgroundColor: service.color }}
            asChild
          >
            <a href="mailto:sam@awsoon.com?subject=Inquiry about services">
              {t('services.cta.button')}
            </a>
          </Button>
        </div>
      </section>

      <Footer />
    </motion.div>
  );
};

export default ServiceDetail;