export interface SystemEvent<T = unknown> {
  id: string;
  name: string;
  source: string;
  payload: T;
  timestamp: Date;
}
