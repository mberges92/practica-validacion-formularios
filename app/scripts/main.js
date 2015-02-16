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
                minlength: 4
            },
            email2: {
            	required: true,
            	equalTo: email
            }


        }
    }); // FIN DE VALIDATE()
}); // FIN DE READY()
