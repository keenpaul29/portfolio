export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
}

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Building a Modern Web Application with Next.js 15',
    excerpt: 'Learn how to leverage the latest features in Next.js 15 to build fast, responsive web applications...',
    date: '2024-02-15',
    readTime: '5 min read',
    tags: ['Next.js', 'React', 'Web Development'],
  },
  {
    id: '2',
    title: 'Mastering TypeScript: Advanced Tips and Tricks',
    excerpt: 'Dive deep into TypeScript\'s advanced features and learn how to write more maintainable code...',
    date: '2024-02-10',
    readTime: '7 min read',
    tags: ['TypeScript', 'JavaScript', 'Programming'],
  },
  // Add more blog posts as needed
];