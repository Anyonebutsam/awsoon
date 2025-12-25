import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowRight, Clock, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

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
  title: string;
  description: string;
  image: string;
  readTime: string;
  category: string;
  steps: {
    title: string;
    content: string;
  }[];
  tips?: string[];
}

const blogArticles: BlogArticle[] = [
  {
    id: "claim-business",
    title: "How to Claim Your Business on Google",
    description: "Learn how to add or claim your Google Business Profile to control how your business appears on Search and Maps.",
    image: claimBusinessImg,
    readTime: "5 min",
    category: "Getting Started",
    steps: [
      {
        title: "Go to Google Business",
        content: "Visit business.google.com/add and click 'Add your business to Google'."
      },
      {
        title: "Enter Your Business Details",
        content: "Fill in your business name, address, phone number, and category. Make sure all information is accurate."
      },
      {
        title: "Search for Existing Listing",
        content: "Google will search for existing profiles. If your business exists, you can claim it. If not, you'll create a new one."
      },
      {
        title: "Verify Your Business",
        content: "Choose a verification method (postcard, phone, email, or video) and follow the instructions."
      }
    ],
    tips: [
      "Only businesses eligible for a Business Profile can add or claim their location on Google.",
      "You can add or claim your business at no charge.",
      "If a verified profile exists, you'll need to request ownership from the current owner."
    ]
  },
  {
    id: "add-managers",
    title: "How to Add Managers to Your Business Profile",
    description: "Invite owners and managers to help manage your Google Business Profile and handle daily operations.",
    image: addManagersImg,
    readTime: "4 min",
    category: "Team Management",
    steps: [
      {
        title: "Access Your Business Profile",
        content: "Go to business.google.com and sign in to your Google Account."
      },
      {
        title: "Navigate to People Settings",
        content: "Click on the profile you want to manage, then select 'People and access' from the menu."
      },
      {
        title: "Add New User",
        content: "Click 'Add' and enter the email address of the person you want to add."
      },
      {
        title: "Choose Role",
        content: "Select either 'Owner' (full access) or 'Manager' (can edit but not add/remove users)."
      },
      {
        title: "Send Invitation",
        content: "Click 'Invite' and the person will receive an email to accept the invitation."
      }
    ],
    tips: [
      "Each user needs their own Google Account to access the Business Profile.",
      "A profile can have multiple owners but only one primary owner.",
      "Managers can't add or remove users or delete the profile."
    ]
  },
  {
    id: "local-ranking",
    title: "Tips to Improve Your Local Ranking on Google",
    description: "Discover strategies to boost your business visibility in local search results on Google Maps and Search.",
    image: localRankingImg,
    readTime: "7 min",
    category: "SEO & Ranking",
    steps: [
      {
        title: "Keep Information Up-to-Date",
        content: "Ensure your address, phone number, business hours, and category are complete and accurate."
      },
      {
        title: "Verify Your Business",
        content: "Verified businesses are more likely to show up in search results. Complete the verification process."
      },
      {
        title: "Add Photos and Updates",
        content: "Regularly add high-quality photos and post updates about your products, services, or events."
      },
      {
        title: "Manage Reviews",
        content: "Respond to customer reviews, both positive and negative. This shows engagement and builds trust."
      },
      {
        title: "Optimize Your Description",
        content: "Write a compelling business description that includes relevant keywords naturally."
      }
    ],
    tips: [
      "Complete profiles with accurate info are more likely to appear in relevant searches.",
      "Photos of your business, products, and team can increase customer engagement.",
      "Responding to reviews shows you value customer feedback."
    ]
  },
  {
    id: "ownership-conflict",
    title: "How to Handle Business Profile Ownership Conflicts",
    description: "Learn how to request ownership of a Business Profile that's currently managed by someone else.",
    image: ownershipConflictImg,
    readTime: "6 min",
    category: "Account Management",
    steps: [
      {
        title: "Find Your Business",
        content: "Go to business.google.com/add and search for your business name and address."
      },
      {
        title: "Select Your Business",
        content: "Choose your business from the list. You'll see a message saying 'Someone else may manage this Business Profile'."
      },
      {
        title: "Request Access",
        content: "Click 'Request access' if you're authorized to manage the business."
      },
      {
        title: "Fill Out the Form",
        content: "Complete the ownership request form with your relationship to the business."
      },
      {
        title: "Wait for Response",
        content: "The current owner has 3 days to respond. If no response, you may be able to claim the profile."
      }
    ],
    tips: [
      "If the request is denied, you can appeal the decision.",
      "For Service Area Businesses without a physical location, contact Google support directly.",
      "Keep documentation proving your association with the business."
    ]
  },
  {
    id: "handle-duplicates",
    title: "How to Handle Duplicate Business Profiles",
    description: "Resolve issues with multiple profiles for the same business to avoid misleading customers.",
    image: handleDuplicatesImg,
    readTime: "5 min",
    category: "Account Management",
    steps: [
      {
        title: "Identify the Duplicate",
        content: "Search for your business on Google Maps to find any duplicate listings."
      },
      {
        title: "Determine Which to Keep",
        content: "Keep the verified profile with the most reviews and complete information."
      },
      {
        title: "Request Ownership",
        content: "If you don't own both profiles, request ownership of the one you want to keep."
      },
      {
        title: "Suggest an Edit",
        content: "For the duplicate, click 'Suggest an edit' and select 'Close or remove' then 'Duplicate of another place'."
      },
      {
        title: "Contact Support",
        content: "If the duplicate persists, contact Google Business Profile support for assistance."
      }
    ],
    tips: [
      "Multiple profiles for the same business are against Google's policies.",
      "Duplicate profiles may not show on Google Search or Maps.",
      "If a verified profile exists and is owned by someone else, request access first."
    ]
  },
  {
    id: "remove-reviews",
    title: "How to Report and Remove Inappropriate Reviews",
    description: "Learn the proper process for flagging reviews that violate Google's content policies.",
    image: removeReviewsImg,
    readTime: "5 min",
    category: "Reputation Management",
    steps: [
      {
        title: "Go to Your Business Profile",
        content: "Visit business.google.com and select 'Read reviews'."
      },
      {
        title: "Find the Review",
        content: "Locate the review you want to report."
      },
      {
        title: "Click Report",
        content: "Click the three dots or report icon next to the review."
      },
      {
        title: "Select Violation Type",
        content: "Choose the reason why the review violates policies (spam, profanity, off-topic, etc.)."
      },
      {
        title: "Submit Report",
        content: "Click 'Send report' and wait for Google to review (typically several days)."
      }
    ],
    tips: [
      "Only reviews that violate Google policies are eligible for removal.",
      "Don't report reviews just because they're negative - that's not a violation.",
      "You can check the status of your report in the Reviews Management Tool.",
      "Consider responding professionally to negative reviews instead of trying to remove them."
    ]
  },
  {
    id: "verify-profile",
    title: "How to Verify Your Google Business Profile",
    description: "Complete the verification process to gain full control of your Business Profile and edit your business information.",
    image: verifyProfileImg,
    readTime: "6 min",
    category: "Getting Started",
    steps: [
      {
        title: "Find Your Business",
        content: "Search for your business name on Google or Google Maps, or go to business.google.com."
      },
      {
        title: "Claim or Create Profile",
        content: "Click 'Claim this business' or 'Own this business?' if it exists, otherwise add it."
      },
      {
        title: "Choose Verification Method",
        content: "Select from available options: postcard by mail, phone call, email, or video verification."
      },
      {
        title: "Complete Verification",
        content: "Follow the instructions for your chosen method. Postcard takes 5-14 days; other methods are faster."
      },
      {
        title: "Enter Verification Code",
        content: "Once you receive your code, enter it in your Business Profile to complete verification."
      }
    ],
    tips: [
      "You need a Google Account to sign up for a Business Profile.",
      "Some businesses qualify for instant verification if they've verified their website.",
      "Video verification requires showing your business location and documents proving ownership.",
      "Keep your business information accurate during verification."
    ]
  }
];

const Blog = () => {
  const [selectedArticle, setSelectedArticle] = useState<BlogArticle | null>(null);

  if (selectedArticle) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-20">
          {/* Article Header */}
          <div className="bg-gradient-to-br from-primary to-primary-hover text-white py-16">
            <div className="container-custom">
              <button
                onClick={() => setSelectedArticle(null)}
                className="flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors"
              >
                ← Back to Blog
              </button>
              <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-sm font-medium mb-4">
                {selectedArticle.category}
              </span>
              <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                {selectedArticle.title}
              </h1>
              <p className="text-lg text-white/80 max-w-2xl">
                {selectedArticle.description}
              </p>
              <div className="flex items-center gap-4 mt-6 text-white/70">
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {selectedArticle.readTime} read
                </span>
                <span className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  {selectedArticle.steps.length} steps
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
                alt={selectedArticle.title}
                className="w-full rounded-2xl mb-12 shadow-lg"
              />

              {/* Steps */}
              <div className="space-y-8">
                <h2 className="font-display text-2xl font-bold text-foreground">
                  Step-by-Step Guide
                </h2>
                {selectedArticle.steps.map((step, index) => (
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
              {selectedArticle.tips && selectedArticle.tips.length > 0 && (
                <div className="mt-12 p-6 bg-primary/5 border border-primary/20 rounded-2xl">
                  <h3 className="font-display text-xl font-semibold text-foreground mb-4">
                    Pro Tips
                  </h3>
                  <ul className="space-y-3">
                    {selectedArticle.tips.map((tip, index) => (
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
                  Need Help With Your Business Profile?
                </h3>
                <p className="text-muted-foreground mb-6">
                  Let our experts handle your Google Business Profile optimization and management.
                </p>
                <Link to="/#contact">
                  <Button className="bg-primary hover:bg-primary-hover text-primary-foreground font-semibold px-8">
                    Get in Touch
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        {/* Hero */}
        <div className="bg-gradient-to-br from-primary to-primary-hover text-white py-20">
          <div className="container-custom text-center">
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Google Business Profile Guides
            </h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Step-by-step tutorials to help you optimize and manage your Google Business Profile effectively.
            </p>
          </div>
        </div>

        {/* Articles Grid */}
        <div className="container-custom py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogArticles.map((article) => (
              <article
                key={article.id}
                className="group bg-card border border-border/50 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer"
                onClick={() => setSelectedArticle(article)}
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="px-2.5 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                      {article.category}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      {article.readTime}
                    </span>
                  </div>
                  <h2 className="font-display text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {article.title}
                  </h2>
                  <p className="text-muted-foreground text-sm line-clamp-2">
                    {article.description}
                  </p>
                  <button className="mt-4 flex items-center gap-2 text-primary font-medium text-sm group-hover:gap-3 transition-all">
                    Read More
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-muted py-16">
          <div className="container-custom text-center">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Need Professional Help?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Managing your Google Business Profile can be time-consuming. Let our experts handle it while you focus on running your business.
            </p>
            <Link to="/#contact">
              <Button size="lg" className="bg-primary hover:bg-primary-hover text-primary-foreground font-semibold px-8">
                Contact Us Today
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
