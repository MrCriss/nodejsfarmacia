# 🔒 Guía de Seguridad - RLS, CORS y Security Headers

## Descripción General

Este documento describe cómo hemos configurado la seguridad en tu aplicación React de Farmacias Bonita usando:
- **RLS (Row Level Security)**: Reglas de Firestore
- **CORS (Cross-Origin Resource Sharing)**: Control de acceso
- **Security Headers**: Encabezados HTTP de seguridad

---

## 1. SECURITY HEADERS 🛡️

Los security headers se han configurado en dos lugares:

### 1.1 Firebase Hosting (`firebase.json`)

Los siguientes headers se sirven automáticamente para todas las páginas:

```
X-Content-Type-Options: nosniff
└─ Previene que el navegador interprete archivos de forma diferente a su tipo MIME

X-Frame-Options: DENY
└─ Impide que la página se cargue en iframes (previene clickjacking)

X-XSS-Protection: 1; mode=block
└─ Protección adicional contra ataques XSS

Referrer-Policy: strict-origin-when-cross-origin
└─ Controla qué información de referencia se envía

Permissions-Policy: geolocation=(), microphone=(), camera=()
└─ Deniega permisos de geolocalización, micrófono y cámara
```

### 1.2 Content-Security-Policy (CSP)

Configurado en `firebase.json` para controlar qué recursos pueden cargarse:

```
default-src 'self'
    └─ Por defecto, solo recursos del mismo origen

script-src 'self' https://cdn.tailwindcss.com https://fonts.googleapis.com
    └─ Scripts permitidos de fuentes específicas

style-src 'self' 'unsafe-inline' https://fonts.googleapis.com
    └─ Estilos de fuentes confiables (unsafe-inline para Tailwind)

img-src 'self' data: https:
    └─ Imágenes del mismo origen o HTTPS

connect-src 'self' https://*.firebaseio.com
    └─ Solo conexiones a Firebase
```

---

## 2. CORS (Cross-Origin Resource Sharing) 🌍

### 2.1 Configuración en Vite (`vite.config.js`)

```javascript
server: {
  cors: {
    origin: [
      'http://localhost:5173',        // Desarrollo local
      'http://localhost:3000',        // Servidor alternativo
      'https://farmacia-react.web.app' // Producción
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }
}
```

### 2.2 Agregar más orígenes

Si necesitas agregar más orígenes permitidos:

```javascript
// En vite.config.js
origin: [
  'http://localhost:5173',
  'https://farmacia-react.web.app',
  'https://tu-nuevo-dominio.com' // Agregar aquí
]
```

### 2.3 En tiempo de ejecución

Los orígenes también se pueden controlar desde variables de entorno:

```bash
# En .env
VITE_ALLOWED_ORIGINS=http://localhost:5173,https://farmacia-react.web.app
```

Usar en código:
```javascript
import { getAllowedOrigins } from '@/utils/security';

const origins = getAllowedOrigins();
```

---

## 3. RLS (Row Level Security) en Firestore 🔐

### 3.1 Archivo de reglas (`firestore.rules`)

Las reglas están organizadas por colecciones:

#### **Colección: `users`**

```javascript
// ✅ LEER: Solo tú mismo o un admin
match /users/{userId} {
  allow read: if isOwner(userId) || isAdmin();
  
  // ✅ CREAR: Tu propio documento
  allow create: if isOwner(userId) && ...;
  
  // ✅ ACTUALIZAR: Solo tu perfil
  allow update: if isOwner(userId) && ...;
  
  // ✅ ELIMINAR: Solo admins
  allow delete: if isAdmin();
}
```

#### **Colección: `products`**

```javascript
// ✅ LEER: Todos (público)
match /products/{productId} {
  allow read: if true;
  
  // ✅ CREAR/ACTUALIZAR/ELIMINAR: Solo admins
  allow create, update, delete: if isAdmin();
}
```

#### **Colección: `settings`**

```javascript
// ✅ Solo admins pueden leer y escribir
match /settings/{document=**} {
  allow read, write: if isAdmin();
}
```

### 3.2 Funciones de seguridad incluidas

```javascript
// Verificar si está autenticado
function isAuthenticated() {
  return request.auth != null;
}

// Verificar si es admin
function isAdmin() {
  return isAuthenticated() && 
         get(/databases/{database}/documents/users/{uid}).data.role == 'admin';
}

// Verificar si es propietario
function isOwner(userId) {
  return isAuthenticated() && request.auth.uid == userId;
}
```

### 3.3 Implementar RLS en Firebase

1. **Ve a Firebase Console:**
   ```
   https://console.firebase.google.com → Tu proyecto → Firestore Database
   ```

2. **Accede a las Reglas:**
   ```
   Firestore Database → Reglas (tab)
   ```

3. **Copia el contenido de `firestore.rules`:**
   ```bash
   Reemplaza todo el contenido con el archivo firestore.rules
   ```

4. **Publica las reglas:**
   ```bash
   # Terminal
   firebase deploy --only firestore:rules
   ```

---

## 4. Configuración de Variables de Entorno 🔑

### 4.1 Crear archivo `.env.local`

Copia `.env.example` a `.env.local`:

```bash
cp .env.example .env.local
```

### 4.2 Rellenar con tus credenciales

1. Ve a [Firebase Console](https://console.firebase.google.com)
2. Selecciona tu proyecto
3. Ve a Configuración → Configuración del proyecto
4. En "Apps", busca tu app web
5. Copia las credenciales:

```env
VITE_FIREBASE_API_KEY=AIzaSyDxxxxxxxxxxxxxxxxxx
VITE_FIREBASE_AUTH_DOMAIN=farmacia-react.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=farmacia-react
VITE_FIREBASE_STORAGE_BUCKET=farmacia-react.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
VITE_FIREBASE_APP_ID=1:123456789012:web:abcdef1234567890abcdef
```

### 4.3 ⚠️ IMPORTANTE: No commitar `.env.local`

Asegúrate de que `.env.local` esté en `.gitignore`:

```bash
# .gitignore
.env.local
.env.*.local
```

---

## 5. Utilidades de Seguridad en el Frontend 💪

### 5.1 Importar utilidades (`src/utils/security.js`)

```javascript
import {
  sanitizeText,
  validateEmail,
  validatePassword,
  validateURL,
  cleanObject,
  validateCORSOrigin
} from '@/utils/security';
```

### 5.2 Ejemplos de uso

```javascript
// Sanitizar texto para evitar XSS
const safeText = sanitizeText(userInput);

// Validar email
const isValidEmail = validateEmail('usuario@ejemplo.com');

// Validar contraseña
const { isValid, errors } = validatePassword('MiContraseña123!');
if (!isValid) {
  console.log('Errores:', errors);
}

// Limpiar objeto (solo propiedades permitidas)
const userData = cleanObject(input, ['name', 'email', 'phone']);
```

---

## 6. Instalar Dependencias 📦

```bash
npm install
# O si usas yarn
yarn install
```

Esto instalará:
- `firebase`: SDK oficial de Firebase
- `firebase-tools`: CLI para desplegar

---

## 7. Desarrollo Local 🚀

### 7.1 Iniciar servidor de desarrollo

```bash
npm run dev
```

Accede a: http://localhost:5173

### 7.2 Usar emuladores de Firebase (Opcional)

Si quieres probar Firestore localmente:

```bash
# Instalar firebase-cli globalmente
npm install -g firebase-tools

# Iniciar emuladores
firebase emulators:start
```

En `src/config/firebase.js`, descomenta:
```javascript
connectAuthEmulator(auth, 'http://localhost:9099', { disableWarnings: true });
connectFirestoreEmulator(db, 'localhost', 8080);
```

---

## 8. Build y Deploy 🌐

### 8.1 Build para producción

```bash
npm run build
```

Genera optimizaciones:
- Minificación
- Code splitting
- No sourcemaps en producción

### 8.2 Deploy a Firebase Hosting

```bash
npm run deploy
# O manualmente
firebase deploy
```

---

## 9. Checklist de Seguridad ✅

Antes de llevar a producción:

- [ ] Revisar y completar `.env.local` con credenciales reales
- [ ] Asegurar que `.env.local` está en `.gitignore`
- [ ] Implementar reglas Firestore (`firebase deploy --only firestore:rules`)
- [ ] Validar que CSP permite todos tus recursos
- [ ] Probar CORS con herramientas como Postman
- [ ] Revisar security headers en navegador (DevTools → Network)
- [ ] Ejecutar `npm run lint` para validar código
- [ ] Hacer build y probar localmente con `npm run preview`
- [ ] Usar conexiones HTTPS en producción
- [ ] Habilitar 2FA en cuenta Firebase

---

## 10. Monitoreo y Mantenimiento 🔍

### 10.1 Revisar Security Headers

En el navegador:
```
DevTools → Network → Seleccionar archivo HTML → Response Headers
```

Debería ver:
```
x-content-type-options: nosniff
x-frame-options: DENY
content-security-policy: ...
```

### 10.2 Verificar permisos de Firestore

En Firebase Console:
```
Firestore Database → Reglas → Probar reglas
```

### 10.3 Revisar logs

```bash
# Ver logs de deployment
firebase functions:log
```

---

## 11. Recursos Adicionales 📚

- [Firebase Security](https://firebase.google.com/docs/rules)
- [OWASP Security Headers](https://owasp.org/www-project-secure-headers/)
- [MDN CORS](https://developer.mozilla.org/es/docs/Web/HTTP/CORS)
- [CSP Documentation](https://developer.mozilla.org/es/docs/Web/HTTP/CSP)
- [Vite Security](https://vite.dev/guide/ssr.html#security-considerations)

---

## 12. Soporte y Problemas Comunes 🆘

### "CORS policy: No 'Access-Control-Allow-Origin' header"

**Solución:** Añade tu origen en `vite.config.js` → `server.cors.origin`

### "Firestore permission denied on read()"

**Solución:** Verifica tus reglas en `firestore.rules` y asegúrate de que el usuario está autenticado

### "CSP blocked resource"

**Solución:** Actualiza `firebase.json` → `headers` → CSP `connect-src`, `script-src`, etc.

### "Firebase credentials not loading"

**Solución:** Verifica que `.env.local` está correctamente configurado y reinicia el servidor

---

**¡Tu aplicación está lista para producción! 🎉**
