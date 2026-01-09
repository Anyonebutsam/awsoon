import { Mail, MapPin, Globe } from "lucide-react";
import { useTranslation } from "react-i18next";

const Contact = () => {
  const { t } = useTranslation();

  return (
    <section id="contact" className="section-padding bg-background">
      <div className="container-custom">
        <div className="text-center mb-16">
          <p className="text-sm font-medium text-primary uppercase tracking-wider mb-2">
            {t('contact.label')}
          </p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {t('contact.title')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('contact.subtitle')}
          </p>
        </div>

        <div className="max-w-2xl mx-auto text-center">
          <div className="space-y-8">
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center">
                <Mail className="w-8 h-8 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-foreground text-lg">{t('contact.info.email')}</p>
                <a
                  href="mailto:sam@awsoon.com"
                  className="text-primary hover:underline text-xl"
                >
                  sam@awsoon.com
                </a>
              </div>
            </div>

            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center">
                <MapPin className="w-8 h-8 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-foreground text-lg">{t('contact.info.location')}</p>
                <p className="text-muted-foreground">{t('contact.info.locationValue')}</p>
              </div>
            </div>

            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center">
                <Globe className="w-8 h-8 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-foreground text-lg">{t('contact.info.languages')}</p>
                <p className="text-muted-foreground">
                  {t('contact.info.languagesValue')}
                </p>
              </div>
            </div>
          </div>

          {/* Language badges */}
          <div className="flex flex-wrap justify-center gap-2 pt-8">
            {["🇸🇪 Swedish", "🇧🇬 Bulgarian", "🇫🇷 French", "🇸🇦 Arabic", "🇹🇳 Tunisian", "🇬🇧 English", "🇪🇸 Spanish"].map(
              (lang) => (
                <span
                  key={lang}
                  className="px-3 py-1.5 text-sm rounded-full bg-muted text-muted-foreground"
                >
                  {lang}
                </span>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
