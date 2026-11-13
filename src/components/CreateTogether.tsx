import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { profile } from "../data/profile";
import { Container } from "./PageHeader";
import Icon from "./Icon";

// Même service d'envoi que le formulaire complet de la page Contact (FormSubmit).
const ENDPOINT = `https://formsubmit.co/ajax/${profile.email}`;
const field =
  "w-full rounded-lg border border-stroke bg-bg px-4 py-3 text-sm text-text-primary placeholder:text-muted/70 transition-colors focus:border-accent focus:outline-none";

type State = "idle" | "sending" | "sent" | "error";

// Clôture : un seul bloc à plat. À gauche le message et les moyens directs, à droite le formulaire.
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
        <div className="grid gap-12 rounded-3xl bg-surface p-8 md:grid-cols-2 md:p-12">
          <div className="flex flex-col justify-between gap-10">
            <div>
              <h2 className="font-display text-[3rem] sm:text-7xl">
                Créons
                <br />
                ensemble
              </h2>
              <p className="mt-6 max-w-md text-sm leading-relaxed text-muted md:text-base">{profile.availability}</p>
            </div>
            <ul className="space-y-3 text-sm">
              <li>
                <a href={`mailto:${profile.email}`} className="inline-flex items-center gap-3 hover:text-accent">
                  <Icon name="mail" className="text-muted" />
                  {profile.email}
                </a>
              </li>
              <li>
                <a href={`https://wa.me/${profile.whatsapp}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 hover:text-accent">
                  <Icon name="phone" className="text-muted" />
                  {profile.phone} · WhatsApp
                </a>
              </li>
              <li className="flex items-center gap-3 text-muted">
                <Icon name="clock" />
                {profile.responseTime}
              </li>
            </ul>
          </div>

          {state === "sent" ? (
            <div className="self-center">
              <p className="font-display text-3xl">Message envoyé</p>
              <p className="mt-3 text-sm text-muted">Je vous réponds à l'adresse indiquée — {profile.responseTime.toLowerCase()}.</p>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-4">
              <input type="text" name="_honey" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
              <div>
                <label htmlFor="ct-nom" className="mb-2 block text-xs text-muted">Nom</label>
                <input id="ct-nom" name="nom" required autoComplete="name" placeholder="Votre nom" className={field} />
              </div>
              <div>
                <label htmlFor="ct-email" className="mb-2 block text-xs text-muted">Email</label>
                <input id="ct-email" name="email" type="email" required autoComplete="email" placeholder="vous@exemple.com" className={field} />
              </div>
              <div>
                <label htmlFor="ct-msg" className="mb-2 block text-xs text-muted">Message</label>
                <textarea id="ct-msg" name="message" required rows={4} placeholder="Votre besoin en quelques lignes" className={`${field} resize-none`} />
              </div>
              <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                <button
                  type="submit"
                  disabled={state === "sending"}
                  className="rounded-full bg-text-primary px-6 py-3 text-sm font-medium text-bg transition-colors hover:bg-text-primary/85 disabled:opacity-60"
                >
                  {state === "sending" ? "Envoi…" : "Envoyer le message"}
                </button>
                <Link to="/contact" className="inline-flex items-center gap-2 text-sm text-muted hover:text-text-primary">
                  Formulaire détaillé et devis <Icon name="arrow-right" />
                </Link>
              </div>
              {state === "error" && (
                <p role="alert" className="text-sm text-red-400">
                  L'envoi a échoué. Écrivez-moi directement à {profile.email}.
                </p>
              )}
            </form>
          )}
        </div>
      </Container>
    </section>
  );
}
