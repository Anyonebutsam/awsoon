import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      question: "What services do you offer?",
      answer: "We offer comprehensive digital marketing services including Google Business Profile optimization, Local SEO, citation building, reputation management, social media management, paid advertising, and content marketing. Our services are tailored to help businesses improve their online visibility and attract more customers.",
    },
    {
      question: "How long until I see results?",
      answer: "Results timeline varies based on your current online presence and competition. Typically, clients start seeing improvements in their Google Business Profile within 2-4 weeks. For SEO and local rankings, significant improvements usually appear within 2-3 months. We provide monthly reports so you can track progress.",
    },
    {
      question: "What languages do you support?",
      answer: "Our team provides support in 7 languages: Swedish, Bulgarian, French, Arabic, Tunisian, English, and Spanish. This allows us to serve clients across Europe and the Middle East effectively, ensuring clear communication and culturally appropriate marketing strategies.",
    },
    {
      question: "Do you work with businesses outside Bulgaria?",
      answer: "Absolutely! While we're based in Sofia, Bulgaria, we work with clients worldwide. Our multilingual team and remote-first approach allow us to serve businesses across Europe, the Middle East, and beyond. We've successfully helped clients in Sweden, France, Spain, and many other countries.",
    },
    {
      question: "How do I get started?",
      answer: "Getting started is easy! Simply fill out our contact form or send us an email at sam@awsoon.com. We'll schedule a free discovery call to understand your business needs and goals. After the consultation, we'll provide a customized proposal with recommendations and pricing.",
    },
    {
      question: "What makes AWSOON different from other agencies?",
      answer: "We combine Swedish quality standards and precision with competitive Bulgarian pricing, offering exceptional value. Our multilingual team, personalized approach, and focus on measurable results set us apart. We don't just optimize—we become your partners in growth.",
    },
  ];

  return (
    <section id="faq" className="section-padding bg-muted/50">
      <div className="container-custom">
        <div className="text-center mb-16">
          <p className="text-sm font-medium text-primary uppercase tracking-wider mb-2">
            FAQ
          </p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Find answers to common questions about our services and process.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-card border border-border/50 rounded-xl px-6 data-[state=open]:border-primary/50"
              >
                <AccordionTrigger className="text-left font-semibold text-foreground hover:text-primary py-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-6 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
