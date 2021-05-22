"use strict"

//Variable para saber en que pagina del cuestionario estoy situado 
var pagina = 0; 
//Array para recorrer las paginas del cuestionario
var arrayPaginas = document.getElementsByClassName("pagina");

//creo una funcion que muestra la pagina del formulario que estoy para no repetir tanto el codigo 

function mostrarPagina(numeroDeLaPagina){
	var arrayPaginas = document.getElementsByClassName("pagina");
  	arrayPaginas[numeroDeLaPagina].style.display = "block";
}

//Variable para saber el nombre , para poder comenzar y finalizar el cuestionario 
var nombre ="";


//Al seleccionar el cuadro de texto del usuario se borra le nombre para ingresar uno nuevo
$("#boxUs").focus(function() {
	$("#boxUs").css({"color":"black"});
	$("#boxUs").val("");

});

//para que funcione el boton comenzar:
$("#butIn").click(function(){
	
	nombre = $("#boxUs").val();
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
	arrayPaginas[pagina].style.display= "none";
	
	//Si la pagina es anterior a la ultima , paso una pagina 
	if(pagina < arrayPaginas.length-1){
		pagina = pagina + 1; 
		document.documentElement.scrollTop = 0;
	}

	//Muestro la pagina actual (si no avance muestro la pagina que estaba inicialmente)
	mostrarPagina(pagina)
});

//Boton anterior muestra (si hay) la pagina anterior
$("#butAnt").click(function(){

	//Hago que oculte la pagina actual 
	var arrayPaginas = document.getElementsByClassName("pagina");
	arrayPaginas[pagina].style.display= "none";
	
	//Si la pagina es la siguiente a la primera , vuelvo una pagina 
	if(pagina > 0){
		pagina = pagina - 1; 
		document.documentElement.scrollTop = 0;
	}

	//Muestro la pagina actual (si no retrocedi muestro la pagina que estaba inicialmente)
	mostrarPagina(pagina)
});



//Boton Finalizar , muestra las respuestas correctas , las incorrectas y devuelve un resultado  
$("#butFin").click(function(){
	//comienza la puntuacion inicial en 0 
	var puntuacion = 0;
	//Para saber cuantas preguntas hice en total   
	var arrayPreguntas = document.getElementsByClassName("pregunta");
	//Agrego un mensaje segun la puntuacion 
	var msj ="";



	arrayPaginas[pagina].style.display= "none";
	pagina = 3;
	arrayPaginas[pagina].style.display = "block";

	// checkeo en cada pregunta si contesto bien se suma un punto.
	if(document.getElementById("preg1JG").checked){
		puntuacion++;
	}

	
	if(document.getElementById("SuperCiudad").selectedIndex == "4"){
		puntuacion++;
	}

	if(document.getElementById("cbJL1").checked && document.getElementById("cbJL4").checked){
		puntuacion++;
	}


	if(document.getElementById("pregDM3").checked){
		puntuacion++;
	}


	if(document.getElementById("superLogo").selectedIndex == "8"){
		puntuacion++;
	}

	if(document.getElementById("cbJT1").checked && document.getElementById("cbJT3").checked && document.getElementById("cbJT5").checked){
		puntuacion++;
	}

	if(document.getElementById("pregMM3").checked){
		puntuacion++;
	}


	if(document.getElementById("victorStone").selectedIndex == "4"){
		puntuacion++;
	}




	//Luego de saber la puntuacion total defino el msj 
	if( (arrayPreguntas.length/puntuacion) >2 ){
		msj="ouch " + nombre + " :/ ";
	}else{
		msj="Felicidades " + nombre +" eres una persona de cultura ;)";
	}


	$("#puntuacion").html("Contesto bien " + puntuacion+" de " + arrayPreguntas.length +" preguntas <br> " + msj);

});