import Reveal from "./Reveal";

/** Tüm bölümlerin ortak çerçevesi: başlık + numara + içerik. */
export default function Section({
  id,
  index,
  title,
  children,
}: {
  id: string;
  index: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="mx-auto w-full max-w-5xl scroll-mt-20 px-6 py-16">
      <Reveal>
        <h2 className="flex items-baseline gap-3 text-2xl font-semibold tracking-tight sm:text-3xl">
          <span className="font-mono text-sm text-tech">{index}</span>
          {title}
        </h2>
        <div className="mt-4 h-px w-full bg-line" />
      </Reveal>

      <div className="mt-8">{children}</div>
    </section>
  );
}
