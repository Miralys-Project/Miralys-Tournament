import { fileURLToPath } from 'url';
import { Instance } from './structures/Instance.js';
import path from 'node:path';
import i18next from 'i18next';
import Backend from 'i18next-fs-backend';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

await i18next.use(Backend).init({
  lng: 'en', // langue par défaut
  fallbackLng: 'en',
  backend: {
    loadPath: path.join(__dirname, '../locales/{{lng}}/translation.json'),
  },
  interpolation: {
    escapeValue: false, // pour éviter d’échapper les variables dans Discord
  },
  preload: ['en', 'fr'],
});

const client = new Instance();

client.start();
