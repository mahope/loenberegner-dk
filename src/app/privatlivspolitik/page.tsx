import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privatlivspolitik | Lønberegner.dk",
  description: "Læs hvordan Lønberegner.dk håndterer dine oplysninger. Beregninger sker lokalt i din browser – vi gemmer ikke dine data.",
  robots: { index: true, follow: true },
};

export default function PrivatlivspolitikPage() {
  return (
    <div className="prose max-w-3xl">
      <h1>Privatlivspolitik</h1>
      <p>
        Vi tager dit privatliv alvorligt. Når du bruger Lønberegner.dk, sker
        alle beregninger lokalt i din browser. Dine data sendes ikke til vores
        servere og gemmes ikke efterfølgende.
      </p>

      <h2>Hvilke oplysninger behandles?</h2>
      <p>
        De tal og oplysninger, du indtaster (fx løn, pension, kommune),
        anvendes kun til selve beregningen i din browser. De deles ikke med
        tredjepart og lagres ikke hos os.
      </p>

      <h2>Cookies</h2>
      <p>
        Vi bruger som udgangspunkt ingen cookies. Hvis vi i fremtiden viser
        annoncer via Google AdSense, vil eventuelle annonce-cookies først blive
        aktiveret efter dit samtykke.
      </p>

      <h2>Analyse</h2>
      <p>
        Vi kan bruge cookiefri analyse (fx Plausible) for at forstå samlet
        trafik. Data er aggregerede og kan ikke bruges til at identificere
        enkeltpersoner.
      </p>

      <h2>Dine rettigheder</h2>
      <p>
        Da vi ikke gemmer persondata, har vi ikke mulighed for at give indsigt
        i eller slette oplysninger – de forlader ikke din enhed.
      </p>

      <h2>Kontakt</h2>
      <p>
        Spørgsmål? Skriv til os på <a href="mailto:kontakt@loenberegner.dk">kontakt@loenberegner.dk</a>.
      </p>

      <p className="text-sm text-gray-500">Senest opdateret: Februar 2026</p>
    </div>
  );
}
