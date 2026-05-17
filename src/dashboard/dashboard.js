/**
 * Dashboard Module
 * 사용자 대시보드 기능
 */

class Dashboard {
  constructor(userId, options = {}) {
    this.userId = userId;
    this.widgets = [];
    this.layout = options.layout || 'grid';
    this.theme = options.theme || 'light';
    this.refreshInterval = options.refreshInterval || 5000; // 5초
    this.autoRefresh = options.autoRefresh !== false;
  }

  /**
   * 위젯 추가
   * @param {object} widget - 위젯 설정 { id, title, type, data }
   */
  addWidget(widget) {
    const defaultWidget = {
      id: `widget-${Date.now()}`,
      title: widget.title || 'Widget',
      type: widget.type || 'custom',
      size: widget.size || 'medium', // small, medium, large
      position: widget.position || null,
      data: widget.data || {},
      refreshable: widget.refreshable !== false,
      removable: widget.removable !== false
    };

    this.widgets.push(defaultWidget);
    console.log(`✓ 위젯 추가: ${defaultWidget.title}`);
    return defaultWidget;
  }

  /**
   * 위젯 제거
   * @param {string} widgetId - 위젯 ID
   */
  removeWidget(widgetId) {
    const index = this.widgets.findIndex(w => w.id === widgetId);
    if (index > -1) {
      const removed = this.widgets.splice(index, 1);
      console.log(`✓ 위젯 제거: ${removed[0].title}`);
      return removed[0];
    }
    return null;
  }

  /**
   * 위젯 업데이트
   * @param {string} widgetId - 위젯 ID
   * @param {object} updates - 업데이트할 데이터
   */
  updateWidget(widgetId, updates) {
    const widget = this.widgets.find(w => w.id === widgetId);
    if (widget) {
      Object.assign(widget, updates);
      console.log(`✓ 위젯 업데이트: ${widget.title}`);
    }
    return widget;
  }

  /**
   * 위젯 데이터 새로고침
   * @param {string} widgetId - 위젯 ID (생략 시 모두 새로고침)
   */
  async refreshWidget(widgetId = null) {
    if (widgetId) {
      const widget = this.widgets.find(w => w.id === widgetId);
      if (widget) {
        console.log(`🔄 위젯 새로고침: ${widget.title}`);
        return await this._fetchWidgetData(widget);
      }
    } else {
      console.log(`🔄 모든 위젯 새로고침...`);
      return await Promise.all(
        this.widgets.map(w => this._fetchWidgetData(w))
      );
    }
  }

  /**
   * 위젯 데이터 조회 (내부용)
   */
  async _fetchWidgetData(widget) {
    try {
      const response = await fetch(`/api/dashboard/widget/${widget.id}`);
      const data = await response.json();
      widget.data = data;
      widget.lastUpdated = new Date().toISOString();
      return data;
    } catch (error) {
      console.error(`위젯 데이터 조회 실패: ${widget.title}`, error);
      return null;
    }
  }

  /**
   * 레이아웃 변경
   * @param {string} layout - 레이아웃 타입 (grid, list, columns)
   */
  setLayout(layout) {
    this.layout = layout;
    console.log(`✓ 레이아웃 변경: ${layout}`);
  }

  /**
   * 테마 변경
   * @param {string} theme - 테마 (light, dark)
   */
  setTheme(theme) {
    this.theme = theme;
    console.log(`✓ 테마 변경: ${theme}`);
  }

  /**
   * 자동 새로고침 설정
   * @param {boolean} enabled - 활성화 여부
   */
  setAutoRefresh(enabled) {
    this.autoRefresh = enabled;
    if (enabled) {
      this._startAutoRefresh();
    } else {
      this._stopAutoRefresh();
    }
  }

  /**
   * 자동 새로고침 시작
   */
  _startAutoRefresh() {
    this.refreshTimer = setInterval(() => {
      this.refreshWidget();
    }, this.refreshInterval);
    console.log('✓ 자동 새로고침 시작');
  }

  /**
   * 자동 새로고침 중지
   */
  _stopAutoRefresh() {
    if (this.refreshTimer) {
      clearInterval(this.refreshTimer);
    }
    console.log('✓ 자동 새로고침 중지');
  }

  /**
   * 위젯 순서 변경
   * @param {string} widgetId - 위젯 ID
   * @param {number} newIndex - 새 위치
   */
  reorderWidget(widgetId, newIndex) {
    const currentIndex = this.widgets.findIndex(w => w.id === widgetId);
    if (currentIndex > -1 && newIndex >= 0 && newIndex < this.widgets.length) {
      const [widget] = this.widgets.splice(currentIndex, 1);
      this.widgets.splice(newIndex, 0, widget);
      console.log(`✓ 위젯 순서 변경: ${widget.title}`);
    }
  }

  /**
   * 대시보드 상태 저장
   */
  saveState() {
    const state = {
      userId: this.userId,
      layout: this.layout,
      theme: this.theme,
      widgets: this.widgets.map(w => ({
        id: w.id,
        title: w.title,
        type: w.type,
        size: w.size,
        position: w.position
      }))
    };

    // localStorage에 저장
    try {
      localStorage.setItem(`dashboard-${this.userId}`, JSON.stringify(state));
      console.log('✓ 대시보드 상태 저장됨');
    } catch (error) {
      console.error('대시보드 상태 저장 실패:', error);
    }

    return state;
  }

  /**
   * 대시보드 상태 복원
   */
  loadState() {
    try {
      const state = localStorage.getItem(`dashboard-${this.userId}`);
      if (state) {
        const parsed = JSON.parse(state);
        this.layout = parsed.layout;
        this.theme = parsed.theme;
        this.widgets = parsed.widgets;
        console.log('✓ 대시보드 상태 복원됨');
        return parsed;
      }
    } catch (error) {
      console.error('대시보드 상태 복원 실패:', error);
    }
    return null;
  }

  /**
   * 대시보드 초기화 (기본값으로)
   */
  reset() {
    this.widgets = [];
    this.layout = 'grid';
    this.theme = 'light';
    this._stopAutoRefresh();
    console.log('✓ 대시보드 초기화됨');
  }

  /**
   * 대시보드 정보 조회
   */
  getInfo() {
    return {
      userId: this.userId,
      layout: this.layout,
      theme: this.theme,
      widgetCount: this.widgets.length,
      widgets: this.widgets,
      autoRefresh: this.autoRefresh
    };
  }

  /**
   * 대시보드 내보내기 (JSON)
   */
  export() {
    return JSON.stringify(this.getInfo(), null, 2);
  }

  /**
   * 대시보드 제거
   */
  destroy() {
    this._stopAutoRefresh();
    this.widgets = [];
    console.log('✓ 대시보드 제거됨');
  }
}

module.exports = Dashboard;
