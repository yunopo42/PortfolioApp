import { profile, links } from "@/data/content";
import Section from "./Section";
import Reveal from "./Reveal";
import Social from "./Social";

export default function Contact() {
  return (
    <Section id="iletisim" index="05" title="İletişim">
      <Reveal>
        <p className="max-w-2xl leading-relaxed text-muted">
          Staj, proje veya sadece sohbet — her türlü mesaja açığım. En hızlı
          ulaşabileceğin yer e-posta.
        </p>
      </Reveal>

      <Reveal delay={0.08}>
        <a
          href={links.email}
          className="mt-6 inline-block font-mono text-lg text-tech underline underline-offset-8 transition hover:opacity-80 sm:text-2xl"
        >
          {profile.email}
        </a>
      </Reveal>

      <Reveal delay={0.14}>
        <Social className="mt-8" />
      </Reveal>
    </Section>
  );
}
