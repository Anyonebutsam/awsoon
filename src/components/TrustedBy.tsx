import { useTranslation } from "react-i18next";
import awsoonLogo from "@/assets/awsoon-logo.jpg";
import telusLogo from "@/assets/brands/telus-digital.png";
import avantiLogo from "@/assets/brands/avanti.png";
import serdikaLogo from "@/assets/brands/serdika-center.jpg";

const TrustedBy = () => {
  const { t } = useTranslation();
  
  const brands = [
    {
      name: "TELUS Digital",
      logo: telusLogo,
    },
    {
      name: "Avanti-BG",
      logo: avantiLogo,
    },
    {
      name: "Serdika Center",
      logo: serdikaLogo,
    },
  ];

  return (
    <section className="section-padding bg-background">
      <div className="container-custom">
        {/* AWSOON Logo Feature */}
        <div className="flex justify-center mb-12">
          <img 
            src={awsoonLogo} 
            alt="AWSOON" 
            className="h-24 md:h-32 rounded-2xl shadow-lg"
          />
        </div>

        <div className="text-center mb-12">
          <p className="text-sm font-medium text-primary uppercase tracking-wider mb-2">
            {t('trustedBy.label')}
          </p>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
            {t('trustedBy.title')}
          </h2>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
          {brands.map((brand) => (
            <div
              key={brand.name}
              className="flex items-center justify-center h-12 md:h-16 w-32 md:w-40 grayscale hover:grayscale-0 opacity-70 hover:opacity-100 transition-all duration-300"
            >
              <img
                src={brand.logo}
                alt={brand.name}
                className="max-h-full max-w-full object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustedBy;
