import React, { useState } from 'react';
import { useLanguage } from '../language/LanguageSwitcher';
import { content } from '@/data/content';
import { Mail, X, ExternalLink } from 'lucide-react';

interface EmailOptionsProps {
    isOpen: boolean;
    onClose: () => void;
}

const EmailOptions: React.FC<EmailOptionsProps> = ({ isOpen, onClose }) => {
    const { language } = useLanguage();
    const t = content[language].contact;

    const subject = language === 'fr' ? 'Demande d\'information - IT Station' :
        language === 'en' ? 'Information Request - IT Station' :
            'طلب معلومات - IT Station';

    const body = language === 'fr' ? 'Bonjour,\n\nJe souhaite obtenir plus d\'informations sur vos services.\n\nCordialement,' :
        language === 'en' ? 'Hello,\n\nI would like to get more information about your services.\n\nBest regards,' :
            'مرحبا،\n\nأود الحصول على مزيد من المعلومات حول خدماتكم.\n\nمع أطيب التحيات،';

    const handleGmail = () => {
        // First try the standard Gmail compose URL
        try {
            const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(t.info.email)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
            window.open(gmailUrl, '_blank');
        } catch (error) {
            // Fallback: open Gmail and copy email to clipboard
            window.open('https://mail.google.com', '_blank');
            navigator.clipboard.writeText(t.info.email).then(() => {
                alert(language === 'fr' ?
                    `Gmail ouvert. Email copié: ${t.info.email}` :
                    language === 'en' ?
                        `Gmail opened. Email copied: ${t.info.email}` :
                        `تم فتح Gmail. تم نسخ البريد الإلكتروني: ${t.info.email}`
                );
            });
        }
        onClose();
    };

    const handleOutlook = () => {
        const outlookUrl = `https://outlook.live.com/mail/0/deeplink/compose?to=${encodeURIComponent(t.info.email)}&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.open(outlookUrl, '_blank');
        onClose();
    };

    const handleDefaultEmail = () => {
        try {
            const mailtoUrl = `mailto:${t.info.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
            window.location.href = mailtoUrl;
        } catch (error) {
            // Fallback to clipboard
            navigator.clipboard.writeText(t.info.email).then(() => {
                alert(language === 'fr' ?
                    `Email copié dans le presse-papiers: ${t.info.email}` :
                    language === 'en' ?
                        `Email copied to clipboard: ${t.info.email}` :
                        `تم نسخ البريد الإلكتروني إلى الحافظة: ${t.info.email}`
                );
            });
        }
        onClose();
    };

    const handleCopyEmail = () => {
        navigator.clipboard.writeText(t.info.email).then(() => {
            alert(language === 'fr' ?
                `Email copié dans le presse-papiers: ${t.info.email}` :
                language === 'en' ?
                    `Email copied to clipboard: ${t.info.email}` :
                    `تم نسخ البريد الإلكتروني إلى الحافظة: ${t.info.email}`
            );
        });
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full mx-4">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                        {language === 'fr' ? 'Choisir votre client email' :
                            language === 'en' ? 'Choose your email client' :
                                'اختر عميل البريد الإلكتروني'}
                    </h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="space-y-3">
                    <button
                        onClick={handleGmail}
                        className="w-full flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                    >
                        <div className="bg-red-100 p-2 rounded-full">
                            <Mail className="w-4 h-4 text-red-600" />
                        </div>
                        <div className="text-left">
                            <div className="font-medium text-gray-900">Gmail</div>
                            <div className="text-sm text-gray-600">
                                {language === 'fr' ? 'Ouvrir dans Gmail' :
                                    language === 'en' ? 'Open in Gmail' :
                                        'افتح في Gmail'}
                            </div>
                        </div>
                        <ExternalLink className="w-4 h-4 text-gray-400 ml-auto" />
                    </button>

                    <button
                        onClick={handleOutlook}
                        className="w-full flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                    >
                        <div className="bg-blue-100 p-2 rounded-full">
                            <Mail className="w-4 h-4 text-blue-600" />
                        </div>
                        <div className="text-left">
                            <div className="font-medium text-gray-900">Outlook</div>
                            <div className="text-sm text-gray-600">
                                {language === 'fr' ? 'Ouvrir dans Outlook' :
                                    language === 'en' ? 'Open in Outlook' :
                                        'افتح في Outlook'}
                            </div>
                        </div>
                        <ExternalLink className="w-4 h-4 text-gray-400 ml-auto" />
                    </button>

                    <button
                        onClick={handleDefaultEmail}
                        className="w-full flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                    >
                        <div className="bg-gray-100 p-2 rounded-full">
                            <Mail className="w-4 h-4 text-gray-600" />
                        </div>
                        <div className="text-left">
                            <div className="font-medium text-gray-900">
                                {language === 'fr' ? 'Application par défaut' :
                                    language === 'en' ? 'Default app' :
                                        'التطبيق الافتراضي'}
                            </div>
                            <div className="text-sm text-gray-600">
                                {language === 'fr' ? 'Ouvrir l\'app email par défaut' :
                                    language === 'en' ? 'Open default email app' :
                                        'افتح تطبيق البريد الافتراضي'}
                            </div>
                        </div>
                    </button>

                    <button
                        onClick={handleCopyEmail}
                        className="w-full flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                    >
                        <div className="bg-green-100 p-2 rounded-full">
                            <Mail className="w-4 h-4 text-green-600" />
                        </div>
                        <div className="text-left">
                            <div className="font-medium text-gray-900">
                                {language === 'fr' ? 'Copier l\'email' :
                                    language === 'en' ? 'Copy email' :
                                        'نسخ البريد الإلكتروني'}
                            </div>
                            <div className="text-sm text-gray-600">{t.info.email}</div>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EmailOptions; 