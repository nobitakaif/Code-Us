"use client"
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";

const LANGUAGES = ["JavaScript", "Python", "C++", "Rust", "Go", "Java", "TypeScript", "Swift"];
const PARTICLES = Array.from({ length: 28 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 3 + 1,
  dur: Math.random() * 8 + 6,
  delay: Math.random() * 5,
}));

const CODE_SNIPPETS = [
  { lang: "Python", code: `def greet(name):\n    return f"Hello, {name}!"` },
  { lang: "Rust", code: `fn greet(name: &str) -> String {\n    format!("Hello, {}!", name)\n}` },
  { lang: "Go", code: `func greet(name string) string {\n    return "Hello, " + name + "!"\n}` },
  { lang: "C++", code: `string greet(string name) {\n    return "Hello, " + name + "!";\n}` },
];

function TypingText({ texts }) {
  const [index, setIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = texts[index];

    if (!deleting && displayed.length < current.length) {
      const t = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 60);
      return () => clearTimeout(t);
    }

    if (!deleting && displayed.length === current.length) {
      const t = setTimeout(() => setDeleting(true), 1800);
      return () => clearTimeout(t);
    }

    if (deleting && displayed.length > 0) {
      const t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 30);
      return () => clearTimeout(t);
    }

    if (deleting && displayed.length === 0) {
      setDeleting(false);
      setIndex((index + 1) % texts.length);
    }
  }, [displayed, deleting, index, texts]);

  return (
    <span className="text-blue-600">
      {displayed}
      <span className="ml-1 border-r-2 border-blue-600 animate-pulse">&nbsp;</span>
    </span>
  );
}

function FloatingCard({ snippet, style, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="absolute rounded-2xl border border-blue-100 bg-white/80 px-4 py-3 font-mono text-xs leading-7 text-slate-700 shadow-lg shadow-slate-200/50 backdrop-blur-xl"
      style={style}
    >
      <div className="mb-2 text-[10px] tracking-[0.2em] text-blue-700">
        {snippet.lang.toUpperCase()}
      </div>
      <pre className="whitespace-pre-wrap">{snippet.code}</pre>
    </motion.div>
  );
}

function FeatureCard({ icon, title, desc, delay }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={[
        "rounded-3xl border p-8 backdrop-blur-xl transition-all duration-300",
        hovered
          ? "border-blue-200 bg-blue-50 shadow-lg shadow-blue-100/60"
          : "border-slate-200 bg-white/80 shadow-lg shadow-slate-200/40",
      ].join(" ")}
    >
      <div className="mb-4 text-3xl">{icon}</div>
      <div className="mb-3 font-syne text-[17px] font-semibold text-slate-900">{title}</div>
      <div className="text-sm leading-7 text-slate-600">{desc}</div>
    </motion.div>
  );
}

export default function LandingPage() {
  const containerRef = useRef(null);
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, -80]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen overflow-x-hidden bg-gradient-to-br from-slate-50 via-white to-slate-100 text-slate-900"
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&family=JetBrains+Mono:wght@400;500&display=swap');
        .font-syne { font-family: 'Syne', sans-serif; }
        .font-dm { font-family: 'DM Sans', sans-serif; }
        .font-mono-custom { font-family: 'JetBrains Mono', monospace; }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes float1 { 0%,100%{transform:translateY(0px)} 50%{transform:translateY(-18px)} }
        @keyframes float2 { 0%,100%{transform:translateY(0px)} 50%{transform:translateY(14px)} }
        @keyframes drift { 0%{transform:translateY(0) scale(1)} 100%{transform:translateY(-120vh) scale(0.4)} }
        @keyframes orb1 { 0%,100%{transform:translate(0,0)} 33%{transform:translate(60px,-40px)} 66%{transform:translate(-40px,30px)} }
        @keyframes orb2 { 0%,100%{transform:translate(0,0)} 33%{transform:translate(-70px,50px)} 66%{transform:translate(50px,-30px)} }
        @keyframes borderSpin { 0%{background-position:0% 50%} 50%{background-position:100% 50%} 100%{background-position:0% 50%} }
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #f8fafc; }
        ::-webkit-scrollbar-thumb { background: #3b82f6; border-radius: 4px; }
        .glow-btn { position: relative; overflow: hidden; }
        .glow-btn::before {
          content: '';
          position: absolute;
          inset: -2px;
          background: linear-gradient(135deg,#3b82f6,#60a5fa,#3b82f6);
          border-radius: inherit;
          z-index: -1;
          animation: borderSpin 3s linear infinite;
          background-size: 200%;
        }
      `}</style>

      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute left-[-10%] top-[-10%] h-[600px] w-[600px] animate-[orb1_20s_ease-in-out_infinite] rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.12)_0%,transparent_70%)]" />
        <div className="absolute bottom-[10%] right-[-5%] h-[500px] w-[500px] animate-[orb2_25s_ease-in-out_infinite] rounded-full bg-[radial-gradient(circle,rgba(96,165,250,0.08)_0%,transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[length:40px_40px]" />
      </div>

      {PARTICLES.map((p) => (
        <div
          key={p.id}
          className="pointer-events-none fixed z-0 rounded-full bg-blue-400/30"
          style={{
            left: `${p.x}%`,
            bottom: "-10px",
            width: p.size,
            height: p.size,
            animation: `drift ${p.dur}s ${p.delay}s linear infinite`,
          }}
        />
      ))}

      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between border-b border-slate-200 bg-white/90 px-6 py-4 shadow-sm backdrop-blur-xl md:px-12"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-indigo-500 text-white">
            ⚡
          </div>
          <span className="font-syne text-lg font-bold tracking-tight text-slate-900">
            CodeShift
          </span>
        </div>

        <div className="hidden items-center gap-8 text-sm text-slate-600 md:flex">
          {["Features", "Languages", "Docs"].map((item) => (
            <span key={item} className="cursor-pointer transition-colors hover:text-blue-600">
              {item}
            </span>
          ))}
        </div>

        <motion.a
          href="/converter"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          className="rounded-lg border border-blue-600 bg-blue-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
        >
          Open App
        </motion.a>
      </motion.nav>

      <motion.section style={{ y: heroY, opacity: heroOpacity }} transition={{ type: "decay" }}>
        <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 pb-20 pt-32 md:px-12">
          <div className="pointer-events-none absolute inset-0">
            <FloatingCard snippet={CODE_SNIPPETS[0]} style={{ top: "18%", left: "4%", animation: "float1 7s ease-in-out infinite", maxWidth: 260 }} delay={1.2} />
            <FloatingCard snippet={CODE_SNIPPETS[1]} style={{ top: "14%", right: "3%", animation: "float2 8s ease-in-out infinite", maxWidth: 280 }} delay={1.5} />
            <FloatingCard snippet={CODE_SNIPPETS[2]} style={{ bottom: "22%", left: "2%", animation: "float2 9s ease-in-out infinite", maxWidth: 260 }} delay={1.8} />
            <FloatingCard snippet={CODE_SNIPPETS[3]} style={{ bottom: "18%", right: "2%", animation: "float1 6s ease-in-out infinite", maxWidth: 270 }} delay={2.0} />
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-xs tracking-[0.05em] text-blue-700"
          >
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.55)]" />
            Real-time AI code conversion
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="mb-3 max-w-4xl text-center font-syne text-[clamp(48px,8vw,88px)] font-extrabold leading-[1.05] tracking-[-0.03em] text-slate-900"
          >
            Write once,
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-800 bg-clip-text text-transparent">
              run anywhere.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mb-5 max-w-2xl text-center text-[clamp(16px,2.5vw,22px)] leading-8 text-slate-600"
          >
            Paste your code. Get it converted to{" "}
            <TypingText texts={LANGUAGES} />
            {" "}instantly.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mb-12 text-center text-sm text-slate-500"
          >
            Powered by Claude AI · WebSocket streaming · 8 languages supported
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.7 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <motion.a
              href="/converter"
              className="glow-btn inline-flex items-center gap-2 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 px-9 py-4 font-syne text-base font-semibold tracking-[-0.01em] text-white shadow-lg shadow-blue-200/60"
              whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(59,130,246,0.25)" }}
              whileTap={{ scale: 0.97 }}
            >
              Start converting
              <span className="text-xl">→</span>
            </motion.a>

            <motion.a
              href="/converter"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 rounded-2xl border border-blue-200 bg-white/80 px-9 py-4 font-dm text-base font-medium text-blue-700 shadow-sm backdrop-blur-xl transition hover:bg-blue-50"
            >
              View demo
              <span className="text-base">▶</span>
            </motion.a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3, duration: 0.8 }}
            className="mt-14 flex flex-wrap justify-center gap-2"
          >
            {LANGUAGES.map((lang, i) => (
              <motion.div
                key={lang}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3 + i * 0.07 }}
                className="rounded-full border border-blue-100 bg-white/80 px-4 py-1.5 font-mono text-xs text-slate-600 backdrop-blur-xl"
              >
                {lang}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      <section className="relative z-10 px-6 pb-32 pt-20 md:px-12">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <div className="mb-4 font-mono text-xs tracking-[0.12em] text-blue-700">
            WHAT MAKES IT DIFFERENT
          </div>
          <h2 className="font-syne text-[clamp(32px,5vw,52px)] font-extrabold leading-tight tracking-[-0.03em] text-slate-900">
            Built for speed &amp;{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              accuracy
            </span>
          </h2>
        </motion.div>

        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {[
            {
              icon: "⚡",
              title: "Real-time streaming",
              desc: "Watch your code convert token by token via WebSocket. No waiting for a full response — results appear instantly as the AI generates.",
              delay: 0,
            },
            {
              icon: "🌐",
              title: "8 languages",
              desc: "JavaScript, Python, C++, Rust, Go, Java, TypeScript and Swift. All with proper syntax, idioms, and language-specific conventions.",
              delay: 0.1,
            },
            {
              icon: "🎯",
              title: "Context-aware",
              desc: "Claude understands your code's intent, not just its syntax. Complex logic, algorithms, and data structures all convert correctly.",
              delay: 0.2,
            },
            {
              icon: "📋",
              title: "One-click copy",
              desc: "Each output panel has a copy button. Grab the language you need and paste straight into your project.",
              delay: 0.3,
            },
            {
              icon: "🔒",
              title: "Secure by default",
              desc: "JWT authentication keeps your sessions safe. Your code is never stored — converted on the fly and gone.",
              delay: 0.4,
            },
            {
              icon: "🎨",
              title: "Monaco editor",
              desc: "The same editor powering VS Code. Full syntax highlighting for every language, both in input and output panels.",
              delay: 0.5,
            },
          ].map((f) => (
            <FeatureCard key={f.title} {...f} />
          ))}
        </div>
      </section>

      <section className="relative z-10 px-6 pb-36 pt-16 text-center md:px-12">
        <div className="relative mx-auto max-w-3xl overflow-hidden rounded-[28px] border border-slate-200 bg-white/90 px-6 py-16 shadow-xl shadow-slate-200/60 backdrop-blur-xl md:px-12">
          <div className="pointer-events-none absolute left-1/2 top-[-60px] h-[300px] w-[300px] -translate-x-1/2 bg-[radial-gradient(circle,rgba(59,130,246,0.15)_0%,transparent_70%)]" />
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-5 font-mono text-xs tracking-[0.12em] text-blue-700">
              GET STARTED FREE
            </div>
            <h2 className="mb-4 font-syne text-[clamp(28px,5vw,48px)] font-extrabold leading-tight tracking-[-0.03em] text-slate-900">
              Stop rewriting.<br />
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Start converting.
              </span>
            </h2>
            <p className="mx-auto mb-11 max-w-xl text-base leading-7 text-slate-600">
              Paste your code, pick your languages, and get production-ready conversions in seconds. No setup needed.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <motion.a
                href="/converter"
                whileHover={{ scale: 1.05, boxShadow: "0 0 50px rgba(59,130,246,0.25)" }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 px-10 py-4 font-syne text-base font-semibold tracking-[-0.01em] text-white shadow-lg shadow-blue-200/60"
              >
                Open code converter →
              </motion.a>

              <motion.a
                href="/converter"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 rounded-2xl border border-blue-200 bg-white px-9 py-4 text-[15px] font-medium text-blue-700 transition hover:bg-blue-50"
              >
                View on GitHub
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      <footer className="relative z-10 flex flex-wrap items-center justify-between gap-4 border-t border-slate-200 bg-white/80 px-6 py-8 backdrop-blur-xl md:px-12">
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-br from-blue-500 to-indigo-500 text-[12px] text-white">
            ⚡
          </div>
          <span className="font-syne text-sm font-bold text-slate-900">CodeShift</span>
        </div>
        <div className="text-sm text-slate-500">Built with Elysia · Claude AI · Monaco Editor</div>
        <div className="text-sm text-slate-500">© 2026 CodeShift</div>
      </footer>
    </div>
  );
}