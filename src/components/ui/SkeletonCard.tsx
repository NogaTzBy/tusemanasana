export default function SkeletonCard() {
  return (
    <div className="rounded-2xl overflow-hidden shadow-card bg-white dark:bg-dark-surface animate-pulse">
      {/* Imagen simulada */}
      <div className="aspect-[4/3] bg-gray-200 dark:bg-dark-border w-full" />

      {/* Contenido */}
      <div className="p-4 space-y-3">
        {/* Badge de categoría */}
        <div className="h-5 w-20 bg-gray-200 dark:bg-dark-border rounded-full" />

        {/* Nombre de receta */}
        <div className="space-y-2">
          <div className="h-5 bg-gray-200 dark:bg-dark-border rounded-lg w-full" />
          <div className="h-5 bg-gray-200 dark:bg-dark-border rounded-lg w-3/4" />
        </div>

        {/* Fila tiempo y calorías */}
        <div className="flex gap-4 pt-1">
          <div className="h-4 w-16 bg-gray-200 dark:bg-dark-border rounded-md" />
          <div className="h-4 w-16 bg-gray-200 dark:bg-dark-border rounded-md" />
        </div>
      </div>
    </div>
  )
}
