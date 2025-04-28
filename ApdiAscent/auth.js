document.addEventListener('DOMContentLoaded', () => {
  if (window.netlifyIdentity) {
    netlifyIdentity.on('init', user => {
      if (!user) {
        window.location.href = '/auth.html'; // 🚀 Force redirect if not logged in
      } else {
        const loginBtn = document.getElementById('login-btn');
        const logoutBtn = document.getElementById('logout-btn');

        if (loginBtn && logoutBtn) {
          loginBtn.style.display = 'none';
          logoutBtn.style.display = 'inline-block';

          logoutBtn.addEventListener('click', () => {
            netlifyIdentity.logout();
          });

          netlifyIdentity.on('logout', () => {
            window.location.href = '/auth.html';
          });
        }
      }
    });
    netlifyIdentity.init();
  }
});
