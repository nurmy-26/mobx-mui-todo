export type TItem = {
  id: string;
  title: string;
  isDone: boolean;
};

export type TList = {
  id: string;
  creationDate: Date;
  title: string;
  items: TItem[];
};
