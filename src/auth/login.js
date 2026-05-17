/**
 * User Login Module
 * 사용자 로그인 기능
 */

// 로그인 폼 HTML
class LoginForm {
  constructor() {
    this.form = null;
    this.emailInput = null;
    this.passwordInput = null;
    this.loginBtn = null;
  }

  /**
   * 로그인 폼 초기화
   */
  init() {
    this.createForm();
    this.attachEventListeners();
  }

  /**
   * 로그인 폼 생성
   */
  createForm() {
    const formHTML = `
      <div class="login-container">
        <div class="login-box">
          <h2>사용자 로그인</h2>
          <form id="loginForm">
            <div class="form-group">
              <label for="email">이메일</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                placeholder="your@email.com"
                required
              />
              <span class="error-message" id="emailError"></span>
            </div>

            <div class="form-group">
              <label for="password">비밀번호</label>
              <input 
                type="password" 
                id="password" 
                name="password" 
                placeholder="••••••••"
                required
              />
              <span class="error-message" id="passwordError"></span>
            </div>

            <button type="submit" class="login-btn">로그인</button>
            <p class="signup-link">
              계정이 없으신가요? <a href="#signup">회원가입</a>
            </p>
          </form>
        </div>
      </div>
    `;

    document.body.innerHTML = formHTML;
    this.form = document.getElementById('loginForm');
    this.emailInput = document.getElementById('email');
    this.passwordInput = document.getElementById('password');
    this.loginBtn = this.form.querySelector('.login-btn');
  }

  /**
   * 이벤트 리스너 추가
   */
  attachEventListeners() {
    this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    this.emailInput.addEventListener('blur', () => this.validateEmail());
    this.passwordInput.addEventListener('blur', () => this.validatePassword());
  }

  /**
   * 이메일 유효성 검사
   */
  validateEmail() {
    const email = this.emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const errorEl = document.getElementById('emailError');

    if (!email) {
      errorEl.textContent = '이메일을 입력해주세요.';
      return false;
    }

    if (!emailRegex.test(email)) {
      errorEl.textContent = '올바른 이메일 형식이 아닙니다.';
      return false;
    }

    errorEl.textContent = '';
    return true;
  }

  /**
   * 비밀번호 유효성 검사
   */
  validatePassword() {
    const password = this.passwordInput.value;
    const errorEl = document.getElementById('passwordError');

    if (!password) {
      errorEl.textContent = '비밀번호를 입력해주세요.';
      return false;
    }

    if (password.length < 8) {
      errorEl.textContent = '비밀번호는 최소 8자 이상이어야 합니다.';
      return false;
    }

    errorEl.textContent = '';
    return true;
  }

  /**
   * 폼 제출 처리
   */
  handleSubmit(e) {
    e.preventDefault();

    if (!this.validateEmail() || !this.validatePassword()) {
      alert('입력 정보를 다시 확인해주세요.');
      return;
    }

    const credentials = {
      email: this.emailInput.value,
      password: this.passwordInput.value
    };

    this.login(credentials);
  }

  /**
   * 로그인 API 호출
   */
  async login(credentials) {
    try {
      this.loginBtn.disabled = true;
      this.loginBtn.textContent = '로그인 중...';

      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
      });

      const data = await response.json();

      if (response.ok) {
        console.log('로그인 성공:', data);
        // 토큰 저장
        localStorage.setItem('token', data.token);
        // 대시보드로 리디렉트
        window.location.href = '/dashboard';
      } else {
        alert(data.message || '로그인에 실패했습니다.');
      }
    } catch (error) {
      console.error('로그인 오류:', error);
      alert('로그인 중 오류가 발생했습니다.');
    } finally {
      this.loginBtn.disabled = false;
      this.loginBtn.textContent = '로그인';
    }
  }
}

// 페이지 로드 시 로그인 폼 초기화
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    const loginForm = new LoginForm();
    loginForm.init();
  });
} else {
  const loginForm = new LoginForm();
  loginForm.init();
}

module.exports = LoginForm;
