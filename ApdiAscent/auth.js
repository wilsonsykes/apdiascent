
document.addEventListener("DOMContentLoaded", () => {
  const auth = window.firebaseAuth;

  document.getElementById("login-btn").addEventListener("click", async () => {
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;
    try {
      await signInWithEmailAndPassword(auth, email, password);
      document.getElementById("auth-status").textContent = "Login successful!";
      window.location.href = "/";
    } catch (error) {
      document.getElementById("auth-status").textContent = error.message;
    }
  });
});
