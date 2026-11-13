import { Link, useParams } from "react-router-dom";
import CreateTogether from "../components/CreateTogether";
import Icon from "../components/Icon";
import PageHeader, { Container } from "../components/PageHeader";
import PageTransition from "../components/PageTransition";
import { findPost, formatDate, posts } from "../data/posts";
import { useTitle } from "../lib/scroll";
import NotFound from "./NotFound";

export function BlogList() {
  useTitle("Notes", "Notes et retours d'expérience de Warren Musau : backend, sécurité, DevSecOps.");
  return (
    <PageTransition>
      <main id="contenu">
        <PageHeader title="Notes" sub="Retours d'expérience tirés de mes projets : backend, sécurité applicative et DevSecOps." />
        <Container className="pb-24">
          <ul className="border-t border-stroke">
            {posts.map((p) => (
              <li key={p.slug} className="border-b border-stroke">
                <Link to={`/notes/${p.slug}`} className="group grid gap-3 py-8 md:grid-cols-[220px_1fr_auto] md:gap-10">
                  <p className="text-sm text-muted">
                    <time dateTime={p.date}>{formatDate(p.date)}</time>
                    <span className="block">{p.tag}</span>
                  </p>
                  <div>
                    <h2 className="font-display text-2xl transition-colors group-hover:text-accent md:text-4xl">{p.title}</h2>
                    <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted md:text-base">{p.excerpt}</p>
                  </div>
                  <Icon name="arrow-right" size={20} className="hidden text-muted transition-all group-hover:translate-x-1 group-hover:text-accent md:block" />
                </Link>
              </li>
            ))}
          </ul>
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
