import fs from "fs";
import path from "path";
const dir = "d:/Work/Projects/Latheif Productions/Pixel Pluz/pixlpluz website/pixlpluz/public/images";
for (const f of fs.readdirSync(dir)) {
  const buf = fs.readFileSync(path.join(dir, f));
  if (buf[0] === 0xff && buf[1] === 0xd8) {
    let i = 2;
    while (i < buf.length) {
      if (buf[i] !== 0xff) { i++; continue; }
      const marker = buf[i + 1];
      if (marker === 0xc0 || marker === 0xc2) {
        const h = buf.readUInt16BE(i + 5);
        const w = buf.readUInt16BE(i + 7);
        console.log(`${f} - ${w}x${h}`);
        break;
      }
      const len = buf.readUInt16BE(i + 2);
      i += 2 + len;
    }
  } else if (buf.toString("ascii", 1, 4) === "PNG") {
    const w = buf.readUInt32BE(16);
    const h = buf.readUInt32BE(20);
    console.log(`${f} - ${w}x${h}`);
  } else {
    console.log(`${f} - unknown format`);
  }
}
