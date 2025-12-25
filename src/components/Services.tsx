import { MapPin, Search, Megaphone, BarChart3, Users, Globe } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Services = () => {
  const services = [
    {
      icon: MapPin,
      title: "Google Business Profile Optimization",
      description: "Complete GBP management including profile setup, optimization, posts, reviews management, and local visibility enhancement.",
      features: ["Profile Optimization", "Review Management", "Weekly Posts", "Photo Updates"],
    },
    {
      icon: Search,
      title: "Local SEO Services",
      description: "Dominate local search results with our comprehensive local SEO strategies including citations, NAP consistency, and maps optimization.",
      features: ["Citation Building", "NAP Consistency", "Maps Optimization", "Local Keywords"],
    },
    {
      icon: Megaphone,
      title: "Digital Marketing Suite",
      description: "Full-service digital marketing including SEO, social media management, paid advertising, and content marketing.",
      features: ["SEO Strategy", "Social Media", "Paid Ads", "Content Marketing"],
    },
    {
      icon: BarChart3,
      title: "Analytics & Reporting",
      description: "Detailed performance tracking and insights to measure your ROI and make data-driven decisions for your marketing strategy.",
      features: ["Monthly Reports", "ROI Tracking", "Competitor Analysis", "Growth Metrics"],
    },
    {
      icon: Users,
      title: "Reputation Management",
      description: "Build and maintain a stellar online reputation with our review generation and response strategies.",
      features: ["Review Generation", "Response Templates", "Sentiment Analysis", "Brand Monitoring"],
    },
    {
      icon: Globe,
      title: "Multilingual Support",
      description: "Reach international audiences with marketing support in 7 languages including Swedish, Bulgarian, French, and more.",
      features: ["7 Languages", "Cultural Adaptation", "Local Markets", "Translation Services"],
    },
  ];

  return (
    <section id="services" className="section-padding bg-muted/50">
      <div className="container-custom">
        <div className="text-center mb-16">
          <p className="text-sm font-medium text-primary uppercase tracking-wider mb-2">
            Our Services
          </p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Everything You Need to Grow Online
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From local SEO to full digital marketing solutions, we provide comprehensive services 
            to help your business thrive in the digital landscape.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <Card
              key={service.title}
              className="card-hover bg-card border-border/50 overflow-hidden group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader className="pb-4">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <service.icon className="w-7 h-7 text-primary" />
                </div>
                <CardTitle className="font-display text-xl">{service.title}</CardTitle>
                <CardDescription className="text-muted-foreground leading-relaxed">
                  {service.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {service.features.map((feature) => (
                    <span
                      key={feature}
                      className="text-xs font-medium px-3 py-1 rounded-full bg-accent text-accent-foreground"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
