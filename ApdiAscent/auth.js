document.addEventListener('DOMContentLoaded', () => {
  if (window.netlifyIdentity) {
    netlifyIdentity.on('init', user => {
      const loginBtn = document.getElementById('login-btn');
      const logoutBtn = document.getElementById('logout-btn');

      if (!user) {
        if (window.location.pathname === '/auth.html') {
          netlifyIdentity.open(); // 🚀 Auto-open login/signup modal on auth.html
        } else {
          window.location.href = '/auth.html'; // 🚀 Redirect to auth.html if not logged in
        }
      } else {
        if (loginBtn && logoutBtn) {
          loginBtn.style.display = 'none';
          logoutBtn.style.display = 'inline-block';

          logoutBtn.addEventListener('click', () => {
            netlifyIdentity.logout();
          });

          netlifyIdentity.on('logout', () => {
            window.location.href = '/auth.html'; // 🚀 After logout, send back to auth.html
          });
        }
      }
    });

    netlifyIdentity.on('login', () => {
      window.location.href = '/'; // 🚀 After successful login, go to homepage
    });

    netlifyIdentity.init();
  }
});
