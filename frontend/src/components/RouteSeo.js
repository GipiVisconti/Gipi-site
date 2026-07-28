import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  applyRouteSeoLinks,
  buildRouteSeoLinks,
  clearRouteSeoLinks,
} from '../lib/seo';

const RouteSeo = () => {
  const location = useLocation();

  useEffect(() => {
    const seoLinks = buildRouteSeoLinks(location.pathname);

    if (!seoLinks) {
      clearRouteSeoLinks(document);
      return;
    }

    applyRouteSeoLinks(document, seoLinks);
  }, [location.pathname]);

  return null;
};

export default RouteSeo;
