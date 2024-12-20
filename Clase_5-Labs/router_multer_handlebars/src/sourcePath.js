// Comment: Este archivo se encarga de generar la ruta absoluta donde se ejecuta el proceso de node para luego reutilizarlo en otros archivos.

import { dirname } from "path";
import { fileURLToPath } from "url";

export const __dirname = dirname(fileURLToPath(import.meta.url));

export default __dirname;
