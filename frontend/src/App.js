import "@/App.css";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import Header from './components/Header';
import Footer from './components/Footer';
import { Toaster } from './components/ui/sonner';
import HomePage from './pages/HomePage';
import FAQPage from './pages/FAQPage';
import BookDetailPage from './pages/BookDetailPage';

function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <div className="App min-h-screen bg-[#FAF9F6]">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/faq" element={<FAQPage />} />
              <Route path="/:lang/:section/:slug" element={<BookDetailPage />} />
            </Routes>
          </main>
          <Footer />
          <Toaster />
        </div>
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;