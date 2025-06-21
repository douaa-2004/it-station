import React, { useState } from 'react';
import { useLanguage } from '../language/LanguageSwitcher';
import { content } from '@/data/content';
import { Phone, MessageSquare, X, Mail } from 'lucide-react';
import EmailOptions from './EmailOptions';

const FloatingContact: React.FC = () => {
    const { language } = useLanguage();
    const t = content[language].contact;
    const [isOpen, setIsOpen] = useState(false);
    const [showEmailOptions, setShowEmailOptions] = useState(false);

    // Handle phone call
    const handlePhoneCall = () => {
        window.open(`tel:${t.info.phone}`, '_self');
    };

    // Handle WhatsApp
    const handleWhatsApp = () => {
        const message = language === 'fr' ? 'Bonjour, je souhaite obtenir plus d\'informations sur vos services.' :
            language === 'en' ? 'Hello, I would like to get more information about your services.' :
                'مرحبا، أود الحصول على مزيد من المعلومات حول خدماتكم.';
        const whatsappUrl = `https://wa.me/${t.info.whatsapp.replace(/\s/g, '')}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    };

    // Handle email - show options modal
    const handleEmail = () => {
        setShowEmailOptions(true);
        setIsOpen(false); // Close the floating menu
    };

    return (
        <div className="fixed bottom-6 right-6 z-50">
            {/* Floating Contact Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="bg-itstation-blue hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
                aria-label="Contact options"
            >
                {isOpen ? (
                    <X className="w-6 h-6" />
                ) : (
                    <Phone className="w-6 h-6" />
                )}
            </button>

            {/* Contact Options */}
            {isOpen && (
                <div className="absolute bottom-16 right-0 bg-white rounded-lg shadow-xl p-4 min-w-[200px] border border-gray-200">
                    <div className="space-y-3">
                        <button
                            onClick={handlePhoneCall}
                            className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-gray-50 transition-colors text-left"
                        >
                            <div className="bg-green-100 p-2 rounded-full">
                                <Phone className="w-4 h-4 text-green-600" />
                            </div>
                            <div>
                                <div className="font-medium text-gray-900">
                                    {language === 'fr' ? 'Appeler' : language === 'en' ? 'Call' : 'اتصل'}
                                </div>
                                <div className="text-sm text-gray-600">{t.info.phone}</div>
                            </div>
                        </button>

                        <button
                            onClick={handleWhatsApp}
                            className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-gray-50 transition-colors text-left"
                        >
                            <div className="bg-green-100 p-2 rounded-full">
                                <MessageSquare className="w-4 h-4 text-green-600" />
                            </div>
                            <div>
                                <div className="font-medium text-gray-900">WhatsApp</div>
                                <div className="text-sm text-gray-600">{t.info.whatsapp}</div>
                            </div>
                        </button>

                        <button
                            onClick={handleEmail}
                            className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-gray-50 transition-colors text-left"
                        >
                            <div className="bg-green-100 p-2 rounded-full">
                                <Mail className="w-4 h-4 text-green-600" />
                            </div>
                            <div>
                                <div className="font-medium text-gray-900">Email</div>
                                <div className="text-sm text-gray-600">{t.info.email}</div>
                            </div>
                        </button>
                    </div>
                </div>
            )}

            {showEmailOptions && (
                <EmailOptions
                    isOpen={showEmailOptions}
                    onClose={() => setShowEmailOptions(false)}
                />
            )}
        </div>
    );
};

export default FloatingContact; 