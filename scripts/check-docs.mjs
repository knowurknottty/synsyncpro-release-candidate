#!/usr/bin/env node
/**
 * OMEGA documentation navigation gate, deliberately dependency-free.
 * Checks local Markdown link targets and relative fragment headings.
 * Excludes external link availability and code-example execution.
 */
import { readFileSync, existsSync } from 'node:fs';
import { resolve, dirname, relative, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const docsRoot = resolve(root, 'docs');
const index = resolve(docsRoot, 'README.md');
const seen = new Set();
const errors = [];
let linkCount = 0;

const toSlug = value => value.toLowerCase()
  .replace(/<[^>]*>/g, '')
  .replace(/[\x60*_~]/g, '')
  .replace(/[^\p{L}\p{N}\s-]/gu, '')
  .trim().replace(/\s+/g, '-');

function validate(file) {
  if (seen.has(file)) return;
  seen.add(file);
  const markdown = readFileSync(file, 'utf8');
  const body = markdown.replace(/^~~~[^\n]*\n[\s\S]*?^~~~\s*$/gm, '');
  for (const link of body.matchAll(/!?\[[^\]]*]\(([^)]+)\)/g)) {
    const original = link[1].trim();
    if (!original || /^(?:https?:|mailto:|data:|#)/i.test(original)) continue;
    const target = original.replace(/^<|>$/g, '').split(/[?#]/, 1)[0];
    const fragment = original.includes('#')
      ? decodeURIComponent(original.split('#').slice(1).join('#').split('?')[0])
      : null;
    if (!target || target.startsWith('/')) continue;
    linkCount++;
    const absolute = resolve(dirname(file), decodeURIComponent(target));
    const label = relative(root, file);
    if (!absolute.startsWith(root + '/') && absolute !== root) {
      errors.push(label + ': link escapes repo: ' + original);
      continue;
    }
    if (!existsSync(absolute)) {
      errors.push(label + ': missing link target ' + original);
      continue;
    }
    if (fragment && extname(absolute).toLowerCase() === '.md') {
      const headings = [...readFileSync(absolute, 'utf8').matchAll(/^#{1,6}\s+(.+)$/gm)];
      const slugs = new Map();
      const candidates = headings.map(m => {
        const base = toSlug(m[1]);
        const prior = slugs.get(base) ?? 0;
        slugs.set(base, prior + 1);
        return prior ? base + '-' + prior : base;
      });
      if (!candidates.includes(fragment)) errors.push(label + ': unknown heading #' + fragment + ' in ' + target);
    }
  }
}

if (!existsSync(index)) errors.push('Missing docs/README.md');
else {
  validate(resolve(root, 'README.md'));
  const curated = [
    'ACCESSIBILITY.md','AGENT_ONBOARDING.md','CHEATSHEET.md','COMPATIBILITY_AND_PWA.md',
    'CONFIGURATION_AND_DEPLOYMENT.md','DEVELOPER_ONBOARDING.md','ELI5_GUIDE.md','FAQ.md',
    'FEATURE_COVERAGE.md','FRANKENCAPT_BRIDGE_REFERENCE.md','GLOSSARY.md','MAINTAINER_GUIDE.md',
    'PRIVACY_AND_ACCESS.md','QUICKSTART.md','README.md','RELEASE_AND_PROVENANCE.md',
    'REPOSITORY_AUDIT_2026-10-19.md','RESEARCH_VALIDATION.md','SAFETY_AND_EVIDENCE.md',
    'TECHNICAL_MANUAL.md','TROUBLESHOOTING.md','USER_GUIDE.md','VERIFICATION_MATRIX.md'
  ];
  const indexContent = readFileSync(index, 'utf8');
  for (const filename of curated) {
    const abs = resolve(docsRoot, filename);
    if (!existsSync(abs)) errors.push('Missing curated page ' + filename);
    else validate(abs);
    if (!indexContent.includes('](' + filename + ')') && filename !== 'README.md') {
      console.warn('WARN: not linked directly from docs index: ' + filename);
    }
  }
}
if (errors.length) {
  for (const message of errors) console.error('ERROR: ' + message);
  console.error('Docs check failed: ' + errors.length + ' errors');
  process.exitCode = 1;
} else console.log('Docs check passed: ' + seen.size + ' Markdown files, ' + linkCount + ' relative links');
