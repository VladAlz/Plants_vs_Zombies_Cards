
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
};

export const teamMembers: Member[] = [
  {
    id: 'alex-rivera',
    name: 'Alex Rivera',
    role: 'Mago del Código',
    description: 'Experto en lógica y algoritmos. A Alex le encanta construir sistemas backend eficientes y resolver acertijos desafiantes.',
    image: 'https://picsum.photos/seed/dev1/400/400',
    toolType: 'game',
    color: 'bg-blue-500',
    stats: [
      { label: 'Lógica', value: 95 },
      { label: 'Velocidad', value: 80 },
      { label: 'Café', value: 100 }
    ]
  },
  {
    id: 'elena-gomez',
    name: 'Elena Gómez',
    role: 'Arquitecta de Sueños',
    description: 'Elena se enfoca en la interacción del usuario y la accesibilidad. Cree que cada herramienta debe ser hermosa e intuitiva.',
    image: 'https://picsum.photos/seed/dev2/400/400',
    toolType: 'converter',
    color: 'bg-purple-500',
    stats: [
      { label: 'Diseño', value: 98 },
      { label: 'Empatía', value: 90 },
      { label: 'Píxeles', value: 85 }
    ]
  },
  {
    id: 'julian-smith',
    name: 'Julian Smith',
    role: 'Guerrero del DOM',
    description: 'Especializado en React y CSS moderno, Julian se asegura de que la visualización de datos sea limpia y útil.',
    image: 'https://picsum.photos/seed/dev3/400/400',
    toolType: 'calculator',
    color: 'bg-orange-500',
    stats: [
      { label: 'React', value: 92 },
      { label: 'Estilo', value: 88 },
      { label: 'Mates', value: 95 }
    ]
  },
];
