-- Esquema Inicial para Tu Semana Sana
-- Ejecutar en el Editor SQL del Dashboard de Supabase

-- Tipos Enum
CREATE TYPE public.rol_usuario AS ENUM ('admin', 'usuario');
CREATE TYPE public.estado_suscripcion AS ENUM ('trial', 'activa', 'cancelada', 'vencida');
CREATE TYPE public.plan_suscripcion AS ENUM ('mensual', 'anual');
CREATE TYPE public.categoria_comida AS ENUM ('desayuno', 'almuerzo', 'cena');

-- Tabla de Usuarios Extendida (extiende auth.users de Supabase)
CREATE TABLE public.usuarios (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  nombre TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  rol public.rol_usuario DEFAULT 'usuario',
  estado_suscripcion public.estado_suscripcion DEFAULT 'trial',
  plan public.plan_suscripcion,
  fecha_inicio_trial TIMESTAMP WITH TIME ZONE,
  fecha_proximo_cobro TIMESTAMP WITH TIME ZONE,
  fecha_vencimiento TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Trigger para automatizar la inserción de usuario cuando se registra
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.usuarios (id, nombre, email, plan, fecha_inicio_trial)
  VALUES (
    new.id, 
    new.raw_user_meta_data->>'full_name', 
    new.email,
    CAST(COALESCE(new.raw_user_meta_data->>'plan', 'anual') AS public.plan_suscripcion),
    timezone('utc'::text, now())
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Perfiles Nutricionales
CREATE TABLE public.perfiles_nutricionales (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  usuario_id UUID REFERENCES public.usuarios(id) ON DELETE CASCADE NOT NULL,
  objetivo TEXT,
  tiempo_disponible TEXT,
  tipo_alimentacion TEXT,
  alimentos_excluidos TEXT[],
  cantidad_personas TEXT,
  frecuencia_recetas TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  CONSTRAINT unique_perfil_usuario UNIQUE(usuario_id)
);

-- Recetas
CREATE TABLE public.recetas (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nombre TEXT NOT NULL,
  descripcion_corta TEXT,
  ingredientes JSONB NOT NULL, -- Ej: [{"nombre": "Pollo", "cantidad": 200, "unidad": "gr"}]
  pasos_preparacion JSONB NOT NULL,
  tiempo_preparacion_min INTEGER NOT NULL,
  categoria public.categoria_comida NOT NULL,
  tags TEXT[],
  foto_url TEXT,
  porciones_base INTEGER DEFAULT 1,
  calorias_aprox INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Planes Semanales
CREATE TABLE public.planes_semanales (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  usuario_id UUID REFERENCES public.usuarios(id) ON DELETE CASCADE NOT NULL,
  semana_inicio DATE NOT NULL,
  dias JSONB NOT NULL, -- Array de 7 días con las comidas
  generado_por_ia BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Listas de Compras
CREATE TABLE public.listas_compras (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  usuario_id UUID REFERENCES public.usuarios(id) ON DELETE CASCADE NOT NULL,
  plan_semanal_id UUID REFERENCES public.planes_semanales(id) ON DELETE CASCADE NOT NULL,
  items_categoria JSONB NOT NULL, -- Agrupados por categorías
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Habilitar RLS (Row Level Security)
ALTER TABLE public.usuarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.perfiles_nutricionales ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.recetas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.planes_semanales ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.listas_compras ENABLE ROW LEVEL SECURITY;

-- Políticas Básicas de Seguridad
CREATE POLICY "Usuarios pueden ver su propio perfil" ON public.usuarios FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Admins pueden ver todo" ON public.usuarios FOR SELECT USING (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Usuarios pueden ver su perfil nutricional" ON public.perfiles_nutricionales FOR SELECT USING (auth.uid() = usuario_id);
CREATE POLICY "Usuarios pueden actualizar su perfil nutricional" ON public.perfiles_nutricionales FOR UPDATE USING (auth.uid() = usuario_id);
CREATE POLICY "Usuarios pueden insertar su perfil nutricional" ON public.perfiles_nutricionales FOR INSERT WITH CHECK (auth.uid() = usuario_id);

CREATE POLICY "Todas las recetas son públicas para usuarios autenticados" ON public.recetas FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Usuarios pueden ver sus planes" ON public.planes_semanales FOR SELECT USING (auth.uid() = usuario_id);
CREATE POLICY "Usuarios pueden insertar sus planes" ON public.planes_semanales FOR INSERT WITH CHECK (auth.uid() = usuario_id);

CREATE POLICY "Usuarios pueden ver sus listas de compras" ON public.listas_compras FOR SELECT USING (auth.uid() = usuario_id);
CREATE POLICY "Usuarios pueden insertar sus listas" ON public.listas_compras FOR INSERT WITH CHECK (auth.uid() = usuario_id);
