//theme-handler.tsx
"use client";

export default function DarkThemeHandler() {
  const codeToRunOnClient = `
    (function() {
      try {
        const stored = localStorage.getItem("themeMode");
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        const theme = stored || (prefersDark ? "dark" : "light");
        document.documentElement.classList.add(theme);
        document.documentElement.style.colorScheme = theme;
      } catch (e) {}
    })();
  `;

  return (
    <script
      dangerouslySetInnerHTML={{ __html: codeToRunOnClient }}
      id="dark-theme-handler"
    />
  );
}
