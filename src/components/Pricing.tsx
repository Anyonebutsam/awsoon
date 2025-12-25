import { Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Pricing = () => {
  const packages = [
    {
      name: "Starter",
      price: "15",
      description: "Perfect for single location businesses looking to improve their online presence.",
      features: [
        "Google Business Profile Setup",
        "Basic Profile Optimization",
        "Monthly Performance Report",
        "Email Support",
        "2 Posts per Month",
      ],
      popular: false,
    },
    {
      name: "Growth",
      price: "50",
      description: "Ideal for businesses with 5-10 locations wanting to dominate local search.",
      features: [
        "Everything in Starter",
        "Advanced SEO Optimization",
        "Citation Building",
        "Review Management",
        "Weekly Posts",
        "Priority Support",
        "Competitor Analysis",
      ],
      popular: true,
    },
    {
      name: "Enterprise",
      price: "100",
      description: "Custom solutions for businesses with 10+ locations and complex needs.",
      features: [
        "Everything in Growth",
        "Dedicated Account Manager",
        "Custom Reporting Dashboard",
        "Multi-location Management",
        "Reputation Monitoring",
        "Social Media Management",
        "Paid Ads Management",
        "Monthly Strategy Calls",
      ],
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
            Pricing Plans
          </p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Swedish quality and precision with Bulgarian prices. Choose the plan that fits your business needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {packages.map((pkg) => (
            <Card
              key={pkg.name}
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
                <CardTitle className="font-display text-2xl">{pkg.name}</CardTitle>
                <div className="mt-4 mb-2">
                  <span className="text-sm text-muted-foreground">From</span>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-5xl font-bold text-foreground">€{pkg.price}</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                </div>
                <CardDescription className="text-muted-foreground">
                  {pkg.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="pt-6">
                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
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
                  Contact for Custom Quote
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <p className="text-center text-muted-foreground mt-12">
          Need a custom solution? <button onClick={scrollToContact} className="text-primary hover:underline font-medium">Contact us</button> for a tailored package.
        </p>
      </div>
    </section>
  );
};

export default Pricing;
