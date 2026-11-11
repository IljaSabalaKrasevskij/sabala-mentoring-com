import { NextResponse } from "next/server";
import { siegelNeu } from "@/lib/botschutz";
import { MIN_ALTER_MS } from "@/lib/siegel";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/* Gibt der Seite einen Stempel für genau ein Absenden (Botschutz, src/lib/siegel.ts).
   warten: so viele Millisekunden muss der Stempel alt sein, bevor ein Formular ihn einlösen darf. */
export function GET() {
  return NextResponse.json({ siegel: siegelNeu(), warten: MIN_ALTER_MS }, { headers: { "Cache-Control": "no-store" } });
}
