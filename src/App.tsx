import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import TopBar from './components/TopBar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Problema from './pages/Problema';
import Escala from './pages/Escala';
import AgriculturaFamiliar from './pages/AgriculturaFamiliar';
import Biodigestor from './pages/Biodigestor';
import Incendios from './pages/Incendios';
import Recicladores from './pages/Recicladores';
import ReformaAgraria from './pages/ReformaAgraria';
import BioeconomiaUrbana from './pages/BioeconomiaUrbana';
import CoopSolar from './pages/CoopSolar';
import Cidade from './pages/Cidade';
import Financiamento from './pages/Financiamento';
import Rios from './pages/Rios';
import Wallet from './pages/Wallet';
import AppEmulator from './pages/AppEmulator';
import Smartwatch from './pages/Smartwatch';
import Privacidade from './pages/Privacidade';
import Pegada from './pages/Pegada';
import Jogo from './pages/Jogo';
import Marketplace from './pages/Marketplace';
import Cooperativa from './pages/Cooperativa';
import Mapa from './pages/Mapa';
import Tonelada from './pages/Tonelada';
import Mercados from './pages/Mercados';
import Justica from './pages/Justica';
import Distribuicao from './pages/Distribuicao';
import IDC from './pages/IDC';
import Comparador from './pages/Comparador';
import Politicas10bi from './pages/Politicas10bi';
import BancoClimatico from './pages/BancoClimatico';
import MinaVerde from './pages/MinaVerde';
import EconomiaCircular from './pages/EconomiaCircular';
import Painel from './pages/Painel';
import Fontes from './pages/Fontes';
import Metodologia from './pages/Metodologia';
import NotFound from './pages/NotFound';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <>
      <a className="skip-link" href="#main">Pular para o conteúdo</a>
      <TopBar />
      <main id="main">
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/problema" element={<Problema />} />
          <Route path="/escala" element={<Escala />} />
          <Route path="/agri-familiar" element={<AgriculturaFamiliar />} />
          <Route path="/biodigestor" element={<Biodigestor />} />
          <Route path="/incendios" element={<Incendios />} />
          <Route path="/recicladores" element={<Recicladores />} />
          <Route path="/reforma-agraria" element={<ReformaAgraria />} />
          <Route path="/bioeconomia-urbana" element={<BioeconomiaUrbana />} />
          <Route path="/coop-solar" element={<CoopSolar />} />
          <Route path="/cidade" element={<Cidade />} />
          <Route path="/financiamento" element={<Financiamento />} />
          <Route path="/rios" element={<Rios />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/app" element={<AppEmulator />} />
          <Route path="/smartwatch" element={<Smartwatch />} />
          <Route path="/privacidade" element={<Privacidade />} />
          <Route path="/pegada" element={<Pegada />} />
          <Route path="/jogo" element={<Jogo />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/cooperativa" element={<Cooperativa />} />
          <Route path="/mapa" element={<Mapa />} />
          <Route path="/tonelada" element={<Tonelada />} />
          <Route path="/mercados" element={<Mercados />} />
          <Route path="/justica" element={<Justica />} />
          <Route path="/distribuicao" element={<Distribuicao />} />
          <Route path="/idc" element={<IDC />} />
          <Route path="/comparador" element={<Comparador />} />
          <Route path="/politicas-10bi" element={<Politicas10bi />} />
          <Route path="/banco-climatico" element={<BancoClimatico />} />
          <Route path="/mina-verde" element={<MinaVerde />} />
          <Route path="/economia-circular" element={<EconomiaCircular />} />
          <Route path="/painel" element={<Painel />} />
          <Route path="/fontes" element={<Fontes />} />
          <Route path="/metodologia" element={<Metodologia />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
