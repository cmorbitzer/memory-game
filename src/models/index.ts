export interface Model {
  id: string;
}

export type New<T extends Model> = Omit<T, 'id'>;
