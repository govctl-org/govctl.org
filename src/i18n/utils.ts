import { ui, defaultLang, type Lang, type TranslationKey } from "./ui";

/**
 * Get the language from a URL path
 */
export function getLangFromUrl(url: URL): Lang {
  const [, lang] = url.pathname.split("/");
  if (lang in ui) return lang as Lang;
  return defaultLang;
}

/**
 * Get a translation function for a specific language
 */
export function useTranslations(lang: Lang) {
  return function t(key: TranslationKey): string {
    return ui[lang][key] || ui[defaultLang][key];
  };
}

/**
 * Get the translated path for a given URL and target language
 */
export function getLocalizedPath(url: URL, targetLang: Lang): string {
  const currentLang = getLangFromUrl(url);
  let path = url.pathname;

  // Remove current language prefix if present
  if (currentLang !== defaultLang) {
    path = path.replace(`/${currentLang}`, "") || "/";
  }

  // Add target language prefix if not default
  if (targetLang !== defaultLang) {
    path = `/${targetLang}${path}`;
  }

  return path;
}

/**
 * Get alternate language URLs for hreflang tags
 */
export function getAlternateUrls(
  url: URL,
  baseUrl: string,
): { lang: Lang; url: string }[] {
  return (["en", "zh"] as Lang[]).map((lang) => ({
    lang,
    url: `${baseUrl}${getLocalizedPath(url, lang)}`,
  }));
}
