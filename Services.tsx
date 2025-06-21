import React from 'react';
import { useLanguage } from '../language/LanguageSwitcher';
import { content } from '@/data/content';
import { Network, Headphones, Lightbulb, Code, BrainCircuit, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";

const Services: React.FC = () => {
  const { language } = useLanguage();
  const t = content[language].services;
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
        return <Network className="w-10 h-10" />;
      case 'support':
        return <Headphones className="w-10 h-10" />;
      case 'consultancy':
        return <Lightbulb className="w-10 h-10" />;
      case 'development':
        return <Code className="w-10 h-10" />;
      case 'ai':
        return <BrainCircuit className="w-10 h-10" />;
      case 'optimization':
        return <Settings className="w-10 h-10" />;
      default:
        return <Settings className="w-10 h-10" />;
    }
  };

  return (
    <section id="services" className="py-24 bg-white" dir={direction}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">{t.title}</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {t.items.map((service, idx) => (
            <Card
              key={idx}
              className="overflow-hidden hover:shadow-xl transition-all group cursor-pointer border border-gray-100"
            >
              <Link to={`/services/${idx}`} className="block h-full">
                <div className="relative h-48 w-full overflow-hidden max-w-full">
                  <img
                    src={serviceImages[idx % serviceImages.length]}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 max-w-full"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                    <div className="p-4 text-white">
                      <h3 className="text-xl font-semibold">{service.title}</h3>
                    </div>
                  </div>
                </div>

                <CardContent className="p-2 md:p-6">
                  <div className="mb-6 text-itstation-blue group-hover:scale-110 transition-transform">
                    {getIcon(service.icon)}
                  </div>
                  <p className="text-gray-600">{service.description}</p>
                </CardContent>

                <CardFooter className="p-2 md:p-6 pt-0">
                  <div className="text-itstation-blue font-medium group-hover:translate-x-2 transition-transform">
                    {language === 'ar' ? 'اكتشف المزيد →' : language === 'fr' ? 'En savoir plus →' : 'Learn more →'}
                  </div>
                </CardFooter>
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
