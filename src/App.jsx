import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, MapPin, Phone, Volume2, VolumeX, Utensils, Gift, Music, Users, Briefcase, Star, X, Image as ImageIcon } from 'lucide-react';
import './index.css';

const calculateTimeLeft = () => {
  // Configurado para exactamente 4 días a partir de la fecha de prueba (Mayo 17)
  const difference = +new Date("2026-05-17T15:00:00-04:00") - +new Date();
  let timeLeft = {};

  if (difference > 0) {
    timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60)
    };
  }
  return timeLeft;
};

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearTimeout(timer);
  });

  const timerComponents = [];
  Object.keys(timeLeft).forEach((interval) => {
    if (!timeLeft[interval] && timeLeft[interval] !== 0) {
      return;
    }

    timerComponents.push(
      <div key={interval} className="timer-box">
        <span className="timer-num">
          {timeLeft[interval].toString().padStart(2, '0')}
        </span>
        <span className="timer-label">
          {interval === 'days' ? 'Días' : interval === 'hours' ? 'Hrs' : interval === 'minutes' ? 'Min' : 'Seg'}
        </span>
      </div>
    );
  });

  return (
    <div className="inline-timer">
      {timerComponents.length ? timerComponents : <span style={{fontSize: '1.2rem', color: 'var(--blue-primary)', fontWeight: 'bold'}}>¡El evento ha comenzado!</span>}
    </div>
  );
};

const AnimatedWord = ({ text, className, delayOffset = 0 }) => {
  const words = text.split(" ");
  
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: delayOffset }
    }
  };
  
  const child = {
    hidden: { opacity: 0, y: 40, rotate: -15, scale: 0.3 },
    visible: {
      opacity: 1, y: 0, rotate: 0, scale: 1,
      transition: { type: "spring", damping: 10, stiffness: 100 }
    }
  };

  return (
    <motion.div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "1rem", padding: "10px 0" }} variants={container} initial="hidden" animate="visible" className={className}>
      {words.map((word, wordIndex) => (
        <span key={wordIndex} style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
          {Array.from(word).map((letter, index) => (
            <motion.span variants={child} key={index} style={{ display: 'inline-block' }}>
              {letter}
            </motion.span>
          ))}
        </span>
      ))}
    </motion.div>
  );
};

const ThemeCard = ({ children, delay = 0 }) => {
  return (
    <motion.div
      className="theme-card"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay, type: "spring", stiffness: 50 }}
    >
      {children}
    </motion.div>
  );
};

function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [hasEntered, setHasEntered] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    audioRef.current = new Audio('/vlad_annenkov-wedding-story-quothollowbrookquot-452811.mp3');
    audioRef.current.loop = true;
  }, []);

  const toggleMusic = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(e => console.log("Audio play failed:", e));
    }
    setIsPlaying(!isPlaying);
  };

  const handleEnter = () => {
    setHasEntered(true);
    audioRef.current.play().catch(e => console.log("Audio play failed:", e));
    setIsPlaying(true);
  };

  return (
    <>
      {/* Intro Welcome Screen (1 Million Dollar Envelope) */}
      <AnimatePresence>
        {!hasEntered && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, filter: 'blur(40px)', scale: 1.3 }}
            transition={{ duration: 1.8, ease: "easeInOut" }}
            style={{
              position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
              backgroundImage: 'url(/baby_corp_bg.webp)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              zIndex: 99999, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'
            }}
          >
            {/* Overlay para darle elegancia y resaltar el sobre */}
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(255,255,255,0.3)', backdropFilter: 'blur(5px)' }} />

            <motion.div
              initial={{ scale: 0.5, opacity: 0, y: 100 }}
              animate={{ scale: 1, opacity: 1, y: [0, -15, 0] }}
              transition={{ 
                 scale: { type: 'spring', delay: 0.3, duration: 2, bounce: 0.3 },
                 y: { repeat: Infinity, duration: 4, ease: 'easeInOut', delay: 0.5 },
                 opacity: { duration: 1 }
              }}
              onClick={handleEnter}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 10, position: 'relative' }}
            >
               {/* Resplandor Divino (Glow) detrás del sobre */}
               <motion.div 
                 animate={{ opacity: [0.4, 0.8, 0.4], scale: [0.9, 1.1, 0.9] }}
                 transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                 style={{
                   position: 'absolute',
                   width: '130%',
                   height: '110%',
                   background: 'radial-gradient(circle, rgba(255,255,255,0.9) 0%, transparent 60%)',
                   zIndex: -1,
                   borderRadius: '50%',
                   top: '-5%', left: '-15%'
                 }}
               />

               {/* Sobre Lujoso 100% SVG/CSS (Simetría Perfecta) */}
               <div style={{ 
                 position: 'relative', width: '85%', maxWidth: '340px', height: '480px', 
                 borderRadius: '12px', 
                 boxShadow: '0 30px 60px rgba(0,0,0,0.6), inset 0 0 0 1px rgba(212,175,55,0.2)',
                 overflow: 'hidden',
                 display: 'flex', flexDirection: 'column', alignItems: 'center'
               }}>
                 
                 {/* SVG Envelope Background & Flaps */}
                 <svg width="100%" height="100%" viewBox="0 0 340 480" preserveAspectRatio="none" style={{position: 'absolute', top: 0, left: 0, zIndex: 1}}>
                   <defs>
                     <filter id="shadowTop" x="-20%" y="-20%" width="140%" height="140%">
                       <feDropShadow dx="0" dy="6" stdDeviation="5" floodColor="#000" floodOpacity="0.7"/>
                     </filter>
                     <filter id="shadowBottom" x="-20%" y="-20%" width="140%" height="140%">
                       <feDropShadow dx="0" dy="-4" stdDeviation="4" floodColor="#000" floodOpacity="0.4"/>
                     </filter>
                     <linearGradient id="gradBase" x1="0%" y1="0%" x2="100%" y2="100%">
                       <stop offset="0%" stopColor="#1A2E4C" />
                       <stop offset="100%" stopColor="#0F1C33" />
                     </linearGradient>
                     <linearGradient id="gradTop" x1="0%" y1="0%" x2="0%" y2="100%">
                       <stop offset="0%" stopColor="#1f375c" />
                       <stop offset="100%" stopColor="#15253e" />
                     </linearGradient>
                     <linearGradient id="gradBottom" x1="0%" y1="100%" x2="0%" y2="0%">
                       <stop offset="0%" stopColor="#182a45" />
                       <stop offset="100%" stopColor="#11203b" />
                     </linearGradient>
                   </defs>

                   {/* Base Background */}
                   <rect width="340" height="480" fill="url(#gradBase)" />
                   
                   {/* Double Gold Line Border */}
                   <rect x="12" y="12" width="316" height="456" fill="none" stroke="#D4AF37" strokeWidth="1" strokeOpacity="0.4" rx="6" />
                   <rect x="16" y="16" width="308" height="448" fill="none" stroke="#D4AF37" strokeWidth="1" strokeDasharray="4 2" strokeOpacity="0.3" rx="4" />

                   {/* Side flaps */}
                   <polygon points="0,0 170,230 0,480" fill="#14243d" stroke="#D4AF37" strokeWidth="1" strokeOpacity="0.3"/>
                   <polygon points="340,0 170,230 340,480" fill="#14243d" stroke="#D4AF37" strokeWidth="1" strokeOpacity="0.3"/>

                   {/* Bottom flap */}
                   <polygon points="0,480 170,200 340,480" fill="url(#gradBottom)" stroke="#D4AF37" strokeWidth="1.5" strokeOpacity="0.6" filter="url(#shadowBottom)"/>

                   {/* Top flap */}
                   <polygon points="0,0 170,230 340,0" fill="url(#gradTop)" stroke="#D4AF37" strokeWidth="2" strokeOpacity="0.8" filter="url(#shadowTop)"/>
                 </svg>

                 {/* Sello de Cera Dorado (Centro Exacto en la punta) */}
                 <div style={{
                   position: 'absolute', top: '47.9%', left: '50%', transform: 'translate(-50%, -50%)',
                   width: '75px', height: '75px', borderRadius: '50%',
                   background: 'radial-gradient(circle, #FDE08B 0%, #D4AF37 40%, #8A6300 100%)',
                   boxShadow: '0 10px 25px rgba(0,0,0,0.8), inset 0 5px 10px rgba(255,255,255,0.6), inset 0 -5px 10px rgba(0,0,0,0.5)',
                   zIndex: 2, display: 'flex', alignItems: 'center', justifyContent: 'center',
                   border: '2px solid #6A4D00'
                 }}>
                   {/* Aro interno del sello */}
                   <div style={{
                     width: '55px', height: '55px', borderRadius: '50%',
                     border: '1px solid rgba(138, 99, 0, 0.5)',
                     display: 'flex', alignItems: 'center', justifyContent: 'center',
                     boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.3)'
                   }}>
                     <span style={{ fontFamily: 'Playfair Display', color: '#594000', fontWeight: '900', fontSize: '2.2rem', textShadow: '1px 1px 1px rgba(255,255,255,0.4), -1px -1px 1px rgba(0,0,0,0.3)', marginTop: '-2px' }}>E</span>
                   </div>
                 </div>
                 
                 {/* Textos Dorados en el bolsillo inferior perfectamente alineados */}
                 <div style={{ position: 'absolute', top: '56%', left: '0', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 3 }}>
                    <div style={{ fontFamily: 'Dancing Script', fontSize: '1.9rem', color: '#E8CA6B', textShadow: '1px 1px 3px rgba(0,0,0,0.8)', lineHeight: '1.2' }}>Mi Primer Añito</div>
                    <div style={{ fontFamily: 'Playfair Display', fontSize: '1.6rem', fontWeight: '900', color: '#F2D984', textShadow: '2px 2px 4px rgba(0,0,0,0.8)', letterSpacing: '2px', lineHeight: '1.2', marginTop: '4px' }}>EITHAN DENNY</div>
                    <div style={{ fontFamily: 'Playfair Display', fontSize: '1rem', fontWeight: '600', color: '#E8CA6B', textShadow: '1px 1px 3px rgba(0,0,0,0.8)', letterSpacing: '1px', marginBottom: '10px' }}>Panozo Gutierrez</div>
                    
                    <div style={{ width: '60px', height: '2px', background: 'linear-gradient(90deg, transparent, #D4AF37, transparent)', marginBottom: '10px' }} />
                    
                    <div style={{ fontFamily: 'Montserrat', fontSize: '0.8rem', fontWeight: '800', color: '#E8CA6B', letterSpacing: '2px' }}>16 DE MAYO 2026</div>
                    <div style={{ fontFamily: 'Montserrat', fontSize: '0.8rem', fontWeight: '800', color: '#E8CA6B', letterSpacing: '2px', marginTop: '4px' }}>15:00 HRS</div>
                 </div>
               </div>

               {/* Texto Flotante de Instrucción */}
               <motion.div 
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: 1.5, duration: 1 }}
                 style={{ 
                   marginTop: '2.5rem', 
                   color: 'var(--blue-primary)', 
                   fontFamily: 'Montserrat', 
                   fontWeight: '900', 
                   fontSize: '1rem', 
                   letterSpacing: '4px',
                   textTransform: 'uppercase',
                   background: 'rgba(255,255,255,0.85)',
                   padding: '12px 35px',
                   borderRadius: '30px',
                   boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
                   backdropFilter: 'blur(5px)',
                   border: '2px solid rgba(255,255,255,0.5)'
                 }}
               >
                 Tocar para abrir
               </motion.div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mobile-wrapper">
        
        {/* Music Button Top Right */}
        <button 
          onClick={toggleMusic} 
          style={{
            position: 'absolute', top: '1rem', right: '1rem', zIndex: 100,
            width: '45px', height: '45px', borderRadius: '50%', border: '2px solid #478ECC',
            background: 'white', color: '#478ECC', display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
          }}
        >
          {isPlaying ? <Volume2 size={20} /> : <VolumeX size={20} />}
        </button>

        {/* Ambient Floating Icons */}
        <motion.div style={{ position: 'absolute', top: '15%', left: '10%', color: 'rgba(71,142,204,0.3)', zIndex: 0 }} animate={{ y: [0, -30, 0], rotate: [0, 20, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}>
          <Star size={40} />
        </motion.div>
        <motion.div style={{ position: 'absolute', top: '45%', right: '5%', color: 'rgba(71,142,204,0.2)', zIndex: 0 }} animate={{ y: [0, 40, 0], rotate: [0, -15, 0] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}>
          <Briefcase size={50} />
        </motion.div>
        <motion.div style={{ position: 'absolute', top: '75%', left: '8%', color: 'rgba(71,142,204,0.2)', zIndex: 0 }} animate={{ y: [0, -25, 0], rotate: [0, 10, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}>
          <Star size={30} />
        </motion.div>

        {/* HERO SECTION */}
        <div className="hero-container">
          <div className="hero-text-overlay" style={{ marginTop: '1.5rem' }}>
            
            <motion.div 
               initial={{ opacity: 0, scale: 0.5, rotate: -5 }} 
               animate={{ opacity: 1, scale: 1, rotate: -2 }} 
               transition={{ delay: 1.5, duration: 1.2, type: 'spring' }}
            >
               <h2 className="hero-title-love">Celebrando con amor el</h2>
            </motion.div>

            <motion.div 
               initial={{ opacity: 0, y: 10, rotate: -2 }} 
               animate={{ opacity: 1, y: 0, rotate: -2 }} 
               transition={{ delay: 2.0, duration: 1.2, type: 'spring' }}
            >
               <h2 className="hero-title-love" style={{fontSize: '3.5rem', marginBottom: '0'}}>Primer Añito</h2>
            </motion.div>

            <motion.div 
               initial={{ opacity: 0, y: 20 }} 
               animate={{ opacity: 1, y: 0 }} 
               transition={{ delay: 2.8, duration: 1, type: 'spring', stiffness: 60 }}
               style={{ zIndex: 2, position: 'relative' }}
            >
               <h3 className="hero-title-name">de</h3>
            </motion.div>

            <div style={{ marginTop: '-2.5rem', zIndex: 1, position: 'relative' }}>
               <AnimatedWord text="Eithan Denny" className="hero-title-big" delayOffset={3.0} />
            </div>

          </div>

          {/* Imagen de Bienvenida (HIJO) Premium Frame */}
          <motion.div 
             initial={{ scale: 0.8, opacity: 0, y: 50, rotate: -5 }}
             animate={{ scale: 1, opacity: 1, y: 0, rotate: 0 }}
             transition={{ duration: 1.5, delay: 2.5, type: 'spring', bounce: 0.4 }}
             whileInView={{ y: [0, -10, 0] }}
             viewport={{ once: false }}
             style={{ 
               width: '85%', 
               margin: '0 auto', 
               marginTop: '16rem', 
               position: 'relative', 
               zIndex: 10, 
               padding: '10px',
               background: 'linear-gradient(135deg, rgba(255,255,255,1) 0%, rgba(169,207,238,1) 50%, rgba(71,142,204,1) 100%)',
               borderRadius: '35px', 
               boxShadow: '0 25px 50px rgba(71,142,204,0.4), inset 0 0 10px rgba(255,255,255,0.8)', 
             }}
          >
             <div style={{ borderRadius: '25px', overflow: 'hidden', border: '5px solid #FFFFFF', position: 'relative' }}>
               <img src="/HIJO.webp" alt="Bienvenida Jefe Eithan" style={{width: '100%', height: 'auto', display: 'block', objectFit: 'cover'}} />
               
               {/* Efecto de Brillo / Glare Animado */}
               <motion.div 
                 animate={{ x: ['-200%', '300%'] }}
                 transition={{ repeat: Infinity, duration: 4, delay: 1, ease: 'easeInOut' }}
                 style={{
                   position: 'absolute', top: 0, left: 0, width: '50%', height: '100%',
                   background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.5), transparent)',
                   transform: 'skewX(-25deg)', zIndex: 20
                 }}
               />
             </div>
          </motion.div>
        </div>

        {/* CONTENT SECTIONS */}
        <div className="content-section" style={{ paddingBottom: '6rem' }}>
          
          <ThemeCard>
             <h2 className="card-title" style={{fontSize: '2rem'}}>¡Nuestro Jefe Eithan!</h2>
             <p style={{ fontSize: '1.15rem', color: 'var(--text-dark)', lineHeight: '1.8', fontStyle: 'italic', fontWeight: 600 }}>
               "Desde que este Pequeño Jefe asumió la gerencia de nuestros corazones, nuestra vida se ha llenado de luz, risas y un amor infinito. Han sido 365 días del proyecto más hermoso de nuestras vidas. ¡Acompáñanos a celebrar el primer añito de Eithan Denny y hagamos juntos un recuerdo inolvidable!"
             </p>
          </ThemeCard>

          <ThemeCard>
             <h2 className="card-title" style={{fontSize: '1.5rem', marginBottom: '0'}}>Falta muy poco</h2>
             <CountdownTimer />
          </ThemeCard>

          <ThemeCard>
             <h2 className="card-title">Datos del Evento</h2>
             
             <div className="event-details-grid">
               <div className="detail-item-centered">
                 <Calendar className="detail-icon" size={36} />
                 <div className="detail-text">Sábado, 16 de Octubre</div>
                 <div className="detail-sub">Fecha Oficial</div>
               </div>

               <div className="detail-item-centered">
                 <Clock className="detail-icon" size={36} />
                 <div className="detail-text">15:00 hrs</div>
                 <div className="detail-sub">Puntualidad Corporativa</div>
               </div>

               <div className="detail-item-centered">
                 <MapPin className="detail-icon" size={36} />
                 <div className="detail-text">Salón de Eventos(Tío Mauro)</div>
                 <div className="detail-sub">Av. Principal a lado del tanque de agua Blanco #123</div>
               </div>
             </div>

             {/* Enlace de Ubicación GPS */}
             <a href="https://maps.app.goo.gl/AwFjXemdsbdZMywh7" target="_blank" rel="noreferrer" className="btn-primary" style={{marginTop: '1.5rem', padding: '1rem', fontSize: '1rem'}}>
               <MapPin size={20} /> Ver Ubicación GPS
             </a>
          </ThemeCard>

          <ThemeCard>
             <h2 className="card-title">Galería del Jefe</h2>
             <div style={{ overflow: 'hidden', border: '4px solid #FFFFFF', borderRadius: '15px', marginBottom: '1rem', boxShadow: '0 10px 25px rgba(0,0,0,0.15)' }}>
                <img src="/GALERIA.webp" alt="Foto Destacada" style={{width: '100%', height: 'auto', display: 'block', objectFit: 'cover'}} />
             </div>
             
             <button onClick={() => setIsGalleryOpen(true)} className="btn-primary" style={{width: '100%', display: 'flex', justifyContent: 'center', padding: '1.2rem'}}>
               <ImageIcon size={22} style={{marginRight: '8px'}} /> Ver Fotos por Mes
             </button>
          </ThemeCard>

          <ThemeCard>
             <h2 className="card-title">Agenda Ejecutiva</h2>
             <div className="detail-row" style={{justifyContent: 'flex-start'}}>
               <Users className="detail-icon" size={28} />
               <div style={{textAlign: 'left'}}>
                 <div className="detail-text">16:00 - Show Infantil</div>
                 <div className="detail-sub">Actividades para socios</div>
               </div>
             </div>
             <div className="detail-row" style={{justifyContent: 'flex-start'}}>
               <Music className="detail-icon" size={28} />
               <div style={{textAlign: 'left'}}>
                 <div className="detail-text">17:30 - Hora Loca</div>
                 <div className="detail-sub">Música y diversión</div>
               </div>
             </div>
             <div className="detail-row" style={{justifyContent: 'flex-start'}}>
               <Utensils className="detail-icon" size={28} />
               <div style={{textAlign: 'left'}}>
                 <div className="detail-text">18:30 - Banquete</div>
                 <div className="detail-sub">Torta y Snacks</div>
               </div>
             </div>
          </ThemeCard>

         

          {/* Imagen de la Piñata en lugar de Jimbo */}
          <motion.div 
             initial={{ scale: 0.8, opacity: 0 }}
             whileInView={{ scale: 1, opacity: 1 }}
             viewport={{ once: false }}
             style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem', marginBottom: '-3rem', zIndex: 10, position: 'relative' }}
          >
             <img src="/pinata.webp" alt="Piñata" style={{ width: '220px', filter: 'drop-shadow(0 10px 15px rgba(0,0,0,0.2))' }} />
          </motion.div>

           <ThemeCard>
             <h2 className="card-title" style={{fontSize: '2rem', marginTop: '1.5rem', color: 'var(--blue-primary)', textTransform: 'none'}}>¡Acompáñanos a celebrar!</h2>
             <p style={{marginBottom: '1.5rem', color: '#4a5568', fontSize: '1.1rem', lineHeight: '1.6', textAlign: 'center'}}>
               No puedes faltar a la celebración de mi primer añito. ¡Nos la pasaremos genial! 
               <br/><br/>
               Por favor, confirma tu asistencia para que mis papis puedan tener todo listo.
             </p>
             <a href="https://wa.me/59173848473?text=¡Hola!%20Confirmo%20mi%20asistencia%20al%20cumpleaños%20del%20Jefe%20Eithan.%20¡Ahí%20nos%20vemos!" target="_blank" rel="noreferrer" className="btn-primary" style={{width: '100%', display: 'flex', justifyContent: 'center', padding: '1.2rem', fontSize: '1.1rem'}}>
               <Phone size={22} style={{marginRight: '8px'}} /> Confirmar Asistencia
             </a>
           </ThemeCard>

        </div>
      </div>

      {/* Modal de Galería por Meses */}
      <AnimatePresence>
        {isGalleryOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            style={{
              position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
              background: 'rgba(253, 251, 247, 0.98)', backdropFilter: 'blur(15px)',
              zIndex: 999999, overflowY: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '1rem'
            }}
          >
            <div style={{ width: '100%', maxWidth: '500px', position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <button onClick={() => setIsGalleryOpen(false)} style={{ position: 'absolute', top: '0', right: '0', background: 'var(--blue-primary)', color: 'white', border: 'none', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 5px 15px rgba(0,0,0,0.2)' }}>
                <X size={20} />
              </button>
              
              <h2 className="hero-title-love" style={{fontSize: '2.5rem', marginTop: '1rem', marginBottom: '2rem', textAlign: 'center'}}>Mi Primer Año</h2>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.8rem', width: '100%', paddingBottom: '3rem' }}>
                {[
                  { src: '/1.webp', pos: 'center' },
                  { src: '/2.webp', pos: 'center 8%' },
                  { src: '/3.webp', pos: 'center 35%' },
                  { src: '/4.1.webp', pos: 'center 15%' },
                  { src: '/5.webp', pos: 'center 25%' },
                  { src: '/11.1.webp', pos: 'center 35%' },
                  { src: '/7.webp', pos: 'center 15%' },
                  { src: '/8.webp', pos: 'center 15%' },
                  { src: '/10.webp', pos: 'center' },
                  { src: '/10.7.webp', pos: 'center' },
                  { src: '/11.2.webp', pos: 'center' },
                  { src: '/12.webp', pos: 'center 2%' }
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ width: '100%', aspectRatio: '1/1', background: '#FFFFFF', border: '3px solid #FFFFFF', borderRadius: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 5px 15px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
                      <img src={item.src} alt={`Mes ${i + 1}`} style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: item.pos}} />
                    </div>
                    <div style={{ marginTop: '0.5rem', fontWeight: '800', color: 'var(--blue-primary)', fontFamily: 'Montserrat', fontSize: '0.85rem' }}>Mes {i + 1}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default App;
