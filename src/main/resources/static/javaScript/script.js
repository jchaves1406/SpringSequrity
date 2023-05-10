function userRegister() {
	var first_name = $("#first_name").val();
	var last_name = $("#last_name").val();
	var email = $("#email").val();
	var password = $("#password").val();

	let data = {
		firstname: first_name,
		lastname: last_name,
		email: email,
		password: password,
	};

	$.ajax({
		url: "/api/login/register",
		type: "POST",
		contentType: "application/json",
		dataType: "json",
		data: JSON.stringify(data),
		success: function (response) {
			console.log("Nombre: " + response.firstname);
			console.log("Token de autorización recibido: " + response.token);
			document.cookie = "token=" + response.token + "; max-age=3600";
			redirectIndex();
		},
		error: function (xhr, textStatus, errorThrown) {
			alert("No se ha encontrado el usuario.");
			console.log("Ha sucedido un error." + textStatus);
		},
	});
}

function userAuthenticate() {
	var datos = {
		email: "jesus.acero@correo.com",
		password: "12345",
	};

	$.ajax({
		url: "/api/login/authenticate",
		type: "POST",
		contentType: "application/json",
		dataType: "json",
		data: JSON.stringify(datos),
		success: function (response) {
			console.log("Nombre: " + response.firstname);
			console.log("ID: " + response.id);
			console.log("Token de autorización recibido: " + response.token);
			document.cookie = "token=" + response.token + "; max-age=3600";
		},
		error: function (xhr, textStatus, errorThrown) {
			console.log(
				"Error al enviar la solicitud de autenticación: " + textStatus
			);
		},
	});
}

function makeAuthenticatedRequest() {
	var token = getCookie("token");

	var mensaje = "Bienvenido a la aplicacion desde rol usuario (ROL_USER)";
	var mensajeDiv = document.getElementById("mensaje");

	$.ajaxSetup({
		headers: {
			Authorization: "Bearer " + token,
		},
	});

	$.ajax({
		url: "/api/demo-controller/p",
		type: "GET",
		success: function (response) {
			console.log("Respuesta exitosa:" + response);
			mensajeDiv.innerHTML = mensaje;
		},
		error: function (xhr, textStatus, errorThrown) {
			console.log("Error al enviar la solicitud:", textStatus);
			alert("Debe estar registrado para realizar la solicitud.");
			redirectLogin();
		},
	});
}

function getCookie(name) {
	var value = "; " + document.cookie;
	var parts = value.split("; " + name + "=");
	if (parts.length == 2) {
		return parts.pop().split(";").shift();
	}
}

function userAuthenticate2() {
	var email = $("#email").val();
	var password = $("#password").val();

	var data = {
		email: email,
		password: password,
	};

	$.ajax({
		url: "/api/login/authenticate",
		type: "POST",
		contentType: "application/json",
		dataType: "json",
		data: JSON.stringify(data),
		success: function (response) {
			console.log("Nombre: " + response.firstname);
			console.log("Token de autorización recibido: " + response.token);
			document.cookie = "token=" + response.token + "; max-age=3600";
			redirectIndex();
		},
		error: function (xhr, textStatus, errorThrown) {
			alert("user no registrado.");
			console.log(
				"Error al enviar la solicitud de autenticación: " + textStatus
			);
		},
	});
}

function init(token) {
	$.ajaxSetup({
		headers: {
			Authorization: "Bearer " + token,
		},
	});
	$.ajax({
		url: "/api/demo-controller/p",
		type: "GET",
		success: function (data) {
			console.log("Respuesta exitosa:", data);
			window.location.href = "/app/index.html"; // Cambia la URL para que apunte a la página de inicio de tu aplicación
		},
		error: function (xhr, textStatus, errorThrown) {
			console.log("Error al enviar la solicitud:", textStatus);
		},
	});
}

function redirectIndex() {
	window.location.href = "index.html";
}

function redirectLogin() {
	window.location.href = "login.html";
}

function redirectRegister() {
	window.location.href = "register.html";
}

function loadUsers() {
	var token = getCookie("token");

	$.ajaxSetup({
		headers: {
			Authorization: "Bearer " + token,
		},
	});

	$.ajax({
		url: "/api/users/all",
		type: "GET",
		success: function (users) {
			console.log(users);
			let listaHtml = "";
			for (let user of users) {
				let userHTML = `
          <tr>
            <td>${user.id}</td>
            <td>${user.firstname}</td>
            <td>${user.lastname}</td>
            <td>${user.email}</td>
          </tr>
        `;
				listaHtml += userHTML;
			}
			$("#users tbody").html(listaHtml);
		},
		error: function (xhr, textStatus, errorThrown) {
			console.log("Error al enviar la solicitud:", textStatus);
			alert("Debe estar registrado para realizar la solicitud.");
			redirectLogin();
		},
	});
}



$('#upload-btn').click(function() {
    var file = $('#file')[0].files[0];
    var formData = new FormData();
    formData.append('file', file);

    $.ajax({
        url: 'api/file/upload',
        type: 'POST',
        data: formData,
        processData: false,
        contentType: false,
        success: function() {
            alert('El archivo se cargó correctamente.');
        },
        error: function() {
            alert('Error al cargar el archivo.');
        }
    });
});