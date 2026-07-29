# Data Safety (Seguridad de los datos) — borrador de respuestas

> Esto se llena dentro de Play Console (Política → Seguridad de los datos).
> Estas son las respuestas correctas dado cómo está construida la app hoy:
> todo el almacenamiento es local (localStorage del WebView), no hay
> backend, no hay SDKs de analítica ni publicidad.

## ¿La app recopila o comparte alguno de los tipos de datos de usuario?
**No.**

Si Play Console obliga a marcar categorías individuales, la respuesta en
cada una es "No se recopila":
- Ubicación: No
- Información personal (nombre, correo, etc.): No
- Salud y fitness (peso, ejercicios): Se **almacena**, pero solo
  localmente en el dispositivo — nunca se transmite fuera de él. Si la
  categoría de Play distingue "recopilado" (enviado a un servidor) de
  "solo local", marcar que NO se recopila/transmite.
- Mensajes: No
- Fotos y videos: No
- Archivos y documentos: El usuario puede exportar un archivo de respaldo
  manualmente, pero es una acción explícita del usuario hacia su propio
  almacenamiento (no automática ni hacia nuestros servidores).
- Actividad de la app / analítica: No (no hay Firebase Analytics, Google
  Analytics, ni SDK de terceros integrado)
- Identificadores del dispositivo: No

## ¿Todos los datos de usuario están cifrados en tránsito?
No aplica — no hay tránsito de datos porque no hay red implicada en el
guardado. (No marcar "No" de forma que implique riesgo; usar la opción de
Play que indica que no se transmiten datos, si está disponible.)

## ¿El usuario puede solicitar que se borren sus datos?
Sí — todo se borra desinstalando la app o limpiando el almacenamiento de
la app desde los ajustes del sistema operativo. No es necesario un canal
de solicitud porque el desarrollador nunca tiene copia de los datos.

## ¿La app cumple con la Familia de Políticas de Datos de Play?
Sí, aplica declarar cumplimiento ya que no hay recopilación de datos.

---

**Nota para cuando se agregue sync en la nube (pendiente, ver lista de
mejoras):** si en el futuro se integra un backend (ej. Supabase/Firebase)
para respaldo automático, este formulario debe actualizarse — en ese
momento SÍ habría datos de salud/fitness transmitidos a un servidor y
las respuestas de arriba dejarían de ser correctas.
