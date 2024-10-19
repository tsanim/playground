export interface PaginationOptions {
  size?: number;
  page?: number;
}
export type GetPaginated = <T>(data: T[], options?: PaginationOptions) => T[];
