import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { MessageCircle, Truck, ShieldCheck, CreditCard, Star, Clock, Flame, Users, ChevronDown, CheckCircle2, ShoppingBag, ArrowRight, X, Phone, User, MapPin, Check, Instagram, MoreVertical, Video, Play, Mic, Menu } from 'lucide-react';

// --- DATA ---
const products = [
  { 
    id: 1, 
    name: 'Jellaba Chic Satiné - Gris & Rose', 
    price: 299, 
    oldPrice: 450, 
    category: 'Premium',
    tag: 'Best Seller',
    image: 'https://lh3.googleusercontent.com/d/1dN6gHeczAGCRCMyMX--k6YI6BAU4w9DV',
    description: 'جلابة مغربية راقية بلمسة "Chic" لبسي الهمة والشان مع هاد الجلابة الرائعة اللي كتجمع بين الأصالة والحداثة. مخدومة بتوب حريري (Satiné) كيطيح على الذات، فيه نقشات فنية وألوان هادية كتمزج بين الرمادي والوردي. الجلابة مخدومة بتقنية "خدمة المعلم" بالسفيفة والعقاد المتقونين على الصدر والكمام، باش تعطيك إطلالة أنيقة ومتميزة فالمناسبات ديالك أو الزيارات العائلية.'
  },
  { 
    id: 2, 
    name: 'جلابة راقية بلمسة عصرية', 
    price: 299, 
    oldPrice: 450, 
    category: 'Premium',
    tag: 'Nouveau',
    image: 'https://lh3.googleusercontent.com/d/1kGFGXN6KS-c9ryKWpfCv8RXwOH09Y2hW',
    description: 'هاد الجلابة مخدومة بعناية باش تعطيك إطلالة أنيقة ومتميزة. الثوب ديالها فيه بريق ساحر وتداخل رائع بين الألوان، مع خدمة "السفيفة" المتقونة اللي كاتزيدها همة وشان. مثالية للمناسبات وللاستقبالات العائلية، كتجمع بين الراحة والأناقة المغربية الأصيلة.'
  },
  { 
    id: 3, 
    name: 'جلابة هماوية وأنيقة باللون الذهبي الفاتح', 
    price: 299, 
    oldPrice: 450, 
    category: 'Premium',
    tag: 'Nouveau',
    image: 'https://lh3.googleusercontent.com/d/1cnyGJTyV8V9OY_iPnert5biJGwSknZOO',
    description: 'بيني الأناقة المغربية ديالك مع هاد الجلابة الرائعة. مخدومة بثوب فيه نقشات خفيفة وراقية كتعطي بريق زوين كيتماشى مع كاع المناسبات. الجلابة مخدومة بسفيفة متقونة "خدمة المعلم" على طول الصدر وفاليدين، مع "قب" كلاسيكي كيزيدها همة وشان. مناسبة بزاف للعراضات، الأعياد، ولا حتى إلا بغيتي تباني متميزة فخرجاتك.'
  },
  { 
    id: 4, 
    name: 'فستان صيفي أنيق و"Chic" باللون البيج', 
    price: 249, 
    oldPrice: 450, 
    category: 'Summer',
    tag: 'Nouveau',
    image: 'https://lh3.googleusercontent.com/d/1baWUP5782tIfXQ6oYzAw688DL3ZuV0vx',
    description: 'هاد الكسوة هي اللي غاتحتاجي باش تباني أنيقة ومرتاحة فهاد الصيف. مخدومة بتوب خفيف وبارد، فصالة عريضة ومستورة مع ديكور زوين فالعنق كيعطيها لمسة "Classique". مثالية للخروجات اليومية، الخدمة، ولا حتى للمناسبات الخفيفة حيت كتجمع بين البساطة والرقي.'
  },
  { 
    id: 5, 
    name: 'فستان "Maxi" أنيق بلون سماوي', 
    price: 249, 
    oldPrice: 450, 
    category: 'Summer',
    tag: 'Nouveau',
    image: 'https://lh3.googleusercontent.com/d/1C_dWSRVb_u4LmkPQAeJUr7Ys7ZibR_uZ',
    description: 'برزي الأناقة ديالك مع هاد الكسوة الطويلة والراقية. مصممة بلمسة عصرية مع "col lavallière" (كرافاطة) فالعنق وكمام طوال مجموعين كيعطيو همة وشان. الثوب ديالها كيبان خفيف ومريح، مثالي للخروجات الصيفية، الخدمة، ولا المناسبات اللي كتبغي تكوني فيها Chic ومرتاحة فلبستك.'
  },
  { 
    id: 6, 
    name: 'Robe Longue مخططة: الأناقة والراحة', 
    price: 249, 
    oldPrice: 450, 
    category: 'Summer',
    tag: 'Nouveau',
    image: 'https://lh3.googleusercontent.com/d/1chISRsvRBKMHqeEYNIEtIRMLId-RdN1b',
    description: 'جديدنا اليوم، كسوة طويلة (Robe Maxi) بتصميم عصري ومخطط بالطول اللي كيعطي همة وطولة. مخدومة بصداف من الفوق حتى لتحت وكول Chemise كلاسيكي، مع لاستيك فالخصر باش يجي العبار هو هذاك. الثوب خفيف ومريح، مثالية للخروجات اليومية أو السفر، وكتجمع بين الحشمة والستيل "Chic".'
  },
  { 
    id: 7, 
    name: 'كسوة (Robe) مخططة أنيقة وخفيفة', 
    price: 249, 
    oldPrice: 450, 
    category: 'Summer',
    tag: 'Nouveau',
    image: 'https://lh3.googleusercontent.com/d/1irW0Hf73XioNgorFlCVQEKokGgm81hUV',
    description: 'هاد الكسوة (Robe chemise) هي اللي غتحتاجي باش تكوني مرتاحة وأنيقة فكاع خروجاتك. مخدومة بتوب خفيف ومبرد، مخططة بالطول باش تعطي همة وشياكة. فيها صديفات من القدام وحزيم فالوسط كيخليك تحكمي فالقياس اللي بغيتي، مع فتحات فالتجنب كيعطيوها لمسة عصرية.'
  },
  { 
    id: 8, 
    name: 'روب شوميز (Robe Chemise) صيفية مخططة', 
    price: 249, 
    oldPrice: 450, 
    category: 'Summer',
    tag: 'Nouveau',
    image: 'https://lh3.googleusercontent.com/d/1_tk85B2Rvy_wkzd1GzhdnLhfx0zU3nAa',
    description: 'كسوة طويلة بتصميم "Chemise" عصري، مخدومة بثوب خفيف ومريح مثالي للأيام المشمسة والحرارة. كتميز بخطوط طولية باللون الأخضر البارد والأبيض اللي كيعطيو مظهر أنيق ورشيق. فيها صدفات من الفوق لتحت، مع "لاستيك" فالتوسط كيبين "لاطاي" بشكل زوين، وفتحات فالجناب باش تحركي بكل حرية وراحة.'
  },
  { 
    id: 9, 
    name: 'فستان "Robe Chemise" أنيق ومريح بالخطوط الزرقاء', 
    price: 249, 
    oldPrice: 450, 
    category: 'Summer',
    tag: 'Nouveau',
    image: 'https://lh3.googleusercontent.com/d/1zwRBM3XXDZ4TIB4X3LQDVrg6sDJn_QRW',
    description: 'بيني الأناقة ديالك مع هاد الفستان العصري اللي كيجمع بين الراحة والشياكة. كيجي بتصميم مخطط باللونين الأزرق والأبيض اللي كيعطي مظهر كلاسيكي وزوين، مع حزام فالثوب باش يحدد الخصر ويبرز الرشاقة ديالك. مخدوم بصدايف من القدام وأكمام طويلة، مثالي للخدمة، الخرجات اليومية، وحتى المناسبات الخفيفة. قطعة "Chic" وضرورية تكون عندك فهاد الفصل.'
  },
  { 
    id: 10, 
    name: 'كسوة "Chemisier" صيفية أنيقة ومريحة', 
    price: 249, 
    oldPrice: 450, 
    category: 'Summer',
    tag: 'Nouveau',
    image: 'https://lh3.googleusercontent.com/d/1YSYKN1XwqTVrdHH8HSL1U72mAH1X69ax',
    description: 'هاد الكسوة هي اللي غادي تحتاجي باش تباني أنيقة وفنفس الوقت مرتاحة. فصالة عصرية بالخطوط الطولية اللي كاتعطي همة وطول، مع أزرار من القدام وتصميم كيناسب الخروجات اليومية ولا حتى الخدمة. الثوب ديالها خفيف وكا يخليك تحسي بالبرودة والراحة طول النهار.'
  },
  { 
    id: 11, 
    name: 'Chemise Longue مخططة بلمسة أنيقة', 
    price: 249, 
    oldPrice: 450, 
    category: 'Summer',
    tag: 'Nouveau',
    image: 'https://lh3.googleusercontent.com/d/1-VlGFqusnlT4VblAKnLiOtYYpw4PNSl1',
    description: 'كسوة طويلة على شكل قميص (Chemise)، مريحة بزاف ومثالية للأجواء الصيفية والربيعية. مخدومة بثوب خفيف فيه خطوط عمودية كتعطي همة ورشاقة فالبسة، مع جيب فالصدر وفتحات جانبية كتزيدها لمسة عصرية وكتسهل عليك الحركة. مناسبة بزاف للخدمة، السفر، أو الخرجات اليومية بفضل الستيل ديالها اللي كيجمع بين الأناقة والراحة.'
  },
  { 
    id: 12, 
    name: 'كسوة طويلة أنيقة بنقشة الورد الأخضر', 
    price: 249, 
    oldPrice: 450, 
    category: 'Summer',
    tag: 'Nouveau',
    image: 'https://lh3.googleusercontent.com/d/1pi4IiNBlImHoEuVt1HfunfFwUeFFR7nT',
    description: 'جبتي ليك هاد الـ Robe longue اللي كتجمع بين الهمة والراحة. بتصميم عصري وألوان صيفية منعشة، هاد الكسوة مثالية للخرجات وحتى للمناسبات. الثوب ديالها خفيف وبارد، والفصالة واسعة كتعطيك إطلالة راقية ومميزة فالحطة.'
  },
  { 
    id: 13, 
    name: 'فستان صيفي أنيق بنقشة الورود الصفراء', 
    price: 249, 
    oldPrice: 450, 
    category: 'Summer',
    tag: 'Nouveau',
    image: 'https://lh3.googleusercontent.com/d/1M50uZujvQn-eJ62WmDw7SOjRGjhpETJ6',
    description: 'تألقي بهاد الكسوة الطويلة والراقية، اللي كاتجمع بين الأناقة والراحة. مخدومة بثوب خفيف ومبرد، مثالية للأجواء الصيفية والخريجات. كتميز بتصميم عصري فيه صداف من القدام ونقشات ورود باللون الأصفر والذهبي اللي كيعطيوك طلة Chic ومتميزة. مناسبة بزاف للمحجبات وغير المحجبات اللي كيقلبو على الستيل المستور والأنيق فمرة وحدة.'
  },
];

const WA_NUMBER = '212773656448';

export default function App() {
  const [timeLeft, setTimeLeft] = useState(600);
  const [viewers, setViewers] = useState(24);
  const [notification, setNotification] = useState<string | null>(null);
  const [stock, setStock] = useState(12);
  const [selectedProduct, setSelectedProduct] = useState<typeof products[0] | null>(null);
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [heroIndex, setHeroIndex] = useState(0);
  
  const heroImages = [
    'https://lh3.googleusercontent.com/d/1dN6gHeczAGCRCMyMX--k6YI6BAU4w9DV',
    'https://lh3.googleusercontent.com/d/1kGFGXN6KS-c9ryKWpfCv8RXwOH09Y2hW',
    'https://lh3.googleusercontent.com/d/1cnyGJTyV8V9OY_iPnert5biJGwSknZOO',
    'https://lh3.googleusercontent.com/d/1baWUP5782tIfXQ6oYzAw688DL3ZuV0vx'
  ];
  
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  const yText = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacityText = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    const t = setInterval(() => setTimeLeft(p => p > 0 ? p - 1 : 0), 1000);
    const v = setInterval(() => setViewers(Math.floor(Math.random() * 20) + 20), 5000);
    const n = setInterval(() => {
      const names = ['فاطمة','سارة','مريم','خديجة','زينب','ليلى','سلمى','حنان','كوثر'];
      const cities = ['الدار البيضاء','الرباط','مراكش','طنجة','فاس','أكادير'];
      setNotification(`🔥 ${names[Math.floor(Math.random()*names.length)]} من ${cities[Math.floor(Math.random()*cities.length)]} طلبت دابا`);
      setTimeout(()=>setNotification(null),4000);
    }, 15000);
    
    const s = setInterval(() => setStock(p => p > 3 ? p - 1 : p), 60000);
    const h = setInterval(() => setHeroIndex(p => (p + 1) % heroImages.length), 5000);

    return () => { clearInterval(t); clearInterval(v); clearInterval(n); clearInterval(s); clearInterval(h); };
  }, [heroImages.length]);

  const handleQuickOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const name = formData.get('name');
    const phone = formData.get('phone');
    const city = formData.get('city');
    const size = formData.get('size');
    const product = selectedProduct?.name || products[0].name;
    const price = selectedProduct?.price || products[0].price;

    const message = `طلب جديد من تريند شوب:\nالمنتج: ${product}\nالمقاس: ${size}\nالثمن: ${price} درهم\nالاسم: ${name}\nالهاتف: ${phone}\nالمدينة: ${city}`;
    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`, '_blank');
    setShowOrderForm(false);
    setSelectedProduct(null);
  };

  const sendWhatsApp = (productName: string, price: number) => {
    const message = `سلام تريند شوب، بغيت نطلب ${productName} بثمن ${price} درهم، واش مازال متوفر؟`;
    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec < 10 ? '0' : ''}${sec}`;
  };

  return (
    <div className="bg-[#0a0a0a] text-white min-h-screen font-sans selection:bg-[#d4af37] selection:text-black overflow-x-hidden rtl" dir="rtl">
      
      {/* --- FONTS & STYLES --- */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Amiri:ital,wght@0,400;0,700;1,400;1,700&family=Almarai:wght@300;400;700;800&family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&display=swap');
        
        .font-story { font-family: 'Amiri', serif; }
        .font-ui { font-family: 'Almarai', sans-serif; }
        .font-logo { font-family: 'Playfair Display', serif; }
        
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(100%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }

        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        
        .gold-gradient {
          background: linear-gradient(135deg, #d4af37 0%, #f9e29c 50%, #d4af37 100%);
        }
        
        .gold-text {
          background: linear-gradient(90deg, #d4af37 0%, #f9e29c 25%, #fff 50%, #f9e29c 75%, #d4af37 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer 4s linear infinite;
        }

        .gold-border {
          border: 1px solid rgba(212, 175, 55, 0.3);
        }

        .hypnotic-glow {
          box-shadow: 0 0 30px rgba(212, 175, 55, 0.2);
        }

        .clip-path-left {
          clip-path: polygon(0 0, 100% 0, 100% 100%);
        }
        .clip-path-right {
          clip-path: polygon(0 0, 0 100%, 100% 0);
        }
      `}</style>

      {/* NOTIFICATION POPUP */}
      <AnimatePresence>
        {notification && (
          <motion.div 
            initial={{ x: 100, opacity: 0 }} 
            animate={{ x: 0, opacity: 1 }} 
            exit={{ x: 100, opacity: 0 }}
            className="fixed bottom-24 right-4 left-4 md:right-6 md:left-auto md:w-80 bg-white text-black p-5 rounded-2xl z-[200] shadow-2xl flex items-center gap-4 border-r-4 border-[#d4af37]"
          >
            <div className="bg-[#d4af37] p-2 rounded-full">
              <ShoppingBag className="text-white" size={20} />
            </div>
            <div className="font-ui">
              <p className="text-sm font-bold leading-tight">{notification}</p>
              <p className="text-[10px] text-gray-400 mt-1">منذ ثوانٍ قليلة</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* STICKY HEADER */}
      <header className="sticky top-0 w-full z-[150] bg-black/80 backdrop-blur-xl border-b border-[#d4af37]/10">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          <div className="flex items-center gap-8">
            <motion.button 
              whileHover={{ scale: 1.1 }}
              className="text-[#d4af37] lg:hidden cursor-pointer"
            >
              <Menu size={24} />
            </motion.button>
            
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex flex-col items-start"
            >
              <h1 className="font-logo text-xl md:text-2xl font-bold tracking-[0.2em] gold-text">
                TRENDSHOP
              </h1>
              <span className="text-[7px] md:text-[9px] text-[#d4af37]/60 font-black uppercase tracking-[0.5em] mt-1 font-ui">الفخامة المغربية</span>
            </motion.div>
          </div>
          
          <div className="flex items-center gap-6 md:gap-12">
            <nav className="hidden lg:flex items-center gap-10 text-[10px] font-black uppercase tracking-[0.3em] text-[#d4af37]/70 font-ui">
              <a href="#collection" className="hover:text-white transition-colors">المجموعة</a>
              <a href="#about" className="hover:text-white transition-colors">قصتنا</a>
              <a href="#contact" className="hover:text-white transition-colors">تواصلوا معنا</a>
            </nav>
            
            <motion.button 
              whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(212, 175, 55, 0.3)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => { setSelectedProduct(products[0]); setShowOrderForm(true); }}
              className="gold-gradient text-black py-3 px-10 rounded-full font-black text-[10px] md:text-xs shadow-xl transition-all font-ui uppercase tracking-widest"
            >
              اطلبي الآن
            </motion.button>
          </div>
        </div>
      </header>

      {/* HERO SECTION - HYPNOTIC STORYTELLING */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center px-6 pt-20 pb-32 overflow-hidden">
        {/* Background Slideshow */}
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="wait">
            <motion.img 
              key={heroIndex}
              src={heroImages[heroIndex]} 
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 0.4, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full object-cover"
              alt="Background Slideshow"
              referrerPolicy="no-referrer"
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black" />
        </div>

        <motion.div style={{ y: yText, opacity: opacityText }} className="relative z-10 max-w-5xl mx-auto text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-3 bg-[#d4af37]/10 text-[#d4af37] px-6 py-2.5 rounded-full text-[10px] font-black mb-10 border border-[#d4af37]/30 uppercase tracking-[0.2em] font-ui"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#d4af37] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#d4af37]"></span>
            </span>
            سر الأناقة المغربية الخالدة
          </motion.div>
          
          <h1 className="text-4xl md:text-[9rem] font-story font-bold mb-8 leading-[1.2] md:leading-[1] text-white tracking-tight">
            كوني <span className="gold-text italic">الملكة</span> <br /> 
            في كل خطوة
          </h1>
          
          <p className="text-gray-400 text-lg md:text-3xl mb-12 md:text-3xl mb-16 max-w-3xl mx-auto leading-relaxed font-story italic px-4 md:px-0">
            "لأنكِ تستحقين التميز، صممنا لكِ قطعاً تجمع بين سحر التراث المغربي وفخامة التصميم العصري. قصة عشق تبدأ من أول لمسة."
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8 max-w-2xl mx-auto">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(212, 175, 55, 0.4)" }}
              onClick={() => {
                const el = document.getElementById('collection');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full md:w-auto gold-gradient text-black py-5 md:py-6 px-10 md:px-16 rounded-full font-black text-xl md:text-2xl flex items-center justify-center gap-4 transition-all font-ui shadow-2xl"
            >
              اكتشفي المجموعة
              <ArrowRight className="rotate-180" />
            </motion.button>
            
            <div className="flex items-center gap-6 md:gap-10 font-ui">
              <div className="text-center">
                <p className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-[#d4af37] mb-1">المخزون المتبقي</p>
                <p className="text-2xl md:text-3xl font-black text-white">{stock} قطعة</p>
              </div>
              <div className="w-[1px] h-10 md:h-12 bg-[#d4af37]/30" />
              <div className="text-center">
                <p className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-[#d4af37] mb-1">ينتهي العرض في</p>
                <p className="text-2xl md:text-3xl font-mono font-black text-white">{formatTime(timeLeft)}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Floating Elements */}
        <motion.div 
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-10 hidden lg:block z-20"
        >
          <div className="bg-white/5 backdrop-blur p-4 rounded-2xl gold-border shadow-2xl rotate-[-12deg]">
            <img src="https://lh3.googleusercontent.com/d/1dN6gHeczAGCRCMyMX--k6YI6BAU4w9DV" className="w-32 h-40 object-cover rounded-xl" alt="Floating" referrerPolicy="no-referrer" />
          </div>
        </motion.div>
        <motion.div 
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 right-10 hidden lg:block z-20"
        >
          <div className="bg-white/5 backdrop-blur p-4 rounded-2xl gold-border shadow-2xl rotate-[12deg]">
            <img src="https://lh3.googleusercontent.com/d/1dN6gHeczAGCRCMyMX--k6YI6BAU4w9DV" className="w-32 h-40 object-cover rounded-xl" alt="Floating" referrerPolicy="no-referrer" />
          </div>
        </motion.div>
      </section>

      {/* TRUST MARQUEE - GOLD ON BLACK */}
      <section className="bg-black py-8 md:py-12 border-y border-[#d4af37]/20 overflow-hidden relative">
        <div className="flex whitespace-nowrap animate-marquee">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="flex items-center gap-12 md:gap-20 px-10 md:px-20 text-[#d4af37] font-story italic text-xl md:text-3xl tracking-wide">
              <span className="flex items-center gap-3 md:gap-4"><Truck size={24} className="md:w-[28px] md:h-[28px]" /> توصيل سريع لكل المدن</span>
              <span className="flex items-center gap-3 md:gap-4"><ShieldCheck size={24} className="md:w-[28px] md:h-[28px]" /> إتقان واحترافية مغربية فاخرة</span>
              <span className="flex items-center gap-3 md:gap-4"><CreditCard size={24} className="md:w-[28px] md:h-[28px]" /> الدفع عند الاستلام</span>

            </div>
          ))}
        </div>
      </section>

      {/* THE STORY SECTION */}
      <section className="py-20 md:py-32 px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 md:gap-24 items-center">
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative order-2 lg:order-1"
          >
            <div className="aspect-[4/5] rounded-[2rem] overflow-hidden gold-border hypnotic-glow">
              <img 
                src="https://lh3.googleusercontent.com/d/1dN6gHeczAGCRCMyMX--k6YI6BAU4w9DV" 
                className="w-full h-full object-cover"
                alt="Story"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 md:-bottom-10 md:-left-10 bg-black p-6 md:p-10 rounded-[1.5rem] md:rounded-[2rem] gold-border shadow-2xl max-w-[200px] md:max-w-xs hidden sm:block">
              <p className="font-story italic text-lg md:text-2xl text-[#d4af37] mb-4">"كل قطعة هي حكاية إتقان، ننسجها لكِ بحب لتكوني الأجمل."</p>
              <div className="flex items-center gap-3 md:gap-4">
                <div className="w-10 h-10 md:w-12 md:h-12 gold-gradient rounded-full flex items-center justify-center text-black font-black">T</div>
                <p className="font-ui font-black text-[10px] md:text-xs uppercase tracking-widest">مؤسس تريند شوب</p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2"
          >
            <h2 className="text-4xl md:text-8xl font-story font-bold text-white mb-6 md:mb-10">إتقان <span className="gold-text">التفاصيل</span></h2>
            <p className="text-lg md:text-xl text-gray-400 mb-8 md:mb-12 leading-relaxed font-story italic">
              في تريند شوب، نؤمن أن الجمال يكمن في التفاصيل. نختار أجود الأثواب من "كريب" و "مليفة" و "موبرة" لنضمن لكِ راحة تامة وفخامة تدوم. كل تطريزة هي لمسة فنية تحاكي ذوقك الرفيع.
            </p>
            <div className="grid grid-cols-2 gap-6 md:gap-10 font-ui">
              <div className="p-4 md:p-6 bg-white/5 rounded-2xl md:rounded-3xl gold-border">
                <h4 className="gold-text text-3xl md:text-4xl font-black mb-1 md:mb-2">100%</h4>
                <p className="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-[#d4af37]">أثواب أصلية فاخرة</p>
              </div>
              <div className="p-4 md:p-6 bg-white/5 rounded-2xl md:rounded-3xl gold-border">
                <h4 className="gold-text text-3xl md:text-4xl font-black mb-1 md:mb-2">5000+</h4>
                <p className="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-[#d4af37]">زبونة سعيدة بالمغرب</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* PRODUCTS GRID */}
      <section id="collection" className="px-6 py-20 md:py-32 max-w-7xl mx-auto">
        <div className="text-center mb-16 md:mb-24">
          <h2 className="text-4xl md:text-[10rem] font-story font-bold text-white mb-6">المجموعة <span className="gold-text">الذهبية</span></h2>
          <div className="w-24 md:w-32 h-[2px] gold-gradient mx-auto" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-12">
          {products.map((p, i) => (
            <motion.div 
              key={p.id} 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="group relative"
            >
              <div 
                className="relative w-full h-64 md:h-[450px] rounded-2xl md:rounded-[2rem] overflow-hidden gold-border transition-all duration-700 cursor-pointer hypnotic-glow"
                onClick={() => { setSelectedProduct(p); setShowOrderForm(true); }}
              >
                <img 
                  src={p.image} 
                  alt={p.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 rounded-lg" 
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="gold-gradient text-black py-3 px-6 md:py-4 md:px-10 rounded-full font-black text-[10px] md:text-xs uppercase tracking-widest transform translate-y-10 group-hover:translate-y-0 transition-transform duration-500 font-ui">
                    اطلبي الآن
                  </div>
                </div>
                
                {p.tag && (
                  <div className="absolute top-3 right-3 md:top-6 md:right-6 gold-gradient text-black text-[8px] md:text-[10px] font-black px-3 py-1 md:px-4 md:py-1.5 rounded-full shadow-xl uppercase tracking-[0.2em] font-ui z-10">
                    {p.tag}
                  </div>
                )}
              </div>

              <div className="mt-4 md:mt-8 px-2 md:px-4 text-center">
                <div className="flex items-center justify-center gap-2 mb-1 md:mb-2">
                  <span className="text-[8px] md:text-[10px] text-[#d4af37] font-black uppercase tracking-widest font-ui">{p.category}</span>
                </div>
                <h3 className="text-sm md:text-2xl font-story font-bold text-white mb-2 md:mb-4 line-clamp-1">{p.name}</h3>
                <div className="flex flex-col md:flex-row items-center justify-center gap-1 md:gap-6 mb-4 md:mb-6">
                  <p className="text-lg md:text-3xl font-black gold-text font-ui">{p.price} درهم</p>
                  <p className="text-[10px] md:text-sm text-gray-500 line-through font-bold font-ui">{p.oldPrice} درهم</p>
                </div>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  onClick={() => { setSelectedProduct(p); setShowOrderForm(true); }}
                  className="w-full bg-white/5 hover:bg-[#d4af37] hover:text-black text-[#d4af37] py-2.5 md:py-4 rounded-xl md:rounded-2xl font-black text-[10px] md:text-sm uppercase tracking-widest transition-all gold-border font-ui"
                >
                  احجزي الآن
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>



      {/* REVIEWS - WHATSAPP CHAT INSPIRATION */}
      <section className="py-20 md:py-32 bg-[#070707] border-y border-[#d4af37]/10 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: `url('https://www.transparenttextures.com/patterns/carbon-fibre.png')` }} />
        
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16 md:mb-24">
            <h2 className="text-4xl md:text-8xl font-story font-bold text-white mb-6">آراء <span className="gold-text">الملكات</span></h2>
          </div>

          {/* WhatsApp Chat Container */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-[#e5ddd5] rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white/10 max-w-2xl mx-auto"
          >
            {/* WhatsApp Header */}
            <div className="bg-[#075e54] p-4 md:p-6 flex items-center justify-between text-white">
              <div className="flex items-center gap-3 md:gap-4">
                <ArrowRight className="md:w-6 md:h-6 rotate-180" />
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/20 overflow-hidden border border-white/20">
                  <img src="https://lh3.googleusercontent.com/d/1dN6gHeczAGCRCMyMX--k6YI6BAU4w9DV" className="w-full h-full object-cover" alt="Profile" referrerPolicy="no-referrer" />
                </div>
                <div>
                  <p className="font-black text-sm md:text-base font-ui">TrendShop Support</p>
                  <p className="text-[10px] md:text-xs opacity-80 font-ui">متصل الآن</p>
                </div>
              </div>
              <div className="flex items-center gap-4 md:gap-6 opacity-80">
                <Video size={20} />
                <Phone size={20} />
                <MoreVertical size={20} />
              </div>
            </div>

            {/* Chat Body */}
            <div className="p-4 md:p-8 space-y-6 md:space-y-8 min-h-[500px] relative" style={{ backgroundImage: `url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')`, backgroundSize: 'contain' }}>
              <div className="flex justify-center mb-6">
                <span className="bg-[#d1e4f3] text-[#51616c] text-[10px] md:text-xs font-bold px-4 py-1.5 rounded-lg shadow-sm font-ui uppercase tracking-widest">اليوم</span>
              </div>

              {[
                { name: 'فاطمة الزهراء', phone: '+212 6xx xxx x24', text: 'بصراحة العباية جات فنة، الثوب مبرد ومريح بزاف. التوصيل كان فوقتو شكرا تريند شوب! 😍', time: '14:20', hasAudio: true },
                { name: 'سناء', phone: '+212 7xx xxx x05', text: 'هادي المرة الثالثة اللي كنطلب منكم، ديما الموديلات كيجيو كيف الصور والجودة طوب. الله يعطيك الصحة ❤️', time: '10:05', hasAudio: false },
                { name: 'مريم', phone: '+212 6xx xxx x89', text: 'تعامل راقي جداً والعباية جاتني روعة. كنصح أي وحدة باغة الأناقة تطلب منهم بلا تردد ✨', time: '18:45', hasAudio: true }
              ].map((review, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2 }}
                  className="flex flex-col items-start"
                >
                  <div className="relative max-w-[90%] md:max-w-[85%] bg-white p-3 md:p-5 rounded-2xl shadow-md rounded-tr-none">
                    {/* Bubble Tail */}
                    <div className="absolute top-0 -right-2 w-4 h-4 bg-white clip-path-left" />

                    <div className="flex items-center justify-between mb-2 gap-4">
                      <span className="font-black text-[10px] md:text-xs text-[#25d366] font-ui">{review.phone} ~{review.name}</span>
                    </div>

                    <p className="text-sm md:text-base text-black leading-relaxed font-ui mb-3">
                      {review.text}
                    </p>

                    {review.hasAudio && (
                      <div className="bg-[#f0f0f0] rounded-xl p-3 flex items-center gap-3 mb-3 border border-black/5">
                        <div className="w-10 h-10 rounded-full bg-[#25d366] flex items-center justify-center text-white">
                          <Play size={20} fill="currentColor" />
                        </div>
                        <div className="flex-1">
                          <div className="h-1 bg-gray-300 rounded-full relative">
                            <div className="absolute inset-y-0 left-0 w-1/3 bg-[#25d366] rounded-full" />
                            <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-3 h-3 bg-[#25d366] rounded-full shadow-md" />
                          </div>
                          <div className="flex justify-between mt-1">
                            <span className="text-[9px] text-gray-400 font-bold">0:12 / 0:45</span>
                            <Mic size={12} className="text-[#25d366]" />
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-end gap-1 text-[10px] text-gray-400 font-bold">
                      <span>{review.time}</span>
                      <div className="flex -space-x-1 text-[#34b7f1]">
                        <Check size={12} strokeWidth={3} />
                        <Check size={12} strokeWidth={3} />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Chat Footer Input */}
            <div className="bg-[#f0f0f0] p-3 md:p-5 flex items-center gap-3 md:gap-4">
              <div className="flex-1 bg-white rounded-full py-3 px-6 text-gray-400 text-xs md:text-sm font-ui">
                اكتب رسالة...
              </div>
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#075e54] flex items-center justify-center text-white shadow-lg">
                <Mic size={24} />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ABOUT US SECTION */}
      <section id="about" className="py-20 md:py-32 px-6 max-w-7xl mx-auto border-t border-[#d4af37]/10">
        <div className="grid lg:grid-cols-2 gap-16 md:gap-24 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-8xl font-story font-bold text-white mb-8">من <span className="gold-text">نحن؟</span></h2>
            <div className="space-y-6 text-lg md:text-xl text-gray-400 leading-relaxed font-story italic">
              <p>
                في "تريند شوب"، نحن لا نبيع مجرد ملابس، بل ننسج قصصاً من الأناقة والفخامة المغربية. بدأت رحلتنا بشغف للحفاظ على تراثنا الأصيل وتقديمه بلمسة عصرية تناسب امرأة اليوم الطموحة والراقية.
              </p>
              <p>
                كل قطعة في مجموعتنا هي ثمرة اختيار دقيق لأجود الأقمشة وإبداع أمهر الصناع التقليديين. هدفنا هو أن تشعري بالثقة والتميز في كل مناسبة، مرتديةً قطعاً تعكس هويتك وتبرز جمالك الطبيعي.
              </p>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-square rounded-[3rem] overflow-hidden gold-border shadow-2xl">
              <img src="https://lh3.googleusercontent.com/d/1dN6gHeczAGCRCMyMX--k6YI6BAU4w9DV" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" alt="About Us" referrerPolicy="no-referrer" />
            </div>
            <div className="absolute -bottom-10 -right-10 bg-[#d4af37] text-black p-8 rounded-2xl font-black text-center shadow-2xl hidden md:block">
              <p className="text-4xl">10+</p>
              <p className="text-[10px] uppercase tracking-widest">سنوات من الإبداع</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="py-20 md:py-32 px-6 bg-white/5 border-y border-[#d4af37]/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-8xl font-story font-bold text-white mb-8">تواصلوا <span className="gold-text">معنا</span></h2>
          <p className="text-xl md:text-2xl text-gray-400 mb-12 font-story italic">
            فريقنا في خدمتكم دائماً للإجابة على استفساراتكم ومساعدتكم في اختيار الأنسب لكم.
          </p>
          
          <div className="grid md:grid-cols-2 gap-8">
            <motion.a 
              whileHover={{ scale: 1.05, backgroundColor: '#25d366' }}
              href={`https://wa.me/${WA_NUMBER}`}
              target="_blank"
              className="flex flex-col items-center p-10 rounded-[2rem] bg-white/5 gold-border transition-all group"
            >
              <div className="w-16 h-16 rounded-full bg-[#25d366]/20 flex items-center justify-center text-[#25d366] mb-6 group-hover:bg-white group-hover:text-[#25d366] transition-all">
                <MessageCircle size={32} fill="currentColor" />
              </div>
              <h4 className="text-white font-black text-xl mb-2 font-ui">خدمة العملاء عبر واتساب</h4>
              <p className="text-gray-500 font-ui text-sm">متوفرون 24/7 للرد السريع</p>
            </motion.a>

            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="flex flex-col items-center p-10 rounded-[2rem] bg-white/5 gold-border transition-all"
            >
              <div className="w-16 h-16 rounded-full bg-[#d4af37]/20 flex items-center justify-center text-[#d4af37] mb-6">
                <MapPin size={32} />
              </div>
              <h4 className="text-white font-black text-xl mb-2 font-ui">مقرنا الرئيسي</h4>
              <p className="text-gray-500 font-ui text-sm">الدار البيضاء، المملكة المغربية</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="px-6 py-20 md:py-32 text-center">
        <div className="max-w-5xl mx-auto bg-black rounded-[2.5rem] md:rounded-[4rem] p-10 md:p-32 gold-border relative overflow-hidden hypnotic-glow">
          <div className="absolute top-0 right-0 w-64 h-64 md:w-96 md:h-96 bg-[#d4af37]/10 blur-[80px] md:blur-[120px] rounded-full" />
          <div className="absolute bottom-0 left-0 w-64 h-64 md:w-96 md:h-96 bg-[#d4af37]/5 blur-[80px] md:blur-[120px] rounded-full" />
          
          <h2 className="text-4xl md:text-[10rem] font-story font-bold text-white mb-8 md:mb-12 relative z-10">هل أنتِ <span className="gold-text">مستعدة؟</span></h2>
          <p className="text-xl md:text-2xl mb-12 md:mb-16 max-w-2xl mx-auto font-story italic relative z-10">انضمي إلى عالم الفخامة اليوم. العرض سينتهي قريباً جداً والمخزون محدود.</p>
          
          <div className="max-w-md mx-auto relative z-10">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 50px rgba(212, 175, 55, 0.6)" }}
              onClick={() => { setSelectedProduct(products[0]); setShowOrderForm(true); }}
              className="w-full gold-gradient text-black py-5 md:py-7 px-10 md:px-16 rounded-full font-black text-xl md:text-3xl shadow-2xl transition-all flex items-center justify-center gap-4 font-ui"
            >
              <ShoppingBag size={28} className="md:w-[32px] md:h-[32px]" />
              اطلبي الآن
            </motion.button>
            <p className="mt-8 md:mt-10 text-[#d4af37] text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] md:tracking-[0.5em] font-ui">توصيل مجاني - دفع عند الاستلام</p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-black pt-32 pb-12 px-6 border-t border-[#d4af37]/10">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <h3 className="gold-text font-black text-3xl md:text-4xl mb-8 tracking-tight font-logo">TRENDSHOP</h3>
          
          <div className="flex justify-center gap-6 md:gap-10 mb-16 md:mb-20">
            <motion.a 
              whileHover={{ scale: 1.2, color: '#fff' }}
              href="https://www.instagram.com/trendshop6469?utm_source=qr&igsh=dGxkcng4djdjbGRq" 
              target="_blank"
              className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-[#d4af37]/30 flex items-center justify-center text-[#d4af37] transition-all hover:border-[#d4af37] bg-white/5"
              title="Instagram"
            >
              <Instagram size={24} />
            </motion.a>
            <motion.a 
              whileHover={{ scale: 1.2, color: '#fff' }}
              href={`https://wa.me/${WA_NUMBER}`}
              target="_blank"
              className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-[#d4af37]/30 flex items-center justify-center text-[#d4af37] transition-all hover:border-[#d4af37] bg-white/5"
              title="WhatsApp"
            >
              <MessageCircle size={24} />
            </motion.a>
            <motion.a 
              whileHover={{ scale: 1.2, color: '#fff' }}
              href="https://www.tiktok.com/@trendshop277?is_from_webapp=1&sender_device=pc" 
              target="_blank"
              className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-[#d4af37]/30 flex items-center justify-center text-[#d4af37] transition-all hover:border-[#d4af37] bg-white/5"
              title="TikTok"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.89-.6-4.13-1.47-.13 3.44-.3 6.88-.45 10.32-.13 2.13-1.13 4.23-3.09 5.37-2.13 1.24-4.91 1.28-7.1 0-2.13-1.24-3.38-3.69-3.23-6.12.13-2.61 2.31-4.91 4.91-5.06 1.05-.06 2.11.23 3 .81V.02z"/>
              </svg>
            </motion.a>
          </div>

          <div className="w-full h-[1px] bg-[#d4af37]/10 mb-12" />
          
          <p className="text-[10px] text-gray-600 uppercase font-black tracking-[0.6em] font-ui">
            &copy; 2024 TRENDSHOP PREMIUM. الفخامة المغربية بأيادٍ أمينة.
          </p>
        </div>
      </footer>

      {/* QUICK ORDER MODAL - COD FOCUS */}
      <AnimatePresence>
        {showOrderForm && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[300] flex items-center justify-center p-6 bg-black/90 backdrop-blur-md"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-[#111] w-full max-w-lg rounded-[2rem] md:rounded-[3rem] overflow-hidden gold-border shadow-2xl p-6 md:p-10 relative max-h-[90vh] overflow-y-auto"
            >
              <button 
                onClick={() => setShowOrderForm(false)}
                className="absolute top-4 left-4 md:top-8 md:left-8 z-10 w-10 h-10 md:w-12 md:h-12 bg-white/5 rounded-full flex items-center justify-center text-white hover:bg-white/10 transition-all"
              >
                <X size={20} className="md:w-[24px] md:h-[24px]" />
              </button>

              <div className="text-center mb-8 md:mb-10 mt-8 md:mt-0">
                <h3 className="text-2xl md:text-3xl font-story font-bold text-white mb-2 md:mb-4">تأكيد الطلب السريع</h3>
                <p className="text-sm md:text-base text-gray-400 font-story italic">املئي المعلومات أسفله وسنتصل بكِ فوراً</p>
              </div>

              {selectedProduct && (
                <div className="flex items-center gap-4 md:gap-6 bg-white/5 p-3 md:p-4 rounded-xl md:rounded-2xl mb-6 md:mb-8 gold-border">
                  <img src={selectedProduct.image} className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-lg md:rounded-xl" alt="Selected" referrerPolicy="no-referrer" />
                  <div>
                    <p className="font-bold text-white text-sm md:text-base font-ui">{selectedProduct.name}</p>
                    <p className="gold-text font-black text-sm md:text-base font-ui">{selectedProduct.price} درهم</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleQuickOrder} className="space-y-4 md:space-y-6 font-ui">
                <div className="relative">
                  <User className="absolute right-4 top-1/2 -translate-y-1/2 text-[#d4af37] w-[18px] h-[18px] md:w-[20px] md:h-[20px]" />
                  <input 
                    required 
                    name="name"
                    type="text" 
                    placeholder="الاسم الكامل" 
                    className="w-full bg-white/5 border border-white/10 rounded-xl md:rounded-2xl py-4 md:py-5 pr-12 pl-4 text-white text-sm md:text-base focus:border-[#d4af37] outline-none transition-all"
                  />
                </div>
                <div className="relative">
                  <Phone className="absolute right-4 top-1/2 -translate-y-1/2 text-[#d4af37] w-[18px] h-[18px] md:w-[20px] md:h-[20px]" />
                  <input 
                    required 
                    name="phone"
                    type="tel" 
                    placeholder="رقم الهاتف" 
                    className="w-full bg-white/5 border border-white/10 rounded-xl md:rounded-2xl py-4 md:py-5 pr-12 pl-4 text-white text-sm md:text-base focus:border-[#d4af37] outline-none transition-all"
                  />
                </div>
                <div className="relative">
                  <MapPin className="absolute right-4 top-1/2 -translate-y-1/2 text-[#d4af37] w-[18px] h-[18px] md:w-[20px] md:h-[20px]" />
                  <input 
                    required 
                    name="city"
                    type="text" 
                    placeholder="المدينة" 
                    className="w-full bg-white/5 border border-white/10 rounded-xl md:rounded-2xl py-4 md:py-5 pr-12 pl-4 text-white text-sm md:text-base focus:border-[#d4af37] outline-none transition-all"
                  />
                </div>

                <div className="space-y-3">
                  <p className="text-white text-sm font-bold font-ui">المقاس (Size):</p>
                  <div className="grid grid-cols-5 gap-2">
                    {['S', 'M', 'L', 'XL', 'XXL'].map((s) => (
                      <label key={s} className="cursor-pointer">
                        <input type="radio" name="size" value={s} className="peer hidden" defaultChecked={s === 'L'} />
                        <div className="bg-white/5 border border-white/10 rounded-lg py-2 text-center text-white text-xs font-black peer-checked:bg-[#d4af37] peer-checked:text-black transition-all font-ui">
                          {s}
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full gold-gradient text-black py-5 md:py-6 rounded-xl md:rounded-2xl font-black text-lg md:text-xl shadow-xl flex items-center justify-center gap-4 mt-6 md:mt-10"
                >
                  <CheckCircle2 className="w-[20px] h-[20px] md:w-[24px] md:h-[24px]" />
                  تأكيد الطلب الآن
                </motion.button>
                
                <p className="text-center text-[10px] text-gray-500 font-bold uppercase tracking-widest">
                  الدفع عند الاستلام - التوصيل مجاني
                </p>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FLOATING WHATSAPP */}
      <motion.button 
        onClick={() => sendWhatsApp('استفسار', 0)}
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-8 right-8 bg-[#25d366] p-6 rounded-full text-white shadow-[0_20px_50px_rgba(37,211,102,0.4)] z-[250] cursor-pointer border-none outline-none"
      >
        <MessageCircle size={36} />
        <span className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full border-2 border-white animate-ping" />
        <span className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full border-2 border-white" />
      </motion.button>

    </div>
  );
}
