"use client"
import styles from "./page.module.css";
import { useSearchParams } from "next/navigation";
import { useState, Suspense, useRef, useEffect } from "react" ;
 import confetti from 'canvas-confetti';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import html2canvas from 'html2canvas';
import Link from "next/link";

// --- 1. مكون المعايدة (Pop-up) ---
function CelebrationModal({ onClose, bgImage, audioSrc, title, emoji }: any) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  useEffect(() => {
    const mainVideo = document.getElementById("mainVideo") as HTMLVideoElement;
    if (mainVideo) mainVideo.pause();

    if (audioRef.current) audioRef.current.play().catch(() => {});
    const end = Date.now() + (10* 1000);
    (function frame() {
      confetti({ particleCount: 3, angle: 60, spread: 55, origin: { x: 0 }, zIndex: 3000 });
      confetti({ particleCount: 3, angle: 120, spread: 55, origin: { x: 1 }, zIndex: 3000 });
      if (Date.now() < end) requestAnimationFrame(frame);
    }());
  }, []);

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 2500, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#000' }}>
      <audio ref={audioRef} src={audioSrc} loop />
      <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center', zIndex: 1 }} />
      <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', color: 'white', padding: '20px', background: 'rgba(0,0,0,0.4)', borderRadius: '20px' }}>
        <h1 style={{ fontSize: '1.5rem', lineHeight: '1.6' }}>{title} {emoji}</h1>
        <button onClick={onClose} style={{ marginTop: '30px', padding: '12px 25px', backgroundColor: '#ff4757', color: 'white', border: 'none', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer' }}>رجوع 🏠</button>
      </div>
    </div>
  );
}

function HomeContent() {
  const search = useSearchParams();
  const [activeModal, setActiveModal] = useState<number | null>(null);
  const [wish, setWish] = useState("");
  const [savedWishes, setSavedWishes] = useState<string[]>([]);

  useEffect(() => {
    const wishes = JSON.parse(localStorage.getItem("user_wishes") || "[]");
    setSavedWishes(wishes);
  }, [search]);

  const saveWish = () => {
    if (!wish.trim()) return;
    const newWishes = [wish, ...savedWishes].slice(0, 3);
    setSavedWishes(newWishes);
    localStorage.setItem("user_wishes", JSON.stringify(newWishes));
    setWish("");
  };

  const [cardText, setCardText] = useState("عيد مبارك سعيد 🎉");
  const [cardColor, setCardColor] = useState("#ffffff");
  const [cardBgColor, setCardBgColor] = useState("#0284ff");
  const [cardImage, setCardImage] = useState<string | null>(null);
  const cardRef = useRef(null);
  const emojis = ["🌙", "⭐", "🎉", "🕌", "🎁", "✨", "🎈", "🐑", "❤️"];

  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState("");
  const mediaRecorder = useRef<MediaRecorder | null>(null);

  const celebrations = [
    { id: 1, btnLabel: "Bye Ramadan", bg: "", fullBg: "/full1.jpg", audio: "/والله_لسة_بدري_يا_شهر_الصيام_ شريفة_فاضل_والله_لسة_بدري_viral_ال.mp3", title: "اللهم لك الحمد أن بلغتنا شهر رمضان، اللهم تقبل منا الصيام والقيام، وأحسن لنا الختام، اللهم اجعلنا فيه من عتقائك من النار، واجعلنا فيه من المقبولين الفائزين", emoji: "🌙" },
    { id: 2, btnLabel: "Hello 3ID", bg: "/card2.jpg", fullBg: "/full2.jpg", audio: "/رائعة_ام_كلثوم_ياليلة_العيد_آنستينا_وجددتي_الأمل_فينا_يا_ليلة_ال.mp3", title: "كل سنة وأنتِ طيبة يا منار، جعله الله خير أعيادك، وأعاده الله عليكِ بكل خير، محققةً ما تتمنين ,كل سنه وانتى موجوده ومنوره الحياه ", emoji: "✨" },
    { id: 3, btnLabel: "celebrate 3id 🚀", bg: "/card3.jpg", fullBg: "/full3.jpg", audio: "/عيد_سعيد_ _snow_اكسبلور_اقتباسات_nature_شعر_عبارات_ترند_تصميمي.mp3", title: " تكون الايام عيد بوجودك...العيد بوجودك أفضل بكثير.. دائمًا منورة الحياه فلنحتفل معا داىْما ", emoji: "🎉" },
  ];

  return (
    <main style={{ paddingBottom: '100px', backgroundColor: '#f9f9f9' }}>
      <div style={{ display: "flex", justifyContent: "center", padding: "10px 0", fontSize: "22px", backgroundColor: "#0284ff", color: "white", fontWeight: 'bold' }}>✧ EID MUBARAK ✧</div>

      <div className={styles.i2}>
        <img className={styles.i1} src="/26Y_e9gmqnr2c5hmmnph74mj0c8.jpg" alt="Eid" />
        <div className={styles.i3}>
          {/* تم تعديل الاسم ليكون منار دائماً */}
          <h1> كل سنة وأنتِ طيبة يا منار 🌙</h1>
        </div>
      </div>

      <div style={{ textAlign: "center", margin: "20px 0 10px 0", fontSize: "22px", color: "red", fontWeight: 'bold', animation: 'blink-fast 0.3s infinite' }}>
        <style>{`
          @keyframes blink-fast { 0% { opacity: 1; } 50% { opacity: 0; } 100% { opacity: 1; } }
          @keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        `}</style>
        Continue 3id↓
      </div>

      <div onClick={() => setActiveModal(1)} style={{ width: '90%', height: '150px', margin: '15px auto', borderRadius: '20px', position: 'relative', overflow: 'hidden', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${celebrations[0].bg})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div style={{ position: 'absolute', top: '10px', fontSize: '24px', animation: 'bounce 1s infinite', zIndex: 6 }}>👇</div>
        <button style={{ position: 'relative', zIndex: 5, padding: '12px 25px', backgroundColor: '#FFD700', border: 'none', borderRadius: '12px', fontWeight: 'bold' }}>{celebrations[0].btnLabel}</button>
      </div>

      <Swiper modules={[Autoplay]} spaceBetween={20} slidesPerView={1} loop={true} autoplay={{ delay: 3000 }} style={{margin: '20px 0'}}>
        <SwiperSlide className={styles.i4}><img src="/5895322005584678409_121.jpg" style={{borderRadius: '15px'}} /></SwiperSlide>
        <SwiperSlide className={styles.i4}><img src="/5895322005584678393_121.jpg" style={{borderRadius: '15px'}} /></SwiperSlide>
        <SwiperSlide className={styles.i4}><img src="/5895322005584678390_120.jpg" style={{borderRadius: '15px'}} /></SwiperSlide>
        <SwiperSlide className={styles.i4}><img src="/5895322005584678391_120.jpg" style={{borderRadius: '15px'}} /></SwiperSlide>
        <SwiperSlide className={styles.i4}><img src="/5895322005584678427_121.jpg" style={{borderRadius: '15px'}} /></SwiperSlide>
        <SwiperSlide className={styles.i4}><img src="/a5ef5b11-befd-4a25-a64c-2b8e18ef7942.jpg" style={{borderRadius: '15px'}} /></SwiperSlide>
      </Swiper>

      <div onClick={() => setActiveModal(2)} style={{ width: '90%', height: '150px', margin: '15px auto', borderRadius: '20px', position: 'relative', overflow: 'hidden', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${celebrations[1].bg})`, backgroundSize: 'cover' }} />
        <div style={{ position: 'absolute', top: '10px', fontSize: '24px', animation: 'bounce 1s infinite', zIndex: 6 }}>👇</div>
        <button style={{ position: 'relative', zIndex: 5, padding: '12px 25px', backgroundColor: '#FFD700', border: 'none', borderRadius: '12px', fontWeight: 'bold' }}>{celebrations[1].btnLabel}</button>
      </div>

      <div style={{ width: '90%', margin: '20px auto', height:"500px", borderRadius: '20px', overflow: 'hidden', boxShadow: '0 8px 20px rgba(0,0,0,0.1)' }}>
        <video id="mainVideo" src="/5897955361243012646.mp4" autoPlay loop playsInline controls style={{ width: '100%', display: 'block' }} />
      </div>

      <div onClick={() => setActiveModal(3)} style={{ width: '90%', height: '150px', margin: '15px auto', borderRadius: '20px', position: 'relative', overflow: 'hidden', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${celebrations[2].bg})`, backgroundSize: 'cover' }} />
        <div style={{ position: 'absolute', top: '10px', fontSize: '24px', animation: 'bounce 1s infinite', zIndex: 6 }}>👇</div>
        <button style={{ position: 'relative', zIndex: 5, padding: '12px 25px', backgroundColor: '#FFD700', border: 'none', borderRadius: '12px', fontWeight: 'bold' }}>{celebrations[2].btnLabel}</button>
      </div>

      <hr style={{margin: '40px 0', opacity: 0.1}} />

      <div style={{ padding: '20px', background: '#fff', margin: '15px', borderRadius: '25px', textAlign: 'center' }}>
        <h3 style={{color: '#6c5ce7', marginBottom: '15px'}}>💭 أمنياتك لهذا العيد</h3>
        <h5>اكتب ثلاثة أشياء تريد فعلها هذا العيد</h5>
        <div style={{display: 'flex', gap: '10px', marginBottom: '20px'}}>
          <input type="text" value={wish} onChange={(e) => setWish(e.target.value)} placeholder="اكتب أمنية هنا..." style={{flex: 1, padding: '12px', borderRadius: '12px', border: '1px solid #ddd'}} />
          <button onClick={saveWish} style={{padding: '10px 20px', background: '#6c5ce7', color: '#fff', border: 'none', borderRadius: '12px', fontWeight: 'bold'}}>حفظ</button>
        </div>
        <div style={{textAlign: 'right'}}>
          {savedWishes.map((w, i) => (
            <div key={i} style={{padding: '10px', background: '#f8f9fa', borderRadius: '10px', marginBottom: '8px', borderRight: '4px solid #6c5ce7', fontSize: '14px', color: '#000'}}>
              ✨ {w}
            </div>
          ))}
        </div>
      </div>

      <div style={{ textAlign: 'center', padding: '20px', background: '#fff', margin: '15px', borderRadius: '25px' }}>
        <h3 style={{color: '#0284ff', marginBottom: '15px'}}>🎨 صمم كارت العيد</h3>
        <div ref={cardRef} style={{ width: '280px', height: '280px', margin: '0 auto 20px auto', backgroundColor: cardBgColor, backgroundImage: cardImage ? `url(${cardImage})` : 'none', backgroundSize: 'cover', backgroundPosition: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '20px', color: cardColor, fontSize: '24px', fontWeight: 'bold', padding: '15px', textAlign: 'center' }}>{cardText}</div>
        
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', justifyContent: 'center', marginBottom: '15px' }}>
          {emojis.map(e => <button key={e} onClick={() => setCardText(cardText + e)} style={{fontSize: '20px', padding: '5px', background: '#eee', border: 'none', borderRadius: '5px'}}>{e}</button>)}
        </div>

        <input type="text" value={cardText} onChange={(e) => setCardText(e.target.value)} placeholder="اكتب نص الكارت هنا" style={{width: '90%', padding: '12px', borderRadius: '10px', marginBottom: '10px', border: '1px solid #ddd'}} />
        
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '10px' }}>
           <div><small>لون الخلفية</small><br/><input type="color" value={cardBgColor} onChange={(e) => setCardBgColor(e.target.value)} /></div>
           <div><small>لون النص</small><br/><input type="color" value={cardColor} onChange={(e) => setCardColor(e.target.value)} /></div>
        </div>

        <label style={{display: 'block', padding: '10px', background: '#eee', borderRadius: '10px', cursor: 'pointer', marginBottom: '10px'}}>📸 أضف صورة <input type="file" accept="image/*" onChange={(e) => { const f = e.target.files?.[0]; if(f){ const r = new FileReader(); r.onload = () => setCardImage(r.result as string); r.readAsDataURL(f); } }} style={{display: 'none'}}/></label>
        
        <button onClick={async () => { const canvas = await html2canvas(cardRef.current!, { useCORS: true }); const link = document.createElement('a'); link.download = 'Card.png'; link.href = canvas.toDataURL(); link.click(); setTimeout(() => window.open(`https://wa.me/?text=${encodeURIComponent("صممت لك كارت! حمل وشارك مع الأصدقاء 🎁")}`), 800); }} style={{padding: '15px', background: '#25D366', color: '#fff', width: '100%', borderRadius: '15px', border: 'none', fontWeight: 'bold'}}>📲 حمل وشارك مع الأصدقاء</button>
      </div>

      <div style={{ textAlign: 'center', padding: '25px', background: '#fff', margin: '15px', borderRadius: '25px' }}>
        <h3 style={{color: '#ff4757', marginBottom: '15px'}}>🎙️ سجل تهنئة بصوتك</h3>
        {!isRecording ? <button onClick={async () => { const s = await navigator.mediaDevices.getUserMedia({ audio: true }); mediaRecorder.current = new MediaRecorder(s); const ch: any = []; mediaRecorder.current.ondataavailable = (e) => ch.push(e.data); mediaRecorder.current.onstop = () => { const b = new Blob(ch, { type: 'audio/mp3' }); setAudioURL(URL.createObjectURL(b)); }; mediaRecorder.current.start(); setIsRecording(true); }} style={{padding: '15px 30px', background: '#ff4757', color: '#fff', borderRadius: '50px', border: 'none'}}>🎤 ابدأ</button> : <button onClick={() => { mediaRecorder.current?.stop(); setIsRecording(false); }} style={{padding: '15px 30px', background: '#000', color: '#fff', borderRadius: '50px', border: 'none'}}>⏹️ إيقاف</button>}
        {audioURL && <div style={{marginTop: '20px'}}><audio src={audioURL} controls style={{width: '100%'}} /><button onClick={() => { const link = document.createElement('a'); link.href = audioURL; link.download = 'Voice.mp3'; link.click(); setTimeout(() => window.open(`https://wa.me/?text=${encodeURIComponent("اسمع تهنئتي! حمل وشارك مع الأصدقاء 🎙️")}`), 800); }} style={{padding: '15px', background: '#25D366', color: '#fff', width: '100%', borderRadius: '15px', border: 'none', marginTop: '10px'}}>📲 حمل وشارك مع الأصدقاء</button></div>}
      </div>

      <div style={{ textAlign: 'center', margin: '30px 15px' }}>
        <Link href="http://wa.me/+201095467863 "> <button 
         style={{ padding: '15px 25px', background: '#075E54', color: '#fff', border: 'none', borderRadius: '50px', fontWeight: 'bold', width: '100%' }}>📢 الان يمكنك تهنْتي</button>
</Link>       </div>

      {activeModal && (
        <CelebrationModal onClose={() => setActiveModal(null)} 
          bgImage={celebrations.find(c => c.id === activeModal)!.fullBg} 
          audioSrc={celebrations.find(c => c.id === activeModal)!.audio} 
          title={celebrations.find(c => c.id === activeModal)!.title} 
          emoji={celebrations.find(c => c.id === activeModal)!.emoji} 
        />
      )}
<Link href="/about">
<button style={{
  display:"flex",
  alignContent:"center",
margin:"25px 0",
marginLeft:"170px",
color:"red",
height:"25px"
}}>HOME</button>
</Link>

    </main>
  );
}

export default function Home() {
  return <Suspense fallback={<div>Loading...</div>}><HomeContent /></Suspense>;
}