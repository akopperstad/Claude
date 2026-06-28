import { getProxyDispatcher } from "../proxyFetch";

const ENH = "https://data.brreg.no/enhetsregisteret/api/enheter";
const REG = "https://data.brreg.no/regnskapsregisteret/regnskap";

async function getJson(url: string, timeoutMs = 20000): Promise<any> {
  const resp = await fetch(url, {
    headers: { accept: "application/json" },
    // @ts-expect-error undici dispatcher
    dispatcher: getProxyDispatcher(),
    signal: AbortSignal.timeout(timeoutMs),
  });
  if (!resp.ok) throw new Error(`${resp.status} ${url}`);
  return resp.json();
}

export interface BrregCompany {
  orgnr: string;
  navn: string;
  kommunenr?: string;
  kommune?: string;
  nace?: string;
  nace_desc?: string;
  orgform?: string;
  employees?: number | null;
  website?: string | null;
  registered?: string | null;
}

function mapCompany(e: any): BrregCompany {
  return {
    orgnr: e.organisasjonsnummer,
    navn: e.navn,
    kommunenr: e.forretningsadresse?.kommunenummer,
    kommune: e.forretningsadresse?.kommune,
    nace: e.naeringskode1?.kode,
    nace_desc: e.naeringskode1?.beskrivelse,
    orgform: e.organisasjonsform?.kode,
    employees: typeof e.antallAnsatte === "number" ? e.antallAnsatte : null,
    website: e.hjemmeside || null,
    registered: e.registreringsdatoEnhetsregisteret || null,
  };
}

// Search Enhetsregisteret. Page-based paging is capped (~10k deep) by Brreg; for
// the full national set use the bulk download instead (see bulkDownloadUrl).
export async function searchCompanies(params: {
  kommunenummer?: string;
  naeringskode?: string;
  size?: number;
  page?: number;
}): Promise<{ companies: BrregCompany[]; total: number; totalPages: number }> {
  const q = new URLSearchParams();
  if (params.kommunenummer) q.set("kommunenummer", params.kommunenummer);
  if (params.naeringskode) q.set("naeringskode", params.naeringskode);
  q.set("size", String(params.size ?? 50));
  q.set("page", String(params.page ?? 0));
  const j = await getJson(`${ENH}?${q.toString()}`);
  const companies = (j._embedded?.enheter ?? []).map(mapCompany);
  return { companies, total: j.page?.totalElements ?? companies.length, totalPages: j.page?.totalPages ?? 1 };
}

// The gzipped full dataset — the cheap path for an all-Norway ingest (one file
// vs ~1.1M API calls). The worker streams this instead of paging.
export const bulkDownloadUrl = `${ENH}/lastned`;

export interface Financials {
  year?: string;
  revenue?: number | null;
  profit?: number | null;
  assets?: number | null;
  equity?: number | null;
  equity_ratio?: number | null;
  liquidity?: number | null;
}

// Latest annual accounts for an org number. Returns nulls when not filed.
export async function getFinancials(orgnr: string): Promise<Financials | null> {
  let arr: any;
  try {
    arr = await getJson(`${REG}/${orgnr}`, 18000);
  } catch {
    return null;
  }
  const a = Array.isArray(arr) ? arr[0] : arr;
  if (!a) return null;
  const num = (v: any) => (typeof v === "number" ? v : null);

  const revenue = num(a.resultatregnskapResultat?.driftsresultat?.driftsinntekter?.sumDriftsinntekter);
  const profit = num(a.resultatregnskapResultat?.aarsresultat);
  const assets = num(a.eiendeler?.sumEiendeler);
  const equity = num(a.egenkapitalGjeld?.egenkapital?.sumEgenkapital);
  const currentAssets = num(a.eiendeler?.omloepsmidler?.sumOmloepsmidler);
  const currentLiab = num(a.egenkapitalGjeld?.gjeldOversikt?.kortsiktigGjeld?.sumKortsiktigGjeld);

  return {
    year: a.regnskapsperiode?.tilDato,
    revenue, profit, assets, equity,
    equity_ratio: equity != null && assets ? equity / assets : null,
    liquidity: currentAssets != null && currentLiab ? currentAssets / currentLiab : null,
  };
}
