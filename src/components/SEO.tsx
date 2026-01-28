import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import type { TFunction } from 'i18next';

interface ArticleData {
  id: string;
  readTime: string;
  image: string;
  datePublished?: string;
  dateModified?: string;
}

interface ServiceData {
  id: string;
  image: string;
  color: string;
}

interface SEOProps {
  titleKey?: string;
  descriptionKey?: string;
  page?: string;
  articleData?: ArticleData;
  serviceData?: ServiceData;
}

const SEO = ({ titleKey, descriptionKey, page, articleData, serviceData }: SEOProps) => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const currentLang = i18n.language;

  useEffect(() => {
    // Determine the page type for SEO
    const pageName = page || 'home';
    
    // Get translated title and description
    const title = titleKey 
      ? t(titleKey) 
      : t(`seo.${pageName}.title`, { defaultValue: t('seo.home.title') });
    
    const description = descriptionKey 
      ? t(descriptionKey) 
      : t(`seo.${pageName}.description`, { defaultValue: t('seo.home.description') });

    const keywords = t(`seo.${pageName}.keywords`, { defaultValue: t('seo.home.keywords') });
    const siteName = 'AWSOON';
    const siteUrl = 'https://awsoon.lovable.app';
    const currentUrl = `${siteUrl}${location.pathname}`;
    const ogImage = 'https://awsoon.lovable.app/favicon.jpg';

    // Update document title
    document.title = title;

    // Helper to update or create meta tags
    const updateMetaTag = (selector: string, content: string, attribute = 'content') => {
      let element = document.querySelector(selector) as HTMLMetaElement | null;
      if (element) {
        element.setAttribute(attribute, content);
      } else {
        element = document.createElement('meta');
        const [attr, value] = selector.replace('[', '').replace(']', '').replace(/"/g, '').split('=');
        element.setAttribute(attr, value);
        element.setAttribute(attribute, content);
        document.head.appendChild(element);
      }
    };

    // Update basic meta tags
    updateMetaTag('meta[name="description"]', description);
    updateMetaTag('meta[name="keywords"]', keywords);
    updateMetaTag('meta[name="author"]', siteName);

    // Update Open Graph tags
    updateMetaTag('meta[property="og:title"]', title);
    updateMetaTag('meta[property="og:description"]', description);
    updateMetaTag('meta[property="og:url"]', currentUrl);
    updateMetaTag('meta[property="og:site_name"]', siteName);
    updateMetaTag('meta[property="og:locale"]', getLocaleCode(currentLang));
    updateMetaTag('meta[property="og:image"]', ogImage);
    updateMetaTag('meta[property="og:image:alt"]', t('seo.imageAlt'));

    // Update Twitter tags
    updateMetaTag('meta[name="twitter:title"]', title);
    updateMetaTag('meta[name="twitter:description"]', description);
    updateMetaTag('meta[name="twitter:image:alt"]', t('seo.imageAlt'));

    // Update canonical URL
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', currentUrl);

    // Update hreflang tags for international SEO
    updateHreflangTags(siteUrl, location.pathname);

    // Add JSON-LD structured data
    updateStructuredData(siteName, siteUrl, description, currentLang, location.pathname, t, articleData, serviceData);

  }, [currentLang, location.pathname, t, titleKey, descriptionKey, page, articleData, serviceData]);

  return null;
};

// Get proper locale code for Open Graph
const getLocaleCode = (lang: string): string => {
  const localeMap: Record<string, string> = {
    en: 'en_US',
    sv: 'sv_SE',
    bg: 'bg_BG',
    fr: 'fr_FR',
    ar: 'ar_SA',
    es: 'es_ES',
    tn: 'ar_TN'
  };
  return localeMap[lang] || 'en_US';
};

// Update hreflang tags for multi-language SEO
const updateHreflangTags = (siteUrl: string, pathname: string) => {
  // Remove existing hreflang tags
  document.querySelectorAll('link[hreflang]').forEach(el => el.remove());

  const languages = ['en', 'sv', 'bg', 'fr', 'ar', 'es', 'tn'];
  
  languages.forEach(lang => {
    const link = document.createElement('link');
    link.setAttribute('rel', 'alternate');
    link.setAttribute('hreflang', lang === 'tn' ? 'ar-TN' : lang);
    link.setAttribute('href', `${siteUrl}${pathname}?lang=${lang}`);
    document.head.appendChild(link);
  });

  // Add x-default
  const defaultLink = document.createElement('link');
  defaultLink.setAttribute('rel', 'alternate');
  defaultLink.setAttribute('hreflang', 'x-default');
  defaultLink.setAttribute('href', `${siteUrl}${pathname}`);
  document.head.appendChild(defaultLink);
};

// Generate WebPage schema for different page types
const generateWebPageSchema = (
  siteUrl: string,
  pathname: string,
  t: TFunction,
  siteName: string,
  description: string,
  lang: string
): object => {
  // Determine page type
  let pageType = 'WebPage';
  let pageName = t('seo.home.title', { defaultValue: 'Home' });
  
  if (pathname === '/' || pathname === '') {
    pageType = 'WebPage';
    pageName = t('seo.home.title', { defaultValue: 'Home' });
  } else if (pathname.startsWith('/blog/')) {
    pageType = 'Article';
    const articleId = pathname.split('/').pop();
    pageName = t(`blog.articles.${articleId}.title`, { defaultValue: 'Blog Article' });
  } else if (pathname === '/blog') {
    pageType = 'CollectionPage';
    pageName = t('seo.blog.title', { defaultValue: 'Blog' });
  } else if (pathname.startsWith('/services/')) {
    pageType = 'WebPage';
    const serviceId = pathname.split('/').pop();
    pageName = t(`services.pages.${serviceId}.title`, { defaultValue: 'Service' });
  }

  return {
    '@context': 'https://schema.org',
    '@type': pageType,
    '@id': `${siteUrl}${pathname}#webpage`,
    url: `${siteUrl}${pathname}`,
    name: pageName,
    description: description,
    inLanguage: lang,
    isPartOf: {
      '@id': `${siteUrl}/#website`
    },
    about: {
      '@id': `${siteUrl}/#organization`
    },
    primaryImageOfPage: {
      '@type': 'ImageObject',
      url: `${siteUrl}/favicon.jpg`
    }
  };
};

// Generate SiteNavigationElement schema
const generateNavigationSchema = (
  siteUrl: string,
  t: TFunction
): object => {
  const navItems = [
    { name: t('nav.services', { defaultValue: 'Services' }), url: `${siteUrl}/#services` },
    { name: t('nav.process', { defaultValue: 'Process' }), url: `${siteUrl}/#process` },
    { name: t('nav.pricing', { defaultValue: 'Pricing' }), url: `${siteUrl}/#pricing` },
    { name: t('nav.faq', { defaultValue: 'FAQ' }), url: `${siteUrl}/#faq` },
    { name: t('nav.blog', { defaultValue: 'Blog' }), url: `${siteUrl}/blog` },
    { name: t('nav.contact', { defaultValue: 'Contact' }), url: `${siteUrl}/#contact` }
  ];

  return {
    '@context': 'https://schema.org',
    '@type': 'SiteNavigationElement',
    '@id': `${siteUrl}/#navigation`,
    name: 'Main Navigation',
    hasPart: navItems.map((item, index) => ({
      '@type': 'SiteNavigationElement',
      position: index + 1,
      name: item.name,
      url: item.url
    }))
  };
};

// Generate ItemList schema for blog listing page
const generateBlogListSchema = (
  siteUrl: string,
  pathname: string,
  t: TFunction
): object | null => {
  if (pathname !== '/blog') {
    return null;
  }

  const blogArticles = [
    'claim-business', 'add-managers', 'local-ranking', 'ownership-conflict',
    'handle-duplicates', 'remove-reviews', 'verify-profile', 'update-hours',
    'booking-links', 'respond-reviews', 'add-photos', 'transfer-ownership',
    'edit-profile', 'set-more-hours', 'get-more-reviews', 'remove-profile',
    'create-posts', 'add-products', 'business-description'
  ];

  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': `${siteUrl}/blog#itemlist`,
    name: t('seo.blog.title', { defaultValue: 'Blog Articles' }),
    description: t('seo.blog.description', { defaultValue: 'Learn about Google Business Profile optimization' }),
    numberOfItems: blogArticles.length,
    itemListElement: blogArticles.map((articleId, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: `${siteUrl}/blog/${articleId}`,
      name: t(`blog.articles.${articleId}.title`, { defaultValue: articleId })
    }))
  };
};

// Generate Pricing/Offer schema for home page
const generatePricingSchema = (
  siteUrl: string,
  pathname: string,
  t: TFunction
): object | null => {
  if (pathname !== '/' && pathname !== '') {
    return null;
  }

  const pricingPlans = [
    {
      name: t('pricing.starter.name', { defaultValue: 'Starter' }),
      description: t('pricing.starter.description', { defaultValue: 'Perfect for small businesses' }),
      price: '299',
      currency: 'EUR'
    },
    {
      name: t('pricing.growth.name', { defaultValue: 'Growth' }),
      description: t('pricing.growth.description', { defaultValue: 'For growing businesses' }),
      price: '599',
      currency: 'EUR'
    },
    {
      name: t('pricing.enterprise.name', { defaultValue: 'Enterprise' }),
      description: t('pricing.enterprise.description', { defaultValue: 'Custom solutions' }),
      price: '999',
      currency: 'EUR'
    }
  ];

  return {
    '@context': 'https://schema.org',
    '@type': 'OfferCatalog',
    '@id': `${siteUrl}/#pricing`,
    name: t('pricing.title', { defaultValue: 'Pricing Plans' }),
    description: t('pricing.subtitle', { defaultValue: 'Choose the perfect plan for your business' }),
    itemListElement: pricingPlans.map((plan, index) => ({
      '@type': 'Offer',
      position: index + 1,
      name: plan.name,
      description: plan.description,
      price: plan.price,
      priceCurrency: plan.currency,
      priceValidUntil: '2025-12-31',
      availability: 'https://schema.org/InStock',
      seller: {
        '@id': `${siteUrl}/#organization`
      }
    }))
  };
};

// Generate Review schema for testimonials (home page)
const generateReviewSchema = (
  siteUrl: string,
  pathname: string,
  t: TFunction
): object | null => {
  // Only show review schema on home page
  if (pathname !== '/' && pathname !== '') {
    return null;
  }

  const testimonialText = t('hero.testimonial', { defaultValue: '' });
  
  if (!testimonialText) {
    return null;
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'Review',
    '@id': `${siteUrl}/#review`,
    reviewBody: testimonialText,
    reviewRating: {
      '@type': 'Rating',
      ratingValue: '5',
      bestRating: '5',
      worstRating: '1'
    },
    author: {
      '@type': 'Person',
      name: t('hero.happyClient', { defaultValue: 'Happy Client' }).replace('— ', '').replace('— ', '')
    },
    itemReviewed: {
      '@type': 'LocalBusiness',
      '@id': `${siteUrl}/#organization`,
      name: 'AWSOON'
    },
    datePublished: '2024-06-15'
  };
};

// Add JSON-LD structured data
const updateStructuredData = (
  siteName: string, 
  siteUrl: string, 
  description: string,
  lang: string,
  pathname: string,
  t: TFunction,
  articleData?: ArticleData,
  serviceData?: ServiceData
) => {
  // Remove existing structured data
  document.querySelectorAll('script[type="application/ld+json"]').forEach(el => el.remove());

  // Organization schema with AggregateRating and ContactPoint
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${siteUrl}/#organization`,
    name: siteName,
    url: siteUrl,
    logo: `${siteUrl}/favicon.jpg`,
    image: `${siteUrl}/favicon.jpg`,
    description: description,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Stockholm',
      addressCountry: 'SE'
    },
    email: 'sam@awsoon.com',
    priceRange: '€€',
    areaServed: [
      { '@type': 'Country', name: 'Sweden' },
      { '@type': 'Country', name: 'Bulgaria' },
      { '@type': 'Country', name: 'France' },
      { '@type': 'Country', name: 'Spain' },
      { '@type': 'Country', name: 'Tunisia' }
    ],
    knowsLanguage: ['en', 'sv', 'bg', 'fr', 'ar', 'es'],
    sameAs: [],
    serviceType: [
      'Digital Marketing',
      'Google Business Profile Management',
      'Local SEO',
      'Reputation Management',
      'Google Ads',
      'Meta Ads',
      'Website Development'
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      bestRating: '5',
      worstRating: '1',
      ratingCount: '47',
      reviewCount: '47'
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'sales',
        email: 'sam@awsoon.com',
        availableLanguage: ['English', 'Swedish', 'Bulgarian', 'French', 'Arabic', 'Spanish']
      },
      {
        '@type': 'ContactPoint',
        contactType: 'customer support',
        email: 'sam@awsoon.com',
        availableLanguage: ['English', 'Swedish', 'Bulgarian', 'French', 'Arabic', 'Spanish']
      }
    ],
    slogan: t('hero.slogan', { defaultValue: 'Swedish quality and precision.' }),
    foundingDate: '2024',
    numberOfEmployees: {
      '@type': 'QuantitativeValue',
      minValue: 1,
      maxValue: 10
    }
  };

  // Website schema with SearchAction for sitelinks
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteUrl}/#website`,
    url: siteUrl,
    name: siteName,
    description: description,
    inLanguage: lang,
    publisher: {
      '@id': `${siteUrl}/#organization`
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteUrl}/blog?search={search_term_string}`
      },
      'query-input': 'required name=search_term_string'
    }
  };

  // WebPage schema - dynamic based on page type
  const webPageSchema = generateWebPageSchema(siteUrl, pathname, t, siteName, description, lang);

  // Professional service schema
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: siteName,
    url: siteUrl,
    description: description,
    priceRange: '€€',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Stockholm',
      addressCountry: 'Sweden'
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Digital Marketing Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Google Business Profile Management'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Local SEO Services'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Google Ads Management'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Meta Ads (Facebook & Instagram)'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Reputation Management'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Website Development'
          }
        }
      ]
    }
  };

  // Breadcrumb schema
  const breadcrumbSchema = generateBreadcrumbSchema(siteUrl, pathname, t);

  // FAQ schema (only on home page)
  const faqSchema = generateFAQSchema(pathname, t);

  // Article schema (for blog posts)
  const articleSchema = generateArticleSchema(siteUrl, pathname, t, articleData);

  // Service page schema (for service detail pages)
  const servicePageSchema = generateServicePageSchema(siteUrl, pathname, t, serviceData);

  // Review schema (for home page testimonials)
  const reviewSchema = generateReviewSchema(siteUrl, pathname, t);

  // HowTo schema (for blog tutorial articles)
  const howToSchema = generateHowToSchema(siteUrl, pathname, t, articleData);

  // Navigation schema
  const navigationSchema = generateNavigationSchema(siteUrl, t);

  // Blog list schema
  const blogListSchema = generateBlogListSchema(siteUrl, pathname, t);

  // Pricing schema
  const pricingSchema = generatePricingSchema(siteUrl, pathname, t);

  // Video schema (for pages with video content)
  const videoSchema = generateVideoSchema(siteUrl, pathname, t, articleData);

  // Speakable schema (for voice search optimization)
  const speakableSchema = generateSpeakableSchema(siteUrl, pathname, t, articleData);

  // Person schema (for founder/team)
  const personSchema = generatePersonSchema(siteUrl);

  // Course schema (for educational blog content)
  const courseSchema = generateCourseSchema(siteUrl, pathname, t);

  // Event schema (for webinars/consultations)
  const eventSchema = generateEventSchema(siteUrl, t);

  // Software Application schema (for digital services)
  const softwareSchema = generateSoftwareSchema(siteUrl, t);

  // Action schema (for potential actions)
  const actionSchema = generateActionSchema(siteUrl, t);

  // Add schemas to head
  const schemas: object[] = [organizationSchema, websiteSchema, webPageSchema, serviceSchema, navigationSchema];
  if (breadcrumbSchema) {
    schemas.push(breadcrumbSchema);
  }
  if (faqSchema) {
    schemas.push(faqSchema);
  }
  if (articleSchema) {
    schemas.push(articleSchema);
  }
  if (servicePageSchema) {
    schemas.push(servicePageSchema);
  }
  if (reviewSchema) {
    schemas.push(reviewSchema);
  }
  if (howToSchema) {
    schemas.push(howToSchema);
  }
  if (blogListSchema) {
    schemas.push(blogListSchema);
  }
  if (pricingSchema) {
    schemas.push(pricingSchema);
  }
  if (videoSchema) {
    schemas.push(videoSchema);
  }
  if (speakableSchema) {
    schemas.push(speakableSchema);
  }
  if (personSchema) {
    schemas.push(personSchema);
  }
  if (courseSchema) {
    schemas.push(courseSchema);
  }
  if (eventSchema) {
    schemas.push(eventSchema);
  }
  if (softwareSchema) {
    schemas.push(softwareSchema);
  }
  if (actionSchema) {
    schemas.push(actionSchema);
  }
  
  schemas.forEach(schema => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);
  });
};

// Generate breadcrumb schema based on current path
const generateBreadcrumbSchema = (
  siteUrl: string,
  pathname: string,
  t: TFunction
): object | null => {
  const pathSegments = pathname.split('/').filter(Boolean);
  
  // Always start with home
  const breadcrumbItems: Array<{
    '@type': string;
    position: number;
    name: string;
    item: string;
  }> = [
    {
      '@type': 'ListItem',
      position: 1,
      name: t('nav.home', { defaultValue: 'Home' }),
      item: siteUrl
    }
  ];

  // Map path segments to readable names
  const segmentNames: Record<string, string> = {
    'blog': t('nav.blog', { defaultValue: 'Blog' }),
    'services': t('nav.services', { defaultValue: 'Services' }),
    'google-business-profile': t('services.googleBusinessProfile.title', { defaultValue: 'Google Business Profile' }),
    'google-ads': t('services.googleAds.title', { defaultValue: 'Google Ads' }),
    'meta-ads': t('services.metaAds.title', { defaultValue: 'Meta Ads' }),
    'local-seo': t('services.localSeo.title', { defaultValue: 'Local SEO' }),
    'reputation-management': t('services.reputationManagement.title', { defaultValue: 'Reputation Management' }),
    'website-development': t('services.websiteDevelopment.title', { defaultValue: 'Website Development' })
  };

  // Blog article mappings
  const blogArticles: Record<string, string> = {
    'claim-business': t('blog.articles.claimBusiness.title', { defaultValue: 'Claim Your Business' }),
    'verify-profile': t('blog.articles.verifyProfile.title', { defaultValue: 'Verify Your Profile' }),
    'edit-profile': t('blog.articles.editProfile.title', { defaultValue: 'Edit Your Profile' }),
    'add-photos': t('blog.articles.addPhotos.title', { defaultValue: 'Add Photos' }),
    'update-hours': t('blog.articles.updateHours.title', { defaultValue: 'Update Hours' }),
    'set-more-hours': t('blog.articles.setMoreHours.title', { defaultValue: 'Set More Hours' }),
    'create-posts': t('blog.articles.createPosts.title', { defaultValue: 'Create Posts' }),
    'respond-reviews': t('blog.articles.respondReviews.title', { defaultValue: 'Respond to Reviews' }),
    'get-more-reviews': t('blog.articles.getMoreReviews.title', { defaultValue: 'Get More Reviews' }),
    'remove-reviews': t('blog.articles.removeReviews.title', { defaultValue: 'Remove Reviews' }),
    'add-products': t('blog.articles.addProducts.title', { defaultValue: 'Add Products' }),
    'booking-links': t('blog.articles.bookingLinks.title', { defaultValue: 'Booking Links' }),
    'add-managers': t('blog.articles.addManagers.title', { defaultValue: 'Add Managers' }),
    'transfer-ownership': t('blog.articles.transferOwnership.title', { defaultValue: 'Transfer Ownership' }),
    'handle-duplicates': t('blog.articles.handleDuplicates.title', { defaultValue: 'Handle Duplicates' }),
    'ownership-conflict': t('blog.articles.ownershipConflict.title', { defaultValue: 'Ownership Conflict' }),
    'remove-profile': t('blog.articles.removeProfile.title', { defaultValue: 'Remove Profile' }),
    'local-ranking': t('blog.articles.localRanking.title', { defaultValue: 'Local Ranking' }),
    'business-description': t('blog.articles.businessDescription.title', { defaultValue: 'Business Description' })
  };

  let currentPath = '';
  pathSegments.forEach((segment, index) => {
    currentPath += `/${segment}`;
    const name = segmentNames[segment] || blogArticles[segment] || segment.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    
    breadcrumbItems.push({
      '@type': 'ListItem',
      position: index + 2,
      name: name,
      item: `${siteUrl}${currentPath}`
    });
  });

  // Only return breadcrumb if we have more than just home
  if (breadcrumbItems.length === 1) {
    return null;
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbItems
  };
};

// Generate FAQ schema for home page
const generateFAQSchema = (
  pathname: string,
  t: TFunction
): object | null => {
  // Only show FAQ schema on home page
  if (pathname !== '/' && pathname !== '') {
    return null;
  }

  const faqKeys = ['q1', 'q2', 'q3', 'q4', 'q5'];
  
  const mainEntity = faqKeys.map(key => ({
    '@type': 'Question',
    name: t(`faq.items.${key}.question`, { defaultValue: '' }),
    acceptedAnswer: {
      '@type': 'Answer',
      text: t(`faq.items.${key}.answer`, { defaultValue: '' })
    }
  })).filter(item => item.name && item.acceptedAnswer.text);

  if (mainEntity.length === 0) {
    return null;
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity
  };
};

// Generate HowTo schema for blog tutorial articles
const generateHowToSchema = (
  siteUrl: string,
  pathname: string,
  t: TFunction,
  articleData?: ArticleData
): object | null => {
  // Only generate for blog article pages with steps
  if (!pathname.startsWith('/blog/') || !articleData) {
    return null;
  }

  const articleId = articleData.id;
  const title = t(`blog.articles.${articleId}.title`, { defaultValue: '' });
  const description = t(`blog.articles.${articleId}.description`, { defaultValue: '' });

  if (!title) {
    return null;
  }

  // Get steps for this article
  const steps: Array<{ '@type': string; position: number; name: string; text: string }> = [];
  for (let i = 1; i <= 10; i++) {
    const stepTitleKey = `blog.articles.${articleId}.steps.step${i}.title`;
    const stepDescKey = `blog.articles.${articleId}.steps.step${i}.description`;
    const stepTitle = t(stepTitleKey, { defaultValue: '' });
    const stepDesc = t(stepDescKey, { defaultValue: '' });
    
    if (stepTitle && stepTitle !== stepTitleKey) {
      steps.push({
        '@type': 'HowToStep',
        position: i,
        name: stepTitle,
        text: stepDesc || stepTitle
      });
    }
  }

  // Only return HowTo schema if we have steps
  if (steps.length === 0) {
    return null;
  }

  // Estimate total time based on read time
  const readTimeMinutes = parseInt(articleData.readTime) || 5;

  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    '@id': `${siteUrl}${pathname}#howto`,
    name: title,
    description: description,
    image: articleData.image,
    totalTime: `PT${readTimeMinutes}M`,
    step: steps,
    author: {
      '@type': 'Organization',
      '@id': `${siteUrl}/#organization`,
      name: 'AWSOON'
    }
  };
};

// Generate Article schema for blog posts
const generateArticleSchema = (
  siteUrl: string,
  pathname: string,
  t: TFunction,
  articleData?: ArticleData
): object | null => {
  // Only generate for blog article pages
  if (!pathname.startsWith('/blog/') || !articleData) {
    return null;
  }

  const articleId = articleData.id;
  const title = t(`blog.articles.${articleId}.title`, { defaultValue: '' });
  const description = t(`blog.articles.${articleId}.description`, { defaultValue: '' });

  if (!title) {
    return null;
  }

  // Default dates - using a reasonable publication date
  const datePublished = articleData.datePublished || '2024-01-15';
  const dateModified = articleData.dateModified || '2025-01-20';

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${siteUrl}${pathname}#article`,
    headline: title,
    description: description,
    image: articleData.image,
    datePublished: datePublished,
    dateModified: dateModified,
    author: {
      '@type': 'Organization',
      '@id': `${siteUrl}/#organization`,
      name: 'AWSOON',
      url: siteUrl
    },
    publisher: {
      '@type': 'Organization',
      '@id': `${siteUrl}/#organization`,
      name: 'AWSOON',
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/favicon.jpg`
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteUrl}${pathname}`
    },
    articleSection: t(`blog.articles.${articleId}.category`, { defaultValue: 'Google Business Profile' }),
    wordCount: parseInt(articleData.readTime) * 200, // Estimate based on read time
    inLanguage: t('lang', { defaultValue: 'en' })
  };
};

// Generate Service page schema for service detail pages
const generateServicePageSchema = (
  siteUrl: string,
  pathname: string,
  t: TFunction,
  serviceData?: ServiceData
): object | null => {
  // Only generate for service pages
  if (!pathname.startsWith('/services/') || !serviceData) {
    return null;
  }

  const serviceId = serviceData.id;
  const title = t(`services.pages.${serviceId}.title`, { defaultValue: '' });
  const subtitle = t(`services.pages.${serviceId}.subtitle`, { defaultValue: '' });
  const description = t(`services.pages.${serviceId}.description`, { defaultValue: '' });

  if (!title) {
    return null;
  }

  // Get features for this service
  const features: string[] = [];
  for (let i = 1; i <= 8; i++) {
    const featureKey = `services.pages.${serviceId}.features.feature${i}`;
    const feature = t(featureKey, { defaultValue: '' });
    if (feature && feature !== featureKey) {
      features.push(feature);
    }
  }

  // Service type mapping
  const serviceTypeMap: Record<string, string> = {
    'google-business-profile': 'Business Profile Management',
    'google-ads': 'Advertising Service',
    'meta-ads': 'Social Media Advertising',
    'local-seo': 'SEO Services',
    'reputation-management': 'Reputation Management',
    'website-development': 'Web Development'
  };

  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${siteUrl}${pathname}#service`,
    name: title,
    description: description,
    serviceType: serviceTypeMap[serviceId] || 'Digital Marketing Service',
    provider: {
      '@type': 'Organization',
      '@id': `${siteUrl}/#organization`,
      name: 'AWSOON'
    },
    areaServed: [
      { '@type': 'Country', name: 'Sweden' },
      { '@type': 'Country', name: 'Bulgaria' },
      { '@type': 'Country', name: 'France' },
      { '@type': 'Country', name: 'Spain' },
      { '@type': 'Country', name: 'Tunisia' }
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: title,
      itemListElement: features.map((feature, index) => ({
        '@type': 'Offer',
        position: index + 1,
        itemOffered: {
          '@type': 'Service',
          name: feature
        }
      }))
    },
    image: serviceData.image,
    url: `${siteUrl}${pathname}`,
    slogan: subtitle
  };
};

// Generate VideoObject schema for pages with video content
const generateVideoSchema = (
  siteUrl: string,
  pathname: string,
  t: TFunction,
  articleData?: ArticleData
): object | null => {
  // Video content mapping - define videos for specific pages/articles
  const videoContent: Record<string, {
    name: string;
    description: string;
    thumbnailUrl: string;
    contentUrl?: string;
    embedUrl?: string;
    duration: string;
    uploadDate: string;
  }> = {
    // Home page promotional video
    '/': {
      name: t('video.home.name', { defaultValue: 'AWSOON - Digital Marketing & Google Business Profile Management' }),
      description: t('video.home.description', { defaultValue: 'Learn how AWSOON helps businesses improve their online presence with Google Business Profile optimization, Local SEO, and digital marketing services.' }),
      thumbnailUrl: `${siteUrl}/favicon.jpg`,
      duration: 'PT2M30S',
      uploadDate: '2024-06-01'
    },
    // Blog tutorial videos
    'claim-business': {
      name: t('blog.articles.claim-business.title', { defaultValue: 'How to Claim Your Google Business Profile' }),
      description: t('blog.articles.claim-business.description', { defaultValue: 'Step-by-step guide to claiming your business on Google' }),
      thumbnailUrl: `${siteUrl}/favicon.jpg`,
      duration: 'PT5M',
      uploadDate: '2024-01-15'
    },
    'verify-profile': {
      name: t('blog.articles.verify-profile.title', { defaultValue: 'How to Verify Your Google Business Profile' }),
      description: t('blog.articles.verify-profile.description', { defaultValue: 'Complete verification guide for your business' }),
      thumbnailUrl: `${siteUrl}/favicon.jpg`,
      duration: 'PT6M',
      uploadDate: '2024-01-20'
    },
    'local-ranking': {
      name: t('blog.articles.local-ranking.title', { defaultValue: 'How to Improve Local Search Rankings' }),
      description: t('blog.articles.local-ranking.description', { defaultValue: 'Tips and strategies for better local SEO' }),
      thumbnailUrl: `${siteUrl}/favicon.jpg`,
      duration: 'PT7M',
      uploadDate: '2024-02-01'
    },
    'respond-reviews': {
      name: t('blog.articles.respond-reviews.title', { defaultValue: 'How to Respond to Customer Reviews' }),
      description: t('blog.articles.respond-reviews.description', { defaultValue: 'Best practices for engaging with customer feedback' }),
      thumbnailUrl: `${siteUrl}/favicon.jpg`,
      duration: 'PT5M',
      uploadDate: '2024-02-15'
    },
    'get-more-reviews': {
      name: t('blog.articles.get-more-reviews.title', { defaultValue: 'How to Get More Customer Reviews' }),
      description: t('blog.articles.get-more-reviews.description', { defaultValue: 'Strategies to increase your review count' }),
      thumbnailUrl: `${siteUrl}/favicon.jpg`,
      duration: 'PT5M',
      uploadDate: '2024-03-01'
    }
  };

  // Check for home page
  if (pathname === '/' || pathname === '') {
    const homeVideo = videoContent['/'];
    if (homeVideo) {
      return {
        '@context': 'https://schema.org',
        '@type': 'VideoObject',
        '@id': `${siteUrl}/#video`,
        name: homeVideo.name,
        description: homeVideo.description,
        thumbnailUrl: homeVideo.thumbnailUrl,
        uploadDate: homeVideo.uploadDate,
        duration: homeVideo.duration,
        publisher: {
          '@type': 'Organization',
          '@id': `${siteUrl}/#organization`,
          name: 'AWSOON'
        },
        potentialAction: {
          '@type': 'WatchAction',
          target: siteUrl
        }
      };
    }
  }

  // Check for blog article pages with video content
  if (pathname.startsWith('/blog/') && articleData) {
    const articleId = articleData.id;
    const videoInfo = videoContent[articleId];
    
    if (videoInfo) {
      return {
        '@context': 'https://schema.org',
        '@type': 'VideoObject',
        '@id': `${siteUrl}${pathname}#video`,
        name: videoInfo.name,
        description: videoInfo.description,
        thumbnailUrl: articleData.image || videoInfo.thumbnailUrl,
        uploadDate: videoInfo.uploadDate,
        duration: videoInfo.duration,
        publisher: {
          '@type': 'Organization',
          '@id': `${siteUrl}/#organization`,
          name: 'AWSOON'
        },
        isPartOf: {
          '@type': 'Article',
          '@id': `${siteUrl}${pathname}#article`
        },
        potentialAction: {
          '@type': 'WatchAction',
          target: `${siteUrl}${pathname}`
        }
      };
    }
  }

  // Check for service pages
  if (pathname.startsWith('/services/')) {
    const serviceId = pathname.split('/').pop();
    const serviceName = t(`services.pages.${serviceId}.title`, { defaultValue: '' });
    const serviceDesc = t(`services.pages.${serviceId}.description`, { defaultValue: '' });
    
    if (serviceName && serviceName !== `services.pages.${serviceId}.title`) {
      return {
        '@context': 'https://schema.org',
        '@type': 'VideoObject',
        '@id': `${siteUrl}${pathname}#video`,
        name: `${serviceName} - AWSOON`,
        description: serviceDesc || `Learn about our ${serviceName} services`,
        thumbnailUrl: `${siteUrl}/favicon.jpg`,
        uploadDate: '2024-06-01',
        duration: 'PT3M',
        publisher: {
          '@type': 'Organization',
          '@id': `${siteUrl}/#organization`,
          name: 'AWSOON'
        },
        isPartOf: {
          '@type': 'Service',
          '@id': `${siteUrl}${pathname}#service`
        },
        potentialAction: {
          '@type': 'WatchAction',
          target: `${siteUrl}${pathname}`
        }
      };
    }
  }

  return null;
};

// Generate Speakable schema for voice search optimization
const generateSpeakableSchema = (
  siteUrl: string,
  pathname: string,
  t: TFunction,
  articleData?: ArticleData
): object | null => {
  // Speakable is best for articles and key landing pages
  if (pathname.startsWith('/blog/') && articleData) {
    const articleId = articleData.id;
    const title = t(`blog.articles.${articleId}.title`, { defaultValue: '' });
    const description = t(`blog.articles.${articleId}.description`, { defaultValue: '' });
    
    if (!title) return null;

    return {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      '@id': `${siteUrl}${pathname}#speakable`,
      name: title,
      speakable: {
        '@type': 'SpeakableSpecification',
        cssSelector: ['article h1', 'article h2', 'article p:first-of-type', '.step-title', '.pro-tips']
      },
      url: `${siteUrl}${pathname}`
    };
  }

  // Home page speakable
  if (pathname === '/' || pathname === '') {
    return {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      '@id': `${siteUrl}/#speakable`,
      name: t('seo.home.title', { defaultValue: 'AWSOON Digital Marketing' }),
      speakable: {
        '@type': 'SpeakableSpecification',
        cssSelector: ['h1', '.hero-description', '.services-title', '#faq']
      },
      url: siteUrl
    };
  }

  return null;
};

// Generate Person schema for founder/team
const generatePersonSchema = (
  siteUrl: string
): object => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${siteUrl}/#founder`,
    name: 'Sam',
    jobTitle: 'Founder & Digital Marketing Expert',
    worksFor: {
      '@type': 'Organization',
      '@id': `${siteUrl}/#organization`,
      name: 'AWSOON'
    },
    email: 'sam@awsoon.com',
    knowsAbout: [
      'Digital Marketing',
      'Google Business Profile',
      'Local SEO',
      'Google Ads',
      'Meta Ads',
      'Reputation Management',
      'Website Development'
    ],
    knowsLanguage: ['English', 'Swedish', 'Bulgarian', 'French', 'Arabic', 'Spanish']
  };
};

// Generate Course schema for educational blog content
const generateCourseSchema = (
  siteUrl: string,
  pathname: string,
  t: TFunction
): object | null => {
  // Only show on blog listing page
  if (pathname !== '/blog') {
    return null;
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    '@id': `${siteUrl}/blog#course`,
    name: t('blog.heroTitle', { defaultValue: 'Google Business Profile Mastery' }),
    description: t('blog.heroSubtitle', { defaultValue: 'Complete guide to mastering your Google Business Profile' }),
    provider: {
      '@type': 'Organization',
      '@id': `${siteUrl}/#organization`,
      name: 'AWSOON'
    },
    educationalLevel: 'Beginner to Advanced',
    inLanguage: ['en', 'sv', 'bg', 'fr', 'ar', 'es'],
    isAccessibleForFree: true,
    teaches: [
      'Google Business Profile optimization',
      'Local SEO strategies',
      'Review management',
      'Business visibility improvement',
      'Google Maps marketing'
    ],
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'online',
      courseWorkload: 'PT2H'
    }
  };
};

// Generate Event schema for webinars/consultations
const generateEventSchema = (
  siteUrl: string,
  t: TFunction
): object => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    '@id': `${siteUrl}/#consultation`,
    name: t('contact.title', { defaultValue: 'Free Digital Marketing Consultation' }),
    description: t('contact.subtitle', { defaultValue: 'Get a personalized strategy session for your business' }),
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OnlineEventAttendanceMode',
    location: {
      '@type': 'VirtualLocation',
      url: siteUrl
    },
    organizer: {
      '@type': 'Organization',
      '@id': `${siteUrl}/#organization`,
      name: 'AWSOON'
    },
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock',
      validFrom: '2024-01-01',
      url: `${siteUrl}/#contact`
    },
    performer: {
      '@type': 'Person',
      '@id': `${siteUrl}/#founder`,
      name: 'Sam'
    },
    startDate: '2025-01-01',
    endDate: '2025-12-31',
    isAccessibleForFree: true
  };
};

// Generate Software Application schema for digital services/tools
const generateSoftwareSchema = (
  siteUrl: string,
  t: TFunction
): object => {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    '@id': `${siteUrl}/#software`,
    name: 'AWSOON Digital Marketing Platform',
    description: t('seo.home.description', { defaultValue: 'Comprehensive digital marketing and Google Business Profile management services' }),
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'AggregateOffer',
      lowPrice: '299',
      highPrice: '999',
      priceCurrency: 'EUR',
      offerCount: '3'
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      ratingCount: '47',
      bestRating: '5',
      worstRating: '1'
    },
    author: {
      '@type': 'Organization',
      '@id': `${siteUrl}/#organization`,
      name: 'AWSOON'
    },
    featureList: [
      'Google Business Profile Management',
      'Local SEO Optimization',
      'Review Monitoring & Response',
      'Google Ads Campaign Management',
      'Meta Ads Management',
      'Website Development',
      'Multi-language Support',
      'Performance Analytics'
    ]
  };
};

// Generate Action schema for potential actions on the site
const generateActionSchema = (
  siteUrl: string,
  t: TFunction
): object => {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteUrl}/#actions`,
    url: siteUrl,
    potentialAction: [
      {
        '@type': 'CommunicateAction',
        name: 'Contact Us',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: 'mailto:sam@awsoon.com',
          actionPlatform: ['https://schema.org/EmailApplication']
        }
      },
      {
        '@type': 'ReadAction',
        name: 'Read Blog',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${siteUrl}/blog`
        }
      },
      {
        '@type': 'ViewAction',
        name: 'View Services',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${siteUrl}/#services`
        }
      },
      {
        '@type': 'SubscribeAction',
        name: 'Get Started',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${siteUrl}/#contact`
        }
      },
      {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${siteUrl}/blog?search={search_term_string}`
        },
        'query-input': 'required name=search_term_string'
      }
    ]
  };
};

export default SEO;
