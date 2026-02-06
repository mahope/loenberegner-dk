import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookiepolitik | Lønberegner.dk",
  description: "Læs om vores brug af cookies. Vi sætter ikke cookies, medmindre du giver samtykke til annoncer efter AdSense-godkendelse.",
  robots: { index: true, follow: true },
};

export default function CookiePolitikPage() {
  return (
    <div className="prose max-w-3xl">
      <h1>Cookiepolitik</h1>
      <p>
        Lønberegner.dk bruger som udgangspunkt ikke cookies. Hvis vi senere
        viser annoncer, kan der blive placeret cookies fra Google/partnere –
        først efter dit samtykke.
      </p>

      <h2>Typer af cookies</h2>
      <ul>
        <li>Nødvendige: Sikrer at siden fungerer (vi bruger pt. ingen).</li>
        <li>Statistik: Cookiefri analyse (Plausible) kan anvendes.</li>
        <li>Marketing: Annoncecookies (kun efter samtykke, hvis aktiveret).</li>
      </ul>

      <h2>Sådan styrer du cookies</h2>
      <p>
        Du kan altid ændre dine browserindstillinger for at blokere eller slette
        cookies.
      </p>

      <h2>Kontakt</h2>
      <p>
        Har du spørgsmål, kontakt os på
        {" "}
        <a href="mailto:kontakt@loenberegner.dk">kontakt@loenberegner.dk</a>.
      </p>

      <p className="text-sm text-gray-500">Senest opdateret: Februar 2026</p>
    </div>
  );
}
