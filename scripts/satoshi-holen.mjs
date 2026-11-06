/* Holt Satoshi (variable Schrift) bei Fontshare, falls die Datei fehlt.
   Laeuft vor `next dev` und `next build` (predev/prebuild), also auch bei Vercel.

   Die ITF Free Font License erlaubt, Satoshi selbst zu hosten, verbietet aber,
   die Datei ueber ein oeffentliches Repository weiterzugeben. Dieses Repo ist
   oeffentlich: src/app/fonts/ steht in .gitignore, der Bau holt die Datei selbst.
   Fontshare liefert hier byte-gleich die Datei aus dem offiziellen Paket. */
import { existsSync, mkdirSync, writeFileSync } from "node:fs";

const ziel = new URL("../src/app/fonts/Satoshi-Variable.woff2", import.meta.url);

if (!existsSync(ziel)) {
  const css = await fetch("https://api.fontshare.com/v2/css?f[]=satoshi@1&display=swap").then((r) => r.text());
  const adresse = css.match(/url\('(\/\/cdn\.fontshare\.com\/[^']+\.woff2)'\)/)?.[1];
  if (!adresse) throw new Error("Satoshi: Fontshare hat keine woff2-Adresse geliefert");

  const datei = Buffer.from(await fetch(`https:${adresse}`).then((r) => r.arrayBuffer()));
  if (datei.subarray(0, 4).toString() !== "wOF2") throw new Error("Satoshi: Download ist keine woff2-Datei");

  mkdirSync(new URL(".", ziel), { recursive: true });
  writeFileSync(ziel, datei);
  console.log(`Satoshi geholt (${datei.length} Byte)`);
}
