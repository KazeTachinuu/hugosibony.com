// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import preact from '@astrojs/preact';
import expressiveCode from 'astro-expressive-code';
import icon from 'astro-icon';
import tailwindcss from '@tailwindcss/vite';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeExternalLinks from 'rehype-external-links';

export default defineConfig({
  site: 'https://hugosibony.com',
  integrations: [preact(), expressiveCode(), mdx(), sitemap(), icon()],
  vite: { plugins: [tailwindcss()] },
  markdown: {
    // Apply GFM explicitly (not via the implicit default) so tables render
    // deterministically across build environments, including on the host.
    gfm: false,
    remarkPlugins: [remarkGfm, remarkMath],
    rehypePlugins: [
      rehypeKatex,
      [rehypeExternalLinks, { target: '_blank', rel: ['noopener', 'noreferrer'] }],
    ],
  },
});
