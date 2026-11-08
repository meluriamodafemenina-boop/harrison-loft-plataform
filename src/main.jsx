import React, { useEffect, useMemo, useState } from 'react'
import { createRoot } from 'react-dom/client'
import {
  Activity, Brain, BookOpen, Eye, Target, Home, ChartNoAxesColumnIncreasing,
  FileText, UserRound, LogOut, ShieldCheck, Headphones, MonitorSmartphone,
  ArrowRight, Play, ChevronDown, Menu, X, Clock3, CheckCircle2, RotateCcw,
  Languages, Download, Printer, Sparkles
} from 'lucide-react'
import './styles.css'

const ASSETS = '/images/'
const translations = {
  en: {
    welcome: 'Welcome', department: 'Medical & Psychological Department',
    platform: 'COGNITIVE ASSESSMENT PLATFORM',
    intro: 'Explore our cognitive activities designed to practice memory, attention, reading and visual perception.',
    start: 'Start Assessment', home: 'Home', my: 'My Assessments', reports: 'Reports',
    profile: 'Profile', logout: 'Log out', memory: 'Memory Assessment',
    attention: 'Attention Assessment', reading: 'Reading Assessment',
    visual: 'Visual Perception', memoryDesc: 'Practice remembering words and sequences.',
    attentionDesc: 'Practice focus and concentration.',
    readingDesc: 'Read a short passage and answer questions.',
    visualDesc: 'Recognize shapes and visual patterns.',
    secure: 'Secure & Confidential', secureDesc: 'Your data stays in this browser',
    professional: 'Progress Overview', professionalDesc: 'Review your activity history',
    devices: 'Multi-Device Ready', devicesDesc: 'Responsive on any screen',
    support: 'Guidance', supportDesc: 'Activities for practice and learning',
    choose: 'Choose an assessment', recent: 'Recent activity', noResults: 'No assessments completed yet.',
    begin: 'Begin', back: 'Back to dashboard', question: 'Question', next: 'Next',
    finish: 'Finish assessment', retry: 'Try another activity', result: 'Your result',
    score: 'Score', duration: 'Time', completed: 'Completed', correct: 'Correct answers',
    reportTitle: 'Assessment report', print: 'Print report', download: 'Download report',
    profileTitle: 'Profile', name: 'Display name', save: 'Save profile',
    profileSaved: 'Profile saved on this device.', language: 'Language',
    memoryPrompt: 'Study these words. You will be asked to remember them.',
    remember: 'Remember these words', continue: 'I am ready',
    recallPrompt: 'Which of these words appeared in the list?',
    attentionPrompt: 'Choose the target symbol from the options below.',
    target: 'Target symbol', readingText: 'Reading passage',
    readingPassage: 'Regular reading is one way to keep the mind active. When we read carefully, we connect ideas, notice details, and build understanding. Taking a moment to reflect on a passage can help us remember its main message.',
    visualPrompt: 'Which shape matches the sample?',
    sample: 'Sample shape', chooseShape: 'Choose the matching shape',
    reportEmpty: 'Complete an activity to see a report here.',
    disclaimer: 'These activities are for practice and educational purposes only. They are not diagnostic tests and do not replace an assessment by a qualified professional.',
    footer: '© 2026 Harrison & Loft. All rights reserved.',
    navOpen: 'Open menu', navClose: 'Close menu', correctLabel: 'Correct',
    wrongLabel: 'Incorrect', questionOf: 'of', resultNote: 'This score reflects this practice activity only.',
    languageEnglish: 'English', languageSpanish: 'Español'
  },
  es: {
    welcome: 'Bienvenido/a', department: 'Departamento Médico y Psicológico',
    platform: 'PLATAFORMA DE EVALUACIÓN COGNITIVA',
    intro: 'Explora nuestras actividades cognitivas para practicar memoria, atención, lectura y percepción visual.',
    start: 'Comenzar evaluación', home: 'Inicio', my: 'Mis evaluaciones', reports: 'Informes',
    profile: 'Perfil', logout: 'Cerrar sesión', memory: 'Evaluación de memoria',
    attention: 'Evaluación de atención', reading: 'Evaluación de lectura',
    visual: 'Percepción visual', memoryDesc: 'Practica recordar palabras y secuencias.',
    attentionDesc: 'Practica el enfoque y la concentración.',
    readingDesc: 'Lee un texto breve y responde preguntas.',
    visualDesc: 'Reconoce figuras y patrones visuales.',
    secure: 'Seguro y confidencial', secureDesc: 'Tus datos permanecen en este navegador',
    professional: 'Resumen de progreso', professionalDesc: 'Consulta tu historial de actividades',
    devices: 'Multidispositivo', devicesDesc: 'Adaptable a cualquier pantalla',
    support: 'Orientación', supportDesc: 'Actividades de práctica y aprendizaje',
    choose: 'Elige una evaluación', recent: 'Actividad reciente', noResults: 'Aún no has completado evaluaciones.',
    begin: 'Comenzar', back: 'Volver al inicio', question: 'Pregunta', next: 'Siguiente',
    finish: 'Finalizar evaluación', retry: 'Probar otra actividad', result: 'Tu resultado',
    score: 'Puntuación', duration: 'Tiempo', completed: 'Completada', correct: 'Respuestas correctas',
    reportTitle: 'Informe de evaluación', print: 'Imprimir informe', download: 'Descargar informe',
    profileTitle: 'Perfil', name: 'Nombre para mostrar', save: 'Guardar perfil',
    profileSaved: 'Perfil guardado en este dispositivo.', language: 'Idioma',
    memoryPrompt: 'Estudia estas palabras. Después te pediremos que las recuerdes.',
    remember: 'Recuerda estas palabras', continue: 'Estoy listo/a',
    recallPrompt: '¿Cuál de estas palabras aparecía en la lista?',
    attentionPrompt: 'Elige el símbolo objetivo entre las opciones.',
    target: 'Símbolo objetivo', readingText: 'Texto de lectura',
    readingPassage: 'La lectura habitual es una forma de mantener la mente activa. Cuando leemos con atención, conectamos ideas, observamos detalles y construimos comprensión. Dedicar un momento a reflexionar sobre un texto puede ayudarnos a recordar su mensaje principal.',
    visualPrompt: '¿Qué figura coincide con la muestra?',
    sample: 'Figura de muestra', chooseShape: 'Elige la figura coincidente',
    reportEmpty: 'Completa una actividad para ver un informe aquí.',
    disclaimer: 'Estas actividades son únicamente de práctica y educación. No son pruebas diagnósticas ni sustituyen la evaluación de un profesional cualificado.',
    footer: '© 2026 Harrison & Loft. Todos los derechos reservados.',
    navOpen: 'Abrir menú', navClose: 'Cerrar menú', correctLabel: 'Correcta',
    wrongLabel: 'Incorrecta', questionOf: 'de', resultNote: 'Esta puntuación corresponde únicamente a esta actividad de práctica.',
    languageEnglish: 'English', languageSpanish: 'Español'
  }
}

const activities = [
  { id: 'memory', image: 'memory-assessment.png', icon: Brain, key: 'memory', desc: 'memoryDesc' },
  { id: 'attention', image: 'attention-assessment.png', icon: Target, key: 'attention', desc: 'attentionDesc' },
  { id: 'reading', image: 'reading-assessment.jpg', icon: BookOpen, key: 'reading', desc: 'readingDesc' },
  { id: 'visual', image: 'visual-perception.png', icon: Eye, key: 'visual', desc: 'visualDesc' }
]

const questions = {
  memory: [
    { prompt: 'recallPrompt', options: ['River', 'Window', 'Garden', 'Pencil'], answer: 'Garden' },
    { prompt: 'recallPrompt', options: ['Cloud', 'Apple', 'Bridge', 'Bottle'], answer: 'Apple' },
    { prompt: 'recallPrompt', options: ['Yellow', 'Train', 'Forest', 'Clock'], answer: 'Clock' }
  ],
  attention: [
    { prompt: 'attentionPrompt', options: ['○', '△', '□', '◇'], answer: '○' },
    { prompt: 'attentionPrompt', options: ['★', '☆', '●', '■'], answer: '★' },
    { prompt: 'attentionPrompt', options: ['＋', '×', '÷', '−'], answer: '＋' }
  ],
  reading: [
    { prompt: 'readingText', options: ['To keep the mind active', 'To avoid learning', 'To read faster only', 'To memorize every word'], answer: 'To keep the mind active' },
    { prompt: 'readingText', options: ['Ignore details', 'Connect ideas and notice details', 'Skip reflection', 'Read without attention'], answer: 'Connect ideas and notice details' },
    { prompt: 'readingText', options: ['The main message', 'The page number', 'The font style', 'The book cover'], answer: 'The main message' }
  ],
  visual: [
    { prompt: 'visualPrompt', options: ['Circle', 'Triangle', 'Square', 'Star'], answer: 'Triangle' },
    { prompt: 'visualPrompt', options: ['Diamond', 'Circle', 'Square', 'Triangle'], answer: 'Circle' },
    { prompt: 'visualPrompt', options: ['Square', 'Star', 'Circle', 'Diamond'], answer: 'Square' }
  ]
}

function App() {
  const [lang, setLang] = useState(localStorage.getItem('hl-lang') || 'en')
  const [page, setPage] = useState('home')
  const [active, setActive] = useState(null)
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState({})
  const [startedAt, setStartedAt] = useState(null)
  const [results, setResults] = useState(() => JSON.parse(localStorage.getItem('hl-results') || '[]'))
  const [profile, setProfile] = useState(() => JSON.parse(localStorage.getItem('hl-profile') || '{"name":"Maria"}'))
  const [nameInput, setNameInput] = useState(profile.name || 'Maria')
  const [mobileOpen, setMobileOpen] = useState(false)
  const [showRecall, setShowRecall] = useState(false)
  const t = translations[lang]

  useEffect(() => { localStorage.setItem('hl-lang', lang); document.documentElement.lang = lang }, [lang])
  useEffect(() => { localStorage.setItem('hl-results', JSON.stringify(results)) }, [results])
  useEffect(() => { localStorage.setItem('hl-profile', JSON.stringify(profile)) }, [profile])

  const currentQuestions = active ? questions[active.id] : []
  const current = currentQuestions[step]
  const setAnswer = (value) => setAnswers(prev => ({ ...prev, [step]: value }))

  function startActivity(item) {
    setActive(item); setStep(0); setAnswers({}); setStartedAt(Date.now()); setShowRecall(item.id === 'memory')
    setPage('test'); setMobileOpen(false)
  }
  function completeActivity() {
    const qs = questions[active.id]
    let score = 0
    qs.forEach((q, i) => {
      const a = answers[i]
      if (Array.isArray(q.answer)) {
        if (Array.isArray(a) && JSON.stringify([...a].sort()) === JSON.stringify([...q.answer].sort())) score++
      } else if (a === q.answer) score++
    })
    const item = {
      id: `${Date.now()}`, activity: active.id, score, total: qs.length,
      percent: Math.round(score / qs.length * 100),
      date: new Date().toLocaleString(lang === 'es' ? 'es-CO' : 'en-US'),
      duration: Math.max(1, Math.round((Date.now() - startedAt) / 1000))
    }
    setResults(prev => [item, ...prev].slice(0, 30))
    setActive(null); setPage('result'); setShowRecall(false)
    setAnswers({}); setStep(0)
    setLastResult(item)
  }
  const [lastResult, setLastResult] = useState(null)

  function navTo(target) { setPage(target); setActive(null); setMobileOpen(false) }
  const navItems = [
    [Home, 'home', t.home], [ChartNoAxesColumnIncreasing, 'assessments', t.my],
    [FileText, 'reports', t.reports], [UserRound, 'profile', t.profile]
  ]
  const selectedActivity = activities.find(a => a.id === (lastResult?.activity || results[0]?.activity))

  function renderTest() {
    if (!active) return null
    if (showRecall) {
      return <section className="test-panel">
        <div className="test-top"><span>{t.memory}</span><span>01 / 02</span></div>
        <h2>{t.remember}</h2><p>{t.memoryPrompt}</p>
        <div className="word-grid">{['Garden', 'Apple', 'Clock', 'River', 'Cloud', 'Pencil'].map(w => <span key={w}>{w}</span>)}</div>
        <button className="primary-btn" onClick={() => { setShowRecall(false); setStep(0) }}>{t.continue} <ArrowRight size={17}/></button>
      </section>
    }
    const q = current
    const isMulti = Array.isArray(q.answer)
    const selected = answers[step] || (isMulti ? [] : '')
    return <section className="test-panel">
      <div className="test-top"><span>{t[active.key] || t[active.id]}</span><span>{t.question} {step + 1} {t.questionOf} {currentQuestions.length}</span></div>
      <div className="progress"><span style={{width: `${(step + 1) / currentQuestions.length * 100}%`}} /></div>
      {active.id === 'reading' && <><h3>{t.readingText}</h3><p className="passage">{t.readingPassage}</p></>}
      {active.id === 'visual' && <div className="shape-sample"><span>{['△','○','□'][step]}</span><small>{t.sample}</small></div>}
      {active.id === 'attention' && <div className="target-line"><small>{t.target}</small><strong>{['○','★','＋'][step]}</strong></div>}
      <h2>{active.id === 'reading' ? (lang === 'es' ? '¿Cuál es la idea principal?' : 'What is the main idea?') : active.id === 'visual' ? t.chooseShape : active.id === 'attention' ? t.attentionPrompt : t.recallPrompt}</h2>
      <div className={`answer-grid ${isMulti ? 'multi' : ''}`}>
        {q.options.map((option, i) => {
          const isSelected = isMulti ? selected.includes(option) : selected === option
          return <button key={`${option}-${i}`} className={`answer-option ${isSelected ? 'selected' : ''}`} onClick={() => {
            if (isMulti) setAnswer(isSelected ? selected.filter(x => x !== option) : [...selected, option])
            else setAnswer(option)
          }}>{option}</button>
        })}
      </div>
      <div className="test-actions">
        <button className="text-btn" onClick={() => navTo('home')}>{t.back}</button>
        <button className="primary-btn" disabled={!selected || (Array.isArray(selected) && selected.length === 0)} onClick={() => step < currentQuestions.length - 1 ? setStep(step + 1) : completeActivity()}>
          {step === currentQuestions.length - 1 ? t.finish : t.next} <ArrowRight size={17}/>
        </button>
      </div>
    </section>
  }

  return <div className="app-shell">
    <aside className={`sidebar ${mobileOpen ? 'open' : ''}`}>
      <div className="brand">
        <img src={ASSETS + 'harrison-loft-logo.png'} alt="Harrison & Loft brain logo"/>
        <h1>HARRISON & LOFT</h1><p>{t.department}</p>
      </div>
      <nav>{navItems.map(([Icon, id, label]) => <button key={id} className={page === id ? 'active' : ''} onClick={() => navTo(id)}><Icon size={20}/>{label}</button>)}
        <button onClick={() => { setPage('home'); setMobileOpen(false) }}><LogOut size={20}/>{t.logout}</button>
      </nav>
      <div className="sidebar-tagline">Better Assessment.<br/>A Healthier Tomorrow.</div>
    </aside>
    {mobileOpen && <button className="scrim" aria-label={t.navClose} onClick={() => setMobileOpen(false)} />}
    <main className="main">
      <header className="topbar">
        <button className="mobile-menu" onClick={() => setMobileOpen(!mobileOpen)} aria-label={t.navOpen}>{mobileOpen ? <X/> : <Menu/>}</button>
        <div className="top-spacer"/>
        <div className="language-switch">
          <Languages size={17}/>
          <button className={lang === 'en' ? 'chosen' : ''} onClick={() => setLang('en')}>EN</button>
          <span>/</span>
          <button className={lang === 'es' ? 'chosen' : ''} onClick={() => setLang('es')}>ES</button>
        </div>
        <div className="user-chip"><span className="avatar">M</span><span>{t.welcome}, {profile.name}</span><ChevronDown size={16}/></div>
      </header>

      {page === 'home' && <>
        <section className="hero">
          <div className="hero-copy">
            <h2>Harrison & Loft</h2><h3>{t.department}</h3>
            <p className="eyebrow">{t.platform}</p>
            <p>{t.intro}</p>
            <button className="primary-btn" onClick={() => navTo('assessments')}><Play size={16} fill="currentColor"/>{t.start}</button>
          </div>
          <div className="hero-brain"><img src={ASSETS + 'brain-banner.png'} alt="Blue illuminated human brain"/></div>
          <div className="hero-doctor"><img src={ASSETS + 'doctor-banner.png'} alt="Medical professional"/></div>
        </section>
        <section className="section-heading"><div><span className="eyebrow">HARRISON & LOFT</span><h2>{t.choose}</h2></div><button className="text-btn" onClick={() => navTo('assessments')}>{t.my} <ArrowRight size={16}/></button></section>
        <section className="activity-grid">{activities.map(item => <ActivityCard key={item.id} item={item} t={t} onClick={() => startActivity(item)}/>)}</section>
        <section className="feature-strip">
          <Feature Icon={ShieldCheck} title={t.secure} desc={t.secureDesc}/>
          <Feature Icon={ChartNoAxesColumnIncreasing} title={t.professional} desc={t.professionalDesc}/>
          <Feature Icon={MonitorSmartphone} title={t.devices} desc={t.devicesDesc}/>
          <Feature Icon={Headphones} title={t.support} desc={t.supportDesc}/>
        </section>
        <section className="disclaimer"><ShieldCheck size={17}/><p>{t.disclaimer}</p></section>
      </>}

      {page === 'assessments' && <div className="page-content"><PageHeading eyebrow="ASSESSMENTS" title={t.choose}/><section className="activity-grid">{activities.map(item => <ActivityCard key={item.id} item={item} t={t} onClick={() => startActivity(item)}/>)}</section></div>}
      {page === 'test' && <div className="page-content"><button className="back-link" onClick={() => navTo('home')}>← {t.back}</button>{renderTest()}</div>}
      {page === 'result' && <div className="page-content"><PageHeading eyebrow="ASSESSMENT COMPLETE" title={t.result}/><div className="result-card"><div className="result-icon"><CheckCircle2 size={34}/></div><h2>{lastResult ? t[activities.find(a => a.id === lastResult.activity).key] : t.result}</h2><div className="score-ring"><strong>{lastResult?.percent ?? 0}%</strong><span>{t.score}</span></div><div className="result-stats"><div><strong>{lastResult?.score ?? 0}/{lastResult?.total ?? 0}</strong><span>{t.correct}</span></div><div><strong>{lastResult?.duration ?? 0}s</strong><span>{t.duration}</span></div></div><p>{t.resultNote}</p><button className="primary-btn" onClick={() => navTo('assessments')}>{t.retry} <ArrowRight size={17}/></button></div><div className="disclaimer">{t.disclaimer}</div></div>}
      {page === 'reports' && <div className="page-content"><PageHeading eyebrow="REPORTS" title={t.reportTitle}/>{results.length ? <><div className="report-toolbar"><button className="outline-btn" onClick={() => window.print()}><Printer size={16}/>{t.print}</button><button className="outline-btn" onClick={() => { const blob = new Blob([JSON.stringify(results, null, 2)], {type:'application/json'}); const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'harrison-loft-report.json'; a.click(); URL.revokeObjectURL(a.href) }}><Download size={16}/>{t.download}</button></div><ResultsTable results={results} lang={lang} t={t}/></> : <div className="empty-state"><FileText size={34}/><p>{t.reportEmpty}</p></div>}</div>}
      {page === 'profile' && <div className="page-content"><PageHeading eyebrow="ACCOUNT" title={t.profileTitle}/><div className="profile-card"><div className="profile-avatar">M</div><label>{t.name}<input value={nameInput} onChange={e => setNameInput(e.target.value)} maxLength={40}/></label><label>{t.language}<select value={lang} onChange={e => setLang(e.target.value)}><option value="en">English</option><option value="es">Español</option></select></label><button className="primary-btn" onClick={() => setProfile({name: nameInput.trim() || 'Maria'})}>{t.save}</button><p className="saved-note">{t.profileSaved}</p></div></div>}
      <footer>{t.footer}<span>Privacy&nbsp;&nbsp; Terms&nbsp;&nbsp; Contact</span></footer>
    </main>
  </div>
}

function ActivityCard({item, t, onClick}) {
  return <button className="activity-card" onClick={onClick}>
    <div className="card-image"><img src={ASSETS + item.image} alt=""/></div>
    <div className="card-copy"><h3>{t[item.key]}</h3><p>{t[item.desc]}</p><span className="circle-arrow"><ArrowRight size={18}/></span></div>
  </button>
}
function Feature({Icon, title, desc}) { return <div className="feature"><Icon size={28}/><div><strong>{title}</strong><span>{desc}</span></div></div> }
function PageHeading({eyebrow, title}) { return <div className="page-heading"><span className="eyebrow">{eyebrow}</span><h1>{title}</h1></div> }
function ResultsTable({results, lang, t}) {
  const names = {memory: t.memory, attention: t.attention, reading: t.reading, visual: t.visual}
  return <div className="table-wrap"><table><thead><tr><th>{t.completed}</th><th>{lang === 'es' ? 'Evaluación' : 'Assessment'}</th><th>{t.score}</th><th>{t.duration}</th></tr></thead><tbody>{results.map(r => <tr key={r.id}><td>{r.date}</td><td>{names[r.activity]}</td><td>{r.score}/{r.total} ({r.percent}%)</td><td>{r.duration}s</td></tr>)}</tbody></table></div>
}

createRoot(document.getElementById('root')).render(<App />)
