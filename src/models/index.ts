export interface Model {
  id: string;
}

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type New<T extends Model> = Omit<T, 'id'>;
