import fs from "fs";
import path from "path";

const projectRoot = process.cwd();

const pages = [
  "src/pages/Disney.jsx",
  "src/pages/Universal.jsx",
];

for (const relativePath of pages) {
  const filePath = path.join(projectRoot, relativePath);

  if (!fs.existsSync(filePath)) {
    console.log("Missing:", relativePath);
    continue;
  }

  let content = fs.readFileSync(filePath, "utf8");

  content = content.replace(
    'import ParkMap from "../components/ParkMap.jsx";',
    'import RealParkMap from "../components/RealParkMap.jsx";'
  );

  content = content.replaceAll("<ParkMap", "<RealParkMap");

  fs.writeFileSync(filePath, content, "utf8");

  console.log("Updated:", relativePath);
}

console.log("Done. Disney and Universal now use RealParkMap.");