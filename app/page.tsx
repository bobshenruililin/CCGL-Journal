'use client';
import { useSyncExternalStore } from 'react';
import Journal from './Journal';

const subscribe = () => () => {};
export default function Home() {
  const ready = useSyncExternalStore(subscribe, () => true, () => false);
  return ready ? <Journal /> : <main className="desk" data-mood="lamp" aria-busy="true"><p className="waiting">A notebook, on a desk.</p></main>;
}
