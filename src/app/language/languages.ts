export interface Language {
  language: string;
  isSelected: boolean;
}

export enum LanguageNames {
  ca = "Català",
  es = "Español",
  en = "English",
  de = "Deutsche",
}

export interface Traslation {
  languageSelector: string;
  listening: string;
  readyToListening: string;
  stop: string;
  reset: string;
  read: string;
}

interface Translations {
  [key: string]: Traslation;
}

export const translation: Translations = {
  ca: {
    languageSelector: "Selecciona el teu idioma",
    listening: "Escoltant.........",
    readyToListening: "Premeu per començar a grabar",
    stop: "Aturar",
    reset: "Esborrar",
    read: "Llegir text",
  },
  es: {
    languageSelector: "Selecciona tu idioma",
    listening: "Escuchando.........",
    readyToListening: "Clicka para comenzar a grabar",
    stop: "Detener",
    reset: "Borrar",
    read: "Leer texto",
  },
  en: {
    languageSelector: "Select your language",
    listening: "Listening.........",
    readyToListening: "Click to start listening",
    stop: "Stop",
    reset: "Reset",
    read: "Read",
  },
  de: {
    languageSelector: "Wähle deine Sprache",
    listening: "Hören.........",
    readyToListening: "Klicken Sie, um mit dem Zuhören zu beginnen",
    stop: "Festnahme",
    reset: "Löschen",
    read: "Text lesen",
  },
};
