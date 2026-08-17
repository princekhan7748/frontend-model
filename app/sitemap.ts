import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://hsturs.org';
  const lastModified = new Date();

  const routes = [
    '',
    '/about/leadership/executive',
    '/about/constitution',
    '/about/history',
    '/events/upcoming',
    '/events/notice',
    '/events/archive',
    '/content/blog',
    '/content/magazine',
    '/content/gallery',
    '/content/resources',
    '/blog',
    '/verification/certificate',
    '/verification/membership',
    '/contact',
    '/contact/location',
    '/contact/faq',
    '/privacy-policy',
    '/terms-of-service',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified,
    changeFrequency: route === '' || route.includes('blog') || route.includes('events') ? 'daily' : 'weekly',
    priority: route === '' ? 1.0 : route.startsWith('/about') || route.startsWith('/events') ? 0.8 : 0.6,
  }));
}
