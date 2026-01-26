import React, { useState, useRef, useEffect } from 'react';
import { Bell, Check, X, Eye, EyeOff, RefreshCw } from 'lucide-react';
import { useNotifications } from '../../Slidebar/contexts/NotificationContext';
import { Notification } from '../../types/notification';

const NotificationDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const {
    notifications,
    unreadCount,
    loading,
    error,
    markAsRead,
    markAllAsRead,
    refreshNotifications,
  } = useNotifications();

  // Debug log
  useEffect(() => {
    console.log('NotificationDropdown State:', {
      isOpen,
      notificationsCount: notifications.length,
      unreadCount,
      loading,
      error
    });
  }, [isOpen, notifications, unreadCount, loading, error]);

  // Toggle dropdown
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      refreshNotifications();
    }
  };

  // Click outside handler
  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle notification click - MAIN FUNCTION
  const handleNotificationClick = async (notification: Notification) => {
    console.log('Notification clicked:', notification);
    
    // If notification is unread, mark it as read
    if (!notification.is_read) {
      console.log(`Marking notification ${notification.id} as read...`);
      const success = await markAsRead(notification.id);
      
      if (success) {
        console.log(`Success: Notification ${notification.id} marked as read`);
        
        // You can add a toast notification here
        // toast.success('Notification marked as read');
        
        // Optional: Navigate based on notification type
        // handleNotificationNavigation(notification);
      } else {
        console.error(`Failed to mark notification ${notification.id} as read`);
        // toast.error('Failed to mark as read');
      }
    } else {
      console.log(`Notification ${notification.id} is already read`);
      
      // Still show notification details even if already read
      // handleNotificationNavigation(notification);
    }
  };

  // Handle mark all as read
  const handleMarkAllAsRead = async (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log('Marking all notifications as read...');
    
    const success = await markAllAsRead();
    if (success) {
      console.log('Success: All notifications marked as read');
      // toast.success('All notifications marked as read');
    } else {
      console.error('Failed to mark all as read');
      // toast.error('Failed to mark all as read');
    }
  };

  // Format date
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      const now = new Date();
      const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
      
      if (diffInMinutes < 1) return 'Just now';
      if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
      if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
      if (diffInMinutes < 10080) return `${Math.floor(diffInMinutes / 1440)}d ago`;
      
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: diffInMinutes > 525600 ? 'numeric' : undefined
      });
    } catch {
      return 'Recently';
    }
  };

  // Get notification icon based on type
  const getNotificationIcon = (type: string, isRead: boolean) => {
    const baseClass = `w-10 h-10 rounded-full flex items-center justify-center ${
      !isRead ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
    }`;
    
    let icon;
    switch (type?.toLowerCase()) {
      case 'application':
      case 'application_status':
        icon = '📋';
        break;
      case 'message':
      case 'chat':
        icon = '💬';
        break;
      case 'task':
      case 'reminder':
        icon = '✅';
        break;
      case 'alert':
      case 'warning':
        icon = '⚠️';
        break;
      case 'success':
        icon = '🎉';
        break;
      case 'payment':
      case 'invoice':
        icon = '💰';
        break;
      default:
        icon = !isRead ? '🔔' : '📭';
    }
    
    return (
      <div className={baseClass}>
        <span className="text-lg">{icon}</span>
      </div>
    );
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Notification Bell Button */}
      <button
        onClick={toggleDropdown}
        className="relative p-2 hover:bg-white/20 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-white/50"
        aria-label={`Notifications ${unreadCount > 0 ? `(${unreadCount} unread)` : ''}`}
        type="button"
      >
        <Bell size={20} className="hover:text-gray-200 transition-colors" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown Panel */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 md:w-96 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b bg-gray-50">
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-800">Notifications</h3>
                <button
                  onClick={() => refreshNotifications()}
                  className="p-1 hover:bg-gray-200 rounded-full transition-colors"
                  title="Refresh"
                  type="button"
                >
                  <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
                </button>
              </div>
              <div className="flex items-center justify-between mt-1">
                <p className="text-xs text-gray-500">
                  {notifications.length} total • {unreadCount} unread
                </p>
                {error && (
                  <p className="text-xs text-red-500 truncate" title={error}>
                    Error: {error.length > 20 ? `${error.substring(0, 20)}...` : error}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Actions Bar */}
          {notifications.length > 0 && (
            <div className="px-4 py-2 border-b bg-gray-50 flex justify-between items-center">
              <span className="text-sm text-gray-600">
                Click on a notification to mark as read
              </span>
              {unreadCount > 0 && (
                <button
                  onClick={handleMarkAllAsRead}
                  className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1 px-3 py-1 hover:bg-blue-50 rounded transition-colors"
                  type="button"
                >
                  <Check size={14} />
                  Mark all read
                </button>
              )}
            </div>
          )}

          {/* Notifications List */}
          <div className="max-h-96 overflow-y-auto">
            {loading && notifications.length === 0 ? (
              <div className="p-8 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                <p className="text-gray-500 mt-2">Loading notifications...</p>
              </div>
            ) : error && notifications.length === 0 ? (
              <div className="p-8 text-center">
                <div className="text-red-500 mb-2">⚠️</div>
                <p className="text-gray-700 mb-2">Unable to load notifications</p>
                <p className="text-sm text-gray-500 mb-4">{error}</p>
                <button
                  onClick={refreshNotifications}
                  className="text-sm text-blue-600 hover:text-blue-800"
                  type="button"
                >
                  Try again
                </button>
              </div>
            ) : notifications.length === 0 ? (
              <div className="p-8 text-center">
                <Bell size={32} className="mx-auto mb-2 text-gray-300" />
                <p className="text-gray-700">No notifications</p>
                <p className="text-sm text-gray-500 mt-1">
                  When you get notifications, they'll appear here
                </p>
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 hover:bg-gray-50 transition-colors cursor-pointer group ${
                      !notification.is_read ? 'bg-blue-50 hover:bg-blue-100' : ''
                    }`}
                    onClick={() => handleNotificationClick(notification)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        handleNotificationClick(notification);
                      }
                    }}
                    role="button"
                    tabIndex={0}
                  >
                    <div className="flex gap-3">
                      {/* Icon */}
                      {getNotificationIcon(notification.type, notification.is_read)}
                      
                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        {/* Header with title and time */}
                        <div className="flex items-start justify-between mb-1">
                          <h4 className={`font-medium truncate ${
                            !notification.is_read ? 'text-blue-900' : 'text-gray-800'
                          }`}>
                            {notification.title || 'Notification'}
                          </h4>
                          <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                            <span className="text-xs text-gray-500">
                              {formatDate(notification.created_at)}
                            </span>
                            {!notification.is_read && (
                              <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                            )}
                          </div>
                        </div>
                        
                        {/* Message */}
                        <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                          {notification.message || 'No message content'}
                        </p>
                        
                        {/* Footer with type and status */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            {notification.type && (
                              <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded">
                                {notification.type}
                              </span>
                            )}
                            {notification.is_read ? (
                              <span className="text-xs text-gray-500 flex items-center">
                                <Eye size={12} className="mr-1" />
                                Read
                              </span>
                            ) : (
                              <span className="text-xs text-blue-600 font-medium flex items-center">
                                <EyeOff size={12} className="mr-1" />
                                Unread - Click to mark as read
                              </span>
                            )}
                          </div>
                          
                          {/* Click indicator */}
                          <span className="text-xs text-gray-400 group-hover:text-gray-600">
                            Click to {!notification.is_read ? 'mark as read' : 'view'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {notifications.length > 0 && (
            <div className="p-3 border-t bg-gray-50 text-center">
              <div className="flex justify-center items-center gap-4">
                <button
                  onClick={refreshNotifications}
                  className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
                  type="button"
                >
                  <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
                  Refresh
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-sm text-gray-600 hover:text-gray-800"
                  type="button"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;