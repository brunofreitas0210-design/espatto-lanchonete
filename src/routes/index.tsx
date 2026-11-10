import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { MapPin, Clock, Instagram, ArrowDown, Star } from "lucide-react";
import logo from "@/assets/espatto-logo.png.asset.json";
import hero from "@/assets/hero-salgados.jpg";
import coxinha from "@/assets/coxinha.png";
import suco from "@/assets/suco.png";
import cafe from "@/assets/cafe.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Espatto — Cafés, Sucos e Salgados" },
      { name: "description", content: "Conheça a Espatto: salgados fresquinhos, cafés e sucos naturais." },
      { property: "og:title", content: "Espatto — Cafés, Sucos e Salgados" },
      { property: "og:description", content: "Salgados fresquinhos, cafés e sucos naturais." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const IG = "https://www.instagram.com/espatto_salgados/";

const tabs = [
  { key: "salgados", label: "Salgados", img: coxinha, bg: "bg-accent", line: "Crocante por fora, recheado por dentro.", items: ["Coxinha de frango", "Pastel de carne", "Esfiha aberta", "Kibe", "Enroladinho", "Risole de queijo"] },
  { key: "cafes", label: "Cafés", img: cafe, bg: "bg-secondary", line: "Passado na hora, do jeito certo.", items: ["Café coado", "Expresso", "Café com leite", "Cappuccino", "Pingado"] },
  { key: "sucos", label: "Sucos", img: suco, bg: "bg-primary", line: "Fruta de verdade, espremida na hora.", items: ["Laranja", "Limão", "Maracujá", "Abacaxi c/ hortelã", "Morango"] },
] as const;

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && e.target.classList.add("is-in")), { threshold: 0.15 });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function Marquee({ words, reverse, className }: { words: string[]; reverse?: boolean; className: string }) {
  const row = [...words, ...words, ...words, ...words];
  return (
    <div className={`overflow-hidden border-y-2 border-foreground py-3 ${className}`}>
      <div className={`flex w-max gap-8 whitespace-nowrap text-2xl font-bold uppercase md:text-3xl ${reverse ? "animate-marquee-rev" : "animate-marquee"}`}>
        {row.map((w, i) => (
          <span key={i} className="flex items-center gap-8">{w}<Star className="h-5 w-5 fill-current" /></span>
        ))}
      </div>
    </div>
  );
}

function Index() {
  useReveal();
  const [tab, setTab] = useState(0);
  const [m, setM] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLElement>(null);
  const t = tabs[tab] ?? tabs[0];

  const onMove = (e: React.MouseEvent) => {
    const r = heroRef.current!.getBoundingClientRect();
    setM({ x: (e.clientX - r.left) / r.width - 0.5, y: (e.clientY - r.top) / r.height - 0.5 });
  };
  const par = (k: number) => ({ transform: `translate(${m.x * k}px, ${m.y * k}px)`, transition: "transform .3s ease-out" });

  return (
    <div className="min-h-screen overflow-x-hidden font-sans">
      {/* nav pill */}
      <header className="fixed inset-x-0 top-4 z-30 flex justify-center px-4">
        <nav className="flex items-center gap-1 rounded-full border-2 border-foreground bg-background p-1.5 shadow-pop">
          <img src={logo.url} alt="Espatto" className="h-9 w-9 rounded-full" />
          {[["Cardápio", "#cardapio"], ["História", "#historia"], ["Visite", "#visite"]].map(([l, h]) => (
            <a key={h} href={h} className="rounded-full px-3 py-1.5 text-sm font-semibold transition hover:bg-foreground hover:text-background">{l}</a>
          ))}
        </nav>
      </header>

      {/* hero */}
      <section ref={heroRef} onMouseMove={onMove} className="relative flex min-h-[100svh] flex-col items-center justify-center bg-dots px-5 pt-24 pb-16 text-center">
        <img src={coxinha} alt="" aria-hidden width={816} height={816} className="pointer-events-none absolute left-[4%] top-[18%] w-24 md:w-44" style={par(40)} />
        <img src={cafe} alt="" aria-hidden width={816} height={816} className="pointer-events-none absolute bottom-[10%] left-[10%] w-28 md:w-48" style={par(-30)} />
        <img src={suco} alt="" aria-hidden width={816} height={816} className="pointer-events-none absolute right-[5%] top-[22%] w-24 md:w-40" style={par(-50)} />
        <img src={coxinha} alt="" aria-hidden width={816} height={816} className="pointer-events-none absolute bottom-[14%] right-[12%] w-16 rotate-45 md:w-28" style={par(25)} />

        <div className="relative">
          <span className="inline-block -rotate-3 rounded-md bg-secondary px-4 py-1.5 text-sm font-bold uppercase tracking-widest text-secondary-foreground shadow-pop">Desde sempre fresquinho</span>
          <h1 className="mt-6 font-script text-[22vw] leading-[0.9] text-primary drop-shadow-[6px_6px_0_var(--foreground)] md:text-[13rem]">Espatto</h1>
          <p className="mx-auto mt-14 max-w-lg text-lg font-medium md:text-xl">
            Cafés, sucos e <span className="relative inline-block"><span className="relative z-10">salgados</span><span className="absolute inset-x-0 bottom-1 -z-0 h-3 -rotate-1 bg-accent" /></span> que fazem a pausa valer a pena.
          </p>
        </div>

        {/* spinning badge */}
        <a href="#cardapio" className="group relative mt-10 grid h-32 w-32 place-items-center">
          <svg viewBox="0 0 100 100" className="absolute inset-0 animate-spin-slow">
            <defs><path id="c" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" /></defs>
            <text className="fill-foreground text-[10.5px] font-bold uppercase tracking-[0.2em]"><textPath href="#c">• veja o cardápio • peça já </textPath></text>
          </svg>
          <span className="grid h-14 w-14 place-items-center rounded-full bg-primary text-primary-foreground transition group-hover:scale-110"><ArrowDown className="h-6 w-6 animate-bounce" /></span>
        </a>
      </section>

      <div className="relative z-10 -my-6">
        <Marquee className="-rotate-2 bg-accent text-accent-foreground" words={["Coxinha", "Pastel", "Esfiha", "Café coado", "Suco natural", "Kibe"]} />
        <Marquee reverse className="rotate-1 bg-foreground text-background" words={["Feito na hora", "Sabor de casa", "Cafés · Sucos · Salgados"]} />
      </div>

      {/* menu */}
      <section id="cardapio" className="relative px-5 py-24 md:py-32">
        <div className="mx-auto max-w-6xl">
          <h2 className="reveal text-center text-5xl font-bold uppercase md:text-7xl">
            O que tem <span className="font-script font-normal normal-case text-primary">hoje?</span>
          </h2>
          <div className="reveal mt-10 flex justify-center gap-2">
            {tabs.map((x, i) => (
              <button key={x.key} onClick={() => setTab(i)} className={`rounded-full border-2 border-foreground px-5 py-2 font-bold transition ${i === tab ? "bg-foreground text-background shadow-pop -translate-y-0.5" : "bg-background hover:-translate-y-0.5"}`}>{x.label}</button>
            ))}
          </div>

          <div className="reveal mt-12 grid items-center gap-10 md:grid-cols-2">
            <div className={`relative mx-auto aspect-square w-full max-w-md rounded-full border-2 border-foreground shadow-pop-lg transition-colors duration-500 ${t.bg}`}>
              <img key={t.key} src={t.img} alt={t.label} width={816} height={816} loading="lazy" className="absolute inset-0 m-auto w-4/5 animate-float animate-in zoom-in-50 spin-in-12 duration-500" />
            </div>
            <div key={t.key} className="animate-in fade-in slide-in-from-right-8 duration-500">
              <div className="ticket-edge rounded-b-2xl border-x-2 border-b-2 border-foreground bg-card p-8 pt-10 shadow-pop">
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground">Comanda nº {String(tab + 1).padStart(3, "0")}</p>
                <h3 className="mt-2 font-script text-5xl text-primary">{t.label}</h3>
                <p className="mt-2 font-medium">{t.line}</p>
                <ul className="mt-6 divide-y-2 divide-dashed divide-border">
                  {t.items.map((i, n) => (
                    <li key={i} className="flex items-baseline gap-3 py-3 text-lg font-semibold">
                      <span className="text-sm text-muted-foreground">{String(n + 1).padStart(2, "0")}</span>{i}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* story */}
      <section id="historia" className="bg-secondary px-5 py-24 text-secondary-foreground md:py-32">
        <div className="mx-auto grid max-w-6xl items-center gap-14 md:grid-cols-2">
          <div className="reveal relative">
            <img src={hero} alt="Mesa com salgados, café e suco" width={1600} height={1008} loading="lazy" className="rotate-[-3deg] rounded-2xl border-4 border-background shadow-pop-lg transition duration-500 hover:rotate-0 hover:scale-[1.02]" />
            <img src={logo.url} alt="" aria-hidden className="absolute -right-4 -top-10 w-28 animate-wiggle rounded-full border-4 border-background md:w-36" />
          </div>
          <div className="reveal">
            <h2 className="text-5xl font-bold leading-none uppercase md:text-6xl">Pausa boa <br /><span className="text-stroke text-background" style={{ WebkitTextStroke: "2px var(--background)" }}>se faz</span><br /><span className="font-script font-normal normal-case text-accent">com calma.</span></h2>
            <p className="mt-6 text-lg opacity-90">Na Espatto, cada salgado sai quentinho do forno e da fritadeira, o café é passado na hora e o suco é de fruta de verdade. Simples assim — e por isso tão gostoso.</p>
            <div className="mt-8 grid grid-cols-3 gap-4">
              {[["100%", "frutas naturais"], ["Quentinho", "toda hora"], ["Feito", "com carinho"]].map(([a, b]) => (
                <div key={a} className="rounded-xl border-2 border-background/40 p-4 transition hover:-translate-y-1 hover:bg-background/10">
                  <p className="text-xl font-bold text-accent">{a}</p><p className="text-sm opacity-80">{b}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* visit */}
      <section id="visite" className="bg-dots px-5 py-24 md:py-32">
        <div className="reveal mx-auto max-w-4xl rotate-1 rounded-3xl border-2 border-foreground bg-accent p-8 text-accent-foreground shadow-pop-lg transition hover:rotate-0 md:p-14">
          <h2 className="font-script text-5xl text-primary md:text-7xl">Passa aqui!</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <div className="flex gap-3"><MapPin className="h-6 w-6 shrink-0" /><div><p className="font-bold">Endereço</p><p>Rua Exemplo, 123 — Centro</p></div></div>
            <div className="flex gap-3"><Clock className="h-6 w-6 shrink-0" /><div><p className="font-bold">Horário</p><p>Seg a Sáb · 7h às 19h</p></div></div>
            <a href={IG} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 rounded-full border-2 border-foreground bg-background px-5 py-3 font-bold shadow-pop transition hover:-translate-y-1 hover:translate-x-[-2px]"><Instagram className="h-5 w-5" />@espatto_salgados</a>
          </div>
        </div>
      </section>

      <footer className="overflow-hidden bg-foreground pt-12 text-background">
        <p className="text-center text-sm opacity-70">© {new Date().getFullYear()} Espatto · Site demonstrativo</p>
        <p className="mt-4 select-none text-center font-script text-[24vw] leading-[0.8] text-primary">Espatto</p>
      </footer>
    </div>
  );
}
