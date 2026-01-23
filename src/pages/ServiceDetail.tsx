import { useParams, useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTranslation } from "react-i18next";
import { ArrowLeft, Check } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";

// Import service images
import gbpImage from "@/assets/services/google-business-profile.jpg";
import googleAdsImage from "@/assets/services/google-ads.jpg";
import metaAdsImage from "@/assets/services/meta-ads.jpg";
import localSeoImage from "@/assets/services/local-seo.jpg";
import reputationImage from "@/assets/services/reputation-management.jpg";
import websiteImage from "@/assets/services/website-development.jpg";
const serviceData: Record<string, { 
  color: string; 
  gradient: string;
  image: string;
}> = {
  "google-business-profile": {
    color: "#4285F4",
    gradient: "from-[#4285F4] to-[#1a5fd4]",
    image: gbpImage,
  },
  "google-ads": {
    color: "#EA4335",
    gradient: "from-[#EA4335] to-[#c5221f]",
    image: googleAdsImage,
  },
  "meta-ads": {
    color: "#1877F2",
    gradient: "from-[#1877F2] to-[#0d5cc9]",
    image: metaAdsImage,
  },
  "local-seo": {
    color: "#34A853",
    gradient: "from-[#34A853] to-[#1e7e34]",
    image: localSeoImage,
  },
  "reputation-management": {
    color: "#FBBC05",
    gradient: "from-[#FBBC05] to-[#d4a000]",
    image: reputationImage,
  },
  "website-development": {
    color: "#9333EA",
    gradient: "from-[#9333EA] to-[#7c22c9]",
    image: websiteImage,
  },
};

const ServiceDetail = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const heroRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  
  // Parallax scroll effects
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 150]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0.3]);
  const imageY = useTransform(scrollY, [0, 800], [0, -80]);
  
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
    setIsImageLoaded(false);
  }, [serviceId]);
  
  const service = serviceId ? serviceData[serviceId] : null;
  
  const handleBackToServices = () => {
    navigate('/#services', { replace: false });
  };
  
  if (!service) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-32 pb-20 text-center">
          <h1 className="text-3xl font-bold mb-4">Service not found</h1>
          <button 
            onClick={handleBackToServices}
            className="text-primary hover:underline"
          >
            Back to Services
          </button>
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
      <SEO 
        page="services" 
        serviceData={{
          id: serviceId!,
          image: service.image,
          color: service.color
        }}
      />
      <Header />
      
      {/* Hero Section with Parallax */}
      <section 
        ref={heroRef}
        className={`relative pt-28 pb-16 md:pt-36 md:pb-24 bg-gradient-to-br ${service.gradient} overflow-hidden`}
      >
        {/* Parallax Background Elements */}
        <motion.div 
          className="absolute inset-0 opacity-10"
          style={{ y: heroY }}
        >
          <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-white/20 blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-white/5 blur-3xl" />
        </motion.div>
        
        <motion.div 
          className="container-custom relative z-10"
          style={{ opacity: heroOpacity }}
        >
          <motion.button 
            onClick={handleBackToServices}
            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-8 transition-colors"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <ArrowLeft className="w-4 h-4" />
            {t('services.backToServices')}
          </motion.button>
          
          <motion.h1 
            className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6 }}
          >
            {title}
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-white/90 max-w-3xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.6 }}
          >
            {subtitle}
          </motion.p>
        </motion.div>
        
        {/* Decorative gradient overlay at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background/20 to-transparent" />
      </section>

      {/* Service Image Section with Parallax */}
      <section ref={imageRef} className="py-12 md:py-16 bg-muted/30 overflow-hidden">
        <div className="container-custom">
          <motion.div
            className="relative rounded-2xl overflow-hidden shadow-2xl max-w-4xl mx-auto"
            style={{ y: imageY }}
          >
            {/* Image glow effect */}
            <div
              className="absolute -inset-4 opacity-30 blur-2xl"
              style={{ background: `radial-gradient(circle, ${service.color} 0%, transparent 70%)` }}
            />

            {/* Keep layout stable + fade image in when loaded */}
            <div className="relative aspect-[25/17] rounded-2xl overflow-hidden">
              <div
                className={`absolute inset-0 bg-muted/60 transition-opacity duration-500 ${
                  isImageLoaded ? "opacity-0" : "opacity-100"
                }`}
                aria-hidden="true"
              />

              <img
                src={service.image}
                alt={title}
                loading="eager"
                decoding="async"
                onLoad={() => setIsImageLoaded(true)}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                  isImageLoaded ? "opacity-100" : "opacity-0"
                }`}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 md:py-24">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Left Column - Description */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
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
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * index, duration: 0.4 }}
                    viewport={{ once: true }}
                  >
                    <div 
                      className="flex-shrink-0 w-6 h-6 min-w-[1.5rem] min-h-[1.5rem] rounded-full flex items-center justify-center mt-0.5"
                      style={{ backgroundColor: `${service.color}20` }}
                    >
                      <Check className="w-4 h-4 flex-shrink-0" style={{ color: service.color }} />
                    </div>
                    <span className="text-foreground">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right Column - Benefits */}
            <motion.div 
              className="bg-muted/50 rounded-2xl p-8 md:p-10"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-6">
                {t('services.whyChooseUs')}
              </h2>
              
              <div className="space-y-6">
                {benefits.map((benefit, index) => (
                  <motion.div 
                    key={index}
                    className="flex items-start gap-4"
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.08 * index, duration: 0.4 }}
                    viewport={{ once: true }}
                  >
                    <div 
                      className="flex-shrink-0 w-8 h-8 min-w-[2rem] min-h-[2rem] rounded-lg flex items-center justify-center text-white font-bold text-sm"
                      style={{ backgroundColor: service.color }}
                    >
                      {index + 1}
                    </div>
                    <span className="text-muted-foreground leading-relaxed pt-1">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-muted/30 border-t border-border">
        <motion.div 
          className="container-custom text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t('services.cta.title')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            {t('services.cta.description')}
          </p>
          <Button 
            size="lg" 
            className="font-semibold px-8 hover:scale-105 transition-transform"
            style={{ backgroundColor: service.color }}
            asChild
          >
            <a href="mailto:sam@awsoon.com?subject=Inquiry about services">
              {t('services.cta.button')}
            </a>
          </Button>
        </motion.div>
      </section>

      <Footer />
    </motion.div>
  );
};

export default ServiceDetail;
