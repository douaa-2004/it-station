import React from 'react';
import { useLanguage } from '../language/LanguageSwitcher';
import { content } from '@/data/content';
import { Quote } from 'lucide-react';

const Projects: React.FC = () => {
  const { language } = useLanguage();
  const t = content[language].projects;
  const direction = language === 'ar' ? 'rtl' : 'ltr';

  return (
    <section id="projects" className="py-24 bg-gray-50" dir={direction}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">{t.title}</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t.subtitle}</p>
        </div>

        {/* Case Studies */}
        <div className="mb-20">
          <h3 className="text-2xl font-semibold mb-2 text-gray-800">{t.caseStudies.title}</h3>
          <p className="text-gray-600 mb-8">{t.caseStudies.subtitle}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {t.caseStudies.items.map((caseStudy, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
              >
                <div className="h-48 overflow-hidden max-w-full">
                  <img
                    src={caseStudy.image}
                    alt={caseStudy.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110 max-w-full"
                  />
                </div>
                <div className="p-2 md:p-6">
                  <div className="inline-block px-3 py-1 bg-blue-50 text-itstation-blue text-xs font-medium rounded-full mb-3">
                    {caseStudy.client}
                  </div>
                  <h4 className="text-lg font-semibold mb-2 text-gray-800">{caseStudy.title}</h4>
                  <p className="text-gray-600 mb-4">{caseStudy.description}</p>
                  <a href="#" className="text-itstation-blue font-medium hover:underline">
                    {language === 'fr' ? 'En savoir plus' : language === 'en' ? 'Learn more' : 'اقرأ المزيد'}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div>
          <h3 className="text-2xl font-semibold mb-10 text-gray-800 text-center">{t.testimonials.title}</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
            {t.testimonials.items.map((testimonial, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl p-2 md:p-6 shadow-md relative"
              >
                <div className="absolute -top-4 left-6 text-itstation-blue bg-white rounded-full p-2 shadow-md">
                  <Quote className="w-6 h-6" />
                </div>
                <p className="text-gray-600 mb-6 pt-4 italic">"{testimonial.quote}"</p>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-itstation-blue to-blue-700 flex items-center justify-center text-white font-bold">
                    {testimonial.author.charAt(0)}
                  </div>
                  <div className="ml-3">
                    <h4 className="font-semibold text-gray-800">{testimonial.author}</h4>
                    <p className="text-sm text-gray-500">{testimonial.position}, {testimonial.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
