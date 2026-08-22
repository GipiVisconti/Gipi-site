import { useEffect, useState } from 'react';
import {
  Database,
  Download,
  FileText,
  Loader2,
  LockKeyhole,
  LogOut,
  RefreshCw,
  ShieldCheck,
  Users,
} from 'lucide-react';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';

const configuredApiUrl = (process.env.REACT_APP_GIFT_API_URL || '').replace(/\/+$/, '');
const PRODUCTION_API_URL = 'https://gipi-regalo-api.tight-river-419a.workers.dev';
const API_BASE_URL =
  configuredApiUrl ||
  (process.env.NODE_ENV === 'development' ? 'http://localhost:8787' : PRODUCTION_API_URL);

const AdminPage = () => {
  const [token, setToken] = useState('');
  const [summary, setSummary] = useState(null);
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');
  const [downloading, setDownloading] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
    const previousTitle = document.title;
    document.title = 'Area amministrativa | Gipi Visconti';
    let robots = document.querySelector('meta[name="robots"]');
    const createdRobots = !robots;
    const previousRobots = robots?.getAttribute('content');
    if (!robots) {
      robots = document.createElement('meta');
      robots.setAttribute('name', 'robots');
      document.head.appendChild(robots);
    }
    robots.setAttribute('content', 'noindex,nofollow,noarchive');

    return () => {
      document.title = previousTitle;
      if (createdRobots) robots.remove();
      else if (previousRobots) robots.setAttribute('content', previousRobots);
      else robots.removeAttribute('content');
    };
  }, []);

  const loadSummary = async (event) => {
    event?.preventDefault();
    setMessage('');
    if (!API_BASE_URL) {
      setStatus('error');
      setMessage('L’indirizzo dell’API amministrativa non è configurato.');
      return;
    }
    setStatus('loading');
    try {
      const response = await fetch(`${API_BASE_URL}/v1/admin/summary`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) {
        setStatus('error');
        setMessage(
          response.status === 401
            ? 'La chiave amministrativa non è corretta.'
            : 'Non è stato possibile caricare i dati.',
        );
        return;
      }
      setSummary(await response.json());
      setStatus('ready');
    } catch {
      setStatus('error');
      setMessage('Il servizio amministrativo non è raggiungibile. Riprova tra poco.');
    }
  };

  const downloadCsv = async (type, fallbackFilename) => {
    setDownloading(type);
    setMessage('');
    try {
      const response = await fetch(`${API_BASE_URL}/v1/admin/export/${type}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error('download-failed');
      const blob = await response.blob();
      const disposition = response.headers.get('Content-Disposition') || '';
      const filename = disposition.match(/filename="([^"]+)"/)?.[1] || fallbackFilename;
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
    } catch {
      setMessage('Non è stato possibile generare il file. Riprova tra poco.');
    } finally {
      setDownloading('');
    }
  };

  const logout = () => {
    setToken('');
    setSummary(null);
    setStatus('idle');
    setMessage('');
  };

  if (!summary) {
    return (
      <section className="relative overflow-hidden bg-[#FAF9F6] py-16 md:py-24">
        <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-[#C18C5D]/10 blur-3xl" />
        <div className="relative z-10 mx-auto max-w-md px-6">
          <div className="rounded-3xl border border-[#E8E4DB] bg-white p-8 shadow-sm md:p-10">
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#C18C5D] text-white">
              <LockKeyhole className="h-6 w-6" aria-hidden="true" />
            </div>
            <h1 className="mb-3 text-center font-heading text-4xl text-[#2C2A29]">
              Area amministrativa
            </h1>
            <p className="mb-8 text-center leading-relaxed text-[#75736E]">
              Inserisci la chiave amministrativa per consultare ed esportare i dati cifrati.
            </p>
            <form onSubmit={loadSummary} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="admin-token">Chiave amministrativa</Label>
                <Input
                  id="admin-token"
                  type="password"
                  autoComplete="current-password"
                  value={token}
                  onChange={(event) => setToken(event.target.value)}
                  minLength={32}
                  required
                />
              </div>
              {message && <p className="rounded-xl bg-red-50 p-4 text-sm text-red-700" role="alert">{message}</p>}
              <button type="submit" disabled={status === 'loading'} className="btn-primary flex w-full items-center justify-center gap-2 disabled:opacity-50">
                {status === 'loading' ? <Loader2 className="h-4 w-4 animate-spin" /> : <ShieldCheck className="h-4 w-4" />}
                Accedi
              </button>
            </form>
            <p className="mt-6 text-center text-xs leading-relaxed text-[#8A8781]">
              La chiave rimane soltanto nella memoria della pagina e non viene salvata nel browser.
            </p>
          </div>
        </div>
      </section>
    );
  }

  const cards = [
    {
      label: 'Richieste negli ultimi 30 giorni',
      value: summary.requestsLast30Days,
      icon: FileText,
    },
    {
      label: 'Consensi negli ultimi 30 giorni',
      value: summary.newsletterConsentsLast30Days,
      icon: ShieldCheck,
    },
    {
      label: 'Iscritti attivi alla newsletter',
      value: summary.activeNewsletterSubscribers,
      icon: Users,
    },
  ];

  return (
    <section className="bg-[#FAF9F6] py-12 md:py-16">
      <div className="mx-auto max-w-6xl px-6 md:px-12">
        <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-3 flex items-center gap-2 text-sm font-medium uppercase tracking-[0.16em] text-[#C18C5D]">
              <Database className="h-4 w-4" />
              Archivio cifrato
            </div>
            <h1 className="font-heading text-4xl text-[#2C2A29] md:text-5xl">Area amministrativa</h1>
            <p className="mt-3 max-w-2xl leading-relaxed text-[#75736E]">
              I dati vengono decifrati soltanto durante la generazione dei file e non sono mostrati direttamente nella pagina.
            </p>
          </div>
          <div className="flex gap-3">
            <button type="button" onClick={loadSummary} className="btn-secondary flex items-center gap-2">
              <RefreshCw className="h-4 w-4" />
              Aggiorna
            </button>
            <button type="button" onClick={logout} className="btn-secondary flex items-center gap-2">
              <LogOut className="h-4 w-4" />
              Esci
            </button>
          </div>
        </div>

        <div className="mb-10 grid gap-5 md:grid-cols-3">
          {cards.map(({ label, value, icon: Icon }) => (
            <div key={label} className="rounded-3xl border border-[#E8E4DB] bg-white p-7 shadow-sm">
              <Icon className="mb-5 h-6 w-6 text-[#C18C5D]" aria-hidden="true" />
              <div className="mb-2 text-4xl font-semibold text-[#2C2A29]">{value}</div>
              <p className="text-sm leading-relaxed text-[#75736E]">{label}</p>
            </div>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-[#E8E4DB] bg-[#F2EFE9] p-7 md:p-9">
            <h2 className="mb-3 font-heading text-3xl text-[#2C2A29]">Richieste del libro</h2>
            <p className="mb-7 leading-relaxed text-[#75736E]">
              Esporta nome, email, data del compleanno, lingua, consenso e stato dell’invio. L’archivio copre gli ultimi 30 giorni.
            </p>
            <button type="button" onClick={() => downloadCsv('requests', 'richieste-libro.csv')} disabled={downloading === 'requests'} className="btn-primary flex items-center gap-2 disabled:opacity-50">
              {downloading === 'requests' ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
              Scarica richieste
            </button>
          </div>
          <div className="rounded-3xl border border-[#E8E4DB] bg-[#F2EFE9] p-7 md:p-9">
            <h2 className="mb-3 font-heading text-3xl text-[#2C2A29]">Newsletter</h2>
            <p className="mb-7 leading-relaxed text-[#75736E]">
              Esporta gli iscritti con la prova del consenso, la lingua scelta e la data del compleanno.
            </p>
            <button type="button" onClick={() => downloadCsv('newsletter', 'iscritti-newsletter.csv')} disabled={downloading === 'newsletter'} className="btn-primary flex items-center gap-2 disabled:opacity-50">
              {downloading === 'newsletter' ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
              Scarica iscritti
            </button>
          </div>
        </div>
        {message && <p className="mt-6 rounded-xl bg-red-50 p-4 text-sm text-red-700" role="alert">{message}</p>}
      </div>
    </section>
  );
};

export default AdminPage;
