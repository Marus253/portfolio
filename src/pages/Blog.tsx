import { Link, useParams } from "react-router-dom";
import CreateTogether from "../components/CreateTogether";
import Icon from "../components/Icon";
import PageHeader, { Container } from "../components/PageHeader";
import PageTransition from "../components/PageTransition";
import { findPost, formatDate, posts, type Post } from "../data/posts";
import { useTitle } from "../lib/scroll";
import NotFound from "./NotFound";

// Vignette typographique : pas besoin d'image pour chaque note.
function Cover({ post, i }: { post: Post; i: number }) {
  const tones = ["bg-accent text-bg", "bg-surface text-text-primary", "bg-text-primary text-bg"];
  return (
    <div className={`relative flex aspect-[4/3] flex-col justify-between overflow-hidden rounded-2xl p-6 ${tones[i % tones.length]}`}>
      <span className="w-fit rounded-full border border-current px-3 py-1 text-[11px] font-medium uppercase tracking-wide opacity-80">{post.tag}</span>
      <p className="font-display text-3xl leading-[0.95] md:text-4xl">{post.title}</p>
    </div>
  );
}

export function BlogList() {
  useTitle("Notes", "Notes et retours d'expérience de Warren Musau : backend, sécurité, DevSecOps.");
  return (
    <PageTransition>
      <main id="contenu">
        <PageHeader eyebrow="Notes & veille" title="Notes" sub="Retours d'expérience tirés de mes projets : backend, sécurité applicative et DevSecOps." />
        <Container className="grid gap-x-6 gap-y-14 pb-24 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((p, i) => (
            <Link key={p.slug} to={`/notes/${p.slug}`} className="group flex flex-col gap-5">
              <div className="transition-transform duration-300 group-hover:-translate-y-1">
                <Cover post={p} i={i} />
              </div>
              <div>
                <h2 className="text-lg font-medium uppercase leading-snug tracking-tight transition-colors group-hover:text-accent">{p.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted">{p.excerpt}</p>
                <p className="mt-4 flex justify-between text-xs text-muted">
                  <span>Par Warren Musau</span>
                  <time dateTime={p.date}>{formatDate(p.date)}</time>
                </p>
              </div>
            </Link>
          ))}
        </Container>
        <CreateTogether />
      </main>
    </PageTransition>
  );
}

export function BlogPost() {
  const { slug } = useParams();
  const post = findPost(slug);
  useTitle(post?.title ?? "Note introuvable", post?.excerpt);
  if (!post) return <NotFound />;
  const others = posts.filter((p) => p.slug !== post.slug).slice(0, 2);
  return (
    <PageTransition>
      <main id="contenu">
        <Container className="max-w-[900px] pb-16 pt-32 md:pt-40">
          <Link to="/notes" className="inline-flex items-center gap-2 text-sm text-muted hover:text-text-primary">
            <Icon name="arrow-left" /> Toutes les notes
          </Link>
          <p className="mt-10 flex gap-3 text-xs uppercase tracking-wide text-muted">
            <span className="text-accent">{post.tag}</span>
            <time dateTime={post.date}>{formatDate(post.date)}</time>
          </p>
          <h1 className="font-display mt-4 text-balance text-[2.6rem] sm:text-6xl">{post.title}</h1>
          <p className="mt-6 text-lg leading-relaxed text-muted">{post.excerpt}</p>
          <div className="mt-12 space-y-6 border-t border-stroke pt-10 text-base leading-relaxed text-text-primary/85 md:text-lg">
            {post.body.map((t) => (
              <p key={t}>{t}</p>
            ))}
          </div>
        </Container>
        {others.length > 0 && (
          <Container className="max-w-[900px] pb-24">
            <p className="mb-6 text-xs uppercase tracking-wide text-muted">À lire aussi</p>
            <div className="grid gap-6 sm:grid-cols-2">
              {others.map((p) => (
                <Link key={p.slug} to={`/notes/${p.slug}`} className="group rounded-2xl border border-stroke p-6 transition-colors hover:border-accent/60">
                  <p className="text-xs text-muted">{p.tag}</p>
                  <p className="mt-3 font-medium uppercase tracking-tight group-hover:text-accent">{p.title}</p>
                </Link>
              ))}
            </div>
          </Container>
        )}
      </main>
    </PageTransition>
  );
}
