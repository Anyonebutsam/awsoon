import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ContactEmailRequest {
  name: string;
  email: string;
  company: string;
  service: string;
  message: string;
  language: string;
}

const getConfirmationSubject = (language: string): string => {
  const subjects: Record<string, string> = {
    en: "We received your message!",
    sv: "Vi har mottagit ditt meddelande!",
    bg: "Получихме вашето съобщение!",
    fr: "Nous avons reçu votre message!",
    ar: "لقد استلمنا رسالتك!",
    tn: "وصلتنا رسالتك!",
    es: "¡Hemos recibido tu mensaje!",
  };
  return subjects[language] || subjects.en;
};

const getConfirmationBody = (name: string, language: string): string => {
  const bodies: Record<string, string> = {
    en: `
      <h1>Thank you for contacting us, ${name}!</h1>
      <p>We have received your message and will get back to you as soon as possible.</p>
      <p>Best regards,<br>The AWSOON Team</p>
    `,
    sv: `
      <h1>Tack för att du kontaktar oss, ${name}!</h1>
      <p>Vi har mottagit ditt meddelande och återkommer så snart som möjligt.</p>
      <p>Med vänliga hälsningar,<br>AWSOON-teamet</p>
    `,
    bg: `
      <h1>Благодарим ви, че се свързахте с нас, ${name}!</h1>
      <p>Получихме вашето съобщение и ще ви отговорим възможно най-скоро.</p>
      <p>С уважение,<br>Екипът на AWSOON</p>
    `,
    fr: `
      <h1>Merci de nous avoir contactés, ${name}!</h1>
      <p>Nous avons bien reçu votre message et vous répondrons dans les plus brefs délais.</p>
      <p>Cordialement,<br>L'équipe AWSOON</p>
    `,
    ar: `
      <h1 dir="rtl">شكراً لتواصلك معنا، ${name}!</h1>
      <p dir="rtl">لقد استلمنا رسالتك وسنرد عليك في أقرب وقت ممكن.</p>
      <p dir="rtl">مع أطيب التحيات،<br>فريق AWSOON</p>
    `,
    tn: `
      <h1 dir="rtl">شكراً على تواصلك معانا، ${name}!</h1>
      <p dir="rtl">وصلتنا رسالتك وباش نردّوا عليك في أقرب وقت.</p>
      <p dir="rtl">تحياتنا،<br>فريق AWSOON</p>
    `,
    es: `
      <h1>¡Gracias por contactarnos, ${name}!</h1>
      <p>Hemos recibido tu mensaje y te responderemos lo antes posible.</p>
      <p>Saludos cordiales,<br>El equipo de AWSOON</p>
    `,
  };
  return bodies[language] || bodies.en;
};

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, company, service, message, language }: ContactEmailRequest = await req.json();
    const resendApiKey = Deno.env.get("RESEND_API_KEY");

    if (!resendApiKey) {
      throw new Error("RESEND_API_KEY is not configured");
    }

    console.log("Received contact form submission:", { name, email, company, service, language });

    // Send notification email to business
    const businessEmailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "AWSOON Contact Form <onboarding@resend.dev>",
        to: ["sam@awsoon.com"],
        subject: `New Contact Form Submission from ${name}`,
        html: `
          <h1>New Contact Form Submission</h1>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Company:</strong> ${company || "Not provided"}</p>
          <p><strong>Service of Interest:</strong> ${service || "Not specified"}</p>
          <p><strong>Language:</strong> ${language}</p>
          <hr>
          <h2>Message:</h2>
          <p>${message.replace(/\n/g, "<br>")}</p>
        `,
      }),
    });

    const businessData = await businessEmailResponse.json();
    console.log("Business notification email sent:", businessData);

    // Send confirmation email to user
    const userEmailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "AWSOON <onboarding@resend.dev>",
        to: [email],
        subject: getConfirmationSubject(language),
        html: getConfirmationBody(name, language),
      }),
    });

    const userData = await userEmailResponse.json();
    console.log("User confirmation email sent:", userData);

    return new Response(
      JSON.stringify({ 
        success: true, 
        businessEmail: businessData,
        userEmail: userData 
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
