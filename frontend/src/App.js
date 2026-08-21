import "@/App.css";
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import Header from './components/Header';
import Footer from './components/Footer';
import { Toaster } from './components/ui/sonner';
import HomePage from './pages/HomePage';
import FAQPage from './pages/FAQPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import BookDetailPage from './pages/BookDetailPage';
import BlogListPage from './pages/BlogListPage';
import BlogDetailPage from './pages/BlogDetailPage';
import RouteSeo from './components/RouteSeo';
import GiftLandingPage from './pages/GiftLandingPage';
import AdminPage from './pages/AdminPage';

function App() {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <RouteSeo />
        <div className="App min-h-screen bg-[#FAF9F6]">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Navigate to="/it" replace />} />
              <Route path="/faq" element={<Navigate to="/it/faq" replace />} />
              <Route path="/privacy-policy" element={<Navigate to="/it/privacy-policy" replace />} />
              <Route path="/admin" element={<AdminPage />} />
              <Route path="/:lang" element={<HomePage />} />
              <Route path="/:lang/faq" element={<FAQPage />} />
              <Route path="/:lang/privacy-policy" element={<PrivacyPolicyPage />} />
              <Route path="/it/libro-gratuito" element={<GiftLandingPage />} />
              <Route path="/en/free-book" element={<GiftLandingPage />} />
              <Route path="/es/libro-gratis" element={<GiftLandingPage />} />
              <Route path="/:lang/blog" element={<BlogListPage />} />
              <Route path="/:lang/blog/:slug" element={<BlogDetailPage />} />
              <Route path="/:lang/:section/:slug" element={<BookDetailPage />} />
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
