"use strict"


//Variable para saber el nombre , para poder comenzar y finalizar el cuestionario 
var nombre ="";

//Variable para saber en que pagina del cuestionario estoy situado 
var pagina = 0; 
//Array para recorrer las paginas del cuestionario
var arrayPaginas = document.getElementsByClassName("pagina");

//creo una funcion que muestra la pagina del formulario que estoy para no repetir tanto el codigo 
//Recibe la pagina actual y un numero que indica cuanto quiero desplazarme 
function mostrarPagina(numeroDeLaPagina,num){
	//Oculto la pagina actual 
  	arrayPaginas[pagina].style.display = "none";
  	//Sumo (o resto si es negativo) la  pagina en la que estoy 
  	numeroDeLaPagina = numeroDeLaPagina + (num) ;
  	//Muestro la nueva pagina actual  
  	arrayPaginas[numeroDeLaPagina].style.display = "block";
  	//Vuelvo a la posicion de la pagina inicial para no tener que subir en cada pagina para contestar 
  	window.scrollTo(0, 0);
  	//Devuelvo el nuevo valor del numero de pagina 
  	return numeroDeLaPagina;
}

//Funcion para la visibilidad de los botones Anterior y siguiente 
function botAntSig(){

	//Si es alguno de los botones de el medio , se muestran ambos
	if(pagina>0 && pagina< arrayPaginas.length){
		$("#butAnt").show();
		$("#butSig").show();
	}

	//Si es la primer pagina , se oculta el boton anterior y se muestra el siguiente
	if(pagina==0){
	 		$("#butAnt").hide();
	 		$("#butSig").show();
	}

	//Si es la ultima , se oculta el boton siguiente y se muestra el anterior
	if(pagina== arrayPaginas.length-1){
	 		$("#butSig").hide();
	 		$("#butAnt").show();
	}
}



//cree un par de funciones para no repetir codigo al finalizar 

function paraRadio (id){
	//Comprueba si el radio button esta seleccionado 
	if(id.prop("checked")){
		//De ser asi suma un punto y pone el fondo en verde (El parent() usa Traversing del padre directo del radio)
		puntuacion++;
		id.parent().css( "background", "#99ff82" );
		//de lo contrario pone el fondo rojo
	}else{
		id.parent().css( "background", "#ff8282" );
	}
}

//paso el id y donde esta la respuesta correcta 
function paraSelect(id,posicion){
	//si coincide ,color verde para el fondo y un punto mas 
	if(id.selectedIndex == posicion){
		puntuacion++;
		id.style.backgroundColor = "#99ff82";
		id.options[posicion].style.color = "blue"; 
		//sino , color rojo para la respuesta correcta 
	}else{
		//id.style.backgroundColor = "#ff8282";
		id.options[posicion].style.backgroundColor = "#ff8282"; 
	} 
}




//Al seleccionar el cuadro de texto del usuario se borra le nombre para ingresar uno nuevo
$("#boxUs").focus(function() {
	$("#boxUs").css({"color":"black"});
	$("#boxUs").val("");

});

//para que funcione el boton comenzar:
$("#butIn").click(function(){
	
	nombre = $("#boxUs").val();
	//Si no completan el nombre sale un mensaje de advertencia (y el cuestionario se esconde en caso que borraran el nombre)  
	if(nombre == "" || nombre == "EJ:Edward Nygma"){
		$("#nomError").html("Forastero identificate!" + "<br/>" + "<br/>" );
		$("#cuestionario").hide();
		return false;
	}else{
		$("#nomError").html("");
	}

	//Si completaron el nombre 
	$("#cuestionario").show();
	$("footer").show();
	//En la primer pagina
	mostrarPagina(pagina,0);
	botAntSig();
});


$("#butUno").click(function(){
	pagina = mostrarPagina (0,0);
	//$("#butAnt").hide();
	botAntSig();
});

$("#butDos").click(function(){
	pagina = mostrarPagina (1,0);	
	botAntSig();
});

$("#butTres").click(function(){
	pagina = mostrarPagina (2,0);
	$("#butAnt").hide();
	botAntSig();
});

$("#butCuatro").click(function(){
	pagina = mostrarPagina (3,0);
	$("#butAnt").hide();
	botAntSig();
});


$("#butSig").click(function(){
	//Si la pagina es anterior a la ultima , paso una pagina 
	if(pagina < arrayPaginas.length-1){
		pagina=  mostrarPagina(pagina,1);		
	}
	botAntSig();
});

$("#butAnt").click(function(){
	if(pagina > 0){
		pagina = mostrarPagina(pagina,-1);
	}
	botAntSig();	
});

var puntuacion = 0;


//Boton Finalizar , muestra las respuestas correctas , las incorrectas y devuelve un resultado  
$("#butFin").click(function(){

	//comienza la puntuacion inicial en 0 
	puntuacion = 0;
	//Para saber cuantas preguntas hice en total   
	var arrayPreguntas = document.getElementsByClassName("pregunta");
	//Agrego un mensaje segun la puntuacion 
	var msj ="";

	//arrayPaginas[pagina].style.display = "none";
	pagina = mostrarPagina(4,0);
	botAntSig();

	//Checkeo en cada pregunta si contesto bien se suma un punto y se colorea en verde
	//Sino se marca en rojo.
	//De ser posible uso las funciones que defini previamente

	//if(document.getElementById("preg1JG").checked){
	paraRadio($("#preg1JG"));
	paraSelect(document.getElementById("SuperCiudad"),"4");
	//$("#metro").css("background", "#99ff82");

	//Es un if mas grande porque para que este bien la respuesta tiene que seleccionar varias respuestas correctas en simultaneo 
	if(document.getElementById("cbJL1").checked && document.getElementById("cbJL4").checked){
		puntuacion++;
		$("#cbJL1").parent().css( "background", "#99ff82" );
		$("#cbJL4").parent().css( "background", "#99ff82" );
	}else{
		$("#cbJL1").parent().css( "background", "#ff8282" );
		$("#cbJL4").parent().css( "background", "#ff8282" );
	}

	paraRadio($("#pregDM3"));	
	paraSelect(document.getElementById("superLogo"),"8");


	if(document.getElementById("cbJT1").checked && document.getElementById("cbJT3").checked && document.getElementById("cbJT5").checked){
		puntuacion++;
		$("#cbJT1").parent().css( "background", "#99ff82" );
		$("#cbJT3").parent().css( "background", "#99ff82" );
		$("#cbJT5").parent().css( "background", "#99ff82" );

	}else{
		$("#cbJT1").parent().css( "background", "#ff8282" );
		$("#cbJT3").parent().css( "background", "#ff8282" );
		$("#cbJT5").parent().css( "background", "#ff8282" );
	}

	paraRadio($("#pregMM3"));	
	paraSelect(document.getElementById("victorStone"),"4");

	if(document.getElementById("cbES1").checked && document.getElementById("cbES6").checked && document.getElementById("cbES8").checked){
		puntuacion++;
		$("#cbES1").parent().css( "background", "#99ff82" );
		$("#cbES6").parent().css( "background", "#99ff82" );
		$("#cbES8").parent().css( "background", "#99ff82" );

	}else{
		$("#cbES1").parent().css( "background", "#ff8282" );
		$("#cbES6").parent().css( "background", "#ff8282" );
		$("#cbES8").parent().css( "background", "#ff8282" );
	}

	paraRadio($("#pregHQ4"));
	paraSelect(document.getElementById("victorFries"),"6");

	if(document.getElementById("cbVG1").checked && document.getElementById("cbVG2").checked && document.getElementById("cbVG3").checked
		&& document.getElementById("cbVG4").checked && document.getElementById("cbVG5").checked
		&& document.getElementById("cbVG6").checked && document.getElementById("cbVG7").checked
		&& document.getElementById("cbVG8").checked && document.getElementById("cbVG9").checked
		&& document.getElementById("cbVG10").checked ){
		puntuacion++;
		$("#cbVG1").parent().css( "background", "#99ff82" );
		$("#cbVG2").parent().css( "background", "#99ff82" );
		$("#cbVG3").parent().css( "background", "#99ff82" );
		$("#cbVG4").parent().css( "background", "#99ff82" );
		$("#cbVG5").parent().css( "background", "#99ff82" );
		$("#cbVG6").parent().css( "background", "#99ff82" );
		$("#cbVG7").parent().css( "background", "#99ff82" );
		$("#cbVG8").parent().css( "background", "#99ff82" );
		$("#cbVG9").parent().css( "background", "#99ff82" );
		$("#cbVG10").parent().css( "background", "#99ff82" );
		

	}else{
		$("#cbVG1").parent().css( "background", "#ff8282" );
		$("#cbVG2").parent().css( "background", "#ff8282" );
		$("#cbVG3").parent().css( "background", "#ff8282" );
		$("#cbVG4").parent().css( "background", "#ff8282" );
		$("#cbVG5").parent().css( "background", "#ff8282" );
		$("#cbVG6").parent().css( "background", "#ff8282" );
		$("#cbVG7").parent().css( "background", "#ff8282" );
		$("#cbVG8").parent().css( "background", "#ff8282" );
		$("#cbVG9").parent().css( "background", "#ff8282" );
		$("#cbVG10").parent().css( "background", "#ff8282" );
	}


	//Luego de saber la puntuacion total defino el msj 
	if( (arrayPreguntas.length/puntuacion) >2 ){
		msj="ouch " + nombre + " :/ ";
	}else{
		msj="Felicidades " + nombre +" eres una persona de cultura ;)";
	}

	//Y lo muestro en la pagina 
	$("#puntuacion").html("Contesto bien " + puntuacion+" de " + arrayPreguntas.length +" preguntas <br> " + msj);
	

});


//CAmbiar "finalizar" por "puntuacion"

//Agregar tres preguntas mas 

//Unir con radios