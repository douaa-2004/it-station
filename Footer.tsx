import React from 'react';
import { useLanguage } from '../language/LanguageSwitcher';
import { content } from '@/data/content';

const Footer: React.FC = () => {
  const { language } = useLanguage();
  const t = content[language].footer;
  const direction = language === 'ar' ? 'rtl' : 'ltr';

  // Handle email with pre-filled content
  const handleEmail = () => {
    const subject = language === 'fr' ? 'Demande d\'information - IT Station' :
      language === 'en' ? 'Information Request - IT Station' :
        'طلب معلومات - IT Station';
    const body = language === 'fr' ? 'Bonjour,\n\nJe souhaite obtenir plus d\'informations sur vos services.\n\nCordialement,' :
      language === 'en' ? 'Hello,\n\nI would like to get more information about your services.\n\nBest regards,' :
        'مرحبا،\n\nأود الحصول على مزيد من المعلومات حول خدماتكم.\n\nمع أطيب التحيات،';

    // Try multiple approaches to ensure email client opens
    try {
      // First try: direct mailto link
      const mailtoUrl = `mailto:${content[language].contact.info.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.location.href = mailtoUrl;
    } catch (error) {
      // Fallback: try opening in new window
      try {
        const mailtoUrl = `mailto:${content[language].contact.info.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.open(mailtoUrl, '_blank');
      } catch (fallbackError) {
        // Final fallback: copy email to clipboard and show message
        navigator.clipboard.writeText(content[language].contact.info.email).then(() => {
          alert(language === 'fr' ?
            `Email copié dans le presse-papiers: ${content[language].contact.info.email}` :
            language === 'en' ?
              `Email copied to clipboard: ${content[language].contact.info.email}` :
              `تم نسخ البريد الإلكتروني إلى الحافظة: ${content[language].contact.info.email}`
          );
        });
      }
    }
  };

  return (
    <footer className="bg-gradient-to-br from-[#0d2c6d] via-[#133d99] to-[#3c8eff] text-white pt-8 md:pt-16 pb-6">
      {/* Call to action */}
      <div className="text-center mb-8 md:mb-10">
        <h2 className="text-2xl font-bold mb-2">Vous souhaitez collaborer avec nous ?</h2>
        <p className="mb-4 text-white/80">Contactez notre équipe pour découvrir comment IT Station peut booster votre business.</p>
        <a href="#contact" className="inline-block px-6 py-2 bg-white text-[#0a2342] rounded-full font-semibold shadow hover:bg-itstation-blue-light hover:text-white transition-all">Nous contacter</a>
      </div>
      {/* Footer main */}
      <div className="container mx-auto px-2 md:px-4 border-t border-white/20 pt-6 md:pt-10 pb-4 grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-8">
        {/* Logo */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <img src="/lovable-uploads/627f34dc-12fe-4d68-b935-d075d566acbb.png" alt="IT Station Logo" className="h-10 w-10 rounded-full" />
            <span className="text-xl font-bold">IT STATION</span>
          </div>
          <div className="text-white/70 text-sm">Votre partenaire digital en Algérie</div>
          {/* Contact Info */}
          <div className="mt-4 space-y-2 text-white/80 text-sm">
            <div className="flex items-center gap-2"><i className="fas fa-envelope"></i><button onClick={handleEmail} className="hover:underline text-left">{content[language].contact.info.email}</button></div>
            <div className="flex items-center gap-2"><i className="fas fa-phone"></i><a href={`tel:${content[language].contact.info.phone}`} className="hover:underline">{content[language].contact.info.phone}</a></div>
            <div className="flex items-center gap-2">
              <i className="fas fa-map-marker-alt"></i>
              <a
                href="https://maps.app.goo.gl/hDaW2TJt74HHsW2P8?g_st=it"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline text-left"
              >
                21 Rue Korbali Morsli, BIRELDJIR
              </a>
            </div>
            <div className="flex items-center gap-2"><i className="fab fa-whatsapp"></i><a href={`https://wa.me/${content[language].contact.info.whatsapp.replace(/\s/g, '')}`} target="_blank" rel="noopener noreferrer" className="hover:underline">WhatsApp</a></div>
          </div>
        </div>
        {/* Liens */}
        <div>
          <div className="font-semibold mb-2">Navigation</div>
          <ul className="space-y-1">
            <li><a href="#home" className="hover:underline hover:text-white">Accueil</a></li>
            <li><a href="#about" className="hover:underline hover:text-white">À propos</a></li>
            <li><a href="#services" className="hover:underline hover:text-white">Services</a></li>
            <li><a href="#projects" className="hover:underline hover:text-white">Projets</a></li>
            <li><a href="#contact" className="hover:underline hover:text-white">Contact</a></li>
          </ul>
        </div>
        {/* Support */}
        <div>
          <div className="font-semibold mb-2">Support</div>
          <ul className="space-y-1">
            <li><a href="#contact" className="hover:underline hover:text-white">Demande de support</a></li>
            <li><a href="#contact" className="hover:underline hover:text-white">Contact</a></li>
          </ul>
        </div>
        {/* Réseaux sociaux */}
        <div>
          <div className="flex gap-4 mt-2">
            <a href="#" className="hover:text-[#2e8fff]" aria-label="Facebook"><i className="fab fa-facebook-f text-xl"></i></a>
            <a href="#" className="hover:text-[#2e8fff]" aria-label="LinkedIn"><i className="fab fa-linkedin-in text-xl"></i></a>
            <a href="#" className="hover:text-[#2e8fff]" aria-label="Twitter"><i className="fab fa-twitter text-xl"></i></a>
            <a href="#" className="hover:text-[#2e8fff]" aria-label="Instagram"><i className="fab fa-instagram text-xl"></i></a>
            <a href={`https://wa.me/${content[language].contact.info.whatsapp.replace(/\s/g, '')}`} target="_blank" rel="noopener noreferrer" className="hover:text-[#2e8fff]" aria-label="WhatsApp"><i className="fab fa-whatsapp text-xl"></i></a>
          </div>
        </div>
      </div>
      {/* Mentions légales */}
      <div className="mt-6 md:mt-8 text-center text-white/60 text-xs border-t border-white/10 pt-4">© 2025 IT Station. Tous droits réservés.</div>
    </footer>
  );
};

export default Footer;
