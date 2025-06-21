import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { LanguageSwitcher, useLanguage } from '../language/LanguageSwitcher';
import { content } from '@/data/content';
import { Menu, X, ChevronDown } from 'lucide-react';
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  const { language } = useLanguage();
  const t = content[language].navigation;
  const serviceItems = content[language].services.items;
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const direction = language === 'ar' ? 'rtl' : 'ltr';

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Determine if scrolled down for background change
      if (currentScrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Handle header animation based on scroll direction
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down - hide header
        setHeaderVisible(false);
      } else {
        // Scrolling up - show header
        setHeaderVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 shadow-md backdrop-blur' : 'bg-transparent'
        } ${headerVisible ? 'translate-y-0' : '-translate-y-full'}`}
      dir={direction}
    >
      <div className="container mx-auto px-2 py-2 md:px-4 md:py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center min-w-0">
            <a href="#" className="flex items-center space-x-2 min-w-0">
              <img
                src="/lovable-uploads/627f34dc-12fe-4d68-b935-d075d566acbb.png"
                alt="IT Station Logo"
                className="h-10 w-auto max-w-[40px] rounded-lg"
              />
              <span className={`text-xl font-bold text-itstation-blue truncate max-w-[120px] ${language === 'ar' ? 'mr-2' : 'ml-2'}`}>
                IT STATION
              </span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4 md:space-x-8 overflow-x-auto">
            <a href="#home" className="font-semibold text-itstation-blue-light hover:text-itstation-blue transition-all duration-200 hover:underline px-2 py-1 rounded-md">
              {t.home}
            </a>
            <a href="#about" className="font-semibold text-itstation-blue-light hover:text-itstation-blue transition-all duration-200 hover:underline px-2 py-1 rounded-md active-link">
              {t.about}
            </a>

            {/* Services Dropdown */}
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="font-semibold text-itstation-blue hover:text-itstation-blue-light transition-all bg-transparent">
                    {t.services}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      {serviceItems.map((service, index) => (
                        <li key={index} className="row-span-1">
                          <Link
                            to={`/services/${index}`}
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">{service.title}</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              {service.description}
                            </p>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <a href="#projects" className="font-semibold text-itstation-blue-light hover:text-itstation-blue transition-all duration-200 hover:underline px-2 py-1 rounded-md">
              {t.projects}
            </a>
            <a href="#contact" className="font-semibold text-itstation-blue-light hover:text-itstation-blue transition-all duration-200 hover:underline px-2 py-1 rounded-md">
              {t.contact}
            </a>
          </nav>

          {/* Language Switcher & Mobile Menu Button */}
          <div className="flex items-center space-x-2 md:space-x-4">
            <div className="hidden md:block">
              <LanguageSwitcher />
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={toggleMobileMenu}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t py-2 shadow-lg">
          <nav className="container mx-auto px-2 flex flex-col space-y-2">
            <a
              href="#home"
              className="font-medium text-gray-700 hover:text-itstation-blue transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t.home}
            </a>
            <a
              href="#about"
              className="font-medium text-gray-700 hover:text-itstation-blue transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t.about}
            </a>

            {/* Mobile Services Dropdown */}
            <div className="relative">
              <button
                className="flex items-center justify-between w-full font-medium text-gray-700 hover:text-itstation-blue transition-colors py-2"
                onClick={(e) => {
                  e.preventDefault();
                  const element = e.currentTarget.nextElementSibling;
                  if (element) {
                    element.classList.toggle('hidden');
                  }
                }}
              >
                {t.services}
                <ChevronDown size={16} />
              </button>
              <div className="hidden pl-4 mt-2 space-y-2 border-l-2 border-itstation-blue">
                {serviceItems.map((service, index) => (
                  <Link
                    key={index}
                    to={`/services/${index}`}
                    className="block py-1 text-sm text-gray-600 hover:text-itstation-blue"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {service.title}
                  </Link>
                ))}
              </div>
            </div>

            <a
              href="#projects"
              className="font-medium text-gray-700 hover:text-itstation-blue transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t.projects}
            </a>
            <a
              href="#contact"
              className="font-medium text-gray-700 hover:text-itstation-blue transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t.contact}
            </a>
            <div className="pt-2">
              <LanguageSwitcher />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
