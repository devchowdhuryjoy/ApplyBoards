export interface Notification {
  id: number;
  title: string;
  message: string;
  type: string;
  is_read: boolean;
  created_at: string;
  read_at: string | null;
  metadata?: Record<string, any>;
}

export interface NotificationResponse {
  success: boolean;
  data: Notification[];
  message?: string;
  status?: string;
}