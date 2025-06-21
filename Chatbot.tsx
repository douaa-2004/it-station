import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { MessageCircle, Send } from 'lucide-react';
import { useLanguage } from '../language/LanguageSwitcher';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

type Message = {
  text: string;
  sender: 'user' | 'bot';
  options?: Array<{
    text: string;
    nextResponse: string;
  }>;
};

type ConsultationFormData = {
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  projectDetails: string;
};

type QuoteFormData = {
  serviceType: string;
  projectDetails: string;
  estimatedBudget: string;
  startDate: string;
};

const Chatbot: React.FC = () => {
  const { language = 'fr' } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [showConsultationForm, setShowConsultationForm] = useState(false);
  const [showQuoteForm, setShowQuoteForm] = useState(false);
  const { toast } = useToast();

  const consultationForm = useForm<ConsultationFormData>({
    defaultValues: {
      companyName: '',
      contactName: '',
      email: '',
      phone: '',
      projectDetails: '',
    },
  });

  const quoteForm = useForm<QuoteFormData>({
    defaultValues: {
      serviceType: '',
      projectDetails: '',
      estimatedBudget: '',
      startDate: '',
    },
  });

  const formLabels = {
    fr: {
      companyName: "Nom de l'entreprise",
      contactName: "Nom du contact",
      email: "Email",
      phone: "Téléphone",
      projectDetails: "Détails du projet",
      submit: "Envoyer",
      cancel: "Annuler",
      serviceType: "Type de service",
      estimatedBudget: "Budget estimé",
      startDate: "Date de début",
      network: "Administration Réseau",
      development: "Développement Logiciel",
      consulting: "Conseil IT",
      other: "Autre",
    },
    en: {
      companyName: "Company Name",
      contactName: "Contact Name",
      email: "Email",
      phone: "Phone",
      projectDetails: "Project Details",
      submit: "Submit",
      cancel: "Cancel",
      serviceType: "Service Type",
      estimatedBudget: "Estimated Budget",
      startDate: "Desired Start Date",
      network: "Network Administration",
      development: "Software Development",
      consulting: "IT Consulting",
      other: "Other",
    },
    ar: {
      companyName: "اسم الشركة",
      contactName: "اسم جهة الاتصال",
      email: "البريد الإلكتروني",
      phone: "الهاتف",
      projectDetails: "تفاصيل المشروع",
      submit: "إرسال",
      cancel: "إلغاء",
      serviceType: "نوع الخدمة",
      estimatedBudget: "الميزانية المقدرة",
      startDate: "تاريخ البدء",
      network: "إدارة الشبكات",
      development: "تطوير البرمجيات",
      consulting: "استشارات تقنية",
      other: "أخرى",
    },
  };

  const botResponses = {
    fr: {
      welcome: {
        text: 'Bienvenue chez IT Station ! Comment puis-je vous aider ?',
        options: [
          { text: 'Nos services', nextResponse: 'services' },
          { text: 'Consultation', nextResponse: 'consultation' },
          { text: 'Devis', nextResponse: 'quote' },
          { text: 'Projets', nextResponse: 'projects' },
        ],
      },
      services: {
        text: 'Nous offrons : administration réseau, support technique, conseil IT, développement logiciel, intégration IA, et optimisation IoT.',
        options: [
          { text: 'En savoir plus', nextResponse: 'more-services' },
          { text: 'Consultation', nextResponse: 'consultation' },
          { text: 'Retour', nextResponse: 'welcome' },
        ],
      },
      consultation: {
        text: 'Remplissez ce formulaire pour une consultation gratuite :',
        options: [{ text: 'Remplir', nextResponse: 'show-consultation-form' }],
      },
      quote: {
        text: 'Fournissez quelques détails pour un devis personnalisé :',
        options: [{ text: 'Remplir', nextResponse: 'show-quote-form' }],
      },
      'form-submitted': {
        text: 'Merci ! Nous vous contacterons bientôt.',
        options: [{ text: 'Retour', nextResponse: 'welcome' }],
      },
    },
    en: {
      welcome: {
        text: 'Welcome to IT Station! How can I assist you?',
        options: [
          { text: 'Our Services', nextResponse: 'services' },
          { text: 'Consultation', nextResponse: 'consultation' },
          { text: 'Quote', nextResponse: 'quote' },
          { text: 'Projects', nextResponse: 'projects' },
        ],
      },
      services: {
        text: 'We offer: network administration, technical support, IT consulting, software development, AI integration, and IoT optimization.',
        options: [
          { text: 'Learn More', nextResponse: 'more-services' },
          { text: 'Consultation', nextResponse: 'consultation' },
          { text: 'Back', nextResponse: 'welcome' },
        ],
      },
      consultation: {
        text: 'Fill out this form for a free consultation:',
        options: [{ text: 'Fill Form', nextResponse: 'show-consultation-form' }],
      },
      quote: {
        text: 'Provide some details for a personalized quote:',
        options: [{ text: 'Fill Form', nextResponse: 'show-quote-form' }],
      },
      'form-submitted': {
        text: 'Thank you! We will contact you soon.',
        options: [{ text: 'Back', nextResponse: 'welcome' }],
      },
    },
    ar: {
      welcome: {
        text: 'مرحبًا بكم في IT Station! كيف يمكنني مساعدتك؟',
        options: [
          { text: 'خدماتنا', nextResponse: 'services' },
          { text: 'استشارة', nextResponse: 'consultation' },
          { text: 'عرض سعر', nextResponse: 'quote' },
          { text: 'المشاريع', nextResponse: 'projects' },
        ],
      },
      services: {
        text: 'نقدم: إدارة الشبكات، الدعم الفني، الاستشارات التقنية، تطوير البرمجيات، تكامل الذكاء الاصطناعي، وتحسين إنترنت الأشياء.',
        options: [
          { text: 'معرفة المزيد', nextResponse: 'more-services' },
          { text: 'استشارة', nextResponse: 'consultation' },
          { text: 'رجوع', nextResponse: 'welcome' },
        ],
      },
      consultation: {
        text: 'املأ هذا النموذج للحصول على استشارة مجانية:',
        options: [{ text: 'ملء النموذج', nextResponse: 'show-consultation-form' }],
      },
      quote: {
        text: 'قدم بعض التفاصيل للحصول على عرض سعر مخصص:',
        options: [{ text: 'ملء النموذج', nextResponse: 'show-quote-form' }],
      },
      'form-submitted': {
        text: 'شكرًا! سنتواصل معك قريبًا.',
        options: [{ text: 'رجوع', nextResponse: 'welcome' }],
      },
    },
  };

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeResponse = botResponses[language as keyof typeof botResponses]?.welcome || botResponses.fr.welcome;
      setMessages([{ text: welcomeResponse.text, sender: 'bot', options: welcomeResponse.options }]);
    }
  }, [isOpen, language]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    setMessages((prev) => [...prev, { text: inputValue, sender: 'user' }]);
    setInputValue('');
    setTimeout(() => {
      const input = inputValue.toLowerCase();
      const response =
        input.includes('service') || input.includes('خدم') || input.includes('servi') ? botResponses[language].services :
          input.includes('consultation') || input.includes('استشارة') || input.includes('consulta') ? botResponses[language].consultation :
            input.includes('devis') || input.includes('quote') || input.includes('عرض') ? botResponses[language].quote :
              botResponses[language].welcome;
      setMessages((prev) => [...prev, { text: response.text, sender: 'bot', options: response.options }]);
    }, 500);
  };

  const handleOptionClick = (nextResponse: string) => {
    if (nextResponse === 'show-consultation-form') {
      setShowConsultationForm(true);
      return;
    }
    if (nextResponse === 'show-quote-form') {
      setShowQuoteForm(true);
      return;
    }
    const response = botResponses[language][nextResponse as keyof typeof botResponses.fr] || botResponses.fr.welcome;
    setMessages((prev) => [...prev, { text: response.text, sender: 'bot', options: response.options }]);
  };

  const onConsultationSubmit = (data: ConsultationFormData) => {
    console.log('Consultation:', data);
    setShowConsultationForm(false);
    setMessages((prev) => [
      ...prev,
      { text: botResponses[language]['form-submitted'].text, sender: 'bot', options: botResponses[language]['form-submitted'].options },
    ]);
    consultationForm.reset();
    toast({
      title: formLabels[language].submit + '!',
      description: language === 'ar' ? 'تم إرسال النموذج بنجاح.' : language === 'fr' ? 'Formulaire envoyé avec succès.' : 'Form submitted successfully.',
    });
  };

  const onQuoteSubmit = (data: QuoteFormData) => {
    console.log('Quote:', data);
    setShowQuoteForm(false);
    setMessages((prev) => [
      ...prev,
      { text: botResponses[language]['form-submitted'].text, sender: 'bot', options: botResponses[language]['form-submitted'].options },
    ]);
    quoteForm.reset();
    toast({
      title: formLabels[language].submit + '!',
      description: language === 'ar' ? 'تم إرسال طلب العرض بنجاح.' : language === 'fr' ? 'Demande de devis envoyée avec succès.' : 'Quote request submitted successfully.',
    });
  };

  const labels = formLabels[language as keyof typeof formLabels] || formLabels.fr;

  return (
    <div className="relative">
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 h-12 w-12 p-0 flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white shadow-lg rounded-full transition-all-300 border-none"
        aria-label="Ouvrir le chatbot"
      >
        <MessageCircle size={22} className="text-white" />
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-lg max-w-[95%] max-h-[90vh] flex flex-col bg-white rounded-3xl shadow-2xl border border-[#e6ecfa] p-0 md:p-0 transition-all-300 font-sans">
          <div className="sticky top-0 z-10 flex items-center gap-4 px-6 py-4 bg-white rounded-t-3xl shadow-sm border-b border-gray-100">
            <img src="/lovable-uploads/627f34dc-12fe-4d68-b935-d075d566acbb.png" alt="Logo IT Station" className="h-12 w-12 rounded-full shadow bg-white p-1" />
            <span className="text-xl font-bold text-black tracking-wide font-sans whitespace-nowrap">IT Station Assistant</span>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-thin scrollbar-thumb-blue-300 scrollbar-track-transparent scrollbar-thumb-rounded-full">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.sender === 'user' ? 'justify-end [dir=rtl]:justify-start' : 'justify-start [dir=rtl]:justify-end'}`}
              >
                <div
                  className={`max-w-[75%] p-3 rounded-xl text-sm leading-relaxed transition-all duration-200 ${message.sender === 'user'
                    ? 'self-end bg-blue-100 text-black rounded-2xl shadow px-5 py-3 mb-3 font-semibold text-base tracking-wide'
                    : 'self-start bg-gray-50 text-black rounded-2xl shadow px-5 py-3 mb-3 font-medium text-base tracking-wide border-l-4 border-blue-200'
                    }`}
                >
                  <p>{message.text}</p>
                  {message.options && (
                    <div className="mt-2 space-y-2">
                      {message.options.map((option, optIndex) => (
                        <Button
                          key={optIndex}
                          variant="outline"
                          size="sm"
                          className="w-full text-left text-sm border-slate-300 hover:bg-primary/90 hover:scale-105 transition-transform duration-200"
                          onClick={() => handleOptionClick(option.nextResponse)}
                        >
                          {option.text}
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {showConsultationForm && (
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <h3 className="text-lg font-semibold text-slate-900 text-center mb-4">
                  {language === 'ar' ? 'نموذج الاستشارة' : language === 'fr' ? 'Formulaire de consultation' : 'Consultation Form'}
                </h3>
                <Form {...consultationForm}>
                  <form onSubmit={consultationForm.handleSubmit(onConsultationSubmit)} className="space-y-4">
                    {(['companyName', 'contactName', 'email', 'phone', 'projectDetails'] as (keyof ConsultationFormData)[]).map((field) => (
                      <FormField
                        key={field}
                        control={consultationForm.control}
                        name={field}
                        render={({ field: formField }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-medium text-slate-900">{labels[field]}</FormLabel>
                            <FormControl>
                              {field === 'projectDetails' ? (
                                <Textarea
                                  placeholder={labels[field]}
                                  {...formField}
                                  className="text-sm border-slate-300 rounded-lg focus:ring-primary focus:border-primary transition-all duration-200"
                                />
                              ) : (
                                <Input
                                  type={field === 'email' ? 'email' : 'text'}
                                  placeholder={labels[field]}
                                  {...formField}
                                  className="text-sm border-slate-300 rounded-lg focus:ring-primary focus:border-primary transition-all duration-200"
                                />
                              )}
                            </FormControl>
                            <FormMessage className="text-xs text-red-500" />
                          </FormItem>
                        )}
                      />
                    ))}
                    <div className="flex justify-end gap-3 [dir=rtl]:justify-start [dir=rtl]:flex-row-reverse">
                      <Button
                        variant="outline"
                        onClick={() => setShowConsultationForm(false)}
                        className="text-sm border-slate-300 hover:bg-slate-100 transition-all duration-200"
                      >
                        {labels.cancel}
                      </Button>
                      <Button
                        type="submit"
                        className="bg-gradient-to-br from-blue-600 to-violet-500 hover:from-blue-700 hover:to-violet-600 text-white rounded-full shadow transition-all-300 p-3 flex items-center justify-center"
                      >
                        {labels.submit}
                      </Button>
                    </div>
                  </form>
                </Form>
              </div>
            )}
            {showQuoteForm && (
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <h3 className="text-lg font-semibold text-slate-900 text-center mb-4">
                  {language === 'ar' ? 'نموذج طلب عرض سعر' : language === 'fr' ? 'Formulaire de demande de devis' : 'Quote Request Form'}
                </h3>
                <Form {...quoteForm}>
                  <form onSubmit={quoteForm.handleSubmit(onQuoteSubmit)} className="space-y-4">
                    <FormField
                      control={quoteForm.control}
                      name="serviceType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-slate-900">{labels.serviceType}</FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              value={field.value}
                              className="flex flex-col gap-2"
                            >
                              {(['network', 'development', 'consulting', 'other'] as const).map((value) => (
                                <FormItem key={value} className="flex items-center gap-2">
                                  <FormControl>
                                    <RadioGroupItem value={value} className="text-primary" />
                                  </FormControl>
                                  <FormLabel className="text-sm text-slate-900">{labels[value]}</FormLabel>
                                </FormItem>
                              ))}
                            </RadioGroup>
                          </FormControl>
                          <FormMessage className="text-xs text-red-500" />
                        </FormItem>
                      )}
                    />
                    {(['projectDetails', 'estimatedBudget', 'startDate'] as (keyof QuoteFormData)[]).map((field) => (
                      <FormField
                        key={field}
                        control={quoteForm.control}
                        name={field}
                        render={({ field: formField }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-medium text-slate-900">{labels[field]}</FormLabel>
                            <FormControl>
                              {field === 'projectDetails' ? (
                                <Textarea
                                  placeholder={labels[field]}
                                  {...formField}
                                  className="text-sm border-slate-300 rounded-lg focus:ring-primary focus:border-primary transition-all duration-200"
                                />
                              ) : (
                                <Input
                                  type={field === 'startDate' ? 'date' : 'text'}
                                  placeholder={labels[field]}
                                  {...formField}
                                  className="text-sm border-slate-300 rounded-lg focus:ring-primary focus:border-primary transition-all duration-200"
                                />
                              )}
                            </FormControl>
                            <FormMessage className="text-xs text-red-500" />
                          </FormItem>
                        )}
                      />
                    ))}
                    <div className="flex justify-end gap-3 [dir=rtl]:justify-start [dir=rtl]:flex-row-reverse">
                      <Button
                        variant="outline"
                        onClick={() => setShowQuoteForm(false)}
                        className="text-sm border-slate-300 hover:bg-slate-100 transition-all duration-200"
                      >
                        {labels.cancel}
                      </Button>
                      <Button
                        type="submit"
                        className="bg-gradient-to-br from-blue-600 to-violet-500 hover:from-blue-700 hover:to-violet-600 text-white rounded-full shadow transition-all-300 p-3 flex items-center justify-center"
                      >
                        {labels.submit}
                      </Button>
                    </div>
                  </form>
                </Form>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="border-t border-slate-200 p-4 bg-white rounded-b-xl">
            <div className="flex items-center gap-2 [dir=rtl]:flex-row-reverse">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder={
                  language === 'ar' ? 'اكتب رسالتك هنا...' : language === 'fr' ? 'Tapez votre message ici...' : 'Type your message here...'
                }
                className="flex-1 bg-gray-50 border-none rounded-full shadow px-5 py-3 focus:ring-2 focus:ring-blue-300 text-base transition-all-300 font-sans text-black placeholder-gray-400"
                aria-label="Taper votre message"
              />
              <Button
                onClick={handleSendMessage}
                className="bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow transition-all-300 p-3 flex items-center justify-center ml-2"
                aria-label="Envoyer le message"
              >
                <Send size={16} />
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Chatbot;