// lib/analytics.ts

let currentTrackingId =
  (typeof process !== 'undefined'
    ? process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID ||
      process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ||
      process.env.GA_MEASUREMENT_ID ||
      process.env.FIREBASE_MEASUREMENT_ID
    : '') || '';

export const GA_TRACKING_ID = currentTrackingId;

export const setTrackingId = (id: string) => {
  if (id) {
    currentTrackingId = id;
  }
};

export const getTrackingId = () => currentTrackingId;

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: string, trackingId?: string) => {
  const id = trackingId || currentTrackingId;
  if (typeof window !== 'undefined' && (window as any).gtag && id) {
    (window as any).gtag('config', id, {
      page_path: url,
    });
  }
};

type GTagEvent = {
  action: string;
  category?: string;
  label?: string;
  value?: number;
  [key: string]: any;
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label, value, ...rest }: GTagEvent) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
      ...rest,
    });
  }
};

/**
 * Initializes automatic global click event tracking
 * Logs all meaningful clicks (links, buttons, external links, mailto, tel, downloads)
 */
export const initGlobalClickTracking = () => {
  if (typeof window === 'undefined') return () => {};

  const handleClick = (e: MouseEvent) => {
    try {
      const target = (e.target as HTMLElement)?.closest('a, button, [role="button"], input[type="submit"]');
      if (!target) return;

      const tagName = target.tagName.toLowerCase();
      let textContent = target.textContent?.trim() || '';
      if (textContent.length > 80) {
        textContent = textContent.slice(0, 80) + '...';
      }

      if (tagName === 'a') {
        const anchor = target as HTMLAnchorElement;
        const href = anchor.href || '';
        const isExternal = href.startsWith('http') && !href.includes(window.location.host);
        const isMailto = href.startsWith('mailto:');
        const isTel = href.startsWith('tel:');
        const isDownload = anchor.hasAttribute('download') || /\.(pdf|zip|docx?|xlsx?|pptx?|png|jpg|jpeg)$/i.test(href);

        if (isDownload) {
          event({
            action: 'file_download',
            category: 'Engagement',
            label: href,
            file_name: href.split('/').pop(),
            link_text: textContent,
          });
        } else if (isMailto) {
          event({
            action: 'contact_email_click',
            category: 'Contact',
            label: href.replace('mailto:', ''),
          });
        } else if (isTel) {
          event({
            action: 'contact_phone_click',
            category: 'Contact',
            label: href.replace('tel:', ''),
          });
        } else if (isExternal) {
          // Check if social media
          const isSocial = /facebook|instagram|linkedin|youtube|twitter|github/i.test(href);
          event({
            action: isSocial ? 'social_link_click' : 'outbound_link_click',
            category: isSocial ? 'Social Media' : 'Outbound',
            label: href,
            link_text: textContent,
            destination: href,
          });
        } else {
          event({
            action: 'navigation_click',
            category: 'Navigation',
            label: href || textContent,
            link_text: textContent,
          });
        }
      } else if (tagName === 'button' || target.getAttribute('role') === 'button') {
        const buttonId = target.id || target.getAttribute('name') || '';
        const ariaLabel = target.getAttribute('aria-label') || '';
        event({
          action: 'button_click',
          category: 'UI Interaction',
          label: ariaLabel || textContent || buttonId || 'Button',
          button_id: buttonId,
        });
      }
    } catch (err) {
      console.warn('Analytics click monitoring error:', err);
    }
  };

  document.addEventListener('click', handleClick, true);
  return () => {
    document.removeEventListener('click', handleClick, true);
  };
};
