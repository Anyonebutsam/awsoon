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

  // Organization schema with AggregateRating
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
      addressLocality: 'Sofia',
      addressCountry: 'BG'
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
    }
  };

  // Website schema
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
    }
  };

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
      addressLocality: 'Sofia',
      addressCountry: 'Bulgaria'
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

  // Add schemas to head
  const schemas: object[] = [organizationSchema, websiteSchema, serviceSchema];
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

export default SEO;
