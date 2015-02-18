/*
<link rel="stylesheet" href="bower_components/bootstrap/dist/css/bootstrap.css" />
 <script src="bower_components/bootstrap/dist/js/bootstrap.js"></script>
 */
$(document).ready(function() {
    $("#formulario").validate({
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
                minlength: 4,
                remote: "php/validar_email.php" // dejo la ruta al php ya puesta
            },
            email2: {
                required: true,
                equalTo: email
            },
            nombreParticular: {
                required: true
            },
            nombreEmpresa: {
                required: true
            },
            nif: {
                required: true,
                nifES: true,
                remote: "php/validar_nif.php" // dejo la ruta ya puesta
            },
            cif: {
                required: true,
                cifES: true
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
                required: true,
                iban: true
            },
            usuario: {
                required: true,
                minlength: 4
            },
            contrasenia: {
                required: true,
                complejidad: true
            },
            contrasenia2: {
                required: true,
                equalTo: contrasenia
            }
        } // FIN DE RULES
    }); // FIN DE VALIDATE()

    // SI ES PARTICULAR, RELLENAR CAMPO DE NOMBRE(EN APARTADO FACTURACION) CON DATOS DE CONTACTO
    $("#apellidos").focusout(function() {
        if ($("#d_particular").is(":checked")) {
            var nombre = $("#nombre").val();
            var apellidos = $("#apellidos").val();

            $("#nombreParticular").val(nombre + " " + apellidos);
        }
    });


    // RELLENAR EL CODIGO POSTAL CON 0 A LA IZQUIERDA
    $("#cp").focusout(function() {
        var campoCP = $("#cp").val();
        var cont = 0;

        while (campoCP.length < 5) {
            campoCP = "0" + campoCP;
            cont++;
        }
        $("#cp").val(campoCP);

        // ARRAY PARA CODIGO POSTAL Y PROVINCIA
        var prov = new Array();
        prov[0] = "NO HAY PROVINCIA";
        prov[1] = "Alava";
        prov[2] = "Albacete";
        prov[3] = "Alicante";
        prov[4] = "Almeria";
        prov[5] = "Avila";
        prov[6] = "Badajoz";
        prov[7] = "Illes Balears";
        prov[8] = "Barcelona";
        prov[9] = "Burgos";
        prov[10] = "Caceres";
        prov[11] = "Cadiz";
        prov[12] = "Castellon";
        prov[13] = "Ciudad Real";
        prov[14] = "Cordoba";
        prov[15] = "A Coruña";
        prov[16] = "Cuenca";
        prov[17] = "Girona";
        prov[18] = "Granada";
        prov[19] = "Guadalajara";
        prov[20] = "Guipuzcoa";
        prov[21] = "Huelva";
        prov[22] = "Huesca";
        prov[23] = "Jaen";
        prov[24] = "Leon";
        prov[25] = "Lleida";
        prov[26] = "La Rioja";
        prov[27] = "Lugo";
        prov[28] = "Madrid";
        prov[29] = "Malaga";
        prov[30] = "Murcia";
        prov[31] = "Navarra";
        prov[32] = "Ourense";
        prov[33] = "Asturias";
        prov[34] = "Palencia";
        prov[35] = "Las Palmas";
        prov[36] = "Pontevedra";
        prov[37] = "Salamanca";
        prov[38] = "S.C. Tenerife";
        prov[39] = "Cantabria";
        prov[40] = "Segovia";
        prov[41] = "Sevilla";
        prov[42] = "Soria";
        prov[43] = "Tarragona";
        prov[44] = "Teruel";
        prov[45] = "Toledo";
        prov[46] = "Valencia";
        prov[47] = "Valladolid";
        prov[48] = "Vizcaya";
        prov[49] = "Zamora";
        prov[50] = "Zaragoza";
        prov[51] = "Ceuta";
        prov[52] = "Melilla";

        $cp = $("#cp").val();
        $zip = $cp.substr(0, 2);

        // Obtengo los 2 primeros numeros y cumplo condiciones para el codigo postal
        if ($zip == 00 || $cp < 1000 || $cp > 52999) {
            alert("Codigo postal erroneo");
 
        }

        // Para asociarlo mas facilmente con el array de provincias,
        // si zip tiene 0 en el primer caracter, lo quitamos
        if ($zip.substr(0, 1) == 0) {
            $zip = $cp.substr(1, 1);

        }

        // Ahora metemos el nombre de la provincia en su campo, que corresponde con su cp
        $("#provincia").val(prov[$zip]);

        // Ajax para consultar en la base de datos
        $.ajax({
            url: "php/cp.php",
            type: "POST",
            data: "zip=" + $("#cp").val(),
            success: function(a) {
                $("#localidad").html(a);
            }
        });

    }); // FIN DEL CP CON CEROS Y ASOCIACION


    // CAMPO DEL USUARIO SE RELLENA CON EL CAMPO DE EMAIL2
    $("#email2").focusout(function() {
        $("#usuario").val($("#email2").val());
    });

    // CADA VEZ QUE INTRODUZCO UNA TECLA EN EL INPUT DE CONTRASEÑA, OBTENGO UN VALOR DEL PLUGIN COMPLEXIFY
    $("#contrasenia").focusin(function() {

        $("#contrasenia").complexify({}, function(valid, complexity) {
            $("#nivelContrasenia").val(complexity);
        });
    });

    // CAMBIO CON BOTON, PARTICULAR - EMPRESA
    $("input:radio").click(function() {

        if ($("#d_particular").is(":checked")) {

            // PARTE DE CIF A NIF
            $("#lblcif").html("NIF:");
            $("#lblcif").attr({
                "for": "nif",
                "id": "lblnif"
            });
            $("#cif").attr({
                "name": "nif",
                "id": "nif"
            });

            // PARTE DE EMPRESA A NOMBRE
            $("#lblnombreEmpresa").html("Nombre:");
            $("#lblnombreEmpresa").attr({
                "for": "nombreParticular",
                "id": "lblnombreParticular"
            });
            $("#nombreEmpresa").attr({
                "name": "nombreParticular",
                "id": "nombreParticular"
            });
            $("#nombreParticular").val("");

        } // FIN DEL IF
        if ($("#d_empresa").is(":checked")) {

            // PARTE DE NIF A CIF LABEL
            $("#lblnif").html("CIF:");
            $("#lblnif").attr({
                "for": "cif",
                "id": "lblcif"
            });
            $("#nif").attr({
                "name": "cif",
                "id": "cif"
            });

            // PARTE DE NOMBRE A EMPRESA
            $("#lblnombreParticular").html("Empresa:");
            $("#lblnombreParticular").attr({
                "for": "nombreEmpresa",
                "id": "lblnombreEmpresa"
            });
            $("#nombreParticular").attr({
                "name": "nombreEmpresa",
                "id": "nombreEmpresa"
            });
            $("#nombreEmpresa").val("");

        } // FIN DEL IF
    }); // FIN DEL EVENTO CLICK DE INPUT RADIO


}); // FIN DEL DOCUMENT READY


jQuery.validator.addMethod("complejidad", function(value, element) {

    var barra = $("#nivelContrasenia").val();

    if (barra < 20) {
        return false;
    } else {
        return true;
    }
}, "Debe introducir una contraseña mas segura.");
