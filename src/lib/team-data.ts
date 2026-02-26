
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
    role: 'Lead Developer',
    description: 'Expert in logic and algorithms. Alex loves building efficient back-end systems and challenging puzzles.',
    image: 'https://picsum.photos/seed/dev1/400/400',
    toolType: 'game',
  },
  {
    id: 'elena-gomez',
    name: 'Elena Gomez',
    role: 'UI/UX Designer',
    description: 'Elena focuses on user interaction and accessibility. She believes every tool should be beautiful and intuitive.',
    image: 'https://picsum.photos/seed/dev2/400/400',
    toolType: 'converter',
  },
  {
    id: 'julian-smith',
    name: 'Julian Smith',
    role: 'Frontend Engineer',
    description: 'Specializing in React and modern CSS, Julian ensures that data visualization is clean and actionable.',
    image: 'https://picsum.photos/seed/dev3/400/400',
    toolType: 'calculator',
  },
];
