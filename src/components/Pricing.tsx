import { Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslation } from "react-i18next";

const Pricing = () => {
  const { t } = useTranslation();
  
  const packages = [
    {
      nameKey: "pricing.starter.title",
      price: "15",
      descriptionKey: "pricing.starter.description",
      featuresKey: "pricing.starter.features",
      popular: false,
    },
    {
      nameKey: "pricing.growth.title",
      price: "50",
      descriptionKey: "pricing.growth.description",
      featuresKey: "pricing.growth.features",
      popular: true,
    },
    {
      nameKey: "pricing.enterprise.title",
      price: "100",
      descriptionKey: "pricing.enterprise.description",
      featuresKey: "pricing.enterprise.features",
      popular: false,
    },
  ];

  const scrollToContact = () => {
    const element = document.querySelector("#contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="pricing" className="section-padding bg-muted/50">
      <div className="container-custom">
        <div className="text-center mb-16">
          <p className="text-sm font-medium text-primary uppercase tracking-wider mb-2">
            {t('pricing.label')}
          </p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {t('pricing.title')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('pricing.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {packages.map((pkg) => {
            const features = t(pkg.featuresKey, { returnObjects: true }) as string[];
            return (
              <Card
                key={pkg.nameKey}
                className={`relative card-hover ${
                  pkg.popular
                    ? "border-primary shadow-lg scale-105 bg-card"
                    : "border-border/50 bg-card"
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-sm font-bold px-4 py-1 rounded-full">
                    Most Popular
                  </div>
                )}

                <CardHeader className="text-center pb-2">
                  <CardTitle className="font-display text-2xl">{t(pkg.nameKey)}</CardTitle>
                  <div className="mt-4 mb-2">
                    <span className="text-sm text-muted-foreground">{t('pricing.from')}</span>
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-5xl font-bold text-foreground">€{pkg.price}</span>
                      <span className="text-muted-foreground">{t('pricing.perMonth')}</span>
                    </div>
                  </div>
                  <CardDescription className="text-muted-foreground">
                    {t(pkg.descriptionKey)}
                  </CardDescription>
                </CardHeader>

                <CardContent className="pt-6">
                  <ul className="space-y-3 mb-8">
                    {features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    onClick={scrollToContact}
                    className={`w-full group ${
                      pkg.popular
                        ? "bg-primary hover:bg-primary-hover text-primary-foreground"
                        : "bg-secondary hover:bg-secondary/80 text-secondary-foreground"
                    }`}
                  >
                    {t('pricing.contactUs')}
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <p className="text-center text-muted-foreground mt-12">
          {t('pricing.subtitle')}{" "}
          <button onClick={scrollToContact} className="text-primary hover:underline font-medium">
            {t('pricing.contactUs')}
          </button>
        </p>
      </div>
    </section>
  );
};

export default Pricing;