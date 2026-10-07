import React, { useState, useEffect, useRef } from 'react';
import { 
  Calendar as CalendarIcon, Clock, BookOpen, Trash2, Target, 
  Timer, ChevronRight, ChevronLeft, UserPlus, Send, X, Play, Pause, RotateCcw,
  Palette, Smile, CheckCircle2, Bookmark
} from 'lucide-react';

const App = () => {
  const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  const diasSemana = ["Lun", "Mar", "Mie", "Jue", "Vie", "Sab", "Dom"];
  
  const temas = {
    gradienteEstatico: {
      name: "Gradiente",
      primary: "text-gradient bg-gradient-to-r from-[#7a57d1] to-[#e44d9b] bg-clip-text text-transparent font-black",
      primaryBg: "bg-gradient-to-r from-[#7a57d1] to-[#e44d9b]",
      primaryLight: "bg-purple-50",
      primaryBorder: "border-purple-100",
      accent: "text-[#e44d9b]",
      accentBg: "bg-gradient-to-r from-purple-50 via-pink-50 to-rose-50",
      buttonHover: "hover:brightness-105",
      bgOverlay: "bg-slate-50",
      localImg: "https://www.transparenttextures.com/patterns/inspiration-geometry.png"
    },
    sakura: {
      name: "Sakura",
      primary: "text-pink-600",
      primaryBg: "bg-pink-600",
      primaryLight: "bg-pink-50",
      primaryBorder: "border-pink-200",
      accent: "text-pink-500",
      accentBg: "bg-pink-100",
      buttonHover: "hover:bg-pink-700",
      bgOverlay: "bg-pink-50/50",
      localImg: "https://www.transparenttextures.com/patterns/cubes.png"
    },
    morado: {
      name: "Morado",
      primary: "text-purple-600",
      primaryBg: "bg-purple-600",
      primaryLight: "bg-purple-50",
      primaryBorder: "border-purple-200",
      accent: "text-purple-500",
      accentBg: "bg-purple-100",
      buttonHover: "hover:bg-purple-700",
      bgOverlay: "bg-purple-50/50",
      localImg: "https://www.transparenttextures.com/patterns/diamond-upholstery.png"
    },
    azul: {
      name: "Azul",
      primary: "text-blue-600",
      primaryBg: "bg-blue-600",
      primaryLight: "bg-blue-50",
      primaryBorder: "border-blue-200",
      accent: "text-blue-500",
      accentBg: "bg-blue-100",
      buttonHover: "hover:bg-blue-700",
      bgOverlay: "bg-blue-50/50",
      localImg: ""
    },
    verde: {
      name: "Verde",
      primary: "text-emerald-600",
      primaryBg: "bg-emerald-600",
      primaryLight: "bg-emerald-50",
      primaryBorder: "border-emerald-200",
      accent: "text-emerald-500",
      accentBg: "bg-emerald-100",
      buttonHover: "hover:bg-emerald-700",
      bgOverlay: "bg-emerald-50/50",
      localImg: "https://www.transparenttextures.com/patterns/polygons.png"
    },
    naranja: {
      name: "Naranja",
      primary: "text-orange-600",
      primaryBg: "bg-orange-600",
      primaryLight: "bg-orange-50",
      primaryBorder: "border-orange-200",
      accent: "text-orange-500",
      accentBg: "bg-orange-100",
      buttonHover: "hover:bg-orange-700",
      bgOverlay: "bg-orange-50/50",
      localImg: "https://www.transparenttextures.com/patterns/diagmonds-light.png"
    }
  };

  const [temaActual, setTemaActual] = useState(() => {
    const salvo = localStorage.getItem('sakura_theme');
    return salvo && temas[salvo] ? salvo : 'gradienteEstatico';
  });

  const t = temas[temaActual] || temas.gradienteEstatico;

  const [mesIndice, setMesIndice] = useState(new Date().getMonth());
  const [anioActual, setAnioActual] = useState(new Date().getFullYear());
  const [diaSeleccionado, setDiaSeleccionado] = useState(new Date().getDate());

  useEffect(() => {
    const checkDate = () => {
      const hoy = new Date();
      if (hoy.getMonth() !== mesIndice || hoy.getFullYear() !== anioActual) {
        setMesIndice(hoy.getMonth());
        setAnioActual(hoy.getFullYear());
        setDiaSeleccionado(hoy.getDate());
      }
    };
    checkDate();
    const interval = setInterval(checkDate, 3600000);
    return () => clearInterval(interval);
  }, []);

  const [datosMensuales, setDatosMensuales] = useState(() => {
    const salvo = localStorage.getItem('sakura_data_v6');
    return salvo ? JSON.parse(salvo) : {};
  });

  const [estudiantesGlobales, setEstudiantesGlobales] = useState(() => {
    const salvo = localStorage.getItem('sakura_estudiantes_v1');
    return salvo ? JSON.parse(salvo) : [];
  });
  
  const [showEditModal, setShowEditModal] = useState(null);
  const [showThemeSelector, setShowThemeSelector] = useState(false);

  // --- CRONÓMETRO CON RECALCULO AUTOMÁTICO EN SEGUNDO PLANO ---
  const [isTimerRunning, setIsTimerRunning] = useState(() => {
    return localStorage.getItem('timer_is_running') === 'true';
  });
  
  const [secondsElapsed, setSecondsElapsed] = useState(() => {
    const savedSeconds = parseInt(localStorage.getItem('timer_seconds_elapsed')) || 0;
    const isRunning = localStorage.getItem('timer_is_running') === 'true';
    if (isRunning) {
      const startTime = parseInt(localStorage.getItem('timer_start_time'));
      if (startTime) {
        return savedSeconds + (Math.floor(Date.now() / 1000) - startTime);
      }
    }
    return savedSeconds;
  });

  const timerRef = useRef(null);

  const syncTimer = () => {
    if (localStorage.getItem('timer_is_running') === 'true') {
      const startTime = parseInt(localStorage.getItem('timer_start_time'));
      const savedSeconds = parseInt(localStorage.getItem('timer_seconds_elapsed')) || 0;
      if (startTime) {
        setSecondsElapsed(savedSeconds + (Math.floor(Date.now() / 1000) - startTime));
      }
    }
  };

  useEffect(() => {
    if (isTimerRunning) {
      syncTimer();
      timerRef.current = setInterval(syncTimer, 1000);
      
      const handleVisibilityChange = () => {
        if (!document.hidden) syncTimer();
      };
      document.addEventListener('visibilitychange', handleVisibilityChange);
      return () => {
        clearInterval(timerRef.current);
        document.removeEventListener('visibilitychange', handleVisibilityChange);
      };
    } else {
      clearInterval(timerRef.current);
    }
  }, [isTimerRunning]);

  const startTimer = () => {
    const now = Math.floor(Date.now() / 1000);
    localStorage.setItem('timer_start_time', now.toString());
    localStorage.setItem('timer_is_running', 'true');
    setIsTimerRunning(true);
  };

  const pauseTimer = () => {
    localStorage.setItem('timer_seconds_elapsed', secondsElapsed.toString());
    localStorage.setItem('timer_is_running', 'false');
    localStorage.removeItem('timer_start_time');
    setIsTimerRunning(false);
  };

  const resetTimer = () => {
    clearInterval(timerRef.current);
    localStorage.setItem('timer_seconds_elapsed', '0');
    localStorage.setItem('timer_is_running', 'false');
    localStorage.removeItem('timer_start_time');
    setSecondsElapsed(0);
    setIsTimerRunning(false);
  };

  const mesActualKey = meses[mesIndice];
  const totalDiasMes = new Date(anioActual, mesIndice + 1, 0).getDate();

  const getPrimerDiaSemanaIndice = (month, year) => {
    let day = new Date(year, month, 1).getDay();
    return day === 0 ? 6 : day - 1; 
  };
  const primerDiaOffset = getPrimerDiaSemanaIndice(mesIndice, anioActual);

  useEffect(() => {
    localStorage.setItem('sakura_data_v6', JSON.stringify(datosMensuales));
  }, [datosMensuales]);

  useEffect(() => {
    localStorage.setItem('sakura_estudiantes_v1', JSON.stringify(estudiantesGlobales));
  }, [estudiantesGlobales]);

  useEffect(() => {
    localStorage.setItem('sakura_theme', temaActual);
  }, [temaActual]);

  const formatTimer = (totalSeconds) => {
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const storageKey = `${mesActualKey}_${anioActual}`;
  const currentData = datosMensuales[storageKey] || { meta: 50, historial: {} };

  const estudiantesVisibles = estudiantesGlobales.filter(est => {
    if (!est.mesRegistro) return true;
    const [mesReg, anioReg] = est.mesRegistro.split('_');
    const idxReg = meses.indexOf(mesReg);
    const numAnioReg = parseInt(anioReg);

    if (anioActual > numAnioReg) return true;
    if (anioActual === numAnioReg && mesIndice >= idxReg) return true;
    return false;
  });

  const calcularTotales = () => {
    let totalMinutos = 0;
    Object.values(currentData.historial || {}).forEach(dia => {
      totalMinutos += (dia.h * 60) + dia.m;
    });
    return { horas: Math.floor(totalMinutos / 60), minutos: totalMinutos % 60, totalMinutos };
  };

  const { horas, minutos, totalMinutos } = calcularTotales();
  const updateCurrentMonth = (newData) => {
    setDatosMensuales(prev => ({ ...prev, [storageKey]: { ...currentData, ...newData } }));
  };

  const [nuevaHora, setNuevaHora] = useState('');
  const [nuevoMinuto, setNuevoMinuto] = useState('');
  const [formEstudiante, setFormEstudiante] = useState({ nombre: '', fecha: '', horaClase: '', leccion: '', notas: '' });

  const registrarActividad = (hInput, mInput) => {
    let h = parseInt(hInput) || 0;
    let m = parseInt(mInput) || 0;

    // Ajustar si los minutos sobrepasan 60
    if (m >= 60) {
      h += Math.floor(m / 60);
      m = m % 60;
    }

    if (h > 0 || m > 0) {
      const historialActualizado = { ...currentData.historial };
      const tiempoPrevio = historialActualizado[diaSeleccionado] || { h: 0, m: 0 };
      
      let totM = tiempoPrevio.m + m;
      let totH = tiempoPrevio.h + h + Math.floor(totM / 60);
      totM = totM % 60;

      historialActualizado[diaSeleccionado] = { h: totH, m: totM };
      updateCurrentMonth({ historial: historialActualizado });
    }
  };

  const guardarTiempoCronometro = () => {
    const minsParaSumar = Math.floor(secondsElapsed / 60);
    if (minsParaSumar > 0) {
      registrarActividad(0, minsParaSumar);
      resetTimer();
    }
  };

  const eliminarDia = (dia) => {
    const nuevoHistorial = { ...currentData.historial };
    delete nuevoHistorial[dia];
    updateCurrentMonth({ historial: nuevoHistorial });
  };

  const formatTime12h = (time24) => {
    if (!time24) return '';
    const [h, m] = time24.split(':');
    const hours = parseInt(h);
    const suffix = hours >= 12 ? 'PM' : 'AM';
    const hours12 = hours % 12 || 12;
    return `${hours12}:${m} ${suffix}`;
  };

  const enviarWhatsApp = () => {
    const mensaje = `📋 *Informe de Servicio* 📋\n\n📅 *Mes:* ${mesActualKey} ${anioActual}\n⏱️ *Horas:* ${horas}h ${minutos}m\n📖 *Cursos Bíblicos:* ${estudiantesVisibles.length}`;
    const url = `https://wa.me/?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
  };

  const cambiarMes = (direccion) => {
    let nuevoIndice = mesIndice + direccion;
    let nuevoAnio = anioActual;
    if (nuevoIndice < 0) {
      nuevoIndice = 11;
      nuevoAnio = anioActual - 1;
    } else if (nuevoIndice > 11) {
      nuevoIndice = 0;
      nuevoAnio = anioActual + 1;
    }
    setMesIndice(nuevoIndice);
    setAnioActual(nuevoAnio);
    setDiaSeleccionado(1);
  };

  const porcentaje = Math.min(100, (totalMinutos / ((currentData.meta || 1) * 60)) * 100);

  return (
    <div className={`min-h-screen ${t.bgOverlay} p-4 md:p-10 font-sans text-slate-700 relative overflow-x-hidden transition-all duration-700`}>
      {t.localImg && (
        <div 
          className="fixed inset-0 z-0 opacity-10 pointer-events-none transition-all duration-700"
          style={{ backgroundImage: `url('${t.localImg}')` }}
        ></div>
      )}

      <div className="max-w-5xl mx-auto relative z-10">
        <header className="text-center mb-10">
          <div className={`inline-flex items-center justify-center p-3 rounded-full ${t.primaryLight} mb-3 shadow-sm transition-colors`}>
            <Smile size={42} strokeWidth={2.5} className={temaActual === 'gradienteEstatico' ? "text-[#7a57d1]" : t.primary} />
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-slate-800 tracking-tight">
            Registro de <span className={temaActual === 'gradienteEstatico' ? "bg-gradient-to-r from-[#7a57d1] to-[#e44d9b] bg-clip-text text-transparent font-black" : `${t.primary} transition-colors`}>Servicio</span>
          </h1>
          <p className="text-slate-500 font-medium mt-1 tracking-wide text-sm md:text-base">Organiza tu actividad mensual de forma práctica</p>
        </header>

        {/* NAVEGACIÓN DE MES & META */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2 bg-white/90 backdrop-blur-sm p-6 rounded-[2.5rem] shadow-sm border border-slate-100 flex items-center justify-between">
            <button onClick={() => cambiarMes(-1)} className={`p-3 rounded-2xl hover:bg-slate-100 transition-colors ${temaActual === 'gradienteEstatico' ? 'text-[#7a57d1]' : t.primary}`}>
              <ChevronLeft size={28} />
            </button>
            <div className="text-center">
              <h2 className="text-2xl md:text-3xl font-black text-slate-800">{mesActualKey}</h2>
              <p className={`text-xs font-black ${t.accent} uppercase tracking-[0.2em] transition-colors`}>{anioActual}</p>
            </div>
            <button onClick={() => cambiarMes(1)} className={`p-3 rounded-2xl hover:bg-slate-100 transition-colors ${temaActual === 'gradienteEstatico' ? 'text-[#e44d9b]' : t.primary}`}>
              <ChevronRight size={28} />
            </button>
          </div>

          <div className={`p-6 rounded-[2.5rem] shadow-lg text-white flex flex-col justify-center relative overflow-hidden transition-all duration-700 ${t.primaryBg}`}>
            <div className="absolute -right-4 -top-4 opacity-20 pointer-events-none"><Target size={110} /></div>
            <span className="text-[10px] font-black uppercase tracking-widest opacity-80 mb-2 z-10">Meta Mensual</span>
            <div className="flex items-center gap-3 z-10">
              <input 
                type="number" 
                value={currentData.meta} 
                onChange={(e) => updateCurrentMonth({ meta: Math.max(1, Number(e.target.value)) })} 
                className="bg-white/20 w-24 text-3xl font-black rounded-xl text-center focus:outline-none placeholder-white/50 transition-all focus:bg-white/30"
              />
              <span className="text-lg font-bold">horas</span>
            </div>
          </div>
        </div>

        {/* CRONÓMETRO */}
        <section className={`mb-8 bg-white/80 backdrop-blur-md border ${t.primaryBorder} p-6 rounded-[2.5rem] flex flex-wrap items-center justify-around gap-4 shadow-sm transition-colors`}>
          <div className="flex items-center gap-4">
            <div className={`p-4 rounded-2xl ${isTimerRunning ? `${t.primaryBg} animate-pulse shadow-lg text-white` : 'bg-slate-100 text-slate-400'} transition-all`}>
              <Clock size={26} />
            </div>
            <p className={`text-4xl md:text-5xl font-black font-mono tabular-nums transition-colors ${isTimerRunning && temaActual === 'gradienteEstatico' ? 'bg-gradient-to-r from-[#7a57d1] to-[#e44d9b] bg-clip-text text-transparent' : isTimerRunning ? t.primary : 'text-slate-700'}`}>
              {formatTimer(secondsElapsed)}
            </p>
          </div>
          <div className="flex gap-2">
            {!isTimerRunning ? (
              <button onClick={startTimer} className={`p-4 text-white rounded-2xl shadow-md active:scale-95 transition-all ${t.primaryBg} ${t.buttonHover}`} title="Iniciar cronómetro">
                <Play fill="currentColor" size={20}/>
              </button>
            ) : (
              <button onClick={pauseTimer} className="p-4 bg-slate-700 text-white rounded-2xl hover:bg-slate-800 active:scale-95 transition-all" title="Pausar cronómetro">
                <Pause fill="currentColor" size={20}/>
              </button>
            )}
            <button onClick={resetTimer} className="p-4 bg-slate-100 text-slate-500 rounded-2xl hover:bg-slate-200 transition-colors" title="Reiniciar cronómetro">
              <RotateCcw size={20}/>
            </button>
            <button onClick={guardarTiempoCronometro} className={`px-6 py-4 text-white rounded-2xl font-bold text-xs uppercase tracking-widest shadow-md active:scale-95 transition-all ${t.primaryBg} ${t.buttonHover}`}>
              Guardar Mins
            </button>
          </div>
        </section>

        {/* GRID PRINCIPAL */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* PANEL IZQUIERDO: FORMULARIO Y CALENDARIO */}
          <div className="lg:col-span-5 space-y-8">
            <section className="bg-white p-6 md:p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center justify-between">
                <span>Registrar Día {diaSeleccionado}</span>
                {currentData.historial && currentData.historial[diaSeleccionado] && (
                  <button 
                    onClick={() => window.confirm(`¿Borrar registro del día ${diaSeleccionado}?`) && eliminarDia(diaSeleccionado)}
                    className="text-red-500 hover:text-red-700 flex items-center gap-1 normal-case font-bold text-[11px]"
                  >
                    <Trash2 size={13}/> Borrar hoy
                  </button>
                )}
              </h3>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 ml-2">HORAS</label>
                    <input type="number" min="0" placeholder="0" className="w-full bg-slate-50 rounded-2xl p-4 text-2xl font-black text-slate-700 focus:ring-4 focus:ring-slate-100 outline-none transition-all" value={nuevaHora} onChange={e => setNuevaHora(e.target.value)}/>
                </div>
                <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 ml-2">MINUTOS</label>
                    <input type="number" min="0" placeholder="0" className="w-full bg-slate-50 rounded-2xl p-4 text-2xl font-black text-slate-700 focus:ring-4 focus:ring-slate-100 outline-none transition-all" value={nuevoMinuto} onChange={e => setNuevoMinuto(e.target.value)}/>
                </div>
              </div>
              <button onClick={() => {registrarActividad(nuevaHora, nuevoMinuto); setNuevaHora(''); setNuevoMinuto('');}} className={`w-full text-white py-4 rounded-2xl font-bold uppercase tracking-widest text-xs shadow-lg active:scale-95 transition-all ${t.primaryBg} ${t.buttonHover}`}>
                Añadir Tiempo
              </button>
            </section>

            <section className="bg-white p-6 md:p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6">Calendario de Actividad</h3>
              
              <div className="grid grid-cols-7 gap-1 text-center mb-3">
                {diasSemana.map((d, index) => (
                  <span key={index} className="text-[10px] font-bold text-slate-400 uppercase">
                    {d}
                  </span>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-1.5">
                {[...Array(primerDiaOffset)].map((_, i) => (
                  <div key={`empty-${i}`} className="aspect-square"></div>
                ))}

                {[...Array(totalDiasMes)].map((_, i) => {
                  const dia = i + 1;
                  const reg = currentData.historial && currentData.historial[dia];
                  const tieneActividad = !!reg;
                  const esSeleccionado = diaSeleccionado === dia;
                  
                  return (
                    <button 
                      key={dia} 
                      onClick={() => setDiaSeleccionado(dia)}
                      className={`aspect-square rounded-xl text-xs font-bold transition-all relative flex flex-col items-center justify-center
                        ${tieneActividad ? `text-white shadow-sm ${t.primaryBg}` : `bg-slate-50 text-slate-600 hover:bg-slate-100`}
                        ${esSeleccionado ? 'ring-2 ring-slate-800 ring-offset-2 scale-105 z-10 font-black' : ''}
                      `}
                    >
                      <span>{dia}</span>
                      {reg && (
                        <span className="text-[8px] opacity-90 font-mono font-normal">
                          {reg.h > 0 ? `${reg.h}h` : `${reg.m}m`}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </section>
          </div>

          {/* PANEL DERECHO: MÉTRICAS, INFORMES Y ESTUDIANTES */}
          <div className="lg:col-span-7 space-y-8">
            <section className="bg-white p-6 md:p-8 rounded-[3rem] shadow-sm border border-slate-100 text-center">
              
              {/* METRICAS PRINCIPALES */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="p-4 bg-slate-50 rounded-2xl transition-all hover:shadow-inner">
                  <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Total Horas</p>
                  <p className={temaActual === 'gradienteEstatico' ? "text-2xl font-black bg-gradient-to-r from-[#7a57d1] to-[#e44d9b] bg-clip-text text-transparent" : `text-2xl font-black ${t.primary}`}>
                    {horas}h {minutos}m
                  </p>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl transition-all hover:shadow-inner">
                  <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Cursos</p>
                  <p className={temaActual === 'gradienteEstatico' ? "text-2xl font-black text-[#e44d9b]" : `text-2xl font-black ${t.primary}`}>
                    {estudiantesVisibles.length}
                  </p>
                </div>
                <div className={`p-4 rounded-2xl text-white shadow-md transition-colors ${t.primaryBg}`}>
                  <p className="text-[10px] font-bold opacity-80 uppercase mb-1">Progreso</p>
                  <p className="text-2xl font-black">{porcentaje.toFixed(0)}%</p>
                </div>
                <button 
                  onClick={() => {if(window.confirm("¿Deseas reiniciar todos los registros de este mes?")) updateCurrentMonth({historial:{}})}} 
                  className="p-4 bg-red-50 text-red-500 rounded-2xl flex flex-col items-center justify-center hover:bg-red-100 transition-colors group"
                  title="Reiniciar mes"
                >
                  <Trash2 size={20} className="transition-transform group-hover:scale-110 mb-0.5" />
                  <span className="text-[9px] font-black uppercase">Limpiar</span>
                </button>
              </div>

              {/* BARRA DE PROGRESO */}
              <div className="mb-8 bg-slate-100 h-3 rounded-full overflow-hidden p-0.5">
                <div 
                  className={`h-full rounded-full transition-all duration-1000 ${t.primaryBg}`} 
                  style={{ width: `${porcentaje}%` }}
                ></div>
              </div>

              <button 
                onClick={enviarWhatsApp} 
                className="w-full bg-[#25D366] text-white py-4 px-8 rounded-2xl font-black uppercase tracking-widest text-xs md:text-sm shadow-lg hover:brightness-105 active:scale-95 transition-all flex items-center justify-center gap-3"
              >
                <Send size={18} className="fill-white" /> ENVIAR INFORME POR WHATSAPP
              </button>
            </section>

            {/* CURSOS BÍBLICOS DETALLADOS */}
            <section className="bg-white p-6 md:p-8 rounded-[3rem] shadow-sm border border-slate-100">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <BookOpen size={16} /> Cursos Bíblicos
                </h3>
                <button 
                  onClick={() => {setFormEstudiante({nombre:'', fecha:'', horaClase:'', leccion:'', notas:''}); setShowEditModal('nuevo')}} 
                  className={`text-white px-4 py-2 rounded-xl text-xs font-bold shadow-md hover:brightness-105 active:scale-95 flex items-center gap-1.5 transition-all ${t.primaryBg}`}
                >
                  <UserPlus size={14} /> Nuevo Curso
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {estudiantesVisibles.length > 0 ? (
                  estudiantesVisibles.map(est => (
                    <div 
                      key={est.id} 
                      onClick={() => {setFormEstudiante(est); setShowEditModal(est.id)}} 
                      className="p-5 bg-slate-50/80 rounded-[1.5rem] border border-slate-100 flex justify-between items-start cursor-pointer hover:border-slate-300 hover:bg-white hover:shadow-md transition-all group"
                    >
                      <div className="space-y-1">
                        <p className="font-bold text-slate-800 text-sm flex items-center gap-1.5">
                          {est.nombre}
                        </p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                          🗓️ {est.fecha || 'Sin día'} {est.horaClase && `• ${formatTime12h(est.horaClase)}`}
                        </p>
                        {est.leccion && (
                          <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-200/60 text-slate-600 text-[10px] font-semibold mt-1">
                            <Bookmark size={10} /> {est.leccion}
                          </div>
                        )}
                        {est.notas && (
                          <p className="text-[11px] text-slate-500 italic line-clamp-1 mt-1">"{est.notas}"</p>
                        )}
                      </div>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation(); 
                          if(window.confirm(`¿Borrar el curso de ${est.nombre}?`)) {
                            setEstudiantesGlobales(prev => prev.filter(i => i.id !== est.id));
                          }
                        }} 
                        className="text-slate-300 hover:text-red-500 opacity-100 md:opacity-0 group-hover:opacity-100 transition-all p-1"
                        title="Eliminar curso"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))
                ) : (
                  <p className="col-span-full text-center py-8 text-slate-400 text-sm italic">
                    No hay cursos bíblicos activos guardados
                  </p>
                )}
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* SELECTOR FLOTANTE DE TEMAS */}
      <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end gap-3">
        {showThemeSelector && (
            <div className="bg-white/95 backdrop-blur-md p-3 rounded-3xl shadow-2xl border border-slate-100 flex flex-col gap-3 max-h-[70vh] overflow-y-auto animate-in fade-in slide-in-from-bottom-4 scrollbar-none">
                {Object.keys(temas).map(key => (
                    <button 
                        key={key}
                        onClick={() => {setTemaActual(key); setShowThemeSelector(false)}}
                        className={`w-10 h-10 rounded-2xl border-2 transition-all hover:scale-110 active:scale-90 flex-shrink-0 ${temaActual === key ? 'border-slate-800' : 'border-transparent'}`}
                        style={{ background: key === 'gradienteEstatico' ? 'linear-gradient(135deg, #7a57d1, #e44d9b)' : 
                                           temas[key].primaryBg.includes('pink') ? '#db2777' : 
                                           temas[key].primaryBg.includes('purple') ? '#9333ea' :
                                           temas[key].primaryBg.includes('blue') ? '#2563eb' :
                                           temas[key].primaryBg.includes('emerald') ? '#059669' : '#ea580c'
                        }}
                        title={temas[key].name}
                    />
                ))}
            </div>
        )}
        <button 
            onClick={() => setShowThemeSelector(!showThemeSelector)}
            className={`p-4 rounded-2xl text-white transition-all hover:scale-110 active:scale-95 shadow-lg ${t.primaryBg}`}
            title="Cambiar tema de color"
        >
            <Palette size={24} />
        </button>
      </div>

      {/* MODAL PARA AÑADIR / EDITAR CURSO */}
      {showEditModal && (
        <div className="fixed inset-0 z-[110] bg-slate-900/40 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white w-full max-w-md rounded-[2.5rem] p-6 md:p-8 shadow-2xl border border-slate-100 animate-in slide-in-from-bottom-6">
            <div className="flex justify-between items-center mb-6">
              <h4 className="text-xl font-bold text-slate-800">
                {showEditModal === 'nuevo' ? 'Nuevo Curso Bíblico' : 'Editar Curso'}
              </h4>
              <button onClick={() => setShowEditModal(null)} className="text-slate-400 hover:text-slate-600 transition-colors">
                <X />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-[10px] font-bold text-slate-400 ml-2">NOMBRE COMPLETO</label>
                <input type="text" placeholder="Ej: Maria Perez" className="w-full bg-slate-50 rounded-2xl p-4 text-sm focus:ring-2 focus:ring-slate-200 outline-none transition-all mt-1" value={formEstudiante.nombre} onChange={e => setFormEstudiante({...formEstudiante, nombre: e.target.value})}/>
              </div>
              
              <div className="flex gap-3 w-full">
                <div className="w-1/2">
                  <label className="text-[10px] font-bold text-slate-400 ml-2">DÍA DE LA SEMANA</label>
                  <input type="text" placeholder="Ej: Lunes" className="w-full bg-slate-50 rounded-2xl p-4 text-sm focus:ring-2 focus:ring-slate-200 outline-none transition-all mt-1" value={formEstudiante.fecha} onChange={e => setFormEstudiante({...formEstudiante, fecha: e.target.value})}/>
                </div>
                
                <div className="w-1/2">
                  <label className="text-[10px] font-bold text-slate-400 ml-2">HORA</label>
                  <input 
                    type="time" 
                    className="w-full bg-slate-50 rounded-2xl p-4 text-sm focus:ring-2 focus:ring-slate-200 outline-none transition-all cursor-pointer text-slate-700 min-w-0 mt-1" 
                    value={formEstudiante.horaClase} 
                    onChange={e => setFormEstudiante({...formEstudiante, horaClase: e.target.value})}
                  />
                </div>
              </div>
              
              <div>
                <label className="text-[10px] font-bold text-slate-400 ml-2">CAPÍTULO / LECCIÓN ACTUAL</label>
                <input type="text" placeholder="Ej: Lección 4 - Pág 12" className="w-full bg-slate-50 rounded-2xl p-4 text-sm focus:ring-2 focus:ring-slate-200 outline-none transition-all mt-1" value={formEstudiante.leccion} onChange={e => setFormEstudiante({...formEstudiante, leccion: e.target.value})}/>
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-400 ml-2">OBSERVACIONES O NOTAS</label>
                <textarea placeholder="Detalles de interés..." rows="2" className="w-full bg-slate-50 rounded-2xl p-4 text-sm focus:ring-2 focus:ring-slate-200 outline-none resize-none transition-all mt-1" value={formEstudiante.notas} onChange={e => setFormEstudiante({...formEstudiante, notas: e.target.value})}/>
              </div>

              <button 
                onClick={() => {
                  if(formEstudiante.nombre.trim()) {
                    const nuevos = showEditModal === 'nuevo' 
                      ? [...estudiantesGlobales, { ...formEstudiante, id: Date.now(), mesRegistro: `${mesActualKey}_${anioActual}` }] 
                      : estudiantesGlobales.map(e => e.id === showEditModal ? formEstudiante : e);
                    setEstudiantesGlobales(nuevos);
                    setShowEditModal(null);
                  }
                }} 
                className={`w-full text-white py-4 rounded-2xl font-bold uppercase tracking-widest text-xs shadow-lg active:scale-95 transition-all ${t.primaryBg} ${t.buttonHover}`}
              >
                {showEditModal === 'nuevo' ? 'Guardar Curso' : 'Guardar Cambios'}
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;800&family=Inter:wght@400;500;700&display=swap');
        .font-sans { font-family: 'Outfit', 'Inter', sans-serif; }
        
        input[type="time"]::-webkit-calendar-picker-indicator {
          cursor: pointer;
          filter: invert(0.5);
          opacity: 0.6;
        }

        input[type="number"]::-webkit-inner-spin-button, 
        input[type="number"]::-webkit-outer-spin-button { 
          -webkit-appearance: none; 
          margin: 0; 
        }

        .scrollbar-none::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-none {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default App;
