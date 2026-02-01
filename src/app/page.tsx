"use client";

import { useState, useMemo } from "react";

// 2025 Danish tax rates
const TAX_RATES = {
  AM_BIDRAG: 0.08, // 8% arbejdsmarkedsbidrag
  PERSONFRADRAG_MAANED: 4650, // månedligt personfradrag 2025
  BUNDSKAT: 0.1206, // 12.06%
  TOPSKAT: 0.15, // 15%
  TOPSKAT_GRAENSE: 63700, // månedlig topskattegrænse efter AM-bidrag
  KOMMUNE_GENNEMSNIT: 0.2508, // gennemsnitlig kommuneskat
  KIRKESKAT_GENNEMSNIT: 0.0087, // gennemsnitlig kirkeskat
};

const KOMMUNER = [
  { navn: "København", skat: 0.2300 },
  { navn: "Frederiksberg", skat: 0.2280 },
  { navn: "Aarhus", skat: 0.2506 },
  { navn: "Odense", skat: 0.2512 },
  { navn: "Aalborg", skat: 0.2540 },
  { navn: "Esbjerg", skat: 0.2505 },
  { navn: "Randers", skat: 0.2570 },
  { navn: "Vejle", skat: 0.2460 },
  { navn: "Gennemsnit", skat: 0.2508 },
];

export default function Loenberegner() {
  const [bruttoLoen, setBruttoLoen] = useState<number>(45000);
  const [valgtKommune, setValgtKommune] = useState<string>("København");
  const [erMedlemAfFolkekirken, setErMedlemAfFolkekirken] = useState<boolean>(true);
  const [pension, setPension] = useState<number>(0);
  const [atp, setAtp] = useState<boolean>(true);

  const beregning = useMemo(() => {
    const kommune = KOMMUNER.find(k => k.navn === valgtKommune) || KOMMUNER[0];
    const kommuneskat = kommune.skat;
    const kirkeskat = erMedlemAfFolkekirken ? TAX_RATES.KIRKESKAT_GENNEMSNIT : 0;
    
    // Pension fratrækkes før AM-bidrag
    const pensionBidrag = bruttoLoen * (pension / 100);
    const atpBidrag = atp ? 99.15 : 0; // månedlig ATP-bidrag lønmodtager
    
    const loenEfterPension = bruttoLoen - pensionBidrag - atpBidrag;
    
    // AM-bidrag (8%)
    const amBidrag = loenEfterPension * TAX_RATES.AM_BIDRAG;
    const efterAmBidrag = loenEfterPension - amBidrag;
    
    // Skattepligtig indkomst
    const skattepligtigIndkomst = efterAmBidrag;
    
    // Bundskat + kommuneskat + kirkeskat på beløb over personfradrag
    const beskatningsgrundlag = Math.max(0, skattepligtigIndkomst - TAX_RATES.PERSONFRADRAG_MAANED);
    const samletTrækprocent = TAX_RATES.BUNDSKAT + kommuneskat + kirkeskat;
    const bundOgKommuneskat = beskatningsgrundlag * samletTrækprocent;
    
    // Topskat (kun på beløb over grænsen)
    const topskatGrundlag = Math.max(0, efterAmBidrag - TAX_RATES.TOPSKAT_GRAENSE);
    const topskat = topskatGrundlag * TAX_RATES.TOPSKAT;
    
    // Samlet skat
    const samletSkat = bundOgKommuneskat + topskat;
    
    // Nettoløn
    const nettoLoen = efterAmBidrag - samletSkat;
    
    // Skatteprocent
    const effektivSkatteProcent = ((bruttoLoen - nettoLoen - pensionBidrag - atpBidrag) / bruttoLoen) * 100;
    
    return {
      bruttoLoen,
      pensionBidrag,
      atpBidrag,
      amBidrag,
      efterAmBidrag,
      beskatningsgrundlag,
      bundOgKommuneskat,
      topskat,
      samletSkat,
      nettoLoen,
      effektivSkatteProcent,
      kommuneskat: kommuneskat * 100,
      kirkeskat: kirkeskat * 100,
    };
  }, [bruttoLoen, valgtKommune, erMedlemAfFolkekirken, pension, atp]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* SEO Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">
            Lønberegner 2025 - Beregn din nettoløn
          </h1>
          <p className="mt-2 text-gray-600">
            Gratis dansk lønberegner med opdaterede skattesatser for 2025. Se præcis hvad du får udbetalt.
          </p>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Input sektion */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Indtast din løn
            </h2>
            
            <div className="space-y-6">
              {/* Bruttoløn */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bruttoløn pr. måned (før skat)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={bruttoLoen}
                    onChange={(e) => setBruttoLoen(Number(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
                    min={0}
                    step={1000}
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
                    kr.
                  </span>
                </div>
                <input
                  type="range"
                  value={bruttoLoen}
                  onChange={(e) => setBruttoLoen(Number(e.target.value))}
                  min={15000}
                  max={150000}
                  step={1000}
                  className="w-full mt-2 accent-blue-500"
                />
              </div>

              {/* Kommune */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Kommune (påvirker kommuneskat)
                </label>
                <select
                  value={valgtKommune}
                  onChange={(e) => setValgtKommune(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  {KOMMUNER.map(k => (
                    <option key={k.navn} value={k.navn}>
                      {k.navn} ({(k.skat * 100).toFixed(2)}%)
                    </option>
                  ))}
                </select>
              </div>

              {/* Pension */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pension (% af løn)
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="number"
                    value={pension}
                    onChange={(e) => setPension(Math.min(30, Math.max(0, Number(e.target.value))))}
                    className="w-24 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    min={0}
                    max={30}
                  />
                  <span className="text-gray-500">%</span>
                  <input
                    type="range"
                    value={pension}
                    onChange={(e) => setPension(Number(e.target.value))}
                    min={0}
                    max={30}
                    className="flex-1 accent-blue-500"
                  />
                </div>
              </div>

              {/* Checkboxes */}
              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={erMedlemAfFolkekirken}
                    onChange={(e) => setErMedlemAfFolkekirken(e.target.checked)}
                    className="w-5 h-5 rounded border-gray-300 text-blue-500 focus:ring-blue-500"
                  />
                  <span className="text-gray-700">Medlem af folkekirken (kirkeskat)</span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={atp}
                    onChange={(e) => setAtp(e.target.checked)}
                    className="w-5 h-5 rounded border-gray-300 text-blue-500 focus:ring-blue-500"
                  />
                  <span className="text-gray-700">ATP-bidrag</span>
                </label>
              </div>
            </div>
          </div>

          {/* Resultat sektion */}
          <div className="space-y-6">
            {/* Hovedresultat */}
            <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl shadow-lg p-6 text-white">
              <h2 className="text-lg font-medium opacity-90">Din nettoløn</h2>
              <p className="text-5xl font-bold mt-2">
                {Math.round(beregning.nettoLoen).toLocaleString('da-DK')} kr.
              </p>
              <p className="mt-2 opacity-80">
                Effektiv skatteprocent: {beregning.effektivSkatteProcent.toFixed(1)}%
              </p>
            </div>

            {/* Detaljeret breakdown */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Beregningsdetaljer
              </h2>
              
              <div className="space-y-3 text-sm">
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">Bruttoløn</span>
                  <span className="font-medium">{beregning.bruttoLoen.toLocaleString('da-DK')} kr.</span>
                </div>
                
                {beregning.pensionBidrag > 0 && (
                  <div className="flex justify-between py-2 border-b text-orange-600">
                    <span>- Pension ({pension}%)</span>
                    <span>-{Math.round(beregning.pensionBidrag).toLocaleString('da-DK')} kr.</span>
                  </div>
                )}
                
                {beregning.atpBidrag > 0 && (
                  <div className="flex justify-between py-2 border-b text-orange-600">
                    <span>- ATP-bidrag</span>
                    <span>-{beregning.atpBidrag.toFixed(2)} kr.</span>
                  </div>
                )}
                
                <div className="flex justify-between py-2 border-b text-red-600">
                  <span>- AM-bidrag (8%)</span>
                  <span>-{Math.round(beregning.amBidrag).toLocaleString('da-DK')} kr.</span>
                </div>
                
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">Skattepligtig indkomst</span>
                  <span className="font-medium">{Math.round(beregning.efterAmBidrag).toLocaleString('da-DK')} kr.</span>
                </div>
                
                <div className="flex justify-between py-2 border-b text-red-600">
                  <span>- Bund/kommune/kirkeskat</span>
                  <span>-{Math.round(beregning.bundOgKommuneskat).toLocaleString('da-DK')} kr.</span>
                </div>
                
                {beregning.topskat > 0 && (
                  <div className="flex justify-between py-2 border-b text-red-600">
                    <span>- Topskat (15%)</span>
                    <span>-{Math.round(beregning.topskat).toLocaleString('da-DK')} kr.</span>
                  </div>
                )}
                
                <div className="flex justify-between py-3 bg-green-50 rounded-lg px-3 mt-4">
                  <span className="font-semibold text-green-800">Nettoløn (udbetalt)</span>
                  <span className="font-bold text-green-800">{Math.round(beregning.nettoLoen).toLocaleString('da-DK')} kr.</span>
                </div>
              </div>
            </div>

            {/* Info boks */}
            <div className="bg-blue-50 rounded-xl p-4 text-sm text-blue-800">
              <p className="font-medium">💡 Skattesatser 2025:</p>
              <ul className="mt-2 space-y-1 text-blue-700">
                <li>• Kommuneskat {valgtKommune}: {beregning.kommuneskat.toFixed(2)}%</li>
                <li>• Bundskat: 12,06%</li>
                <li>• AM-bidrag: 8%</li>
                {beregning.topskat > 0 && <li>• Topskat: 15% (over 63.700 kr/md)</li>}
              </ul>
            </div>
          </div>
        </div>

        {/* SEO Content */}
        <section className="mt-12 bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Sådan beregnes din løn i Danmark 2025
          </h2>
          <div className="prose max-w-none text-gray-600">
            <p>
              Vores lønberegner giver dig et præcist estimat af din nettoløn baseret på de gældende 
              skatteregler for 2025. Beregningen tager højde for AM-bidrag, kommuneskat, bundskat, 
              topskat og eventuelt kirkeskat.
            </p>
            <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-2">Hvad er AM-bidrag?</h3>
            <p>
              Arbejdsmarkedsbidraget (AM-bidrag) er på 8% og trækkes fra din bruttoløn før 
              der beregnes øvrig skat. Det går til finansiering af dagpenge og andre arbejdsmarkedsydelser.
            </p>
            <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-2">Hvornår betaler man topskat?</h3>
            <p>
              I 2025 betaler du topskat (15%) af den del af din indkomst der overstiger ca. 63.700 kr. 
              om måneden efter AM-bidrag er fratrukket. Det svarer til en årsindkomst på ca. 640.000 kr.
            </p>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-12 text-center text-gray-500 text-sm">
          <p>© 2025 Lønberegner.dk - Gratis dansk lønberegner</p>
          <p className="mt-1">
            Beregningen er vejledende. Kontakt SKAT for præcise oplysninger.
          </p>
        </footer>
      </div>
    </main>
  );
}
