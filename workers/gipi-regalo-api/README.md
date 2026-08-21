# API del libro gratuito

Questo Cloudflare Worker gestisce il modulo del regalo nelle versioni italiana, inglese e spagnola. Verifica Turnstile, applica limiti antiabuso, registra soltanto identificatori pseudonimizzati in D1, accoda l'invio e chiede a Proton Mail di spedire l'email nella lingua scelta. Il collegamento ricevuto consente di scaricare il PDF corrispondente dalla raccolta di asset protetti del Worker.

La casella newsletter è facoltativa e separata dalla richiesta del libro. Le richieste conservano per non più di 30 giorni un profilo cifrato con nome, email, data completa del compleanno e scelta newsletter. Quando il consenso viene selezionato, il profilo cifrato viene conservato anche nell'archivio degli iscritti insieme alla data, alla lingua e alla versione del testo di consenso; l'invio periodico della newsletter e la relativa procedura automatica di disiscrizione non fanno parte di questo Worker e dovranno essere predisposti prima di iniziare le comunicazioni promozionali. Anche il futuro regalo automatico di compleanno non è ancora attivo: prima di introdurlo dovranno essere aggiunti un'impostazione dedicata, il relativo testo informativo e la procedura di invio programmato.

Render e Brevo non fanno parte di questo flusso. Il token SMTP Proton e gli altri segreti restano nelle variabili cifrate di Cloudflare e non devono mai essere inseriti nel repository o nel frontend.

## Segreti richiesti

Configurare in Cloudflare, senza inserirli nel repository:

- `PROTON_SMTP_TOKEN`: token SMTP dedicato generato in Proton;
- `TURNSTILE_SECRET`: chiave privata del widget Turnstile;
- `DATA_HASH_KEY`: chiave casuale usata per pseudonimizzare email e indirizzo IP;
- `OUTBOX_ENCRYPTION_KEY`: chiave casuale usata per cifrare temporaneamente i dati necessari all'invio.
- `ADMIN_API_TOKEN`: chiave casuale di almeno 32 caratteri richiesta dall'area amministrativa locale.

Le ultime due chiavi possono essere generate con un generatore crittografico e devono avere almeno 32 byte casuali.

## Sviluppo

È richiesto Node.js 22 o successivo. Il frontend esistente non deve essere aggiornato: questo Worker mantiene dipendenze e configurazione separate.

```sh
npm ci
npm run check
npm test
npm run dev
```

Per variabili locali, copiare `.dev.vars.example` in `.dev.vars`; il file reale è escluso da Git.

## Risorse Cloudflare

Il database D1 e la coda devono usare i binding `DB` e `MAIL_QUEUE`. Le migrazioni si trovano in `migrations`; i PDF ottimizzati sono in `assets/books` e vengono distribuiti insieme al Worker attraverso il binding `ASSETS`. Con `run_worker_first` attivo, i percorsi reali dei file non sono pubblici: il Worker li restituisce soltanto dopo aver verificato il collegamento personale.

## Area amministrativa locale

La pagina `/admin` richiede la chiave `ADMIN_API_TOKEN`, che resta soltanto nella memoria della pagina e viene inviata al Worker nell'intestazione `Authorization`. L'area mostra il numero delle richieste recenti e degli iscritti attivi, quindi permette di scaricare due file CSV compatibili con Excel: uno per le richieste degli ultimi 30 giorni e uno per l'archivio newsletter. I dati vengono decifrati esclusivamente durante la generazione del file.

## Distribuzione controllata

```sh
npx wrangler login
npm run deploy
```

Dopo il deploy, aggiungere i segreti da **Workers & Pages → gipi-regalo-api → Settings → Variables and Secrets**. La sitekey pubblica Turnstile appartiene al frontend; la chiave privata appartiene soltanto al Worker.

Prima di collegare il sito pubblico, verificare le tre lingue, il download corretto, la scadenza del collegamento e i limiti antiabuso in un ambiente di prova.
