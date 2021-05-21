"use strict"

//Variable para saber en que pagina del cuestionario estoy situado 
var pagina = 0; 

//creo una funcion que muestra la pagina del formulario que estoy para no repetir tanto el codigo 

function mostrarPagina(numeroDeLaPagina){
	var arrayPaginas = document.getElementsByClassName("pagina");
  	arrayPaginas[numeroDeLaPagina].style.display = "block";
}



//Al seleccionar el cuadro de texto del usuario se borra le nombre para ingresar uno nuevo
$("#boxUs").focus(function() {
	$("#boxUs").css({"color":"black"});
	$("#boxUs").val("");

});

//para que funcione el boton comenzar:
$("#butIn").click(function(){
	
	var nombre = $("#boxUs").val();
	//tienen que ingresarme un nombre 
	if(nombre == "" || nombre == "EJ:Edward Nygma"){
		$("#nomError").html("Forastero identificate!" + "<br/>" + "<br/>" );
		return false;
	}else{
		$("#nomError").html("");
	}


	//y tienen que elegir un radio para elegir un cuestionario 
	var facs = document.getElementById("facs");


	if(document.getElementById("rHeroes").checked) {
	  	$("#facs").html("Candidato para la liga de la justicia");
		$("#facs").css({"color":"black"});
	}//seleccionan el radio villanos 
	else if(document.getElementById("rVillanos").checked) {
  		$("#facs").html("Nuevo recluta del Escuadron Suicida");
		$("#facs").css({"color":"black"});
  	//Si no seleccionan ningun radio 
	}else if( !(document.getElementById("rVillanos")).checked && !(document.getElementById("rHeroes").checked)  ) {
		$("#facs").html("Es peligroso enfrentar este mundo solo ,por favor elige una faccion");
		$("#facs").css({"color":"red"});
		return false;
	}


	//Si completaron el nombre y eligieron el radio aparece el formulario 
	$("#cuestionario").show();
	mostrarPagina(pagina);

});



//Boton siguiente muestra (si hay) la pagina siguiente 
$("#butSig").click(function(){

	//Hago que oculte la pagina actual 
	var arrayPaginas = document.getElementsByClassName("pagina");
	arrayPaginas[pagina].style.display= "none";
	
	//Si la pagina es anterior a la ultima , paso una pagina 
	if(pagina < arrayPaginas.length-1){
		pagina = pagina + 1; 
	}

	//Muestro la pagina actual (si no avance muestro la pagina que estaba inicialmente)
	arrayPaginas[pagina].style.display = "block";
});

//Boton anterior muestra (si hay) la pagina anterior
$("#butAnt").click(function(){

	//Hago que oculte la pagina actual 
	var arrayPaginas = document.getElementsByClassName("pagina");
	arrayPaginas[pagina].style.display= "none";
	
	//Si la pagina es la siguiente a la primera , vuelvo una pagina 
	if(pagina > 0){
		pagina = pagina - 1; 
	}

	//Muestro la pagina actual (si no retrocedi muestro la pagina que estaba inicialmente)
	arrayPaginas[pagina].style.display = "block";

});