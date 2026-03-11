// PortalTheme.js — inject once at app level, imported by all portal pages
export const injectPortalTheme = () => {
  if (document.getElementById("portal-theme-style")) return;

  const font = document.createElement("link");
  font.rel = "stylesheet";
  font.href = "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap";
  document.head.appendChild(font);

  const style = document.createElement("style");
  style.id = "portal-theme-style";
  style.textContent = `
    /* ── CSS Variables ── */
    :root {
      --navy:    #0d1b2a;
      --navy2:   #162433;
      --navy3:   #1e3248;
      --gold:    #c9a84c;
      --gold2:   #e8c96e;
      --gold3:   rgba(201,168,76,0.12);
      --cream:   #f0e9d6;
      --text:    #ddd5c4;
      --muted:   #6e8499;
      --border:  rgba(201,168,76,0.15);
      --border2: rgba(201,168,76,0.3);
      --cardbg:  rgba(22,36,51,0.75);
      --hover:   rgba(22,36,51,0.95);
      --shadow:  0 8px 40px rgba(0,0,0,0.4);
    }

    /* ── Base ── */
    .pr { /* portal-root */
      font-family: 'DM Sans', sans-serif;
      background: var(--navy);
      min-height: 100vh;
      color: var(--text);
    }
    .pr *, .pr *::before, .pr *::after { box-sizing: border-box; }

    /* ── Background grid texture ── */
    .pr-bg {
      position: fixed; inset: 0; pointer-events: none; z-index: 0;
      background-image:
        linear-gradient(rgba(201,168,76,0.035) 1px, transparent 1px),
        linear-gradient(90deg, rgba(201,168,76,0.035) 1px, transparent 1px);
      background-size: 56px 56px;
    }
    .pr-glow {
      position: fixed; pointer-events: none; z-index: 0; border-radius: 50%;
      background: radial-gradient(circle, rgba(201,168,76,0.07) 0%, transparent 65%);
    }

    /* ── Topbar ── */
    .pr-topbar {
      position: sticky; top: 0; z-index: 90;
      display: flex; align-items: center; justify-content: space-between;
      padding: 0 40px; height: 64px;
      background: rgba(13,27,42,0.92);
      border-bottom: 1px solid var(--border);
      backdrop-filter: blur(16px);
    }
    .pr-brand {
      font-family: 'Cormorant Garamond', serif;
      font-size: 17px; font-weight: 700; color: var(--gold);
      letter-spacing: 0.2px; line-height: 1;
    }
    .pr-brand span { color: var(--text); font-weight: 400; }
    .pr-brand-sub { font-size: 11px; color: var(--muted); letter-spacing: 0.4px; margin-top: 2px; }
    .pr-topbar-right { display: flex; align-items: center; gap: 20px; }
    .pr-user-name { font-size: 14px; color: var(--text); font-weight: 500; }
    .pr-user-role {
      font-size: 10px; color: var(--gold); letter-spacing: 1.5px;
      text-transform: uppercase; margin-top: 1px;
    }
    .pr-logout {
      background: transparent; border: 1px solid var(--border);
      color: var(--muted); padding: 7px 18px; border-radius: 3px;
      font-family: 'DM Sans', sans-serif; font-size: 12px;
      cursor: pointer; letter-spacing: 0.3px; transition: all 0.2s;
    }
    .pr-logout:hover { border-color: var(--gold); color: var(--gold); }

    /* ── Page body ── */
    .pr-body { position: relative; z-index: 1; padding: 44px 44px; max-width: 1280px; margin: 0 auto; }
    .pr-page-header { margin-bottom: 36px; }
    .pr-eyebrow {
      font-size: 10px; letter-spacing: 3.5px; text-transform: uppercase;
      color: var(--gold); margin-bottom: 8px;
    }
    .pr-page-title {
      font-family: 'Cormorant Garamond', serif;
      font-size: 36px; font-weight: 600; color: var(--cream);
      margin: 0 0 4px; line-height: 1.1;
    }
    .pr-page-sub { font-size: 14px; color: var(--muted); font-weight: 300; margin: 0; }

    /* ── Cards ── */
    .pr-card {
      background: var(--cardbg); border: 1px solid var(--border);
      border-radius: 8px; padding: 28px; backdrop-filter: blur(8px);
    }
    .pr-card-title {
      font-family: 'Cormorant Garamond', serif;
      font-size: 18px; font-weight: 600; color: var(--cream);
      margin: 0 0 20px;
    }

    /* ── Stat cards ── */
    .pr-stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(140px,1fr)); gap: 14px; margin-bottom: 36px; }
    .pr-stat {
      background: var(--cardbg); border: 1px solid var(--border);
      border-radius: 8px; padding: 22px 18px; text-align: center;
      transition: border-color 0.2s;
    }
    .pr-stat:hover { border-color: var(--border2); }
    .pr-stat-num {
      font-family: 'Cormorant Garamond', serif;
      font-size: 42px; font-weight: 700; line-height: 1;
    }
    .pr-stat-label { font-size: 11px; color: var(--muted); margin-top: 6px; letter-spacing: 0.4px; }

    /* ── Booking cards ── */
    .pr-bcard {
      background: var(--cardbg); border: 1px solid var(--border);
      border-left-width: 3px; border-left-style: solid;
      border-radius: 8px; padding: 20px 24px; margin-bottom: 12px;
      transition: background 0.2s;
    }
    .pr-bcard:hover { background: var(--hover); }
    .pr-bcard.pending    { border-left-color: #f59e0b; }
    .pr-bcard.approved   { border-left-color: #4ade80; }
    .pr-bcard.conditional{ border-left-color: #60a5fa; }
    .pr-bcard.rejected   { border-left-color: #f87171; }
    .pr-bcard.checked_in { border-left-color: #a78bfa; }
    .pr-bcard.checked_out{ border-left-color: var(--muted); }
    .pr-bcard.gold       { border-left-color: var(--gold); }

    .pr-bcard-head {
      display: flex; justify-content: space-between; align-items: flex-start;
      margin-bottom: 14px; gap: 12px;
    }
    .pr-bcard-title {
      font-family: 'Cormorant Garamond', serif;
      font-size: 17px; font-weight: 600; color: var(--cream);
    }
    .pr-bcard-sub { font-size: 12px; color: var(--muted); margin-top: 3px; }

    .pr-details {
      display: grid; grid-template-columns: repeat(auto-fill, minmax(190px,1fr));
      gap: 8px 16px; margin-bottom: 14px;
    }
    .pr-detail-item { font-size: 13px; }
    .pr-dl { color: var(--muted); margin-right: 4px; }
    .pr-dv { color: var(--text); font-weight: 500; }

    .pr-warden-note {
      background: rgba(201,168,76,0.07); border: 1px solid rgba(201,168,76,0.2);
      border-radius: 4px; padding: 8px 12px; font-size: 13px;
      color: var(--gold); margin-bottom: 12px;
    }

    /* ── Room grid ── */
    .pr-room-grid {
      display: grid; grid-template-columns: repeat(auto-fill, minmax(185px,1fr)); gap: 12px;
    }
    .pr-room-card {
      background: var(--cardbg); border: 1px solid var(--border);
      border-radius: 8px; padding: 16px; transition: all 0.2s;
    }
    .pr-room-card.available { border-color: rgba(74,222,128,0.22); }
    .pr-room-card.available:hover { border-color: rgba(74,222,128,0.5); }
    .pr-room-card.booked { opacity: 0.55; }
    .pr-room-name {
      font-family: 'Cormorant Garamond', serif; font-size: 15px;
      font-weight: 600; color: var(--cream); margin-bottom: 10px;
      display: flex; justify-content: space-between; align-items: center;
    }
    .pr-room-row { font-size: 12px; color: var(--muted); margin: 5px 0; }

    /* ── Tags ── */
    .pt { display: inline-block; font-size: 11px; padding: 2px 10px; border-radius: 20px; font-weight: 500; letter-spacing: 0.2px; }
    .pt-green  { background: rgba(74,222,128,0.1);  color: #4ade80; }
    .pt-red    { background: rgba(248,113,113,0.1); color: #f87171; }
    .pt-gold   { background: rgba(201,168,76,0.1);  color: var(--gold); }
    .pt-blue   { background: rgba(96,165,250,0.1);  color: #60a5fa; }
    .pt-purple { background: rgba(167,139,250,0.1); color: #a78bfa; }
    .pt-muted  { background: rgba(110,132,153,0.1); color: var(--muted); }
    .pt-amber  { background: rgba(245,158,11,0.1);  color: #f59e0b; }

    /* ── Buttons ── */
    .pb {
      font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 500;
      padding: 8px 20px; border-radius: 4px; cursor: pointer;
      border: none; transition: all 0.18s; letter-spacing: 0.2px;
      display: inline-flex; align-items: center; gap: 6px;
    }
    .pb-gold { background: var(--gold); color: var(--navy); }
    .pb-gold:hover { background: var(--gold2); transform: translateY(-1px); }
    .pb-ghost { background: transparent; border: 1px solid var(--border); color: var(--muted); }
    .pb-ghost:hover { border-color: var(--gold); color: var(--gold); }
    .pb-green { background: rgba(74,222,128,0.1); border: 1px solid rgba(74,222,128,0.25); color: #4ade80; }
    .pb-green:hover { background: rgba(74,222,128,0.2); }
    .pb-red   { background: transparent; border: 1px solid rgba(248,113,113,0.25); color: #f87171; }
    .pb-red:hover { background: rgba(248,113,113,0.1); }
    .pb-blue  { background: rgba(96,165,250,0.1); border: 1px solid rgba(96,165,250,0.25); color: #60a5fa; }
    .pb-blue:hover { background: rgba(96,165,250,0.2); }
    .pb-purple{ background: rgba(167,139,250,0.1); border: 1px solid rgba(167,139,250,0.25); color: #a78bfa; }
    .pb-purple:hover { background: rgba(167,139,250,0.2); }
    .pb-sm { padding: 6px 14px; font-size: 12px; }
    .pb-lg { padding: 12px 28px; font-size: 15px; }
    .pb-full { width: 100%; justify-content: center; }
    .pb:disabled { opacity: 0.5; cursor: not-allowed; transform: none !important; }

    /* ── Tabs ── */
    .pr-tabs { display: flex; border-bottom: 1px solid var(--border); margin-bottom: 28px; gap: 0; }
    .pr-tab {
      padding: 12px 24px; cursor: pointer; font-size: 13px; color: var(--muted);
      border-bottom: 2px solid transparent; transition: all 0.2s;
      background: none; border-top: none; border-left: none; border-right: none;
      font-family: 'DM Sans', sans-serif; position: relative; bottom: -1px;
      letter-spacing: 0.2px; display: flex; align-items: center; gap: 8px;
    }
    .pr-tab:hover { color: var(--text); }
    .pr-tab.active { color: var(--gold); border-bottom-color: var(--gold); }
    .pr-badge {
      display: inline-flex; align-items: center; justify-content: center;
      background: var(--gold); color: var(--navy); border-radius: 10px;
      font-size: 10px; font-weight: 700; min-width: 18px; height: 18px; padding: 0 5px;
    }

    /* ── Filter pills ── */
    .pr-filters { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 20px; align-items: center; }
    .pr-filter {
      padding: 5px 14px; border-radius: 20px; font-size: 12px;
      cursor: pointer; border: 1px solid var(--border); background: transparent;
      color: var(--muted); font-family: 'DM Sans', sans-serif; transition: all 0.18s;
    }
    .pr-filter:hover, .pr-filter.active {
      background: var(--gold3); border-color: var(--gold); color: var(--gold);
    }

    /* ── Search ── */
    .pr-search {
      background: rgba(13,27,42,0.8); border: 1px solid var(--border);
      border-radius: 4px; padding: 9px 14px; color: var(--text);
      font-family: 'DM Sans', sans-serif; font-size: 13px;
      width: 100%; max-width: 360px; outline: none; transition: border-color 0.2s;
    }
    .pr-search:focus { border-color: var(--gold); }
    .pr-search::placeholder { color: var(--muted); }

    /* ── Form fields ── */
    .pr-field { margin-bottom: 18px; }
    .pr-label {
      display: block; font-size: 11px; color: var(--muted);
      letter-spacing: 0.8px; text-transform: uppercase; margin-bottom: 7px;
    }
    .pr-input {
      width: 100%; padding: 10px 14px; border-radius: 4px;
      background: rgba(13,27,42,0.85); border: 1px solid var(--border);
      color: var(--text); font-family: 'DM Sans', sans-serif;
      font-size: 14px; outline: none; transition: border-color 0.2s;
    }
    .pr-input:focus { border-color: var(--gold); box-shadow: 0 0 0 3px rgba(201,168,76,0.08); }
    .pr-input::placeholder { color: var(--muted); }
    .pr-input-wrap { position: relative; }
    .pr-input-icon {
      position: absolute; right: 12px; top: 50%; transform: translateY(-50%);
      cursor: pointer; background: none; border: none; color: var(--muted);
      font-size: 13px; padding: 0;
    }
    .pr-textarea {
      width: 100%; padding: 10px 14px; border-radius: 4px;
      background: rgba(13,27,42,0.85); border: 1px solid var(--border);
      color: var(--text); font-family: 'DM Sans', sans-serif;
      font-size: 14px; outline: none; resize: vertical; min-height: 80px;
      transition: border-color 0.2s;
    }
    .pr-textarea:focus { border-color: var(--gold); }
    .pr-textarea::placeholder { color: var(--muted); }
    .pr-select {
      width: 100%; padding: 10px 14px; border-radius: 4px;
      background: rgba(13,27,42,0.85); border: 1px solid var(--border);
      color: var(--text); font-family: 'DM Sans', sans-serif;
      font-size: 14px; outline: none; cursor: pointer;
      transition: border-color 0.2s; appearance: none;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%236e8499' d='M6 8L1 3h10z'/%3E%3C/svg%3E");
      background-repeat: no-repeat; background-position: right 12px center;
      padding-right: 36px;
    }
    .pr-select:focus { border-color: var(--gold); }

    /* ── Modal overlay ── */
    .pr-overlay {
      position: fixed; inset: 0; z-index: 200;
      background: rgba(0,0,0,0.7); backdrop-filter: blur(6px);
      display: flex; align-items: center; justify-content: center; padding: 20px;
    }
    .pr-modal {
      background: var(--navy2); border: 1px solid var(--border);
      border-radius: 10px; width: 100%; max-width: 520px;
      max-height: 90vh; overflow-y: auto;
      box-shadow: var(--shadow);
    }
    .pr-modal-head {
      padding: 22px 28px; border-bottom: 1px solid var(--border);
      display: flex; justify-content: space-between; align-items: center;
    }
    .pr-modal-title {
      font-family: 'Cormorant Garamond', serif;
      font-size: 22px; font-weight: 600; color: var(--cream);
    }
    .pr-modal-close {
      background: none; border: none; color: var(--muted); font-size: 18px;
      cursor: pointer; padding: 0; line-height: 1; transition: color 0.2s;
    }
    .pr-modal-close:hover { color: var(--gold); }
    .pr-modal-body { padding: 24px 28px; }
    .pr-modal-footer {
      padding: 16px 28px; border-top: 1px solid var(--border);
      display: flex; gap: 10px; justify-content: flex-end;
    }

    /* ── Hostel accordion ── */
    .pr-accordion { margin-bottom: 10px; }
    .pr-accordion-head {
      background: var(--cardbg); border: 1px solid var(--border);
      border-radius: 8px; padding: 16px 20px;
      display: flex; justify-content: space-between; align-items: center;
      cursor: pointer; transition: background 0.2s; user-select: none;
    }
    .pr-accordion-head:hover { background: var(--hover); }
    .pr-accordion-head.open { border-bottom-left-radius: 0; border-bottom-right-radius: 0; border-bottom-color: transparent; }
    .pr-accordion-body {
      background: rgba(13,27,42,0.5); border: 1px solid var(--border);
      border-top: none; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;
      padding: 20px;
    }
    .pr-accordion-title {
      font-family: 'Cormorant Garamond', serif;
      font-size: 17px; font-weight: 600; color: var(--cream);
      display: flex; align-items: center; gap: 12px;
    }
    .pr-chevron { color: var(--muted); font-size: 12px; transition: transform 0.2s; }
    .pr-chevron.open { transform: rotate(180deg); }

    /* ── Table ── */
    .pr-table-wrap {
      border: 1px solid var(--border); border-radius: 8px; overflow: hidden;
    }
    .pr-table { width: 100%; border-collapse: collapse; }
    .pr-table th {
      background: rgba(13,27,42,0.9); padding: 11px 16px;
      font-size: 11px; font-weight: 500; color: var(--muted);
      letter-spacing: 0.8px; text-transform: uppercase; text-align: left;
      border-bottom: 1px solid var(--border);
    }
    .pr-table td {
      padding: 12px 16px; border-bottom: 1px solid rgba(201,168,76,0.06);
      font-size: 13px; color: var(--text);
    }
    .pr-table tr:last-child td { border-bottom: none; }
    .pr-table tbody tr:hover td { background: rgba(27,46,66,0.4); }

    /* ── Code block ── */
    .pr-code {
      font-family: 'Courier New', monospace; font-size: 13px; font-weight: 600;
      background: rgba(201,168,76,0.08); border: 1px solid var(--border);
      color: var(--gold); padding: 3px 10px; border-radius: 4px;
      letter-spacing: 0.5px;
    }

    /* ── Step indicator ── */
    .pr-steps { display: flex; align-items: center; margin-bottom: 36px; }
    .pr-step { display: flex; align-items: center; }
    .pr-step-dot {
      width: 32px; height: 32px; border-radius: 50%; display: flex;
      align-items: center; justify-content: center; font-size: 13px;
      font-weight: 600; border: 2px solid var(--border);
      color: var(--muted); transition: all 0.2s; flex-shrink: 0;
    }
    .pr-step-dot.done { background: var(--gold); border-color: var(--gold); color: var(--navy); }
    .pr-step-dot.active { border-color: var(--gold); color: var(--gold); }
    .pr-step-label { font-size: 12px; color: var(--muted); margin-left: 8px; letter-spacing: 0.2px; }
    .pr-step-label.active { color: var(--gold); }
    .pr-step-line { flex: 1; height: 1px; background: var(--border); margin: 0 12px; min-width: 24px; }

    /* ── Empty state ── */
    .pr-empty {
      text-align: center; padding: 60px 20px;
      color: var(--muted); font-size: 14px;
    }
    .pr-empty-icon { font-size: 36px; margin-bottom: 12px; opacity: 0.5; }

    /* ── Divider ── */
    .pr-divider {
      display: flex; align-items: center; gap: 12px; margin: 20px 0;
    }
    .pr-divider-line { flex: 1; height: 1px; background: var(--border); }
    .pr-divider-text { font-size: 12px; color: var(--muted); }

    /* ── Animations ── */
    @keyframes prFadeUp { from { opacity:0; transform:translateY(14px); } to { opacity:1; transform:translateY(0); } }
    .pr-a1 { animation: prFadeUp 0.4s ease both; }
    .pr-a2 { animation: prFadeUp 0.4s 0.08s ease both; }
    .pr-a3 { animation: prFadeUp 0.4s 0.16s ease both; }
    .pr-a4 { animation: prFadeUp 0.4s 0.24s ease both; }

    /* ── Loading spinner ── */
    @keyframes prSpin { to { transform: rotate(360deg); } }
    .pr-spin {
      width: 32px; height: 32px; border: 2px solid var(--border);
      border-top-color: var(--gold); border-radius: 50%;
      animation: prSpin 0.7s linear infinite; margin: 60px auto; display: block;
    }

    /* ── Popconfirm overlay ── */
    .pr-pop {
      position: fixed; inset: 0; z-index: 300;
      background: rgba(0,0,0,0.7); backdrop-filter: blur(4px);
      display: flex; align-items: center; justify-content: center; padding: 20px;
    }
    .pr-pop-box {
      background: var(--navy2); border: 1px solid var(--border);
      border-radius: 8px; padding: 24px 28px; max-width: 380px; width: 100%;
      box-shadow: var(--shadow);
    }
    .pr-pop-title { font-size: 15px; color: var(--cream); font-weight: 500; margin-bottom: 6px; }
    .pr-pop-desc { font-size: 13px; color: var(--muted); margin-bottom: 20px; }
    .pr-pop-actions { display: flex; gap: 10px; justify-content: flex-end; }

    /* ── Admin room control row ── */
    .pr-room-controls { display: flex; gap: 24px; flex-wrap: wrap; align-items: center; }
    .pr-control { display: flex; align-items: center; gap: 8px; font-size: 13px; color: var(--muted); }
    .pr-number {
      background: rgba(13,27,42,0.8); border: 1px solid var(--border);
      color: var(--text); border-radius: 4px; padding: 5px 10px;
      font-family: 'DM Sans', sans-serif; font-size: 13px;
      width: 64px; outline: none; text-align: center; transition: border-color 0.2s;
    }
    .pr-number:focus { border-color: var(--gold); }
    .pr-toggle {
      width: 40px; height: 22px; border-radius: 11px; border: none;
      cursor: pointer; position: relative; transition: background 0.2s; flex-shrink: 0;
    }
    .pr-toggle::after {
      content: ''; position: absolute; top: 3px; left: 3px;
      width: 16px; height: 16px; border-radius: 50%; background: white;
      transition: transform 0.2s;
    }
    .pr-toggle.on { background: var(--gold); }
    .pr-toggle.on::after { transform: translateX(18px); }
    .pr-toggle.off { background: var(--muted); }

    /* ── Admin warning box ── */
    .pr-warn {
      background: rgba(245,158,11,0.07); border: 1px solid rgba(245,158,11,0.25);
      border-radius: 4px; padding: 10px 14px; font-size: 13px; color: #f59e0b;
      margin-bottom: 16px;
    }

    /* ── Responsive ── */
    @media (max-width: 768px) {
      .pr-topbar { padding: 0 20px; }
      .pr-body { padding: 20px; }
      .pr-details { grid-template-columns: 1fr 1fr; }
      .pr-modal { max-width: 100%; }
      .pr-steps { overflow-x: auto; }
    }
  `;
  document.head.appendChild(style);
};
