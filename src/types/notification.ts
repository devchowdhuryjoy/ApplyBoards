// export interface Notification {
//   id: number;
//   title: string;
//   message: string;
//   type: string;
//   is_read: boolean;
//   created_at: string;
//   read_at: string | null;
//   metadata?: Record<string, any>;
// }

// export interface NotificationResponse {
//   success: boolean;
//   data: Notification[];
//   message?: string;
//   status?: string;
// }



export interface Notification {
  id: number | string;  // Allow both number and string IDs
  title: string;
  message: string;
  type: string;
  is_read: boolean;
  created_at: string;
  read_at: string | null;
  metadata?: {
    student_name?: string;
    status?: string;
    application?: any;
    subject?: string;
    description?: string;
    [key: string]: any;  // Allow additional metadata fields
  };
}

export interface NotificationResponse {
  success: boolean;
  data?: Notification[];
  notifications?: Notification[];
  message?: string;
  status?: string;
  pagination?: any;
}