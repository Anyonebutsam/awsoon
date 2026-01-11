import { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowRight, Clock, BookOpen, MapPin, Search, Megaphone, Users } from "lucide-react";
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
import updateHoursImg from "@/assets/blog/update-hours.jpg";
import bookingLinksImg from "@/assets/blog/booking-links.jpg";
import adsPhoneImg from "@/assets/blog/ads-phone.jpg";
import respondReviewsImg from "@/assets/blog/respond-reviews.jpg";
import addPhotosImg from "@/assets/blog/add-photos.jpg";
import transferOwnershipImg from "@/assets/blog/transfer-ownership.jpg";
import editProfileImg from "@/assets/blog/edit-profile.jpg";
import setMoreHoursImg from "@/assets/blog/set-more-hours.jpg";
import getMoreReviewsImg from "@/assets/blog/get-more-reviews.jpg";
import removeProfileImg from "@/assets/blog/remove-profile.jpg";
import createPostsImg from "@/assets/blog/create-posts.jpg";
import addProductsImg from "@/assets/blog/add-products.jpg";
import businessDescriptionImg from "@/assets/blog/business-description.jpg";

interface BlogArticle {
  id: string;
  image: string;
  readTime: string;
  stepsCount: number;
  tipsCount: number;
  serviceCategory: 'gbp' | 'seo' | 'marketing' | 'reputation' | 'all';
}

const blogArticles: BlogArticle[] = [
  {
    id: "claim-business",
    image: claimBusinessImg,
    readTime: "5 min",
    stepsCount: 4,
    tipsCount: 3,
    serviceCategory: "gbp",
  },
  {
    id: "add-managers",
    image: addManagersImg,
    readTime: "4 min",
    stepsCount: 5,
    tipsCount: 3,
    serviceCategory: "gbp",
  },
  {
    id: "local-ranking",
    image: localRankingImg,
    readTime: "7 min",
    stepsCount: 5,
    tipsCount: 3,
    serviceCategory: "seo",
  },
  {
    id: "ownership-conflict",
    image: ownershipConflictImg,
    readTime: "6 min",
    stepsCount: 5,
    tipsCount: 3,
    serviceCategory: "gbp",
  },
  {
    id: "handle-duplicates",
    image: handleDuplicatesImg,
    readTime: "5 min",
    stepsCount: 5,
    tipsCount: 3,
    serviceCategory: "gbp",
  },
  {
    id: "remove-reviews",
    image: removeReviewsImg,
    readTime: "5 min",
    stepsCount: 5,
    tipsCount: 4,
    serviceCategory: "reputation",
  },
  {
    id: "verify-profile",
    image: verifyProfileImg,
    readTime: "6 min",
    stepsCount: 5,
    tipsCount: 4,
    serviceCategory: "gbp",
  },
  {
    id: "update-hours",
    image: updateHoursImg,
    readTime: "4 min",
    stepsCount: 4,
    tipsCount: 3,
    serviceCategory: "gbp",
  },
  {
    id: "booking-links",
    image: bookingLinksImg,
    readTime: "6 min",
    stepsCount: 5,
    tipsCount: 4,
    serviceCategory: "gbp",
  },
  {
    id: "ads-phone",
    image: adsPhoneImg,
    readTime: "5 min",
    stepsCount: 4,
    tipsCount: 3,
    serviceCategory: "marketing",
  },
  {
    id: "respond-reviews",
    image: respondReviewsImg,
    readTime: "5 min",
    stepsCount: 5,
    tipsCount: 4,
    serviceCategory: "reputation",
  },
  {
    id: "add-photos",
    image: addPhotosImg,
    readTime: "4 min",
    stepsCount: 4,
    tipsCount: 3,
    serviceCategory: "gbp",
  },
  {
    id: "transfer-ownership",
    image: transferOwnershipImg,
    readTime: "5 min",
    stepsCount: 4,
    tipsCount: 3,
    serviceCategory: "gbp",
  },
  {
    id: "edit-profile",
    image: editProfileImg,
    readTime: "4 min",
    stepsCount: 4,
    tipsCount: 3,
    serviceCategory: "gbp",
  },
  {
    id: "set-more-hours",
    image: setMoreHoursImg,
    readTime: "4 min",
    stepsCount: 4,
    tipsCount: 3,
    serviceCategory: "gbp",
  },
  {
    id: "get-more-reviews",
    image: getMoreReviewsImg,
    readTime: "5 min",
    stepsCount: 4,
    tipsCount: 4,
    serviceCategory: "reputation",
  },
  {
    id: "remove-profile",
    image: removeProfileImg,
    readTime: "4 min",
    stepsCount: 4,
    tipsCount: 3,
    serviceCategory: "gbp",
  },
  {
    id: "create-posts",
    image: createPostsImg,
    readTime: "5 min",
    stepsCount: 5,
    tipsCount: 4,
    serviceCategory: "marketing",
  },
  {
    id: "add-products",
    image: addProductsImg,
    readTime: "5 min",
    stepsCount: 5,
    tipsCount: 3,
    serviceCategory: "gbp",
  },
  {
    id: "business-description",
    image: businessDescriptionImg,
    readTime: "4 min",
    stepsCount: 4,
    tipsCount: 4,
    serviceCategory: "seo",
  },
];

const serviceCategories = [
  { id: 'all', icon: null, label: 'blog.filters.all', color: '#6b7280' },
  { id: 'gbp', icon: MapPin, label: 'blog.filters.gbp', color: '#4285F4' },
  { id: 'seo', icon: Search, label: 'blog.filters.seo', color: '#34A853' },
  { id: 'marketing', icon: Megaphone, label: 'blog.filters.marketing', color: '#EA4335' },
  { id: 'reputation', icon: Users, label: 'blog.filters.reputation', color: '#FBBC05' },
];

const Blog = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedArticle, setSelectedArticle] = useState<BlogArticle | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>(searchParams.get('category') || 'all');

  // Update URL when category changes
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    if (category === 'all') {
      setSearchParams({});
    } else {
      setSearchParams({ category });
    }
  };

  // Filter articles by category
  const filteredArticles = activeCategory === 'all' 
    ? blogArticles 
    : blogArticles.filter(article => article.serviceCategory === activeCategory);

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
      <div className="min-h-screen bg-[#0a0a0f] dark">
        <Header />
        <motion.main 
          className="pt-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Article Header */}
          <div className="bg-gradient-to-br from-[#1a73e8] to-[#0d47a1] text-white py-16">
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
                <h2 className="font-display text-2xl font-bold text-gray-100">
                  {t('blog.stepByStepGuide')}
                </h2>
                {steps.map((step, index) => (
                  <motion.div 
                    key={index} 
                    className="flex gap-6"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-full bg-[#1a73e8] text-white flex items-center justify-center font-bold">
                        {index + 1}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-display text-xl font-semibold text-gray-100 mb-2">
                        {step.title}
                      </h3>
                      <p className="text-gray-400 leading-relaxed">
                        {step.content}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Tips */}
              {tips.length > 0 && (
                <div className="mt-12 p-6 bg-[#1a73e8]/10 border border-[#1a73e8]/30 rounded-2xl">
                  <h3 className="font-display text-xl font-semibold text-gray-100 mb-4">
                    {t('blog.proTips')}
                  </h3>
                  <ul className="space-y-3">
                    {tips.map((tip, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="text-[#1a73e8] font-bold">•</span>
                        <span className="text-gray-400">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* CTA */}
              <div className="mt-12 p-8 bg-gradient-to-br from-[#1a73e8]/20 to-[#1a73e8]/5 rounded-2xl text-center border border-[#1a73e8]/20">
                <h3 className="font-display text-2xl font-bold text-gray-100 mb-3">
                  {t('blog.cta.title')}
                </h3>
                <p className="text-gray-400 mb-6">
                  {t('blog.cta.description')}
                </p>
                <Button 
                  className="bg-[#1a73e8] hover:bg-[#1557b0] text-white font-semibold px-8"
                  asChild
                >
                  <a href="mailto:sam@awsoon.com?subject=I need help with my Google Business Profile">
                    {t('blog.cta.button')}
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </motion.main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] dark">
      <Header />
      <motion.main 
        className="pt-20"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ 
          type: "spring",
          stiffness: 100,
          damping: 20,
          duration: 0.5 
        }}
      >
        {/* Hero */}
        <div className="bg-gradient-to-br from-[#1a73e8] to-[#0d47a1] text-white py-20">
          <div className="container-custom text-center">
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              {t('blog.heroTitle')}
            </h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              {t('blog.heroSubtitle')}
            </p>
          </div>
        </div>

        {/* Category Filter */}
        <div className="container-custom py-8">
          <div className="flex flex-wrap justify-center gap-3">
            {serviceCategories.map((cat) => {
              const IconComponent = cat.icon;
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryChange(cat.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-300 border ${
                    isActive 
                      ? 'bg-white text-gray-900 border-white shadow-lg' 
                      : 'bg-transparent text-gray-400 border-gray-700 hover:border-gray-500 hover:text-gray-200'
                  }`}
                >
                  {IconComponent && <IconComponent className="w-4 h-4" style={{ color: isActive ? cat.color : undefined }} />}
                  {t(cat.label)}
                  {isActive && (
                    <span className="ml-1 px-1.5 py-0.5 text-xs bg-gray-200 text-gray-700 rounded-full">
                      {cat.id === 'all' ? blogArticles.length : blogArticles.filter(a => a.serviceCategory === cat.id).length}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Articles Grid */}
        <div className="container-custom pb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((article, index) => {
              const title = t(`blog.articles.${article.id}.title`);
              const description = t(`blog.articles.${article.id}.description`);
              const category = t(`blog.articles.${article.id}.category`);
              
              return (
                <motion.article
                  key={article.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.4 }}
                  className="group bg-[#12121a] border border-gray-800/50 rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-[#1a73e8]/10 transition-all duration-300 cursor-pointer"
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
                      <span className="px-2.5 py-1 bg-[#1a73e8]/20 text-[#4d9fff] text-xs font-medium rounded-full">
                        {category}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-gray-500">
                        <Clock className="w-3 h-3" />
                        {article.readTime}
                      </span>
                    </div>
                    <h2 className="font-display text-xl font-bold text-gray-100 mb-2 group-hover:text-[#4d9fff] transition-colors">
                      {title}
                    </h2>
                    <p className="text-gray-500 text-sm line-clamp-2">
                      {description}
                    </p>
                    <button className="mt-4 flex items-center gap-2 text-[#1a73e8] font-medium text-sm group-hover:gap-3 transition-all">
                      {t('blog.readMore')}
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-[#0d0d12] py-16 border-t border-gray-800/30">
          <div className="container-custom text-center">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-100 mb-4">
              {t('blog.bottomCta.title')}
            </h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto mb-8">
              {t('blog.bottomCta.description')}
            </p>
            <Button size="lg" className="bg-[#1a73e8] hover:bg-[#1557b0] text-white font-semibold px-8" asChild>
              <a href="mailto:sam@awsoon.com?subject=I need help with my Google Business Profile">
                {t('blog.bottomCta.button')}
                <ArrowRight className="w-5 h-5 ml-2" />
              </a>
            </Button>
          </div>
        </div>
      </motion.main>
      <Footer />
    </div>
  );
};

export default Blog;
