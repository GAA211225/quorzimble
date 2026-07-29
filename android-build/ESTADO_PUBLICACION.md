# Estado de publicación — IronTrack 3D (versión de tienda)

Documento de control. Se actualiza conforme avanzamos.

## ✅ Hecho (2026-07-29)

### Contenido / legal
- [x] Clon de la app sin frases atribuidas a personas reales (`rutinas-store/`)
- [x] Quitados los vínculos a la dieta personal
- [x] Política de Privacidad: `rutinas-store/privacy.html`
- [x] Términos de Uso: `rutinas-store/terminos.html`
- [x] Enlaces a ambas visibles dentro de la app (pestaña Perfil)

### Empaquetado técnico
- [x] `applicationId` elegido (placeholder, cambiable antes de publicar):
      **`com.irontrack.app`**
- [x] Keystore de firma generado: `android-build/keystore/irontrack-release.jks`
      — contraseña en `android-build/keystore/LEEME_CONTRASENA.txt`
      **⚠️ MUEVE ESTOS DOS ARCHIVOS A UN LUGAR SEGURO (gestor de
      contraseñas / Drive privado). Si se pierden, no se pueden publicar
      actualizaciones futuras bajo el mismo listado.**
- [x] Huella SHA-256 extraída: `android-build/keystore/sha256-fingerprint.txt`
- [x] Repo raíz `GAA211225.github.io` creado y publicado, con
      `.well-known/assetlinks.json` en la raíz del dominio (requisito
      técnico para que Android confíe en que la app y la web son del
      mismo dueño — este archivo DEBE vivir en la raíz del dominio, no
      dentro de /quorzimble/)
- [ ] Descarga e instalación del Android SDK command-line tools — **en
      progreso** en la máquina (necesario para compilar con Bubblewrap)
- [ ] Generar el proyecto TWA con Bubblewrap (`bubblewrap init`) apuntando
      a `https://gaa211225.github.io/quorzimble/rutinas-store/manifest.json`
- [ ] Compilar un `.apk` de prueba (para instalar y probar en un Android
      real antes de subir a Play Store) y el `.aab` final firmado

### Ficha de Play Store (contenido listo para copiar/pegar)
- [x] Título, descripción corta y larga: `android-build/PLAY_STORE_LISTING.md`
- [x] Borrador de respuestas de Data Safety: `android-build/PLAY_STORE_DATA_SAFETY.md`
- [x] Borrador de cuestionario de clasificación de contenido: `android-build/PLAY_STORE_CONTENT_RATING.md`
- [x] Gráfico de portada 1024×500: `android-build/feature-graphic-1024x500.png`
- [ ] Capturas de pantalla del teléfono — **no las pude generar en este
      entorno** (limitación técnica de la sesión al tomar screenshots del
      navegador). Hay que tomarlas manualmente desde un teléfono o
      emulador una vez que instales la app.

## ⏳ Pendiente — requiere tu cuenta, tu decisión o tu pago (no lo hago yo)

1. **Nombre final de la app.** "IronTrack 3D" es un placeholder — revisa
   que no choque con otra marca registrada antes de decidirlo en serio.
   Si cambia, hay que actualizar `applicationId`, manifest, textos e
   íconos (mejor decidirlo antes de compilar el `.aab` final).
2. **Cuenta de desarrollador de Google Play** — $25 USD, pago único, con
   tu identidad/tarjeta.
3. **Correo de soporte público** para la ficha (lo dejé como placeholder
   en privacy.html / terminos.html / PLAY_STORE_LISTING.md).
4. **Subir el `.aab` firmado a Play Console**, llenar los formularios
   con el contenido que ya preparé, y completar la prueba cerrada de
   20 testers / 14 días que exige Google a cuentas nuevas.
5. **Google Play Billing** (si vas a cobrar por una versión Pro) — esto
   es código adicional que se conecta a productos configurados en Play
   Console; no se puede preparar del todo sin que exista la ficha en
   Play Console primero.
6. **Sync en la nube** (debilidad pendiente, no bloqueante para publicar
   pero sí recomendable antes de cobrar) — necesitaría una cuenta de
   backend (ej. Supabase) que requiere que tú la crees.

## Dónde está cada cosa
- App de tienda: `quorzimble/rutinas-store/`
- Todo lo de empaquetado y documentos: `quorzimble/android-build/`
- Repo de verificación de dominio: `GAA211225/GAA211225.github.io`
  (visible en `Desktop/gaa211225-root-site/` localmente)
