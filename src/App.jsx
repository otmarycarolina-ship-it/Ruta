import React, { useState, useEffect, useRef } from 'react';
import { 
  Calendar as CalendarIcon, Clock, BookOpen, Trash2, Target, 
  Timer, ChevronRight, ChevronLeft, UserPlus, Send, X, Play, Pause, RotateCcw,
  Palette, Smile
} from 'lucide-react';

const App = () => {
  const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  
  const temas = {
    sakura: {
      name: "Sakura",
      primary: "text-pink-600",
      primaryBg: "bg-pink-600",
      primaryLight: "bg-pink-50",
      primaryBorder: "border-pink-200",
      accent: "text-pink-400",
      accentBg: "bg-pink-100",
      buttonHover: "hover:bg-pink-700",
      gradient: "from-pink-500 to-rose-500",
      bgOverlay: "bg-pink-50",
      localImg: "https://www.transparenttextures.com/patterns/cubes.png"
    },
    morado: {
      name: "Morado",
      primary: "text-purple-600",
      primaryBg: "bg-purple-600",
      primaryLight: "bg-purple-50",
      primaryBorder: "border-purple-200",
      accent: "text-purple-400",
      accentBg: "bg-purple-100",
      buttonHover: "hover:bg-purple-700",
      gradient: "from-purple-500 to-indigo-600",
      bgOverlay: "bg-purple-50",
      localImg: "https://www.transparenttextures.com/patterns/diamond-upholstery.png"
    },
    azul: {
      name: "Azul",
      primary: "text-blue-600",
      primaryBg: "bg-blue-600",
      primaryLight: "bg-blue-50",
      primaryBorder: "border-blue-200",
      accent: "text-blue-400",
      accentBg: "bg-blue-100",
      buttonHover: "hover:bg-blue-700",
      gradient: "from-blue-500 to-cyan-600",
      bgOverlay: "bg-purple-50",
      localImg: ""
    },
    verde: {
      name: "Verde",
      primary: "text-emerald-600",
      primaryBg: "bg-emerald-600",
      primaryLight: "bg-emerald-50",
      primaryBorder: "border-emerald-200",
      accent: "text-emerald-400",
      accentBg: "bg-emerald-100",
      buttonHover: "hover:bg-emerald-700",
      gradient: "from-emerald-500 to-teal-600",
      bgOverlay: "bg-emerald-50",
      localImg: "https://www.transparenttextures.com/patterns/polygons.png"
    },
    naranja: {
      name: "Naranja",
      primary: "text-orange-600",
      primaryBg: "bg-orange-600",
      primaryLight: "bg-orange-50",
      primaryBorder: "border-orange-200",
      accent: "text-orange-400",
      accentBg: "bg-orange-100",
      buttonHover: "hover:bg-orange-700",
      gradient: "from-orange-500 to-amber-600",
      bgOverlay: "bg-orange-50",
      localImg: "https://www.transparenttextures.com/patterns/diagmonds-light.png"
    },
    amarillo: {
      name: "Amarillo",
      primary: "text-amber-600",
      primaryBg: "bg-amber-500",
      primaryLight: "bg-amber-50",
      primaryBorder: "border-amber-200",
      accent: "text-yellow-500",
      accentBg: "bg-yellow-100",
      buttonHover: "hover:bg-amber-600",
      gradient: "from-amber-400 to-yellow-500",
      bgOverlay: "bg-amber-50/40",
      localImg: "https://www.transparenttextures.com/patterns/sandpaper.png"
    },
    rojo: {
      name: "Rojo",
      primary: "text-red-600",
      primaryBg: "bg-red-600",
      primaryLight: "bg-red-50",
      primaryBorder: "border-red-200",
      accent: "text-rose-500",
      accentBg: "bg-rose-100",
      buttonHover: "hover:bg-red-700",
      gradient: "from-red-500 to-rose-600",
      bgOverlay: "bg-red-50/50",
      localImg: "https://www.transparenttextures.com/patterns/gplay.png"
    },
    arcoiris: {
      name: "Arcoíris",
      primary: "text-gradient bg-gradient-to-r from-pink-500 via-purple-500 via-blue-500 to-emerald-500 bg-clip-text text-transparent font-black",
      primaryBg: "bg-gradient-to-r from-pink-500 via-purple-500 via-blue-500 to-emerald-500 animate-gradient-xy",
      primaryLight: "bg-slate-100/80",
      primaryBorder: "border-indigo-100",
      accent: "text-indigo-500",
      accentBg: "bg-gradient-to-r from-pink-100 via-purple-100 to-blue-100",
      buttonHover: "hover:brightness-110",
      gradient: "from-pink-500 via-purple-500 via-blue-500 to-emerald-500 animate-gradient-xy",
      bgOverlay: "bg-slate-50",
      localImg: "https://www.transparenttextures.com/patterns/inspiration-geometry.png"
    }
  };

  const [temaActual, setTemaActual] = useState(() => {
    const salvo = localStorage.getItem('sakura_theme');
    return salvo && temas[salvo] ? salvo : 'sakura';
  });

  const t = temas[temaActual];

  const [mesIndice, setMesIndice] = useState(new Date().getMonth());
  const [anioActual, setAnioActual] = useState(new Date().getFullYear());

  useEffect(() => {
    const checkDate = () => {
      const hoy = new Date();
      if (hoy.getMonth() !== mesIndice || hoy.getFullYear() !== anioActual) {
        setMesIndice(hoy.getMonth());
        setAnioActual(hoy.getFullYear());
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
  
  const [showEditModal, setShowEditModal] = useState(null);
  const [showThemeSelector, setShowThemeSelector] = useState(false);

  // --- MEJORA DEL CRONÓMETRO CON TIMESTAMP ---
  const [isTimerRunning, setIsTimerRunning] = useState(() => {
    return localStorage.getItem('timer_is_running') === 'true';
  });
  
  const [secondsElapsed, setSecondsElapsed] = useState(() => {
    const savedSeconds = parseInt(localStorage.getItem('timer_seconds_elapsed')) || 0;
    const isRunning = localStorage.getItem('timer_is_running') === 'true';
    
    if (isRunning) {
      const startTime = parseInt(localStorage.getItem('timer_start_time'));
      if (startTime) {
        const now = Math.floor(Date.now() / 1000);
        return savedSeconds + (now - startTime);
      }
    }
    return savedSeconds;
  });

  const timerRef = useRef(null);

  useEffect(() => {
    if (isTimerRunning) {
      timerRef.current = setInterval(() => {
        const startTime = parseInt(localStorage.getItem('timer_start_time'));
        const savedSeconds = parseInt(localStorage.getItem('timer_seconds_elapsed')) || 0;
        if (startTime) {
          const now = Math.floor(Date.now() / 1000);
          setSecondsElapsed(savedSeconds + (now - startTime));
        }
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
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
  // --- FIN DE LA MEJORA ---

  const mesActualKey = meses[mesIndice];
  const getDiasEnMes = (month, year) => new Date(year, month + 1, 0).getDate();
  const totalDiasMes = getDiasEnMes(mesIndice, anioActual);

  useEffect(() => {
    localStorage.setItem('sakura_data_v6', JSON.stringify(datosMensuales));
  }, [datosMensuales]);

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
  const currentData = datosMensuales[storageKey] || { meta: 50, estudiantes: [], historial: {} };

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
    const hoyReal = new Date();
    const esMesReal = hoyReal.getMonth() === mesIndice && hoyReal.getFullYear() === anioActual;
    const diaARegistrar = esMesReal ? hoyReal.getDate() : 1; 

    if (h > 0 || m > 0) {
      const historialActualizado = { ...currentData.historial };
      const tiempoPrevio = historialActualizado[diaARegistrar] || { h: 0, m: 0 };
      historialActualizado[diaARegistrar] = { h: tiempoPrevio.h + h, m: tiempoPrevio.m + m };
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
    const mensaje = `📋 *Mi informe de servicio* 📋\n\n📅 *Mes:* ${mesActualKey} ${anioActual}\n⏱️ *Horas:* ${horas}h ${minutos}m\n📖 *Cursos Bíblicos:* ${currentData.estudiantes.length}\n\n_Enviado desde mi Registro Personal_`;
    const url = `https://wa.me/?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
  };

  const cambiarMes = (direccion) => {
    let nuevoIndice = mesIndice + direccion;
    if (nuevoIndice < 0) {
      setMesIndice(11);
      setAnioActual(anioActual - 1);
    } else if (nuevoIndice > 11) {
      setMesIndice(0);
      setAnioActual(anioActual + 1);
    } else {
      setMesIndice(nuevoIndice);
    }
  };

  const porcentaje = Math.min(100, (totalMinutos / (currentData.meta * 60)) * 100);

  return (
    <div className={`min-h-screen ${t.bgOverlay} p-4 md:p-10 font-sans text-slate-700 relative overflow-x-hidden transition-all duration-700`}>
      {t.localImg && (
        <div 
          className="fixed inset-0 z-0 opacity-10 pointer-events-none transition-all duration-700"
          style={{ backgroundImage: `url('${t.localImg}')` }}
        ></div>
      )}

      <div className="max-w-5xl mx-auto relative z-10">
        <header className="text-center mb-12">
          <div className={`inline-flex items-center justify-center p-3 rounded-full ${t.primaryLight} mb-4 animate-bounce shadow-sm transition-colors`}>
            <Smile 
              size={48} 
              strokeWidth={2.5} 
              className={temaActual === 'arcoiris' ? "stroke-[url(#rainbow-grad)] fill-[url(#rainbow-grad)]" : t.primary} 
            />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 tracking-tight">
            Registro de <span className={temaActual === 'arcoiris' ? "bg-gradient-to-r from-pink-500 via-purple-500 via-blue-500 to-emerald-500 bg-clip-text text-transparent font-black" : `${t.primary} transition-colors`}>Servicio</span>
          </h1>
          <p className="text-slate-500 font-medium mt-2 tracking-wide">Gestiona tu actividad con eficiencia</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2 bg-white/90 backdrop-blur-sm p-6 rounded-[2.5rem] shadow-sm border border-slate-100 flex items-center justify-between">
            <button onClick={() => cambiarMes(-1)} className={`p-2 rounded-xl hover:bg-slate-50 transition-colors ${temaActual === 'arcoiris' ? 'text-purple-500' : t.primary}`}><ChevronLeft size={28} /></button>
            <div className="text-center">
              <h2 className="text-2xl font-bold text-slate-800">{mesActualKey}</h2>
              <p className={`text-[10px] font-bold ${t.accent} tracking-[0.2em] uppercase transition-colors`}>{anioActual}</p>
            </div>
            <button onClick={() => cambiarMes(1)} className={`p-2 rounded-xl hover:bg-slate-50 transition-colors ${temaActual === 'arcoiris' ? 'text-emerald-500' : t.primary}`}><ChevronRight size={28} /></button>
          </div>

          <div className={`p-6 rounded-[2.5rem] shadow-lg text-white flex flex-col justify-center relative overflow-hidden transition-all duration-700 ${t.primaryBg}`}>
            <div className="absolute -right-4 -top-4 opacity-20"><Target size={100} /></div>
            <span className="text-[10px] font-black uppercase tracking-widest opacity-80 mb-2 z-10">Meta Mensual</span>
            <div className="flex items-center gap-3 z-10">
              <input type="number" value={currentData.meta} onChange={(e) => updateCurrentMonth({ meta: Number(e.target.value) })} className="bg-white/20 w-20 text-3xl font-black rounded-xl text-center focus:outline-none placeholder-white/50 transition-all focus:bg-white/30"/>
              <span className="text-lg font-bold">horas</span>
            </div>
          </div>
        </div>

        <section className={`mb-8 bg-white/80 backdrop-blur-md border ${t.primaryBorder} p-6 rounded-[2.5rem] flex flex-wrap items-center justify-around gap-4 shadow-sm transition-colors`}>
          <div className="flex items-center gap-4">
            <div className={`p-4 rounded-2xl ${isTimerRunning ? `${t.primaryBg} animate-pulse shadow-lg shadow-current/20 text-white` : 'bg-slate-100 text-slate-400'} transition-all`}>
              <Clock size={24} />
            </div>
            <p className={`text-4xl font-black font-mono tabular-nums transition-colors ${isTimerRunning && temaActual === 'arcoiris' ? 'bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent' : isTimerRunning ? t.primary : 'text-slate-700'}`}>{formatTimer(secondsElapsed)}</p>
          </div>
          <div className="flex gap-2">
            {!isTimerRunning ? (
              <button onClick={startTimer} className={`p-4 text-white rounded-2xl shadow-md active:scale-95 transition-all ${t.primaryBg} ${t.buttonHover}`}><Play fill="currentColor" size={20}/></button>
            ) : (
              <button onClick={pauseTimer} className="p-4 bg-slate-700 text-white rounded-2xl hover:bg-slate-800 active:scale-95 transition-all"><Pause fill="currentColor" size={20}/></button>
            )}
            <button onClick={resetTimer} className={`p-4 bg-slate-100 text-slate-500 rounded-2xl hover:bg-slate-200 transition-colors`}><RotateCcw size={20}/></button>
            <button onClick={guardarTiempoCronometro} className={`px-6 py-4 text-white rounded-2xl font-bold text-xs uppercase tracking-widest shadow-md active:scale-95 transition-all ${t.primaryBg} ${t.buttonHover}`}>Guardar</button>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4 space-y-8">
            <section className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-50">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">Registro de hoy</h3>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 ml-2">HORAS</label>
                    <input type="number" placeholder="0" className="w-full bg-slate-50 rounded-2xl p-4 text-2xl font-black text-slate-700 focus:ring-4 focus:ring-slate-100 outline-none transition-all" value={nuevaHora} onChange={e => setNuevaHora(e.target.value)}/>
                </div>
                <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 ml-2">MINS</label>
                    <input type="number" placeholder="0" className="w-full bg-slate-50 rounded-2xl p-4 text-2xl font-black text-slate-700 focus:ring-4 focus:ring-slate-100 outline-none transition-all" value={nuevoMinuto} onChange={e => setNuevoMinuto(e.target.value)}/>
                </div>
              </div>
              <button onClick={() => {registrarActividad(nuevaHora, nuevoMinuto); setNuevaHora(''); setNuevoMinuto('');}} className={`w-full text-white py-4 rounded-2xl font-bold uppercase tracking-widest text-xs shadow-lg active:scale-95 transition-all ${t.primaryBg} ${t.buttonHover}`}>Añadir Tiempo</button>
            </section>

            <section className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-50">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">Actividad Diaria</h3>
              <div className="grid grid-cols-7 gap-2">
                {[...Array(totalDiasMes)].map((_, i) => {
                  const dia = i + 1;
                  const tieneActividad = currentData.historial && currentData.historial[dia];
                  return (
                    <button 
                      key={dia} 
                      onClick={() => tieneActividad && window.confirm(`¿Borrar registro del día ${dia}?`) && eliminarDia(dia)}
                      className={`aspect-square rounded-xl text-[10px] font-bold transition-all ${tieneActividad ? `text-white shadow-md ${t.primaryBg}` : `bg-slate-50 text-slate-400 hover:bg-slate-100`}`}
                    >
                      {dia}
                    </button>
                  );
                })}
              </div>
            </section>
          </div>

          <div className="lg:col-span-8 space-y-8">
            <section className="bg-white p-8 rounded-[3rem] shadow-xl border border-slate-100 text-center">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="p-4 bg-slate-50 rounded-2xl transition-all hover:shadow-inner"><p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Total Horas</p><p className={temaActual === 'arcoiris' ? "text-2xl font-black bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent" : `text-2xl font-black ${t.primary} transition-colors`}>{horas}h {minutos}m</p></div>
                <div className="p-4 bg-slate-50 rounded-2xl transition-all hover:shadow-inner"><p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Cursos</p><p className={temaActual === 'arcoiris' ? "text-2xl font-black text-indigo-500" : `text-2xl font-black ${t.primary} transition-colors`}>{currentData.estudiantes.length}</p></div>
                <div className={`p-4 rounded-2xl text-white shadow-lg shadow-current/10 transition-colors ${t.primaryBg}`}><p className="text-[10px] font-bold opacity-80 uppercase mb-1">Progreso</p><p className="text-2xl font-black">{porcentaje.toFixed(0)}%</p></div>
                <button onClick={() => {if(window.confirm("¿Reiniciar todo el mes?")) updateCurrentMonth({historial:{}, estudiantes:[]})}} className="p-4 bg-red-50 text-red-400 rounded-2xl flex items-center justify-center hover:bg-red-100 transition-colors"><Trash2 size={24} /></button>
              </div>

              <button 
                onClick={enviarWhatsApp} 
                className="w-full bg-[#25D366] text-white py-5 px-8 rounded-2xl font-black uppercase tracking-widest text-sm shadow-lg hover:brightness-105 active:scale-95 transition-all flex items-center justify-center gap-3"
              >
                <Send size={20} className="fill-white" /> ENVIAR INFORME POR WHATSAPP
              </button>
            </section>

            <section className="bg-white p-8 rounded-[3rem] shadow-sm border border-slate-50">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">Cursos Bíblicos</h3>
                <button onClick={() => {setFormEstudiante({nombre:'', fecha:'', horaClase:'', leccion:'', notas:''}); setShowEditModal('nuevo')}} className={`text-white px-5 py-2 rounded-xl text-xs font-bold shadow-md hover:brightness-105 active:scale-95 flex items-center gap-2 transition-all ${t.primaryBg}`}><UserPlus size={14} /> Nuevo</button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentData.estudiantes.length > 0 ? (
                  currentData.estudiantes.map(est => (
                    <div key={est.id} onClick={() => {setFormEstudiante(est); setShowEditModal(est.id)}} className="p-5 bg-slate-50 rounded-[1.5rem] border border-transparent flex justify-between items-center cursor-pointer hover:border-slate-200 hover:bg-white hover:shadow-sm transition-all group">
                      <div>
                        <p className="font-bold text-slate-800 text-sm">{est.nombre}</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-1">
                          {est.fecha} {est.horaClase && `• ${formatTime12h(est.horaClase)}`}
                        </p>
                      </div>
                      <button onClick={(e) => {e.stopPropagation(); updateCurrentMonth({ estudiantes: currentData.estudiantes.filter(i => i.id !== est.id) })}} className="text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"><Trash2 size={16} /></button>
                    </div>
                  ))
                ) : (
                  <p className="col-span-full text-center py-8 text-slate-300 text-sm italic">No hay cursos registrados</p>
                )}
              </div>
            </section>
          </div>
        </div>
      </div>

      <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end gap-3">
        {showThemeSelector && (
            <div className="bg-white/95 backdrop-blur-md p-3 rounded-3xl shadow-2xl border border-slate-100 flex flex-col gap-3 max-h-[70vh] overflow-y-auto animate-in fade-in slide-in-from-bottom-4 zoom-in-95 scrollbar-none">
                {Object.keys(temas).map(key => (
                    <button 
                        key={key}
                        onClick={() => {setTemaActual(key); setShowThemeSelector(false)}}
                        className={`w-10 h-10 rounded-2xl border-2 transition-all hover:scale-110 active:scale-90 flex-shrink-0 ${temaActual === key ? 'border-slate-800' : 'border-transparent'}`}
                        style={{ background: key === 'arcoiris' ? 'linear-gradient(135deg, #ec4899, #8b5cf6, #3b82f6, #10b981)' : 
                                           temas[key].primaryBg.includes('pink') ? '#db2777' : 
                                           temas[key].primaryBg.includes('purple') ? '#9333ea' :
                                           temas[key].primaryBg.includes('blue') ? '#2563eb' :
                                           temas[key].primaryBg.includes('emerald') ? '#059669' : 
                                           temas[key].primaryBg.includes('amber') ? '#f59e0b' :
                                           temas[key].primaryBg.includes('red') ? '#dc2626' : '#ea580c'
                        }}
                        title={temas[key].name}
                    />
                ))}
            </div>
        )}
        <button 
            onClick={() => setShowThemeSelector(!showThemeSelector)}
            className={`p-4 rounded-2xl shadow-xl text-white transition-all hover:scale-110 active:scale-95 shadow-lg shadow-current/20 ${t.primaryBg}`}
        >
            <Palette size={24} />
        </button>
      </div>

      {showEditModal && (
        <div className="fixed inset-0 z-[110] bg-slate-900/40 backdrop-blur-md flex items-center justify-center p-6 animate-in fade-in">
          <div className="bg-white w-full max-w-md rounded-[2.5rem] p-8 shadow-2xl border border-slate-100 animate-in slide-in-from-bottom-8 zoom-in-95">
            <div className="flex justify-between items-center mb-6">
              <h4 className="text-xl font-bold text-slate-800">{showEditModal === 'nuevo' ? 'Nuevo Curso' : 'Editar Curso'}</h4>
              <button onClick={() => setShowEditModal(null)} className="text-slate-300 hover:text-slate-500 transition-colors"><X /></button>
            </div>
            <div className="space-y-4">
              <input type="text" placeholder="Nombre completo" className="w-full bg-slate-50 rounded-2xl p-4 text-sm focus:ring-4 focus:ring-slate-100 outline-none transition-all" value={formEstudiante.nombre} onChange={e => setFormEstudiante({...formEstudiante, nombre: e.target.value})}/>
              <div className="grid grid-cols-2 gap-2">
                <input type="text" placeholder="Día (ej: Lunes)" className="w-full bg-slate-50 rounded-2xl p-4 text-sm focus:ring-4 focus:ring-slate-100 outline-none transition-all" value={formEstudiante.fecha} onChange={e => setFormEstudiante({...formEstudiante, fecha: e.target.value})}/>
                
                <div className="relative flex items-center group/time">
                  <div className="absolute left-4 text-slate-400 group-focus-within/time:text-slate-600 transition-colors">
                    <Clock size={18} />
                  </div>
                  <input 
                    type="time" 
                    className="w-full bg-slate-50 rounded-2xl p-4 pl-12 text-sm focus:ring-4 focus:ring-slate-100 outline-none transition-all cursor-pointer" 
                    value={formEstudiante.horaClase} 
                    onChange={e => setFormEstudiante({...formEstudiante, horaClase: e.target.value})}
                  />
                </div>
              </div>
              <input type="text" placeholder="Capítulo / Lección" className="w-full bg-slate-50 rounded-2xl p-4 text-sm focus:ring-4 focus:ring-slate-100 outline-none transition-all" value={formEstudiante.leccion} onChange={e => setFormEstudiante({...formEstudiante, leccion: e.target.value})}/>
              <textarea placeholder="Observaciones..." rows="2" className="w-full bg-slate-50 rounded-2xl p-4 text-sm focus:ring-4 focus:ring-slate-100 outline-none resize-none transition-all" value={formEstudiante.notas} onChange={e => setFormEstudiante({...formEstudiante, notas: e.target.value})}/>
              <button onClick={() => {
                if(formEstudiante.nombre) {
                  const nuevos = showEditModal === 'nuevo' ? [...currentData.estudiantes, { ...formEstudiante, id: Date.now() }] : currentData.estudiantes.map(e => e.id === showEditModal ? formEstudiante : e);
                  updateCurrentMonth({ estudiantes: nuevos });
                  setShowEditModal(null);
                }
              }} className={`w-full text-white py-4 rounded-2xl font-bold uppercase tracking-widest text-xs shadow-lg shadow-current/20 active:scale-95 transition-all ${t.primaryBg} ${t.buttonHover}`}>Guardar Cambios</button>
            </div>
          </div>
        </div>
      )}

      {/* SVG Auxiliar necesario para el degradado en iconos vectoriales del tema Arcoíris */}
      <svg width="0" height="0" className="absolute pointer-events-none">
        <defs>
          <linearGradient id="rainbow-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ec4899" />
            <stop offset="33%" stopColor="#8b5cf6" />
            <stop offset="66%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#10b981" />
          </linearGradient>
        </defs>
      </svg>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;800&family=Inter:wght@400;500;700&display=swap');
        .font-sans { font-family: 'Outfit', 'Inter', sans-serif; }
        
        input[type="time"]::-webkit-calendar-picker-indicator {
          cursor: pointer;
          filter: invert(0.5);
          opacity: 0.6;
          transition: opacity 0.2s;
        }
        input[type="time"]::-webkit-calendar-picker-indicator:hover {
          opacity: 1;
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

        @keyframes gradientBG {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient-xy {
          background-size: 400% 400%;
          animation: gradientBG 12s ease infinite;
        }
      `}</style>
    </div>
  );
};

export default App;
