import React from 'react';
import { useLanguage } from '../language/LanguageSwitcher';
import { content } from '@/data/content';
import { CheckCircle, Award, ShieldCheck } from 'lucide-react';

const About: React.FC = () => {
  const { language } = useLanguage();
  const t = content[language].about;
  const direction = language === 'ar' ? 'rtl' : 'ltr';

  return (
    <section id="about" className="py-24 bg-gray-50" dir={direction}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">{t.title}</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t.subtitle}</p>
        </div>
        <div className="flex flex-col gap-6 lg:flex-row lg:gap-12 mb-20">
          <div className="lg:w-1/2">
            <div className="bg-white rounded-xl shadow-md p-4 md:p-8 h-full">
              <h3 className="text-2xl font-semibold mb-6 text-itstation-dark">{language === 'ar' ? 'Informations Technology Station' : 'Informations Technology Station'}</h3>
              <div className="space-y-4">
                {t.description.map((paragraph, idx) => (
                  <p key={idx} className="text-gray-600">{paragraph}</p>
                ))}
              </div>
              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <ShieldCheck className="w-5 h-5 text-itstation-blue" />
                  <span className="text-sm font-medium">ISO Certified</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Award className="w-5 h-5 text-itstation-blue" />
                  <span className="text-sm font-medium">Industry Leader</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-itstation-blue" />
                  <span className="text-sm font-medium">24/7 Support</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-itstation-blue" />
                  <span className="text-sm font-medium">Custom Solutions</span>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:w-1/2">
            <div className="bg-white rounded-xl shadow-md p-4 md:p-8 h-full">
              <h3 className="text-2xl font-semibold mb-6 text-itstation-dark">{t.whyChoose.title}</h3>
              <div className="space-y-6">
                {t.whyChoose.reasons.map((reason, idx) => (
                  <div key={idx} className="flex">
                    <div className="mr-4 mt-1">
                      <div className="bg-itstation-blue/10 p-2 rounded-full">
                        <CheckCircle className="w-5 h-5 text-itstation-blue" />
                      </div>
                    </div>
                    <div>
                      <h4 className="text-lg font-medium text-gray-800 mb-1">{reason.title}</h4>
                      <p className="text-gray-600">{reason.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-r from-itstation-blue to-blue-600 text-white rounded-xl shadow-lg p-8">
          <h3 className="text-2xl font-semibold mb-8 text-center">{t.certifications.title}</h3>
          <div className="flex flex-wrap justify-center gap-6">
            {t.certifications.list.map((certification, idx) => (
              <div key={idx} className="flex items-center bg-white/10 backdrop-blur px-4 py-3 rounded-lg">
                <Award className="w-5 h-5 mr-2" />
                <span className="font-medium">{certification}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
