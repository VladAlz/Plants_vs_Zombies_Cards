
export type Member = {
  id: string;
  name: string;
  role: string;
  description: string;
  packImage: string;
  cardImage: string;
  toolType: 'game' | 'converter' | 'calculator' | 'pdf-viewer';
  stats: {
    label: string;
    value: number;
  }[];
  color: string;
  cost: number;
};

export const teamMembers: Member[] = [
  {
    id: 'vladimir-gonzalez',
    name: 'Lanza-Código',
    role: 'Defensor del Backend',
    description: 'Mis dos amores son mi novia y el visual basic',
    packImage: '/members/vladimir-prime.jpeg',
    cardImage: '/members/vladimir.jpeg',
    toolType: 'pdf-viewer',
    color: 'bg-green-600',
    cost: 100,
    stats: [
      { label: 'Poder Mandarina', value: 95 },
      { label: 'Chambeo', value: 100 },
      { label: 'Calvicie', value: 30 }
    ]
  },
  {
    id: 'william-martinez',
    name: 'Gira-Soles',
    role: 'Productor de UX',
    description: 'Este juego tiene más parches que llanta de bus interprovincial. El programador cruzó todas las líneas morales (y se saltó todos los try-catch) para traerles esta joya que corre por puro milagro y fe en Dios.',
    packImage: '/members/william-prime.png',
    cardImage: '/members/william.png',
    toolType: 'converter',
    color: 'bg-yellow-500',
    cost: 50,
    stats: [
      { label: 'Miedo a las Mujeres', value: 100 },
      { label: 'SELECT * por pura pereza', value: 75 },
      { label: 'Dureza ante el error:', value: 50 }
    ]
  },
  {
    id: 'sebastian-acaro',
    name: 'ConsultaSETA BD',
    role: 'Consultas a la BD',
    description: 'Protege las aplicaciones con una capa impenetrable de componentes robustos. Soporta cualquier cantidad de peticiones zombie.',
    packImage: '/members/sexbas-prime.jpeg',
    cardImage: '/members/sexbas.jpeg',
    toolType: 'calculator',
    color: 'bg-amber-800',
    cost: 125,
    stats: [
      { label: 'Delete sin where', value: 100 },
      { label: 'Select * from Table_Name', value: 98 },
      { label: 'Commit;', value: 85 }
    ]
  },
  {
    id: 'erick-lopez',
    name: 'Pomelo-Project',
    role: 'Líder de Escuadrón',
    description: 'Gestiona los recursos del jardín con una armadura de cítricos. Su liderazgo es el escudo que protege los plazos de entrega.',
    packImage: 'https://picsum.photos/seed/pvz-sun/400/400',
    cardImage: '',
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
    id: 'pablo-lozada',
    name: 'Sombra-QA',
    role: 'Especialista en Bugs',
    description: 'Esta en terapia dejo de ser migajero desde ayer, levanta fierros porque servidores no puede.',
    packImage: '/members/ImagenPablo1.jpeg',
    cardImage: '/members/ImagenPablo1.jpeg',
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
    id: 'juan-arcos',
    name: 'SCRIPT-KID',
    role: 'Arquitecto de Nube',
    description: 'Su único vicio es la programación y las Arquinenas. Todo lo dicho y hecho aquí no representa lo que soy (más o menos).',
    packImage: '/members/juan-prime.jpeg',
    cardImage: '/members/juan.jpeg',
    toolType: 'converter',
    color: 'bg-red-600',
    cost: 175,
    stats: [
      { label: 'Espanta Viejas', value: 100 },
      { label: 'Homofobia', value: 50 },
      { label: 'Inimputable', value: 0 }
    ]
  }
];
