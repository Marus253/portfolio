import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { profile } from "../data/profile";

// Envoi via FormSubmit (service gratuit, sans compte). Au tout premier envoi,
// FormSubmit envoie un email d'activation à l'adresse ci-dessous : il faut cliquer
// sur le lien une seule fois pour recevoir les messages suivants.
const ENDPOINT = `https://formsubmit.co/ajax/${profile.email}`;

export const NEEDS = [
  { value: "application-metier", label: "Application métier" },
  { value: "backend-api", label: "Backend, API ou base de données" },
  { value: "automatisation", label: "Automatisation / intégration" },
  { value: "recrutement", label: "Recrutement / opportunité" },
  { value: "autre", label: "Autre" },
];

type State = "idle" | "sending" | "sent" | "error";

const field =
  "w-full rounded-2xl border border-stroke bg-bg px-4 py-3 text-sm text-text-primary placeholder:text-muted/70 transition-colors focus:border-[#4E85BF] focus:outline-none";
const label = "mb-2 block text-xs uppercase tracking-[0.15em] text-muted";

export default function ContactForm({ defaultNeed = "application-metier" }: { defaultNeed?: string }) {
  const [state, setState] = useState<State>("idle");
  const [need, setNeed] = useState(NEEDS.some((n) => n.value === defaultNeed) ? defaultNeed : "application-metier");
  const recruiting = need === "recrutement";

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    if (data._honey) return; // robot
    setState("sending");
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          ...data,
          besoin: NEEDS.find((n) => n.value === data.besoin)?.label ?? data.besoin,
          _subject: `Portfolio — ${NEEDS.find((n) => n.value === data.besoin)?.label ?? "Nouveau message"} — ${data.nom}`,
          _template: "table",
          _captcha: "false",
        }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || json.success === "false" || json.success === false) throw new Error();
      setState("sent");
      form.reset();
    } catch {
      setState("error");
    }
  }

  if (state === "sent") {
    return (
      <div role="status" className="rounded-3xl border border-stroke bg-surface p-8 text-center md:p-12">
        <p className="font-display text-4xl italic">Merci !</p>
        <p className="mx-auto mt-4 max-w-md text-muted">
          Votre message est bien parti. Je vous réponds à l'adresse indiquée — {profile.responseTime.toLowerCase()}.
        </p>
        <button type="button" onClick={() => setState("idle")} className="mt-8 text-sm text-text-primary underline underline-offset-4">
          Envoyer un autre message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-5 rounded-3xl border border-stroke bg-surface p-6 md:grid-cols-2 md:p-10" noValidate={false}>
      <input type="text" name="_honey" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

      <div className="md:col-span-2">
        <span className={label} id="besoin-label">
          Votre demande
        </span>
        <div role="radiogroup" aria-labelledby="besoin-label" className="flex flex-wrap gap-2">
          {NEEDS.map((n) => (
            <label
              key={n.value}
              className={`cursor-pointer rounded-full border px-4 py-2 text-sm transition-colors ${
                need === n.value ? "border-transparent bg-text-primary text-bg" : "border-stroke text-muted hover:text-text-primary"
              }`}
            >
              <input type="radio" name="besoin" value={n.value} checked={need === n.value} onChange={() => setNeed(n.value)} className="sr-only" />
              {n.label}
            </label>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="nom" className={label}>
          Nom *
        </label>
        <input id="nom" name="nom" required autoComplete="name" className={field} placeholder="Votre nom" />
      </div>
      <div>
        <label htmlFor="email" className={label}>
          Email *
        </label>
        <input id="email" name="email" type="email" required autoComplete="email" className={field} placeholder="vous@exemple.com" />
      </div>
      <div>
        <label htmlFor="organisation" className={label}>
          {recruiting ? "Entreprise" : "Organisation"} <span className="normal-case tracking-normal">(facultatif)</span>
        </label>
        <input id="organisation" name="organisation" autoComplete="organization" className={field} />
      </div>
      <div>
        <label htmlFor="telephone" className={label}>
          Téléphone / WhatsApp <span className="normal-case tracking-normal">(facultatif)</span>
        </label>
        <input id="telephone" name="telephone" type="tel" autoComplete="tel" className={field} />
      </div>

      <div className="md:col-span-2">
        <label htmlFor="message" className={label}>
          {recruiting ? "Le poste ou l'opportunité *" : "Décrivez votre besoin *"}
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          className={`${field} resize-y`}
          placeholder={
            recruiting
              ? "Intitulé du poste, missions, modalités (sur place / à distance)…"
              : "Pas besoin de termes techniques : expliquez ce qui vous fait perdre du temps aujourd'hui et ce que vous aimeriez obtenir."
          }
        />
      </div>

      {!recruiting && (
        <>
          <div>
            <label htmlFor="budget" className={label}>
              Budget indicatif <span className="normal-case tracking-normal">(facultatif)</span>
            </label>
            <select id="budget" name="budget" className={field} defaultValue="">
              <option value="">Je ne sais pas encore</option>
              <option>Moins de 500 $</option>
              <option>500 – 1 500 $</option>
              <option>1 500 – 5 000 $</option>
              <option>Plus de 5 000 $</option>
            </select>
          </div>
          <div>
            <label htmlFor="delai" className={label}>
              Délai souhaité <span className="normal-case tracking-normal">(facultatif)</span>
            </label>
            <select id="delai" name="delai" className={field} defaultValue="">
              <option value="">Flexible</option>
              <option>Moins d'un mois</option>
              <option>1 à 3 mois</option>
              <option>Plus de 3 mois</option>
            </select>
          </div>
        </>
      )}

      <div className="md:col-span-2">
        <span className={label}>Langue d'échange</span>
        <div className="flex gap-4 text-sm text-muted">
          {["Français", "English"].map((l, i) => (
            <label key={l} className="flex cursor-pointer items-center gap-2">
              <input type="radio" name="langue" value={l} defaultChecked={i === 0} className="accent-[#4E85BF]" />
              {l}
            </label>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-4 md:col-span-2 md:flex-row md:items-center md:justify-between">
        <p className="max-w-md text-xs leading-relaxed text-muted">
          Ces informations servent uniquement à vous répondre. Ne partagez pas de données sensibles ici.{" "}
          <Link to="/confidentialite" className="underline underline-offset-2">
            Confidentialité
          </Link>
        </p>
        <button
          type="submit"
          disabled={state === "sending"}
          className="whitespace-nowrap rounded-full bg-text-primary px-8 py-3.5 text-sm font-medium text-bg transition-transform hover:scale-105 disabled:opacity-60"
        >
          {state === "sending" ? "Envoi…" : "Envoyer ma demande"}
        </button>
      </div>

      {state === "error" && (
        <p role="alert" className="rounded-2xl border border-rose-400/30 bg-rose-400/10 p-4 text-sm text-rose-100 md:col-span-2">
          L'envoi n'a pas abouti. Écrivez-moi directement à{" "}
          <a className="underline" href={`mailto:${profile.email}`}>
            {profile.email}
          </a>
          .
        </p>
      )}
    </form>
  );
}
