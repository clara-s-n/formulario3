import { validateField, setupFormValidation } from '../validations/fieldValidations.js';
import  Persona  from '../models/persona.js';
import {initNavbar} from "../navbar/navbar.js";

initNavbar()
const form = document.getElementById('registroForm');
const registrarBtn = document.getElementById('registrarBtn');
const cancelarBtn = document.getElementById('cancelarBtn');
const listadoBtn = document.getElementById('listadoBtn');

// Set up form validation
setupFormValidation('registroForm');

// Function to use the cancel and list buttons
cancelarBtn.addEventListener('click', function (e) {
    e.preventDefault();
    window.location.href = '/';
});

listadoBtn.addEventListener('click', function (e) {
    e.preventDefault();
    window.location.href = './peopleList/index.html';
});

// Logic for registering people
const API_URL = 'https://localhost/backend/personas';

registrarBtn.addEventListener('click', async function (e) {
    e.preventDefault();
    let isValid = true;

    form.querySelectorAll('input').forEach(input => {
        if (!validateField(input, form)) {
            isValid = false;
        }
    });

    if (isValid) {
        // Create a FormData object
        const formData = new FormData(form);
        console.log({ formData });

        try {
            const response = await fetch(`${API_URL}`, {
                method: 'POST',
                body: formData, // Send formData directly
            });

            if (response.ok) {
                alert('Registro exitoso');
                window.location.href = '/';
            } else {
                const errorData = await response.json();
                alert(`Error al registrar la persona: ${errorData.error || 'Error desconocido'}`);
            }
        } catch (error) {
            console.error('Error al registrar la persona:', error);
            alert('Error al registrar la persona');
        }
    } else {
        const firstInvalidInput = form.querySelector('.invalid');
        firstInvalidInput?.scrollIntoView({ behavior: 'smooth' });
        firstInvalidInput?.focus();
    }
});

/*
async function doPost(event) {
    event.preventDefault();
    console.log("doPost ejecutando");
    const form = document.getElementById("registroForm");
    const formData = new FormData(form);
    console.log({ formData });

    try {
      const response = await fetch("backend/post/multipart", {
        // headers: {
        //   ContentType: "multipart/form-data",
        // },
        method: "POST",
        body: formData,
      });
      const result = await response.json();

      if (response.ok) {
        console.info(result);
      } else {
        console.error(result);
      }
    } catch (error) {
      console.error("Error:", error);
    }
}*/