import React, { useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { useLanguage } from '../language/LanguageSwitcher';
import { content } from '@/data/content';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
  const { language } = useLanguage();
  const t = content[language].hero;
  const direction = language === 'ar' ? 'rtl' : 'ltr';
  const animationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const createParticle = () => {
      if (!animationRef.current) return;

      const particle = document.createElement('div');
      const size = Math.random() * 15 + 5;
      const xPos = Math.random() * animationRef.current.offsetWidth;
      const yPos = Math.random() * animationRef.current.offsetHeight;
      const duration = Math.random() * 15 + 10;
      const delay = Math.random() * 5;

      particle.className = `absolute rounded-full bg-itstation-blue opacity-30 animate-float`;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${xPos}px`;
      particle.style.top = `${yPos}px`;
      particle.style.animationDuration = `${duration}s`;
      particle.style.animationDelay = `${delay}s`;

      animationRef.current.appendChild(particle);

      setTimeout(() => {
        if (particle.parentNode === animationRef.current) {
          animationRef.current.removeChild(particle);
        }
      }, (duration + delay) * 1000);
    };

    // Create initial particles
    for (let i = 0; i < 15; i++) {
      createParticle();
    }

    // Continue creating particles
    const interval = setInterval(createParticle, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center pt-16 md:pt-20 overflow-hidden bg-cover bg-center" dir={direction} style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
        <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" alt="Hero" className="w-full h-full object-cover blur-sm scale-105" />
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="absolute inset-0 bg-grid-pattern bg-grid-small opacity-10"></div>
        <div className="absolute inset-0 bg-white/30 md:bg-itstation-blue-light/20"></div>
      </div>
      <div className="absolute inset-0 overflow-hidden">
        {/* SVG circuit lines animation ici si présente */}
      </div>
      <div className="container mx-auto px-2 md:px-4 z-10">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="max-w-3xl w-full text-white">
            <h1 className="text-2xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 animate-fade-in">
              <span className="text-white">{t.slogan}</span>
            </h1>
            <p className="text-base md:text-xl text-gray-200 mb-8 animate-fade-in max-w-full" style={{ animationDelay: "0.3s" }}>
              {t.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in w-full" style={{ animationDelay: "0.6s" }}>
              <Button
                size="lg"
                className="bg-itstation-blue hover:bg-blue-700 text-white transition-all hover:scale-105"
              >
                <a href="#contact" className="w-full h-full flex items-center justify-center">{t.ctaConsultation}</a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-itstation-blue bg-white text-itstation-blue hover:bg-itstation-blue hover:text-white transition-all hover:scale-105"
              >
                <Link to="/services/0" className="w-full h-full flex items-center justify-center">{t.ctaDiscoverServices}</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
