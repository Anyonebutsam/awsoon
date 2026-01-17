import { Button } from "@/components/ui/button";
import { Globe, ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";

const Hero = () => {
  const { t, i18n } = useTranslation();
  
  const languages = [
    { name: "English", flag: "🇬🇧", code: "en" },
    { name: "Swedish", flag: "🇸🇪", code: "sv" },
    { name: "Bulgarian", flag: "🇧🇬", code: "bg" },
    { name: "French", flag: "🇫🇷", code: "fr" },
    { name: "Arabic", flag: "🇸🇦", code: "ar" },
    { name: "Spanish", flag: "🇪🇸", code: "es" },
    { name: "Tunisian", flag: "🇹🇳", code: "tn" },
  ];

  const handleLanguageChange = (code: string) => {
    i18n.changeLanguage(code);
  };

  const scrollToContact = () => {
    const element = document.querySelector("#contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen hero-gradient text-white overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="relative container-custom pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8 animate-fade-in">
            <Globe className="w-4 h-4 text-primary-glow" />
            <span className="text-sm font-medium">{t('hero.badge')}</span>
          </div>

          {/* Main Headline */}
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-6 animate-fade-in-up">
            {t('hero.headline')}{" "}
            <span className="text-gradient">{t('hero.headlineHighlight')}</span>
          </h1>

          {/* Slogan */}
          <p className="text-xl md:text-2xl text-white/80 mb-4 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            {t('hero.slogan')}
          </p>

          {/* Subheadline */}
          <p className="text-lg text-white/60 mb-8 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            {t('hero.subheadline')}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            <Button
              onClick={scrollToContact}
              size="lg"
              className="bg-primary hover:bg-primary-hover text-primary-foreground font-semibold px-8 py-6 text-lg glow-effect group"
            >
              {t('hero.talkToSales')}
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              onClick={scrollToContact}
              size="lg"
              variant="outline"
              className="border-white/30 bg-white/5 hover:bg-white/10 text-white px-8 py-6 text-lg"
            >
              {t('hero.getStarted')}
            </Button>
          </div>

          <div className="animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
            <p className="text-sm text-white/50 mb-4">{t('hero.languageSupport')}</p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {languages.map((lang) => (
                <button
                  key={lang.name}
                  onClick={() => handleLanguageChange(lang.code)}
                  className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full backdrop-blur-sm border text-sm transition-all duration-300 hover:scale-105 cursor-pointer ${
                    i18n.language === lang.code 
                      ? "bg-primary/30 border-primary/50 ring-2 ring-primary/30" 
                      : "bg-white/10 border-white/10 hover:bg-white/20 hover:border-white/20"
                  }`}
                >
                  <span>{lang.flag}</span>
                  <span className="text-white/80">{lang.name}</span>
                </button>
              ))}
            </div>
            <p className="text-xs text-white/40 mt-3">{t('hero.selectLanguage')}</p>
          </div>

        </div>
      </div>

    </section>
  );
};

export default Hero;