import { ChartColumn, CodeXml, Megaphone, Palette, PenLine, Search, type LucideIcon } from "lucide-react";
import type { PaketId } from "./daten";

/** Zeichen je Paket (Lucide), auf der Seite und auf der Dankeseite. Auf der 3D-Bühne stehen dieselben Formen als Prägung (ZEICHEN in Buehne.tsx). */
export const SYMBOL: Record<PaketId, LucideIcon> = { texte: PenLine, design: Palette, seo: Search, recherche: ChartColumn, social: Megaphone, entwicklung: CodeXml };
