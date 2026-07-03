export type TechTool = {
  name: string;
  slug?: string;
  /** Ruta local cuando no hay icono en Simple Icons */
  icon?: string;
};

/** Logos vía Simple Icons CDN — https://simpleicons.org */
export const techTools: readonly TechTool[] = [
  { name: 'React', slug: 'react' },
  { name: 'Next.js', slug: 'nextdotjs' },
  { name: 'TypeScript', slug: 'typescript' },
  { name: 'Node.js', slug: 'nodedotjs' },
  { name: 'MongoDB', slug: 'mongodb' },
  { name: 'PostgreSQL', slug: 'postgresql' },
  { name: 'Firebase', slug: 'firebase' },
  { name: 'AWS', slug: 'amazonaws' },
  { name: 'Vercel', slug: 'vercel' },
  { name: 'Docker', slug: 'docker' },
  { name: 'Tailwind CSS', slug: 'tailwindcss' },
  { name: 'Express', slug: 'express' },
  { name: 'WordPress', slug: 'wordpress' },
  { name: 'Git', slug: 'git' },
  { name: 'Nginx', slug: 'nginx' },
];

export const toolIconUrl = (tool: TechTool) =>
  tool.icon ?? `https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/${tool.slug}.svg`;
