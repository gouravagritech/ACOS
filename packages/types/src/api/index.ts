export interface ApiResponse<T> {
  data: T | null;
  error: {
    message: string;
    code: string;
    details?: unknown;
  } | null;
}
