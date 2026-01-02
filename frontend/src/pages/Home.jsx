import React, { useState, useEffect } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Phone, Mail, MapPin, Star, CheckCircle, Recycle, Clock, Award, ArrowRight, Trash2, Home as HomeIcon, Sparkles, ArrowUp } from 'lucide-react';
import { toast } from '../hooks/use-toast';

const Home = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    postalCode: '',
    subject: '',
    message: ''
  });
  const [activeFilter, setActiveFilter] = useState('all');
  const [scrollY, setScrollY] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      setShowScrollTop(window.scrollY > 400);
    };
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast({
      title: "Message envoyé!",
      description: "Nous vous répondrons dans les 24 heures.",
    });
    setFormData({ name: '', email: '', phone: '', postalCode: '', subject: '', message: '' });
  };

  const values = [
    {
      icon: <CheckCircle className="w-12 h-12" />,
      title: "Satisfaction Client",
      description: "Nous sommes pleinement engagés dans la satisfaction client. L'une de nos priorités est de respecter nos engagements envers nos clients chaque jour."
    },
    {
      icon: <Recycle className="w-12 h-12" />,
      title: "Responsabilité Environnementale",
      description: "La responsabilité environnementale est au cœur de notre travail. Nous nous engageons au tri sélectif pour un traitement écologique de vos déchets."
    },
    {
      icon: <Clock className="w-12 h-12" />,
      title: "Flexibilité & Rapidité",
      description: "Notre agenda s'adapte quotidiennement aux besoins de nos clients. Nous répondons sous 24h et garantissons un travail rapide et minutieux."
    },
    {
      icon: <Award className="w-12 h-12" />,
      title: "Qualité",
      description: "BELKGROUP est une entreprise dynamique. Nous apportons des solutions sur mesure pour répondre au mieux aux besoins de nos clients."
    }
  ];

  const services = [
    {
      image: "https://images.unsplash.com/photo-1681731059898-72407df8431a",
      title: "Débarras d'encombrants",
      description: "Nous enlevons rapidement tous vos objets encombrants : meubles, électroménagers, matelas, cartons. Service complet avec tri et évacuation professionnelle."
    },
    {
      image: "https://images.unsplash.com/photo-1671351967814-834d376fcd1d",
      title: "Vide maison complet",
      description: "Succession, déménagement ou rénovation ? Nous vidons entièrement votre maison ou appartement avec soin et efficacité. Prise en charge totale de A à Z."
    },
    {
      image: "https://images.unsplash.com/photo-1709831917664-804b57448953",
      title: "Vide cave et grenier",
      description: "Libérez vos caves, greniers et garages encombrés. Notre équipe accède aux espaces difficiles et évacue tous vos encombrants en toute sécurité."
    },
    {
      image: "https://images.unsplash.com/photo-1581573833610-487d80de9aab",
      title: "Débarras de bureau",
      description: "Fermeture, déménagement ou réorganisation de bureaux ? Nous nous occupons du débarras professionnel de vos locaux commerciaux et administratifs."
    }
  ];

  const galleryImages = [
    { url: "https://customer-assets.emergentagent.com/job_belk-evolved/artifacts/2lafmwkg_WhatsApp%20Image%202025-12-29%20at%2023.43.52%20%281%29.jpeg", category: "before-after" },
    { url: "https://customer-assets.emergentagent.com/job_belk-evolved/artifacts/g1qvvgcj_WhatsApp%20Image%202025-12-29%20at%2023.43.52%20%282%29.jpeg", category: "clearance" },
    { url: "https://customer-assets.emergentagent.com/job_belk-evolved/artifacts/6b0kegfx_WhatsApp%20Image%202025-12-29%20at%2023.43.52.jpeg", category: "clearance" },
    { url: "https://customer-assets.emergentagent.com/job_belk-evolved/artifacts/sjhndmx0_WhatsApp%20Image%202025-12-29%20at%2023.43.53.jpeg", category: "before-after" },
    { url: "https://images.unsplash.com/photo-1713730060332-2e478ce2e318", category: "clearance" },
    { url: "https://images.unsplash.com/photo-1758272421751-963195322eaa", category: "cleaning" },
    { url: "https://images.pexels.com/photos/7464722/pexels-photo-7464722.jpeg", category: "clearance" },
    { url: "https://images.unsplash.com/photo-1581573833610-487d80de9aab", category: "clearance" }
  ];

  const reviews = [
    {
      name: "Ihsan Chamali",
      date: "02/02/2025",
      rating: 5,
      text: "Travail impeccable et prix vraiment abordables. Super équipe et nettoyage nickel ! Je recommande vivement."
    },
    {
      name: "Alexandre FROSSARD",
      date: "08/11/2024",
      rating: 5,
      text: "Top!! Rien à redire, ils ont vidé un arrière-bâtiment entier avec accès difficile, rempli d'encombrants et de déchets, en trois jours."
    },
    {
      name: "Nicolas Seigneur",
      date: "11/05/2024",
      rating: 5,
      text: "Super équipe, très efficace et sympathique! Très arrangeants et prix raisonnables! Un déménagement qui semblait un cauchemar est presque devenu un plaisir!"
    },
    {
      name: "Serge Van Rompay",
      date: "11/03/2022",
      rating: 5,
      text: "Je suis très satisfait du travail qu'ils ont effectué. Je recommande vraiment cette entreprise. Ils sont arrivés à l'heure convenue, une équipe efficace et sympathique."
    }
  ];

  const filteredGallery = activeFilter === 'all' ? galleryImages : galleryImages.filter(img => img.category === activeFilter);

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Animated Background Waves */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-30">
        <svg className="absolute top-0 left-0 w-full" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path 
            fill="url(#gradient1)" 
            fillOpacity="1" 
            d="M0,160L48,144C96,128,192,96,288,106.7C384,117,480,171,576,181.3C672,192,768,160,864,149.3C960,139,1056,149,1152,138.7C1248,128,1344,96,1392,80L1440,64L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
            style={{ 
              transform: `translateY(${scrollY * 0.2}px)`,
              transition: 'transform 0.1s ease-out'
            }}
          >
            <animate attributeName="d" dur="10s" repeatCount="indefinite" values="
              M0,160L48,144C96,128,192,96,288,106.7C384,117,480,171,576,181.3C672,192,768,160,864,149.3C960,139,1056,149,1152,138.7C1248,128,1344,96,1392,80L1440,64L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z;
              M0,128L48,149.3C96,171,192,213,288,208C384,203,480,149,576,128C672,107,768,117,864,138.7C960,160,1056,192,1152,186.7C1248,181,1344,139,1392,117.3L1440,96L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z;
              M0,160L48,144C96,128,192,96,288,106.7C384,117,480,171,576,181.3C672,192,768,160,864,149.3C960,139,1056,149,1152,138.7C1248,128,1344,96,1392,80L1440,64L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z
            " />
          </path>
          <defs>
            <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style={{ stopColor: '#06b6d4', stopOpacity: 0.4 }} />
              <stop offset="50%" style={{ stopColor: '#22d3ee', stopOpacity: 0.3 }} />
              <stop offset="100%" style={{ stopColor: '#06b6d4', stopOpacity: 0.4 }} />
            </linearGradient>
          </defs>
        </svg>
        <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path 
            fill="url(#gradient2)" 
            fillOpacity="1" 
            d="M0,128L48,138.7C96,149,192,171,288,165.3C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,165.3C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            style={{ 
              transform: `translateY(${-scrollY * 0.15}px)`,
              transition: 'transform 0.1s ease-out'
            }}
          >
            <animate attributeName="d" dur="12s" repeatCount="indefinite" values="
              M0,128L48,138.7C96,149,192,171,288,165.3C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,165.3C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z;
              M0,160L48,170.7C96,181,192,203,288,197.3C384,192,480,160,576,138.7C672,117,768,107,864,128C960,149,1056,203,1152,208C1248,213,1344,171,1392,149.3L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z;
              M0,128L48,138.7C96,149,192,171,288,165.3C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,165.3C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z
            " />
          </path>
          <defs>
            <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style={{ stopColor: '#1e3a8a', stopOpacity: 0.5 }} />
              <stop offset="50%" style={{ stopColor: '#06b6d4', stopOpacity: 0.4 }} />
              <stop offset="100%" style={{ stopColor: '#1e3a8a', stopOpacity: 0.5 }} />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Floating particles */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-cyan-400 rounded-full opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${5 + Math.random() * 10}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrollY > 50 ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center group cursor-pointer">
              <img 
                src="https://customer-assets.emergentagent.com/job_belk-evolved/artifacts/h2noocde_Design%20sans%20titre.png"
                alt="BelkGroup Cleaning Service Logo"
                className={`h-16 w-auto object-contain transition-all duration-300 group-hover:scale-105 ${
                  scrollY > 50 ? 'drop-shadow-lg' : 'drop-shadow-2xl'
                }`}
              />
            </div>
            <div className="hidden md:flex space-x-8">
              {['Nos valeurs', 'Services', 'Réalisations', 'Avis', 'Contact'].map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => scrollToSection(item.toLowerCase().replace(' ', '-'))}
                  className={`font-medium transition-colors hover:text-cyan-500 ${
                    scrollY > 50 ? 'text-gray-700' : 'text-white'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
            <Button 
              onClick={() => scrollToSection('contact')}
              className="bg-cyan-500 hover:bg-cyan-600 text-white"
            >
              Devis gratuit
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1581573833610-487d80de9aab)',
            transform: `translateY(${scrollY * 0.5}px)`,
            filter: 'brightness(0.7)'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/90 to-blue-900/80"></div>
        </div>
        
        {/* Floating shapes with parallax */}
        <div 
          className="absolute top-20 left-10 w-20 h-20 bg-cyan-400/20 rounded-full blur-xl"
          style={{ transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)` }}
        />
        <div 
          className="absolute bottom-40 right-20 w-32 h-32 bg-blue-500/20 rounded-full blur-xl"
          style={{ transform: `translate(${mousePosition.x * -0.03}px, ${mousePosition.y * -0.03}px)` }}
        />
        <div 
          className="absolute top-1/2 left-1/3 w-24 h-24 bg-cyan-300/20 rounded-full blur-xl"
          style={{ transform: `translate(${mousePosition.x * 0.015}px, ${mousePosition.y * 0.015}px)` }}
        />
        
        <div className="relative z-10 text-center text-white px-4 max-w-5xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in drop-shadow-lg">
            Spécialiste en débarras et vide maison
          </h1>
          <p className="text-xl md:text-2xl mb-8 animate-fade-in-delay drop-shadow-md">
            Débarras d'encombrants • Vide maison • Caves • Bureaux
          </p>
          <p className="text-lg md:text-xl mb-8 animate-fade-in-delay opacity-90">
            Pour particuliers et professionnels - Service rapide et professionnel
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-delay-2">
            <Button 
              onClick={() => scrollToSection('contact')}
              size="lg" 
              className="bg-cyan-500 text-white hover:bg-cyan-600 hover:scale-105 text-lg px-8 py-6 transition-all duration-300"
            >
              Demandez votre devis
              <ArrowRight className="ml-2" />
            </Button>
            <Button 
              onClick={() => scrollToSection('avis')}
              size="lg" 
              variant="outline" 
              className="border-2 border-white text-white hover:bg-white hover:text-cyan-600 hover:scale-105 text-lg px-8 py-6 transition-all duration-300"
            >
              Voir les avis clients
            </Button>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section id="nos-valeurs" className="py-20 bg-gradient-to-b from-gray-50 to-white relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
              style={{
                transform: scrollY > 500 ? 'translateY(0)' : 'translateY(50px)',
                opacity: scrollY > 500 ? 1 : 0,
                transition: 'all 0.8s ease-out'
              }}
            >
              Nos Valeurs
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-blue-900 mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, idx) => (
              <Card 
                key={idx} 
                className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border-t-4 border-cyan-500 relative overflow-hidden"
                style={{
                  transform: scrollY > 500 ? 'translateY(0)' : 'translateY(80px)',
                  opacity: scrollY > 500 ? 1 : 0,
                  transition: `all 0.8s ease-out ${idx * 0.1}s`
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <CardContent className="p-6 text-center relative z-10">
                  <div className="text-cyan-600 mb-4 flex justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-white relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div
              style={{
                transform: scrollY > 1000 ? 'translateX(0)' : 'translateX(-100px)',
                opacity: scrollY > 1000 ? 1 : 0,
                transition: 'all 0.8s ease-out'
              }}
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                BELKGROUP
              </h2>
              <h3 className="text-2xl font-semibold text-cyan-600 mb-4">
                Votre spécialiste en débarras et vide maison dans votre région !
              </h3>
              <p className="text-gray-600 mb-4">
                Besoin de débarrasser une maison, un appartement, une cave, un grenier ou des bureaux encombrés ? 
                BELKGROUP est votre partenaire de confiance ! Experts du débarras, nous intervenons rapidement 
                pour vider et évacuer tous vos encombrants.
              </p>
              <p className="text-gray-600 mb-6">
                Succession, déménagement, fermeture de bureau ou simplement besoin de libérer de l'espace ? 
                Notre équipe professionnelle s'occupe de tout : tri, évacuation, nettoyage après débarras.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center space-x-2 group">
                  <CheckCircle className="w-5 h-5 text-green-600 group-hover:scale-125 transition-transform" />
                  <span className="text-gray-700">10 ans d'expérience</span>
                </div>
                <div className="flex items-center space-x-2 group">
                  <CheckCircle className="w-5 h-5 text-green-600 group-hover:scale-125 transition-transform" />
                  <span className="text-gray-700">Disponible 7j/7</span>
                </div>
                <div className="flex items-center space-x-2 group">
                  <CheckCircle className="w-5 h-5 text-green-600 group-hover:scale-125 transition-transform" />
                  <span className="text-gray-700">Réponse sous 24h</span>
                </div>
              </div>
            </div>
            <div 
              className="relative"
              style={{
                transform: scrollY > 1000 ? 'translateX(0) scale(1)' : 'translateX(100px) scale(0.9)',
                opacity: scrollY > 1000 ? 1 : 0,
                transition: 'all 0.8s ease-out'
              }}
            >
              <img 
                src="https://images.unsplash.com/photo-1614359835514-92f8ba196357"
                alt="BelkGroup Clearing service team"
                className="rounded-lg shadow-2xl hover:shadow-cyan-300 transition-shadow duration-500"
              />
              <div className="absolute -bottom-6 -left-6 bg-gradient-to-br from-cyan-500 to-blue-900 text-white p-6 rounded-lg shadow-xl hover:scale-110 transition-transform duration-300 cursor-pointer">
                <p className="text-4xl font-bold">10+</p>
                <p className="text-sm">Années d'expérience</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gradient-to-b from-gray-50 to-white relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
              style={{
                transform: scrollY > 1600 ? 'translateY(0)' : 'translateY(50px)',
                opacity: scrollY > 1600 ? 1 : 0,
                transition: 'all 0.8s ease-out'
              }}
            >
              Nos Services
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-blue-900 mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, idx) => (
              <Card 
                key={idx} 
                className="group overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
                style={{
                  transform: scrollY > 1700 ? 'translateY(0)' : 'translateY(80px)',
                  opacity: scrollY > 1700 ? 1 : 0,
                  transition: `all 0.8s ease-out ${idx * 0.15}s`
                }}
              >
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-125 group-hover:rotate-2 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent group-hover:from-cyan-900/80 transition-colors duration-500"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:scale-105 transition-transform duration-300">{service.title}</h3>
                  </div>
                </div>
                <CardContent className="p-6">
                  <p className="text-gray-600">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="réalisations" className="py-20 bg-white relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
              style={{
                transform: scrollY > 2800 ? 'translateY(0)' : 'translateY(50px)',
                opacity: scrollY > 2800 ? 1 : 0,
                transition: 'all 0.8s ease-out'
              }}
            >
              Nos Réalisations
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-blue-700 mx-auto mb-8"></div>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {['all', 'before-after', 'clearance', 'cleaning'].map((filter) => (
                <Button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  variant={activeFilter === filter ? 'default' : 'outline'}
                  className={`transition-all duration-300 ${
                    activeFilter === filter 
                      ? 'bg-cyan-600 hover:bg-cyan-700 scale-110' 
                      : 'hover:scale-105'
                  }`}
                >
                  {filter === 'all' ? 'Tout voir' : 
                   filter === 'before-after' ? 'Avant/Après' :
                   filter === 'clearance' ? 'Débarras' : 'Nettoyage'}
                </Button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGallery.map((img, idx) => (
              <div 
                key={idx} 
                className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-500 h-64 transform hover:scale-105"
                style={{
                  transform: scrollY > 2900 ? 'translateY(0) rotate(0deg)' : 'translateY(60px) rotate(-2deg)',
                  opacity: scrollY > 2900 ? 1 : 0,
                  transition: `all 0.6s ease-out ${idx * 0.1}s`
                }}
              >
                <img 
                  src={img.url} 
                  alt={`Gallery ${idx + 1}`}
                  className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 via-blue-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end p-6">
                  <div className="transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                    <p className="text-white font-bold text-lg mb-2">
                      {img.category === 'before-after' ? 'Avant/Après' :
                       img.category === 'clearance' ? 'Débarras professionnel' : 'Nettoyage après débarras'}
                    </p>
                    <p className="text-blue-200 text-sm">Vide maison et évacuation d'encombrants</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="avis" className="py-20 bg-gradient-to-b from-gray-50 to-white relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
              style={{
                transform: scrollY > 3500 ? 'translateY(0)' : 'translateY(50px)',
                opacity: scrollY > 3500 ? 1 : 0,
                transition: 'all 0.8s ease-out'
              }}
            >
              Avis Clients
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-blue-900 mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {reviews.map((review, idx) => (
              <Card 
                key={idx} 
                className="hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 hover:rotate-1"
                style={{
                  transform: scrollY > 3600 ? 'translateY(0)' : 'translateY(60px)',
                  opacity: scrollY > 3600 ? 1 : 0,
                  transition: `all 0.7s ease-out ${idx * 0.1}s`
                }}
              >
                <CardContent className="p-6">
                  <div className="flex mb-3">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star 
                        key={i} 
                        className="w-5 h-5 fill-yellow-400 text-yellow-400 animate-pulse" 
                        style={{ animationDelay: `${i * 0.1}s` }}
                      />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4 text-sm italic">&quot;{review.text}&quot;</p>
                  <div className="border-t pt-4">
                    <p className="font-semibold text-gray-900">{review.name}</p>
                    <p className="text-sm text-gray-500">{review.date}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
              style={{
                transform: scrollY > 4200 ? 'translateY(0)' : 'translateY(50px)',
                opacity: scrollY > 4200 ? 1 : 0,
                transition: 'all 0.8s ease-out'
              }}
            >
              Contactez-nous
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-blue-900 mx-auto"></div>
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            <div
              style={{
                transform: scrollY > 4300 ? 'translateX(0)' : 'translateX(-80px)',
                opacity: scrollY > 4300 ? 1 : 0,
                transition: 'all 0.8s ease-out'
              }}
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Envoyez-nous un message</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  name="name"
                  placeholder="Votre nom"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="transition-all duration-300 focus:scale-105 focus:shadow-lg"
                  required
                />
                <Input
                  name="email"
                  type="email"
                  placeholder="Votre email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="transition-all duration-300 focus:scale-105 focus:shadow-lg"
                  required
                />
                <Input
                  name="phone"
                  placeholder="Votre numéro de téléphone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="transition-all duration-300 focus:scale-105 focus:shadow-lg"
                />
                <Input
                  name="postalCode"
                  placeholder="Votre code postal"
                  value={formData.postalCode}
                  onChange={handleInputChange}
                  className="transition-all duration-300 focus:scale-105 focus:shadow-lg"
                />
                <Input
                  name="subject"
                  placeholder="Sujet"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="transition-all duration-300 focus:scale-105 focus:shadow-lg"
                  required
                />
                <Textarea
                  name="message"
                  placeholder="Votre message"
                  rows={6}
                  value={formData.message}
                  onChange={handleInputChange}
                  className="transition-all duration-300 focus:scale-105 focus:shadow-lg"
                  required
                />
                <Button 
                  type="submit" 
                  className="w-full bg-cyan-600 hover:bg-cyan-700 hover:scale-105 text-lg py-6 transition-all duration-300"
                >
                  Envoyer le message
                </Button>
              </form>
            </div>
            <div 
              className="space-y-6"
              style={{
                transform: scrollY > 4300 ? 'translateX(0)' : 'translateX(80px)',
                opacity: scrollY > 4300 ? 1 : 0,
                transition: 'all 0.8s ease-out 0.2s'
              }}
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Nos coordonnées</h3>
              <Card className="border-l-4 border-blue-600">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-6 h-6 text-cyan-600 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-gray-900">Adresse</p>
                      <p className="text-gray-600">Rue Royal 11, 1000 Bruxelles, Belgique</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Phone className="w-6 h-6 text-cyan-600 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-gray-900">Téléphone</p>
                      <p className="text-gray-600">+32(0)493 38 11 89</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Mail className="w-6 h-6 text-cyan-600 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-gray-900">Email</p>
                      <p className="text-gray-600">belkgroupe@gmail.com</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-cyan-500 to-blue-900 text-white">
                <CardContent className="p-6">
                  <h4 className="text-xl font-bold mb-4">Horaires d'ouverture</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Lundi - Samedi</span>
                      <span className="font-semibold">08:00 – 20:00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Dimanche</span>
                      <span className="font-semibold">08:00 – 18:00</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <img 
                  src="https://customer-assets.emergentagent.com/job_belk-evolved/artifacts/h2noocde_Design%20sans%20titre.png"
                  alt="BelkGroup Cleaning Service Logo"
                  className="h-16 w-auto object-contain"
                />
              </div>
              <p className="text-gray-400 mb-4">
                Spécialiste en débarras d'encombrants et vide maison pour particuliers et professionnels.
              </p>
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-900 rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300 cursor-pointer">
                  <span className="text-xl">f</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li className="hover:text-white transition-colors cursor-pointer">Débarras d'encombrants</li>
                <li className="hover:text-white transition-colors cursor-pointer">Vide maison complet</li>
                <li className="hover:text-white transition-colors cursor-pointer">Vide cave et grenier</li>
                <li className="hover:text-white transition-colors cursor-pointer">Débarras de bureau</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Zones d'intervention</h4>
              <p className="text-gray-400 text-sm mb-2">Nous opérons dans toute la Belgique :</p>
              <ul className="space-y-1 text-gray-400 text-sm">
                <li>Bruxelles-Capitale</li>
                <li>Région Wallonne</li>
                <li>Région Flamande</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
            <p>© 2025 BELKGROUP - Tous droits réservés</p>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-gradient-to-br from-cyan-500 to-blue-900 text-white p-4 rounded-full shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 z-50 hover:scale-125 animate-bounce"
          style={{ animation: 'pulse-glow 2s infinite' }}
        >
          <ArrowUp className="w-6 h-6" />
        </button>
      )}
    </div>
  );
};

export default Home;