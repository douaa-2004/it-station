import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/navbar/Navbar';
import Footer from '@/components/footer/Footer';
import { useLanguage } from '@/components/language/LanguageSwitcher';
import { content } from '@/data/content';
import { Button } from '@/components/ui/button';
import { Network, Headphones, Lightbulb, Code, BrainCircuit, Settings } from 'lucide-react';

const ServicePage = () => {
  const { serviceId } = useParams();
  const { language } = useLanguage();
  const services = content[language].services.items;
  const service = services[Number(serviceId)] || services[0];
  const direction = language === 'ar' ? 'rtl' : 'ltr';

  // Service images
  const serviceImages = [
    "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", // Network
    "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", // Support
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", // Development
    "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", // Consultancy
    "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", // AI
    "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", // Optimization
  ];

  // Icon mapping based on service type
  const getIcon = (iconType: string) => {
    switch (iconType) {
      case 'network':
        return <Network className="w-16 h-16" />;
      case 'support':
        return <Headphones className="w-16 h-16" />;
      case 'consultancy':
        return <Lightbulb className="w-16 h-16" />;
      case 'development':
        return <Code className="w-16 h-16" />;
      case 'ai':
        return <BrainCircuit className="w-16 h-16" />;
      case 'optimization':
        return <Settings className="w-16 h-16" />;
      default:
        return <Settings className="w-16 h-16" />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col" dir={direction}>
      <Navbar />

      <main className="flex-grow pt-24">
        {/* Hero Image */}
        <div className="relative h-80 w-full">
          <img
            src={serviceImages[Number(serviceId) % serviceImages.length]}
            alt={service.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent/40 flex items-center justify-center">
            <div className="text-center text-white">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{service.title}</h1>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          <div className="text-center mb-8">
            <Link to="/" className="text-itstation-blue hover:underline mb-4 inline-block">
              ← {language === 'ar' ? 'العودة إلى الصفحة الرئيسية' : language === 'fr' ? 'Retour à l\'accueil' : 'Back to home'}
            </Link>

            <div className="flex justify-center mb-6">
              <div className="text-itstation-blue">
                {getIcon(service.icon)}
              </div>
            </div>

            <p className="text-xl text-gray-600 max-w-3xl mx-auto">{service.description}</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
            <h2 className="text-2xl font-semibold mb-6 text-itstation-blue">
              {language === 'ar' ? 'خدماتنا المتميزة' : language === 'fr' ? 'Nos services spécialisés' : 'Our specialized services'}
            </h2>

            <div className="space-y-6">
              {/* This would be replaced with actual content for each service */}
              <div className="flex items-start gap-4">
                <div className="bg-blue-100 p-3 rounded-full text-itstation-blue">
                  <Settings className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-medium text-gray-800">
                    {language === 'ar' ? 'تكنولوجيا متطورة' : language === 'fr' ? 'Technologie avancée' : 'Advanced Technology'}
                  </h3>
                  <p className="text-gray-600 mt-1">
                    {language === 'ar' ? 'نستخدم أحدث التقنيات لضمان أفضل النتائج.' :
                      language === 'fr' ? 'Nous utilisons les dernières technologies pour garantir les meilleurs résultats.' :
                        'We use the latest technologies to ensure the best results.'}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-blue-100 p-3 rounded-full text-itstation-blue">
                  <Lightbulb className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-medium text-gray-800">
                    {language === 'ar' ? 'حلول مخصصة' : language === 'fr' ? 'Solutions personnalisées' : 'Customized Solutions'}
                  </h3>
                  <p className="text-gray-600 mt-1">
                    {language === 'ar' ? 'نقدم حلولًا مصممة خصيصًا لتلبية احتياجات عملك الفريدة.' :
                      language === 'fr' ? 'Nous offrons des solutions sur mesure pour répondre aux besoins uniques de votre entreprise.' :
                        'We offer tailor-made solutions to meet your business\'s unique needs.'}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-blue-100 p-3 rounded-full text-itstation-blue">
                  <Headphones className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-medium text-gray-800">
                    {language === 'ar' ? 'دعم متميز' : language === 'fr' ? 'Support exceptionnel' : 'Outstanding Support'}
                  </h3>
                  <p className="text-gray-600 mt-1">
                    {language === 'ar' ? 'فريق الدعم لدينا متاح على مدار الساعة لمساعدتك.' :
                      language === 'fr' ? 'Notre équipe de support est disponible 24/7 pour vous aider.' :
                        'Our support team is available 24/7 to assist you.'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Button
              size="lg"
              className="bg-itstation-blue hover:bg-blue-700 text-white"
              onClick={() => window.location.href = '#contact'}
            >
              {language === 'ar' ? 'تواصل معنا' : language === 'fr' ? 'Contactez-nous' : 'Contact Us'}
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ServicePage;
