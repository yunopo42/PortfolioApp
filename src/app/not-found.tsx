import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-6 py-32 text-center">
      <p className="font-mono text-sm text-tech">
        $ cd /aradigin-sayfa
      </p>
      <h1 className="mt-4 text-5xl font-semibold tracking-tight">404</h1>
      <p className="mt-4 max-w-md text-muted">
        Burası haritada yok — ve ben haritalardan iyi anlarım.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-full border border-line px-5 py-2.5 text-sm text-fg transition hover:border-tech hover:text-tech"
      >
        ← Ana sayfaya dön
      </Link>
    </main>
  );
}
