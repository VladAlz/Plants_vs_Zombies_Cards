
export type Member = {
  id: string;
  name: string;
  role: string;
  description: string;
  image: string;
  toolType: 'game' | 'converter' | 'calculator';
};

export const teamMembers: Member[] = [
  {
    id: 'alex-rivera',
    name: 'Alex Rivera',
    role: 'Desarrollador Principal',
    description: 'Experto en lógica y algoritmos. A Alex le encanta construir sistemas backend eficientes y resolver acertijos desafiantes.',
    image: 'https://picsum.photos/seed/dev1/400/400',
    toolType: 'game',
  },
  {
    id: 'elena-gomez',
    name: 'Elena Gómez',
    role: 'Diseñadora UI/UX',
    description: 'Elena se enfoca en la interacción del usuario y la accesibilidad. Cree que cada herramienta debe ser hermosa e intuitiva.',
    image: 'https://picsum.photos/seed/dev2/400/400',
    toolType: 'converter',
  },
  {
    id: 'julian-smith',
    name: 'Julian Smith',
    role: 'Ingeniero Frontend',
    description: 'Especializado en React y CSS moderno, Julian se asegura de que la visualización de datos sea limpia y útil.',
    image: 'https://picsum.photos/seed/dev3/400/400',
    toolType: 'calculator',
  },
];
