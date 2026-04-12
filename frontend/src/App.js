import "@/App.css";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import Header from './components/Header';
import Footer from './components/Footer';
import { Toaster } from './components/ui/sonner';
import HomePage from './pages/HomePage';
import FAQPage from './pages/FAQPage';

function App() {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <div className="App min-h-screen bg-[#FAF9F6]">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/faq" element={<FAQPage />} />
            </Routes>
          </main>
          <Footer />
          <Toaster />
        </div>
      </LanguageProvider>
    </BrowserRouter>
  );
}

export default App;