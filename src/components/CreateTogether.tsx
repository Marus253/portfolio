import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { profile } from "../data/profile";
import { Container } from "./PageHeader";
import Icon from "./Icon";

// Même service d'envoi que le formulaire complet de la page Contact (FormSubmit).
const ENDPOINT = `https://formsubmit.co/ajax/${profile.email}`;
const field =
  "w-full rounded-lg border border-black/10 bg-black/[0.03] px-3.5 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-500 focus:border-neutral-900 focus:outline-none";

type State = "idle" | "sending" | "sent" | "error";

// Bloc de clôture : dégradé animé + carte de contact rapide.
export default function CreateTogether() {
  const [state, setState] = useState<State>("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    if (data._honey) return;
    setState("sending");
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...data, _subject: `Portfolio — message rapide de ${data.nom}`, _template: "table" }),
      });
      setState(res.ok ? "sent" : "error");
    } catch {
      setState("error");
    }
  }

  return (
    <section className="pb-20 md:pb-28">
      <Container>
        <div className="mesh relative grid gap-10 overflow-hidden rounded-3xl p-4 md:grid-cols-[minmax(0,380px)_1fr] md:p-6">
          <div className="rounded-2xl bg-white text-neutral-900">
            <div className="flex items-center gap-3 rounded-t-2xl bg-bg px-6 py-4 text-text-primary">
              <img src={profile.logo} alt="" className="h-9 w-9" />
              <p className="font-display text-lg normal-case tracking-tight">
                {profile.firstName}
                <sup className="ml-0.5 text-[9px]">®</sup>
              </p>
            </div>
            {state === "sent" ? (
              <div className="p-6">
                <p className="text-lg font-medium">Message envoyé.</p>
                <p className="mt-2 text-sm text-neutral-600">Je vous réponds à l'adresse indiquée — {profile.responseTime.toLowerCase()}.</p>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-4 p-6">
                <p className="text-center text-sm font-medium">Écrivez-moi</p>
                <input type="text" name="_honey" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
                <div>
                  <label htmlFor="ct-nom" className="mb-1.5 block text-xs font-medium">Nom</label>
                  <input id="ct-nom" name="nom" required autoComplete="name" placeholder="Votre nom" className={field} />
                </div>
                <div>
                  <label htmlFor="ct-email" className="mb-1.5 block text-xs font-medium">Email</label>
                  <input id="ct-email" name="email" type="email" required autoComplete="email" placeholder="vous@exemple.com" className={field} />
                </div>
                <div>
                  <label htmlFor="ct-msg" className="mb-1.5 block text-xs font-medium">Message</label>
                  <textarea id="ct-msg" name="message" required rows={3} placeholder="Votre besoin en quelques lignes" className={`${field} resize-none`} />
                </div>
                <button
                  type="submit"
                  disabled={state === "sending"}
                  className="w-full rounded-lg bg-neutral-900 py-3 text-sm font-medium text-white transition-colors hover:bg-neutral-700 disabled:opacity-60"
                >
                  {state === "sending" ? "Envoi…" : "Envoyer le message"}
                </button>
                {state === "error" && (
                  <p role="alert" className="text-xs text-red-600">
                    L'envoi a échoué. Écrivez-moi directement à {profile.email}.
                  </p>
                )}
              </form>
            )}
          </div>

          <div className="flex flex-col justify-between gap-10 p-2 text-white md:p-6">
            <span className="eyebrow w-fit border-white/25 text-white/80">Prenons contact</span>
            <div>
              <h2 className="font-display text-[3rem] sm:text-7xl lg:text-8xl">
                Créons
                <br />
                ensemble
              </h2>
              <p className="mt-6 max-w-md text-sm leading-relaxed text-white/75 md:text-base">{profile.availability}</p>
              <Link to="/contact" className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-white underline-offset-4 hover:underline">
                Formulaire détaillé et devis <Icon name="arrow-right" />
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
