/** Shape of Spring Data `Page` JSON returned by the per-entity paged endpoints. */
export interface Page<T> {

  content: T[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
  numberOfElements: number;
  first: boolean;
  last: boolean;
  empty: boolean;

}
