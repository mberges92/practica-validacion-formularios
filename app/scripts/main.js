$(document).ready(function() {
    $("#formulario").validate({
        debug: true,
        rules: {
            nombre: "required",
            apellidos: "required",
            telefono: {
                required: true,
                digits: true,
                minlength: 9,
                maxlength: 9
            },
            email: {
                required: true,
                email: true,
                remote: "php/validar_email.php" // dejo la ruta al php ya puesta
            },
            email2: {
                required: true,
                equalTo: email
            },
            nombreEmpresa: {
                required: true
            },
            nif: {
                required: true,
                remote: "php/validar_nif.php"  // dejo la ruta ya puesta
            },
            cif: {
                required: true
            },
            direccion: {
                required: true
            },
            cp: {
                required: true,
                digits: true,
                maxlength: 5,
                minlength: 5
            },
            iban: {
                required: true
            },
            usuario: {
                required: true,
                minlength: 4
            },
            contrasenia: {
                required: true,
            },
            contrasenia2: {
                required: true,
                equalTo: contrasenia
            }
        } // FIN DE RULES
    }); // FIN DE VALIDATE()
}); // FIN DE READY()
