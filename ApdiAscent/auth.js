const identityScript = document.createElement('script');
identityScript.src = 'https://identity.netlify.com/v1/netlify-identity-widget.js';
document.head.appendChild(identityScript);

identityScript.onload = () => {
  if (window.netlifyIdentity) {
    netlifyIdentity.on('init', user => {
      if (!user) {
        netlifyIdentity.on('login', () => {
          document.location.href = "/";
        });
      }
    });
    netlifyIdentity.init();

    document.addEventListener('DOMContentLoaded', () => {
      const loginBtn = document.getElementById('login-btn');
      const logoutBtn = document.getElementById('logout-btn');

      function updateUI(user) {
        if (user) {
          loginBtn.style.display = 'none';
          logoutBtn.style.display = 'inline-block';
        } else {
          loginBtn.style.display = 'inline-block';
          logoutBtn.style.display = 'none';
        }
      }

      netlifyIdentity.on('login', user => {
        updateUI(user);
        location.reload();
      });

      netlifyIdentity.on('logout', () => {
        updateUI(null);
        location.reload();
      });

      loginBtn.addEventListener('click', () => netlifyIdentity.open());
      logoutBtn.addEventListener('click', () => netlifyIdentity.logout());

      netlifyIdentity.on('init', user => updateUI(user));
    });
  }
};
