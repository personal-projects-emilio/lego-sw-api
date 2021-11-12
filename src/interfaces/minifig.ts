interface Minifig {
  _id: string;
  characterName: string;
  name: string;
  possessed: boolean;
  tags?: string[];
}

interface TagOrCharacName {
  name: string;
  amount: number;
}
