export interface IPaginated<T> {
  results: T;
  totalRecords: number;
  type: string;
}
