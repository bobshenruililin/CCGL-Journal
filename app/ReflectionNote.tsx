import type {Choice} from './story';

/** Optional interpretation follows the event; it never gates the next entry. */
export default function ReflectionNote({choice}: {choice: Choice}) {
 return <details className="reflection-note">
  <summary><span>A question to carry</span><span className="fold-mark" aria-hidden="true">+</span></summary>
  <div className="reflection-note-content">
   <p className="reflect-question">{choice.question}</p>
   <h2>{choice.approach}</h2>
   <div className="tradeoffs">
    <div><span>What it made possible</span><p>{choice.gain}</p></div>
    <div><span>What it asked of someone</span><p>{choice.cost}</p></div>
   </div>
  </div>
 </details>;
}
