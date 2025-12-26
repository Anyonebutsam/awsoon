import { Search, ClipboardCheck, Rocket, BarChart } from "lucide-react";
import { useTranslation } from "react-i18next";

const Process = () => {
  const { t } = useTranslation();
  
  const steps = [
    {
      icon: Search,
      step: "01",
      titleKey: "process.steps.discovery.title",
      descriptionKey: "process.steps.discovery.description",
    },
    {
      icon: ClipboardCheck,
      step: "02",
      titleKey: "process.steps.audit.title",
      descriptionKey: "process.steps.audit.description",
    },
    {
      icon: Rocket,
      step: "03",
      titleKey: "process.steps.implementation.title",
      descriptionKey: "process.steps.implementation.description",
    },
    {
      icon: BarChart,
      step: "04",
      titleKey: "process.steps.reporting.title",
      descriptionKey: "process.steps.reporting.description",
    },
  ];

  return (
    <section id="process" className="section-padding bg-background">
      <div className="container-custom">
        <div className="text-center mb-16">
          <p className="text-sm font-medium text-primary uppercase tracking-wider mb-2">
            {t('process.label')}
          </p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {t('process.title')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('process.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div
              key={step.step}
              className="relative group"
            >
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 left-1/2 w-full h-0.5 bg-gradient-to-r from-primary/50 to-primary/20" />
              )}

              <div className="relative bg-card rounded-2xl p-8 border border-border/50 card-hover text-center">
                {/* Step number */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-sm font-bold px-4 py-1 rounded-full">
                  {step.step}
                </div>

                {/* Icon */}
                <div className="w-16 h-16 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <step.icon className="w-8 h-8 text-primary" />
                </div>

                {/* Content */}
                <h3 className="font-display text-xl font-bold text-foreground mb-3">
                  {t(step.titleKey)}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {t(step.descriptionKey)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;