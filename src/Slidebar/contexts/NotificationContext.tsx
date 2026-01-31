import React, { createContext, useContext, useState, useEffect } from "react";
import { Notification } from "../../types/notification";
import BASE_URL from "../../ApiBaseUrl/ApiBaseUrl";

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  loading: boolean;
  error: string | null;
  userType: "agent" | "student" | null;
  fetchNotifications: () => Promise<void>;
  markAsRead: (id: number) => Promise<boolean>;
  markAllAsRead: () => Promise<boolean>;
  refreshNotifications: () => void;
  setUserType: (type: "agent" | "student") => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined,
);

// Helper function to get token based on user type
const getUserToken = (): {
  token: string | null;
  userType: "agent" | "student" | null;
} => {
  try {
    // Check localStorage for auth data
    const authData = localStorage.getItem("auth");

    if (authData) {
      const parsedAuth = JSON.parse(authData);

      // Check if it's agent
      if (
        parsedAuth.token &&
        (parsedAuth.user_type === "agent" ||
          parsedAuth.role === "agent" ||
          parsedAuth.agent)
      ) {
        console.log("Agent token found");
        return {
          token: parsedAuth.token,
          userType: "agent",
        };
      }

      // Check if it's student/user
      if (
        parsedAuth.token &&
        (parsedAuth.user_type === "student" ||
          parsedAuth.role === "student" ||
          parsedAuth.user)
      ) {
        console.log("Student token found");
        return {
          token: parsedAuth.token,
          userType: "student",
        };
      }

      // Fallback: Check for any token
      if (parsedAuth.token) {
        console.log("Generic token found, defaulting to student");
        return {
          token: parsedAuth.token,
          userType: "student",
        };
      }
    }

    // Check specific keys
    const agentToken = localStorage.getItem("agent_token");
    if (agentToken) {
      console.log("Agent token from specific key");
      return { token: agentToken, userType: "agent" };
    }

    const studentToken =
      localStorage.getItem("student_token") ||
      localStorage.getItem("user_token");
    if (studentToken) {
      console.log("Student token from specific key");
      return { token: studentToken, userType: "student" };
    }

    // Check sessionStorage
    const sessionAuth = sessionStorage.getItem("auth");
    if (sessionAuth) {
      try {
        const parsed = JSON.parse(sessionAuth);
        if (parsed.token) {
          if (parsed.user_type === "agent") {
            return { token: parsed.token, userType: "agent" };
          }
          return { token: parsed.token, userType: "student" };
        }
      } catch {
        // If not JSON, check as string
        if (typeof sessionAuth === "string" && sessionAuth.length > 20) {
          return { token: sessionAuth, userType: "student" };
        }
      }
    }

    console.warn("No authentication token found");
    return { token: null, userType: null };
  } catch (error) {
    console.error("Error retrieving token:", error);
    return { token: null, userType: null };
  }
};

// Helper function to get headers
const getHeaders = (userType: "agent" | "student" | null) => {
  const { token } = getUserToken();

  if (!token) {
    console.warn("No token found for user type:", userType);
    return null;
  }

  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Accept", "application/json");

  return myHeaders;
};

// Get correct API endpoint based on user type
const getNotificationEndpoint = (userType: "agent" | "student" | null) => {
  if (userType === "agent") {
    return `${BASE_URL}/agent/notifications`;
  } else if (userType === "student") {
    return `${BASE_URL}/student/notifications`;
  }
  return null;
};

// Get mark as read endpoint
const getMarkAsReadEndpoint = (
  userType: "agent" | "student" | null,
  id: number,
) => {
  if (userType === "agent") {
    return `${BASE_URL}/agent/notifications/read/${id}`;
  } else if (userType === "student") {
    return `${BASE_URL}/student/notifications/read/${id}`;
  }
  return null;
};

// Get mark all as read endpoint
const getMarkAllAsReadEndpoint = (userType: "agent" | "student" | null) => {
  if (userType === "agent") {
    return `${BASE_URL}/agent/notifications/mark-all-read`;
  } else if (userType === "student") {
    return `${BASE_URL}/student/notifications/mark-all-read`;
  }
  return null;
};

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [unreadCount, setUnreadCount] = useState(0);
  const [userType, setUserTypeState] = useState<"agent" | "student" | null>(
    null,
  );

  // Set user type
  const setUserType = (type: "agent" | "student") => {
    console.log("Setting user type to:", type);
    setUserTypeState(type);
  };

  // Auto-detect user type on mount
  useEffect(() => {
    const { userType: detectedType } = getUserToken();
    if (detectedType) {
      setUserTypeState(detectedType);
      console.log("Auto-detected user type:", detectedType);
    }
  }, []);

  // Fetch notifications function
  const fetchNotifications = async () => {
    const { userType: currentUserType } = getUserToken();

    if (!currentUserType) {
      setUserTypeState(null);
      setError("User type not detected. Please login.");
      setNotifications([]);
      setUnreadCount(0);
      return;
    }

    setUserTypeState(currentUserType);
    const headers = getHeaders(currentUserType);
    const endpoint = getNotificationEndpoint(currentUserType);

    if (!headers || !endpoint) {
      setError("Authentication failed. Please login again.");
      setNotifications([]);
      setUnreadCount(0);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      console.log(`Fetching ${currentUserType} notifications from:`, endpoint);

      const response = await fetch(endpoint, {
        method: "GET",
        headers: headers,
      });

      console.log("Notification API response status:", response.status);

      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem("auth");
          localStorage.removeItem("agent_token");
          localStorage.removeItem("student_token");
          throw new Error("Session expired. Please login again.");
        }
        // throw new Error(`Failed to fetch notifications: ${response.status} ${response.statusText}`);
        setNotifications([]);
        setUnreadCount(0);
        return;
      }

      const result = await response.json();
      console.log(`${currentUserType} Notifications API Response:`, result);

      let notificationsData: Notification[] = [];

      if (result.success) {
        if (result.notifications && Array.isArray(result.notifications)) {
          notificationsData = result.notifications;
        } else if (result.data && Array.isArray(result.data)) {
          notificationsData = result.data;
        } else if (Array.isArray(result)) {
          notificationsData = result;
        }

        console.log(
          `Loaded ${notificationsData.length} notifications for ${currentUserType}`,
        );

        if (notificationsData.length > 0) {
          console.log("First notification:", notificationsData[0]);
        }

        setNotifications(notificationsData);

        // Count unread notifications
        const unread = notificationsData.filter((notif) => {
          const isRead = notif.is_read;
          return (
            isRead === false ||
            isRead === 0 ||
            isRead === "false" ||
            isRead === "0"
          );
        }).length;

        setUnreadCount(unread);
        console.log(`Unread count: ${unread}/${notificationsData.length}`);
      } else {
        console.warn("API returned success: false", result.message);
        setNotifications([]);
        setUnreadCount(0);
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
      setError(
        error instanceof Error ? error.message : "Unknown error occurred",
      );
      setNotifications([]);
      setUnreadCount(0);
    } finally {
      setLoading(false);
    }
  };

  // Mark as read function
  const markAsRead = async (id: number): Promise<boolean> => {
    const { userType: currentUserType } = getUserToken();

    if (!currentUserType) {
      console.error("Cannot mark as read: User type not detected");
      return false;
    }

    const headers = getHeaders(currentUserType);
    const endpoint = getMarkAsReadEndpoint(currentUserType, id);

    if (!headers || !endpoint) {
      console.error("Cannot mark as read: No authentication token");
      return false;
    }

    try {
      console.log(
        `Marking notification ${id} as read for ${currentUserType}...`,
      );

      // OPTIMISTIC UPDATE
      let wasUnread = false;

      setNotifications((prev) =>
        prev.map((notif) => {
          if (notif.id === id && !notif.is_read) {
            wasUnread = true;
            console.log(`Optimistically marking notification ${id} as read`);
            return {
              ...notif,
              is_read: true,
              read_at: new Date().toISOString(),
            };
          }
          return notif;
        }),
      );

      if (wasUnread) {
        setUnreadCount((prev) => {
          const newCount = Math.max(0, prev - 1);
          console.log(`Unread count updated: ${prev} → ${newCount}`);
          return newCount;
        });
      }

      // API Call
      const response = await fetch(endpoint, {
        method: "POST",
        headers: headers,
      });

      if (response.ok) {
        const result = await response.json();
        console.log(`Mark as read API success:`, result);
        return true;
      } else {
        console.warn(
          `API mark as read failed (Status: ${response.status}), but UI was updated`,
        );
        return true; // Still return true for optimistic update
      }
    } catch (error) {
      console.error("Error in markAsRead:", error);
      return false;
    }
  };

  // Mark all as read function
  const markAllAsRead = async (): Promise<boolean> => {
    const { userType: currentUserType } = getUserToken();

    if (!currentUserType) {
      console.error("Cannot mark all as read: User type not detected");
      return false;
    }

    const headers = getHeaders(currentUserType);
    const endpoint = getMarkAllAsReadEndpoint(currentUserType);

    if (!headers || !endpoint) {
      console.error("Cannot mark all as read: No authentication token");
      return false;
    }

    try {
      console.log(
        `Marking all notifications as read for ${currentUserType}...`,
      );

      // OPTIMISTIC UPDATE
      const hadUnread = unreadCount > 0;

      if (hadUnread) {
        console.log(
          `Optimistically marking ${unreadCount} notifications as read`,
        );
        setNotifications((prev) =>
          prev.map((notif) => ({
            ...notif,
            is_read: true,
            read_at: notif.read_at || new Date().toISOString(),
          })),
        );
        setUnreadCount(0);
      }

      // API Call
      const response = await fetch(endpoint, {
        method: "POST",
        headers: headers,
      });

      if (!response.ok) {
        console.warn(
          `API mark-all-read failed (Status: ${response.status}), but UI was updated`,
        );
      } else {
        const result = await response.json();
        console.log("Mark all read API response:", result);
      }

      return true;
    } catch (error) {
      console.error("Error in markAllAsRead:", error);
      return false;
    }
  };

  // Manual refresh function
  const refreshNotifications = () => {
    console.log("Manually refreshing notifications...");
    fetchNotifications();
  };

  // Initial fetch and polling
  useEffect(() => {
    const { token, userType: detectedType } = getUserToken();

    if (token && detectedType) {
      console.log(
        `${detectedType} is authenticated, fetching notifications...`,
      );
      setUserTypeState(detectedType);
      fetchNotifications();

      // Poll for new notifications every 30 seconds
      const interval = setInterval(fetchNotifications, 30000);
      return () => {
        clearInterval(interval);
      };
    } else {
      console.log("User is not authenticated, skipping notification fetch");
      setError("Please login to view notifications");
    }

    return () => {};
  }, []);

  // Listen for auth changes
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (
        e.key === "auth" ||
        e.key === "agent_token" ||
        e.key === "student_token"
      ) {
        console.log("Auth data changed, refetching notifications");
        fetchNotifications();
      }
    };

    const handleAuthChange = () => {
      console.log("Auth change event detected, refetching notifications");
      fetchNotifications();
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("auth-change", handleAuthChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("auth-change", handleAuthChange);
    };
  }, []);

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        loading,
        error,
        userType,
        fetchNotifications,
        markAsRead,
        markAllAsRead,
        refreshNotifications,
        setUserType,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotifications must be used within NotificationProvider",
    );
  }
  return context;
};
