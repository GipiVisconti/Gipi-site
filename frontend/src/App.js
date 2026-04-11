import "@/App.css";
import { LanguageProvider } from './context/LanguageContext';
import Header from './components/Header';
import Hero from './components/Hero';
import BooksSection from './components/BooksSection';
import AboutSection from './components/AboutSection';
import FAQSection from './components/FAQSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import { Toaster } from './components/ui/sonner';

function App() {
  return (
    <LanguageProvider>
      <div className="App min-h-screen bg-[#FAF9F6]">
        <Header />
        <main>
          <Hero />
          <BooksSection />
          <AboutSection />
          <FAQSection />
          {false && <ContactSection />}
        </main>
        <Footer />
        <Toaster />
      </div>
    </LanguageProvider>
  );
}

export default App;
