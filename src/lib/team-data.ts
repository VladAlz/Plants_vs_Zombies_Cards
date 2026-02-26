
export type Member = {
  id: string;
  name: string;
  role: string;
  description: string;
  image: string;
  toolType: 'game' | 'converter' | 'calculator';
  stats: {
    label: string;
    value: number;
  }[];
  color: string;
  cost: number;
};

export const teamMembers: Member[] = [
  {
    id: 'alex-rivera',
    name: 'Lanza-Código',
    role: 'Defensor del Backend',
    description: 'Dispara líneas de código precisas para derrotar a los bugs antes de que lleguen a la casa. Su lógica es inquebrantable.',
    image: 'https://picsum.photos/seed/pvz-pea/400/400',
    toolType: 'game',
    color: 'bg-green-600',
    cost: 100,
    stats: [
      { label: 'Daño (Lógica)', value: 95 },
      { label: 'Recarga', value: 80 },
      { label: 'Dureza', value: 70 }
    ]
  },
  {
    id: 'elena-gomez',
    name: 'Gira-Soles UI',
    role: 'Productora de UX',
    description: 'Genera soles de creatividad para que el equipo pueda desplegar interfaces hermosas. Sin ella, el diseño se queda a oscuras.',
    image: 'https://picsum.photos/seed/pvz-sun/400/400',
    toolType: 'converter',
    color: 'bg-yellow-500',
    cost: 50,
    stats: [
      { label: 'Producción de Sol', value: 100 },
      { label: 'Estilo', value: 98 },
      { label: 'Velocidad', value: 85 }
    ]
  },
  {
    id: 'julian-smith',
    name: 'Nuez-React',
    role: 'Tanque de Frontend',
    description: 'Protege las aplicaciones con una capa impenetrable de componentes robustos. Soporta cualquier cantidad de peticiones zombie.',
    image: 'https://picsum.photos/seed/pvz-nut/400/400',
    toolType: 'calculator',
    color: 'bg-amber-800',
    cost: 125,
    stats: [
      { label: 'Dureza (Seguridad)', value: 100 },
      { label: 'Resistencia', value: 95 },
      { label: 'Flexibilidad', value: 60 }
    ]
  },
  {
    id: 'carlos-perez',
    name: 'Pomelo-Project',
    role: 'Líder de Escuadrón',
    description: 'Gestiona los recursos del jardín con una armadura de cítricos. Su liderazgo es el escudo que protege los plazos de entrega.',
    image: 'https://picsum.photos/seed/pvz-citron/400/400',
    toolType: 'calculator',
    color: 'bg-orange-500',
    cost: 200,
    stats: [
      { label: 'Gestión', value: 90 },
      { label: 'Liderazgo', value: 95 },
      { label: 'Dureza', value: 85 }
    ]
  },
  {
    id: 'sofia-ruiz',
    name: 'Sombra-QA',
    role: 'Especialista en Bugs',
    description: 'Se mueve entre las sombras del código para encontrar errores que nadie más ve. Su precisión es quirúrgica.',
    image: 'https://picsum.photos/seed/pvz-shadow/400/400',
    toolType: 'game',
    color: 'bg-purple-800',
    cost: 150,
    stats: [
      { label: 'Sigilo', value: 98 },
      { label: 'Precisión', value: 92 },
      { label: 'Detección', value: 100 }
    ]
  },
  {
    id: 'diego-torres',
    name: 'Boca-de-Dragón-DevOps',
    role: 'Arquitecto de Nube',
    description: 'Despliega ráfagas de infraestructura escalable. Calienta los servidores para que el despliegue sea un éxito total.',
    image: 'https://picsum.photos/seed/pvz-dragon/400/400',
    toolType: 'converter',
    color: 'bg-red-600',
    cost: 175,
    stats: [
      { label: 'Fuego (Cloud)', value: 96 },
      { label: 'Escalabilidad', value: 94 },
      { label: 'Calor', value: 88 }
    ]
  }
];
