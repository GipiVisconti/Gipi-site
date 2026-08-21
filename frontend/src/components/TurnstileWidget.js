import { useEffect, useRef } from 'react';

const SCRIPT_ID = 'cloudflare-turnstile-script';

const loadTurnstile = () => {
  if (window.turnstile) return Promise.resolve(window.turnstile);

  return new Promise((resolve, reject) => {
    const existing = document.getElementById(SCRIPT_ID);
    const handleLoad = () => resolve(window.turnstile);
    const handleError = () => reject(new Error('turnstile-script'));

    if (existing) {
      existing.addEventListener('load', handleLoad, { once: true });
      existing.addEventListener('error', handleError, { once: true });
      return;
    }

    const script = document.createElement('script');
    script.id = SCRIPT_ID;
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
    script.async = true;
    script.defer = true;
    script.addEventListener('load', handleLoad, { once: true });
    script.addEventListener('error', handleError, { once: true });
    document.head.appendChild(script);
  });
};

const TurnstileWidget = ({ siteKey, language, onToken, resetSignal }) => {
  const containerRef = useRef(null);
  const widgetIdRef = useRef(null);

  useEffect(() => {
    let active = true;

    loadTurnstile()
      .then((turnstile) => {
        if (!active || !containerRef.current || !turnstile) return;
        widgetIdRef.current = turnstile.render(containerRef.current, {
          sitekey: siteKey,
          action: 'gift_request',
          language,
          theme: 'light',
          callback: (token) => onToken(token),
          'expired-callback': () => onToken(''),
          'error-callback': () => onToken(''),
        });
      })
      .catch(() => onToken(''));

    return () => {
      active = false;
      if (window.turnstile && widgetIdRef.current !== null) {
        window.turnstile.remove(widgetIdRef.current);
      }
    };
  }, [language, onToken, siteKey]);

  useEffect(() => {
    if (window.turnstile && widgetIdRef.current !== null) {
      window.turnstile.reset(widgetIdRef.current);
      onToken('');
    }
  }, [onToken, resetSignal]);

  return <div ref={containerRef} className="min-h-[65px]" data-testid="gift-turnstile" />;
};

export default TurnstileWidget;
