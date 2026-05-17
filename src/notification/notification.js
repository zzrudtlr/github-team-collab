/**
 * Notification Service
 * 사용자 알림 기능
 */

class NotificationService {
  constructor() {
    this.notifications = [];
    this.subscribers = new Map();
    this.notificationId = 0;
  }

  /**
   * 알림 생성
   * @param {string} userId - 사용자 ID
   * @param {string} type - 알림 타입 (info, warning, error, success)
   * @param {string} title - 알림 제목
   * @param {string} message - 알림 메시지
   * @param {object} data - 추가 데이터 (선택사항)
   */
  createNotification(userId, type, title, message, data = null) {
    const notification = {
      id: ++this.notificationId,
      userId: userId,
      type: type,
      title: title,
      message: message,
      data: data,
      timestamp: new Date().toISOString(),
      read: false
    };

    this.notifications.push(notification);
    this._notifySubscribers(userId, notification);

    console.log(`✉️  알림 생성: [${type}] ${title}`);
    return notification;
  }

  /**
   * 사용자의 모든 알림 조회
   * @param {string} userId - 사용자 ID
   * @param {boolean} unreadOnly - 읽지 않은 알림만 (선택사항)
   */
  getNotifications(userId, unreadOnly = false) {
    return this.notifications.filter(n => {
      if (n.userId !== userId) return false;
      if (unreadOnly && n.read) return false;
      return true;
    });
  }

  /**
   * 읽지 않은 알림 개수
   * @param {string} userId - 사용자 ID
   */
  getUnreadCount(userId) {
    return this.notifications.filter(n => 
      n.userId === userId && !n.read
    ).length;
  }

  /**
   * 알림 읽음 처리
   * @param {number} notificationId - 알림 ID
   */
  markAsRead(notificationId) {
    const notification = this.notifications.find(n => n.id === notificationId);
    if (notification) {
      notification.read = true;
      console.log(`✓ 알림 읽음: ${notificationId}`);
    }
    return notification;
  }

  /**
   * 모든 알림을 읽음 처리
   * @param {string} userId - 사용자 ID
   */
  markAllAsRead(userId) {
    const unreadCount = this.notifications
      .filter(n => n.userId === userId && !n.read)
      .forEach(n => n.read = true);
    
    console.log(`✓ 모든 알림 읽음 처리: ${userId}`);
  }

  /**
   * 알림 삭제
   * @param {number} notificationId - 알림 ID
   */
  deleteNotification(notificationId) {
    const index = this.notifications.findIndex(n => n.id === notificationId);
    if (index > -1) {
      const deleted = this.notifications.splice(index, 1);
      console.log(`🗑️  알림 삭제: ${notificationId}`);
      return deleted[0];
    }
    return null;
  }

  /**
   * 구독자 등록 (실시간 알림용)
   * @param {string} userId - 사용자 ID
   * @param {function} callback - 콜백 함수
   */
  subscribe(userId, callback) {
    if (!this.subscribers.has(userId)) {
      this.subscribers.set(userId, []);
    }
    this.subscribers.get(userId).push(callback);
    
    console.log(`📡 구독자 등록: ${userId}`);
    
    // 구독 해제 함수 반환
    return () => {
      const callbacks = this.subscribers.get(userId);
      const index = callbacks.indexOf(callback);
      if (index > -1) {
        callbacks.splice(index, 1);
      }
    };
  }

  /**
   * 구독자들에게 알림 전송 (내부용)
   */
  _notifySubscribers(userId, notification) {
    if (this.subscribers.has(userId)) {
      this.subscribers.get(userId).forEach(callback => {
        try {
          callback(notification);
        } catch (error) {
          console.error('구독자 콜백 오류:', error);
        }
      });
    }
  }

  /**
   * 알림 통계
   */
  getStatistics(userId) {
    const userNotifications = this.notifications.filter(n => n.userId === userId);
    
    return {
      total: userNotifications.length,
      unread: userNotifications.filter(n => !n.read).length,
      byType: {
        info: userNotifications.filter(n => n.type === 'info').length,
        warning: userNotifications.filter(n => n.type === 'warning').length,
        error: userNotifications.filter(n => n.type === 'error').length,
        success: userNotifications.filter(n => n.type === 'success').length
      }
    };
  }

  /**
   * 알림 필터링
   * @param {string} userId - 사용자 ID
   * @param {string} type - 알림 타입
   * @param {number} days - 최근 N일 (선택사항)
   */
  filterNotifications(userId, type, days = null) {
    let filtered = this.notifications.filter(n => 
      n.userId === userId && n.type === type
    );

    if (days) {
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - days);
      
      filtered = filtered.filter(n => 
        new Date(n.timestamp) >= cutoffDate
      );
    }

    return filtered;
  }

  /**
   * 일괄 삭제
   * @param {string} userId - 사용자 ID
   * @param {array} notificationIds - 삭제할 알림 ID들
   */
  deleteMultiple(userId, notificationIds) {
    const deleted = [];
    
    notificationIds.forEach(id => {
      const index = this.notifications.findIndex(n => 
        n.id === id && n.userId === userId
      );
      
      if (index > -1) {
        deleted.push(this.notifications.splice(index, 1)[0]);
      }
    });

    console.log(`🗑️  ${deleted.length}개 알림 삭제`);
    return deleted;
  }
}

// 싱글톤 인스턴스 (앱 전역에서 사용)
const notificationService = new NotificationService();

module.exports = { NotificationService, notificationService };
