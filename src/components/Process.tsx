import { Search, ClipboardCheck, Rocket, BarChart } from "lucide-react";

const Process = () => {
  const steps = [
    {
      icon: Search,
      step: "01",
      title: "Discovery",
      description: "We start by understanding your business, goals, target audience, and current online presence through a detailed consultation.",
    },
    {
      icon: ClipboardCheck,
      step: "02",
      title: "Audit & Strategy",
      description: "Our team conducts a comprehensive audit of your digital footprint and develops a customized strategy tailored to your needs.",
    },
    {
      icon: Rocket,
      step: "03",
      title: "Implementation",
      description: "We execute the optimization plan with precision, implementing best practices and industry-leading techniques.",
    },
    {
      icon: BarChart,
      step: "04",
      title: "Reporting & Support",
      description: "Receive detailed monthly reports on your progress with ongoing support and continuous optimization for maximum results.",
    },
  ];

  return (
    <section id="process" className="section-padding bg-background">
      <div className="container-custom">
        <div className="text-center mb-16">
          <p className="text-sm font-medium text-primary uppercase tracking-wider mb-2">
            Our Process
          </p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            How We Work
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A proven 4-step process designed to deliver measurable results for your business.
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
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
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
