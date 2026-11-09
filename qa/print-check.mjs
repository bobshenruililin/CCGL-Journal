import assert from 'node:assert/strict';
import { readFile, writeFile, mkdir, mkdtemp, rm } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import path from 'node:path';
import ts from 'typescript';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { journalEntries, endingParagraphs, journalText } from '../app/story.ts';

// Compile the actual print component with the project's existing TypeScript
// dependency. This tests rendered HTML without needing a browser or a new runner.
const root = path.resolve(import.meta.dirname, '..');
await mkdir(path.join(root, 'outputs'), { recursive: true });
const temporary = await mkdtemp(path.join(root, 'outputs', 'print-test-'));
const escape = value => renderToStaticMarkup(createElement('span', null, value)).slice(6, -7);
try {
 for (const filename of ['story.ts', 'PrintableJournal.tsx']) {
  const source = (await readFile(path.join(root, 'app', filename), 'utf8')).replace("from './story'", "from './story.mjs'");
  const compiled = ts.transpileModule(source, {
   fileName: filename,
   compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX },
  });
  await writeFile(path.join(temporary, filename.replace(/\.tsx?$/, '.mjs')), compiled.outputText);
 }
 const { default: PrintableJournal } = await import(pathToFileURL(path.join(temporary, 'PrintableJournal.mjs')));
 let routes = 0;
 for (let a = 0; a < 3; a++) for (let b = 0; b < 3; b++) for (let c = 0; c < 3; c++) {
  const choices = [a, b, c];
  const notes = 'My own words: <script>alert("no")</script> & a second line.\n' + 'x'.repeat(3900);
  const html = renderToStaticMarkup(createElement(PrintableJournal, { choices, notes }));
  const text = journalText(choices, notes);
  for (const entry of journalEntries(choices)) {
   for (const paragraph of [...entry.paragraphs, ...entry.choice.result, entry.choice.title, entry.choice.gain, entry.choice.cost, entry.choice.question, entry.choice.voice]) {
    assert.ok(html.includes(escape(paragraph)), 'Rendered print must retain the resolved route content');
    assert.ok(text.includes(paragraph), 'Text must retain the same route content');
   }
   assert.ok(html.includes(escape(entry.choice.speaker + '’s unspoken perspective')));
   if (entry.quotation) {
    assert.ok(html.includes(escape(entry.quotation.text)));
    assert.ok(html.includes(escape(entry.quotation.attribution)));
   }
  }
  for (const paragraph of endingParagraphs(choices)) assert.ok(html.includes(escape(paragraph)));
  assert.ok(html.includes(escape(notes)), 'Long reflections are included and escaped');
  assert.ok(!html.includes('<script>'), 'Reflection is text, never HTML');
  assert.ok(html.startsWith('<section class="print-journal" aria-hidden="true">'));
  routes++;
 }
 for (const choices of [[], [0], [2, 1]]) {
  const html = renderToStaticMarkup(createElement(PrintableJournal, { choices, notes: '' }));
  assert.ok(!html.includes('What we carried home'), 'An unfinished journal must not print an ending');
 }
 console.log(`PASS: ${routes} rendered print routes agree with text on prose, consequences, perspectives, complete quotation, endings, and escaped long notes; incomplete paths omit the ending.`);
} finally {
 await rm(temporary, { recursive: true, force: true });
}
