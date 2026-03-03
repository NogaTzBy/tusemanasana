-- Migración: Agregar estado 'pendiente' al flujo de suscripción
-- Ejecutar en el Editor SQL del Dashboard de Supabase

-- Agregar 'pendiente' al enum de estado_suscripcion
ALTER TYPE public.estado_suscripcion ADD VALUE IF NOT EXISTS 'pendiente';

-- Cambiar el DEFAULT del campo para que nuevos usuarios empiecen en 'pendiente'
ALTER TABLE public.usuarios ALTER COLUMN estado_suscripcion SET DEFAULT 'pendiente';

-- Actualizar el trigger para que cree usuarios con estado 'pendiente'
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.usuarios (id, nombre, email, plan, estado_suscripcion, fecha_inicio_trial)
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data->>'full_name', ''),
    new.email,
    CASE
      WHEN new.raw_user_meta_data->>'plan' IS NOT NULL
      THEN CAST(new.raw_user_meta_data->>'plan' AS public.plan_suscripcion)
      ELSE NULL
    END,
    'pendiente',
    NULL  -- No hay trial hasta que Shopify lo confirme
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
