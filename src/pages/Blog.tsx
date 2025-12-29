import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowRight, Clock, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

// Import images
import claimBusinessImg from "@/assets/blog/claim-business.jpg";
import addManagersImg from "@/assets/blog/add-managers.jpg";
import localRankingImg from "@/assets/blog/local-ranking.jpg";
import ownershipConflictImg from "@/assets/blog/ownership-conflict.jpg";
import handleDuplicatesImg from "@/assets/blog/handle-duplicates.jpg";
import removeReviewsImg from "@/assets/blog/remove-reviews.jpg";
import verifyProfileImg from "@/assets/blog/verify-profile.jpg";

interface BlogArticle {
  id: string;
  image: string;
  readTime: string;
  stepsCount: number;
  tipsCount: number;
}

const blogArticles: BlogArticle[] = [
  {
    id: "claim-business",
    image: claimBusinessImg,
    readTime: "5 min",
    stepsCount: 4,
    tipsCount: 3,
  },
  {
    id: "add-managers",
    image: addManagersImg,
    readTime: "4 min",
    stepsCount: 5,
    tipsCount: 3,
  },
  {
    id: "local-ranking",
    image: localRankingImg,
    readTime: "7 min",
    stepsCount: 5,
    tipsCount: 3,
  },
  {
    id: "ownership-conflict",
    image: ownershipConflictImg,
    readTime: "6 min",
    stepsCount: 5,
    tipsCount: 3,
  },
  {
    id: "handle-duplicates",
    image: handleDuplicatesImg,
    readTime: "5 min",
    stepsCount: 5,
    tipsCount: 3,
  },
  {
    id: "remove-reviews",
    image: removeReviewsImg,
    readTime: "5 min",
    stepsCount: 5,
    tipsCount: 4,
  },
  {
    id: "verify-profile",
    image: verifyProfileImg,
    readTime: "6 min",
    stepsCount: 5,
    tipsCount: 4,
  },
];

const Blog = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [selectedArticle, setSelectedArticle] = useState<BlogArticle | null>(null);

  // Handle browser back button
  useEffect(() => {
    if (selectedArticle) {
      window.history.pushState({ article: selectedArticle.id }, '', `/blog/${selectedArticle.id}`);
    }

    const handlePopState = (event: PopStateEvent) => {
      if (selectedArticle) {
        setSelectedArticle(null);
        // Push blog state to prevent going to home
        window.history.pushState({ blog: true }, '', '/blog');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [selectedArticle]);

  const getSteps = (articleId: string) => {
    const stepsArray = [];
    for (let i = 1; i <= 10; i++) {
      const titleKey = `blog.articles.${articleId}.steps.step${i}.title`;
      const contentKey = `blog.articles.${articleId}.steps.step${i}.content`;
      const title = t(titleKey);
      const content = t(contentKey);
      if (title !== titleKey && content !== contentKey) {
        stepsArray.push({ title, content });
      }
    }
    return stepsArray;
  };

  const getTips = (articleId: string) => {
    const tipsArray = [];
    for (let i = 1; i <= 10; i++) {
      const tipKey = `blog.articles.${articleId}.tips.tip${i}`;
      const tip = t(tipKey);
      if (tip !== tipKey) {
        tipsArray.push(tip);
      }
    }
    return tipsArray;
  };

  if (selectedArticle) {
    const steps = getSteps(selectedArticle.id);
    const tips = getTips(selectedArticle.id);
    const title = t(`blog.articles.${selectedArticle.id}.title`);
    const description = t(`blog.articles.${selectedArticle.id}.description`);
    const category = t(`blog.articles.${selectedArticle.id}.category`);

    return (
      <div className="min-h-screen bg-hero-bg">
        <Header />
        <main className="pt-20">
          {/* Article Header */}
          <div className="bg-gradient-to-br from-primary to-primary-hover text-white py-16">
            <div className="container-custom">
              <button
                onClick={() => setSelectedArticle(null)}
                className="flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors"
              >
                ← {t('blog.backToBlog')}
              </button>
              <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-sm font-medium mb-4">
                {category}
              </span>
              <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                {title}
              </h1>
              <p className="text-lg text-white/80 max-w-2xl">
                {description}
              </p>
              <div className="flex items-center gap-4 mt-6 text-white/70">
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {selectedArticle.readTime} {t('blog.read')}
                </span>
                <span className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  {steps.length} {t('blog.steps')}
                </span>
              </div>
            </div>
          </div>

          {/* Article Content */}
          <div className="container-custom py-16">
            <div className="max-w-4xl mx-auto">
              {/* Featured Image */}
              <img
                src={selectedArticle.image}
                alt={title}
                className="w-full rounded-2xl mb-12 shadow-lg"
              />

              {/* Steps */}
              <div className="space-y-8">
                <h2 className="font-display text-2xl font-bold text-foreground">
                  {t('blog.stepByStepGuide')}
                </h2>
                {steps.map((step, index) => (
                  <div key={index} className="flex gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                        {index + 1}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                        {step.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {step.content}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Tips */}
              {tips.length > 0 && (
                <div className="mt-12 p-6 bg-primary/5 border border-primary/20 rounded-2xl">
                  <h3 className="font-display text-xl font-semibold text-foreground mb-4">
                    {t('blog.proTips')}
                  </h3>
                  <ul className="space-y-3">
                    {tips.map((tip, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="text-primary font-bold">•</span>
                        <span className="text-muted-foreground">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* CTA */}
              <div className="mt-12 p-8 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl text-center">
                <h3 className="font-display text-2xl font-bold text-foreground mb-3">
                  {t('blog.cta.title')}
                </h3>
                <p className="text-muted-foreground mb-6">
                  {t('blog.cta.description')}
                </p>
                <Button 
                  className="bg-primary hover:bg-primary-hover text-primary-foreground font-semibold px-8"
                  onClick={() => window.location.href = '/#contact'}
                >
                  {t('blog.cta.button')}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-hero-bg">
      <Header />
      <main className="pt-20">
        {/* Hero */}
        <div className="bg-gradient-to-br from-primary to-primary-hover text-white py-20">
          <div className="container-custom text-center">
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              {t('blog.heroTitle')}
            </h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              {t('blog.heroSubtitle')}
            </p>
          </div>
        </div>

        {/* Articles Grid */}
        <div className="container-custom py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogArticles.map((article) => {
              const title = t(`blog.articles.${article.id}.title`);
              const description = t(`blog.articles.${article.id}.description`);
              const category = t(`blog.articles.${article.id}.category`);
              
              return (
                <article
                  key={article.id}
                  className="group bg-card border border-border/50 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer"
                  onClick={() => setSelectedArticle(article)}
                >
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={article.image}
                      alt={title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="px-2.5 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                        {category}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        {article.readTime}
                      </span>
                    </div>
                    <h2 className="font-display text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {title}
                    </h2>
                    <p className="text-muted-foreground text-sm line-clamp-2">
                      {description}
                    </p>
                    <button className="mt-4 flex items-center gap-2 text-primary font-medium text-sm group-hover:gap-3 transition-all">
                      {t('blog.readMore')}
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-hero-bg/50 py-16 border-t border-border/20">
          <div className="container-custom text-center">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              {t('blog.bottomCta.title')}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              {t('blog.bottomCta.description')}
            </p>
            <Link to="/#contact">
              <Button size="lg" className="bg-primary hover:bg-primary-hover text-primary-foreground font-semibold px-8">
                {t('blog.bottomCta.button')}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
