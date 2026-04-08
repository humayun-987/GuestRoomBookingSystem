import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth, ROLE_HOME } from "./AuthContext.jsx";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebaseConfig";

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
      background: rgba(13,27,42,0.9);
      backdrop-filter: blur(16px);
      border-bottom: 1px solid rgba(201,168,76,0.15);
      transition: padding 0.3s;
    }
    .lp-logo {
      font-family: 'Cormorant Garamond', serif;
      font-size: 24px; font-weight: 700;
      color: var(--gold);
      letter-spacing: 0.5px;
    }
    .lp-logo span { color: var(--text); font-weight: 400; }
    @media (max-width: 600px) {
      .lp-logo { font-size: 20px; letter-spacing: 0.2px; }
      .lp-logo span { display: none }
    }
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
    /* Photo background */
    .lp-hero-photo {
      position: absolute; inset: 0;
      background: url('/bg-landing.png') center / cover no-repeat;
    }
    /* Dark overlay — heavier on left for text, lighter on right for card */
    .lp-hero-overlay {
      position: absolute; inset: 0;
      background: linear-gradient(
        110deg,
        rgba(13,27,42,0.95) 0%,
        rgba(13,27,42,0.85) 35%,
        rgba(13,27,42,0.65) 60%,
        rgba(13,27,42,0.45) 100%
      );
    }
    .lp-hero-glow {
      position: absolute; inset: 0;
      background:
        radial-gradient(ellipse at 20% 65%, rgba(201,168,76,0.07) 0%, transparent 50%),
        radial-gradient(ellipse at 75% 40%, rgba(201,168,76,0.05) 0%, transparent 45%);
    }
    .lp-hero-content { position: relative; max-width: 680px; z-index: 2; }
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

    /* ── LIVE ROOM STATUS CARD ──────────────────── */
    .lp-hero-card {
      position: absolute;
      right: 60px;
      top: 120px;        /* fixed top */
      transform: none;   /* remove translate */

      width: 360px;
      z-index: 10;

      background: rgba(10,20,32,0.88);
      border: 1px solid rgba(201,168,76,0.25);
      border-radius: 16px;
      backdrop-filter: blur(24px);
      overflow: hidden;

      box-shadow: 
        0 40px 100px rgba(0,0,0,0.55),
        inset 0 1px 0 rgba(201,168,76,0.15);
    }
    @keyframes floatCard {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-6px); }
    }
      .anim-card {
        animation: floatCard 6s ease-in-out infinite fadeIn 1s 0.6s ease both;
      }

    /* Card header */
    .sc-header {
      padding: 18px 20px 14px;
      background: linear-gradient(180deg, rgba(201,168,76,0.08) 0%, transparent 100%);
      border-bottom: 1px solid rgba(201,168,76,0.1);
      display: flex; align-items: flex-start; justify-content: space-between;
    }
    .sc-title {
      font-family: 'Cormorant Garamond', serif;
      font-size: 20px; font-weight: 700; color: var(--cream); letter-spacing: 0.2px;
    }
    .sc-subtitle {
      font-size: 11px; color: var(--muted); margin-top: 3px; letter-spacing: 0.3px;
    }
    .sc-live-badge {
      display: flex; align-items: center; gap: 6px;
      background: rgba(74,222,128,0.1); border: 1px solid rgba(74,222,128,0.25);
      border-radius: 20px; padding: 4px 10px; flex-shrink: 0;
    }
    .sc-live-dot {
      width: 6px; height: 6px; border-radius: 50%; background: #4ade80;
      animation: livePulse 2s ease-in-out infinite;
    }
    @keyframes livePulse {
      0%, 100% { opacity: 1; transform: scale(1); }
      50%       { opacity: 0.5; transform: scale(0.8); }
    }
    .sc-live-text {
      font-size: 10px; font-weight: 500; color: #4ade80;
      letter-spacing: 0.5px; text-transform: uppercase;
    }

    /* Tabs */
    .sc-tabs {
      display: flex; border-bottom: 1px solid rgba(201,168,76,0.1); padding: 0 20px;
    }
    .sc-tab {
      padding: 10px 14px; font-size: 12px; font-weight: 500; letter-spacing: 0.3px;
      color: var(--muted); border-bottom: 2px solid transparent; cursor: pointer;
      transition: all 0.2s; margin-bottom: -1px; font-family: 'DM Sans', sans-serif;
      background: none; border-top: none; border-left: none; border-right: none;
    }
    .sc-tab.active { color: var(--gold); border-bottom-color: var(--gold); }
    .sc-tab:hover:not(.active) { color: var(--text); }

    /* Summary counts */
    .sc-summary {
      display: grid; grid-template-columns: repeat(3,1fr); gap: 1px;
      background: rgba(201,168,76,0.08);
      border-bottom: 1px solid rgba(201,168,76,0.1);
    }
    .sc-sum-item {
      background: rgba(10,20,32,0.7); padding: 12px 10px; text-align: center;
    }
    .sc-sum-num {
      font-family: 'Cormorant Garamond', serif;
      font-size: 24px; font-weight: 700; line-height: 1;
    }
    .sc-sum-lbl {
      font-size: 10px; letter-spacing: 0.5px; text-transform: uppercase;
      color: var(--muted); margin-top: 3px;
    }
    .sc-num-avail { color: #4ade80; }
    .sc-num-booked { color: #f87171; }
    .sc-num-pend { color: var(--gold); }

    /* Scroll area */
    .sc-scroll {
      max-height: 220px; overflow-y: auto; padding: 0 0 8px;
    }
    .sc-scroll::-webkit-scrollbar { width: 3px; }
    .sc-scroll::-webkit-scrollbar-track { background: transparent; }
    .sc-scroll::-webkit-scrollbar-thumb { background: rgba(201,168,76,0.2); border-radius: 2px; }

    .sc-hostel-hdr {
      display: flex; align-items: center; gap: 8px;
      padding: 10px 20px 4px;
      position: sticky; top: 0;
      background: rgba(10,20,32,0.97); z-index: 1;
    }
    .sc-hostel-dot {
      width: 8px; height: 8px; border-radius: 2px; background: rgba(201,168,76,0.4);
    }
    .sc-hostel-name {
      font-size: 10px; letter-spacing: 2px; text-transform: uppercase;
      color: var(--gold); font-weight: 500; opacity: 0.8;
    }
    .sc-hostel-count {
      font-size: 10px; color: var(--muted); margin-left: auto;
    }

    .sc-room-row {
      display: flex; align-items: center; justify-content: space-between;
      padding: 8px 20px; gap: 8px;
      border-bottom: 1px solid rgba(201,168,76,0.05);
      transition: background 0.15s; cursor: default;
    }
    .sc-room-row:hover { background: rgba(201,168,76,0.04); }
    .sc-room-row:last-child { border-bottom: none; }
    .sc-room-left { display: flex; align-items: center; gap: 10px; }
    .sc-room-icon {
      width: 28px; height: 28px; border-radius: 6px;
      display: flex; align-items: center; justify-content: center;
      font-size: 12px; flex-shrink: 0;
    }
    .sc-icon-ac   { background: rgba(55,138,221,0.1); border: 1px solid rgba(55,138,221,0.2); }
    .sc-icon-nonac{ background: rgba(138,154,176,0.1); border: 1px solid rgba(138,154,176,0.15); }
    .sc-room-name { font-size: 13px; color: var(--text); font-weight: 500; line-height: 1; }
    .sc-room-meta { font-size: 10px; color: var(--muted); margin-top: 2px; letter-spacing: 0.2px; }

    .sc-badge {
      font-size: 10px; font-weight: 500; padding: 3px 10px; border-radius: 20px;
      letter-spacing: 0.5px; white-space: nowrap; flex-shrink: 0;
    }
    .sc-b-avail { background: rgba(74,222,128,0.1);  color: #4ade80;    border: 1px solid rgba(74,222,128,0.2); }
    .sc-b-booked{ background: rgba(248,113,113,0.1); color: #f87171;    border: 1px solid rgba(248,113,113,0.2); }
    .sc-b-pend  { background: rgba(201,168,76,0.1);  color: var(--gold);border: 1px solid rgba(201,168,76,0.2); }
    .sc-b-maint { background: rgba(245,158,11,0.1);  color: #f59e0b;    border: 1px solid rgba(245,158,11,0.2); }

    .sc-footer {
      padding: 10px 20px; border-top: 1px solid rgba(201,168,76,0.1);
      display: flex; align-items: center; justify-content: space-between;
    }
    .sc-footer-text { font-size: 11px; color: var(--muted); letter-spacing: 0.2px; }
    .sc-book-btn {
      background: var(--gold); color: var(--navy); border: none;
      padding: 6px 16px; border-radius: 4px; font-size: 12px; font-weight: 500;
      cursor: pointer; transition: all 0.2s; font-family: 'DM Sans', sans-serif;
    }
    .sc-book-btn:hover { background: var(--gold2); transform: scale(1.03); }

    /* ── TEXTURED SECTION BACKGROUNDS ──────────── */
    /* Fine dot grid */
    .lp-bg-dots {
      background-color: var(--navy);
      background-image: radial-gradient(circle, rgba(201,168,76,0.12) 1px, transparent 1px);
      background-size: 28px 28px;
    }
    /* Fine gold line grid */
    .lp-bg-grid {
      background-color: var(--navy);
      background-image:
        linear-gradient(rgba(201,168,76,0.05) 1px, transparent 1px),
        linear-gradient(90deg, rgba(201,168,76,0.05) 1px, transparent 1px);
      background-size: 48px 48px;
    }
    /* Diagonal checker */
    .lp-bg-checker {
      background-color: var(--navy2);
      background-image:
        linear-gradient(45deg, rgba(201,168,76,0.03) 25%, transparent 25%),
        linear-gradient(-45deg, rgba(201,168,76,0.03) 25%, transparent 25%),
        linear-gradient(45deg, transparent 75%, rgba(201,168,76,0.03) 75%),
        linear-gradient(-45deg, transparent 75%, rgba(201,168,76,0.03) 75%);
      background-size: 24px 24px;
      background-position: 0 0, 0 12px, 12px -12px, -12px 0;
    }

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
      background: rgba(27,46,66,0.4);
      transition: background 0.3s;
      position: relative; overflow: hidden;
    }
    .lp-feature::before {
      content: ''; position: absolute;
      top: 0; left: 0; right: 0; height: 2px;
      background: linear-gradient(90deg, var(--gold), transparent);
      opacity: 0; transition: opacity 0.3s;
    }
    .lp-feature:hover { background: rgba(27,46,66,0.65); }
    .lp-feature:hover::before { opacity: 1; }
    .lp-feature-icon { font-size: 28px; margin-bottom: 20px; display: block; }
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
    .lp-step-title { font-size: 15px; font-weight: 500; color: var(--cream); margin-bottom: 8px; }
    .lp-step-desc  { font-size: 13px; color: var(--muted); line-height: 1.6; font-weight: 300; }

    /* ROLES */
    .lp-roles-grid {
      display: grid; grid-template-columns: repeat(2, 1fr);
      gap: 20px; margin-top: 60px;
    }
    .lp-role-card {
      padding: 36px; border-radius: 8px;
      border: 1px solid rgba(201,168,76,0.12);
      background: rgba(27,46,66,0.35);
      transition: all 0.3s; cursor: default;
    }
    .lp-role-card:hover {
      border-color: rgba(201,168,76,0.35);
      background: rgba(27,46,66,0.55);
      transform: translateY(-3px);
    }
    .lp-role-icon  { font-size: 32px; margin-bottom: 16px; }
    .lp-role-title {
      font-family: 'Cormorant Garamond', serif;
      font-size: 24px; font-weight: 600;
      color: var(--cream); margin-bottom: 10px;
    }
    .lp-role-desc  { font-size: 14px; color: var(--muted); line-height: 1.7; font-weight: 300; }
    .lp-role-perms { margin-top: 16px; display: flex; flex-wrap: wrap; gap: 8px; }
    .lp-perm {
      font-size: 11px; letter-spacing: 0.5px;
      padding: 4px 10px; border-radius: 20px;
      background: rgba(201,168,76,0.08);
      color: var(--gold); border: 1px solid rgba(201,168,76,0.15);
    }

    /* BOOKING LIFECYCLE */
    .lp-lifecycle { background: rgba(13,27,42,0.6); }
    .lp-lifecycle-wrap { margin-top: 60px; position: relative; }
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
      background: var(--gold); border-color: var(--gold);
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
      transition: color 0.3s; max-width: 80px; line-height: 1.4;
    }
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
      border: 1px solid transparent; cursor: pointer; transition: all 0.25s;
    }
    .lp-branch-card.approve          { background: rgba(74,222,128,0.05);  border-color: rgba(74,222,128,0.15); }
    .lp-branch-card.approve:hover,
    .lp-branch-card.approve.sel      { background: rgba(74,222,128,0.1);   border-color: rgba(74,222,128,0.4); transform: translateY(-2px); }
    .lp-branch-card.conditional      { background: rgba(201,168,76,0.05);  border-color: rgba(201,168,76,0.15); }
    .lp-branch-card.conditional:hover,
    .lp-branch-card.conditional.sel  { background: rgba(201,168,76,0.1);   border-color: rgba(201,168,76,0.4); transform: translateY(-2px); }
    .lp-branch-card.reject           { background: rgba(248,113,113,0.05); border-color: rgba(248,113,113,0.15); }
    .lp-branch-card.reject:hover,
    .lp-branch-card.reject.sel       { background: rgba(248,113,113,0.1);  border-color: rgba(248,113,113,0.4); transform: translateY(-2px); }
    .lp-branch-icon  { font-size: 18px; margin-bottom: 6px; }
    .lp-branch-title { font-size: 13px; font-weight: 600; margin-bottom: 4px; color: var(--cream); }
    .lp-branch-desc  { font-size: 12px; color: var(--muted); line-height: 1.5; font-weight: 300; }
    .lp-detail-panel {
      border-radius: 10px; padding: 28px 32px;
      border: 1px solid rgba(201,168,76,0.15);
      background: rgba(27,46,66,0.5);
      backdrop-filter: blur(8px);
      transition: all 0.3s; min-height: 130px;
    }
    .lp-detail-who {
      font-size: 11px; letter-spacing: 2px; text-transform: uppercase;
      color: var(--gold); margin-bottom: 8px; opacity: 0.8;
    }
    .lp-detail-title {
      font-family: 'Cormorant Garamond', serif;
      font-size: 26px; font-weight: 600; color: var(--cream); margin-bottom: 10px;
    }
    .lp-detail-desc  { font-size: 14px; color: var(--muted); line-height: 1.75; font-weight: 300; max-width: 640px; }
    .lp-detail-tags  { margin-top: 16px; display: flex; flex-wrap: wrap; gap: 8px; }
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
      font-weight: 300; margin-bottom: 40px; position: relative;
    }
    .lp-cta-btns {
      display: flex; gap: 14px;
      justify-content: center; flex-wrap: wrap; position: relative;
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
    .lp-footer-text { font-size: 13px; color: var(--muted); }

    /* ANIMATIONS */
    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(24px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes fadeIn {
      from { opacity: 0; }
      to   { opacity: 1; }
    }
    .anim-1 { animation: fadeUp 0.7s ease both; }
    .anim-2 { animation: fadeUp 0.7s 0.15s ease both; }
    .anim-3 { animation: fadeUp 0.7s 0.3s ease both; }
    .anim-4 { animation: fadeUp 0.7s 0.45s ease both; }

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

  const activeStatuses = ["pending", "approved", "conditional", "checked_in"];
  const bookingSnap = await getDocs(
    query(collection(db, "bookings"), where("status", "in", activeStatuses))
  );
  const activeBookings = bookingSnap.docs.map(d => ({ id: d.id, ...d.data() }));

  return allRooms.map(room => {
    if (room.maintenance) {
      return { ...room, statusLabel: "Maint.", badge: "sc-b-maint" };
    }
    const isOccupied = activeBookings.some(b => {
      if (b.roomId !== room.id) return false;
      const bIn = b.checkIn?.toDate?.() || new Date(0);
      const bOut = b.checkOut?.toDate?.() || new Date(0);
      return bIn <= today && bOut >= today;
    });
    if (isOccupied) return { ...room, statusLabel: "Booked", badge: "sc-b-booked" };
    const isPending = activeBookings.some(b => b.roomId === room.id && b.status === "pending");
    if (isPending) return { ...room, statusLabel: "Pending", badge: "sc-b-pend" };
    return { ...room, statusLabel: "Available", badge: "sc-b-avail" };
  });
}

/* ─── Live Room Status Card ─────────────────────────────────── */
function LiveRoomCard({ rooms, loading }) {
  const [tab, setTab] = useState("all");
  const now = new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: true });
  const navigate = useNavigate();
  const { user, role } = useAuth();
  const avail = rooms.filter(r => r.statusLabel === "Available").length;
  const booked = rooms.filter(r => r.statusLabel === "Booked").length;
  const pend = rooms.filter(r => r.statusLabel === "Pending").length;

  const filtered = rooms.filter(r => {
    if (tab === "all") return true;
    if (tab === "avail") return r.statusLabel === "Available";
    if (tab === "booked") return r.statusLabel === "Booked" || r.statusLabel === "Pending";
    return true;
  });

  // Group by hostel
  const grouped = filtered.reduce((acc, r) => {
    if (!acc[r.hostelName]) acc[r.hostelName] = [];
    acc[r.hostelName].push(r);
    return acc;
  }, {});

  return (
    <div className="lp-hero-card anim-card">
      {/* Header */}
      <div className="sc-header">
        <div>
          <div className="sc-title">Live Room Status</div>
          <div className="sc-subtitle">Updated at {now}</div>
        </div>
        <div className="sc-live-badge">
          <div className="sc-live-dot" />
          <span className="sc-live-text">Live</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="sc-tabs">
        {[["all", "All Rooms"], ["avail", "Available"], ["booked", "Occupied"]].map(([id, label]) => (
          <button key={id} className={`sc-tab${tab === id ? " active" : ""}`} onClick={() => setTab(id)}>
            {label}
          </button>
        ))}
      </div>

      {/* Summary counts */}
      <div className="sc-summary">
        <div className="sc-sum-item">
          <div className="sc-sum-num sc-num-avail">{loading ? "—" : avail}</div>
          <div className="sc-sum-lbl">Available</div>
        </div>
        <div className="sc-sum-item">
          <div className="sc-sum-num sc-num-booked">{loading ? "—" : booked}</div>
          <div className="sc-sum-lbl">Occupied</div>
        </div>
        <div className="sc-sum-item">
          <div className="sc-sum-num sc-num-pend">{loading ? "—" : pend}</div>
          <div className="sc-sum-lbl">Pending</div>
        </div>
      </div>

      {/* Room list */}
      <div className="sc-scroll">
        {loading ? (
          <div style={{ color: "var(--muted)", fontSize: 13, padding: "20px", textAlign: "center" }}>
            Loading rooms…
          </div>
        ) : Object.keys(grouped).length === 0 ? (
          <div style={{ color: "var(--muted)", fontSize: 13, padding: "20px", textAlign: "center" }}>
            No rooms to show
          </div>
        ) : (
          Object.entries(grouped).map(([hostelName, hostelRooms]) => {
            const totalInHostel = rooms.filter(r => r.hostelName === hostelName).length;
            const availInHostel = rooms.filter(r => r.hostelName === hostelName && r.statusLabel === "Available").length;
            return (
              <div key={hostelName}>
                <div className="sc-hostel-hdr">
                  <div className="sc-hostel-dot" />
                  <span className="sc-hostel-name">{hostelName}</span>
                  <span className="sc-hostel-count">{availInHostel}/{totalInHostel} free</span>
                </div>
                {hostelRooms.map(r => {
                  const isAC = r.ac && !String(r.ac).toLowerCase().includes("non");
                  return (
                    <div key={r.id} className="sc-room-row">
                      <div className="sc-room-left">
                        <div className={`sc-room-icon ${isAC ? "sc-icon-ac" : "sc-icon-nonac"}`}
                          style={{ fontSize: 11, color: isAC ? "#378add" : "var(--muted)" }}>
                          {isAC ? "❄" : "○"}
                        </div>
                        <div>
                          <div className="sc-room-name">Room {r.roomNo}</div>
                          <div className="sc-room-meta">{r.ac ? "AC" : "Non-AC"} · Cap {r.capacity}</div>
                        </div>
                      </div>
                      <span className={`sc-badge ${r.badge}`}>{r.statusLabel}</span>
                    </div>
                  );
                })}
              </div>
            );
          })
        )}
      </div>

      {/* Footer */}
      <div className="sc-footer">
        <span className="sc-footer-text">Updated just now</span>
        <button
          className="sc-book-btn"
          onClick={() => {
            if (!user) {
              navigate("/login");
            } else {
              navigate(ROLE_HOME[role]);
            }
          }}
        >
          Book a Room →
        </button>
      </div>
    </div>
  );
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
  const [active, setActive] = useState(0);
  const [branch, setBranch] = useState("approve");
  const stage = STAGES[active];

  return (
    <section className="lp-section lp-lifecycle lp-bg-checker">
      <div className="lp-section-label">Booking System</div>
      <h2 className="lp-section-title">From request to check-out</h2>

      <div className="lp-lifecycle-wrap">
        <div className="lp-track">
          <div className="lp-track-line" />
          {STAGES.map((s, i) => (
            <div key={s.id} className={`lp-node${active === i ? " active" : ""}`} onClick={() => setActive(i)}>
              <div className="lp-node-circle"><span>{s.icon}</span></div>
              <div className="lp-node-label" style={{ whiteSpace: "pre-line" }}>{s.label}</div>
            </div>
          ))}
        </div>

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

        <div className="lp-detail-panel">
          <div className="lp-detail-who">{stage.who}</div>
          <div className="lp-detail-title">
            {stage.branch && branch !== "approve"
              ? branch === "conditional" ? "Approved with Condition" : "Booking Rejected"
              : stage.title}
          </div>
          <div className="lp-detail-desc">
            {stage.branch
              ? BRANCHES.find(b => b.id === branch)?.desc + " " + stage.desc.split(".").slice(1).join(".")
              : stage.desc}
          </div>
          <div className="lp-detail-tags">
            {(stage.branch
              ? [`Decision: ${BRANCHES.find(b => b.id === branch)?.title}`, ...stage.tags]
              : stage.tags
            ).map(t => <span key={t} className="lp-detail-tag">{t}</span>)}
          </div>
        </div>

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

/* ─── Main Landing Page ─────────────────────────────────────── */
export default function LandingPage() {
  const navigate = useNavigate();
  const { user, role, loading } = useAuth();
  const navRef = useRef(null);
  const [liveRooms, setLiveRooms] = useState([]);
  const [roomsLoading, setRoomsLoading] = useState(true);
  useEffect(() => { injectStyles(); }, []);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    fetchLiveRooms()
      .then(data => setLiveRooms(data))
      .catch(() => setLiveRooms([]))
      .finally(() => setRoomsLoading(false));
  }, []);

  // useEffect(() => {
  //   if (!loading && user && role) {
  //     navigate(ROLE_HOME[role], { replace: true });
  //   }
  // }, [user, role, loading]);

  const features = [
    { icon: "🏛️", title: "Multi-Hostel Support", desc: "Manage guest rooms across all 14 halls from a single unified platform." },
    { icon: "⚡", title: "Instant Booking", desc: "Request a guest room in minutes. Rooms are held immediately on submission." },
    { icon: "✅", title: "Warden Approval", desc: "Every booking is reviewed by your hostel warden before confirmation." },
    { icon: "🔐", title: "Role-Based Access", desc: "Students, wardens, caretakers and admins each see only what they need." },
    { icon: "📋", title: "Booking History", desc: "Track all your past and current bookings with full status visibility." },
    { icon: "🛎️", title: "Check-in / Check-out", desc: "Caretakers manage guest arrivals and departures with a single click." },
  ];

  const steps = [
    { n: "1", title: "Create Account", desc: "Sign up as a student with your college email." },
    { n: "2", title: "Choose a Room", desc: "Browse available rooms across all hostels." },
    { n: "3", title: "Submit Request", desc: "Fill in guest details and submit for warden review." },
    { n: "4", title: "Guest Arrives", desc: "Caretaker checks in your guest upon arrival." },
  ];

  const roles = [
    { icon: "🎓", title: "Student", desc: "Book guest rooms for family and visitors. Track request status in real time.", perms: ["Book Rooms", "View Status", "Booking History"] },
    { icon: "🏠", title: "Warden", desc: "Review and approve guest room requests for your assigned hostel.", perms: ["Approve / Reject", "Conditional Approval", "View All Requests"] },
    { icon: "🛎️", title: "Caretaker", desc: "Manage physical check-ins and check-outs for arriving guests.", perms: ["Check-in Guests", "Check-out Guests", "View Active Stays"] },
    { icon: "⚙️", title: "Administrator", desc: "Configure hostels, rooms, and generate staff invite codes.", perms: ["Room Config", "Invite Codes", "All Bookings"] },
  ];
  const { logout } = useAuth();
  return (
    <div className="lp-root">

      {/* ── NAV ─────────────────────────────────── */}
      <nav ref={navRef} className="lp-nav">
        <div className="lp-logo">IIT Kanpur <span>· Guest Room Management System</span></div>
        {/* <div className="lp-nav-btns">
          <button className="lp-btn-ghost" onClick={() => navigate("/login")}>Login</button>
          <button className="lp-btn-solid" onClick={() => navigate("/signup")}>Register</button>
        </div> */}
        <div className="lp-nav-btns">
          {!user ? (
            <>
              <button
                className="lp-btn-ghost"
                onClick={() => navigate("/login")}
              >
                Login
              </button>

              <button
                className="lp-btn-solid"
                onClick={() => navigate("/signup")}
              >
                Register
              </button>
            </>
          ) : (
            <>
              <button
                className="lp-btn-ghost"
                onClick={() => navigate(ROLE_HOME[role])}
              >
                Dashboard
              </button>
              <button
                className="lp-btn-solid"
                onClick={logout}
              >
                Sign Out
              </button>
            </>
          )}
        </div>
      </nav>

      {/* ── HERO ────────────────────────────────── */}
      <section className="lp-hero">
        {/* Photo + overlays */}
        <div className="lp-hero-photo" />
        <div className="lp-hero-overlay" />
        <div className="lp-hero-glow" />

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

        {/* ── Enhanced Live Room Status Card ── */}
        <LiveRoomCard rooms={liveRooms} loading={roomsLoading} />
      </section>

      {/* ── STATS (dot bg) ──────────────────────── */}
      <div className="lp-stats lp-bg-dots">
        {[
          { num: "14", label: "Halls of Residence" },
          { num: "100+", label: "Guest Rooms" },
          { num: "4", label: "User Roles" },
          { num: "24/7", label: "System Availability" },
        ].map((s, i) => (
          <div key={i} className="lp-stat">
            <div className="lp-stat-num">{s.num}</div>
            <div className="lp-stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      {/* ── FEATURES (grid bg) ──────────────────── */}
      <section className="lp-section lp-bg-grid">
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

      {/* ── BOOKING LIFECYCLE (checker bg, applied inside component) ── */}
      <BookingLifecycle />

      {/* ── HOW IT WORKS ────────────────────────── */}
      <section className="lp-section lp-how lp-bg-dots">
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

      {/* ── ROLES (grid bg) ─────────────────────── */}
      <section className="lp-section lp-bg-grid">
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

      {/* ── CTA (dot bg) ────────────────────────── */}
      <section className="lp-cta lp-bg-dots">
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
      <footer className="lp-footer lp-bg-dots">
        <div className="lp-footer-logo">IIT Kanpur · Guest Room Portal</div>
        <div className="lp-footer-text">Student Welfare Office · All Halls of Residence</div>
      </footer>

    </div>
  );
}
