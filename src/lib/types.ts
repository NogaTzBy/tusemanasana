export type EstadoSuscripcion = 'trial' | 'activa' | 'vencida' | 'cancelada'
export type PlanSuscripcion = 'mensual' | 'anual'
export type CategoriaComida = 'desayuno' | 'almuerzo' | 'cena'

export interface Ingrediente {
  nombre: string
  cantidad: number
  unidad: string
}

export interface Receta {
  id: string
  nombre: string
  descripcion_corta: string
  ingredientes: Ingrediente[]
  pasos_preparacion: string[]
  tiempo_preparacion_min: number
  categoria: CategoriaComida
  tags: string[]
  foto_url: string
  porciones_base: number
  calorias_aprox: number
}

export interface DiaComidas {
  desayuno: Receta | null
  almuerzo: Receta | null
  cena: Receta | null
}

export interface PlanSemanal {
  id: string
  usuario_id: string
  semana_inicio: string // ISO date
  dias: DiaComidas[] // Array de 7 elementos
  generado_por_ia: boolean
}

export interface PerfilNutricional {
  objetivo: string
  tiempo_disponible: string
  tipo_alimentacion: string
  alimentos_excluidos: string[]
  cantidad_personas: string
  frecuencia_recetas: string
}

export interface Usuario {
  id: string
  nombre: string
  email: string
  rol: 'admin' | 'usuario'
  estado_suscripcion: EstadoSuscripcion
  plan: PlanSuscripcion | null
  fecha_inicio_trial: string | null
  fecha_proximo_cobro: string | null
}

export interface ItemCompra {
  nombre: string
  cantidad: number
  unidad: string
}

export interface ListaComprasPorCategoria {
  verduras: ItemCompra[]
  carnes: ItemCompra[]
  lacteos: ItemCompra[]
  cereales: ItemCompra[]
  otros: ItemCompra[]
}
