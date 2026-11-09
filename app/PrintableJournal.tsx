import { endingParagraphs, journalEntries } from './story';

export default function PrintableJournal({ choices, notes }: { choices: number[]; notes: string }) {
 const entries = journalEntries(choices);
 const ending = endingParagraphs(choices);
 return <section className="print-journal" aria-hidden="true">
  <h1>CCGL Journal</h1>
  <p className="print-subtitle">The things we carry · My path</p>
  {entries.map((entry, i) => <section key={i}>
   <h2>{entry.date} — {entry.title}</h2>
   {entry.paragraphs.map((paragraph, j) => <p key={`entry-${j}`}>{paragraph}</p>)}
   <h3>I chose: {entry.choice.title}</h3>
   {entry.choice.result.map((paragraph, j) => <p key={j}>{paragraph}</p>)}
   {entry.quotation && <aside>
    <h3>From the interview notes</h3>
    <p>“{entry.quotation.text}”</p>
    <p><i>{entry.quotation.attribution}. {entry.quotation.caption}</i></p>
   </aside>}
   <aside>
    <h3>{entry.choice.speaker}’s unspoken perspective</h3>
    <p>“{entry.choice.voice}”</p>
   </aside>
   <p><b>What it made possible:</b> {entry.choice.gain}</p>
   <p><b>What it asked of someone:</b> {entry.choice.cost}</p>
   <p><i>{entry.choice.question}</i></p>
  </section>)}
  {ending.length > 0 && <section>
   <h2>What we carried home</h2>
   {ending.map((paragraph, i) => <p key={i}>{paragraph}</p>)}
  </section>}
  <section>
   <h2>Something I want to try</h2>
   <p className="printed-notes">{notes || 'Leave yourself a thought here.'}</p>
  </section>
  <footer>Original fiction · A reflection on choices, not a personality assessment · CCGL Journal</footer>
 </section>;
}
