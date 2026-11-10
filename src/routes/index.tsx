import { createFileRoute } from "@tanstack/react-router";
import { Coffee, GlassWater, Croissant, MapPin, Clock, Instagram } from "lucide-react";
import logo from "@/assets/espatto-logo.png.asset.json";
import hero from "@/assets/hero-salgados.jpg";

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

const menu = [
  { cat: "Salgados", icon: Croissant, items: ["Coxinha de frango", "Pastel de carne", "Esfiha aberta", "Kibe", "Enroladinho de salsicha", "Risole de queijo"] },
  { cat: "Cafés", icon: Coffee, items: ["Café coado", "Expresso", "Café com leite", "Cappuccino", "Pingado"] },
  { cat: "Sucos", icon: GlassWater, items: ["Laranja", "Limão", "Maracujá", "Abacaxi com hortelã", "Morango"] },
];

const IG = "https://www.instagram.com/espatto_salgados/";

function Index() {
  return (
    <div className="min-h-screen font-sans">
      <header className="sticky top-0 z-10 border-b border-border bg-background/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
          <img src={logo.url} alt="Espatto" className="h-12 w-12 rounded-full" />
          <nav className="flex gap-5 text-sm font-medium text-muted-foreground">
            <a href="#cardapio" className="hover:text-primary">Cardápio</a>
            <a href="#visite" className="hover:text-primary">Visite</a>
          </nav>
        </div>
      </header>

      <section className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-14 md:grid-cols-2 md:py-24">
        <div>
          <span className="inline-block rounded-full bg-accent px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent-foreground">Cafés, sucos e salgados</span>
          <h1 className="mt-5 font-script text-6xl leading-tight text-primary md:text-7xl">Espatto</h1>
          <p className="mt-4 max-w-md text-lg text-muted-foreground">Salgados fresquinhos, café passado na hora e sucos naturais. Aquele lanche gostoso do jeitinho que você gosta.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#cardapio" className="rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground transition hover:opacity-90">Ver cardápio</a>
            <a href={IG} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border-2 border-secondary px-6 py-3 font-semibold text-secondary transition hover:bg-secondary hover:text-secondary-foreground"><Instagram className="h-4 w-4" />Instagram</a>
          </div>
        </div>
        <div className="relative">
          <div className="absolute -inset-4 -z-10 rounded-[2rem] bg-accent/40 rotate-2" />
          <img src={hero} alt="Salgados, café e suco" width={1600} height={1008} className="rounded-3xl shadow-xl" />
        </div>
      </section>

      <section id="cardapio" className="bg-muted py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-5">
          <h2 className="text-center text-3xl font-bold md:text-4xl">Nosso <span className="font-script font-normal text-primary">cardápio</span></h2>
          <p className="mt-3 text-center text-muted-foreground">Uma amostra do que você encontra por aqui.</p>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {menu.map(({ cat, icon: Icon, items }) => (
              <div key={cat} className="rounded-3xl bg-card p-7 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary text-secondary-foreground"><Icon className="h-6 w-6" /></div>
                <h3 className="mt-5 text-xl font-bold">{cat}</h3>
                <ul className="mt-4 space-y-2 text-muted-foreground">
                  {items.map((i) => <li key={i} className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-primary" />{i}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="visite" className="mx-auto max-w-6xl px-5 py-16 md:py-24">
        <div className="grid gap-6 rounded-3xl bg-secondary p-8 text-secondary-foreground md:grid-cols-3 md:p-12">
          <div className="md:col-span-1">
            <h2 className="font-script text-4xl">Venha nos visitar</h2>
          </div>
          <div className="flex gap-3"><MapPin className="h-6 w-6 shrink-0 text-accent" /><div><p className="font-semibold">Endereço</p><p className="opacity-80">Rua Exemplo, 123 — Centro</p></div></div>
          <div className="flex gap-3"><Clock className="h-6 w-6 shrink-0 text-accent" /><div><p className="font-semibold">Horário</p><p className="opacity-80">Seg a Sáb · 7h às 19h</p></div></div>
        </div>
      </section>

      <footer className="border-t border-border py-8 text-center text-sm text-muted-foreground">
        <a href={IG} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:text-primary"><Instagram className="h-4 w-4" />@espatto_salgados</a>
        <p className="mt-2">© {new Date().getFullYear()} Espatto · Site demonstrativo</p>
      </footer>
    </div>
  );
}
