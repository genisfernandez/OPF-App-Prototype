import { Routes, Route, Link, NavLink, useNavigate } from 'react-router-dom';
import { Home as HomeIcon, Heart, Plus, Users, Menu, Bell, ChevronRight, ShieldCheck, Bug, Pill, Droplets, Stethoscope, ScanLine, Scale, CalendarDays, Clock3, PawPrint } from 'lucide-react';
import { pet, healthItems, timeline } from './data/mockData';

const iconMap = { shield: ShieldCheck, bug: Bug, pill: Pill, droplet: Droplets, stethoscope: Stethoscope };

function Shell({ children }) {
  return <div className="app-shell"><main>{children}</main><BottomNav /></div>;
}

function BottomNav() {
  const items = [['/', HomeIcon, 'Inicio'], ['/health', Heart, 'Salud'], ['/community', Users, 'Comunidad'], ['/more', Menu, 'Más']];
  return <nav className="bottom-nav">
    {items.slice(0,2).map(([to, Icon, label]) => <NavLink key={to} to={to} end={to === '/'}><Icon/><span>{label}</span></NavLink>)}
    <Link className="add-button" to="/quick"><Plus/></Link>
    {items.slice(2).map(([to, Icon, label]) => <NavLink key={to} to={to}><Icon/><span>{label}</span></NavLink>)}
  </nav>;
}

function Header({ title, back=false }) {
  const nav = useNavigate();
  return <header className="header">{back ? <button onClick={() => nav(-1)}>‹</button> : <div/>}<h1>{title}</h1><Bell size={21}/></header>;
}

function Home() {
  return <Shell><div className="page home"><div className="hello"><div><p>Hola, Carles! 👋</p><span>Todo listo para cuidar de Luna</span></div><div className="avatar">C</div></div>
    <div className="pet-tabs"><div className="pet-dot active">L</div><div className="pet-dot">M</div><div className="pet-dot">N</div><div className="pet-dot add">+</div></div>
    <Link className="hero-card" to="/profile"><div><h2>{pet.name}</h2><p>{pet.breed} · {pet.age} años</p><span>{pet.sterilized ? 'Esterilizada' : ''}</span><button>Ver perfil</button></div><div className="dog-emoji">🐕</div></Link>
    <h3>Resumen de hoy</h3><div className="stats"><Link to="/weight"><span>Peso actual</span><strong>{pet.weight}</strong><small>+0,3 kg vs semana pasada</small></Link><div><span>Actividad</span><strong>78 min</strong><div className="ring">78</div></div></div>
    <h3>Accesos rápidos</h3><div className="quick-grid"><Link to="/nutrition"><ScanLine/>Nutrición</Link><Link to="/health"><Heart/>Salud</Link><Link to="/timeline"><Clock3/>Línea de vida</Link><Link to="/appointments"><CalendarDays/>Recordatorios</Link></div>
  </div></Shell>;
}

function Health() {
  return <Shell><div className="page"><Header title="Salud"/><div className="list">{healthItems.map(([title,sub,key])=>{const Icon=iconMap[key]; return <Link to="/vet" className="list-row" key={title}><div className="list-icon"><Icon/></div><div><strong>{title}</strong><span>{sub}</span></div><ChevronRight/></Link>})}</div></div></Shell>;
}

function Nutrition() {
 return <Shell><div className="page"><Header title="Nutrición" back/><div className="tabs"><b>Resumen</b><span>Alimentos</span><span>Recomendaciones</span></div><section className="card"><h3>Escanear alimento</h3><p>Escanea el código de barras o la etiqueta nutricional.</p><Link className="primary" to="/scanner">Escanear</Link></section><section className="card food"><div className="food-pack">OPF</div><div><small>Alimento actual</small><h3>Ownat Classic Adult Chicken</h3><p>Desde 01/04/2026</p></div></section><section><span>Ración diaria</span><h2>320 g</h2><p>Dividido en 2 tomas</p></section></div></Shell>;
}

function Scanner(){return <div className="scanner"><Link to="/nutrition">×</Link><h3>Escanear código de barras</h3><p>Coloca el código de barras dentro del marco</p><div className="scan-box"><ScanLine size={80}/><b>8 414830 207435</b></div><span>Escanear etiqueta nutricional</span></div>}

function Timeline(){return <Shell><div className="page"><Header title="Línea de vida" back/><div className="timeline">{timeline.map(([date,title])=><div key={date}><i/><section><small>{date}</small><strong>{title}</strong><div className="memory">🐕</div></section></div>)}</div><button className="primary wide">Añadir recuerdo</button></div></Shell>}

function Weight(){return <Shell><div className="page"><Header title="Peso" back/><div className="tabs"><b>Gráfico</b><span>Historial</span><span>Objetivo</span></div><h3>Evolución de peso</h3><div className="weight-head"><h2>{pet.weight}</h2><span>Objetivo: {pet.idealWeight}</span></div><div className="chart"><svg viewBox="0 0 320 150"><polyline points="0,45 35,52 70,47 105,59 140,65 175,70 210,88 245,93 280,76 320,72" fill="none" stroke="currentColor" strokeWidth="3"/><line x1="0" y1="110" x2="320" y2="110" stroke="currentColor" opacity=".25"/></svg></div><div className="stats"><div><strong>+0,3 kg</strong><span>vs semana pasada</span></div><div><strong>-1,6 kg</strong><span>vs mes pasado</span></div></div><button className="primary wide">Registrar nuevo peso</button></div></Shell>}

function Profile(){return <Shell><div className="page"><Header title="" back/><div className="profile-hero"><div className="dog-emoji">🐕</div><h1>{pet.name}</h1><p>{pet.breed} · {pet.age} años</p></div><div className="profile-tabs"><b>Información</b><span>Estadísticas</span><span>Logros</span></div>{[['Sexo',pet.sex],['Peso actual',pet.weight],['Peso ideal',pet.idealWeight],['Nivel de actividad',pet.activity],['Personalidad','Cariñosa, juguetona, inteligente']].map(x=><div className="detail" key={x[0]}><span>{x[0]}</span><strong>{x[1]}</strong></div>)}<button className="outline wide">Editar perfil</button></div></Shell>}

function Vet(){return <Shell><div className="page"><Header title="Expediente veterinario" back/><div className="tabs"><b>Timeline</b><span>Documentos</span><span>Tratamientos</span></div>{['Consulta veterinaria','Analítica sanguínea','Otitis externa','Radiografía','Vacuna polivalente'].map((x,i)=><div className="vet-event" key={x}><i/><div><small>{['03/05/2026','03/05/2026','15/04/2026','01/03/2026','15/02/2026'][i]}</small><strong>{x}</strong><span>{i===2?'Tratamiento completado':'Ver detalles'}</span></div></div>)}</div></Shell>}

function Community(){return <Shell><div className="page"><Header title="Comunidad"/><input className="search" placeholder="Buscar en la comunidad"/><h3>Grupos destacados</h3><div className="groups"><div>🐕<b>Golden Retriever</b></div><div>🥬<b>Nutrición natural</b></div><div>🐶<b>Sobrepeso</b></div></div><h3>Publicaciones recientes</h3><section className="card post"><b>Marta & Loki</b><small>Golden Retriever · 3 años</small><p>Hoy hemos completado nuestra primera ruta de montaña! 🏔️🐾</p><div className="mountain">🏔️🐕</div></section></div></Shell>}

function Placeholder({title}){return <Shell><div className="page"><Header title={title} back/><div className="empty"><PawPrint size={52}/><h2>{title}</h2><p>Pantalla incluida en el prototipo de Fase 1. Añadiremos aquí la interacción detallada.</p></div></div></Shell>}

export default function App(){return <Routes><Route path="/" element={<Home/>}/><Route path="/health" element={<Health/>}/><Route path="/nutrition" element={<Nutrition/>}/><Route path="/scanner" element={<Scanner/>}/><Route path="/timeline" element={<Timeline/>}/><Route path="/weight" element={<Weight/>}/><Route path="/profile" element={<Profile/>}/><Route path="/vet" element={<Vet/>}/><Route path="/community" element={<Community/>}/><Route path="/appointments" element={<Placeholder title="Citas y recordatorios"/>}/><Route path="/quick" element={<Placeholder title="Registrar"/>}/><Route path="/more" element={<Placeholder title="Más"/>}/></Routes>}
