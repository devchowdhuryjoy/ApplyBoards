import React, { createContext, useContext, useState, useEffect } from 'react';
import { Notification, NotificationResponse } from '../../types/notification';

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  loading: boolean;
  error: string | null;
  fetchNotifications: () => Promise<void>;
  markAsRead: (id: number) => Promise<boolean>;
  markAllAsRead: () => Promise<boolean>;
  refreshNotifications: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

//UPDATED: Helper function to get agent token from 'auth' key
const getAgentToken = (): string | null => {
  try {
    // 1. First check 'auth' key (your current login system)
    const authData = localStorage.getItem('auth');
    if (authData) {
      const parsedAuth = JSON.parse(authData);
      
      // Check multiple possible token keys
      const token = parsedAuth.token || parsedAuth.access_token || parsedAuth.api_token;
      if (token) {
        console.log('Token found in auth data:', token.substring(0, 20) + '...');
        return token;
      }
      
      // Also check if agent data has token
      if (parsedAuth.agent && parsedAuth.agent.token) {
        console.log('Token found in agent data:', parsedAuth.agent.token.substring(0, 20) + '...');
        return parsedAuth.agent.token;
      }
    }
    
    // 2. Check direct 'agent_token' key (for backward compatibility)
    const directToken = localStorage.getItem('agent_token');
    if (directToken) {
      console.log('Token found in agent_token key:', directToken.substring(0, 20) + '...');
      return directToken;
    }
    
    // 3. Check sessionStorage
    const sessionToken = sessionStorage.getItem('auth') || sessionStorage.getItem('agent_token');
    if (sessionToken) {
      try {
        const parsed = JSON.parse(sessionToken);
        if (parsed.token) {
          console.log('Token found in sessionStorage:', parsed.token.substring(0, 20) + '...');
          return parsed.token;
        }
      } catch {
        // If it's not JSON, maybe it's just the token
        console.log('Token found in sessionStorage:', sessionToken.substring(0, 20) + '...');
        return sessionToken;
      }
    }
    
    console.warn('No authentication token found in any storage location');
    return null;
    
  } catch (error) {
    console.error('Error retrieving token:', error);
    return null;
  }
};

// Helper function to get headers with dynamic token
const getHeaders = () => {
  const token = getAgentToken();
  
  if (!token) {
    console.warn('No agent token found. Available localStorage keys:', Object.keys(localStorage));
    console.warn('Auth data in localStorage:', localStorage.getItem('auth'));
    return null;
  }
  
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Accept", "application/json");
  
  return myHeaders;
};

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [unreadCount, setUnreadCount] = useState(0);



// contexts/NotificationContext.tsx - fetchNotifications function update করুন
const fetchNotifications = async () => {
  const headers = getHeaders();
  
  if (!headers) {
    setError('Authentication token not found. Please login again.');
    setNotifications([]);
    setUnreadCount(0);
    return;
  }

  try {
    setLoading(true);
    setError(null);
    
    console.log('Fetching notifications with token...');
    
    const response = await fetch("https://studyxl2.globalrouteway.com/api/agent/notifications", {
      method: "GET",
      headers: headers,
    });
    
    console.log('Notification API response status:', response.status);
    
    if (!response.ok) {
      if (response.status === 401) {
        localStorage.removeItem('auth');
        localStorage.removeItem('agent_token');
        throw new Error('Session expired. Please login again.');
      }
      throw new Error(`Failed to fetch notifications: ${response.status} ${response.statusText}`);
    }
    
    const result = await response.json();
    console.log('Full Notifications API Response:', result);
    
    //FIXED: Handle both "notifications" and "data" keys
    let notificationsData: Notification[] = [];
    
    if (result.success) {
      // Check multiple possible keys
      if (result.notifications && Array.isArray(result.notifications)) {
        notificationsData = result.notifications;
        console.log(`Using 'notifications' key: ${notificationsData.length} items`);
      } else if (result.data && Array.isArray(result.data)) {
        notificationsData = result.data;
        console.log(`Using 'data' key: ${notificationsData.length} items`);
      } else if (Array.isArray(result)) {
        notificationsData = result;
        console.log(`Response is direct array: ${notificationsData.length} items`);
      }
      
      // Log first notification for debugging
      if (notificationsData.length > 0) {
        console.log('First notification:', notificationsData[0]);
      }
      
      setNotifications(notificationsData);
      
      // Count unread notifications
      const unread = notificationsData.filter(notif => {
        // Handle both boolean and string values
        const isRead = notif.is_read;
        return isRead === false || isRead === 0 || isRead === 'false' || isRead === '0';
      }).length;
      
      setUnreadCount(unread);
      console.log(`Fetched ${notificationsData.length} notifications, ${unread} unread`);
    } else {
      console.warn('API returned success: false', result.message);
      setNotifications([]);
      setUnreadCount(0);
    }
  } catch (error) {
    console.error("Error fetching notifications:", error);
    setError(error instanceof Error ? error.message : 'Unknown error occurred');
    setNotifications([]);
    setUnreadCount(0);
  } finally {
    setLoading(false);
  }
};

//Also update markAsRead function to match API response structure
const markAsRead = async (id: number): Promise<boolean> => {
  const headers = getHeaders();
  
  if (!headers) {
    console.error('Cannot mark as read: No authentication token');
    return false;
  }

  try {
    console.log(`Marking notification ${id} as read...`);
    
    // OPTIMISTIC UPDATE: First update the UI immediately
    let wasUnread = false;
    
    setNotifications(prev => 
      prev.map(notif => {
        if (notif.id === id && !notif.is_read) {
          wasUnread = true;
          console.log(`Optimistically marking notification ${id} as read`);
          return { 
            ...notif, 
            is_read: true, 
            read_at: new Date().toISOString() 
          };
        }
        return notif;
      })
    );
    
    if (wasUnread) {
      setUnreadCount(prev => {
        const newCount = Math.max(0, prev - 1);
        console.log(`Unread count updated: ${prev} → ${newCount}`);
        return newCount;
      });
    }
    
    // Try different API endpoint formats
    const endpoints = [
      `https://studyxl2.globalrouteway.com/api/agent/notifications/read/${id}`,
    //   `https://studyxl2.globalrouteway.com/api/agent/notifications/mark-read/${id}`,
    //   `https://studyxl2.globalrouteway.com/api/agent/notification/read/${id}`,
    ];
    
    let apiSuccess = false;
    
    for (const endpoint of endpoints) {
      try {
        const response = await fetch(endpoint, {
          method: "POST",
          headers: headers,
        });
        
        if (response.ok) {
          const result = await response.json();
          console.log(`API success for ${endpoint}:`, result);
          apiSuccess = true;
          break;
        } else {
          console.log(`API failed for ${endpoint}: ${response.status}`);
        }
      } catch (err) {
        console.log(`Error trying ${endpoint}:`, err);
      }
    }
    
    if (!apiSuccess) {
      console.warn(`All API endpoints failed for notification ${id}, but UI was updated`);
    } else {
      console.log(`Successfully marked notification ${id} as read via API`);
    }
    
    return true;
    
  } catch (error) {
    console.error("Error in markAsRead:", error);
    return false;
  }
};

//Update markAllAsRead function
const markAllAsRead = async (): Promise<boolean> => {
  const headers = getHeaders();
  
  if (!headers) {
    console.error('Cannot mark all as read: No authentication token');
    return false;
  }

  try {
    console.log("Marking all notifications as read...");
    
    // OPTIMISTIC UPDATE: First update the UI immediately
    const hadUnread = unreadCount > 0;
    
    if (hadUnread) {
      console.log(`Optimistically marking ${unreadCount} notifications as read`);
      setNotifications(prev => 
        prev.map(notif => ({ 
          ...notif, 
          is_read: true,
          read_at: notif.read_at || new Date().toISOString()
        }))
      );
      setUnreadCount(0);
    }
    
    // Try mark-all-read endpoint
    const response = await fetch(`https://studyxl2.globalrouteway.com/api/agent/notifications/mark-all-read`, {
      method: "POST",
      headers: headers,
    });
    
    if (!response.ok) {
      console.warn(`API mark-all-read failed (Status: ${response.status}), but UI was updated`);
    } else {
      const result = await response.json();
      console.log("Mark all read API response:", result);
      console.log("Successfully marked all notifications as read via API");
    }
    
    return true;
  } catch (error) {
    console.error("Error in markAllAsRead:", error);
    return false;
  }
};


  


  // Manual refresh function
  const refreshNotifications = () => {
    console.log('Manually refreshing notifications...');
    fetchNotifications();
  };

  // Initial fetch and polling
  useEffect(() => {
    // Check if user is authenticated
    const token = getAgentToken();
    if (token) {
      console.log('User is authenticated, fetching notifications...');
      fetchNotifications();
      
      // Poll for new notifications every 30 seconds
      const interval = setInterval(fetchNotifications, 30000);
      return () => {
        clearInterval(interval);
      };
    } else {
      console.log('User is not authenticated, skipping notification fetch');
      setError('Please login to view notifications');
    }
    
    return () => {}; // Cleanup if no token
  }, []);

  // Listen for auth changes (login/logout)
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'auth' || e.key === 'agent_token') {
        console.log('Auth data changed, refetching notifications');
        fetchNotifications();
      }
    };

    // Also listen for custom auth change events
    const handleAuthChange = () => {
      console.log('Auth change event detected, refetching notifications');
      fetchNotifications();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('auth-change', handleAuthChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('auth-change', handleAuthChange);
    };
  }, []);

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        loading,
        error,
        fetchNotifications,
        markAsRead,
        markAllAsRead,
        refreshNotifications,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within NotificationProvider');
  }
  return context;
};