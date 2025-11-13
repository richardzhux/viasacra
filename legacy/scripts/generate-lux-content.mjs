import fs from 'fs';
import path from 'path';

const manualPath = path.resolve('astro/lux-manual-meta.json');
const outDir = path.resolve('astro/src/content/lux');

const entries = JSON.parse(fs.readFileSync(manualPath, 'utf8'));

const slugify = (value) =>
  value
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const quote = (value) => `"${String(value).replace(/"/g, '\\"')}"`;

fs.rmSync(outDir, { recursive: true, force: true });
fs.mkdirSync(outDir, { recursive: true });

entries.forEach((entry) => {
  const slug = slugify(entry.title || path.parse(entry.localImage).name);
  const frontMatter = {
    title: entry.title,
    displayDate: entry.displayDate || entry.date,
    date: entry.date,
    location: entry.location,
    categories: entry.categories || [],
    tags: entry.tags || [],
    alt: entry.alt,
    caption: entry.caption,
    localImage: entry.localImage,
    cloudinary: {
      transformation: entry.cloudinaryTransform || 'f_auto,q_auto,c_fill,w_1600',
    },
  };

  const fmLines = [
    '---',
    ...Object.entries(frontMatter).flatMap(([key, value]) => {
      if (Array.isArray(value)) {
        const items = value.map((item) => `  - ${quote(item)}`).join('\n');
        return `${key}:\n${items}`;
      }
      if (typeof value === 'object' && value !== null) {
        const nested = Object.entries(value)
          .map(([nestedKey, nestedValue]) => `  ${nestedKey}: ${quote(nestedValue)}`)
          .join('\n');
        return `${key}:\n${nested}`;
      }
      return `${key}: ${quote(value)}`;
    }),
    '---',
    '',
  ];

  const essay = (entry.essay || '').trim();
  const body = essay ? `${essay}\n` : '';
  fs.writeFileSync(path.join(outDir, `${slug}.md`), `${fmLines.join('\n')}${body}`);
});

console.log(`Generated ${entries.length} markdown files in ${outDir}`);
