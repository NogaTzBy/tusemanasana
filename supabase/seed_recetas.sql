-- =============================================================================
-- Seed de Recetas: Tu Semana Sana
-- Comida argentina/latinoamericana saludable
-- Puede ejecutarse múltiples veces gracias a ON CONFLICT DO NOTHING
-- =============================================================================

INSERT INTO public.recetas
  (nombre, descripcion_corta, ingredientes, pasos_preparacion, tiempo_preparacion_min, categoria, tags, foto_url, porciones_base, calorias_aprox)
VALUES

-- ─────────────────────────────────────────────────────────────────────────────
-- DESAYUNOS (3)
-- ─────────────────────────────────────────────────────────────────────────────

(
  'Tostadas con palta y huevo pochado',
  'Tostadas integrales con palta cremosa y huevo pochado, perfectas para un desayuno nutritivo y saciante.',
  '[
    {"nombre": "Pan integral", "cantidad": 2, "unidad": "rebanadas"},
    {"nombre": "Palta", "cantidad": 1, "unidad": "unidad"},
    {"nombre": "Huevo", "cantidad": 2, "unidad": "unidades"},
    {"nombre": "Limón", "cantidad": 0.5, "unidad": "unidad"},
    {"nombre": "Sal", "cantidad": 1, "unidad": "pizca"},
    {"nombre": "Pimienta negra", "cantidad": 1, "unidad": "pizca"},
    {"nombre": "Hojuelas de pimiento rojo", "cantidad": 1, "unidad": "pizca"}
  ]'::jsonb,
  '[
    "Tostar el pan integral hasta que esté dorado y crujiente.",
    "Partir la palta a la mitad, quitar el carozo y extraer la pulpa con una cuchara.",
    "Aplastar la palta con un tenedor, agregar el jugo de medio limón, sal y pimienta al gusto.",
    "Calentar agua en una cacerola pequeña hasta que esté a punto de hervir. Agregar un chorrito de vinagre.",
    "Romper cada huevo en un ramequín, hacer un remolino suave en el agua y deslizar el huevo. Cocinar 3 minutos.",
    "Untar la palta sobre las tostadas, colocar el huevo pochado encima.",
    "Decorar con hojuelas de pimiento rojo y servir de inmediato."
  ]'::jsonb,
  15,
  'desayuno',
  ARRAY['proteico', 'saludable', 'grasas buenas', 'vegetariano'],
  'https://images.unsplash.com/photo-1603046891744-1f9ba0688ed7?w=800&q=80',
  2,
  380
),

(
  'Bowl de avena con frutos rojos y miel',
  'Avena cremosa cocida en leche con arándanos, frutillas y un toque de miel, rica en fibra y antioxidantes.',
  '[
    {"nombre": "Avena arrollada", "cantidad": 80, "unidad": "gr"},
    {"nombre": "Leche", "cantidad": 250, "unidad": "ml"},
    {"nombre": "Frutillas", "cantidad": 100, "unidad": "gr"},
    {"nombre": "Arándanos", "cantidad": 50, "unidad": "gr"},
    {"nombre": "Miel", "cantidad": 1, "unidad": "cdas"},
    {"nombre": "Canela en polvo", "cantidad": 0.5, "unidad": "cdita"},
    {"nombre": "Semillas de chía", "cantidad": 1, "unidad": "cda"}
  ]'::jsonb,
  '[
    "Verter la leche en una cacerola pequeña y llevar a fuego medio.",
    "Agregar la avena y la canela. Revolver constantemente durante 5-7 minutos hasta obtener una consistencia cremosa.",
    "Lavar las frutillas y cortarlas a la mitad. Reservar junto con los arándanos.",
    "Volcar la avena en un bowl.",
    "Distribuir las frutillas y los arándanos por encima.",
    "Rociar con miel y espolvorear las semillas de chía.",
    "Servir inmediatamente."
  ]'::jsonb,
  12,
  'desayuno',
  ARRAY['alto en fibra', 'sin gluten', 'antioxidantes', 'vegetariano', 'energizante'],
  'https://images.unsplash.com/photo-1490567674504-f7d5f35e7223?w=800&q=80',
  2,
  320
),

(
  'Bowl de yogur con granola y frutas',
  'Bowl refrescante de yogur griego natural con granola casera, banana y kiwi para empezar el día con energía.',
  '[
    {"nombre": "Yogur griego natural", "cantidad": 200, "unidad": "gr"},
    {"nombre": "Granola", "cantidad": 50, "unidad": "gr"},
    {"nombre": "Banana", "cantidad": 1, "unidad": "unidad"},
    {"nombre": "Kiwi", "cantidad": 1, "unidad": "unidad"},
    {"nombre": "Miel", "cantidad": 1, "unidad": "cda"},
    {"nombre": "Nueces", "cantidad": 20, "unidad": "gr"}
  ]'::jsonb,
  '[
    "Pelar la banana y cortarla en rodajas. Pelar el kiwi y cortarlo en cubos.",
    "Verter el yogur griego en un bowl amplio.",
    "Distribuir la granola sobre el yogur.",
    "Colocar las frutas encima de manera decorativa.",
    "Agregar las nueces picadas groseramente.",
    "Rociar con miel y servir de inmediato."
  ]'::jsonb,
  10,
  'desayuno',
  ARRAY['proteico', 'probiótico', 'vegetariano', 'sin cocción', 'rápido'],
  'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&q=80',
  1,
  410
),

-- ─────────────────────────────────────────────────────────────────────────────
-- ALMUERZOS (4)
-- ─────────────────────────────────────────────────────────────────────────────

(
  'Pechuga de pollo con quinoa y verduras salteadas',
  'Pechuga de pollo grillada sobre cama de quinoa con mix de verduras, alto en proteínas y libre de gluten.',
  '[
    {"nombre": "Pechuga de pollo", "cantidad": 200, "unidad": "gr"},
    {"nombre": "Quinoa", "cantidad": 80, "unidad": "gr"},
    {"nombre": "Pimiento rojo", "cantidad": 1, "unidad": "unidad"},
    {"nombre": "Zucchini", "cantidad": 1, "unidad": "unidad"},
    {"nombre": "Brócoli", "cantidad": 150, "unidad": "gr"},
    {"nombre": "Ajo", "cantidad": 2, "unidad": "dientes"},
    {"nombre": "Aceite de oliva", "cantidad": 2, "unidad": "cdas"},
    {"nombre": "Jugo de limón", "cantidad": 1, "unidad": "cda"},
    {"nombre": "Sal y pimienta", "cantidad": 1, "unidad": "a gusto"}
  ]'::jsonb,
  '[
    "Enjuagar la quinoa bajo agua fría. Cocinar en el doble de agua con sal durante 15 minutos hasta que los granos abran.",
    "Sazonar la pechuga con sal, pimienta y jugo de limón. Dejar marinar 5 minutos.",
    "Calentar una sartén grill a fuego alto. Cocinar la pechuga 5-6 minutos por lado hasta que esté dorada y cocida.",
    "En otra sartén, calentar el aceite de oliva y saltear el ajo picado 1 minuto.",
    "Agregar el pimiento en tiras, el zucchini en medias lunas y el brócoli en ramilletes. Saltear 6-8 minutos a fuego fuerte.",
    "Cortar la pechuga en láminas. Servir sobre la quinoa y las verduras salteadas."
  ]'::jsonb,
  30,
  'almuerzo',
  ARRAY['sin gluten', 'alto en proteínas', 'fitness', 'sin lácteos'],
  'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80',
  2,
  480
),

(
  'Ensalada niçoise con atún',
  'Clásica ensalada francesa adaptada con atún al natural, papa, huevo duro, chauchas y aceitunas negras.',
  '[
    {"nombre": "Atún al natural", "cantidad": 160, "unidad": "gr"},
    {"nombre": "Huevo", "cantidad": 2, "unidad": "unidades"},
    {"nombre": "Papa", "cantidad": 2, "unidad": "unidades"},
    {"nombre": "Chauchas", "cantidad": 100, "unidad": "gr"},
    {"nombre": "Tomate cherry", "cantidad": 150, "unidad": "gr"},
    {"nombre": "Aceitunas negras", "cantidad": 50, "unidad": "gr"},
    {"nombre": "Lechuga mantecosa", "cantidad": 100, "unidad": "gr"},
    {"nombre": "Aceite de oliva", "cantidad": 2, "unidad": "cdas"},
    {"nombre": "Vinagre de vino blanco", "cantidad": 1, "unidad": "cda"},
    {"nombre": "Mostaza Dijon", "cantidad": 1, "unidad": "cdita"},
    {"nombre": "Sal y pimienta", "cantidad": 1, "unidad": "a gusto"}
  ]'::jsonb,
  '[
    "Cocer las papas con piel en agua salada durante 20 minutos. Enfriar, pelar y cortar en cuartos.",
    "Cocer los huevos en agua hirviendo 10 minutos. Enfriar en agua con hielo, pelar y cortar a la mitad.",
    "Blanquear las chauchas en agua hirviendo 3 minutos. Pasar a agua fría para mantener el color.",
    "Preparar el aderezo mezclando aceite, vinagre, mostaza, sal y pimienta.",
    "Disponer la lechuga en la base de cada plato. Distribuir las papas, huevos, chauchas, tomates cherry y aceitunas.",
    "Colocar el atún escurrido en el centro. Rociar con el aderezo y servir."
  ]'::jsonb,
  35,
  'almuerzo',
  ARRAY['sin gluten', 'omega 3', 'mediterráneo', 'equilibrado'],
  'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80',
  2,
  420
),

(
  'Arroz integral con lentejas y cebolla caramelizada',
  'Combinación clásica de oriente con proteína vegetal completa, hierro y fibra. Contundente y nutritivo.',
  '[
    {"nombre": "Arroz integral", "cantidad": 100, "unidad": "gr"},
    {"nombre": "Lentejas", "cantidad": 100, "unidad": "gr"},
    {"nombre": "Cebolla", "cantidad": 2, "unidad": "unidades"},
    {"nombre": "Ajo", "cantidad": 3, "unidad": "dientes"},
    {"nombre": "Comino", "cantidad": 1, "unidad": "cdita"},
    {"nombre": "Pimentón ahumado", "cantidad": 0.5, "unidad": "cdita"},
    {"nombre": "Aceite de oliva", "cantidad": 3, "unidad": "cdas"},
    {"nombre": "Caldo de verduras", "cantidad": 400, "unidad": "ml"},
    {"nombre": "Sal y pimienta", "cantidad": 1, "unidad": "a gusto"}
  ]'::jsonb,
  '[
    "Remojar las lentejas 30 minutos. Escurrir y reservar.",
    "Cocer el arroz integral en caldo de verduras durante 35-40 minutos tapado.",
    "Cortar las cebollas en pluma fina. Calentar el aceite en una sartén grande a fuego medio-bajo.",
    "Caramelizar las cebollas revolviendo cada tanto durante 25-30 minutos hasta que estén doradas y dulces.",
    "Agregar el ajo picado, comino y pimentón. Cocinar 2 minutos más.",
    "En otra cacerola, cocinar las lentejas en agua con sal 20 minutos hasta tiernas.",
    "Mezclar el arroz con las lentejas. Servir con la cebolla caramelizada por encima."
  ]'::jsonb,
  45,
  'almuerzo',
  ARRAY['vegano', 'sin gluten', 'alto en hierro', 'proteína vegetal', 'económico'],
  'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&q=80',
  2,
  450
),

(
  'Wok de vegetales con tofu firme',
  'Salteado oriental de verduras crujientes con tofu marinado en salsa de soja y jengibre, listo en 20 minutos.',
  '[
    {"nombre": "Tofu firme", "cantidad": 250, "unidad": "gr"},
    {"nombre": "Brócoli", "cantidad": 150, "unidad": "gr"},
    {"nombre": "Zanahoria", "cantidad": 2, "unidad": "unidades"},
    {"nombre": "Pimiento rojo", "cantidad": 1, "unidad": "unidad"},
    {"nombre": "Chaucha", "cantidad": 100, "unidad": "gr"},
    {"nombre": "Ajo", "cantidad": 2, "unidad": "dientes"},
    {"nombre": "Jengibre fresco", "cantidad": 10, "unidad": "gr"},
    {"nombre": "Salsa de soja", "cantidad": 3, "unidad": "cdas"},
    {"nombre": "Aceite de sésamo", "cantidad": 1, "unidad": "cda"},
    {"nombre": "Aceite vegetal", "cantidad": 2, "unidad": "cdas"},
    {"nombre": "Semillas de sésamo", "cantidad": 1, "unidad": "cda"}
  ]'::jsonb,
  '[
    "Escurrir y secar el tofu con papel absorbente. Cortarlo en cubos de 2 cm.",
    "Marinar el tofu en 2 cdas de salsa de soja y aceite de sésamo durante 10 minutos.",
    "Cortar todas las verduras: brócoli en ramilletes, zanahoria en bastones, pimiento en tiras, chauchas al sesgo.",
    "Calentar el aceite vegetal en wok o sartén grande a fuego muy alto.",
    "Freír el tofu escurrido hasta que esté dorado por todos lados, unos 5 minutos. Retirar y reservar.",
    "En el mismo wok, saltear el ajo y jengibre rallado 30 segundos. Agregar las verduras más duras (zanahoria) primero.",
    "Ir incorporando el resto de verduras en orden de dureza. Saltear a fuego máximo 4-5 minutos para mantener la textura.",
    "Volver el tofu al wok, agregar la salsa de soja restante. Mezclar 1 minuto.",
    "Servir con semillas de sésamo por encima."
  ]'::jsonb,
  25,
  'almuerzo',
  ARRAY['vegano', 'sin gluten', 'proteína vegetal', 'oriental', 'bajo en calorías'],
  'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800&q=80',
  2,
  360
),

-- ─────────────────────────────────────────────────────────────────────────────
-- CENAS (4)
-- ─────────────────────────────────────────────────────────────────────────────

(
  'Salmón al horno con espárragos y limón',
  'Filete de salmón jugoso horneado con espárragos frescos, ajo y limón. Listo en 25 minutos, rico en omega 3.',
  '[
    {"nombre": "Filete de salmón", "cantidad": 200, "unidad": "gr"},
    {"nombre": "Espárragos", "cantidad": 200, "unidad": "gr"},
    {"nombre": "Limón", "cantidad": 1, "unidad": "unidad"},
    {"nombre": "Ajo", "cantidad": 2, "unidad": "dientes"},
    {"nombre": "Aceite de oliva", "cantidad": 2, "unidad": "cdas"},
    {"nombre": "Eneldo fresco", "cantidad": 5, "unidad": "gr"},
    {"nombre": "Sal y pimienta", "cantidad": 1, "unidad": "a gusto"}
  ]'::jsonb,
  '[
    "Precalentar el horno a 200°C.",
    "Limpiar los espárragos retirando la parte dura del tallo.",
    "Disponer el salmón en el centro de una placa para horno y los espárragos a los costados.",
    "Rociar todo con aceite de oliva. Añadir el ajo laminado sobre el salmón.",
    "Exprimir el jugo de medio limón sobre el salmón. Colocar rodajas del limón restante sobre los espárragos.",
    "Condimentar con sal, pimienta y eneldo fresco.",
    "Hornear 18-20 minutos hasta que el salmón esté cocido pero jugoso en el interior.",
    "Servir directamente desde la placa."
  ]'::jsonb,
  25,
  'cena',
  ARRAY['sin gluten', 'omega 3', 'sin lácteos', 'keto', 'bajo en carbohidratos'],
  'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=800&q=80',
  2,
  390
),

(
  'Sopa de calabaza y jengibre',
  'Sopa cremosa y reconfortante de calabaza asada con jengibre, cúrcuma y leche de coco. Ideal para noches frías.',
  '[
    {"nombre": "Calabaza", "cantidad": 600, "unidad": "gr"},
    {"nombre": "Cebolla", "cantidad": 1, "unidad": "unidad"},
    {"nombre": "Jengibre fresco", "cantidad": 15, "unidad": "gr"},
    {"nombre": "Ajo", "cantidad": 2, "unidad": "dientes"},
    {"nombre": "Leche de coco", "cantidad": 200, "unidad": "ml"},
    {"nombre": "Caldo de verduras", "cantidad": 600, "unidad": "ml"},
    {"nombre": "Cúrcuma", "cantidad": 1, "unidad": "cdita"},
    {"nombre": "Aceite de oliva", "cantidad": 2, "unidad": "cdas"},
    {"nombre": "Sal y pimienta", "cantidad": 1, "unidad": "a gusto"},
    {"nombre": "Semillas de zapallo tostadas", "cantidad": 20, "unidad": "gr"}
  ]'::jsonb,
  '[
    "Precalentar el horno a 200°C. Cortar la calabaza en trozos grandes, rociar con aceite y hornear 25 minutos.",
    "En una olla grande, calentar el aceite y rehogar la cebolla picada hasta transparentar, 5 minutos.",
    "Añadir el ajo y el jengibre rallado. Cocinar 2 minutos más.",
    "Agregar la calabaza horneada, el caldo de verduras y la cúrcuma. Llevar a hervor y cocinar 10 minutos.",
    "Procesar con mixer hasta lograr una sopa lisa y cremosa.",
    "Incorporar la leche de coco, salpimentar y calentar 2-3 minutos sin hervir.",
    "Servir con semillas de zapallo tostadas y un hilo de leche de coco como decoración."
  ]'::jsonb,
  40,
  'cena',
  ARRAY['vegano', 'sin gluten', 'sin lácteos', 'antiinflamatorio', 'reconfortante'],
  'https://images.unsplash.com/photo-1547592180-85f173990554?w=800&q=80',
  3,
  280
),

(
  'Tortilla española de verduras',
  'Tortilla jugosa de huevo con papa, pimiento, espinaca y cebolla. Clásico reconvertido con más vegetales.',
  '[
    {"nombre": "Huevo", "cantidad": 4, "unidad": "unidades"},
    {"nombre": "Papa", "cantidad": 2, "unidad": "unidades"},
    {"nombre": "Espinaca", "cantidad": 80, "unidad": "gr"},
    {"nombre": "Pimiento rojo", "cantidad": 1, "unidad": "unidad"},
    {"nombre": "Cebolla", "cantidad": 1, "unidad": "unidad"},
    {"nombre": "Ajo", "cantidad": 1, "unidad": "diente"},
    {"nombre": "Aceite de oliva", "cantidad": 3, "unidad": "cdas"},
    {"nombre": "Sal y pimienta", "cantidad": 1, "unidad": "a gusto"}
  ]'::jsonb,
  '[
    "Pelar las papas y cortarlas en rodajas finas. Cortar la cebolla en pluma y el pimiento en tiras.",
    "Calentar 2 cdas de aceite en una sartén antiadherente de 22 cm. Pochar la papa, cebolla y pimiento a fuego medio-bajo durante 15 minutos, revolviendo suavemente.",
    "Agregar el ajo picado y la espinaca. Cocinar 2 minutos más hasta que se marchite.",
    "Batir los huevos con sal y pimienta en un bowl grande. Incorporar las verduras pochadas.",
    "Calentar 1 cda de aceite en la misma sartén. Verter la mezcla y cocinar a fuego bajo tapada 8-10 minutos.",
    "Dar vuelta la tortilla con la ayuda de un plato grande y deslizarla de vuelta a la sartén.",
    "Cocinar otros 5 minutos. Debe quedar jugosa por dentro. Servir tibia o a temperatura ambiente."
  ]'::jsonb,
  35,
  'cena',
  ARRAY['vegetariano', 'sin gluten', 'sin lácteos', 'económico', 'proteico'],
  'https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=800&q=80',
  3,
  340
),

(
  'Bowl de pollo al curry con arroz basmati',
  'Trozos de pollo en salsa de curry suave con leche de coco servidos sobre arroz basmati aromático.',
  '[
    {"nombre": "Pechuga de pollo", "cantidad": 300, "unidad": "gr"},
    {"nombre": "Arroz basmati", "cantidad": 100, "unidad": "gr"},
    {"nombre": "Leche de coco", "cantidad": 200, "unidad": "ml"},
    {"nombre": "Tomate", "cantidad": 2, "unidad": "unidades"},
    {"nombre": "Cebolla", "cantidad": 1, "unidad": "unidad"},
    {"nombre": "Ajo", "cantidad": 3, "unidad": "dientes"},
    {"nombre": "Jengibre fresco", "cantidad": 10, "unidad": "gr"},
    {"nombre": "Curry en polvo", "cantidad": 2, "unidad": "cditas"},
    {"nombre": "Cúrcuma", "cantidad": 0.5, "unidad": "cdita"},
    {"nombre": "Aceite de coco", "cantidad": 1, "unidad": "cda"},
    {"nombre": "Cilantro fresco", "cantidad": 10, "unidad": "gr"},
    {"nombre": "Sal", "cantidad": 1, "unidad": "a gusto"}
  ]'::jsonb,
  '[
    "Cocinar el arroz basmati según las instrucciones del paquete. Reservar tapado.",
    "Cortar el pollo en cubos medianos. Salpimentar.",
    "Calentar el aceite de coco en una sartén profunda o wok a fuego medio-alto.",
    "Dorar el pollo por todos lados unos 5 minutos. Retirar y reservar.",
    "En la misma sartén, rehogar la cebolla picada fina 5 minutos. Agregar ajo y jengibre rallados.",
    "Añadir el curry y la cúrcuma. Tostar las especias 1 minuto revolviendo.",
    "Incorporar los tomates picados y cocinar 5 minutos hasta reducir.",
    "Agregar la leche de coco y el pollo reservado. Cocinar a fuego medio 10 minutos.",
    "Rectificar sal. Servir sobre arroz basmati con cilantro fresco picado."
  ]'::jsonb,
  40,
  'cena',
  ARRAY['sin gluten', 'sin lácteos', 'especiado', 'antiinflamatorio', 'proteico'],
  'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=800&q=80',
  2,
  520
)

ON CONFLICT DO NOTHING;
