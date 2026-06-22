import fs from "fs";
import path from "path";

const projectRoot = process.cwd();

const universalPagePath = path.join(projectRoot, "src", "pages", "Universal.jsx");
const attractionCardPath = path.join(projectRoot, "src", "components", "AttractionCard.jsx");
const cssPath = path.join(projectRoot, "src", "style.css");

let universalPage = fs.readFileSync(universalPagePath, "utf8");

universalPage = universalPage
  .replace(
    '{ id: "express_use", label: "Express" },',
    '{ id: "express_use", label: "כדאי להשתמש ב-Express" },'
  )
  .replace(
    'express_use: "Express",',
    'express_use: "כדאי להשתמש ב-Express",'
  )
  .replace(
    "בפארקים הוותיקים יש לכם Express Unlimited\n        דרך המלון; ב־Epic Universe התנאים שונים ונעדכן בנפרד.",
    "בפארקים הוותיקים יש לכם Express Unlimited דרך המלון. הכפתור “כדאי להשתמש ב-Express” מציג רק מתקנים שבהם באמת שווה לנצל אותו."
  );

fs.writeFileSync(universalPagePath, universalPage, "utf8");

let attractionCard = fs.readFileSync(attractionCardPath, "utf8");

const newExpressInfo = `function ExpressInfo({ attraction }) {
  const express = attraction.express;
  const priority = attraction.expressPriority || "check_same_day";

  const classes = [
    "nearby-box",
    "express-box",
    priority === "use" ? "express-use" : "",
    priority === "not_needed" ? "express-not-needed" : "",
    priority === "not_available" ? "express-not-available" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes}>
      <strong>Express:</strong>

      <div className="nearby-list">
        {express.includedWithHotel != null && (
          <span>
            {express.includedWithHotel ? "כלול לכם" : "לא כלול לכם"}
          </span>
        )}

        {express.type && <span>{labelExpressType(express.type)}</span>}

        <span>{labelExpressPriority(priority)}</span>
      </div>

      <p className="mini-note">{buildExpressSummary(express, priority)}</p>
    </div>
  );
}

function buildExpressSummary(express, priority) {
  if (priority === "use") {
    return "כאן כן כדאי להשתמש ב-Express, במיוחד אם התור רגיל/ארוך.";
  }

  if (priority === "not_needed") {
    return "יש לכם Express, אבל לא חייבים לבזבז אותו אם התור קצר.";
  }

  if (priority === "not_available") {
    return "Express לא רלוונטי כאן — בדרך כלל זו חוויה, דמות, אזור פתוח או אוכל.";
  }

  if (express.type === "once_per_ride") {
    return "ב-Epic זה כנראה מוגבל יותר — לבדוק תנאים באפליקציה/כרטיס.";
  }

  return "לבדוק באותו יום לפי התור בפועל.";
}

`;

const expressInfoRegex =
  /function ExpressInfo\(\{ attraction \}\) \{[\s\S]*?\n\}\n\nfunction labelCategory/;

if (!expressInfoRegex.test(attractionCard)) {
  throw new Error("Could not find ExpressInfo function in AttractionCard.jsx");
}

attractionCard = attractionCard.replace(
  expressInfoRegex,
  `${newExpressInfo}function labelCategory`
);

attractionCard = attractionCard.replace(
  `function labelExpressPriority(value) {
  const labels = {
    use: "להשתמש",
    not_needed: "לא חובה אם התור קצר",
    not_available: "לא זמין",
    check_same_day: "לבדוק באותו יום",
  };

  return labels[value] || value;
}`,
  `function labelExpressPriority(value) {
  const labels = {
    use: "כדאי להשתמש",
    not_needed: "לא קריטי אם התור קצר",
    not_available: "לא רלוונטי",
    check_same_day: "לבדוק באותו יום",
  };

  return labels[value] || value;
}`
);

fs.writeFileSync(attractionCardPath, attractionCard, "utf8");

let css = fs.readFileSync(cssPath, "utf8");

const cssToAdd = `
.express-box {
  border-color: #bae6fd;
  background: #f0f9ff;
}

.express-box.express-use {
  border-color: #7dd3fc;
  background: #ecfeff;
}

.express-box.express-not-needed {
  border-color: #fde68a;
  background: #fffbeb;
}

.express-box.express-not-available {
  border-color: #e2e8f0;
  background: #f8fafc;
}

.express-box .nearby-list span {
  font-weight: 700;
}

.mini-note {
  margin: 8px 0 0;
  font-size: 0.88rem;
  color: #475569;
}
`;

if (!css.includes(".express-box.express-use")) {
  css += cssToAdd;
  fs.writeFileSync(cssPath, css, "utf8");
}

console.log("Updated Universal Express labels and card display.");