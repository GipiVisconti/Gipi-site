# API del libro gratuito

Questo Cloudflare Worker gestisce il modulo del regalo nelle versioni italiana, inglese e spagnola. Verifica Turnstile, applica limiti antiabuso, registra soltanto identificatori pseudonimizzati in D1, accoda l'invio e chiede a Proton Mail di spedire l'email nella lingua scelta. Il collegamento ricevuto consente di scaricare il PDF corrispondente dalla raccolta di asset protetti del Worker.

La casella newsletter è facoltativa e separata dalla richiesta del libro. Le richieste conservano per non più di 30 giorni un profilo cifrato con nome, email, data completa del compleanno e scelta newsletter. Quando il consenso viene selezionato, il profilo cifrato viene conservato anche nell'archivio degli iscritti insieme alla data, alla lingua e alla versione del testo di consenso. Le campagne del blog usano una consegna univoca per articolo e iscritto, rileggono lo stato del consenso prima dell'invio e includono un collegamento firmato per la disiscrizione. Il futuro regalo automatico di compleanno non è ancora attivo: prima di introdurlo dovranno essere aggiunti un'impostazione dedicata, il relativo testo informativo e la procedura di invio programmato.

Render e Brevo non fanno parte di questo flusso. Il token SMTP Proton e gli altri segreti restano nelle variabili cifrate di Cloudflare e non devono mai essere inseriti nel repository o nel frontend.

Per ogni nuova richiesta valida, una notifica separata viene inviata a `info@gipivisconti.com`. La notifica usa uno stato indipendente e può essere ritentata senza reinviare il libro al lettore.

## Segreti richiesti

Configurare in Cloudflare, senza inserirli nel repository:

- `PROTON_SMTP_TOKEN`: token SMTP dedicato generato in Proton;
- `TURNSTILE_SECRET`: chiave privata del widget Turnstile;
- `DATA_HASH_KEY`: chiave casuale usata per pseudonimizzare email e indirizzo IP;
- `OUTBOX_ENCRYPTION_KEY`: chiave casuale usata per cifrare temporaneamente i dati necessari all'invio.
- `ADMIN_API_TOKEN`: chiave casuale di almeno 32 caratteri richiesta dall'area amministrativa.

La variabile non segreta `NEWSLETTER_AUTOMATION_MODE` è impostata su `live` nella configurazione di produzione, perché il modello email è stato approvato. Le anteprime si generano localmente senza registrare campagne; non si deve riportare il Worker su `preview` per preparare o controllare una bozza.

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

Il database D1 usa il binding `DB`; le email del libro e le newsletter usano due code separate, `MAIL_QUEUE` e `NEWSLETTER_QUEUE`, così una campagna non rallenta la consegna del regalo. Le migrazioni si trovano in `migrations`; i PDF ottimizzati sono in `assets/books` e vengono distribuiti insieme al Worker attraverso il binding `ASSETS`. Con `run_worker_first` attivo, i percorsi reali dei file non sono pubblici: il Worker li restituisce soltanto dopo aver verificato il collegamento personale.

## Newsletter del blog

L'endpoint amministrativo `POST /v1/admin/newsletter/campaigns` riceve slug, commit, data di pubblicazione, titolo, estratto e URL nelle tre lingue. In modalità `preview` restituisce le tre email complete senza scrivere nel database e senza inviare messaggi. In modalità `live` crea una campagna idempotente, prepara le consegne soltanto per gli iscritti attivi e le accoda dopo la verifica pubblica dell'articolo.

Una campagna non può essere ricreata con lo stesso slug e contenuti differenti. Le consegne con esito SMTP incerto non vengono ritentate, evitando duplicazioni; una revoca del consenso successiva alla creazione della campagna blocca comunque il messaggio prima dell'invio.

## Area amministrativa

La pagina `/admin` richiede la chiave `ADMIN_API_TOKEN`, che resta soltanto nella memoria della pagina e viene inviata al Worker nell'intestazione `Authorization`. L'area mostra il numero delle richieste recenti e degli iscritti attivi, quindi permette di scaricare due file CSV compatibili con Excel: uno per le richieste degli ultimi 30 giorni e uno per l'archivio newsletter. I dati vengono decifrati esclusivamente durante la generazione del file.

## Distribuzione controllata

```sh
npx wrangler login
npm run db:remote
npm run deploy
```

La migrazione D1 deve precedere il deploy che introduce le campagne newsletter. Un commit o un push eseguito da GitHub Desktop aggiorna il repository, ma non modifica da solo il Worker Cloudflare: i due comandi finali devono essere eseguiti dalla cartella `workers/gipi-regalo-api`.

Dopo il deploy, aggiungere i segreti da **Workers & Pages → gipi-regalo-api → Settings → Variables and Secrets**. La sitekey pubblica Turnstile appartiene al frontend; la chiave privata appartiene soltanto al Worker.

Prima di collegare il sito pubblico, verificare le tre lingue, il download corretto, la scadenza del collegamento e i limiti antiabuso in un ambiente di prova.
