# Esquema de Base de Datos relacional (Supabase)

## `usuarios`
- `id` (UUID, PK)
- `nombre` (Text)
- `email` (Text, Unique)
- `rol` (Enum: admin, usuario)
- `estado_suscripcion` (Enum: trial, activa, cancelada, vencida)
- `plan` (Enum: mensual, anual)
- `fecha_inicio_trial` (Timestamp)
- `fecha_proximo_cobro` (Timestamp)
- `fecha_vencimiento` (Timestamp)
- `created_at` (Timestamp)

## `perfiles_nutricionales`
- `id` (UUID, PK)
- `usuario_id` (UUID, FK -> usuarios)
- `objetivo` (Text)
- `tiempo_disponible` (Text)
- `tipo_alimentacion` (Text)
- `alimentos_excluidos` (Array of Text)
- `cantidad_personas` (Text)
- `frecuencia_recetas` (Text)

## `recetas`
- `id` (UUID, PK)
- `nombre` (Text)
- `descripcion_corta` (Text)
- `ingredientes` (JSONB - Array con cantidad y unidad)
- `pasos_preparacion` (JSONB)
- `tiempo_preparacion_min` (Integer)
- `categoria` (Enum: desayuno, almuerzo, cena)
- `tags` (Array of Text)
- `foto_url` (Text)
- `porciones_base` (Integer)
- `calorias_aprox` (Integer)

## `planes_semanales`
- `id` (UUID, PK)
- `usuario_id` (UUID, FK -> usuarios)
- `semana_inicio` (Date)
- `dias` (JSONB - Array de 7 días con refs a Recetas para desayuno, almuerzo y cena)
- `generado_por_ia` (Boolean)
- `created_at` (Timestamp)

## `listas_compras`
- `id` (UUID, PK)
- `usuario_id` (UUID, FK -> usuarios)
- `plan_semanal_id` (UUID, FK -> planes_semanales)
- `items_categoria` (JSONB - Agrupados por verduras, carnes, etc.)
- `created_at` (Timestamp)

## Supabase Auth & Stripe
- Se delegan credenciales y tokens a Supabase Auth.
- Pagos se sincronizarán mediante webhooks contra la tabla de `usuarios` usando el `estado_suscripcion`.
