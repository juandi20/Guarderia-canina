// --- Modelo (Model) ---
class Cliente {
    constructor(nombre, documento, ciudad, direccion, celular, email, confirmar_email, contraseña, confirmar_contraseña) {
        this.nombre = nombre;
        this.documento = documento;
        this.ciudad = ciudad;
        this.direccion = direccion;
        this.celular = celular;
        this.email = email;
        this.confirmar_email = confirmar_email;
        this.contraseña = contraseña;
        this.confirmar_contraseña = confirmar_contraseña;
    }
}

// --- Vista (View) ---
class ClienteView {
    constructor() {
        this.clienteForm = document.getElementById('clienteForm');
        this.nombreInput = document.getElementById('nombre');
        this.documentoInput = document.getElementById('documento');
        this.ciudadInput = document.getElementById('ciudad');
        this.direccionInput = document.getElementById('direccion');
        this.celularInput = document.getElementById('celular');
        this.emailInput = document.getElementById('email');
        this.confirmar_emailInput = document.getElementById('confirmar_email');
        this.contraseñaInput = document.getElementById('contraseña');
        this.confirmar_contraseñaInput = document.getElementById('confirmar_contraseña');
        this.ClienteList = document.getElementById('ClienteList');
        this.errorMessage = document.createElement('p'); // Para el mensaje de error
    }

    renderClienteList(clientes) {
        this.ClienteList.innerHTML = '';
        clientes.forEach(cliente => {
            const li = document.createElement('li');
            li.textContent = `${cliente.nombre} - ${cliente.documento} - ${cliente.ciudad} - ${cliente.direccion} - ${cliente.celular} - ${cliente.email} - ${cliente.confirmar_email} - ${cliente.contraseña} - ${cliente.confirmar_contraseña}`;
            this.ClienteList.appendChild(li);
        });
    }

    // Método para mostrar el mensaje de error
    showError(message) {
        this.errorMessage.textContent = message;
        this.errorMessage.style.color = 'red';
        this.clienteForm.appendChild(this.errorMessage);
    }

    // Método para limpiar el mensaje de error
    clearError() {
        if (this.errorMessage) {
            this.errorMessage.remove();
        }
    }
}

// --- Controlador (Controller) ---
class ClienteController {
    constructor() {
        this.clientes = []; // Array para almacenar los clientes
        this.view = new ClienteView();
        this.view.clienteForm.addEventListener('submit', this.handleFormSubmit.bind(this));
    }

    handleFormSubmit(event) {
        event.preventDefault(); // Prevenir el envío del formulario

        // Recogemos los datos del formulario
        const nombre = this.view.nombreInput.value;
        const documento = this.view.documentoInput.value;
        const ciudad = this.view.ciudadInput.value;
        const direccion = this.view.direccionInput.value;
        const celular = this.view.celularInput.value;
        const email = this.view.emailInput.value;
        const confirmar_email = this.view.confirmar_emailInput.value;
        const contraseña = this.view.contraseñaInput.value;
        const confirmar_contraseña = this.view.confirmar_contraseñaInput.value;

        // Validamos si las contraseñas son iguales
        if (!this.validarContraseñas(contraseña, confirmar_contraseña)) {
            this.view.showError('Por favor verifique que las contraseñas coicidan.'); // Muestra un mensaje de error
            return; // No continúa con el proceso si las contraseñas no coinciden
        }

        // Validamos si los correos son iguales
        if (!this.validarEmails(email, confirmar_email)) {
            this.view.showError('Por favor verifique que los correos coicidan.'); // Muestra un mensaje de error
            return; // No continúa con el proceso si los correos no coinciden
        }

        // Si las contraseñas y correos son iguales, limpiamos el mensaje de error
        this.view.clearError();

        // Creamos una nueva instancia del cliente
        const cliente = new Cliente(nombre, documento, ciudad, direccion, celular, email, confirmar_email, contraseña, confirmar_contraseña);

        // Añadimos el cliente al array
        this.clientes.push(cliente);
        
        // Actualizamos la lista de clientes en la vista
        this.view.renderClienteList(this.clientes);

        // Limpiamos el formulario
        this.view.clienteForm.reset();
    }

    // Funciónes para la validacion

    validarContraseñas(contraseña, confirmar_contraseña) {
        return contraseña === confirmar_contraseña; // Retorna true si son iguales, de lo contrario false
    }
    validarEmails(email, confirmar_email) {
        return email === confirmar_email; 
    }
}

// --- Inicialización ---
const clienteController = new ClienteController();









