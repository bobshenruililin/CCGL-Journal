/**
 * SIX FLIGHTS — the whole story, resolved from the three things Yan decides.
 *
 * Everything the notebook shows (screen, print and text export) is derived here,
 * so one route can never be told two ways. No style names, scores or morals are
 * stored: a route is only what was said on Monday, Wednesday and Friday.
 */

export type Mon = 'self' | 'post' | 'find';
export type Wed = 'cut' | 'aside' | 'round';
export type Fri = 'self' | 'ask' | 'name';
export type Route = { mon?: Mon; wed?: Wed; fri?: Fri };
export type FullRoute = { mon: Mon; wed: Wed; fri: Fri };
export type Who = 'yan' | 'kit' | 'priya' | 'tomas' | 'leung';
export type EndingId = 'tarp' | 'sheet' | 'leung' | 'half';
export type Light = 'lit' | 'pale' | 'absent';

export const MON: readonly Mon[] = ['self', 'post', 'find'];
export const WED: readonly Wed[] = ['cut', 'aside', 'round'];
export const FRI: readonly Fri[] = ['self', 'ask', 'name'];

export const title = 'Six Flights';

export const cast: Record<Exclude<Who, 'yan'>, { name: string; note: string }> = {
  kit: { name: 'Kit', note: 'First-year. The projector is his. Knows it like a pet. Hasn’t answered a message in five days.' },
  priya: { name: 'Priya', note: 'Final year. Money, posters, opinions. Usually right. Always first.' },
  tomas: { name: 'Tomás', note: 'On exchange from Valparaíso. Says yes before you’ve finished asking.' },
  leung: { name: 'Mrs Leung', note: 'Has the roof key. Has had it since 1998.' },
};

export const inside = {
  programme: ['ROOFTOP CINEMA', 'Hillside Hall', 'LAST SCREENING OF TERM', 'Friday · 7 pm · the roof', 'six flights up — the lift is out, sorry', 'bring a jumper'],
  plate: 'If found: Yan, room 614',
  note: [
    'Marcus ran the roof screenings for two years. Three weeks ago he left for Toronto, and I got a ring of keys and this notebook.',
    'I draw things. I have never been in charge of anything.',
  ],
  plan: 'the roof, as inherited',
};

/* ───────────── Monday ───────────── */

export const monday = {
  heading: 'Monday, 11:10 pm',
  paragraphs: [
    'Four days to the last screening. Kit has the projector, the cables and the only checklist, and Kit has not answered a message since Wednesday.',
    'Twenty-three messages. Two blue ticks. Nothing. His room is one floor below mine.',
    'The machine is in the store cupboard on the second floor. I have the key.',
  ],
  lead: 'I keep thinking',
  thoughts: {
    self: 'I’ll test it myself. Tonight.',
    post: 'Ask the group who can cover his jobs.',
    find: 'He lives one floor down. Go and knock.',
  } satisfies Record<Mon, string>,
};

export type Message = { who: Who | 'system'; time?: string; text: string };

export function mondayAfter(mon: Mon) {
  if (mon === 'self') return {
    kind: 'self' as const,
    heading: 'Tuesday, 1:40 am · second-floor common room',
    before: ['I carried it down myself. It is heavier than it looks.', 'Kit’s checklist is taped inside the lid. Six lines, in pencil.'],
    checklist: ['lamp', 'focus', 'sound, left + right', 'HDMI — the GREY one', 'spare bulb in the lid', 'vent — ask me'],
    after: [
      'Five out of six. The picture came up on the common-room wall, a bit crooked, and stayed there.',
      '“Ask me.” Right.',
      'It works. I didn’t need him. I wrote that down and it looks worse than I meant it.',
    ],
    paste: { who: 'kit' as Who, label: 'Kit · 8:02 am', text: 'saw you did the test. thanks. sorry.' },
  };
  if (mon === 'post') return {
    kind: 'post' as const,
    heading: 'Monday, 11:24 pm · the group chat',
    messages: [
      { who: 'yan', time: '11:24', text: 'Kit’s jobs for Friday aren’t covered: projector, cables, sound. Can people say what they can take?' },
      { who: 'priya', time: '11:26', text: 'Sound. Should have been reassigned a week ago, honestly.' },
      { who: 'tomas', time: '11:31', text: 'I can do projector!! Never touched one. YouTube exists, no?' },
      { who: 'yan', time: '11:40', text: 'Great. Thank you both.' },
      { who: 'kit', time: '1:52', text: 'sorry. take me off the list.' },
      { who: 'system', text: 'Kit left the group' },
    ] as Message[],
    after: [
      'By midnight every job had a name beside it. At 1:52 there was one name fewer.',
      'Twenty-three messages to him. Then one about him, in front of everybody.',
    ],
  };
  return {
    kind: 'find' as const,
    heading: 'Monday, 11:40 pm · fifth floor, room 509',
    before: ['The corridor light is on a timer, and it gave up before I reached his door. There is a line of yellow under it.'],
    after: [
      'He opened on the third knock, holding a chemistry textbook like a tray.',
      'He failed the midterm. His scholarship has a number attached to it. He said every message he didn’t open made the next one heavier.',
      'I had nothing useful to say, so I asked whether the projector was all right.',
      'He laughed, properly, and took my pen.',
    ],
    drawing: 'prop the vent open (chopstick) or it cuts out after 40 min. — K',
    paste: { who: 'priya' as Who, label: 'stuck to my door, Tuesday', text: 'Licence form was due at MIDNIGHT. Sent it myself, 12:40. You said you had it. — P' },
    after2: ['I did say that. At midnight I was outside room 509.'],
  };
}

/* ───────────── Wednesday ───────────── */

export function wednesday(mon: Mon) {
  return {
    heading: 'Wednesday, 6:15 pm · the roof',
    paragraphs: [
      'Walk-through. Mrs Leung let us up and stayed by the door with the key in her fist, which is how she tells the time.',
      {
        self: 'Kit sent a thumbs-up to the time and didn’t come.',
        post: 'Tomás has brought the projector manual, printed, with tabs.',
        find: 'Kit came. He’s by the stairwell socket, measuring a cable against his arm.',
      }[mon],
    ],
    priya: '—doors at half six, intro at seven SHARP, I’ve cut the interval, nobody needs an interval, speakers go HERE, and the screen faces the harbour because of the light, and—',
    tomas: ['sorry, the forec—', 'should I— the fore—', 'it’s only that—'],
    close: 'Tomás has started the same sentence three times. Priya is, as usual, mostly right.',
    lead: 'I could',
    thoughts: {
      cut: '“Priya. Stop. Tomás — finish your sentence.”',
      aside: 'Let her finish. Catch him on the stairs.',
      round: '“Before we go down: one worry each. No replies.”',
    } satisfies Record<Wed, string>,
  };
}

export type Slip = { who: Who; text: string };
const forecast = 'There’s an amber rain warning for Friday evening.';

export function wednesdayAfter(mon: Mon, wed: Wed) {
  if (wed === 'cut') return {
    kind: 'cut' as const,
    heading: 'Wednesday, 6:20 pm',
    before: ['It came out louder than I meant. For a second the only sound was the drying racks.'],
    tomas: forecast + ' Sorry. I checked three apps.',
    after: [
      'So now everyone knows. We booked the second-floor common room as a fallback before we left the roof. It took four minutes.',
      'Priya didn’t say another word up there. Her running order arrived at eleven.',
    ],
    paste: { who: 'priya' as Who, label: 'Priya · 11:02 pm', text: 'Running order attached. As instructed. — P' },
  };
  if (wed === 'aside') return {
    kind: 'aside' as const,
    heading: 'Wednesday, 6:50 pm · fourth-floor landing',
    before: [
      '“' + forecast + '” Tomás said it mostly to my shoulder. “I didn’t want to interrupt.”',
      'I said thank you. I said I’d sort it.',
    ],
    listTitle: 'Mine, before Friday:',
    list: [
      { self: 'find out what “vent” means', post: 'teach Tomás the projector (how?)', find: 'say sorry to Priya about the form' }[mon],
      'rain plan',
      'book the common room',
      'a tarp — where does one get a tarp',
      'tell Priya about the rain (find a moment)',
    ],
    after: ['Four people stood on that roof tonight and one of them knows it’s going to rain. I’ve decided that’s fine.'],
  };
  const third: Slip = {
    self: { who: 'yan' as Who, text: 'I don’t know what “vent — ask me” means, and I haven’t asked.' },
    post: { who: 'yan' as Who, text: 'Our projectionist has never used a projector. (Sorry, Tomás.)' },
    find: { who: 'kit' as Who, text: 'The extension lead is 10 m short of the stairwell socket.' },
  }[mon];
  return {
    kind: 'round' as const,
    heading: 'Wednesday, 6:25 pm',
    before: ['I tore slips from the back of this notebook. One worry each, written down, no replies. Priya said it was a waste of the light, then wrote for longer than anyone.'],
    slips: [
      { who: 'tomas', text: 'Amber rain warning, Friday evening. I checked three apps.' },
      { who: 'priya', text: 'We are $340 over. I have been covering it since October. I didn’t know how to bring it up.' },
      third,
      { who: 'leung', text: 'Six flights. My knees. Out by ten, please.' },
    ] as Slip[],
    after: [
      'Tomás took the rain. Priya’s $340 goes in Friday’s hat. Mrs Leung gets her ten o’clock, in writing.' + (mon === 'find' ? ' Kit is borrowing ten metres of cable from the lab.' : ''),
      'By the time we’d read them the sun had gone and the key was jingling. We never tested the sound.',
    ],
  };
}

/* ───────────── Thursday: twenty-four chairs ───────────── */

export const CHAIRS = 24;
export function helpers(route: Route): Exclude<Who, 'yan' | 'leung'>[] {
  const list: Exclude<Who, 'yan' | 'leung'>[] = [];
  if (route.mon === 'find') list.push('kit');
  if (route.wed !== 'cut') list.push('priya');
  if (route.mon !== 'post') list.push('tomas');
  return list;
}
export function trips(route: Route): number { return Math.ceil(CHAIRS / (4 * (1 + helpers(route).length))); }

export function thursday(route: Route) {
  const who = helpers(route);
  const n = trips(route);
  const missing: string[] = [];
  if (route.mon === 'self') missing.push('Nobody asked Kit. I noticed that on the second floor.');
  if (route.mon === 'post') missing.push('Kit’s name is still on the chair rota. I haven’t crossed it out.', 'Tomás is in the common room with the projector and a video called PROJECTOR BASICS (2011).');
  if (route.wed === 'cut') missing.push('Priya has a tutorial. She said.');
  const with_: Record<string, string> = {
    kit: 'Kit takes the stairs two at a time and says nothing until the fourth floor. Then: “Thanks for knocking.”',
    priya: 'Priya carries six at once to make a point. The point is made.',
    tomas: 'Tomás sings on the way up. It helps slightly.',
  };
  const last = 'Twenty-four. Mrs Leung held the roof door open with her foot and pretended she wasn’t.';
  let lines: string[];
  if (who.length === 0) lines = [
    'Four chairs. Fine.',
    'Eight. The third-floor landing smells of somebody’s instant noodles.',
    'Twelve. I have discovered a new muscle.',
    'Sixteen.',
    'Twenty. I’ve stopped counting floors and started counting breaths.',
    'Twenty-four. I lay down on the roof for a while. Mrs Leung stepped over me to lock up.',
  ];
  else {
    const mid = who.map(w => with_[w]);
    const slots = n - 1;
    const body: string[] = [];
    for (let i = 0; i < slots; i++) body.push(i < slots - 1 ? mid[i] ?? 'Sixteen. My arms have opinions.' : mid.slice(i).join(' ') || 'Sixteen. My arms have opinions.');
    lines = [...body, last];
  }
  return {
    heading: 'Thursday, 5:00 pm · the stairs',
    paragraphs: ['Twenty-four folding chairs. Six flights. The lift has had a sign on it since October.', ...missing],
    helpers: who, trips: n, perTrip: CHAIRS / n, lines,
  };
}

/* ───────────── Friday, 6:50 ───────────── */

export function friday(mon: Mon, wed: Wed) {
  return {
    heading: 'Friday, 6:50 pm · the roof',
    paragraphs: [
      'The picture just went. There was a countdown on the screen, then the fan made a sound like a sigh, and now there’s a white sheet and a dark roof.',
      'A drop on my hand. Another on this page.',
      'Forty people are queuing down six flights and I can hear every one of them.',
      {
        find: 'Kit is kneeling by the projector with his hands off it, waiting.',
        self: 'Kit did come. He’s at the back by the water tank with his hood up, like a guest.',
        post: 'Tomás has one hand on the projector, the way you’d touch a strange dog.',
      }[mon],
      {
        cut: 'Priya is holding the cashbox and looking at me. Only at me.',
        aside: 'Tomás looks at the sky, then at me, and says nothing. He’s waiting for me to say it.',
        round: 'Tomás is already looking at the sky. Rain was his slip.',
      }[wed],
      'Everyone is looking at me. Apparently this is what the keys were for.',
    ],
    lead: 'I say',
    thoughts: {
      self: '“Give it here. I’ll fix it.”',
      ask: '“Quick — what does everyone think?”',
      name: '“One job each. Back here in five.”',
    } satisfies Record<Fri, string>,
  };
}

/** Was the machine running within five minutes? Only someone who knows the vent can do that. */
export function fixedFast(r: FullRoute): boolean {
  if (r.mon === 'find') return r.fri !== 'ask' || r.wed === 'round';
  if (r.mon === 'self') return r.fri === 'name';
  return false;
}
/** Did anybody look after forty people and the rain while the machine was down? */
export function crowdHeld(r: FullRoute): boolean { return r.fri === 'name' || r.wed === 'round'; }

export function ending(r: FullRoute): EndingId {
  if (crowdHeld(r)) return fixedFast(r) ? 'tarp' : 'sheet';
  return r.fri === 'ask' ? 'leung' : 'half';
}

export const endings: Record<EndingId, { title: string; when: string; line: string }> = {
  tarp: { title: 'Under the Tarp', when: '7:05 pm · the roof', line: 'Rain on the tarp all through the second reel. Nobody left.' },
  sheet: { title: 'The Bedsheet Screening', when: '7:15 pm · second-floor common room', line: 'Forty people on the floor, watching a bedsheet. Somebody’s sock was still pegged to one corner.' },
  leung: { title: 'Mrs Leung’s Orders', when: '7:20 pm · second-floor common room', line: 'She said it once, not loudly, and forty people went. I keep thinking about how she did that.' },
  half: { title: 'Half a Queue', when: '7:40 pm · the roof, after the rain', line: 'Nineteen stayed. I counted from behind the projector, which is where I was for all of it.' },
};
export const endingIds = Object.keys(endings) as EndingId[];

export function fridayAfter(r: FullRoute): { heading: string; paragraphs: string[]; jobs: { who: Who; job: string }[] } {
  const { mon, wed, fri } = r;
  const p: string[] = [];
  let jobs: { who: Who; job: string }[] = [];
  if (fri === 'self') {
    p.push('I knelt down in front of it.');
    p.push({
      find: 'Kit’s drawing was a few pages back. I had the chopstick under the vent before he’d finished standing up. The fan caught at 6:53. He sat back on his heels and put his hands in his pockets.',
      self: 'Lamp, focus, sound, grey cable, spare bulb: I could check those with my eyes shut, and did. The sixth line was the vent. It took me eleven minutes and a burnt thumb to find out what Kit could have told me in one sentence. He was ten metres away.',
      post: 'I took it off Tomás. I pressed things. I unplugged it and plugged it in again, twice. After fourteen minutes the fan started by itself, and I will never know what I did.',
    }[mon]);
    if (wed === 'round') {
      p.push(mon === 'find'
        ? 'When I looked up, Tomás and Priya had a tarp strung between the drying racks and the queue was filing in under it. Nobody had told them to. Rain was his slip; he’d written it himself.'
        : 'When I looked up, the roof was empty. Tomás had moved the whole queue down to the common room, six at a time, and Priya had pinned a bedsheet to the wall. Nobody had told them to. Rain was his slip. We carried the projector down to them.');
      jobs = [{ who: 'yan', job: 'projector' }, { who: 'tomas', job: 'the rain' }, { who: 'priya', job: mon === 'find' ? 'the tarp' : 'the bedsheet' }];
    } else {
      p.push(wed === 'cut'
        ? 'Nobody had moved the queue. There was a plan — we made it on Wednesday, and Priya knew it by heart. She stood there with the cashbox and waited to be instructed.'
        : 'The rain plan was in my head, and my head was inside a projector. Tomás knew too. He watched the sky and waited for me to say it.');
      p.push(mon === 'find'
        ? 'Then it came down properly, on twenty-four chairs and one uncovered machine, and I stood holding my jacket over the lens until it passed.'
        : 'It rained on twenty-four chairs while I worked. I wiped them down afterwards with my jumper.');
      jobs = [{ who: 'yan', job: 'projector' }, { who: 'yan', job: 'the rain' }, { who: 'yan', job: 'the chairs' }, { who: 'yan', job: 'the queue' }];
    }
  } else if (fri === 'ask') {
    p.push('Everyone thought. Out loud, at once.');
    if (wed === 'round') {
      p.push('Then Priya, of all people, said: “Slips. One line each.” We went round the way we did on Wednesday. It took ninety seconds, because we had done it before.');
      if (mon === 'find') {
        p.push('Kit said, “It’s the vent.” Everybody stopped. He went and propped it open, and the fan caught.', 'Tomás: tarp. Priya: queue. Me: chairs. Nobody assigned those; they were just what was left when each of us stopped talking.');
        jobs = [{ who: 'kit', job: 'the vent' }, { who: 'tomas', job: 'the tarp' }, { who: 'priya', job: 'the queue' }, { who: 'yan', job: 'the chairs' }];
      } else {
        p.push(mon === 'self'
          ? 'Nobody in the circle knew what was wrong with the machine. Kit wasn’t in the circle. He was by the water tank with his hood up.'
          : 'Nobody in the circle knew what was wrong with the machine. The one person who would have was not on the roof.',
          'So: everything downstairs, and let the thing cool. Tomás took the queue. Priya took a bedsheet off the drying rack.');
        jobs = [{ who: 'tomas', job: 'the queue' }, { who: 'priya', job: 'the bedsheet' }, { who: 'yan', job: 'the projector, carried' }];
      }
    } else {
      p.push('Priya: everything downstairs, now. Tomás: wait ten minutes, it might pass. ' + {
        find: 'Kit: “It’s the vent,” four times, each one quieter.',
        self: 'Kit, at the back, opened his mouth and shut it again.',
        post: 'Tomás again: maybe the manual, he has tabs.',
      }[mon]);
      p.push('By 7:04 we had three plans and the queue could hear all of them.');
      p.push('Then Mrs Leung, from the door, not loudly: “Children. Downstairs. Now.” Forty people turned round on the stairs. So did we.');
      jobs = [{ who: 'leung', job: '“Downstairs. Now.”' }];
    }
  } else {
    const rain = wed === 'aside' ? 'the tarp from the store cupboard, and the common-room key — it’s booked' : 'the tarp, then the common-room key in case';
    p.push({
      find: '“Kit: projector. Priya: the queue. Tell them ten minutes and make it sound deliberate. Tomás: ' + rain + '. Back here in five.”',
      self: '“Kit.” He looked up from inside his hood. “Projector. Please.” He was across the roof before I’d finished the word. “Priya: the queue. Tell them ten minutes and make it sound deliberate. Tomás: ' + rain + '. Back here in five.”',
      post: '“Tomás: projec— no. Tomás: ' + rain + '. Priya: the queue. Tell them ten minutes and make it sound deliberate. The projector’s mine. Back here in five.”',
    }[mon]);
    p.push({
      cut: '“As instructed,” Priya said. But she was already moving, and she was nearly smiling.',
      aside: '“There’s a rain plan?” Priya said. “Since when?” Since Wednesday, I said. On the stairs. She gave me a look I am going to be thinking about, and went.',
      round: 'Tomás was gone before I got to his name. Rain was already his.',
    }[wed]);
    p.push('Nobody argued. I had expected somebody to.');
    p.push({
      find: 'Kit had the vent propped in under a minute. At 7:05 the countdown came back up, under a tarp, in the rain. Somebody on the stairs cheered.',
      self: 'Kit took a chopstick out of his own pocket and had the vent propped in under a minute. He had brought it with him. At 7:05 the countdown came back up, under a tarp, in the rain.',
      post: 'I pressed things for a while. The fan came back at 7:12 on its own, once it had cooled. By then there was a bedsheet on the common-room wall and forty people on the floor in front of it.',
    }[mon]);
    jobs = [
      { who: mon === 'post' ? 'yan' : 'kit', job: 'projector' },
      { who: 'priya', job: 'the queue' },
      { who: 'tomas', job: mon === 'post' ? 'the common room' : 'the tarp' },
      ...(mon === 'post' ? [] : [{ who: 'yan' as Who, job: 'the chairs' }]),
    ];
  }
  return { heading: 'Friday, 6:51 pm', paragraphs: p, jobs };
}

/* ───────────── The night, and who is in colour ───────────── */

/** Colour in the last painting is not a score. It is who had something of their own to carry that night. */
export function lights(r: FullRoute): Record<Exclude<Who, 'yan'>, Light> {
  const e = ending(r);
  const shared = r.fri === 'name' || r.wed === 'round';
  const kit: Light = r.mon === 'post' ? 'absent'
    : r.fri === 'name' || (r.mon === 'find' && r.fri === 'ask' && r.wed === 'round') ? 'lit' : 'pale';
  return {
    kit,
    priya: shared ? 'lit' : 'pale',
    tomas: shared ? 'lit' : 'pale',
    leung: e === 'half' ? 'pale' : 'lit',
  };
}

export function night(r: FullRoute) {
  const id = ending(r);
  return {
    id, ...endings[id],
    venue: id === 'tarp' || id === 'half' ? 'roof' as const : 'room' as const,
    lights: lights(r),
    aside: r.wed === 'round' ? 'The left speaker hummed all night. We never did test the sound.' : null,
  };
}

/* ───────────── Saturday: the notebook goes round ───────────── */

export type Entry = { who: Who; text: string; label?: string; kind: 'hand' | 'text' };

export function saturday(r: FullRoute): { heading: string; opening: string[]; entries: Entry[]; unsent: string | null } {
  const { mon, wed, fri } = r;
  const e = ending(r);
  const kit: Entry = mon === 'post'
    ? { who: 'kit', kind: 'text', label: 'Kit · 10:14 am', text: 'heard it went ok. glad. sorry again.' }
    : { who: 'kit', kind: 'hand', text: mon === 'find'
      ? fri === 'name' ? 'You knocked. Then on Friday you said my name like it was obvious I’d be there. Both of those. (Vent’s fine. I checked twice.) — K'
        : fri === 'self' ? 'I drew you the vent so you’d know. I didn’t think it meant you wouldn’t need me. It worked, though. It’s ok. — K'
        : wed === 'round' ? 'I said “vent” and everybody stopped talking. That has never happened to me before. — K'
        : 'I said “it’s the vent” four times. I counted. — K'
      : fri === 'name' ? 'I only came on Friday to give back the cupboard key. Then you said “Kit. Projector. Please.” I’d been waiting since Monday for somebody to need something. — K'
        : 'You tested it without me and it worked. I keep meaning to say thank you and I keep meaning to say something else. — K' };
  const priya: Entry = { who: 'priya', kind: 'hand', text: wed === 'cut'
    ? fri === 'name' ? 'Wednesday you shut me up in front of a first-year and I was furious until Friday, 6:51 pm, when you did the same thing to all of us and it was correct. Work out the difference. I’m still working on it. — P'
      : 'I did the running order. I did the cashbox. I’d have done the rain plan too. Nobody instructed me to. — P'
    : wed === 'aside'
      ? fri === 'name' ? 'You knew about the rain for TWO DAYS. I have a tarp guy. Tell me things. (Friday, though. Fine. Good.) — P'
        : 'You knew about the rain for TWO DAYS? I have a tarp guy. I’d have had it sorted by Thursday lunch. — P'
      : fri === 'ask' ? 'The slips again. On a roof. In the rain. I suggested it myself and I’m disgusted. It worked twice. — P'
        : '$340. I carried that for a month and it took one slip of paper. Don’t make it a ritual, we’ll never finish a meeting. Do it sometimes. — P' };
  const tomas: Entry = { who: 'tomas', kind: 'hand', text: mon === 'post'
    ? fri === 'self' ? 'I had the projector for four days and then for zero minutes. You were right to take it! I think. I would like to learn it properly. Maybe from Kit. — T'
      : fri === 'name' ? 'I had a projector for four days. On Friday you gave me the rain instead, and that was the right swap. I kept Kit’s name on the lid. — T'
      : 'I had a projector for four days and a manual with tabs, and when it stopped I didn’t know one useful thing. I kept Kit’s name on the lid. — T'
    : wed === 'cut' ? 'Nobody ever stopped a meeting for me before. I was so embarrassed I nearly forgot the forecast. Priya didn’t look at me for two days. Worth it? I think yes? — T'
    : wed === 'aside'
      ? fri === 'name' ? 'On the stairs I gave you my worry and you carried it for me. On Friday you gave me a job and I carried that. I liked Friday better. — T'
        : 'I told you on the stairs because it was easier. Then on Friday I knew about the rain and I still waited for you to say it. I think I learned the wrong thing. — T'
      : fri === 'name' ? 'On Friday you gave me the rain. I’d had it since Wednesday (my slip!) but it was nice to be given it. — T'
        : 'My slip was my job. Nobody had to tell me on Friday. I just went. — T' };
  const leung: Entry = { who: 'leung', kind: 'hand', text: {
    tarp: 'Twenty-six years I have opened that door. This is the first time anybody kept a chair for me. I saw that film when I was nine years old. I did not tell you. — Leung',
    sheet: 'The common room is not for films. I sat at the back and I did not see anything. It was very funny, the part I did not see. — Leung',
    leung: 'Somebody had to say it, and I do not mind. But the key is my job. The saying is yours. — Leung',
    half: 'I watched you mend that machine in the rain with nobody holding an umbrella. Clever girl. Next time, ask for the umbrella. — Leung',
  }[e] };
  return {
    heading: 'Saturday, 10 am · the roof',
    opening: ['Chairs go down easier than they go up.', 'Priya took the notebook out of my hands. “Give it. You’re not the only one who was there.”'],
    entries: [priya, tomas, kit, leung],
    unsent: mon === 'post' ? 'Four replies typed, none sent. The one I mean: “One floor down. I’m coming.”' : null,
  };
}

export function lastPage(r: FullRoute) {
  return {
    heading: 'Saturday, later',
    paragraphs: [
      'Marcus left me a ring of keys and forty blank pages. I thought the pages were for me.',
      {
        tarp: 'There’s a list going round for next term: who wants which job. Kit’s name is on it twice.',
        sheet: 'Mrs Leung says the roof is ours next term if we’re out by ten. She says the common room never happened.',
        leung: 'Next term, before I open my mouth, I want to know who does what if it rains. Mrs Leung has offered to teach me the voice.',
        half: 'Next term I’d like to see the film.',
      }[ending(r)],
    ],
    prompt: 'There is one line left on this page. It’s yours.',
  };
}

/* ───────────── Structure of the book ───────────── */

export const spreads = ['cover', 'inside', 'mon', 'monAfter', 'wed', 'wedAfter', 'thu', 'fri', 'friAfter', 'night', 'sat', 'last'] as const;
export type SpreadId = typeof spreads[number];
export const tabs: { id: SpreadId; label: string }[] = [
  { id: 'mon', label: 'Mon' }, { id: 'wed', label: 'Wed' }, { id: 'thu', label: 'Thu' }, { id: 'fri', label: 'Fri' }, { id: 'sat', label: 'Sat' },
];
export const moods: Record<SpreadId, string> = {
  cover: 'lamp', inside: 'lamp', mon: 'night', monAfter: 'night', wed: 'dusk', wedAfter: 'dusk', thu: 'day', fri: 'storm', friAfter: 'storm', night: 'dark', sat: 'morning', last: 'morning',
};

export function isFull(r: Route): r is FullRoute { return !!(r.mon && r.wed && r.fri); }

/** The things the reader does with their hands. Each has a number of steps that depends on the route. */
export type BeatId = 'knock' | 'ticks' | 'msgs' | 'slips' | 'chairs' | 'lamp' | 'pass';
export const beatHome: Record<BeatId, SpreadId> = { knock: 'monAfter', ticks: 'monAfter', msgs: 'monAfter', slips: 'wedAfter', chairs: 'thu', lamp: 'night', pass: 'sat' };
export function beatFor(id: SpreadId, r: Route): { beat: BeatId; steps: number } | null {
  if (id === 'monAfter') return r.mon === 'find' ? { beat: 'knock', steps: 3 } : r.mon === 'self' ? { beat: 'ticks', steps: 5 } : r.mon === 'post' ? { beat: 'msgs', steps: 5 } : null;
  if (id === 'wedAfter') return r.wed === 'round' ? { beat: 'slips', steps: 4 } : null;
  if (id === 'thu') return { beat: 'chairs', steps: trips(r) };
  if (id === 'night') return { beat: 'lamp', steps: 1 };
  if (id === 'sat') return { beat: 'pass', steps: 4 };
  return null;
}
/** Which decision a spread asks for, if any. */
export const choiceAt: Partial<Record<SpreadId, keyof Route>> = { mon: 'mon', wed: 'wed', fri: 'fri' };
/** What must already be decided for a spread to exist. */
export function needs(id: SpreadId): (keyof Route)[] {
  const i = spreads.indexOf(id);
  return [i > 2 ? 'mon' : null, i > 4 ? 'wed' : null, i > 7 ? 'fri' : null].filter(Boolean) as (keyof Route)[];
}

/* ───────────── Plain text of one reader's notebook ───────────── */

const names: Record<Who, string> = { yan: 'Yan', kit: 'Kit', priya: 'Priya', tomas: 'Tomás', leung: 'Mrs Leung' };
export const whoName = (w: Who) => names[w];

export type Section = { heading: string; lines: string[] };
export function journalSections(route: Route): Section[] {
  const out: Section[] = [{ heading: 'Inside the cover', lines: [inside.programme.join(' · '), ...inside.note, ...Object.values(cast).map(c => c.name + ': ' + c.note)] }];
  const { mon, wed, fri } = route;
  out.push({ heading: monday.heading, lines: [...monday.paragraphs, ...(mon ? ['I wrote: ' + monday.thoughts[mon]] : [])] });
  if (!mon) return out;
  const ma = mondayAfter(mon);
  out.push({ heading: ma.heading, lines: ma.kind === 'self'
    ? [...ma.before, 'Kit’s checklist: ' + ma.checklist.join('; '), ...ma.after, ma.paste.label + ': ' + ma.paste.text]
    : ma.kind === 'post' ? [...ma.messages.map(m => m.who === 'system' ? '[' + m.text + ']' : names[m.who] + ' (' + m.time + '): ' + m.text), ...ma.after]
    : [...ma.before, ...ma.after, 'Kit drew the projector, and wrote: ' + ma.drawing, 'Priya, ' + ma.paste.label + ': ' + ma.paste.text, ...ma.after2] });
  const w = wednesday(mon);
  out.push({ heading: w.heading, lines: [...w.paragraphs, 'Priya: ' + w.priya, 'Tomás: ' + w.tomas.join(' … '), w.close, ...(wed ? ['I wrote: ' + w.thoughts[wed]] : [])] });
  if (!wed) return out;
  const wa = wednesdayAfter(mon, wed);
  out.push({ heading: wa.heading, lines: wa.kind === 'cut' ? [...wa.before, 'Tomás: ' + wa.tomas, ...wa.after, wa.paste.label + ': ' + wa.paste.text]
    : wa.kind === 'aside' ? [...wa.before, wa.listTitle, ...wa.list.map(l => '— ' + l), ...wa.after]
    : [...wa.before, ...wa.slips.map(s => names[s.who] + '’s slip: ' + s.text), ...wa.after] });
  const th = thursday(route);
  out.push({ heading: th.heading, lines: [...th.paragraphs, ...th.lines] });
  const f = friday(mon, wed);
  out.push({ heading: f.heading, lines: [...f.paragraphs, ...(fri ? ['I said: ' + f.thoughts[fri]] : [])] });
  if (!fri) return out;
  const full = { mon, wed, fri };
  const fa = fridayAfter(full);
  out.push({ heading: fa.heading, lines: fa.paragraphs });
  const n = night(full);
  out.push({ heading: n.when, lines: [n.line, ...(n.aside ? [n.aside] : [])] });
  const s = saturday(full);
  out.push({ heading: s.heading, lines: [...s.opening, ...s.entries.map(e => (e.kind === 'text' ? e.label + ': ' : names[e.who] + ' wrote: ') + e.text), ...(s.unsent ? [s.unsent] : [])] });
  const l = lastPage(full);
  out.push({ heading: l.heading, lines: l.paragraphs });
  return out;
}

export function journalText(route: Route, notes: string): string {
  const full = isFull(route);
  return [
    'SIX FLIGHTS — a notebook',
    'Original fiction. The people and the roof are invented.',
    ...journalSections(route).flatMap(s => [s.heading.toUpperCase(), ...s.lines]),
    ...(full ? ['Ticket stub: ' + endings[ending(route)].title, 'The last line, in my own hand:', notes.trim() || '(left blank)'] : []),
  ].join('\n\n');
}
