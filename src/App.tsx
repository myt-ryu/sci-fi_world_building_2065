import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { UseCases } from './pages/UseCases';
import { WikiPage } from './components/features/wiki/WikiPage';
import { ChatWidget } from './components/features/ai-guide/ChatWidget';

function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/use-cases" element={<UseCases />} />
          <Route path="/wiki" element={<WikiPage />} />
          <Route path="/wiki/:categoryId" element={<WikiPage />} />
        </Routes>
        <ChatWidget />
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;
