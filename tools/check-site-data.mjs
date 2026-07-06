import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const siteDataPath = path.join(rootDir, "assets", "site-data.js");
const htmlFiles = [];
const errors = [];

const readSiteData = () => {
  const code = fs.readFileSync(siteDataPath, "utf8");
  const sandbox = { window: {} };

  vm.runInNewContext(code, sandbox, { filename: siteDataPath });

  if (!sandbox.window.PapeleraElClanSiteData) {
    throw new Error("assets/site-data.js did not define window.PapeleraElClanSiteData");
  }

  return sandbox.window.PapeleraElClanSiteData;
};

const walk = (dir) => {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      if (entry.name !== ".git") {
        walk(fullPath);
      }
      continue;
    }

    if (entry.isFile() && entry.name.endsWith(".html")) {
      htmlFiles.push(fullPath);
    }
  }
};

const report = (file, message) => {
  errors.push(`${path.relative(rootDir, file)}: ${message}`);
};

const removeApprovedSiteDataContexts = (content) => {
  return content
    .replace(/<([a-z0-9-]+)\b[^>]*data-site-text="[^"]*"[^>]*>[\s\S]*?<\/\1>/gi, "")
    .replace(/<([a-z0-9-]+)\b[^>]*data-site-render="[^"]*"[^>]*>[\s\S]*?<\/\1>/gi, "")
    .replace(/<[^>]*data-site-(?:href|label|content)="[^"]*"[^>]*>/gi, "");
};

const ensureRequiredPlaceholders = (file, content) => {
  const required = [
    'data-site-href="whatsappUrl"',
    'data-site-href="mapsUrl"',
    'data-site-href="instagramUrl"',
    'data-site-render="businessHours"',
    'data-site-text="whatsappDisplay"',
    'data-site-text="fullAddress"',
    'data-site-text="googleRating"',
  ];

  required.forEach((placeholder) => {
    if (!content.includes(placeholder)) {
      report(file, `missing required placeholder ${placeholder}`);
    }
  });
};

const ensureMarkedLinksUseCanonicalValues = (file, content, data) => {
  const linkChecks = [
    { marker: 'data-site-href="whatsappUrl"', canonical: data.whatsappUrl },
    { marker: 'data-site-href="mapsUrl"', canonical: data.mapsUrl.replaceAll("&", "&amp;") },
    { marker: 'data-site-href="instagramUrl"', canonical: data.instagramUrl },
  ];

  linkChecks.forEach(({ marker, canonical }) => {
    const pattern = new RegExp(`<a\\b(?=[^>]*${escapeRegExp(marker)})[^>]*\\shref="([^"]*)"`, "g");

    for (const match of content.matchAll(pattern)) {
      if (match[1] !== canonical) {
        report(file, `${marker} fallback href does not match canonical value`);
      }
    }
  });
};

const ensureNoUnmarkedCanonicalData = (file, cleanContent, data) => {
  const checks = [
    {
      label: "WhatsApp URL",
      value: data.whatsappUrl,
    },
    {
      label: "Google Maps URL",
      value: data.mapsUrl.replaceAll("&", "&amp;"),
    },
    {
      label: "Instagram URL",
      value: data.instagramUrl,
    },
    {
      label: "WhatsApp display",
      value: data.whatsappDisplay,
    },
    {
      label: "short address",
      value: data.shortAddress,
    },
    {
      label: "full address",
      value: data.fullAddress,
    },
    {
      label: "rating",
      value: data.googleRating,
    },
  ];

  checks.forEach(({ label, value }) => {
    if (cleanContent.includes(value)) {
      report(file, `${label} appears outside approved data-site placeholders`);
    }
  });
};

const ensureNoKnownVariants = (file, cleanContent) => {
  const variants = [
    "011 2331-6141",
    "1123316141",
    "5491123316141",
    "https://wa.me/5491123316141",
    "C. 619 3900, B1893GXJ El Pato.",
    "C. 619 3900, B1893GXJ El Pato, Provincia de Buenos Aires, Argentina.",
    "5.0 en Google Maps (14 opiniones)",
  ];

  variants.forEach((variant) => {
    if (cleanContent.includes(variant)) {
      report(file, `known variant should be added to assets/site-data.js or removed: ${variant}`);
    }
  });
};

function escapeRegExp(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

const siteData = readSiteData();
walk(rootDir);

if (htmlFiles.length === 0) {
  errors.push("No HTML files found.");
}

htmlFiles.forEach((file) => {
  const content = fs.readFileSync(file, "utf8");
  const cleanContent = removeApprovedSiteDataContexts(content);

  ensureRequiredPlaceholders(file, content);
  ensureMarkedLinksUseCanonicalValues(file, content, siteData);
  ensureNoUnmarkedCanonicalData(file, cleanContent, siteData);
  ensureNoKnownVariants(file, cleanContent);
});

if (errors.length > 0) {
  console.error("Site data check failed:");
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

console.log(`Site data check passed for ${htmlFiles.length} HTML file(s).`);
