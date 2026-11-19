
(() => {
  'use strict';

  const LANG = ((navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || 'en'])
    .map((l) => String(l).slice(0, 2).toLowerCase()).find((l) => l === 'de' || l === 'en')) || 'en';
  const LOCALE = LANG === 'de' ? 'de-DE' : (/^en\b/i.test(navigator.language || '') ? navigator.language : 'en-US');
  const EN = {
    "1 Note": "1 grade",
    "1 Änderung bleibt gespeichert und wird danach übertragen.": "1 change remains saved and will be synced afterwards.",
    "<strong>1 Änderung wurde</strong> noch nicht an den Server übertragen, weil keine Verbindung besteht. Beim Abmelden geht sie verloren.": "<strong>1 change has</strong> not been sent to the server yet because there is no connection. It will be lost if you log out.",
    "<strong>{n} Änderungen wurden</strong> noch nicht an den Server übertragen, weil keine Verbindung besteht. Beim Abmelden gehen sie verloren.": "<strong>{n} changes have</strong> not been sent to the server yet because there is no connection. They will be lost if you log out.",
    "Abbrechen": "Cancel",
    "Abmelden": "Log Out",
    "Angemeldet bleiben": "Stay Logged In",
    "Aus Zwischenablage einfügen": "Paste from Clipboard",
    "Bearbeiten": "Edit",
    "Bearbeiten …": "Edit…",
    "Bestes Fach": "Best Subject",
    "Bezeichnung": "Title",
    "Bitte ein gültiges Datum wählen.": "Please choose a valid date.",
    "Bitte gib deinen Zugangscode ein.": "Please enter your access code.",
    "Blau": "Blue",
    "Braun": "Brown",
    "Das Fach {name} und {grades} werden dauerhaft gelöscht – auch in der Mac-App. Dies kann nicht rückgängig gemacht werden.": "The subject {name} and {grades} will be permanently deleted – in the Mac app as well. This cannot be undone.",
    "Datum": "Date",
    "Deine Sitzung ist abgelaufen. Bitte melde dich erneut an.": "Your session has expired. Please log in again.",
    "Der Zugangscode ist nicht korrekt.": "The access code is incorrect.",
    "Die Daten konnten nicht geladen werden. Es wird automatisch erneut versucht.": "The data could not be loaded. Retrying automatically.",
    "Doppelt": "Double",
    "Ein Fach mit diesem Namen existiert bereits.": "A subject with this name already exists.",
    "Eine Änderung wurde vom Server abgelehnt.": "A change was rejected by the server.",
    "Einfach": "Single",
    "Entsperren": "Unlock",
    "Erneut versuchen": "Try Again",
    "Fach anlegen": "Create Subject",
    "Fach bearbeiten": "Edit Subject",
    "Fach bearbeiten …": "Edit Subject…",
    "Fach löschen": "Delete Subject",
    "Fach löschen …": "Delete Subject…",
    "Fach umbenennen / Farbe ändern": "Rename Subject / Change Color",
    "Fach und 1 Note löschen": "Delete Subject and 1 Grade",
    "Fach und {n} Noten löschen": "Delete Subject and {n} Grades",
    "Farbe": "Color",
    "Fächer": "Subjects",
    "Füge deine erste Note hinzu.": "Add your first grade.",
    "Gedrückt halten für Farbe, Reihenfolge und mehr": "Press and hold for color, order and more",
    "Gelb": "Yellow",
    "Gesamtschnitt": "Overall Average",
    "Gewichteter Schnitt aller Noten": "Weighted average of all grades",
    "Gewichtung": "Weighting",
    "Gib deinen Zugangscode ein,": "Enter your access code",
    "Grau": "Gray",
    "Grün": "Green",
    "Jetzt synchronisieren": "Sync Now",
    "Keine Verbindung zum Server": "No Connection to the Server",
    "Keine Verbindung zum Server.": "No connection to the server.",
    "Keine Verbindung – Änderungen werden später übertragen": "No connection – changes will be synced later",
    "Knallgelb": "Bright Yellow",
    "Lege dein erstes Fach an, um Noten einzutragen.": "Create your first subject to start adding grades.",
    "Lila": "Purple",
    "Löschen": "Delete",
    "Nach oben verschieben": "Move Up",
    "Nach unten verschieben": "Move Down",
    "Name": "Name",
    "Neue Note": "New Grade",
    "Neue Version verfügbar – wird geladen …": "New version available – loading…",
    "Neues Fach": "New Subject",
    "Nicht synchronisiert": "Not Synced",
    "Noch keine Fächer": "No Subjects Yet",
    "Noch keine Noten": "No Grades Yet",
    "Noch keine Noten eingetragen.": "No grades entered yet.",
    "Note": "Grade",
    "Note bearbeiten": "Edit Grade",
    "Note gelöscht": "Grade deleted",
    "Note gespeichert": "Grade saved",
    "Note hinzufügen": "Add Grade",
    "Note hinzufügen …": "Add Grade…",
    "Note löschen": "Delete Grade",
    "Note {n} (Taste {n})": "Grade {n} (key {n})",
    "Note {n}: {count}": "Grade {n}: {count}",
    "NotePulse": "NotePulse",
    "Noten": "Grades",
    "Notenverteilung": "Grade Distribution",
    "Offline": "Offline",
    "Offline · {n} ausstehend": "Offline · {n} pending",
    "Offline – Änderungen werden gespeichert und später übertragen.": "Offline – changes are saved and will be synced later.",
    "Orange": "Orange",
    "Pink": "Pink",
    "Rot": "Red",
    "Schließen (Esc)": "Close (Esc)",
    "Schnitt pro Fach": "Average per Subject",
    "Schnitt {avg}": "Average {avg}",
    "Schwarz": "Black",
    "Schwächstes Fach": "Weakest Subject",
    "Server-Fehler {n}": "Server error {n}",
    "Speichere …": "Saving…",
    "Speichern": "Save",
    "Synchronisiere …": "Syncing…",
    "Synchronisiert {time}": "Synced {time}",
    "Trotzdem abmelden": "Log Out Anyway",
    "Türkis": "Turquoise",
    "Verbinde …": "Connecting…",
    "Verlauf": "History",
    "Verteilung": "Distribution",
    "Wieder online": "Back online",
    "Wieder online – 1 Änderung übertragen": "Back online – 1 change synced",
    "Wieder online – {n} Änderungen übertragen": "Back online – {n} changes synced",
    "Zu viele Versuche. Bitte in {n} Min. erneut versuchen.": "Too many attempts. Please try again in {n} min.",
    "Zugangscode": "Access Code",
    "Zugriff auf die Zwischenablage nicht erlaubt.": "Access to the clipboard is not allowed.",
    "Zum Löschen erneut klicken": "Click again to delete",
    "doppelt gewichtete Noten zählen 2×": "double-weighted grades count 2×",
    "größere Punkte = doppelt gewichtet · gestrichelt = Schnitt": "larger dots = double-weighted · dashed = average",
    "um deine Noten zu verwalten.": "to manage your grades.",
    "z. B. Mathematik": "e.g. Mathematics",
    "z. B. Schulaufgabe, Ex, Referat": "e.g. Exam, Quiz, Presentation",
    "{n} Noten": "{n} grades",
    "{n} Änderungen bleiben gespeichert und werden danach übertragen.": "{n} changes remain saved and will be synced afterwards.",
    "Übersicht": "Overview",
    "„{name}“ gelöscht": "“{name}” deleted",
    "„{name}“ löschen?": "Delete “{name}”?",
  };
  const t = (s, v) => {
    let r = LANG === 'de' ? s : (EN[s] ?? s);
    if (v) for (const k in v) r = r.split('{' + k + '}').join(v[k]);
    return r;
  };
  function serverMessage(data) {
    if (!data) return '';
    if (data.error === 'invalid code') return t('Der Zugangscode ist nicht korrekt.');
    if (data.error === 'locked') {
      const m = /(\d+)/.exec(data.message || '');
      if (m) return t('Zu viele Versuche. Bitte in {n} Min. erneut versuchen.', { n: m[1] });
    }
    return data.message || data.error || '';
  }
  function translateStatic() {
    document.documentElement.lang = LANG;
    if (LANG === 'de') return;
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    for (let n = walker.nextNode(); n; n = walker.nextNode()) {
      const v = n.nodeValue.trim();
      if (v && EN[v]) n.nodeValue = n.nodeValue.replace(v, EN[v]);
    }
    for (const e of document.querySelectorAll('[title], [placeholder], [aria-label]')) {
      for (const k of ['title', 'placeholder', 'aria-label']) {
        const v = e.getAttribute(k);
        if (v && EN[v]) e.setAttribute(k, EN[v]);
      }
    }
  }
  translateStatic();

  const PALETTE = [
    [t('Lila'), '#6B3DB3'], [t('Blau'), '#3373E6'], [t('Türkis'), '#1A9EA8'], [t('Grün'), '#38A357'],
    [t('Gelb'), '#E6AD1A'], [t('Orange'), '#F28026'], [t('Rot'), '#E04045'], [t('Pink'), '#E6529E'],
    [t('Braun'), '#8C6140'], [t('Grau'), '#737885'], [t('Schwarz'), '#14141A'], [t('Knallgelb'), '#FFD600'],
  ];
  const WEIGHTS = { 1: { label: t('Einfach'), short: '×1' }, 2: { label: t('Doppelt'), short: '×2' } };
  const POLL_MS = 30000;

  const colorOf = (i) => PALETTE[((i % PALETTE.length) + PALETTE.length) % PALETTE.length][1];
  const colorName = (i) => PALETTE[((i % PALETTE.length) + PALETTE.length) % PALETTE.length][0];

  function gradeColor(v) {
    if (v < 1.5) return '#21994D';
    if (v < 2.5) return '#66A833';
    if (v < 3.5) return '#D9A60D';
    if (v < 4.5) return '#ED7A1F';
    if (v < 5.5) return '#E04738';
    return '#B31F29';
  }

  function isLight(hex) {
    const n = parseInt(hex.slice(1), 16);
    const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((c) => {
      c /= 255; return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
    });
    return 0.2126 * r + 0.7152 * g + 0.0722 * b > 0.45;
  }

  const fmt = (v) => (v == null ? '–' : v.toFixed(2));

  function average(subject) {
    let w = 0, s = 0;
    for (const g of subject.grades) { w += g.weight; s += g.value * g.weight; }
    return w > 0 ? s / w : null;
  }

  function overallAverage() {
    let w = 0, s = 0;
    for (const sub of state.subjects) for (const g of sub.grades) { w += g.weight; s += g.value * g.weight; }
    return w > 0 ? s / w : null;
  }

  const $ = (id) => document.getElementById(id);
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  function uuid() {
    if (window.crypto && crypto.randomUUID) return crypto.randomUUID().toUpperCase();
    const b = crypto.getRandomValues(new Uint8Array(16));
    b[6] = (b[6] & 0x0f) | 0x40; b[8] = (b[8] & 0x3f) | 0x80;
    const h = [...b].map((x) => x.toString(16).padStart(2, '0')).join('');
    return `${h.slice(0, 8)}-${h.slice(8, 12)}-${h.slice(12, 16)}-${h.slice(16, 20)}-${h.slice(20)}`.toUpperCase();
  }

  function todayISO() {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  }
  function parseISO(s) {
    const [y, m, d] = s.split('-').map(Number);
    return new Date(y, m - 1, d);
  }
  const dateLong = (s) => parseISO(s).toLocaleDateString(LOCALE, { day: 'numeric', month: 'short', year: 'numeric' });
  const dateShort = (s) => parseISO(s).toLocaleDateString(LOCALE, { day: '2-digit', month: '2-digit', year: '2-digit' });
  const timeNow = () => new Date().toLocaleTimeString(LOCALE, { hour: '2-digit', minute: '2-digit' });

  const sameName = (a, b) => a.localeCompare(b, 'de', { sensitivity: 'base' }) === 0;

  const svg = (p, sw = 1.8) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round">${p}</svg>`;
  const I = {
    lock: svg('<rect x="5" y="11" width="14" height="10" rx="2.5"/><path d="M8 11V8a4 4 0 018 0v3"/>'),
    paste: svg('<path d="M16 4h1.5A2.5 2.5 0 0120 6.5v12a2.5 2.5 0 01-2.5 2.5h-11A2.5 2.5 0 014 18.5v-12A2.5 2.5 0 016.5 4H8"/><rect x="8" y="2.5" width="8" height="4" rx="1.2"/>'),
    logout: svg('<path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"/>'),
    close: svg('<path d="M6 6l12 12M18 6L6 18"/>', 2),
    check: svg('<path d="M5 12.5l4.5 4.5L19 7.5"/>', 2.2),
    alert: svg('<circle cx="12" cy="12" r="9"/><path d="M12 7.5v5.5M12 16.5v.01"/>', 2),
    info: svg('<circle cx="12" cy="12" r="9"/><path d="M12 11v5.5M12 7.5v.01"/>', 2),
    trash: svg('<path d="M4 7h16M10 11v6M14 11v6M5.5 7l1 12a2 2 0 002 2h7a2 2 0 002-2l1-12M9 7V4.5A1.5 1.5 0 0110.5 3h3A1.5 1.5 0 0115 4.5V7"/>'),
    pencil: svg('<path d="M4 20h4L19 9a2.83 2.83 0 00-4-4L4 16v4z"/><path d="M13.5 6.5l4 4"/>'),
    plus: svg('<path d="M12 5v14M5 12h14"/>', 2),
    chart: svg('<path d="M3 20h18"/><path d="M6.5 16v-5M11.5 16V5M16.5 16v-8"/>', 2),
    pulse: svg('<path d="M2 12h4.5l2-4 3.5 9 3-13 2.5 8H22"/>', 2),
    books: svg('<path d="M4 5.5A1.5 1.5 0 015.5 4h2A1.5 1.5 0 019 5.5v13A1.5 1.5 0 017.5 20h-2A1.5 1.5 0 014 18.5z"/><path d="M9 7.5h4.5v11A1.5 1.5 0 0112 20H9"/><path d="M15 6.2l2.2-.6a1.5 1.5 0 011.8 1l2.8 10.6a1.5 1.5 0 01-1 1.8l-2.2.6"/>'),
    hash: svg('<path d="M9.5 4l-2 16M16.5 4l-2 16M4.5 9h15M3.5 15h15"/>'),
    up: svg('<circle cx="12" cy="12" r="9"/><path d="M12 16.5v-9M8.5 11L12 7.5l3.5 3.5"/>'),
    down: svg('<circle cx="12" cy="12" r="9"/><path d="M12 7.5v9M8.5 13l3.5 3.5 3.5-3.5"/>'),
    one: svg('<circle cx="12" cy="12" r="9"/><path d="M10.4 9.3L12.6 7.8v8.7"/>'),
    two: svg('<circle cx="12" cy="12" r="9"/><path d="M9.5 9.6a2.6 2.6 0 015 .8c0 1.4-1.1 2.2-2.2 3.1L9.6 16.2h5"/>'),
    back: svg('<path d="M15 5l-7 7 7 7"/>', 2.2),
    chevron: svg('<path d="M9.5 5.5L16 12l-6.5 6.5"/>', 2),
    moveUp: svg('<path d="M12 19V5M5.5 11.5L12 5l6.5 6.5"/>', 2),
    moveDown: svg('<path d="M12 5v14M5.5 12.5L12 19l6.5-6.5"/>', 2),
    note: svg('<path d="M11 4H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2v-5"/><path d="M18.4 2.6a2 2 0 012.9 2.9L12 14.8l-3.8.9.9-3.8z"/>'),
  };

  document.querySelectorAll('[data-icon]').forEach((n) => { n.innerHTML = I[n.dataset.icon] || ''; });

  const MOBILE_MQ = window.matchMedia('(max-width: 760px), (orientation: portrait) and (max-width: 1024px), (max-height: 500px)');
  const isMobile = () => MOBILE_MQ.matches;

  const isPWA = () => window.matchMedia('(display-mode: standalone)').matches ||
    window.matchMedia('(display-mode: fullscreen)').matches || window.navigator.standalone === true;

  const el = {
    window: $('window'), tabs: $('tabs'), tabHome: $('tabHome'), tabCurrent: $('tabCurrent'),
    titlebarRight: $('titlebarRight'), syncChip: $('syncChip'), syncChipText: $('syncChipText'), logoutBtn: $('logoutBtn'),
    viewAuth: $('viewAuth'), codeForm: $('codeForm'), codeField: $('codeField'), codeInput: $('codeInput'),
    pasteBtn: $('pasteBtn'), joinBtn: $('joinBtn'), authError: $('authError'),
    viewApp: $('viewApp'), navOverview: $('navOverview'), subjectList: $('subjectList'), newSubjectBtn: $('newSubjectBtn'),
    mainTitle: $('mainTitle'), mainTools: $('mainTools'), content: $('content'),
    sheet: $('sheet'), sheetIcon: $('sheetIcon'), sheetTitle: $('sheetTitle'), sheetBody: $('sheetBody'), sheetClose: $('sheetClose'),
    menu: $('menu'), toast: $('toast'), pillnav: $('pillnav'), backBtn: $('backBtn'),
  };
  el.pasteBtn.innerHTML = I.paste;
  el.logoutBtn.innerHTML = I.logout;
  el.sheetClose.innerHTML = I.close;

  const state = {
    subjects: [],
    view: { type: 'overview' },
    loaded: false,
  };

  let toastTimer;
  function toast(msg, type = 'success') {
    const icon = type === 'error' ? I.alert : type === 'info' ? I.info : I.check;
    el.toast.className = 'toast ' + type;
    el.toast.innerHTML = icon + `<span class="toast-text">${esc(msg)}</span>`;
    requestAnimationFrame(() => el.toast.classList.add('show'));
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.toast.classList.remove('show'), type === 'error' ? 4200 : 2600);
  }

  class AuthError extends Error {}
  class NetworkError extends Error {}

  async function api(action, body = null, timeoutMs = 12000) {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), timeoutMs);
    const opts = { method: body ? 'POST' : 'GET', credentials: 'same-origin', cache: 'no-store', headers: {}, signal: ctrl.signal };
    if (body) {
      opts.headers['Content-Type'] = 'application/json';
      opts.body = JSON.stringify(body);
    }
    let res;
    try {
      res = await fetch('api.php?action=' + encodeURIComponent(action), opts);
    } catch (e) {
      throw new NetworkError(t('Keine Verbindung zum Server.'));
    } finally {
      clearTimeout(timer);
    }
    let data = null;
    try { data = await res.json(); } catch (e) { }
    if (res.status === 401 && action !== 'login') throw new AuthError('unauthorized');
    if (!res.ok) {
      const err = new Error(serverMessage(data) || t('Server-Fehler {n}', { n: res.status }));
      err.status = res.status;
      throw err;
    }
    return data;
  }

  const LS = { data: 'np_data_v1', queue: 'np_queue_v1', authUntil: 'np_auth_until', reloaded: 'np_reloaded_for' };
  const local = {
    get(k) { try { return JSON.parse(localStorage.getItem(k)); } catch (e) { return null; } },
    set(k, v) {
      try { if (v == null) localStorage.removeItem(k); else localStorage.setItem(k, JSON.stringify(v)); return true; }
      catch (e) { return false; }
    },
  };

  const sync = {
    queue: Array.isArray(local.get(LS.queue)) ? local.get(LS.queue) : [],
    flushing: null,
    pulling: false,
    online: true,
    wasOffline: false,
    timer: null,
  };

  const saveLocal = () => local.set(LS.data, state.subjects);
  const saveQueue = () => local.set(LS.queue, sync.queue);

  function setSyncState(kind, text) {
    const dot = el.syncChip.querySelector('.chip-dot');
    dot.className = 'chip-dot' + (kind === 'ok' ? '' : ' ' + kind);
    el.syncChipText.textContent = text;
    el.syncChip.title = kind === 'offline' ? t('Keine Verbindung – Änderungen werden später übertragen') : t('Jetzt synchronisieren');
  }

  function showOffline() {
    const n = sync.queue.length;
    setSyncState('offline', n ? t('Offline · {n} ausstehend', { n }) : t('Offline'));
    if (!sync.wasOffline) {
      sync.wasOffline = true;
      toast(t('Offline – Änderungen werden gespeichert und später übertragen.'), 'info');
    }
  }

  function wentOnline(sent) {
    sync.online = true;
    if (sync.wasOffline) {
      sync.wasOffline = false;
      toast(sent ? (sent === 1 ? t('Wieder online – 1 Änderung übertragen') : t('Wieder online – {n} Änderungen übertragen', { n: sent })) : t('Wieder online'));
    }
  }

  function normalize(subjects) {
    return subjects.map((s) => ({
      id: String(s.id).toUpperCase(),
      name: s.name,
      color: s.color,
      sort: s.sort,
      grades: s.grades.map((g) => ({
        id: String(g.id).toUpperCase(), value: g.value, weight: g.weight, title: g.title || '', date: g.date,
      })).sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0)),
    }));
  }

  async function pull({ silent = false } = {}) {
    if (sync.queue.length) return flush();
    if (sync.pulling || sync.flushing) return;
    sync.pulling = true;
    if (!silent || !state.loaded) setSyncState('syncing', t('Synchronisiere …'));
    try {
      const data = await api('pull');
      if (sync.queue.length || sync.flushing) return;
      const subjects = normalize(data.subjects || []);
      const first = !state.loaded;
      state.loaded = true;
      if (first || JSON.stringify(subjects) !== JSON.stringify(state.subjects)) {
        state.subjects = subjects;
        saveLocal();
        if (state.view.type === 'subject' && !findSubject(state.view.id)) {
          leaveSubjectHistory();
          state.view = isMobile() ? { type: 'subjects' } : { type: 'overview' };
        }
        render({ animate: first });
      }
      wentOnline(0);
      setSyncState('ok', t('Synchronisiert {time}', { time: timeNow() }));
    } catch (e) {
      if (e instanceof AuthError) return authLost();
      sync.online = false;
      showOffline();
      if (!state.loaded) renderLoadError();
    } finally {
      sync.pulling = false;
    }
  }

  function flush() {
    if (sync.flushing) return sync.flushing;
    if (!sync.queue.length) return pull({ silent: true });
    sync.flushing = (async () => {
      setSyncState('syncing', t('Speichere …'));
      let sent = 0;
      try {
        while (sync.queue.length) {
          const batch = sync.queue.slice(0, 200);
          const res = await api('push', { ops: batch });
          if ((res.results || []).some((r) => !r.ok)) toast(t('Eine Änderung wurde vom Server abgelehnt.'), 'error');
          sync.queue.splice(0, batch.length);
          saveQueue();
          sent += batch.length;
        }
      } catch (e) {
        sync.flushing = null;
        if (e instanceof AuthError) { authLost(); return; }
        sync.online = false;
        showOffline();
        return;
      }
      sync.flushing = null;
      wentOnline(sent);
      await pull({ silent: true });
    })();
    return sync.flushing;
  }

  function push(ops) {
    sync.queue.push(...ops);
    saveQueue();
    saveLocal();
    if (!navigator.onLine) { sync.online = false; showOffline(); return Promise.resolve(); }
    return flush();
  }

  function startPolling() {
    stopPolling();
    sync.timer = setInterval(() => {
      if (document.visibilityState === 'visible') flush();
    }, POLL_MS);
  }
  function stopPolling() { clearInterval(sync.timer); sync.timer = null; }

  let lastResume = 0;
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState !== 'visible') return;
    if (!el.viewApp.hidden) flush();

    if (Date.now() - lastResume > 60000) { lastResume = Date.now(); checkForUpdate(); }
  });
  window.addEventListener('online', () => { if (!el.viewApp.hidden) flush(); });
  window.addEventListener('offline', () => { if (!el.viewApp.hidden) { sync.online = false; showOffline(); } });

  el.syncChip.addEventListener('click', () => flush());

  const findSubject = (id) => state.subjects.find((s) => s.id === id);
  const subjectOp = (s, sort) => ({ op: 'upsertSubject', id: s.id, name: s.name, color: s.color, sort });
  const gradeOp = (g, sid) => ({ op: 'upsertGrade', id: g.id, subject_id: sid, value: g.value, weight: g.weight, title: g.title, date: g.date });
  const sortGrades = (s) => s.grades.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));

  function addSubject(name, color) {
    const s = { id: uuid(), name, color, sort: state.subjects.length, grades: [] };
    state.subjects.push(s);
    state.view = { type: 'subject', id: s.id };
    render({ animate: true });
    push([subjectOp(s, s.sort)]);
  }

  function updateSubject(id, name, color) {
    const s = findSubject(id); if (!s) return;
    s.name = name; s.color = color;
    render();
    push([subjectOp(s, state.subjects.indexOf(s))]);
  }

  function deleteSubject(id) {
    const s = findSubject(id); if (!s) return;
    state.subjects = state.subjects.filter((x) => x.id !== id);
    if (state.view.type === 'subject' && state.view.id === id) {
      leaveSubjectHistory();
      state.view = isMobile() ? { type: 'subjects' } : { type: 'overview' };
    }
    render({ animate: true });
    toast(t('„{name}“ gelöscht', { name: s.name }));
    push([{ op: 'deleteSubject', id }]);
  }

  function moveSubject(id, toIndex) {
    const from = state.subjects.findIndex((s) => s.id === id);
    if (from < 0) return;
    const [s] = state.subjects.splice(from, 1);
    if (toIndex > from) toIndex--;
    state.subjects.splice(toIndex, 0, s);
    if (from === toIndex) return render();
    state.subjects.forEach((x, i) => { x.sort = i; });
    render();
    push(state.subjects.map((x, i) => subjectOp(x, i)));
  }

  function upsertGrade(sid, g) {
    const s = findSubject(sid); if (!s) return;
    const i = s.grades.findIndex((x) => x.id === g.id);
    if (i >= 0) s.grades[i] = g; else s.grades.push(g);
    sortGrades(s);
    render();
    push([gradeOp(g, sid)]);
  }

  function deleteGrade(sid, gid) {
    const s = findSubject(sid); if (!s) return;
    s.grades = s.grades.filter((g) => g.id !== gid);
    render();
    push([{ op: 'deleteGrade', id: gid }]);
  }

  function render({ animate = false } = {}) {
    renderSidebar();
    renderMain(animate);
  }

  function renderSidebar() {
    el.navOverview.classList.toggle('active', state.view.type === 'overview');
    if (!state.subjects.length) {
      el.subjectList.innerHTML = '<div class="side-empty">' + t('Noch keine Fächer') + '</div>';
      return;
    }
    el.subjectList.innerHTML = state.subjects.map((s) => {
      const a = average(s);
      const active = state.view.type === 'subject' && state.view.id === s.id;
      return `<div class="side-item${active ? ' active' : ''}" data-id="${s.id}" draggable="true" role="button" tabindex="0"
                aria-current="${active ? 'page' : 'false'}" style="--sc:${colorOf(s.color)}" title="${esc(s.name)}">
          <span class="side-dot"></span>
          <span class="side-name">${esc(s.name)}</span>
          ${a != null ? `<span class="side-avg" style="--gc:${gradeColor(a)}">${fmt(a)}</span>` : ''}
        </div>`;
    }).join('');
  }

  el.navOverview.addEventListener('click', () => go({ type: 'overview' }));
  el.tabHome.addEventListener('click', () => go({ type: 'overview' }));
  el.newSubjectBtn.addEventListener('click', () => openSubjectForm());

  el.subjectList.addEventListener('click', (e) => {
    const b = e.target.closest('.side-item');
    if (b) go({ type: 'subject', id: b.dataset.id });
  });

  el.subjectList.addEventListener('keydown', (e) => {
    const b = e.target.closest('.side-item'); if (!b) return;
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go({ type: 'subject', id: b.dataset.id }); }
    if (e.key === 'ContextMenu' || (e.shiftKey && e.key === 'F10')) {
      e.preventDefault();
      const r = b.getBoundingClientRect();
      openSubjectMenu(b.dataset.id, r.left + 24, r.bottom);
    }
  });

  el.subjectList.addEventListener('contextmenu', (e) => {
    const b = e.target.closest('.side-item');
    if (!b) return;
    e.preventDefault();
    openSubjectMenu(b.dataset.id, e.clientX, e.clientY);
  });

  let dragId = null;
  el.subjectList.addEventListener('dragstart', (e) => {
    const b = e.target.closest('.side-item'); if (!b) return;
    dragId = b.dataset.id;
    b.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', dragId);
    closeMenu();
  });
  el.subjectList.addEventListener('dragover', (e) => {
    if (!dragId) return;
    const b = e.target.closest('.side-item'); if (!b) return;
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    clearDropMarks();
    if (b.dataset.id === dragId) return;
    const r = b.getBoundingClientRect();
    b.classList.add(e.clientY < r.top + r.height / 2 ? 'drop-before' : 'drop-after');
  });
  el.subjectList.addEventListener('dragleave', (e) => {
    if (!el.subjectList.contains(e.relatedTarget)) clearDropMarks();
  });
  el.subjectList.addEventListener('drop', (e) => {
    if (!dragId) return;
    e.preventDefault();
    const b = e.target.closest('.side-item');
    if (b && b.dataset.id !== dragId) {
      const idx = state.subjects.findIndex((s) => s.id === b.dataset.id);
      moveSubject(dragId, b.classList.contains('drop-after') ? idx + 1 : idx);
    }
    clearDropMarks();
  });
  el.subjectList.addEventListener('dragend', () => {
    dragId = null;
    clearDropMarks();
    el.subjectList.querySelectorAll('.dragging').forEach((n) => n.classList.remove('dragging'));
  });
  function clearDropMarks() {
    el.subjectList.querySelectorAll('.drop-before, .drop-after').forEach((n) => n.classList.remove('drop-before', 'drop-after'));
  }

  function go(view, { fromPop = false } = {}) {
    const changed = JSON.stringify(view) !== JSON.stringify(state.view);
    const wasSubject = state.view.type === 'subject';
    state.view = view;
    closeMenu();

    if (isMobile() && !fromPop) {
      if (view.type === 'subject' && !wasSubject) history.pushState({ np: 'subject' }, '');
      else if (view.type !== 'subject' && wasSubject) leaveSubjectHistory();
    }
    render({ animate: changed });
    if (changed) el.content.scrollTop = 0;
  }

  let ignorePop = false;
  function leaveSubjectHistory() {
    if (history.state && history.state.np === 'subject') { ignorePop = true; history.back(); }
  }
  window.addEventListener('popstate', () => {
    if (ignorePop) { ignorePop = false; return; }
    if (!el.sheet.hidden) closeSheet();
    if (state.view.type === 'subject') go({ type: 'subjects' }, { fromPop: true });
  });

  el.pillnav.addEventListener('click', (e) => {
    const b = e.target.closest('.pill'); if (!b) return;
    const target = { type: b.dataset.tab };
    if (JSON.stringify(target) === JSON.stringify(state.view)) { el.content.scrollTo({ top: 0, behavior: 'smooth' }); return; }
    go(target);
  });
  el.backBtn.addEventListener('click', () => {
    if (history.state && history.state.np === 'subject') history.back();
    else go({ type: 'subjects' });
  });

  MOBILE_MQ.addEventListener('change', () => {
    closeMenu();
    if (!isMobile() && state.view.type === 'subjects') state.view = { type: 'overview' };
    if (!el.viewApp.hidden) render();
  });

  function renderMain(animate) {
    const scroll = el.content.scrollTop;
    const mobile = isMobile();
    if (!mobile && state.view.type === 'subjects') state.view = { type: 'overview' };
    const s = state.view.type === 'subject' ? findSubject(state.view.id) : null;
    const list = !s && state.view.type === 'subjects';

    if (s) renderSubject(s); else if (list) renderSubjectList(); else renderOverview();

    el.tabCurrent.textContent = s ? s.name : list ? t('Fächer') : t('Übersicht');
    document.title = s ? `${s.name} – NotePulse` : 'NotePulse';
    el.backBtn.hidden = !(mobile && s);

    el.mainTitle.parentElement.hidden = mobile && state.view.type === 'overview';
    const tab = state.view.type === 'overview' ? 'overview' : 'subjects';
    el.pillnav.querySelectorAll('.pill').forEach((p) => {
      const on = p.dataset.tab === tab;
      p.classList.toggle('active', on);
      p.setAttribute('aria-current', on ? 'page' : 'false');
    });

    el.content.classList.remove('loading');
    if (animate) {
      el.content.style.animation = 'none';
      void el.content.offsetWidth;
      el.content.style.animation = '';
    } else {
      el.content.scrollTop = scroll;
    }
    drawCharts();
  }

  function tile(label, icon, value, color, sub) {
    return `<div class="card tile">
        <div class="tile-label">${I[icon]}<span>${label}</span></div>
        <div class="tile-value"${color ? ` style="--tc:${color}"` : ''}>${value}</div>
        ${sub != null ? `<div class="tile-sub">${sub}</div>` : ''}
      </div>`;
  }

  function emptyState(icon, title, sub, button) {
    return `<div class="empty">
        <div class="empty-icon">${I[icon]}</div>
        <div class="empty-title">${title}</div>
        <div class="empty-sub">${sub}</div>
        ${button || ''}
      </div>`;
  }

  function renderOverview() {
    el.mainTitle.textContent = t('Übersicht');
    el.mainTools.innerHTML = `<button type="button" class="btn btn-secondary btn-sm" data-act="new-subject">
        <span class="btn-icon">${I.plus}</span>${t('Neues Fach')}</button>`;

    const overall = overallAverage();
    let html = `<div class="hero">
        <div>
          <div class="hero-label">${t('Gesamtschnitt')}</div>
          <div class="hero-value">${fmt(overall)}</div>
          <div class="hero-sub">${t('Gewichteter Schnitt aller Noten')}</div>
        </div>
        <div class="hero-icon">${I.pulse}</div>
      </div>`;

    if (!state.subjects.length) {
      html += `<div class="card">${emptyState('books', t('Noch keine Fächer'), t('Lege dein erstes Fach an, um Noten einzutragen.'),
        '<button type="button" class="btn btn-primary" data-act="new-subject" style="margin-top:16px">' + t('Fach anlegen') + '</button>')}</div>`;
      el.content.innerHTML = html;
      return;
    }

    const all = state.subjects.flatMap((s) => s.grades);
    const rated = state.subjects.map((s) => ({ s, a: average(s) })).filter((x) => x.a != null);
    const best = rated.length ? rated.reduce((m, x) => (x.a < m.a ? x : m)) : null;
    const worst = rated.length ? rated.reduce((m, x) => (x.a > m.a ? x : m)) : null;

    html += `<div class="tiles">
        ${tile(t('Fächer'), 'books', state.subjects.length)}
        ${tile(t('Noten'), 'hash', all.length)}
        ${tile(t('Bestes Fach'), 'up', fmt(best && best.a), best && gradeColor(best.a), best ? esc(best.s.name) : '&nbsp;')}
        ${tile(t('Schwächstes Fach'), 'down', fmt(worst && worst.a), worst && gradeColor(worst.a), worst ? esc(worst.s.name) : '&nbsp;')}
      </div>`;

    html += `<div class="card">
        <div class="card-head"><div class="card-title">${t('Schnitt pro Fach')}</div></div>
        ${rated.length ? '<div data-chart="subjects"></div>' : '<div class="card-note">' + t('Noch keine Noten eingetragen.') + '</div>'}
      </div>`;

    html += `<div class="card">
        <div class="card-head">
          <div class="card-title">${t('Notenverteilung')}</div>
          <div class="card-note">${t('doppelt gewichtete Noten zählen 2×')}</div>
        </div>
        <div data-chart="dist" data-scope="all"></div>
      </div>`;

    el.content.innerHTML = html;
  }

  function renderSubjectList() {
    el.mainTitle.textContent = t('Fächer');
    el.mainTools.innerHTML = `<button type="button" class="icon-btn add-btn" data-act="new-subject"
        title="${t('Neues Fach')}" aria-label="${t('Neues Fach')}">${I.plus}</button>`;
    let html = '';
    if (!state.subjects.length) {
      html += `<div class="card">${emptyState('books', t('Noch keine Fächer'), t('Lege dein erstes Fach an, um Noten einzutragen.'))}</div>`;
    } else {
      html += '<div class="m-list">' + state.subjects.map((s) => {
        const a = average(s);
        const n = s.grades.length;
        return `<div class="m-row" data-sid="${s.id}" role="button" tabindex="0" style="--sc:${colorOf(s.color)}">
            <span class="side-dot"></span>
            <span class="m-row-body">
              <span class="m-row-name">${esc(s.name)}</span>
              <span class="m-row-sub">${n === 1 ? t('1 Note') : t('{n} Noten', { n })}</span>
            </span>
            ${a != null ? `<span class="side-avg" style="--gc:${gradeColor(a)}">${fmt(a)}</span>` : ''}
            <span class="m-row-chev">${I.chevron}</span>
          </div>`;
      }).join('') + '</div>';
      html += '<div class="m-hint">' + t('Gedrückt halten für Farbe, Reihenfolge und mehr') + '</div>';
    }
    el.content.innerHTML = html;
  }

  function renderSubject(s) {
    const color = colorOf(s.color);
    const a = average(s);
    const single = s.grades.filter((g) => g.weight === 1).length;
    const double = s.grades.filter((g) => g.weight === 2).length;

    el.mainTitle.textContent = s.name;
    el.mainTools.innerHTML = `
      <button type="button" class="icon-btn" data-act="edit-subject" title="${t('Fach umbenennen / Farbe ändern')}">${I.pencil}</button>
      <button type="button" class="icon-btn danger" data-act="delete-subject" title="${t('Fach löschen')}">${I.trash}</button>`;

    let html = `<div class="tiles three">
        <div class="card">
          <div class="subject-head">
            <div class="avg-ring" style="--sc:${color};${a != null ? `--gc:${gradeColor(a)}` : ''}">${fmt(a)}</div>
            <div style="min-width:0">
              <div class="subject-head-label">Fachschnitt</div>
              <div class="subject-head-name">${esc(s.name)}</div>
            </div>
          </div>
        </div>
        ${tile(t('Einfach'), 'one', single)}
        ${tile(t('Doppelt'), 'two', double)}
      </div>`;

    const light = isLight(color) ? ' on-light' : '';
    html += `<div class="card" style="--sc:${color}">
        <div class="card-head">
          <div class="card-title">${t('Noten')}</div>
          <button type="button" class="btn btn-primary btn-sm tinted${light}" data-act="new-grade">
            <span class="btn-icon">${I.plus}</span>${t('Note hinzufügen')}</button>
        </div>`;

    if (!s.grades.length) {
      html += emptyState('note', t('Noch keine Noten'), t('Füge deine erste Note hinzu.'));
    } else {
      html += '<div class="grades">' + s.grades.map((g) => {
        const w = WEIGHTS[g.weight] || WEIGHTS[1];
        return `<div class="item" data-gid="${g.id}">
            <div class="grade-chip" style="--gc:${gradeColor(g.value)}">${g.value}</div>
            <div class="item-body">
              <span class="item-name">${esc(g.title || t('Note'))}</span>
              <span class="item-sub">${dateLong(g.date)}</span>
            </div>
            <span class="badge badge-weight${g.weight === 2 ? ' double' : ''}"><span class="w-label">${w.label} </span>${w.short}</span>
            <div class="item-actions">
              <button type="button" class="icon-btn" data-act="edit-grade" title="${t('Note bearbeiten')}">${I.pencil}</button>
              <button type="button" class="icon-btn danger" data-act="delete-grade" title="${t('Note löschen')}">${I.trash}</button>
            </div>
          </div>`;
      }).join('') + '</div>';
    }
    html += '</div>';

    if (s.grades.length >= 2) {
      html += `<div class="card">
          <div class="card-head">
            <div class="card-title">${t('Verlauf')}</div>
            <div class="card-note">${t('größere Punkte = doppelt gewichtet · gestrichelt = Schnitt')}</div>
          </div>
          <div data-chart="line"></div>
        </div>
        <div class="card">
          <div class="card-head">
            <div class="card-title">${t('Verteilung')}</div>
            <div class="card-note">${t('doppelt gewichtete Noten zählen 2×')}</div>
          </div>
          <div data-chart="dist" data-scope="subject"></div>
        </div>`;
    }

    el.content.innerHTML = html;
  }

  function renderLoadError() {
    el.mainTitle.textContent = t('Übersicht');
    el.mainTools.innerHTML = '';
    el.content.innerHTML = `<div class="card">${emptyState('alert', t('Keine Verbindung zum Server'),
      t('Die Daten konnten nicht geladen werden. Es wird automatisch erneut versucht.'),
      '<button type="button" class="btn btn-secondary" data-act="retry" style="margin-top:16px">' + t('Erneut versuchen') + '</button>')}</div>`;
  }

  function onAction(e) {
    const b = e.target.closest('[data-act]');
    if (!b) return;
    const s = state.view.type === 'subject' ? findSubject(state.view.id) : null;
    const gid = b.closest('[data-gid]')?.dataset.gid;
    switch (b.dataset.act) {
      case 'new-subject': openSubjectForm(); break;
      case 'retry': pull(); break;
      case 'edit-subject': if (s) openSubjectForm(s); break;
      case 'delete-subject': if (s) confirmDeleteSubject(s); break;
      case 'new-grade': if (s) openGradeForm(s); break;
      case 'edit-grade': if (s) openGradeForm(s, s.grades.find((g) => g.id === gid)); break;
      case 'delete-grade': {

        if (!s) break;
        if (b.classList.contains('confirm')) { deleteGrade(s.id, gid); toast(t('Note gelöscht')); break; }
        b.classList.add('confirm');
        b.innerHTML = I.check;
        b.title = t('Zum Löschen erneut klicken');
        setTimeout(() => {
          if (b.isConnected) { b.classList.remove('confirm'); b.innerHTML = I.trash; b.title = t('Note löschen'); }
        }, 2500);
        break;
      }
    }
  }
  el.content.addEventListener('click', onAction);
  el.content.addEventListener('click', (e) => {
    if (longPress.fired) { longPress.fired = false; e.preventDefault(); e.stopPropagation(); return; }
    const row = e.target.closest('.m-row');
    if (row) { go({ type: 'subject', id: row.dataset.sid }); return; }

    const g = e.target.closest('[data-gid]');
    if (g && isMobile() && !e.target.closest('button')) {
      const s = findSubject(state.view.id);
      if (s) openGradeForm(s, s.grades.find((x) => x.id === g.dataset.gid));
    }
  });
  el.content.addEventListener('keydown', (e) => {
    const row = e.target.closest('.m-row');
    if (row && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); go({ type: 'subject', id: row.dataset.sid }); }
  });

  const longPress = { timer: null, x: 0, y: 0, fired: false };
  el.content.addEventListener('touchstart', (e) => {
    const t = e.target.closest('.m-row, [data-gid]');
    if (!t || e.target.closest('button') || e.touches.length > 1) return;
    longPress.x = e.touches[0].clientX; longPress.y = e.touches[0].clientY;
    longPress.fired = false;
    clearTimeout(longPress.timer);
    t.classList.add('pressing');
    longPress.timer = setTimeout(() => {
      t.classList.remove('pressing');
      longPress.fired = true;
      if (navigator.vibrate) navigator.vibrate(10);
      openLongPressActions(t);
    }, 480);
  }, { passive: true });
  const cancelLongPress = () => {
    clearTimeout(longPress.timer);
    el.content.querySelectorAll('.pressing').forEach((n) => n.classList.remove('pressing'));
  };
  el.content.addEventListener('touchmove', (e) => {
    const t = e.touches[0];
    if (Math.abs(t.clientX - longPress.x) > 10 || Math.abs(t.clientY - longPress.y) > 10) cancelLongPress();
  }, { passive: true });
  el.content.addEventListener('touchend', cancelLongPress);
  el.content.addEventListener('touchcancel', cancelLongPress);

  function openLongPressActions(t) {
    if (t.classList.contains('m-row')) return openSubjectActions(t.dataset.sid);
    const s = findSubject(state.view.id);
    const g = s && s.grades.find((x) => x.id === t.dataset.gid);
    if (g) openGradeActions(s, g);
  }
  el.mainTools.addEventListener('click', onAction);

  el.content.addEventListener('dblclick', (e) => {
    const row = e.target.closest('[data-gid]');
    if (!row || e.target.closest('button')) return;
    const s = findSubject(state.view.id);
    if (s) openGradeForm(s, s.grades.find((g) => g.id === row.dataset.gid));
  });

  el.content.addEventListener('contextmenu', (e) => {
    if (isMobile()) {

      const t = e.target.closest('.m-row, [data-gid]');
      if (t) { e.preventDefault(); if (!longPress.fired) { longPress.fired = true; cancelLongPress(); openLongPressActions(t); } }
      return;
    }
    const row = e.target.closest('[data-gid]');
    if (!row) return;
    e.preventDefault();
    const s = findSubject(state.view.id);
    const g = s && s.grades.find((x) => x.id === row.dataset.gid);
    if (!g) return;
    openMenu(e.clientX, e.clientY, [
      { label: t('Bearbeiten …'), icon: 'pencil', run: () => openGradeForm(s, g) },
      { sep: true },
      { label: t('Löschen'), icon: 'trash', danger: true, run: () => { deleteGrade(s.id, g.id); toast(t('Note gelöscht')); } },
    ]);
  });

  const NS = 'http://www.w3.org/2000/svg';

  function drawCharts() {
    el.content.querySelectorAll('[data-chart]').forEach((box) => {
      const w = Math.max(240, Math.floor(box.getBoundingClientRect().width));
      const kind = box.dataset.chart;
      if (kind === 'subjects') box.innerHTML = chartSubjects(w);
      else if (kind === 'dist') {
        const grades = box.dataset.scope === 'all'
          ? state.subjects.flatMap((s) => s.grades)
          : (findSubject(state.view.id) || { grades: [] }).grades;
        box.innerHTML = chartDistribution(w, grades);
      } else if (kind === 'line') box.innerHTML = chartLine(w, findSubject(state.view.id));
    });
  }

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(drawCharts, 80);
    closeMenu();
  });

  function truncate(text, max) {
    return text.length > max ? text.slice(0, max - 1) + '…' : text;
  }

  function chartSubjects(W) {
    const rows = state.subjects.map((s) => ({ s, a: average(s) })).filter((x) => x.a != null);
    const rowH = 34, top = 4, axisH = 22;
    const labelW = Math.min(150, Math.max(90, W * 0.2));
    const right = 44;
    const plotW = W - labelW - right;
    const H = top + rows.length * rowH + axisH;
    const x = (v) => labelW + (v / 6) * plotW;

    let g = '';
    for (let t = 1; t <= 6; t++) {
      g += `<line class="grid-line" x1="${x(t)}" x2="${x(t)}" y1="${top}" y2="${H - axisH}"/>`;
      g += `<text x="${x(t)}" y="${H - 6}" text-anchor="middle">${t}</text>`;
    }
    g += `<line class="axis-line" x1="${x(0)}" x2="${x(0)}" y1="${top}" y2="${H - axisH}"/>`;

    let defs = '';
    rows.forEach(({ s, a }, i) => {
      const c = colorOf(s.color);
      const y = top + i * rowH;
      const barH = 18, by = y + (rowH - barH) / 2;
      const gid = 'gs' + i;
      defs += `<linearGradient id="${gid}" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="${c}" stop-opacity="0.85"/><stop offset="1" stop-color="${c}"/></linearGradient>`;
      g += `<text class="label-strong" x="${labelW - 12}" y="${y + rowH / 2 + 4}" text-anchor="end">${esc(truncate(s.name, 20))}<title>${esc(s.name)}</title></text>`;
      g += `<rect class="bar" x="${x(0)}" y="${by}" width="${Math.max(2, x(a) - x(0))}" height="${barH}" rx="4" fill="url(#${gid})">
          <title>${esc(s.name)}: ${fmt(a)}</title></rect>`;
      g += `<text x="${x(a) + 8}" y="${y + rowH / 2 + 4}">${fmt(a)}</text>`;
    });
    return `<svg class="chart" xmlns="${NS}" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}"><defs>${defs}</defs>${g}</svg>`;
  }

  function chartDistribution(W, grades) {
    const counts = [1, 2, 3, 4, 5, 6].map((n) => grades.filter((g) => g.value === n).reduce((a, g) => a + g.weight, 0));
    const max = Math.max(1, ...counts);
    const step = Math.max(1, Math.ceil(max / 4));
    const yMax = Math.ceil(max / step) * step;
    const H = 180, top = 18, bottom = 24, left = 32, right = 8;
    const plotH = H - top - bottom, plotW = W - left - right;
    const y = (v) => top + plotH - (v / yMax) * plotH;
    const colW = plotW / 6, barW = Math.min(64, colW * 0.62);

    let g = '';
    for (let t = 0; t <= yMax; t += step) {
      g += `<line class="${t === 0 ? 'axis-line' : 'grid-line'}" x1="${left}" x2="${W - right}" y1="${y(t)}" y2="${y(t)}"/>`;
      g += `<text x="${left - 8}" y="${y(t) + 4}" text-anchor="end">${t}</text>`;
    }
    counts.forEach((c, i) => {
      const cx = left + colW * i + colW / 2;
      const col = gradeColor(i + 1);
      if (c > 0) {
        const h = y(0) - y(c);
        g += `<path class="bar" d="${roundTopRect(cx - barW / 2, y(c), barW, h, 4)}" fill="${col}"><title>${t('Note {n}: {count}', { n: i + 1, count: c })}</title></path>`;
        g += `<text x="${cx}" y="${y(c) - 6}" text-anchor="middle">${c}</text>`;
      }
      g += `<text class="label-strong" x="${cx}" y="${H - 6}" text-anchor="middle">${i + 1}</text>`;
    });
    return `<svg class="chart" xmlns="${NS}" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">${g}</svg>`;
  }

  function roundTopRect(x, y, w, h, r) {
    r = Math.min(r, h, w / 2);
    return `M${x},${y + h}V${y + r}Q${x},${y} ${x + r},${y}H${x + w - r}Q${x + w},${y} ${x + w},${y + r}V${y + h}Z`;
  }

  function chartLine(W, s) {
    if (!s) return '';
    const pts = s.grades.slice().sort((a, b) => (a.date < b.date ? -1 : a.date > b.date ? 1 : 0));
    const H = 200, top = 14, bottom = 26, left = 28, right = 18;
    const plotH = H - top - bottom, plotW = W - left - right;
    const times = pts.map((g) => parseISO(g.date).getTime());
    const t0 = Math.min(...times), t1 = Math.max(...times);
    const pad = 14;
    const x = (t, i) => (t1 === t0
      ? left + pad + (pts.length === 1 ? (plotW - 2 * pad) / 2 : (i / (pts.length - 1)) * (plotW - 2 * pad))
      : left + pad + ((t - t0) / (t1 - t0)) * (plotW - 2 * pad));
    const y = (v) => top + ((v - 1) / 5) * plotH;
    const color = colorOf(s.color);
    const a = average(s);

    let g = '';
    for (let v = 1; v <= 6; v++) {
      g += `<line class="grid-line" x1="${left}" x2="${W - right}" y1="${y(v)}" y2="${y(v)}"/>`;
      g += `<text x="${left - 10}" y="${y(v) + 4}" text-anchor="end">${v}</text>`;
    }

    const labelIdx = [...new Set([0, Math.floor((pts.length - 1) / 2), pts.length - 1])];
    let lastX = -Infinity;
    labelIdx.forEach((i) => {
      const px = x(times[i], i);
      if (px - lastX < 70) return;
      lastX = px;
      g += `<text x="${px}" y="${H - 6}" text-anchor="middle">${dateShort(pts[i].date)}</text>`;
    });

    if (a != null) {
      g += `<line x1="${left}" x2="${W - right}" y1="${y(a)}" y2="${y(a)}" stroke="#8e8e93" stroke-width="1" stroke-dasharray="4 4"><title>${t('Schnitt {avg}', { avg: fmt(a) })}</title></line>`;
    }

    const coords = pts.map((p, i) => [x(times[i], i), y(p.value)]);
    g += `<path d="${smoothPath(coords)}" fill="none" stroke="${color}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>`;
    pts.forEach((p, i) => {
      const [cx, cy] = coords[i];
      const r = p.weight === 2 ? 7 : 4.5;
      g += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${gradeColor(p.value)}" stroke="#fff" stroke-width="2">
          <title>${esc(p.title || t('Note'))} · ${p.value} (${(WEIGHTS[p.weight] || WEIGHTS[1]).label}) · ${dateLong(p.date)}</title></circle>`;
    });
    return `<svg class="chart" xmlns="${NS}" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">${g}</svg>`;
  }

  function smoothPath(p) {
    if (p.length < 2) return p.length ? `M${p[0][0]},${p[0][1]}` : '';
    const n = p.length;
    for (let i = 1; i < n; i++) if (p[i][0] <= p[i - 1][0]) return 'M' + p.map((q) => q.join(',')).join('L');
    const dx = [], m = [], t = [];
    for (let i = 0; i < n - 1; i++) { dx[i] = p[i + 1][0] - p[i][0]; m[i] = (p[i + 1][1] - p[i][1]) / dx[i]; }
    t[0] = m[0]; t[n - 1] = m[n - 2];
    for (let i = 1; i < n - 1; i++) t[i] = m[i - 1] * m[i] <= 0 ? 0 : (m[i - 1] + m[i]) / 2;
    for (let i = 0; i < n - 1; i++) {
      if (m[i] === 0) { t[i] = 0; t[i + 1] = 0; continue; }
      const a = t[i] / m[i], b = t[i + 1] / m[i], h = a * a + b * b;
      if (h > 9) { const k = 3 / Math.sqrt(h); t[i] = k * a * m[i]; t[i + 1] = k * b * m[i]; }
    }
    let d = `M${p[0][0]},${p[0][1]}`;
    for (let i = 0; i < n - 1; i++) {
      const h = dx[i] / 3;
      d += `C${p[i][0] + h},${p[i][1] + t[i] * h} ${p[i + 1][0] - h},${p[i + 1][1] - t[i + 1] * h} ${p[i + 1][0]},${p[i + 1][1]}`;
    }
    return d;
  }

  function openMenu(cx, cy, items) {
    const html = items.map((it, i) => {
      if (it.sep) return '<div class="menu-sep"></div>';
      if (it.html !== undefined) return it.html;
      return `<button type="button" class="menu-item${it.danger ? ' danger' : ''}" data-i="${i}" role="menuitem">${I[it.icon] || ''}<span>${it.label}</span></button>`;
    }).join('');
    el.menu.innerHTML = html;
    el.menu.hidden = false;
    el.menu._items = items;

    const wr = el.window.getBoundingClientRect();
    const mw = el.menu.offsetWidth, mh = el.menu.offsetHeight;
    let left = cx - wr.left + 2, top = cy - wr.top + 2;
    if (left + mw > wr.width - 8) left = Math.max(8, cx - wr.left - mw - 2);
    if (top + mh > wr.height - 8) top = Math.max(8, wr.height - mh - 8);
    el.menu.style.left = left + 'px';
    el.menu.style.top = top + 'px';
    el.menu.querySelector('.menu-item, .swatch')?.focus({ preventScroll: true });
  }

  function closeMenu() {
    if (!el.menu.hidden) { el.menu.hidden = true; el.menu.innerHTML = ''; }
  }

  el.menu.addEventListener('click', (e) => {
    const b = e.target.closest('[data-i]');
    if (!b) return;
    const it = el.menu._items[+b.dataset.i];
    closeMenu();
    it && it.run && it.run();
  });
  el.menu.addEventListener('contextmenu', (e) => e.preventDefault());
  document.addEventListener('mousedown', (e) => { if (!el.menu.contains(e.target)) closeMenu(); });
  document.addEventListener('scroll', closeMenu, true);
  window.addEventListener('blur', closeMenu);

  function openSubjectMenu(id, cx, cy) {
    if (isMobile()) return openSubjectActions(id);
    const s = findSubject(id); if (!s) return;
    const items = [
      { label: t('Note hinzufügen …'), icon: 'plus', run: () => { go({ type: 'subject', id }); openGradeForm(findSubject(id)); } },
      { label: t('Fach bearbeiten …'), icon: 'pencil', run: () => openSubjectForm(findSubject(id)) },
      { sep: true },
      { html: '<div class="menu-label">' + t('Farbe') + '</div>' },
    ];
    const swatchStart = items.length;
    PALETTE.forEach((p, ci) => items.push({ swatch: true, ci, run: () => updateSubject(id, s.name, ci) }));
    items.push({ sep: true }, { label: t('Fach löschen …'), icon: 'trash', danger: true, run: () => confirmDeleteSubject(findSubject(id)) });

    const swatchHtml = '<div class="menu-swatches">' + PALETTE.map((p, ci) =>
      `<button type="button" class="swatch${ci === s.color ? ' active' : ''}" data-i="${swatchStart + ci}" style="--sc:${p[1]}" title="${p[0]}" aria-label="${p[0]}"></button>`).join('') + '</div>';
    const rendered = items.map((it, i) => (it.swatch ? (i === swatchStart ? { html: swatchHtml } : { html: '' }) : it));

    openMenu(cx, cy, rendered);
    el.menu._items = items;
  }

  const actionBtn = (a, icon, label, { danger = false, disabled = false } = {}) =>
    `<button type="button" class="action${danger ? ' danger' : ''}" data-a="${a}"${disabled ? ' disabled' : ''}>${I[icon]}<span>${label}</span></button>`;

  function openSubjectActions(id) {
    const s = findSubject(id); if (!s) return;
    const idx = state.subjects.indexOf(s);
    openSheet({
      title: s.name,
      icon: 'books',
      iconColor: colorOf(s.color),
      body: `
        <div class="action-list">
          ${actionBtn('add', 'plus', t('Note hinzufügen'))}
          ${actionBtn('edit', 'pencil', t('Fach bearbeiten'))}
        </div>
        <div class="field">
          <span class="field-label">${t('Farbe')}</span>
          <div class="swatches" role="radiogroup" aria-label="${t('Farbe')}">
            ${PALETTE.map((p, i) => `<button type="button" class="swatch${i === s.color ? ' active' : ''}" data-ci="${i}"
               style="--sc:${p[1]}" aria-label="${p[0]}" role="radio" aria-checked="${i === s.color}"></button>`).join('')}
          </div>
        </div>
        <div class="action-list">
          ${actionBtn('up', 'moveUp', t('Nach oben verschieben'), { disabled: idx === 0 })}
          ${actionBtn('down', 'moveDown', t('Nach unten verschieben'), { disabled: idx === state.subjects.length - 1 })}
        </div>
        <div class="action-list">
          ${actionBtn('delete', 'trash', t('Fach löschen'), { danger: true })}
        </div>`,
    });
    el.sheetBody.onclick = (e) => {
      const sw = e.target.closest('.swatch');
      if (sw) { closeSheet(); updateSubject(id, s.name, +sw.dataset.ci); return; }
      const b = e.target.closest('.action'); if (!b || b.disabled) return;
      const a = b.dataset.a;
      closeSheet();
      if (a === 'add') { go({ type: 'subject', id }); openGradeForm(findSubject(id)); }
      else if (a === 'edit') openSubjectForm(findSubject(id));
      else if (a === 'up') moveSubject(id, idx - 1);
      else if (a === 'down') moveSubject(id, idx + 2);
      else if (a === 'delete') confirmDeleteSubject(findSubject(id));
    };
  }

  function openGradeActions(s, g) {
    openSheet({
      title: `${g.title || t('Note')} · ${g.value}`,
      icon: 'note',
      iconColor: gradeColor(g.value),
      body: `
        <div class="action-list">${actionBtn('edit', 'pencil', t('Bearbeiten'))}</div>
        <div class="action-list">${actionBtn('delete', 'trash', t('Löschen'), { danger: true })}</div>`,
    });
    el.sheetBody.onclick = (e) => {
      const b = e.target.closest('.action'); if (!b) return;
      closeSheet();
      if (b.dataset.a === 'edit') openGradeForm(s, g);
      else { deleteGrade(s.id, g.id); toast(t('Note gelöscht')); }
    };
  }

  let sheetReturnFocus = null;
  let sheetKeyHandler = null;

  function openSheet({ title, icon, iconColor, body, onSubmit, onKey }) {
    closeMenu();
    sheetReturnFocus = document.activeElement;
    el.sheetTitle.textContent = title;
    el.sheetIcon.innerHTML = I[icon] || '';
    el.sheetIcon.style.setProperty('--ic', iconColor || 'var(--text-2)');
    el.sheetBody.innerHTML = body;
    el.sheetBody.onsubmit = (e) => { e.preventDefault(); onSubmit && onSubmit(); };
    sheetKeyHandler = onKey || null;
    el.sheet.hidden = false;
    const first = el.sheetBody.querySelector('[autofocus]') || el.sheetBody.querySelector('.grade-opt.active')
      || el.sheetBody.querySelector('input, button');
    requestAnimationFrame(() => first && first.focus());
  }

  function closeSheet() {
    if (el.sheet.hidden) return;
    el.sheet.hidden = true;
    el.sheetBody.innerHTML = '';
    el.sheetBody.onsubmit = null;
    el.sheetBody.onclick = null;
    el.sheet.querySelector('.sheet').style.transform = '';
    sheetKeyHandler = null;
    if (sheetReturnFocus && sheetReturnFocus.isConnected) sheetReturnFocus.focus({ preventScroll: true });
  }

  el.sheetClose.addEventListener('click', closeSheet);

  (() => {
    const sheetEl = el.sheet.querySelector('.sheet');
    const head = el.sheet.querySelector('.sheet-head');
    let startY = null, dy = 0;
    head.addEventListener('touchstart', (e) => {
      if (!isMobile() || e.target.closest('button')) return;
      startY = e.touches[0].clientY; dy = 0;
      sheetEl.style.transition = 'none';
    }, { passive: true });
    head.addEventListener('touchmove', (e) => {
      if (startY == null) return;
      dy = Math.max(0, e.touches[0].clientY - startY);
      sheetEl.style.transform = `translateY(${dy}px)`;
    }, { passive: true });
    const end = () => {
      if (startY == null) return;
      startY = null;
      sheetEl.style.transition = 'transform 0.25s var(--ease)';
      if (dy > 90) {
        sheetEl.style.transform = 'translateY(100%)';
        setTimeout(() => { sheetEl.style.transition = ''; closeSheet(); }, 200);
      } else {
        sheetEl.style.transform = '';
        setTimeout(() => { sheetEl.style.transition = ''; }, 260);
      }
    };
    head.addEventListener('touchend', end);
    head.addEventListener('touchcancel', end);
  })();

  el.sheet.addEventListener('click', (e) => {
    if (e.target === el.sheet && el.sheetBody.querySelector('.action-list') && !el.sheetBody.querySelector('.input')) closeSheet();
  });
  el.sheetBody.addEventListener('click', (e) => { if (e.target.closest('[data-close]')) closeSheet(); });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (!el.menu.hidden) { closeMenu(); return; }
      if (!el.sheet.hidden) { e.preventDefault(); closeSheet(); }
      return;
    }
    if (!el.sheet.hidden) {
      if (sheetKeyHandler) sheetKeyHandler(e);

      if (e.key === 'Enter' && e.target.closest && e.target.closest('.grade-opt, .seg-opt, .swatch')) {
        e.preventDefault();
        el.sheetBody.requestSubmit();
        return;
      }

      if (e.key === 'Tab') {
        const f = [...el.sheet.querySelectorAll('button, input, [tabindex]:not([tabindex="-1"])')].filter((n) => !n.disabled && n.offsetParent);
        if (!f.length) return;
        const i = f.indexOf(document.activeElement);
        if (e.shiftKey && i <= 0) { e.preventDefault(); f[f.length - 1].focus(); }
        else if (!e.shiftKey && i === f.length - 1) { e.preventDefault(); f[0].focus(); }
      }
    }
  });

  function openSubjectForm(subject = null) {
    let color = subject ? subject.color : state.subjects.length % PALETTE.length;
    openSheet({
      title: subject ? t('Fach bearbeiten') : t('Neues Fach'),
      icon: subject ? 'pencil' : 'books',
      iconColor: colorOf(color),
      body: `
        <div class="field">
          <label class="field-label" for="fName">${t('Name')}</label>
          <input class="input" id="fName" maxlength="100" placeholder="${t('z. B. Mathematik')}" value="${subject ? esc(subject.name) : ''}" autofocus>
          <div class="field-error" id="fNameErr"></div>
        </div>
        <div class="field">
          <span class="field-label">${t('Farbe')}</span>
          <div class="swatches" id="fColors" role="radiogroup" aria-label="${t('Farbe')}">
            ${PALETTE.map((p, i) => `<button type="button" class="swatch${i === color ? ' active' : ''}" data-ci="${i}"
               style="--sc:${p[1]}" title="${p[0]}" aria-label="${p[0]}" role="radio" aria-checked="${i === color}"></button>`).join('')}
          </div>
        </div>
        <div class="sheet-foot">
          <span class="spacer"></span>
          <button type="button" class="btn btn-secondary" data-close>${t('Abbrechen')}</button>
          <button type="submit" class="btn btn-primary" id="fSave">${t('Speichern')}</button>
        </div>`,
      onSubmit: save,
    });

    const name = $('fName'), err = $('fNameErr'), saveBtn = $('fSave');
    const validate = () => {
      const v = name.value.trim();
      const dup = v && state.subjects.some((s) => (!subject || s.id !== subject.id) && sameName(s.name, v));
      err.textContent = dup ? t('Ein Fach mit diesem Namen existiert bereits.') : '';
      name.classList.toggle('error', false);
      saveBtn.disabled = !v || dup;
      return v && !dup;
    };
    name.addEventListener('input', validate);
    validate();
    name.setSelectionRange(name.value.length, name.value.length);

    $('fColors').addEventListener('click', (e) => {
      const b = e.target.closest('.swatch'); if (!b) return;
      color = +b.dataset.ci;
      $('fColors').querySelectorAll('.swatch').forEach((n) => {
        const on = +n.dataset.ci === color;
        n.classList.toggle('active', on);
        n.setAttribute('aria-checked', on);
      });
      el.sheetIcon.style.setProperty('--ic', colorOf(color));
    });

    function save() {
      if (!validate()) {
        name.classList.remove('error'); void name.offsetWidth; name.classList.add('error');
        name.focus();
        return;
      }
      const v = name.value.trim();
      closeSheet();
      if (subject) updateSubject(subject.id, v, color);
      else addSubject(v, color);
    }
  }

  function openGradeForm(subject, grade = null) {
    if (!subject) return;
    const g = grade ? { ...grade } : { id: uuid(), value: 2, weight: 1, title: '', date: todayISO() };
    openSheet({
      title: grade ? t('Note bearbeiten') : t('Neue Note'),
      icon: grade ? 'pencil' : 'note',
      iconColor: colorOf(subject.color),
      body: `
        <div class="field">
          <span class="field-label">${t('Note')}</span>
          <div class="grade-pick" id="fGrades" role="radiogroup" aria-label="${t('Note')}">
            ${[1, 2, 3, 4, 5, 6].map((n) => `<button type="button" class="grade-opt${n === g.value ? ' active' : ''}" data-v="${n}"
               style="--gc:${gradeColor(n)}" role="radio" aria-checked="${n === g.value}" title="${t('Note {n} (Taste {n})', { n })}">${n}</button>`).join('')}
          </div>
        </div>
        <div class="field">
          <span class="field-label">${t('Gewichtung')}</span>
          <div class="seg" id="fWeight" role="radiogroup" aria-label="${t('Gewichtung')}">
            ${[1, 2].map((w) => `<button type="button" class="seg-opt${w === g.weight ? ' active' : ''}" data-w="${w}"
               role="radio" aria-checked="${w === g.weight}">${WEIGHTS[w].label} (${WEIGHTS[w].short})</button>`).join('')}
          </div>
        </div>
        <div class="field">
          <label class="field-label" for="fTitle">${t('Bezeichnung')}</label>
          <input class="input" id="fTitle" maxlength="100" placeholder="${t('z. B. Schulaufgabe, Ex, Referat')}" value="${esc(g.title)}">
        </div>
        <div class="field">
          <label class="field-label" for="fDate">${t('Datum')}</label>
          <input class="input" id="fDate" type="date" value="${g.date}" required>
          <div class="field-error" id="fDateErr"></div>
        </div>
        <div class="sheet-foot">
          ${grade ? '<button type="button" class="btn-danger-text" id="fDelete">' + t('Löschen') + '</button>' : ''}
          <span class="spacer"></span>
          <button type="button" class="btn btn-secondary" data-close>${t('Abbrechen')}</button>
          <button type="submit" class="btn btn-primary">${t('Speichern')}</button>
        </div>`,
      onSubmit: save,
      onKey: (e) => {

        if (/^[1-6]$/.test(e.key) && !(e.target instanceof HTMLInputElement) && !e.metaKey && !e.ctrlKey && !e.altKey) {
          e.preventDefault();
          setValue(+e.key);
        }
      },
    });

    const setValue = (v) => {
      g.value = v;
      $('fGrades').querySelectorAll('.grade-opt').forEach((n) => {
        const on = +n.dataset.v === v;
        n.classList.toggle('active', on);
        n.setAttribute('aria-checked', on);
      });
    };
    $('fGrades').addEventListener('click', (e) => { const b = e.target.closest('.grade-opt'); if (b) setValue(+b.dataset.v); });
    $('fWeight').addEventListener('click', (e) => {
      const b = e.target.closest('.seg-opt'); if (!b) return;
      g.weight = +b.dataset.w;
      $('fWeight').querySelectorAll('.seg-opt').forEach((n) => {
        const on = +n.dataset.w === g.weight;
        n.classList.toggle('active', on);
        n.setAttribute('aria-checked', on);
      });
    });
    if (grade) {
      $('fDelete').addEventListener('click', () => {
        closeSheet();
        deleteGrade(subject.id, grade.id);
        toast(t('Note gelöscht'));
      });
    }

    function save() {
      const date = $('fDate').value;
      if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
        $('fDateErr').textContent = t('Bitte ein gültiges Datum wählen.');
        const d = $('fDate'); d.classList.remove('error'); void d.offsetWidth; d.classList.add('error'); d.focus();
        return;
      }
      g.date = date;
      g.title = $('fTitle').value.trim();
      closeSheet();
      upsertGrade(subject.id, g);
      if (!grade) toast(t('Note gespeichert'));
    }
  }

  function confirmDeleteSubject(s) {
    if (!s) return;
    const n = s.grades.length;
    openSheet({
      title: t('„{name}“ löschen?', { name: s.name }),
      icon: 'trash',
      iconColor: 'var(--danger)',
      body: `
        <p class="sheet-text">${(n === 1 ? t('Das Fach {name} und {grades} werden dauerhaft gelöscht – auch in der Mac-App. Dies kann nicht rückgängig gemacht werden.', { name: '<strong>' + esc(s.name) + '</strong>', grades: '<strong>' + t('1 Note') + '</strong>' }) : t('Das Fach {name} und {grades} werden dauerhaft gelöscht – auch in der Mac-App. Dies kann nicht rückgängig gemacht werden.', { name: '<strong>' + esc(s.name) + '</strong>', grades: '<strong>' + t('{n} Noten', { n }) + '</strong>' }))}</p>
        <div class="sheet-foot">
          <span class="spacer"></span>
          <button type="button" class="btn btn-secondary" data-close autofocus>${t('Abbrechen')}</button>
          <button type="submit" class="btn btn-danger">${n === 0 ? t('Fach löschen') : n === 1 ? t('Fach und 1 Note löschen') : t('Fach und {n} Noten löschen', { n })}</button>
        </div>`,
      onSubmit: () => { closeSheet(); deleteSubject(s.id); },
    });
  }

  function showAuth(message = '') {
    stopPolling();
    closeSheet();
    closeMenu();
    state.subjects = []; state.loaded = false; state.view = { type: 'overview' };
    el.viewApp.hidden = true;
    el.tabs.hidden = true;
    el.pillnav.hidden = true;
    el.window.classList.add('is-auth');
    el.titlebarRight.hidden = true;
    el.viewAuth.hidden = false;
    el.authError.textContent = message;
    el.codeInput.value = '';
    document.title = 'NotePulse';
    requestAnimationFrame(() => el.codeInput.focus());
  }

  function authLost() {
    local.set(LS.authUntil, null);
    const n = sync.queue.length;
    showAuth(t('Deine Sitzung ist abgelaufen. Bitte melde dich erneut an.') +
      (n ? ' ' + (n === 1 ? t('1 Änderung bleibt gespeichert und wird danach übertragen.') : t('{n} Änderungen bleiben gespeichert und werden danach übertragen.', { n })) : ''));
  }

  function showApp({ offline = false } = {}) {
    el.viewAuth.hidden = true;
    el.viewApp.hidden = false;
    el.tabs.hidden = false;
    el.pillnav.hidden = false;
    el.window.classList.remove('is-auth');
    el.titlebarRight.hidden = false;

    const cached = local.get(LS.data);
    if (Array.isArray(cached)) {
      state.subjects = normalize(cached);
      state.loaded = true;
      render({ animate: true });
    } else {
      el.content.classList.add('loading');
      el.content.innerHTML = '<div class="spinner"></div>';
      renderSidebar();
    }

    if (offline) { sync.online = false; showOffline(); }
    else { setSyncState('syncing', t('Verbinde …')); flush(); }
    startPolling();
  }
  el.codeForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const code = el.codeInput.value.trim();
    if (!code) return authFail(t('Bitte gib deinen Zugangscode ein.'));
    el.joinBtn.disabled = true;
    try {
      const res = await api('login', { code, pwa: isPWA() });
      local.set(LS.authUntil, res && res.expires ? res.expires * 1000 : null);
      el.authError.textContent = '';
      showApp();
    } catch (err) {
      authFail(err.message);
    } finally {
      el.joinBtn.disabled = false;
    }
  });

  function authFail(msg) {
    el.authError.textContent = msg;
    el.codeField.classList.remove('error');
    void el.codeField.offsetWidth;
    el.codeField.classList.add('error');
    el.codeInput.select();
  }
  el.codeInput.addEventListener('input', () => { el.codeField.classList.remove('error'); el.authError.textContent = ''; });

  el.pasteBtn.addEventListener('click', async () => {
    try {
      const t = (await navigator.clipboard.readText()).trim();
      if (t) { el.codeInput.value = t.slice(0, 32); el.codeInput.focus(); }
    } catch (e) {
      toast(t('Zugriff auf die Zwischenablage nicht erlaubt.'), 'error');
    }
  });

  el.logoutBtn.addEventListener('click', async () => {
    if (sync.queue.length && navigator.onLine) await flush();
    const n = sync.queue.length;
    if (!n) return logout();
    openSheet({
      title: t('Nicht synchronisiert'),
      icon: 'alert',
      iconColor: 'var(--warning)',
      body: `
        <p class="sheet-text">${n === 1 ? t('<strong>1 Änderung wurde</strong> noch nicht an den Server übertragen, weil keine Verbindung besteht. Beim Abmelden geht sie verloren.') : t('<strong>{n} Änderungen wurden</strong> noch nicht an den Server übertragen, weil keine Verbindung besteht. Beim Abmelden gehen sie verloren.', { n })}</p>
        <div class="sheet-foot">
          <span class="spacer"></span>
          <button type="button" class="btn btn-secondary" data-close autofocus>${t('Angemeldet bleiben')}</button>
          <button type="submit" class="btn btn-danger">${t('Trotzdem abmelden')}</button>
        </div>`,
      onSubmit: () => { closeSheet(); logout(); },
    });
  });

  async function logout() {
    try { await api('logout', {}, 5000); } catch (e) { }

    sync.queue = [];
    local.set(LS.queue, null);
    local.set(LS.data, null);
    local.set(LS.authUntil, null);
    showAuth();
  }

  const APP_VERSION = '2026.11.18-0106';

  async function checkForUpdate() {
    if (!navigator.onLine) return;
    try {
      const reg = 'serviceWorker' in navigator ? await navigator.serviceWorker.getRegistration() : null;
      if (reg) reg.update().catch(() => {});
      const res = await fetch('version.json?t=' + Date.now(), { cache: 'no-store' });
      if (!res.ok) return;
      const { version } = await res.json();
      if (!version || version === APP_VERSION) return;

      let already = null;
      try { already = sessionStorage.getItem(LS.reloaded); } catch (e) { }
      if (already === version) return;
      try { sessionStorage.setItem(LS.reloaded, version); } catch (e) { }
      toast(t('Neue Version verfügbar – wird geladen …'), 'info');
      if (sync.queue.length) await flush();
      setTimeout(() => location.reload(), 900);
    } catch (e) { }
  }

  if ('serviceWorker' in navigator && window.isSecureContext) {
    window.addEventListener('load', () => navigator.serviceWorker.register('sw.js').catch(() => {}));
  }

  (async () => {
    const until = local.get(LS.authUntil);
    const offlineOk = typeof until === 'number' && until > Date.now() && Array.isArray(local.get(LS.data));
    try {
      const me = await api('me', null, 8000);
      if (me && me.authenticated) {
        if (me.expires) local.set(LS.authUntil, me.expires * 1000);
        showApp();
      } else {
        local.set(LS.authUntil, null);
        showAuth();
      }
    } catch (e) {

      if (offlineOk) showApp({ offline: true });
      else showAuth(t('Keine Verbindung zum Server.'));
    }
    checkForUpdate();
  })();
})();
