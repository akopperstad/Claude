// Photo enhancement pass: auto-levels, gentle saturation/sharpen, uniform
// 4:3 crop. Stand-in for the full AI studio treatment (background
// replacement etc.) which needs the generative pipeline.
import sharp from "sharp";
import { readdirSync } from "fs";

const IN = "images/original";
const OUT = "images/enhanced";

for (const f of readdirSync(IN).filter((f) => f.endsWith(".jpg"))) {
  await sharp(`${IN}/${f}`)
    .rotate()
    .resize(1200, 900, { fit: "cover", position: "attention" })
    .normalise({ lower: 1, upper: 99 })
    .modulate({ brightness: 1.04, saturation: 1.12 })
    .sharpen({ sigma: 0.8 })
    .jpeg({ quality: 85 })
    .toFile(`${OUT}/${f}`);
  console.log("enhanced", f);
}
