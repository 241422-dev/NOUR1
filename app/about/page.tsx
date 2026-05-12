"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, ArrowRight, Camera, X } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';

const mainStyles = {
  container: { minHeight: '100vh', backgroundColor: '#a7927e', color: '#5D4037', position: 'relative' as 'relative', overflowX: 'hidden' as 'hidden', fontFamily: 'sans-serif' },
  hero: { height: '90vh', display: 'flex', flexDirection: 'column' as 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' as 'center', padding: '20px', backgroundImage: "linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url('/main-bg.jpg')", backgroundSize: 'cover', backgroundAttachment: 'fixed', position: 'relative' as 'relative', color: 'white' },
  contentWrapper: { maxWidth: '896px', margin: '0 auto', padding: '0 24px', position: 'relative' as 'relative', zIndex: 10 },
  sectionCard: { marginTop: '50px', padding: '40px', backgroundColor: 'rgba(255, 255, 255, 0.6)', backdropFilter: 'blur(10px)', borderRadius: '40px', border: '2px solid white', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', position: 'relative' as 'relative', textAlign: 'center' as 'center' },
  sectionTag: { position: 'absolute' as 'absolute', top: '16px', left: '32px', opacity: 0.4, fontStyle: 'italic', color: '#8B4513', textTransform: 'uppercase' as 'uppercase', fontSize: '13px', fontWeight: 'bold' },
  btnSurprise: { background: 'linear-gradient(to right, #8B4513, #D2B48C)', color: 'white', padding: '15px 40px', borderRadius: '50px', border: 'none', cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', margin: '60px auto', boxShadow: '0 10px 20px rgba(0,0,0,0.1)', textDecoration: 'none' },
  swiperContainer: { width: '100%', height: '170px', borderRadius: '24px', overflow: 'hidden', marginTop: '24px' }, // تم تعديل الارتفاع لـ 170
  finalGiftsWrapper: { display: 'flex', flexWrap: 'wrap' as 'wrap', justifyContent: 'center', gap: '48px', marginBottom: '80px' },
  flipCard: { width: '192px', height: '256px', perspective: '1000px', cursor: 'pointer' },
  overlay: { position: 'fixed' as 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.95)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center' }
};

const FloatingElements = () => {
  const elements = ['🌸', '🌙', '❤️', '✨', '🎈'];
  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
      {[...Array(25)].map((_, i) => (
        <motion.div key={i} style={{ position: 'absolute', fontSize: '24px', left: `${Math.random() * 100}vw` }} initial={{ y: '110vh' }} animate={{ y: '-10vh', transition: { duration: Math.random() * 10 + 10, repeat: Infinity, ease: "linear" } }}>
          {elements[i % elements.length]}
        </motion.div>
      ))}
    </div>
  );
};

const FlipGift = ({ text }: { text: string }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  return (
    <div style={mainStyles.flipCard} onClick={() => setIsFlipped(!isFlipped)}>
      <motion.div style={{ position: 'relative', width: '100%', height: '100%', transition: 'transform 0.6s', transformStyle: 'preserve-3d', transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0)' }}>
        <div style={{ position: 'absolute', inset: 0, borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', backfaceVisibility: 'hidden', backgroundColor: '#8B4513', border: '4px solid white' }}>
           <Gift size={48} color="white" />
        </div>
        <div style={{ position: 'absolute', inset: 0, borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', backfaceVisibility: 'hidden', backgroundColor: 'white', border: '4px solid #8B4513', transform: 'rotateY(180deg)', padding: '16px', textAlign: 'center' }}>
          <p style={{ color: '#8B4513', fontWeight: 'bold', margin: 0 }}>{text}</p>
        </div>
      </motion.div>
    </div>
  );
};

export default function ManarProject() {
  const [content, setContent] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [savedItems, setSavedItems] = useState<{ text: string; image?: string; id: number }[]>([]);
  const [activeSurprise, setActiveSurprise] = useState<{title: string, img: string, desc: string} | null>(null);

  useEffect(() => {
    const data = localStorage.getItem('manar_memories');
    if (data) setSavedItems(JSON.parse(data));
  }, []);

  const handleSave = () => {
    if (content.trim() || selectedImage) {
      const newItem = { text: content.trim(), image: selectedImage || undefined, id: Date.now() };
      const updated = [newItem, ...savedItems];
      setSavedItems(updated);
      localStorage.setItem('manar_memories', JSON.stringify(updated));
      setContent(""); setSelectedImage(null);
    }
  };

  const handleImg = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setSelectedImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div style={mainStyles.container}>
      <FloatingElements />

      {/* نافذة المفاجأة (Full Screen) */}
      <AnimatePresence>
        {activeSurprise && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={mainStyles.overlay}>
             <button onClick={() => setActiveSurprise(null)} style={{ position: 'absolute', top: '30px', right: '30px', background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}><X size={40}/></button>
             <div style={{ textAlign: 'center', color: 'white', padding: '20px', maxWidth: '800px' }}>
                <h2 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>{activeSurprise.title}</h2>
                <img src={activeSurprise.img} style={{ width: '100%', borderRadius: '20px', marginBottom: '20px', boxShadow: '0 0 30px rgba(255,255,255,0.2)' }} />
                <p style={{ fontSize: '1.5rem' }}>{activeSurprise.desc}</p>
             </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SECTION 1: HERO */}
      <section style={mainStyles.hero}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ zIndex: 10 }}>
          <img src="/5978547983467265468_99.jpg" style={{ width: '128px', height: '128px', borderRadius: '50%', border: '4px solid white', marginBottom: '24px', objectFit: 'cover' }} alt="Manar" />
          <h1 style={{ fontSize: '3.75rem', fontWeight: 'bold', margin: 0 , color:"black"}}>NOUR</h1>
          <p style={{ fontSize: '1.5rem', marginTop:"30px" }}> الوقت أحلى بوجودك ✨</p>
          {/* الأسامي الثلاثة تحت بعض */}
          <div style={{ marginTop: '10px', fontSize: '1.4rem', opacity: 0.9 }}>
           <p style={{ margin: '5px 0' }}>  Nour  </p>
            <p style={{ margin: '5px 0' }}>Noura</p>
            <p style={{ margin: '5px 0' }}>Hyr</p>
          </div>
        </motion.div>
      </section>

      <div style={mainStyles.contentWrapper}>
        
        {/* SECTION 2: BIRTHDAY */}
        <div style={mainStyles.sectionCard}>
          <span style={mainStyles.sectionTag}>Birthday</span>
          <h2 style={{ fontSize: '2.25rem', fontWeight: 'bold', color: '#5D4037' }}>21/ 5 / 2005</h2>
          <p style={{ fontSize: '1.5rem', color: '#8D6E63', fontWeight: 'bold' }}>20 years • 11 months • 18 Days</p>
          
<p style={{ fontSize: '1.4rem', fontStyle: 'italic', margin: '5px 0' }}>"العمر مجرد رقم"</p>
  <p style={{ fontSize: '1.2rem', color: '#8B4513', margin: '5px 0' }}>جمالكِ يخفي عمركِ دائماً 🌸</p>


        </div>

        {/* SECTION: ARABIC MEANING */}
        <div style={{ ...mainStyles.sectionCard, border: '2px dashed #D2B48C' }}>
          <span style={mainStyles.sectionTag}>Arabic Meaning</span>
          <h2 style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#8B4513' }}>معنى اسم نور بالعربي 🌸</h2>
          <p style={{ fontSize: '1.4rem', lineHeight: '1.8', marginTop: '15px' }}>
        نور : كل ما يُضيء ويكشف الظلام، سواء كان ضوءًا حسيًا (مثل نور الشمس) أو معنويًا (مثل نور الهداية والعلم).
   
  </p>
        </div>

        {/* SECTION 3: CHILDREN (SWIPER) */}
        <div style={mainStyles.sectionCard}>
          <span style={mainStyles.sectionTag}>Favorite Characters</span>
          <h2 style={{ fontSize: '1.875rem', fontWeight: 'bold' }}>Children</h2>
          <div style={mainStyles.swiperContainer}>
            <Swiper modules={[Autoplay, EffectFade]} autoplay={{ delay: 1000 }} effect="fade" loop={true} style={{ height: '100%' }}>
              <SwiperSlide><img src="/images.jfif" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /></SwiperSlide>
              <SwiperSlide><img src="/images (1).jfif" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /></SwiperSlide>
              <SwiperSlide><img src="/download.jfif" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /></SwiperSlide>
              <SwiperSlide><img src="/download (1).jfif" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /></SwiperSlide>
            </Swiper>
          </div>
        </div>

        <button style={mainStyles.btnSurprise} onClick={() => setActiveSurprise({title: "المفاجأة الأولى", img: "/surprise1.jpeg", desc:" الجمال لاياتي من العدم بل يكون معك من صغرك ويزيد كلما تكبر "+" اي القمر ده 😂❤️ا ✨"})}><Gift /> المفاجأة الأولى</button>

        {/* SECTION 4: FISH (VIDEO) */}
        <div style={mainStyles.sectionCard}>
          <span style={mainStyles.sectionTag}>Favorite Animals</span>
          <h2 style={{ fontSize: '1.875rem', fontWeight: 'bold' }}>CATS</h2>
          <div style={{ borderRadius: '24px', overflow: 'hidden', marginTop: '20px' }}>
            <video controls style={{ width: '100%' }}><source src="/viduo.mp4" type="video/mp4" /></video>
          </div>
        </div>

        <button style={mainStyles.btnSurprise} onClick={() => setActiveSurprise({title: "المفاجأة الثانية", img: "/surprise2.jpeg", desc: "العيون لغه الاسرار ..... وعيونك لغه لاسرار الجمال ✨"})}><Gift /> المفاجأة الثانية</button>

        {/* SECTION 5: MUSIC */}
        <div style={mainStyles.sectionCard}>
          <span style={mainStyles.sectionTag}>Favorite Music</span>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '20px' }}>مقاطعك الصوتية المفضلة 🎵</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <audio controls src="/music1.mpeg" style={{ width: '100%' }} />
            <div style={{ fontStyle: 'italic', color: '#8B4513' }}>Manar (English):Nour :Everything that shines and reveals darkness, whether it is a physical light (like the light of the sun) or a spiritual light (like the light of guidance and knowledge). </div>
            <audio controls src="/music2.mpeg" style={{ width: '100%' }} />
            <div style={{ fontStyle: 'italic', color: '#8B4513' }}>Манар (Russian): Nour:Всё, что светит и рассеивает тьму, будь то физический свет (например, свет солнца) или духовный свет (например, свет наставления и знания). </div>
            <audio controls src="/music3.mpeg" style={{ width: '100%' }} />
          </div>
        </div>

        <button style={mainStyles.btnSurprise} onClick={() => setActiveSurprise({title: "المفاجأة الثالثة", img: "/surprise3.jpg", desc: " ذكرى خطوبه الكتكوت ❤️❤️‍🔥"})}><Gift /> المفاجأة الثالثة</button>

        {/* SECTION 6: ADD FAVORITES */}
        <div style={{ ...mainStyles.sectionCard, backgroundColor: '#5D4037', color: 'white' }}>
          <h2 style={{ fontSize: '1.5rem', textAlign: 'right' }}>أضيفي ذكرياتك الجميلة.. ✨</h2>
          <textarea value={content} onChange={(e) => setContent(e.target.value)} style={{ width: '100%', height: '100px', padding: '15px', borderRadius: '15px', marginTop: '15px', textAlign: 'right', color: 'black' }} placeholder="اكتبي هنا..." />
          <div style={{ margin: '15px 0', textAlign: 'right' }}>
            <input type="file" accept="image/*" onChange={handleImg} style={{ display: 'none' }} id="up-img" />
            <label htmlFor="up-img" style={{ cursor: 'pointer', background: 'rgba(255,255,255,0.2)', padding: '10px 20px', borderRadius: '10px' }}>📷 إضافة صورة</label>
          </div>
          <button onClick={handleSave} style={{ width: '100%', padding: '12px', borderRadius: '50px', backgroundColor: 'white', color: '#5D4037', fontWeight: 'bold', border: 'none' }}>حفظ</button>
          <div style={{ marginTop: '20px' }}>
            {savedItems.map(item => (
              <div key={item.id} style={{ background: 'rgba(255,255,255,0.1)', padding: '15px', borderRadius: '12px', marginBottom: '10px', textAlign: 'right' }}>
                <p>{item.text}</p>
                {item.image && <img src={item.image} style={{ width: '100%', borderRadius: '10px', marginTop: '10px' }} />}
              </div>
            ))}
          </div>
        </div>

        <div style={mainStyles.sectionCard}>
  {/* دي العلامة المميزة اللي بتظهر فوق على الشمال */}
  <span style={mainStyles.sectionTag}>Doctor Nour</span>

  <div style={{ padding: '20px 0' }}>
    {/* العنوان والجملة اللي تحتها */}
    <h2 style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#5D4037' }}>دوركِ في الحياة يمثل الرحمة 👩‍🔬🩺</h2>
    <p style={{ fontSize: '1.25rem', fontStyle: 'italic', maxWidth: '512px', margin: '10px auto' }}>
      " تشعرين بحزن الآخرين دائماً،  انتي حقا راىْعه"
    </p>
    
    {/* السويبر بتاع الصور (الهايت 170 زي ما اتفقنا) */}
    <div style={mainStyles.swiperContainer}>
      <Swiper modules={[Autoplay, EffectFade]} autoplay={{ delay: 1000 }} effect="fade" loop={true} style={{ height: '100%' }}>
        <SwiperSlide><img src="/download (5).jfif" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /></SwiperSlide>
        <SwiperSlide><img src="/download (2).jfif" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /></SwiperSlide>
        <SwiperSlide><img src="/download (3).jfif" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /></SwiperSlide>
        <SwiperSlide><img src="/download (4).jfif" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /></SwiperSlide>
      </Swiper>
    </div>
  </div>
</div>




<div style={{ margin: '100px 0', textAlign: 'center' }}>
          <div style={mainStyles.finalGiftsWrapper}>
            <FlipGift text="أنتِ القطعة الناقصة في جمال هذا العالم" />
            <FlipGift text="دائماً تضيئين كاسمك تماماً" />
          </div>
          
        </div>
      </div>
      <footer style={{ textAlign: 'center', padding: '40px', fontSize: '28px', fontWeight: 'bold', color: '#5D4037' }}>
        Made with ❤️ for Nour
      </footer>
    </div>


  );
}