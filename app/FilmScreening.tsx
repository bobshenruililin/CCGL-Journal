import Image from 'next/image';
import { useLayoutEffect, useRef } from 'react';

const films = {
  reflection: {
    title: 'How we made it', kind: 'Reflection film', duration: '5:25',
    poster: '/film/poster.jpg', src: '/film/six-flights-film.mp4',
    description: 'Four of us built three games for a leadership course. This is our reflection on what we learned.',
  },
  trailer: {
    title: 'Look in the Mirror', kind: 'Game trailer', duration: '0:44',
    poster: '/film/look-in-the-mirror.webp', src: '/film/look-in-the-mirror.mp4',
    description: 'Twenty-three messages. Kit still hasn’t answered.',
  },
};
const program = ['reflection', 'trailer'] as const;
type Film = keyof typeof films;
export type ScreeningView = 'choices' | Film | null;

export function FilmScreening({ view, intro, onView, onExit }: {
  view: ScreeningView;
  intro: boolean;
  onView: (view: Exclude<ScreeningView, null>) => void;
  onExit: () => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const reflection = useRef<HTMLVideoElement>(null);
  const trailer = useRef<HTMLVideoElement>(null);
  const choosing = view === 'choices';
  const selected = view === 'reflection' || view === 'trailer' ? films[view] : null;

  useLayoutEffect(() => {
    const d = dialog.current;
    if (!d) return;
    if (view !== 'reflection') reflection.current?.pause();
    if (view !== 'trailer') trailer.current?.pause();
    if (view && !d.open) d.showModal();
    if (!view && d.open) d.close();
  }, [view]);

  function watch(id: Film) {
    const player = id === 'reflection' ? reflection.current : trailer.current;
    if (!player) return;
    // Keep each film's playhead, but request its media only on a viewer's gesture.
    if (!player.hasAttribute('src')) player.src = films[id].src;
    onView(id);
    void player.play().catch(() => { /* The native play button is available if playback is blocked. */ });
    requestAnimationFrame(() => {
      if (dialog.current?.open && !player.hidden) player.focus({ preventScroll: true });
    });
  }

  function backToFilms() {
    if (view !== 'reflection' && view !== 'trailer') return;
    const previous = view;
    onView('choices');
    requestAnimationFrame(() => dialog.current?.querySelector<HTMLButtonElement>(`[data-film="${previous}"]`)?.focus({ preventScroll: true }));
  }

  return (
    <dialog ref={dialog} className="filmdialog" aria-labelledby="film-title" onCancel={event => {
      event.preventDefault();
      if (selected) backToFilms(); else onExit();
    }}>
      <div className="screening-head">
        <p className="screening-series">{selected ? `${selected.kind} · ${selected.duration}` : 'Six Flights'}</p>
        <h2 id="film-title">{selected ? selected.title : intro ? 'Before you open the notebook' : 'The films'}</h2>
      </div>
      {choosing && (
        <div className="screening-program">
          {program.map(id => {
            const film = films[id];
            return (
              <button type="button" className="screening-choice" data-film={id} key={id}
                aria-label={`Watch ${film.kind.toLowerCase()}: ${film.title} (${film.duration})`} onClick={() => watch(id)}>
                <span className="screening-poster">
                  <Image src={film.poster} alt="" width={id === 'reflection' ? 1280 : 960} height={id === 'reflection' ? 720 : 540} loading="eager" unoptimized />
                  <span className="screening-play" aria-hidden="true" />
                </span>
                <span className="screening-caption">
                  <span className="screening-meta"><span>{film.kind}</span><span>{film.duration}</span></span>
                  <span className="screening-name">{film.title}</span>
                  <span className="screening-description">{film.description}</span>
                </span>
              </button>
            );
          })}
        </div>
      )}
      <div className="screening-player" hidden={!selected}>
        <video ref={reflection} hidden={view !== 'reflection'} poster={view === 'reflection' ? films.reflection.poster : undefined}
          controls preload="none" playsInline tabIndex={0} aria-label="How we made it, our reflection film" />
        <video ref={trailer} hidden={view !== 'trailer'} poster={view === 'trailer' ? films.trailer.poster : undefined}
          controls preload="none" playsInline tabIndex={0} aria-label="Look in the Mirror, our game trailer">
          {view === 'trailer' && <track kind="captions" src="/film/look-in-the-mirror.en.vtt" srcLang="en" label="English" />}
        </video>
      </div>
      <div className="screening-actions acts">
        {selected && <button className="screening-back" type="button" onClick={backToFilms}>← Back to the films</button>}
        <button className="screening-enter" type="button" onClick={onExit}>
          {intro ? 'Enter the game' : 'Back to the notebook'} <span aria-hidden="true">→</span>
        </button>
      </div>
    </dialog>
  );
}
