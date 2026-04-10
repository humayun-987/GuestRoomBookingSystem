import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { message } from "antd";

/* ── Cloudinary config ── */
const CLOUD_NAME    = "dzoqdhk17";
const UPLOAD_PRESET = "iitk_docs";

const uploadToCloudinary = async (file, publicId) => {
  const fd = new FormData();
  fd.append("file", file);
  fd.append("upload_preset", UPLOAD_PRESET);
  fd.append("public_id", publicId);
  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
    { method: "POST", body: fd }
  );
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.error?.message || "Upload failed");
  }
  return (await res.json()).secure_url;
};

/* ══════════════════════════════════════════════════════════
   PAYMENT PAGE
   Props:
     booking        — the Firestore booking object
     userProfile    — the student's profile (has rollNo)
     onClose        — called when user clicks Back
     onProofSubmitted — called after successful submission
══════════════════════════════════════════════════════════ */
export default function PaymentPage({ booking, userProfile, onClose, onProofSubmitted }) {
  const checkInTs  = booking.checkIn?.toDate?.()  || new Date(booking.checkIn);
  const checkOutTs = booking.checkOut?.toDate?.() || new Date(booking.checkOut);
  const nights     = Math.max(1, Math.ceil((checkOutTs - checkInTs) / 86400000));
  const rate       = booking.roomRate || 0;
  const total      = rate * nights;

  const fmtDate  = ts => ts.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
  const fmtShort = ts => ts.toLocaleDateString("en-IN", { day: "numeric", month: "short" });

  /* ── Proof form state ── */
  const [txnRef,     setTxnRef]     = useState("");
  const [payDate,    setPayDate]    = useState(new Date().toISOString().split("T")[0]);
  const [amountPaid, setAmountPaid] = useState(total > 0 ? String(total) : "");
  const [screenshot, setScreenshot] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [prog,       setProg]       = useState("");
  const [copied,     setCopied]     = useState(null);
  const [activeStep, setActiveStep] = useState(null); // which step card is "highlighted"

  /* ── Copy helper ── */
  const copy = (text, key) => {
    navigator.clipboard.writeText(String(text));
    setCopied(key);
    setTimeout(() => setCopied(null), 2500);
  };

  /* ── Submit proof ── */
  const handleSubmit = async () => {
    if (!txnRef.trim())                               { message.error("Enter the transaction reference number"); return; }
    if (!payDate)                                     { message.error("Select the date of payment"); return; }
    if (!amountPaid || isNaN(parseFloat(amountPaid))) { message.error("Enter a valid amount"); return; }
    if (!screenshot)                                  { message.error("Upload your payment screenshot"); return; }

    setSubmitting(true);
    try {
      setProg("Uploading screenshot…");
      const screenshotUrl = await uploadToCloudinary(
        screenshot,
        `bookings/${booking.id}/payment_proof`
      );
      setProg("Saving proof…");
      await updateDoc(doc(db, "bookings", booking.id), {
        paymentStatus: "pending_verification",
        paymentProof: {
          txnRef:       txnRef.trim().toUpperCase(),
          date:         payDate,
          amountPaid:   parseFloat(amountPaid),
          screenshotUrl,
          submittedAt:  new Date(),
        },
      });
      message.success("Payment proof submitted successfully!");
      onProofSubmitted();
    } catch (err) {
      console.error(err);
      message.error("Submission failed — please try again.");
    }
    setProg("");
    setSubmitting(false);
  };

  /* ── SBI Collect pre-fill values ── */
  const fills = [
    { label: "Student Name", value: booking.studentName,                        key: "name"    },
    { label: "Roll No",      value: userProfile?.rollNo || "—",                key: "roll"    },
    { label: "Hall No",      value: booking.hostelName,                         key: "hall"    },
    { label: "Remarks",      value: `Guest: ${booking.guestName}, ${fmtShort(checkInTs)}`, key: "rmk" },
    { label: "Amount (₹)",   value: total > 0 ? String(total) : "—",          key: "amt"     },
  ];

  /* ── Steps ── */
  const steps = [
    {
      n: 1, icon: "🌐", title: "Open SBI Collect",
      desc: "Visit the State Bank Collect portal. Use the button below to open it in a new tab.",
      cta: (
        <a
          href="https://onlinesbi.sbi.bank.in/sbicollect/"
          target="_blank" rel="noreferrer"
          style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "linear-gradient(135deg,rgba(201,168,76,0.15),rgba(201,168,76,0.08))",
            border: "1px solid rgba(201,168,76,0.35)",
            color: "var(--gold)", borderRadius: 8, padding: "8px 18px",
            textDecoration: "none", fontSize: 13, fontWeight: 600,
            letterSpacing: 0.3, marginTop: 10, transition: "all 0.2s",
          }}
        >
          Open SBI Collect ↗
        </a>
      ),
    },
    {
      n: 2, icon: "🏛️", title: "Select Educational Institute",
      desc: (
        <span>
          On the SBI Collect homepage, click{" "}
          <Tag>Educational Institutes</Tag> in the category section, then search for{" "}
          <Tag>Indian Institute of Technology, Kanpur</Tag> and select it.
        </span>
      ),
    },
    {
      n: 3, icon: "📂", title: "Choose Payment Category",
      desc: (
        <span>
          From the <em style={{ color: "var(--text)" }}>Payment Category</em> dropdown, select{" "}
          <Tag gold>HALL ACCOUNT</Tag>
        </span>
      ),
    },
    {
      n: 4, icon: "📝", title: "Fill in Payment Details",
      desc: "Enter the values below exactly as shown. Use the copy buttons to avoid errors.",
      table: fills,
    },
    {
      n: 5, icon: "👤", title: "Enter Your Contact Info",
      desc: "Fill in Remitter Name (your name), Mobile Number, and Email ID. SBI will send the transaction reference to these.",
    },
    {
      n: 6, icon: "🔐", title: "Solve CAPTCHA & Pay",
      desc: "Complete the CAPTCHA, click Next, then choose your payment method — UPI, Net Banking, or Debit/Credit Card. Do not close the tab until you see the confirmation screen.",
    },
    {
      n: 7, icon: "🧾", title: "Save Your Receipt",
      desc: "Note the Transaction Reference Number from the confirmation screen and take a clear screenshot. You will need both to submit proof below.",
    },
  ];

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 500,
      background: "#0A1628",
      overflowY: "auto",
      display: "flex", flexDirection: "column",
    }}>

      {/* ════════════════════════════════════════
          STICKY TOPBAR
      ════════════════════════════════════════ */}
      <div style={{
        position: "sticky", top: 0, zIndex: 100,
        background: "rgba(10,22,40,0.96)",
        backdropFilter: "blur(16px)",
        borderBottom: "1px solid rgba(201,168,76,0.12)",
        padding: "0 32px",
        height: 64,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        flexShrink: 0,
      }}>
        {/* Left: back + title */}
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <button
            onClick={onClose}
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.09)",
              color: "var(--muted, #8899aa)",
              borderRadius: 8, padding: "7px 16px",
              cursor: "pointer", fontSize: 13, fontWeight: 500,
              display: "flex", alignItems: "center", gap: 6,
              transition: "all 0.2s",
            }}
          >
            ← Back
          </button>
          <div style={{ height: 24, width: 1, background: "rgba(255,255,255,0.08)" }} />
          <div>
            <div style={{ fontSize: 15, fontWeight: 600, color: "#E8DCC8", letterSpacing: 0.2 }}>
              Complete Payment
            </div>
            <div style={{ fontSize: 11, color: "var(--muted, #8899aa)", marginTop: 1 }}>
              {booking.hostelName} · {booking.guestName}
            </div>
          </div>
        </div>

        {/* Right: amount pill */}
        {total > 0 && (
          <div style={{
            background: "rgba(201,168,76,0.08)",
            border: "1px solid rgba(201,168,76,0.22)",
            borderRadius: 10, padding: "6px 20px", textAlign: "center",
          }}>
            <div style={{ fontSize: 10, color: "var(--muted,#8899aa)", letterSpacing: 1.2, textTransform: "uppercase" }}>
              Amount Due
            </div>
            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 24, fontWeight: 700, color: "#C9A84C", lineHeight: 1.1,
            }}>
              ₹{total}
            </div>
          </div>
        )}
      </div>

      {/* ════════════════════════════════════════
          PAGE BODY
      ════════════════════════════════════════ */}
      <div style={{ flex: 1, maxWidth: 800, width: "100%", margin: "0 auto", padding: "40px 24px 100px" }}>

        {/* ── Booking Summary ── */}
        <div style={{
          background: "rgba(201,168,76,0.04)",
          border: "1px solid rgba(201,168,76,0.13)",
          borderRadius: 14, padding: "24px 28px", marginBottom: 40,
        }}>
          <div style={{
            fontSize: 10, letterSpacing: 1.5, textTransform: "uppercase",
            color: "#C9A84C", fontWeight: 700, marginBottom: 18,
          }}>
            Booking Summary
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
            gap: "16px 24px",
          }}>
            {[
              { icon: "🏠", label: "Hostel",    val: booking.hostelName },
              { icon: "👤", label: "Guest",     val: booking.guestName },
              { icon: "📅", label: "Check-in",  val: fmtDate(checkInTs) },
              { icon: "📅", label: "Check-out", val: fmtDate(checkOutTs) },
              { icon: "🌙", label: "Duration",  val: `${nights} night${nights !== 1 ? "s" : ""}` },
              ...(rate > 0 ? [{ icon: "💰", label: "Rate", val: `₹${rate}/night` }] : []),
            ].map(({ icon, label, val }) => (
              <div key={label}>
                <div style={{ fontSize: 11, color: "#8899aa", marginBottom: 4 }}>
                  {icon} {label}
                </div>
                <div style={{ fontSize: 14, color: "#E8DCC8", fontWeight: 500 }}>{val}</div>
              </div>
            ))}
          </div>

          {total > 0 && (
            <div style={{
              marginTop: 20, paddingTop: 20,
              borderTop: "1px solid rgba(201,168,76,0.1)",
              display: "flex", alignItems: "flex-end", justifyContent: "space-between",
            }}>
              <div style={{ fontSize: 13, color: "#8899aa" }}>
                ₹{rate} × {nights} night{nights !== 1 ? "s" : ""}
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 10, color: "#8899aa", letterSpacing: 1.2, textTransform: "uppercase", marginBottom: 2 }}>
                  Total Amount
                </div>
                <div style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 42, fontWeight: 700, color: "#C9A84C", lineHeight: 1,
                }}>
                  ₹{total}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ── Section: SBI Guide ── */}
        <SectionLabel eyebrow="Step-by-Step Guide" title="How to Pay via SBI Collect" />

        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 48 }}>
          {steps.map(step => (
            <StepCard
              key={step.n}
              step={step}
              active={activeStep === step.n}
              onToggle={() => setActiveStep(activeStep === step.n ? null : step.n)}
              copy={copy}
              copied={copied}
            />
          ))}
        </div>

        {/* ── Section: Proof Form ── */}
        <SectionLabel eyebrow="After Payment" title="Submit Payment Proof" />

        <div style={{
          background: "rgba(13,22,38,0.9)",
          border: "1px solid rgba(201,168,76,0.18)",
          borderRadius: 14, padding: "32px",
        }}>
          <p style={{ fontSize: 13, color: "#8899aa", lineHeight: 1.7, marginBottom: 28, marginTop: 0 }}>
            Fill in the details from your SBI Collect receipt. The caretaker will verify this before checking in your guest.
          </p>

          {/* Transaction Ref */}
          <Field label="Transaction Reference Number" required hint="Found on the SBI Collect confirmation page and receipt SMS.">
            <input
              className="pr-input"
              placeholder="e.g. DU2506150012345"
              value={txnRef}
              onChange={e => setTxnRef(e.target.value.toUpperCase())}
              style={{ fontFamily: "monospace", letterSpacing: 2, fontSize: 15 }}
            />
          </Field>

          {/* Date + Amount */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 20px" }}>
            <Field label="Date of Payment" required>
              <input
                className="pr-input"
                type="date"
                value={payDate}
                onChange={e => setPayDate(e.target.value)}
                style={{ colorScheme: "dark" }}
              />
            </Field>
            <Field label="Amount Paid (₹)" required>
              <input
                className="pr-input"
                type="number"
                min={0}
                placeholder={total > 0 ? String(total) : "Enter amount"}
                value={amountPaid}
                onChange={e => setAmountPaid(e.target.value)}
              />
            </Field>
          </div>

          {/* Screenshot */}
          <Field label="Payment Screenshot" required hint="JPG / PNG / WebP · max 10 MB">
            <div
              onClick={() => document.getElementById("pay-ss-input").click()}
              style={{
                border: `2px dashed ${screenshot ? "rgba(74,222,128,0.45)" : "rgba(201,168,76,0.25)"}`,
                borderRadius: 10,
                padding: "28px 24px",
                background: screenshot ? "rgba(74,222,128,0.04)" : "rgba(201,168,76,0.02)",
                cursor: "pointer",
                transition: "all 0.25s",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 16,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <div style={{
                  width: 48, height: 48, borderRadius: 12, flexShrink: 0,
                  background: screenshot ? "rgba(74,222,128,0.12)" : "rgba(201,168,76,0.08)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 22,
                }}>
                  {screenshot ? "✅" : "📸"}
                </div>
                <div>
                  <div style={{ fontSize: 14, color: screenshot ? "#4ade80" : "#8899aa", fontWeight: 500 }}>
                    {screenshot ? screenshot.name : "Click to upload screenshot"}
                  </div>
                  <div style={{ fontSize: 12, color: "#8899aa", marginTop: 2 }}>
                    {screenshot
                      ? `${(screenshot.size / 1024 / 1024).toFixed(2)} MB`
                      : "JPG / PNG / WebP · max 10 MB"}
                  </div>
                </div>
              </div>
              {screenshot && (
                <button
                  onClick={e => { e.stopPropagation(); setScreenshot(null); }}
                  style={{
                    background: "rgba(248,113,113,0.1)", border: "1px solid rgba(248,113,113,0.25)",
                    color: "#f87171", borderRadius: 6, padding: "4px 10px",
                    cursor: "pointer", fontSize: 12, flexShrink: 0,
                  }}
                >
                  Remove
                </button>
              )}
            </div>
            <input
              id="pay-ss-input"
              type="file"
              accept="image/jpeg,image/png,image/webp"
              style={{ display: "none" }}
              onChange={e => {
                const f = e.target.files[0];
                if (f && f.size > 10 * 1024 * 1024) { message.error("File must be under 10 MB"); return; }
                setScreenshot(f || null);
                e.target.value = "";
              }}
            />
          </Field>

          {/* Upload progress */}
          {prog && (
            <div style={{
              background: "rgba(201,168,76,0.06)", border: "1px solid rgba(201,168,76,0.18)",
              borderRadius: 8, padding: "12px 16px", marginBottom: 16,
              fontSize: 13, color: "#C9A84C",
              display: "flex", alignItems: "center", gap: 10,
            }}>
              <span>⏳</span> {prog}
            </div>
          )}

          {/* Submit */}
          <button
            onClick={handleSubmit}
            disabled={submitting}
            style={{
              width: "100%", marginTop: 8,
              background: submitting
                ? "rgba(201,168,76,0.3)"
                : "linear-gradient(135deg, #C9A84C, #a8872e)",
              border: "none", borderRadius: 10,
              color: submitting ? "rgba(255,255,255,0.5)" : "#0A1628",
              fontSize: 15, fontWeight: 700, letterSpacing: 0.4,
              padding: "16px 24px", cursor: submitting ? "not-allowed" : "pointer",
              transition: "all 0.2s",
            }}
          >
            {submitting ? (prog || "Processing…") : "Submit Payment Proof →"}
          </button>

          <p style={{ fontSize: 12, color: "#8899aa", textAlign: "center", marginTop: 14, lineHeight: 1.6, marginBottom: 0 }}>
            After submission, the caretaker will review and verify before checking in your guest.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ── Sub-components ─────────────────────────────────────── */

function Tag({ children, gold }) {
  return (
    <span style={{
      background: gold ? "rgba(201,168,76,0.12)" : "rgba(255,255,255,0.06)",
      border: `1px solid ${gold ? "rgba(201,168,76,0.3)" : "rgba(255,255,255,0.12)"}`,
      color: gold ? "#C9A84C" : "#E8DCC8",
      borderRadius: 5, padding: "1px 8px",
      fontFamily: "monospace", fontSize: 12,
      display: "inline",
    }}>
      {children}
    </span>
  );
}

function SectionLabel({ eyebrow, title }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{
        fontSize: 10, color: "#C9A84C", letterSpacing: 1.5,
        textTransform: "uppercase", fontWeight: 700, marginBottom: 6,
      }}>
        {eyebrow}
      </div>
      <div style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: 28, fontWeight: 600, color: "#E8DCC8",
      }}>
        {title}
      </div>
    </div>
  );
}

function Field({ label, required, hint, children }) {
  return (
    <div className="pr-field">
      <label className="pr-label">
        {label}{" "}
        {required && <span style={{ color: "#f87171", fontWeight: 400 }}>*</span>}
      </label>
      {children}
      {hint && (
        <div style={{ fontSize: 12, color: "#8899aa", marginTop: 4 }}>{hint}</div>
      )}
    </div>
  );
}

function CopyPill({ text, field, copied, copy }) {
  const active = copied === field;
  return (
    <button
      onClick={() => copy(text, field)}
      style={{
        background: active ? "rgba(74,222,128,0.12)" : "rgba(201,168,76,0.08)",
        border: `1px solid ${active ? "rgba(74,222,128,0.3)" : "rgba(201,168,76,0.2)"}`,
        color: active ? "#4ade80" : "#C9A84C",
        borderRadius: 20, padding: "3px 12px", fontSize: 11,
        cursor: "pointer", transition: "all 0.2s",
        whiteSpace: "nowrap", fontWeight: 600, flexShrink: 0,
        letterSpacing: 0.3,
      }}
    >
      {active ? "✓ Copied" : "Copy"}
    </button>
  );
}

function StepCard({ step, active, onToggle, copy, copied }) {
  return (
    <div
      style={{
        background: active ? "rgba(201,168,76,0.04)" : "rgba(255,255,255,0.015)",
        border: `1px solid ${active ? "rgba(201,168,76,0.22)" : "rgba(255,255,255,0.06)"}`,
        borderRadius: 12,
        overflow: "hidden",
        transition: "all 0.25s",
      }}
    >
      {/* Header row — always visible */}
      <div
        onClick={onToggle}
        style={{
          display: "flex", alignItems: "center", gap: 16,
          padding: "16px 20px",
          cursor: "pointer",
        }}
      >
        {/* Number badge */}
        <div style={{
          width: 34, height: 34, borderRadius: "50%", flexShrink: 0,
          background: active ? "rgba(201,168,76,0.15)" : "rgba(201,168,76,0.07)",
          border: `1px solid ${active ? "rgba(201,168,76,0.35)" : "rgba(201,168,76,0.18)"}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 15, fontWeight: 700, color: "#C9A84C",
          transition: "all 0.25s",
        }}>
          {step.n}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 10, flex: 1, minWidth: 0 }}>
          <span style={{ fontSize: 18, flexShrink: 0 }}>{step.icon}</span>
          <span style={{
            fontSize: 14, fontWeight: 600, color: "#E8DCC8",
            overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
          }}>
            {step.title}
          </span>
        </div>

        <span style={{
          fontSize: 11, color: "#8899aa",
          transform: active ? "rotate(180deg)" : "none",
          transition: "transform 0.25s", flexShrink: 0,
        }}>
          ▼
        </span>
      </div>

      {/* Expandable body */}
      {active && (
        <div style={{ padding: "0 20px 20px 20px" }}>
          <div style={{
            height: 1, background: "rgba(201,168,76,0.08)", marginBottom: 16,
          }} />

          <div style={{ fontSize: 13, color: "#8899aa", lineHeight: 1.75, marginBottom: step.table || step.cta ? 16 : 0 }}>
            {step.desc}
          </div>

          {/* Fill-values table for step 4 */}
          {step.table && (
            <div style={{
              background: "rgba(0,0,0,0.3)", border: "1px solid rgba(201,168,76,0.1)",
              borderRadius: 10, overflow: "hidden",
            }}>
              {step.table.map(({ label, value, key }, i) => (
                <div
                  key={key}
                  style={{
                    display: "flex", alignItems: "center",
                    padding: "11px 16px", gap: 12,
                    borderBottom: i < step.table.length - 1
                      ? "1px solid rgba(255,255,255,0.04)" : "none",
                    background: i % 2 === 0 ? "rgba(255,255,255,0.01)" : "transparent",
                  }}
                >
                  <span style={{
                    fontSize: 11, color: "#8899aa",
                    minWidth: 110, flexShrink: 0,
                  }}>
                    {label}
                  </span>
                  <span style={{
                    fontSize: 13, color: "#E8DCC8", fontWeight: 500,
                    flex: 1, wordBreak: "break-all",
                  }}>
                    {value}
                  </span>
                  <CopyPill text={value} field={key} copied={copied} copy={copy} />
                </div>
              ))}
            </div>
          )}

          {/* CTA link for step 1 */}
          {step.cta && step.cta}
        </div>
      )}
    </div>
  );
}
