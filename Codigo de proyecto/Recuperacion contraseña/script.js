// Recuperación de contraseña
document.getElementById("emailForm")?.addEventListener("submit", function(event) {
    event.preventDefault();
    const email = document.getElementById("email").value;
    const emailError = document.getElementById("emailError");

    emailError.textContent = "";

    if (email.includes("@")) {
        document.getElementById("emailSection").style.display = "none";
        document.getElementById("recoverySection").style.display = "block";

        setTimeout(() => {
            document.getElementById("recoverySection").style.display = "none";
            document.getElementById("resetSection").style.display = "block";

            // **IMPORTANTE:** Asegurar que los inputs sean editables
            document.getElementById("newPassword").removeAttribute("disabled");
            document.getElementById("confirmPassword").removeAttribute("disabled");

        }, 2000);
    } else {
        emailError.textContent = "Ingresa un correo válido.";
    }
});

// Validar la nueva contraseña y confirmarla
document.getElementById("resetForm")?.addEventListener("submit", function(event) {
    event.preventDefault();
    const newPassword = document.getElementById("newPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const passwordError = document.getElementById("passwordError");
    const confirmPasswordError = document.getElementById("confirmPasswordError");

    passwordError.textContent = "";
    confirmPasswordError.textContent = "";

    if (newPassword.length < 6) {
        passwordError.textContent = "La contraseña debe tener al menos 6 caracteres.";
        return;
    }

    if (newPassword === confirmPassword) {
        alert("Contraseña actualizada correctamente.");
        window.location.href = "index.html";
    } else {
        confirmPasswordError.textContent = "Las contraseñas no coinciden.";
    }
});

// Función para mostrar/ocultar la contraseña
function togglePassword(fieldId) {
    const field = document.getElementById(fieldId);
    field.type = field.type === "password" ? "text" : "password";
}

