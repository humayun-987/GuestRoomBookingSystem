import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth, ROLE_HOME } from "./AuthContext.jsx";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../comp/firebaseConfig";

/* ─── Google Fonts ─────────────────────────────────────────── */
const fontLink = document.createElement("link");
fontLink.rel = "stylesheet";
fontLink.href =
  "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500&display=swap";
document.head.appendChild(fontLink);

/* ─── Styles ────────────────────────────────────────────────── */
const injectStyles = () => {
  if (document.getElementById("landing-styles")) return;
  const style = document.createElement("style");
  style.id = "landing-styles";
  style.textContent = `
    :root {
      --navy:   #0d1b2a;
      --navy2:  #1b2e42;
      --gold:   #c9a84c;
      --gold2:  #e8c96e;
      --cream:  #f5f0e8;
      --text:   #e8e0d0;
      --muted:  #8a9ab0;
    }

    .lp-root * { box-sizing: border-box; margin: 0; padding: 0; }
    .lp-root {
      font-family: 'DM Sans', sans-serif;
      background: var(--navy);
      color: var(--text);
      overflow-x: hidden;
    }

    /* NAV */
    .lp-nav {
      position: fixed; top: 0; left: 0; right: 0; z-index: 100;
      display: flex; align-items: center; justify-content: space-between;
      padding: 20px 60px;
      background: rgba(13,27,42,0.85);
      backdrop-filter: blur(12px);
      border-bottom: 1px solid rgba(201,168,76,0.15);
      transition: padding 0.3s;
    }
    .lp-logo {
      font-family: 'Cormorant Garamond', serif;
      font-size: 22px; font-weight: 700;
      color: var(--gold);
      letter-spacing: 0.5px;
    }
    .lp-logo span { color: var(--text); font-weight: 400; }
    .lp-nav-btns { display: flex; gap: 12px; align-items: center; }
    .lp-btn-ghost {
      background: transparent;
      border: 1px solid rgba(201,168,76,0.4);
      color: var(--gold);
      padding: 9px 24px; border-radius: 3px;
      font-family: 'DM Sans', sans-serif;
      font-size: 14px; font-weight: 500;
      cursor: pointer; letter-spacing: 0.3px;
      transition: all 0.2s;
    }
    .lp-btn-ghost:hover {
      background: rgba(201,168,76,0.1);
      border-color: var(--gold);
    }
    .lp-btn-solid {
      background: var(--gold);
      border: 1px solid var(--gold);
      color: var(--navy);
      padding: 9px 24px; border-radius: 3px;
      font-family: 'DM Sans', sans-serif;
      font-size: 14px; font-weight: 500;
      cursor: pointer; letter-spacing: 0.3px;
      transition: all 0.2s;
    }
    .lp-btn-solid:hover { background: var(--gold2); }

    /* HERO */
    .lp-hero {
      min-height: 100vh;
      display: flex; align-items: center;
      padding: 120px 60px 80px;
      position: relative; overflow: hidden;
    }
    .lp-hero-bg {
      position: absolute; inset: 0;
      background: 
        radial-gradient(ellipse at 70% 40%, rgba(201,168,76,0.07) 0%, transparent 60%),
        radial-gradient(ellipse at 10% 80%, rgba(201,168,76,0.05) 0%, transparent 50%);
    }
    .lp-hero-grid {
      position: absolute; inset: 0;
      background-image:
        linear-gradient(rgba(201,168,76,0.04) 1px, transparent 1px),
        linear-gradient(90deg, rgba(201,168,76,0.04) 1px, transparent 1px);
      background-size: 60px 60px;
      mask-image: radial-gradient(ellipse at 60% 50%, black 20%, transparent 70%);
    }
    .lp-hero-content { position: relative; max-width: 680px; }
    .lp-eyebrow {
      display: inline-flex; align-items: center; gap: 10px;
      color: var(--gold); font-size: 12px;
      font-weight: 500; letter-spacing: 3px; text-transform: uppercase;
      margin-bottom: 24px;
    }
    .lp-eyebrow::before {
      content: ''; display: block;
      width: 32px; height: 1px; background: var(--gold);
    }
    .lp-hero h1 {
      font-family: 'Cormorant Garamond', serif;
      font-size: clamp(48px, 7vw, 86px);
      font-weight: 600; line-height: 1.05;
      color: var(--cream);
      margin-bottom: 10px;
    }
    .lp-hero h1 em {
      font-style: italic; color: var(--gold);
    }
    .lp-hero-sub {
      font-size: 16px; color: var(--muted);
      line-height: 1.7; max-width: 480px;
      margin: 24px 0 44px; font-weight: 300;
    }
    .lp-hero-actions { display: flex; gap: 14px; flex-wrap: wrap; }
    .lp-btn-primary {
      background: var(--gold);
      color: var(--navy);
      border: none;
      padding: 14px 36px; border-radius: 3px;
      font-family: 'DM Sans', sans-serif;
      font-size: 15px; font-weight: 500;
      cursor: pointer; letter-spacing: 0.3px;
      transition: all 0.25s;
    }
    .lp-btn-primary:hover {
      background: var(--gold2);
      transform: translateY(-1px);
      box-shadow: 0 8px 24px rgba(201,168,76,0.25);
    }
    .lp-btn-outline {
      background: transparent;
      color: var(--text);
      border: 1px solid rgba(232,224,208,0.25);
      padding: 14px 36px; border-radius: 3px;
      font-family: 'DM Sans', sans-serif;
      font-size: 15px; font-weight: 400;
      cursor: pointer; letter-spacing: 0.3px;
      transition: all 0.25s;
    }
    .lp-btn-outline:hover {
      border-color: rgba(232,224,208,0.5);
      background: rgba(232,224,208,0.05);
    }

    /* FLOATING CARD */
    .lp-hero-card {
      position: absolute; right: 60px; top: 50%;
      transform: translateY(-50%);
      background: rgba(27,46,66,0.75);
      border: 1px solid rgba(201,168,76,0.2);
      border-radius: 12px; padding: 24px 0 0;
      width: 340px;
      backdrop-filter: blur(20px);
      box-shadow: 0 32px 80px rgba(0,0,0,0.4);
      display: flex; flex-direction: column;
      max-height: 420px;
    }
    .lp-card-head {
      padding: 0 24px 16px;
      border-bottom: 1px solid rgba(201,168,76,0.12);
    }
    .lp-card-title {
      font-family: 'Cormorant Garamond', serif;
      font-size: 18px; color: var(--cream);
      margin-bottom: 4px; font-weight: 600;
    }
    .lp-card-updated {
      font-size: 11px; color: var(--muted); letter-spacing: 0.3px;
    }
    .lp-card-scroll {
      overflow-y: auto; flex: 1;
      padding: 0 24px 16px;
    }
    .lp-card-scroll::-webkit-scrollbar { width: 4px; }
    .lp-card-scroll::-webkit-scrollbar-track { background: transparent; }
    .lp-card-scroll::-webkit-scrollbar-thumb { background: rgba(201,168,76,0.2); border-radius: 2px; }
    .lp-hostel-group { margin-top: 14px; }
    .lp-hostel-label {
      font-size: 10px; letter-spacing: 2px; text-transform: uppercase;
      color: var(--gold); margin-bottom: 8px; opacity: 0.7;
    }
    .lp-room-row {
      display: flex; align-items: center; justify-content: space-between;
      padding: 8px 0; border-bottom: 1px solid rgba(201,168,76,0.06);
      gap: 8px;
    }
    .lp-room-row:last-child { border-bottom: none; }
    .lp-room-info { display: flex; flex-direction: column; gap: 2px; min-width: 0; }
    .lp-room-name { font-size: 13px; color: var(--text); font-weight: 500; }
    .lp-room-meta { font-size: 11px; color: var(--muted); }
    .lp-room-badge {
      font-size: 10px; font-weight: 500;
      padding: 3px 9px; border-radius: 20px;
      letter-spacing: 0.5px; white-space: nowrap; flex-shrink: 0;
    }
    .badge-green  { background: rgba(74,222,128,0.12);  color: #4ade80; }
    .badge-red    { background: rgba(248,113,113,0.12); color: #f87171; }
    .badge-gold   { background: rgba(201,168,76,0.12);  color: var(--gold); }
    .badge-amber  { background: rgba(245,158,11,0.12);  color: #f59e0b; }
    .badge-muted  { background: rgba(110,132,153,0.15); color: var(--muted); }

    /* STATS */
    .lp-stats {
      display: grid; grid-template-columns: repeat(4, 1fr);
      border-top: 1px solid rgba(201,168,76,0.12);
      border-bottom: 1px solid rgba(201,168,76,0.12);
    }
    .lp-stat {
      padding: 48px 40px; text-align: center;
      border-right: 1px solid rgba(201,168,76,0.12);
      transition: background 0.3s;
    }
    .lp-stat:last-child { border-right: none; }
    .lp-stat:hover { background: rgba(201,168,76,0.03); }
    .lp-stat-num {
      font-family: 'Cormorant Garamond', serif;
      font-size: 52px; font-weight: 700;
      color: var(--gold); line-height: 1;
    }
    .lp-stat-label {
      font-size: 13px; color: var(--muted);
      margin-top: 8px; letter-spacing: 0.5px;
    }

    /* FEATURES */
    .lp-section { padding: 100px 60px; }
    .lp-section-label {
      font-size: 11px; letter-spacing: 4px;
      text-transform: uppercase; color: var(--gold);
      margin-bottom: 16px;
    }
    .lp-section-title {
      font-family: 'Cormorant Garamond', serif;
      font-size: clamp(36px, 4vw, 52px);
      font-weight: 600; color: var(--cream);
      line-height: 1.15; max-width: 500px;
    }
    .lp-features-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1px; margin-top: 60px;
      border: 1px solid rgba(201,168,76,0.12);
      border-radius: 8px; overflow: hidden;
    }
    .lp-feature {
      padding: 40px 36px;
      background: rgba(27,46,66,0.3);
      transition: background 0.3s;
      position: relative; overflow: hidden;
    }
    .lp-feature::before {
      content: ''; position: absolute;
      top: 0; left: 0; right: 0; height: 2px;
      background: linear-gradient(90deg, var(--gold), transparent);
      opacity: 0; transition: opacity 0.3s;
    }
    .lp-feature:hover { background: rgba(27,46,66,0.6); }
    .lp-feature:hover::before { opacity: 1; }
    .lp-feature-icon {
      font-size: 28px; margin-bottom: 20px; display: block;
    }
    .lp-feature-title {
      font-family: 'Cormorant Garamond', serif;
      font-size: 22px; font-weight: 600;
      color: var(--cream); margin-bottom: 12px;
    }
    .lp-feature-desc {
      font-size: 14px; color: var(--muted);
      line-height: 1.7; font-weight: 300;
    }

    /* HOW IT WORKS */
    .lp-how { background: rgba(27,46,66,0.25); }
    .lp-steps {
      display: grid; grid-template-columns: repeat(4, 1fr);
      gap: 40px; margin-top: 60px; position: relative;
    }
    .lp-steps::before {
      content: '';
      position: absolute; top: 28px; left: 10%; right: 10%; height: 1px;
      background: linear-gradient(90deg, transparent, var(--gold), transparent);
      opacity: 0.3;
    }
    .lp-step { text-align: center; }
    .lp-step-num {
      width: 56px; height: 56px; border-radius: 50%;
      border: 1px solid rgba(201,168,76,0.3);
      display: flex; align-items: center; justify-content: center;
      margin: 0 auto 20px;
      font-family: 'Cormorant Garamond', serif;
      font-size: 22px; color: var(--gold);
      background: var(--navy);
      position: relative; z-index: 1;
    }
    .lp-step-title {
      font-size: 15px; font-weight: 500;
      color: var(--cream); margin-bottom: 8px;
    }
    .lp-step-desc {
      font-size: 13px; color: var(--muted);
      line-height: 1.6; font-weight: 300;
    }

    /* ROLES */
    .lp-roles-grid {
      display: grid; grid-template-columns: repeat(2, 1fr);
      gap: 20px; margin-top: 60px;
    }
    .lp-role-card {
      padding: 36px; border-radius: 8px;
      border: 1px solid rgba(201,168,76,0.12);
      background: rgba(27,46,66,0.3);
      transition: all 0.3s; cursor: default;
    }
    .lp-role-card:hover {
      border-color: rgba(201,168,76,0.35);
      background: rgba(27,46,66,0.5);
      transform: translateY(-3px);
    }
    .lp-role-icon { font-size: 32px; margin-bottom: 16px; }
    .lp-role-title {
      font-family: 'Cormorant Garamond', serif;
      font-size: 24px; font-weight: 600;
      color: var(--cream); margin-bottom: 10px;
    }
    .lp-role-desc {
      font-size: 14px; color: var(--muted);
      line-height: 1.7; font-weight: 300;
    }
    .lp-role-perms {
      margin-top: 16px; display: flex; flex-wrap: wrap; gap: 8px;
    }
    .lp-perm {
      font-size: 11px; letter-spacing: 0.5px;
      padding: 4px 10px; border-radius: 20px;
      background: rgba(201,168,76,0.08);
      color: var(--gold); border: 1px solid rgba(201,168,76,0.15);
    }

    /* BOOKING LIFECYCLE */
    .lp-lifecycle { background: rgba(13,27,42,0.6); }
    .lp-lifecycle-wrap {
      margin-top: 60px; position: relative;
    }

    /* Main track */
    .lp-track {
      display: flex; align-items: flex-start;
      gap: 0; position: relative; margin-bottom: 48px;
    }
    .lp-track-line {
      position: absolute; top: 28px; left: 28px; right: 28px; height: 1px;
      background: linear-gradient(90deg, transparent, rgba(201,168,76,0.3) 10%, rgba(201,168,76,0.3) 90%, transparent);
      z-index: 0;
    }
    .lp-node {
      flex: 1; display: flex; flex-direction: column; align-items: center;
      cursor: pointer; position: relative; z-index: 1;
      transition: transform 0.2s;
    }
    .lp-node:hover { transform: translateY(-3px); }
    .lp-node.active .lp-node-circle {
      background: var(--gold);
      border-color: var(--gold);
      box-shadow: 0 0 0 6px rgba(201,168,76,0.15), 0 0 24px rgba(201,168,76,0.3);
    }
    .lp-node.active .lp-node-circle span { color: var(--navy); }
    .lp-node.active .lp-node-label { color: var(--gold); }
    .lp-node-circle {
      width: 56px; height: 56px; border-radius: 50%;
      border: 1px solid rgba(201,168,76,0.3);
      background: rgba(27,46,66,0.8);
      display: flex; align-items: center; justify-content: center;
      margin-bottom: 12px; transition: all 0.3s;
    }
    .lp-node-circle span { font-size: 22px; }
    .lp-node-label {
      font-size: 12px; font-weight: 500; color: var(--muted);
      text-align: center; letter-spacing: 0.3px;
      transition: color 0.3s; max-width: 80px;
      line-height: 1.4;
    }

    /* Branch for warden decision */
    .lp-branch {
      display: flex; justify-content: center; gap: 16px;
      margin-bottom: 32px; position: relative;
    }
    .lp-branch-line {
      position: absolute; top: -1px; left: 50%; width: 1px; height: 20px;
      background: rgba(201,168,76,0.3); transform: translateX(-50%);
    }
    .lp-branch-card {
      flex: 1; max-width: 200px; border-radius: 8px; padding: 16px 18px;
      border: 1px solid transparent; cursor: pointer;
      transition: all 0.25s; position: relative;
    }
    .lp-branch-card.approve {
      background: rgba(74,222,128,0.05);
      border-color: rgba(74,222,128,0.15);
    }
    .lp-branch-card.approve:hover, .lp-branch-card.approve.sel {
      background: rgba(74,222,128,0.1);
      border-color: rgba(74,222,128,0.4);
      transform: translateY(-2px);
    }
    .lp-branch-card.conditional {
      background: rgba(201,168,76,0.05);
      border-color: rgba(201,168,76,0.15);
    }
    .lp-branch-card.conditional:hover, .lp-branch-card.conditional.sel {
      background: rgba(201,168,76,0.1);
      border-color: rgba(201,168,76,0.4);
      transform: translateY(-2px);
    }
    .lp-branch-card.reject {
      background: rgba(248,113,113,0.05);
      border-color: rgba(248,113,113,0.15);
    }
    .lp-branch-card.reject:hover, .lp-branch-card.reject.sel {
      background: rgba(248,113,113,0.1);
      border-color: rgba(248,113,113,0.4);
      transform: translateY(-2px);
    }
    .lp-branch-icon { font-size: 18px; margin-bottom: 6px; }
    .lp-branch-title {
      font-size: 13px; font-weight: 600; margin-bottom: 4px; color: var(--cream);
    }
    .lp-branch-desc {
      font-size: 12px; color: var(--muted); line-height: 1.5; font-weight: 300;
    }

    /* Detail panel */
    .lp-detail-panel {
      border-radius: 10px; padding: 28px 32px;
      border: 1px solid rgba(201,168,76,0.15);
      background: rgba(27,46,66,0.5);
      backdrop-filter: blur(8px);
      transition: all 0.3s;
      min-height: 130px;
    }
    .lp-detail-who {
      font-size: 11px; letter-spacing: 2px; text-transform: uppercase;
      color: var(--gold); margin-bottom: 8px; opacity: 0.8;
    }
    .lp-detail-title {
      font-family: 'Cormorant Garamond', serif;
      font-size: 26px; font-weight: 600; color: var(--cream);
      margin-bottom: 10px;
    }
    .lp-detail-desc {
      font-size: 14px; color: var(--muted); line-height: 1.75;
      font-weight: 300; max-width: 640px;
    }
    .lp-detail-tags {
      margin-top: 16px; display: flex; flex-wrap: wrap; gap: 8px;
    }
    .lp-detail-tag {
      font-size: 11px; padding: 4px 12px; border-radius: 20px;
      background: rgba(201,168,76,0.08); color: var(--gold);
      border: 1px solid rgba(201,168,76,0.15); letter-spacing: 0.3px;
    }

    @media (max-width: 900px) {
      .lp-track { flex-wrap: wrap; gap: 20px; }
      .lp-track-line { display: none; }
      .lp-branch { flex-direction: column; align-items: center; }
      .lp-branch-card { max-width: 100%; width: 100%; }
    }

    /* CTA */
    .lp-cta {
      padding: 120px 60px; text-align: center;
      position: relative; overflow: hidden;
    }
    .lp-cta-bg {
      position: absolute; inset: 0;
      background: radial-gradient(ellipse at 50% 50%, rgba(201,168,76,0.08) 0%, transparent 65%);
    }
    .lp-cta h2 {
      font-family: 'Cormorant Garamond', serif;
      font-size: clamp(40px, 5vw, 64px);
      font-weight: 600; color: var(--cream);
      position: relative; margin-bottom: 16px;
    }
    .lp-cta h2 em { color: var(--gold); font-style: italic; }
    .lp-cta p {
      color: var(--muted); font-size: 16px;
      font-weight: 300; margin-bottom: 40px;
      position: relative;
    }
    .lp-cta-btns {
      display: flex; gap: 14px;
      justify-content: center; flex-wrap: wrap;
      position: relative;
    }

    /* FOOTER */
    .lp-footer {
      padding: 40px 60px;
      border-top: 1px solid rgba(201,168,76,0.1);
      display: flex; align-items: center; justify-content: space-between;
      flex-wrap: wrap; gap: 16px;
    }
    .lp-footer-logo {
      font-family: 'Cormorant Garamond', serif;
      font-size: 18px; color: var(--gold); font-weight: 600;
    }
    .lp-footer-text {
      font-size: 13px; color: var(--muted);
    }

    /* ANIMATIONS */
    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(24px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes fadeIn {
      from { opacity: 0; }
      to   { opacity: 1; }
    }
    @keyframes float {
      0%, 100% { transform: translateY(-50%) translateX(0); }
      50%       { transform: translateY(-52%) translateX(-4px); }
    }
    .anim-1 { animation: fadeUp 0.7s ease both; }
    .anim-2 { animation: fadeUp 0.7s 0.15s ease both; }
    .anim-3 { animation: fadeUp 0.7s 0.3s ease both; }
    .anim-4 { animation: fadeUp 0.7s 0.45s ease both; }
    .anim-card { animation: float 5s ease-in-out infinite, fadeIn 1s 0.6s ease both; }

    /* RESPONSIVE */
    @media (max-width: 900px) {
      .lp-nav { padding: 16px 24px; }
      .lp-hero { padding: 100px 24px 60px; }
      .lp-hero-card { display: none; }
      .lp-stats { grid-template-columns: repeat(2,1fr); }
      .lp-stat { border-right: none; border-bottom: 1px solid rgba(201,168,76,0.12); }
      .lp-section { padding: 60px 24px; }
      .lp-features-grid { grid-template-columns: 1fr; }
      .lp-steps { grid-template-columns: repeat(2,1fr); }
      .lp-steps::before { display: none; }
      .lp-roles-grid { grid-template-columns: 1fr; }
      .lp-cta { padding: 80px 24px; }
      .lp-footer { padding: 30px 24px; }
    }
  `;
  document.head.appendChild(style);
};

/* ─── Fetch real room availability ─────────────────────────── */
async function fetchLiveRooms() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // 1. Get all hostels + all their rooms
  const hostelSnap = await getDocs(collection(db, "hostels"));
  const allRooms = [];

  for (const hostelDoc of hostelSnap.docs) {
    const hostel = { id: hostelDoc.id, ...hostelDoc.data() };
    const roomSnap = await getDocs(collection(db, "hostels", hostelDoc.id, "rooms"));
    roomSnap.docs.forEach((roomDoc, idx) => {
      allRooms.push({
        id: roomDoc.id,
        hostelId: hostel.id,
        hostelName: hostel.name,
        roomNo: idx + 1,
        ...roomDoc.data(),
      });
    });
  }

  if (allRooms.length === 0) return [];

  // 2. Get all active bookings
  const activeStatuses = ["pending", "approved", "conditional", "checked_in"];
  const bookingSnap = await getDocs(
    query(collection(db, "bookings"), where("status", "in", activeStatuses))
  );
  const activeBookings = bookingSnap.docs.map(d => ({ id: d.id, ...d.data() }));

  // 3. Determine status per room
  return allRooms.map(room => {
    if (room.maintenance) {
      return { ...room, statusLabel: "Maintenance", badge: "badge-amber" };
    }
    const isOccupied = activeBookings.some(b => {
      if (b.roomId !== room.id) return false;
      const bIn  = b.checkIn?.toDate?.()  || new Date(0);
      const bOut = b.checkOut?.toDate?.() || new Date(0);
      return bIn <= today && bOut >= today;
    });
    if (isOccupied) return { ...room, statusLabel: "Booked",     badge: "badge-red"   };
    const isPending = activeBookings.some(b => b.roomId === room.id && b.status === "pending");
    if (isPending)  return { ...room, statusLabel: "Pending",    badge: "badge-gold"  };
    return               { ...room, statusLabel: "Available",  badge: "badge-green" };
  });
}

/* ─── Booking Lifecycle Component ──────────────────────────── */
const STAGES = [
  {
    id: "submit", icon: "📝", label: "Student\nSubmits",
    who: "Student",
    title: "Booking Request Submitted",
    desc: "The student picks check-in and check-out dates, selects an available room, fills in guest details (name, relation, purpose), uploads Aadhar, College ID, and Guest ID proof — then submits. The booking is immediately marked Pending.",
    tags: ["Dates Selected", "Room Locked", "Documents Uploaded", "Status: Pending"],
  },
  {
    id: "warden", icon: "🏠", label: "Warden\nReviews",
    who: "Warden",
    title: "Warden Reviews the Request",
    desc: "The warden of that hostel sees the booking in their Pending tab. They review all guest details and submitted documents before making a decision. Three outcomes are possible — choose one below.",
    tags: ["Documents Verified", "Guest Details Checked", "Action Required"],
    branch: true,
  },
  {
    id: "caretaker", icon: "🛎️", label: "Guest\nArrives",
    who: "Caretaker",
    title: "Caretaker Checks In the Guest",
    desc: "On the day of arrival, the caretaker sees the booking in Expected Arrivals. They verify the guest's physical ID and any conditions set by the warden, then mark the booking as Checked In. The room is now occupied.",
    tags: ["ID Verified at Gate", "Condition Checked", "Status: Checked In"],
  },
  {
    id: "stay", icon: "🌙", label: "Guest\nStays",
    who: "Guest",
    title: "Guest Stay in Progress",
    desc: "The guest stays in the assigned room for the booked duration. The caretaker can see all currently staying guests in the Active Stays tab. The student can track the booking status live on their dashboard.",
    tags: ["Room Occupied", "Visible to Caretaker", "Status: Checked In"],
  },
  {
    id: "checkout", icon: "✅", label: "Check\nOut",
    who: "Caretaker",
    title: "Guest Checked Out",
    desc: "At the end of the stay, the caretaker marks the guest as Checked Out. The room date range is immediately freed for new bookings — no manual room reset needed. The student sees the booking move to History.",
    tags: ["Room Freed Automatically", "Booking Archived", "Status: Checked Out"],
  },
];

const BRANCHES = [
  {
    id: "approve", cls: "approve", icon: "✅",
    title: "Approved",
    desc: "Booking confirmed. Student and caretaker are notified. Guest can arrive on the check-in date.",
  },
  {
    id: "conditional", cls: "conditional", icon: "〜",
    title: "Approved with Condition",
    desc: "Approved but the warden has attached a note — e.g. 'verify student ID at gate'. Caretaker sees this condition prominently before check-in.",
  },
  {
    id: "reject", cls: "reject", icon: "✕",
    title: "Rejected",
    desc: "Booking denied with a mandatory reason. The student sees the reason and gets a one-click option to re-apply for the same room with new details.",
  },
];

function BookingLifecycle() {
  const [active, setActive]   = useState(0);
  const [branch, setBranch]   = useState("approve");

  const stage = STAGES[active];

  return (
    <section className="lp-section lp-lifecycle">
      <div className="lp-section-label">Booking System</div>
      <h2 className="lp-section-title">From request to check-out</h2>

      <div className="lp-lifecycle-wrap">

        {/* ── Stage track ── */}
        <div className="lp-track">
          <div className="lp-track-line" />
          {STAGES.map((s, i) => (
            <div key={s.id}
              className={`lp-node ${active === i ? "active" : ""}`}
              onClick={() => setActive(i)}>
              <div className="lp-node-circle"><span>{s.icon}</span></div>
              <div className="lp-node-label" style={{ whiteSpace: "pre-line" }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* ── Warden branch (only when warden stage active) ── */}
        {stage.branch && (
          <div className="lp-branch">
            <div className="lp-branch-line" />
            {BRANCHES.map(b => (
              <div key={b.id}
                className={`lp-branch-card ${b.cls}${branch === b.id ? " sel" : ""}`}
                onClick={() => setBranch(b.id)}>
                <div className="lp-branch-icon">{b.icon}</div>
                <div className="lp-branch-title">{b.title}</div>
                <div className="lp-branch-desc">{b.desc}</div>
              </div>
            ))}
          </div>
        )}

        {/* ── Detail panel ── */}
        <div className="lp-detail-panel">
          <div className="lp-detail-who">{stage.who}</div>
          <div className="lp-detail-title">
            {stage.branch && branch !== "approve"
              ? branch === "conditional"
                ? "Approved with Condition"
                : "Booking Rejected"
              : stage.title}
          </div>
          <div className="lp-detail-desc">
            {stage.branch
              ? BRANCHES.find(b => b.id === branch)?.desc + " " + stage.desc.split(".")[stage.desc.split(".").length > 1 ? 1 : 0]
              : stage.desc}
          </div>
          <div className="lp-detail-tags">
            {(stage.branch
              ? [...(BRANCHES.find(b => b.id === branch) ? [`Decision: ${BRANCHES.find(b => b.id === branch).title}`] : []), ...stage.tags]
              : stage.tags
            ).map(t => (
              <span key={t} className="lp-detail-tag">{t}</span>
            ))}
          </div>
        </div>

        {/* ── Step indicator ── */}
        <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 24 }}>
          {STAGES.map((_, i) => (
            <button key={i} onClick={() => setActive(i)} style={{
              width: active === i ? 24 : 8, height: 8,
              borderRadius: 4, border: "none", cursor: "pointer",
              background: active === i ? "var(--gold)" : "rgba(201,168,76,0.2)",
              transition: "all 0.3s", padding: 0,
            }} />
          ))}
        </div>

      </div>
    </section>
  );
}


export default function LandingPage() {
  const navigate  = useNavigate();
  const { user, role, loading } = useAuth();
  const navRef    = useRef(null);
  const [liveRooms, setLiveRooms] = useState([]);
  const [roomsLoading, setRoomsLoading] = useState(true);

  useEffect(() => { injectStyles(); }, []);

  // Fetch real room data
  useEffect(() => {
    fetchLiveRooms()
      .then(data => setLiveRooms(data))
      .catch(() => setLiveRooms([]))
      .finally(() => setRoomsLoading(false));
  }, []);

  // If already logged in → go to dashboard
  useEffect(() => {
    if (!loading && user && role) {
      navigate(ROLE_HOME[role], { replace: true });
    }
  }, [user, role, loading]);

  const features = [
    { icon: "🏛️", title: "Multi-Hostel Support",  desc: "Manage guest rooms across all 14 halls from a single unified platform." },
    { icon: "⚡", title: "Instant Booking",        desc: "Request a guest room in minutes. Rooms are held immediately on submission." },
    { icon: "✅", title: "Warden Approval",        desc: "Every booking is reviewed by your hostel warden before confirmation." },
    { icon: "🔐", title: "Role-Based Access",      desc: "Students, wardens, caretakers and admins each see only what they need." },
    { icon: "📋", title: "Booking History",        desc: "Track all your past and current bookings with full status visibility." },
    { icon: "🛎️", title: "Check-in / Check-out",  desc: "Caretakers manage guest arrivals and departures with a single click." },
  ];

  const steps = [
    { n: "1", title: "Create Account", desc: "Sign up as a student with your college email." },
    { n: "2", title: "Choose a Room",  desc: "Browse available rooms across all hostels." },
    { n: "3", title: "Submit Request", desc: "Fill in guest details and submit for warden review." },
    { n: "4", title: "Guest Arrives",  desc: "Caretaker checks in your guest upon arrival." },
  ];

  const roles = [
    { icon: "🎓", title: "Student",     desc: "Book guest rooms for family and visitors. Track request status in real time.",        perms: ["Book Rooms", "View Status", "Booking History"] },
    { icon: "🏠", title: "Warden",      desc: "Review and approve guest room requests for your assigned hostel.",                    perms: ["Approve / Reject", "Conditional Approval", "View All Requests"] },
    { icon: "🛎️", title: "Caretaker",  desc: "Manage physical check-ins and check-outs for arriving guests.",                      perms: ["Check-in Guests", "Check-out Guests", "View Active Stays"] },
    { icon: "⚙️", title: "Administrator", desc: "Configure hostels, rooms, and generate staff invite codes.",                       perms: ["Room Config", "Invite Codes", "All Bookings"] },
  ];

  const now = new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });

  return (
    <div className="lp-root">

      {/* ── NAV ─────────────────────────────────── */}
      <nav ref={navRef} className="lp-nav">
        <div className="lp-logo">IIT Kanpur <span>· Hostel Guests</span></div>
        <div className="lp-nav-btns">
          <button className="lp-btn-ghost" onClick={() => navigate("/login")}>Login</button>
          <button className="lp-btn-solid" onClick={() => navigate("/signup")}>Register</button>
        </div>
      </nav>

      {/* ── HERO ────────────────────────────────── */}
      <section className="lp-hero">
        <div className="lp-hero-bg" />
        <div className="lp-hero-grid" />

        <div className="lp-hero-content">
          <div className="lp-eyebrow anim-1">IIT Kanpur · Guest Room Portal</div>
          <h1 className="anim-2">
            Book Guest Rooms<br />with <em>Ease</em>
          </h1>
          <p className="lp-hero-sub anim-3">
            A unified platform for students to book hostel guest rooms —
            reviewed by wardens, managed by caretakers, across all 14 halls.
          </p>
          <div className="lp-hero-actions anim-4">
            <button className="lp-btn-primary" onClick={() => navigate("/signup")}>
              Get Started →
            </button>
            <button className="lp-btn-outline" onClick={() => navigate("/login")}>
              Sign In
            </button>
          </div>
        </div>

        {/* ── Live Room Status Card ── */}
        <div className="lp-hero-card anim-card">
          <div className="lp-card-head">
            <div className="lp-card-title">Live Room Status</div>
            <div className="lp-card-updated">Updated at {now}</div>
          </div>
          <div className="lp-card-scroll">
            {roomsLoading ? (
              <div style={{ color: "var(--muted)", fontSize: 13, padding: "20px 0", textAlign: "center" }}>
                Loading rooms…
              </div>
            ) : liveRooms.length === 0 ? (
              <div style={{ color: "var(--muted)", fontSize: 13, padding: "20px 0", textAlign: "center" }}>
                No rooms configured yet
              </div>
            ) : (
              /* Group by hostel */
              Object.entries(
                liveRooms.reduce((acc, r) => {
                  if (!acc[r.hostelName]) acc[r.hostelName] = [];
                  acc[r.hostelName].push(r);
                  return acc;
                }, {})
              ).map(([hostelName, rooms]) => (
                <div key={hostelName} className="lp-hostel-group">
                  <div className="lp-hostel-label">{hostelName}</div>
                  {rooms.map((r, i) => (
                    <div key={r.id} className="lp-room-row">
                      <div className="lp-room-info">
                        <div className="lp-room-name">Room {r.roomNo}</div>
                        <div className="lp-room-meta">
                          {r.ac ? "AC" : "Non-AC"} · Cap {r.capacity}
                        </div>
                      </div>
                      <span className={`lp-room-badge ${r.badge}`}>{r.statusLabel}</span>
                    </div>
                  ))}
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* ── STATS ───────────────────────────────── */}
      <div className="lp-stats">
        {[
          { num: "14",   label: "Halls of Residence" },
          { num: "100+", label: "Guest Rooms" },
          { num: "4",    label: "User Roles" },
          { num: "24/7", label: "System Availability" },
        ].map((s, i) => (
          <div key={i} className="lp-stat">
            <div className="lp-stat-num">{s.num}</div>
            <div className="lp-stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      {/* ── FEATURES ────────────────────────────── */}
      <section className="lp-section">
        <div className="lp-section-label">Features</div>
        <h2 className="lp-section-title">Everything you need, nothing you don't</h2>
        <div className="lp-features-grid">
          {features.map((f, i) => (
            <div key={i} className="lp-feature">
              <span className="lp-feature-icon">{f.icon}</span>
              <div className="lp-feature-title">{f.title}</div>
              <div className="lp-feature-desc">{f.desc}</div>
            </div>
          ))}
        </div>
      </section>

{/* ── BOOKING LIFECYCLE ────────────────── */}
      <BookingLifecycle />
      
      {/* ── HOW IT WORKS ────────────────────────── */}
      <section className="lp-section lp-how">
        <div className="lp-section-label">Process</div>
        <h2 className="lp-section-title">How it works</h2>
        <div className="lp-steps">
          {steps.map((s, i) => (
            <div key={i} className="lp-step">
              <div className="lp-step-num">{s.n}</div>
              <div className="lp-step-title">{s.title}</div>
              <div className="lp-step-desc">{s.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── ROLES ───────────────────────────────── */}
      <section className="lp-section">
        <div className="lp-section-label">Access Levels</div>
        <h2 className="lp-section-title">Built for every role</h2>
        <div className="lp-roles-grid">
          {roles.map((r, i) => (
            <div key={i} className="lp-role-card">
              <div className="lp-role-icon">{r.icon}</div>
              <div className="lp-role-title">{r.title}</div>
              <div className="lp-role-desc">{r.desc}</div>
              <div className="lp-role-perms">
                {r.perms.map((p, j) => <span key={j} className="lp-perm">{p}</span>)}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────── */}
      <section className="lp-cta">
        <div className="lp-cta-bg" />
        <h2>Ready to book your <em>guest room?</em></h2>
        <p>Join students across IIT Kanpur using the portal every day.</p>
        <div className="lp-cta-btns">
          <button className="lp-btn-primary" onClick={() => navigate("/signup")}>
            Create Student Account →
          </button>
          <button className="lp-btn-outline" onClick={() => navigate("/login")}>
            Already have an account
          </button>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────── */}
      <footer className="lp-footer">
        <div className="lp-footer-logo">IIT Kanpur · Hostel Guest Portal</div>
        <div className="lp-footer-text">Student Welfare Office · All Halls of Residence</div>
      </footer>

    </div>
  );
}