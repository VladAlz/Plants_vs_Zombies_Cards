# 🌻 Garden Dev-Fare: Sticker Shop Edition

Este es un prototipo interactivo inspirado en la estética de **Plants vs. Zombies: Garden Warfare**. Es una plataforma para presentar equipos de desarrollo de una manera divertida y gamificada.

## 🛠️ Cómo ejecutar el proyecto en tu computadora (Local)

Si descargaste el archivo .zip, sigue estos pasos para verlo funcionar:

### 1. Requisitos Previos
*   **Node.js**: Debes tener instalado Node.js (versión 18 o superior). Puedes descargarlo en [nodejs.org](https://nodejs.org/).
*   **Terminal**: Abre una terminal (CMD en Windows, Terminal en Mac/Linux) dentro de la carpeta descomprimida.

### 2. Instalación de Dependencias
Ejecuta el siguiente comando para instalar todo lo necesario:
```bash
npm install
```

### 3. Configuración de IA (Opcional)
Si deseas que las funciones de IA funcionen, crea un archivo llamado `.env.local` en la raíz y añade tu llave de Google Gemini:
```env
GOOGLE_GENAI_API_KEY=tu_api_key_aqui
```

### 4. Iniciar el Servidor de Desarrollo
Para ver la web en tu navegador, ejecuta:
```bash
npm run dev
```
Luego abre [http://localhost:3000](http://localhost:3000) en tu navegador.

---

## 🚀 Cómo subir tus cambios a GitHub (Comandos de Terminal)

Si recibes el error "rejected (non-fast-forward)", usa este comando especial para forzar la subida:

1. **Vincular el repositorio**:
   ```bash
   git remote add origin https://github.com/VladAlz/Plants_vs_Zombies_Cards.git
   ```

2. **Preparar y Guardar**:
   ```bash
   git add .
   git commit -m "feat: interfaz de sobres estilo Garden Warfare"
   ```

3. **Subir a GitHub (Forzado)**:
   ```bash
   git push -u origin main --force
   ```

---

## 🏗️ Stack Tecnológico
- **Framework**: Next.js 15 (App Router)
- **Estilos**: Tailwind CSS
- **Componentes**: Shadcn/UI & Lucide Icons
- **IA**: Google Genkit (Gemini 2.5 Flash)

---
*© 2024 Garden Dev-Fare Prototyper*
