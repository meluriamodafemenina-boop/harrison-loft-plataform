import React, { useEffect, useMemo, useState } from 'react'
import { createRoot } from 'react-dom/client'
import {
  Brain, BookOpen, Eye, Target, Home, ChartNoAxesColumnIncreasing,
  FileText, UserRound, LogOut, ShieldCheck, Headphones, MonitorSmartphone,
  ArrowRight, Play, ChevronDown, Menu, X, CheckCircle2,
  Languages, Download, Printer, Clock3, AlertTriangle
} from 'lucide-react'
import './styles.css'

const ASSETS = '/images/'
const translations = {
  en: {
    welcome: 'Welcome', department: 'Medical & Psychological Department',
    platform: 'COGNITIVE ASSESSMENT PLATFORM',
    intro: 'Explore our cognitive activities for memory, attention, reading and visual perception.',
    start: 'Start full assessment', home: 'Home', my: 'My Assessments', reports: 'Reports',
    profile: 'Profile', logout: 'Log out', memory: 'Memory', attention: 'Attention',
    reading: 'Reading', visual: 'Visual perception', memoryDesc: 'Complex recall, ordering and working-memory challenges.',
    attentionDesc: 'Selective attention, interference and rule-switching challenges.',
    readingDesc: 'Advanced comprehension, inference and argument analysis.',
    visualDesc: 'Complex patterns, spatial rotation and visual reasoning.',
    secure: 'Secure & Confidential', secureDesc: 'Your data stays in this browser',
    professional: 'Integrated report', professionalDesc: 'One overall result after all 20 questions',
    devices: 'Multi-Device Ready', devicesDesc: 'Responsive on any screen',
    support: 'Guidance', supportDesc: 'Practice activities, not diagnostic tests',
    choose: 'Cognitive assessment modules', recent: 'Recent activity', noResults: 'No completed assessments yet.',
    begin: 'Begin full assessment', back: 'Back to dashboard', question: 'Question', next: 'Next',
    finish: 'Finish assessment', retry: 'Start again', result: 'Overall result',
    score: 'Overall score', duration: 'Total time', completed: 'Completed', correct: 'Correct answers',
    reportTitle: 'Integrated report', print: 'Print report', download: 'Download report',
    profileTitle: 'Profile', name: 'Display name', save: 'Save profile',
    profileSaved: 'Profile saved on this device.', language: 'Interface language',
    reportEmpty: 'Complete all 20 questions to generate the integrated report.',
    disclaimer: 'These activities are educational exercises and are not standardized or clinically validated diagnostic tests. Results do not establish a diagnosis and should be interpreted by a qualified professional.',
    footer: '© 2026 Harrison & Loft. All rights reserved.',
    navOpen: 'Open menu', navClose: 'Close menu', languageEnglish: 'English', languageSpanish: 'Español',
    section: 'Section', of: 'of', timeLeft: 'Time remaining', timeout: 'Time expired. This question was recorded as unanswered.',
    instructions: 'Read each instruction carefully. You have 40 seconds for each question. When time runs out, the system advances automatically.',
    reportNote: 'This integrated summary describes performance on these practice exercises only. It is not a clinical diagnosis.',
    unanswered: 'Unanswered', totalQuestions: 'Questions', analysis: 'Overall performance analysis',
    strengths: 'Observed performance', suggestions: 'General suggestions'
  },
  es: {
    welcome: 'Bienvenido/a', department: 'Departamento Médico y Psicológico',
    platform: 'PLATAFORMA DE EVALUACIÓN COGNITIVA',
    intro: 'Explora nuestras actividades cognitivas de memoria, atención, lectura y percepción visual.',
    start: 'Comenzar evaluación completa', home: 'Inicio', my: 'Mis evaluaciones', reports: 'Informes',
    profile: 'Perfil', logout: 'Cerrar sesión', memory: 'Memoria', attention: 'Atención',
    reading: 'Lectura', visual: 'Percepción visual', memoryDesc: 'Retención compleja, ordenamiento y memoria de trabajo.',
    attentionDesc: 'Atención selectiva, interferencia y cambio de reglas.',
    readingDesc: 'Comprensión avanzada, inferencias y análisis de argumentos.',
    visualDesc: 'Patrones complejos, rotación espacial y razonamiento visual.',
    secure: 'Seguro y confidencial', secureDesc: 'Tus datos permanecen en este navegador',
    professional: 'Informe integrado', professionalDesc: 'Un único resultado global al completar las 20 preguntas',
    devices: 'Multidispositivo', devicesDesc: 'Adaptable a cualquier pantalla',
    support: 'Orientación', supportDesc: 'Actividades de práctica, no pruebas diagnósticas',
    choose: 'Áreas de evaluación cognitiva', recent: 'Actividad reciente', noResults: 'Aún no has completado evaluaciones.',
    begin: 'Comenzar evaluación completa', back: 'Volver al inicio', question: 'Pregunta', next: 'Siguiente',
    finish: 'Finalizar evaluación', retry: 'Comenzar de nuevo', result: 'Resultado global',
    score: 'Puntuación global', duration: 'Tiempo total', completed: 'Completada', correct: 'Respuestas correctas',
    reportTitle: 'Informe integrado', print: 'Imprimir informe', download: 'Descargar informe',
    profileTitle: 'Perfil', name: 'Nombre para mostrar', save: 'Guardar perfil',
    profileSaved: 'Perfil guardado en este dispositivo.', language: 'Idioma de la interfaz',
    reportEmpty: 'Completa las 20 preguntas para generar el informe integrado.',
    disclaimer: 'Estas actividades son ejercicios educativos y no constituyen pruebas diagnósticas estandarizadas ni clínicamente validadas. Los resultados no establecen un diagnóstico y deben ser interpretados por un profesional cualificado.',
    footer: '© 2026 Harrison & Loft. Todos los derechos reservados.',
    navOpen: 'Abrir menú', navClose: 'Cerrar menú', languageEnglish: 'English', languageSpanish: 'Español',
    section: 'Sección', of: 'de', timeLeft: 'Tiempo restante', timeout: 'Se agotó el tiempo. La pregunta quedó registrada como no respondida.',
    instructions: 'Lee cuidadosamente cada instrucción. Dispones de 40 segundos por pregunta. Al terminar el tiempo, el sistema avanzará automáticamente.',
    reportNote: 'Este resumen integrado describe únicamente el desempeño en estos ejercicios de práctica. No constituye un diagnóstico clínico.',
    unanswered: 'Sin respuesta', totalQuestions: 'Preguntas', analysis: 'Análisis general del desempeño',
    strengths: 'Desempeño observado', suggestions: 'Sugerencias generales'
  }
}

const activities = [
  { id: 'memory', image: 'memory-assessment.png', icon: Brain, key: 'memory', desc: 'memoryDesc' },
  { id: 'attention', image: 'attention-assessment.png', icon: Target, key: 'attention', desc: 'attentionDesc' },
  { id: 'reading', image: 'reading-assessment.jpg', icon: BookOpen, key: 'reading', desc: 'readingDesc' },
  { id: 'visual', image: 'visual-perception.png', icon: Eye, key: 'visual', desc: 'visualDesc' }
]

const assessment = [
  // MEMORIA (5)
  { area:'memory', type:'study', prompt:'Observa y memoriza los elementos en el orden exacto. Después responde la pregunta.', stimulus:['BRÚJULA','MÁRMOL','JAZMÍN','TREN','COBRE','ISLA','RELOJ'], question:'¿Qué elemento ocupaba la quinta posición?', options:['Jazmín','Cobre','Isla','Tren'], answer:'Cobre' },
  { area:'memory', type:'study', prompt:'Memoriza la secuencia completa, incluidos los números y las letras.', stimulus:['K – 4','M – 9','R – 2','B – 7','T – 5','P – 1'], question:'¿Qué pareja aparecía inmediatamente después de R – 2?', options:['B – 7','T – 5','M – 9','P – 1'], answer:'B – 7' },
  { area:'memory', type:'study', prompt:'Estudia estos datos durante unos segundos. Presta atención a cada asociación.', stimulus:['Lina: 28 años · Quito','Mateo: 34 años · Lima','Sara: 31 años · Cali','Nicolás: 26 años · Tunja'], question:'¿Qué ciudad estaba asociada con la persona de 31 años?', options:['Quito','Lima','Cali','Tunja'], answer:'Cali' },
  { area:'memory', type:'study', prompt:'Memoriza la secuencia de figuras y su orientación.', stimulus:['▲ arriba','◆ derecha','● abajo','■ izquierda','★ arriba'], question:'¿Qué figura estaba orientada hacia la izquierda?', options:['Círculo','Cuadrado','Rombo','Estrella'], answer:'Cuadrado' },
  { area:'memory', type:'study', prompt:'Lee y retén los cuatro pares. No intentes responder hasta haberlos revisado.', stimulus:['Archivo – 16','Contrato – 42','Informe – 37','Factura – 25'], question:'¿Qué número correspondía a «Informe»?', options:['16','42','37','25'], answer:'37' },

  // ATENCIÓN (5)
  { area:'attention', prompt:'En la cadena siguiente, cuenta únicamente las letras «R» que estén inmediatamente precedidas por «A» y seguidas por «T».', stimulus:'R A R T A R T A R T R A T A R T A R T', question:'¿Cuántas veces aparece exactamente el patrón A–R–T?', options:['3','4','5','6'], answer:'5' },
  { area:'attention', prompt:'Aplica esta regla: selecciona los números pares mayores que 30, pero excluye los que terminan en 6.', stimulus:'18 · 42 · 36 · 54 · 26 · 48 · 32 · 66 · 58 · 44', question:'¿Cuántos números cumplen simultáneamente las tres condiciones?', options:['4','5','6','7'], answer:'6' },
  { area:'attention', prompt:'Busca las parejas idénticas. Ignora las diferencias de espacio; una sola letra distinta significa que no son iguales.', stimulus:'1) M7Q–M7Q   2) B3D–B8D   3) K2P–K2P   4) R5T–R5I   5) C9L–C9L   6) H4N–H4M', question:'¿Cuántas parejas son exactamente idénticas?', options:['2','3','4','5'], answer:'3' },
  { area:'attention', prompt:'La regla cambia en cada paso: +3, luego ×2, luego +3, luego ×2. Identifica el valor que rompe la secuencia.', stimulus:'4 → 7 → 14 → 17 → 34 → 37 → 72', question:'¿Qué número debería aparecer en el último lugar?', options:['72','74','77','80'], answer:'74' },
  { area:'attention', prompt:'Lee la matriz por filas. Cuenta solo las apariciones de «◇» que tengan un «●» inmediatamente a su derecha.', stimulus:'◇ ● △ ◇ ■ ● ◇ ● □\n● ◇ ● △ ◇ ● ■ ◇ ●', question:'¿Cuántas apariciones de ◇ cumplen la condición?', options:['2','3','4','5'], answer:'5' },

  // LECTURA (5)
  { area:'reading', passage:'En una investigación urbana se observó que la instalación de zonas verdes coincidió con una reducción de la temperatura superficial en varios barrios. Sin embargo, los autores advirtieron que la comparación no demostraba por sí sola una relación causal: los sectores intervenidos también recibieron mejoras en el pavimento y cambios en el tránsito. Para aislar el efecto de la vegetación, recomendaron estudiar durante varios años barrios comparables, medir variables ambientales antes y después de la intervención y documentar cualquier cambio simultáneo. El informe concluyó que los resultados eran prometedores, aunque todavía insuficientes para atribuir toda la variación térmica a los árboles.', prompt:'Lee el texto y distingue los resultados observados de las conclusiones que los datos permiten sostener.', question:'¿Cuál es la principal cautela metodológica de los autores?', options:['Que las zonas verdes nunca modifican la temperatura.','Que otras intervenciones simultáneas impiden atribuir el cambio únicamente a la vegetación.','Que la temperatura superficial no puede medirse durante varios años.','Que todos los barrios presentan condiciones idénticas.'], answer:'Que otras intervenciones simultáneas impiden atribuir el cambio únicamente a la vegetación.' },
  { area:'reading', passage:'En una investigación urbana se observó que la instalación de zonas verdes coincidió con una reducción de la temperatura superficial en varios barrios. Sin embargo, los autores advirtieron que la comparación no demostraba por sí sola una relación causal: los sectores intervenidos también recibieron mejoras en el pavimento y cambios en el tránsito. Para aislar el efecto de la vegetación, recomendaron estudiar durante varios años barrios comparables, medir variables ambientales antes y después de la intervención y documentar cualquier cambio simultáneo. El informe concluyó que los resultados eran prometedores, aunque todavía insuficientes para atribuir toda la variación térmica a los árboles.', prompt:'Interpreta la recomendación de comparar barrios semejantes y medir antes y después.', question:'¿Qué propósito tendría principalmente ese diseño de investigación?', options:['Aumentar el número de árboles sin medir sus efectos.','Reducir la influencia de factores externos y fortalecer la inferencia causal.','Evitar que los investigadores registren cambios del tránsito.','Sustituir las mediciones ambientales por opiniones vecinales.'], answer:'Reducir la influencia de factores externos y fortalecer la inferencia causal.' },
  { area:'reading', passage:'Una empresa implantó una jornada laboral flexible y registró un aumento de productividad durante el primer trimestre. La dirección atribuyó la mejora al nuevo horario. No obstante, durante el mismo periodo se incorporó un programa de capacitación, se renovaron equipos y disminuyó el volumen de pedidos urgentes. Aunque la productividad aumentó, el informe interno no comparó equipos equivalentes ni controló esas variables. Por ello, una evaluación independiente señaló que el resultado era compatible con un efecto positivo de la flexibilidad, pero también con varias explicaciones alternativas.', prompt:'Evalúa la fuerza del argumento presentado por la dirección.', question:'¿Qué conclusión está mejor respaldada por la información?', options:['La flexibilidad fue la única causa del aumento.','La capacitación no tuvo ningún efecto.','La mejora ocurrió, pero no se puede determinar qué factor la produjo.','La productividad habría disminuido sin renovar los equipos.'], answer:'La mejora ocurrió, pero no se puede determinar qué factor la produjo.' },
  { area:'reading', passage:'Una empresa implantó una jornada laboral flexible y registró un aumento de productividad durante el primer trimestre. La dirección atribuyó la mejora al nuevo horario. No obstante, durante el mismo periodo se incorporó un programa de capacitación, se renovaron equipos y disminuyó el volumen de pedidos urgentes. Aunque la productividad aumentó, el informe interno no comparó equipos equivalentes ni controló esas variables. Por ello, una evaluación independiente señaló que el resultado era compatible con un efecto positivo de la flexibilidad, pero también con varias explicaciones alternativas.', prompt:'Identifica el supuesto implícito que debilita la explicación inicial de la dirección.', question:'¿Qué supuesto realizó la dirección sin demostrarlo?', options:['Que todos los empleados prefieren trabajar de noche.','Que los demás cambios del trimestre no influyeron en la productividad.','Que los equipos renovados eran menos eficientes.','Que el volumen de pedidos urgentes aumentó.'], answer:'Que los demás cambios del trimestre no influyeron en la productividad.' },
  { area:'reading', passage:'Los archivos históricos no son espejos neutrales del pasado. Quienes los producen seleccionan qué registrar, qué conservar y cómo clasificarlo. Por eso, la ausencia de un dato no prueba necesariamente que un hecho no ocurriera; puede reflejar prioridades administrativas, pérdida documental o exclusión de ciertos grupos. La investigación histórica rigurosa contrasta fuentes de distinto origen y explicita los límites de cada una, en lugar de convertir el silencio de un archivo en una certeza.', prompt:'Analiza la tesis y la implicación lógica del texto.', question:'¿Qué inferencia sería metodológicamente más prudente ante la ausencia de un registro?', options:['Afirmar que el acontecimiento nunca sucedió.','Considerar posibles sesgos o pérdidas y buscar fuentes independientes.','Suponer que todos los archivos registran los mismos hechos.','Descartar cualquier documento producido por instituciones.'], answer:'Considerar posibles sesgos o pérdidas y buscar fuentes independientes.' },

  // PERCEPCIÓN VISUAL (5)
  { area:'visual', visual:['▲','○','◆','○','◆','▲','◆','▲','?'], matrix:true, prompt:'Analiza la matriz completa. En cada fila, las figuras se desplazan una posición hacia la izquierda respecto de la fila anterior; el mismo patrón se conserva en las columnas.', question:'¿Qué figura debe ocupar la casilla vacía para mantener la transformación?', options:['▲','○','◆','■'], answer:'○' },
  { area:'visual', visual:['↗','↘','↙','↖','↗','↘','?'], prompt:'Identifica la rotación sistemática de la flecha. Cada paso representa un giro de 90 grados en sentido horario.', question:'¿Qué orientación completa la secuencia?', options:['↗','↘','↙','↖'], answer:'↙' },
  { area:'visual', visual:['○','●','○','●','○','●','○','●','○'], prompt:'La matriz sigue una alternancia estricta entre círculo vacío y círculo relleno, tanto en filas como en columnas.', question:'¿Qué elemento debe ocupar el centro de la matriz?', options:['○','●','□','■'], answer:'○', matrix:true },
  { area:'visual', visual:['1','4','10','22','46','94','?'], prompt:'Identifica la transformación que se aplica de manera constante entre términos consecutivos. No se trata de una suma fija.', question:'¿Qué número completa la secuencia?', options:['186','188','190','192'], answer:'190' },
  { area:'visual', visual:['┌──┐','│  │','└──┘','↻ 90°'], prompt:'Imagina que la figura se gira 90 grados en sentido horario, sin reflejarla ni cambiar su tamaño.', question:'¿Qué transformación describe correctamente el giro?', options:['La esquina superior izquierda pasa a la superior derecha.','La esquina superior izquierda pasa a la inferior derecha.','La figura se invierte como en un espejo.','La figura conserva exactamente la misma orientación.'], answer:'La esquina superior izquierda pasa a la superior derecha.' }
]

const sectionNames = { memory:'Memoria', attention:'Atención', reading:'Lectura', visual:'Percepción visual' }

function App() {
  const [lang, setLang] = useState(localStorage.getItem('hl-lang') || 'es')
  const [page, setPage] = useState('home')
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState({})
  const [remaining, setRemaining] = useState(40)
  const [startedAt, setStartedAt] = useState(null)
  const [results, setResults] = useState(() => {
    try { return JSON.parse(localStorage.getItem('hl-results') || '[]').filter(item => item.total === 20) }
    catch { return [] }
  })
  const [profile, setProfile] = useState(() => JSON.parse(localStorage.getItem('hl-profile') || '{"name":"Maria"}'))
  const [nameInput, setNameInput] = useState(profile.name || 'Maria')
  const [mobileOpen, setMobileOpen] = useState(false)
  const [lastResult, setLastResult] = useState(null)
  const [timedOut, setTimedOut] = useState(false)
  const t = translations[lang]
  const current = assessment[step]
  const currentAreaIndex = current ? ['memory','attention','reading','visual'].indexOf(current.area) : 0
  const currentSectionQuestion = current ? assessment.slice(0, step + 1).filter(q => q.area === current.area).length : 0

  useEffect(() => { localStorage.setItem('hl-lang', lang); document.documentElement.lang = lang }, [lang])
  useEffect(() => { localStorage.setItem('hl-results', JSON.stringify(results)) }, [results])
  useEffect(() => { localStorage.setItem('hl-profile', JSON.stringify(profile)) }, [profile])

  function beginAssessment() {
    setStep(0); setAnswers({}); setRemaining(40); setStartedAt(Date.now()); setTimedOut(false)
    setPage('test'); setMobileOpen(false)
  }
  function advance(expired = false) {
    setAnswers(prev => ({ ...prev, [step]: expired ? null : prev[step] ?? null }))
    setTimedOut(expired)
    if (step < assessment.length - 1) {
      setStep(s => s + 1); setRemaining(40); setTimedOut(false)
    } else {
      finishAssessment(expired)
    }
  }
  function finishAssessment(lastExpired = false) {
    const finalAnswers = { ...answers, [step]: lastExpired ? null : answers[step] ?? null }
    const correct = assessment.reduce((sum, q, i) => sum + (finalAnswers[i] === q.answer ? 1 : 0), 0)
    const unanswered = assessment.reduce((sum, q, i) => sum + (finalAnswers[i] == null ? 1 : 0), 0)
    const total = assessment.length
    const percent = Math.round(correct / total * 100)
    const duration = Math.max(1, Math.round((Date.now() - startedAt) / 1000))
    const performance = percent >= 85
      ? 'El desempeño global en estos ejercicios fue alto: se resolvió correctamente una proporción amplia de los retos planteados.'
      : percent >= 65
      ? 'El desempeño global fue intermedio: se resolvió correctamente más de la mitad de los ejercicios, aunque algunos retos requirieron mayor precisión.'
      : percent >= 40
      ? 'El desempeño global fue variable: hubo aciertos y dificultades en distintos tipos de tareas. Conviene revisar las instrucciones y practicar estrategias de resolución.'
      : 'El desempeño global en esta sesión fue bajo en relación con los ejercicios propuestos. Puede ser útil repetir actividades de práctica en un entorno tranquilo.'
    const suggestions = unanswered
      ? `Se registraron ${unanswered} preguntas sin respuesta, incluidas las que alcanzaron el límite de tiempo.`
      : 'Todas las preguntas recibieron una respuesta dentro del tiempo disponible.'
    const item = {
      id: `${Date.now()}`, score: correct, total, percent, unanswered,
      date: new Date().toLocaleString('es-CO'),
      duration, performance, suggestions
    }
    setResults(prev => [item, ...prev].slice(0, 30))
    setLastResult(item); setPage('result'); setTimedOut(false)
  }
  function setAnswer(value) { setAnswers(prev => ({ ...prev, [step]: value })) }
  useEffect(() => {
    if (page !== 'test') return
    if (remaining <= 0) { advance(true); return }
    const timer = window.setTimeout(() => setRemaining(value => value - 1), 1000)
    return () => window.clearTimeout(timer)
  }, [page, remaining, step])

  function navTo(target) { setPage(target); setMobileOpen(false) }
  const navItems = [
    [Home, 'home', t.home], [ChartNoAxesColumnIncreasing, 'assessments', t.my],
    [FileText, 'reports', t.reports], [UserRound, 'profile', t.profile]
  ]
  const currentAnswer = answers[step] ?? ''

  function renderQuestion() {
    if (!current) return null
    const q = current
    const sectionNumber = currentAreaIndex + 1
    return <section className="test-panel">
      <div className="test-top">
        <span>{sectionNames[q.area]} · {t.section} {sectionNumber} {t.of} 4</span>
        <span>{t.question} {currentSectionQuestion} {t.of} 5</span>
      </div>
      <div className="global-progress"><span style={{width:`${(step+1)/20*100}%`}}/></div>
      <div className="question-meta">
        <span>Pregunta {step + 1} de 20</span>
        <span className={`timer ${remaining <= 10 ? 'urgent' : ''}`}><Clock3 size={17}/>{String(remaining).padStart(2,'0')} s</span>
      </div>
      <p className="question-instructions">{q.prompt}</p>
      {q.stimulus && <div className="stimulus-panel"><div className="stimulus-label">{q.area === 'memory' ? 'Material para memorizar' : 'Secuencia para analizar'}</div>{Array.isArray(q.stimulus) ? <div className="stimulus-grid">{q.stimulus.map((x,i)=><span key={i}>{x}</span>)}</div> : <div className="stimulus-text">{q.stimulus}</div>}</div>}
      {q.visual && <div className={`visual-stimulus ${q.matrix ? 'matrix-stimulus' : ''}`}>
        {q.visual.map((x,i)=><span key={i}>{x}</span>)}
      </div>}
      {q.passage && <article className="reading-passage"><span>Texto de análisis</span><p>{q.passage}</p></article>}
      <h2>{q.question}</h2>
      <div className="answer-grid">
        {q.options.map((option,i)=><button key={i} className={`answer-option ${currentAnswer === option ? 'selected' : ''}`} onClick={()=>setAnswer(option)}>{String.fromCharCode(65+i)}. {option}</button>)}
      </div>
      <div className="test-actions">
        <span className="answer-hint">Elige una respuesta para continuar.</span>
        <button className="primary-btn" disabled={!currentAnswer} onClick={()=>advance(false)}>
          {step === 19 ? 'Finalizar y ver análisis' : 'Siguiente pregunta'} <ArrowRight size={17}/>
        </button>
      </div>
      <p className="test-disclaimer"><ShieldCheck size={15}/> Ejercicio de práctica cognitiva; no constituye una prueba diagnóstica validada.</p>
    </section>
  }

  return <div className="app-shell">
    <aside className={`sidebar ${mobileOpen ? 'open' : ''}`}>
      <div className="brand">
        <img src={ASSETS + 'harrison-loft-logo.png'} alt="Logotipo de Harrison & Loft"/>
        <h1>HARRISON & LOFT</h1><p>{t.department}</p>
      </div>
      <nav>{navItems.map(([Icon,id,label])=><button key={id} className={page===id?'active':''} onClick={()=>navTo(id)}><Icon size={20}/>{label}</button>)}
        <button onClick={()=>navTo('home')}><LogOut size={20}/>{t.logout}</button>
      </nav>
      <div className="sidebar-tagline">Better Assessment.<br/>A Healthier Tomorrow.</div>
    </aside>
    {mobileOpen && <button className="scrim" aria-label={t.navClose} onClick={()=>setMobileOpen(false)}/>}
    <main className="main">
      <header className="topbar">
        <button className="mobile-menu" onClick={()=>setMobileOpen(!mobileOpen)} aria-label={t.navOpen}>{mobileOpen?<X/>:<Menu/>}</button>
        <div className="top-spacer"/>
        <div className="language-switch"><Languages size={17}/><button className={lang==='en'?'chosen':''} onClick={()=>setLang('en')}>EN</button><span>/</span><button className={lang==='es'?'chosen':''} onClick={()=>setLang('es')}>ES</button></div>
        <div className="user-chip"><span className="avatar">{(profile.name||'M').slice(0,1).toUpperCase()}</span><span>{t.welcome}, {profile.name}</span><ChevronDown size={16}/></div>
      </header>

      {page==='home' && <>
        <section className="hero">
          <div className="hero-copy"><h2>Harrison & Loft</h2><h3>{t.department}</h3><p className="eyebrow">{t.platform}</p><p>{t.intro}</p>
            <button className="primary-btn" onClick={beginAssessment}><Play size={16} fill="currentColor"/>{t.start}</button>
          </div>
          <div className="hero-brain"><img src={ASSETS+'brain-banner.png'} alt="Ilustración de cerebro"/></div>
          <div className="hero-doctor"><img src={ASSETS+'doctor-banner.png'} alt="Profesional de salud"/></div>
        </section>
        <section className="section-heading"><div><span className="eyebrow">HARRISON & LOFT</span><h2>{t.choose}</h2></div><button className="text-btn" onClick={()=>navTo('assessments')}>{t.my} <ArrowRight size={16}/></button></section>
        <section className="activity-grid">{activities.map(item=><ActivityCard key={item.id} item={item} t={t} onClick={beginAssessment}/>)}</section>
        <section className="feature-strip"><Feature Icon={ShieldCheck} title={t.secure} desc={t.secureDesc}/><Feature Icon={ChartNoAxesColumnIncreasing} title={t.professional} desc={t.professionalDesc}/><Feature Icon={MonitorSmartphone} title={t.devices} desc={t.devicesDesc}/><Feature Icon={Headphones} title={t.support} desc={t.supportDesc}/></section>
        <section className="disclaimer"><ShieldCheck size={17}/><p>{t.disclaimer}</p></section>
      </>}

      {page==='assessments' && <div className="page-content"><PageHeading eyebrow="HARRISON & LOFT" title={t.choose}/><p className="assessment-intro">{t.instructions}</p><section className="activity-grid">{activities.map(item=><ActivityCard key={item.id} item={item} t={t} onClick={beginAssessment}/>)}</section><button className="primary-btn full-assessment-btn" onClick={beginAssessment}>{t.begin} <ArrowRight size={17}/></button></div>}
      {page==='test' && <div className="page-content"><div className="assessment-instructions"><AlertTriangle size={18}/><p>{translations.es.instructions}</p></div>{renderQuestion()}</div>}
      {page==='result' && <div className="page-content"><PageHeading eyebrow="HARRISON & LOFT · INFORME INTEGRADO" title={t.result}/>
        <div className="result-card integrated-result">
          <div className="result-icon"><CheckCircle2 size={34}/></div>
          <h2>Evaluación cognitiva integral completada</h2>
          <p className="result-subtitle">Resultado conjunto de las cuatro áreas y las 20 preguntas.</p>
          <div className="score-ring"><strong>{lastResult?.percent ?? 0}%</strong><span>{t.score}</span></div>
          <div className="result-stats">
            <div><strong>{lastResult?.score ?? 0}/20</strong><span>Respuestas correctas</span></div>
            <div><strong>{lastResult?.duration ?? 0}s</strong><span>{t.duration}</span></div>
            <div><strong>{lastResult?.unanswered ?? 0}</strong><span>{t.unanswered}</span></div>
          </div>
          <div className="integrated-analysis"><h3>{t.analysis}</h3><p>{lastResult?.performance}</p><h3>{t.strengths}</h3><p>{lastResult?.suggestions}</p></div>
          <p className="result-note">{t.reportNote}</p>
          <div className="result-actions"><button className="outline-btn" onClick={()=>window.print()}><Printer size={16}/>{t.print}</button><button className="primary-btn" onClick={()=>navTo('reports')}>Ver informes <ArrowRight size={17}/></button></div>
        </div><div className="disclaimer">{t.disclaimer}</div>
      </div>}
      {page==='reports' && <div className="page-content"><PageHeading eyebrow="REPORTS" title={t.reportTitle}/>{results.length?<><div className="report-toolbar"><button className="outline-btn" onClick={()=>window.print()}><Printer size={16}/>{t.print}</button><button className="outline-btn" onClick={()=>{const blob=new Blob([JSON.stringify(results,null,2)],{type:'application/json'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='harrison-loft-informe-integrado.json';a.click();URL.revokeObjectURL(a.href)}}><Download size={16}/>{t.download}</button></div><ResultsTable results={results} lang={lang} t={t}/></>:<div className="empty-state"><FileText size={34}/><p>{t.reportEmpty}</p></div>}</div>}
      {page==='profile' && <div className="page-content"><PageHeading eyebrow="ACCOUNT" title={t.profileTitle}/><div className="profile-card"><div className="profile-avatar">{(profile.name||'M').slice(0,1).toUpperCase()}</div><label>{t.name}<input value={nameInput} onChange={e=>setNameInput(e.target.value)} maxLength={40}/></label><label>{t.language}<select value={lang} onChange={e=>setLang(e.target.value)}><option value="en">English</option><option value="es">Español</option></select></label><button className="primary-btn" onClick={()=>setProfile({name:nameInput.trim()||'Maria'})}>{t.save}</button><p className="saved-note">{t.profileSaved}</p></div></div>}
      <footer>{t.footer}<span>Privacy&nbsp;&nbsp; Terms&nbsp;&nbsp; Contact</span></footer>
    </main>
  </div>
}

function ActivityCard({item,t,onClick}) {
  return <button className="activity-card" onClick={onClick}><div className="card-image"><img src={ASSETS+item.image} alt=""/></div><div className="card-copy"><h3>{t[item.key]}</h3><p>{t[item.desc]}</p><span className="circle-arrow"><ArrowRight size={18}/></span></div></button>
}
function Feature({Icon,title,desc}) { return <div className="feature"><Icon size={28}/><div><strong>{title}</strong><span>{desc}</span></div></div> }
function PageHeading({eyebrow,title}) { return <div className="page-heading"><span className="eyebrow">{eyebrow}</span><h1>{title}</h1></div> }
function ResultsTable({results,t}) {
  return <div className="table-wrap"><table><thead><tr><th>{t.completed}</th><th>Evaluación</th><th>{t.score}</th><th>{t.duration}</th></tr></thead><tbody>{results.map(r=><tr key={r.id}><td>{r.date}</td><td>Evaluación cognitiva integral</td><td>{r.score}/{r.total} ({r.percent}%)</td><td>{r.duration}s</td></tr>)}</tbody></table></div>
}
createRoot(document.getElementById('root')).render(<App />)
