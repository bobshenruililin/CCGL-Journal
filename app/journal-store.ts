import {type Save, initial, isSave} from './state.ts';

export const journalKey = 'six-flights-v2';
type Storage = Pick<globalThis.Storage, 'getItem' | 'setItem'>;
export type JournalSnapshot = {state: Save; saveOK: boolean; hasSaved: boolean};

/** One notebook per mounted reader. Merely opening it never overwrites a save. */
export function createJournalStore(getStorage: () => Storage) {
 let snapshot: JournalSnapshot = {state: {...initial}, saveOK: true, hasSaved: false};
 try {
  const raw = getStorage().getItem(journalKey);
  if (raw) {
   const saved: unknown = JSON.parse(raw);
   if (isSave(saved)) snapshot = {...snapshot, state: saved, hasSaved: true};
  }
 } catch {
  snapshot = {...snapshot, saveOK: false};
 }
 const listeners = new Set<() => void>();
 return {
  getSnapshot: () => snapshot,
  subscribe(listener: () => void) {
   listeners.add(listener);
   return () => { listeners.delete(listener); };
  },
  update(change: (state: Save) => Save) {
   const state = change(snapshot.state);
   if (state === snapshot.state) return;
   let saveOK = true;
   try { getStorage().setItem(journalKey, JSON.stringify(state)); }
   catch { saveOK = false; }
   snapshot = {state, saveOK, hasSaved: saveOK};
   for (const listener of listeners) listener();
  },
 };
}
