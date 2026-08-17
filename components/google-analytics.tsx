'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import Script from 'next/script';
import { pageview, initGlobalClickTracking, setTrackingId, getTrackingId } from '@/lib/analytics';

interface GoogleAnalyticsProps {
  measurementId?: string;
}

export function GoogleAnalytics({ measurementId }: GoogleAnalyticsProps) {
  const activeId =
    measurementId ||
    process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID ||
    process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ||
    process.env.GA_MEASUREMENT_ID ||
    process.env.FIREBASE_MEASUREMENT_ID ||
    getTrackingId();

  if (activeId) {
    setTrackingId(activeId);
  }

  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Track pageviews on route changes
  useEffect(() => {
    if (pathname && activeId) {
      const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');
      pageview(url, activeId);
    }
  }, [pathname, searchParams, activeId]);

  // Track global clicks
  useEffect(() => {
    const cleanup = initGlobalClickTracking();
    return cleanup;
  }, []);

  if (!activeId) {
    // If no explicit tracking ID is configured, initialize dataLayer stub so event calls don't crash
    return (
      <Script
        id="ga-fallback-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            window.gtag = gtag;
          `,
        }}
      />
    );
  }

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${activeId}`}
      />
      <Script
        id="google-analytics-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            window.gtag = gtag;
            gtag('js', new Date());
            gtag('config', '${activeId}', {
              page_path: window.location.pathname,
              send_page_view: true
            });
          `,
        }}
      />
    </>
  );
}
