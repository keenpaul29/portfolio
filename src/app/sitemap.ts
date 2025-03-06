import { MetadataRoute } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://keenpaul29.me';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    '',
    '/about',
    '/projects',
    '/blog',
    '/contact',
  ];

  const blogPosts = [
    '/blog/building-modern-web-application-nextjs',
    '/blog/mastering-typescript-tips-tricks',
    // Add more blog posts
  ];

  const projects = [
    '/projects/commentify',
    '/projects/cryptox',
    '/projects/securechat',
    // Add more projects
  ];

  const allRoutes = [...routes, ...blogPosts, ...projects];

  return allRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1 : 0.8,
  }));
}