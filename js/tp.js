"use strict"


//Variable para saber en que pagina del cuestionario estoy situado 
var pagina = 0; 
//Array para recorrer las paginas del cuestionario
var arrayPaginas = document.getElementsByClassName("pagina");

//creo una funcion que muestra la pagina del formulario que estoy para no repetir tanto el codigo 
//Recibe la pagina donde quiero posicionarme 
function mostrarPagina(numeroDeLaPagina){
	//Oculto la pagina actual 
  	arrayPaginas[pagina].style.display = "none";
  	//Muestro la nueva pagina actual  
  	arrayPaginas[numeroDeLaPagina].style.display = "block";
  	//Vuelvo a la posicion de la pagina inicial para no tener que subir en cada pagina para contestar 
  	window.scrollTo(0, 0);
  	//Devuelvo el nuevo valor del numero de pagina 
  	return numeroDeLaPagina;
  	//otra opcion era ya poner el "pagina = numeroDeLaPagina" y no devolver nada 
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

	//Si es la ultima pagina de preguntas o la pagina de puntuacion (ultima de todas) , se oculta el boton siguiente y se muestra el anterior
	if(pagina== arrayPaginas.length-2 || pagina== arrayPaginas.length-1 ){
	 		$("#butSig").hide();
	 		$("#butAnt").show();
	}
}

//cree un par de funciones para no repetir codigo al finalizar 

function paraRadio2 (clase,indCorrecta){

	//creo una coleccion con todas las respuestas de la pregunta
	var recorriendo = clase;
	//Compruebo si el radio button correcto esta seleccionado 
	if(recorriendo.eq(indCorrecta).prop("checked")){
		//De ser asi suma un punto y pone el fondo en verde (El parent() usa Traversing del padre directo del radio)
		puntuacion++;
		recorriendo.eq(indCorrecta).parent().css( "background", "#99ff82" );
	//de lo contrario
	}else{
		//recorro las opciones
		for (var i = 0  ; i < recorriendo.length; i++) {
			//checkeo si hay alguna incorrectamente tildada 
			if (recorriendo.eq(i).prop("checked")) {
				//Y la marco en rojo
				recorriendo.eq(i).parent().css("background", "#ff8282");
			} 
		}
		//Marco en naranja la que deberia haber seleccionado
		recorriendo.eq(indCorrecta).parent().css( "background", "orange" );
	}
}

/*Como tengo imagenes arme diferente el Html , asi que coloreo de otra forma*/
function paraRadioImg (clase,indCorrecta){

	//Para marcar utilizo el mismo metodo que el radio anterior
	var recorriendo = clase;
	if(recorriendo.eq(indCorrecta).prop("checked")){
		//El traversing cambio , ahora busco la imagen que esta dentro del label (elemento hijo del elemento siguiente)
		puntuacion++;
		recorriendo.eq(indCorrecta).next().children().css( "box-shadow", "0 0 7px 5px #99ff82" );
	}else{
		for (var i = 0  ; i < recorriendo.length; i++) {
			if (recorriendo.eq(i).prop("checked")) {
				recorriendo.eq(i).next().children().css( "box-shadow", "0 0 7px 5px #ff8282");
			} 
		}
		recorriendo.eq(indCorrecta).next().children().css(  "box-shadow", "0 0 7px 5px orange" );
	}
}

//paso el id del select y donde esta la respuesta correcta 
function paraSelect(id,posicion){
	//si coincide ,color verde para el fondo y un punto mas 
	if(id.selectedIndex == posicion){
		puntuacion++;
		id.options[posicion].style.color = "blue"; 
		id.options[posicion].style.backgroundColor = "#99ff82"; 
		//Cambio de color el borde para que el usuario sepa si contesto bien o mal sin tener que expandir el select 
		id.style.border = "5px solid #99ff82";
	//sino , color rojo para la respuesta correcta 
	}else{
		id.options[id.selectedIndex].style.backgroundColor = "#ff8282"; 
		id.options[posicion].style.backgroundColor = "orange"; 
		id.options[posicion].style.color = "blue"; 
		id.style.border = "5px solid #ff8282";
	} 
}

//Paso una coleccion con todos los checkbox de la pregunta y una coleccion solo con las respuestas ; 
function paraCheckBox(todasRespuestas , respuestasCorrectas){
	var bien = true;
	var i ;
	var totalBien = respuestasCorrectas.length; // cuantas respuestas correctas hay en total 
	//Recorro todas las respuestas
	for ( i = 0 ; i < todasRespuestas.length; i++) {
		//La que este tiladada la coloreo en rojo 
		if(todasRespuestas.eq(i).prop("checked")){ 
			todasRespuestas.eq(i).parent().css( "background", "#ff8282" );
			totalBien--;	
		}
	}

	//veo las respuestas correctas
	for ( i = 0 ; i < respuestasCorrectas.length; i++) {
		//En la coleccion de todas las respuestas me ubico en las correctas
		if(!todasRespuestas.eq(respuestasCorrectas[i]).prop("checked")){
			//Si alguna no esta seleccionada , la marco como respuesta correcta no seleccionada 
			todasRespuestas.eq(respuestasCorrectas[i]).parent().css( "background", "orange" );
			//y la pregunta esta mal
			bien = false; 
		}else{
			//La que este seleccionada la coloreo en verde ,y sobreescribo el rojo anterior 
			todasRespuestas.eq(respuestasCorrectas[i]).parent().css( "background", "#99ff82" );
		}
	}

	//Si todas las correctas estan seleccionadas y la cantidad seleccionada es la cantidad de respuestas, esta bien contestada y se suma un punto
	//El total bien contempla el caso que me marquen todas las respuestas
	if(bien && totalBien==0){
		puntuacion++;
	}
}

//Al seleccionar el cuadro de texto del usuario se borra le nombre para ingresar uno nuevo
$("#boxUs").focus(function() {
	$("#boxUs").css({"color":"black"});
	$("#boxUs").val("");

});

//para que funcione el boton comenzar:
$("#butIn").click(function(){
	
	//Si no completan el nombre sale un mensaje de advertencia (y el cuestionario se esconde en caso que borraran el nombre)  
	if($("#boxUs").val() == ""){
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
	mostrarPagina(pagina);
	botAntSig();
});

$("#butUno").click(function(){
	pagina = mostrarPagina (0);
	//$("#butAnt").hide();
	botAntSig();
});

$("#butDos").click(function(){
	pagina = mostrarPagina (1);	
	botAntSig();
});

$("#butTres").click(function(){
	pagina = mostrarPagina (2);
	$("#butAnt").hide();
	botAntSig();
});

$("#butCuatro").click(function(){
	pagina = mostrarPagina (3);
	$("#butAnt").hide();
	botAntSig();
});

$("#butCinco").click(function(){
	pagina = mostrarPagina (4);
	$("#butAnt").hide();
	botAntSig();
});

$("#butSig").click(function(){
	//Si la pagina es anterior a la ultima , paso una pagina 
	if(pagina < arrayPaginas.length-1){
		pagina=  mostrarPagina(pagina+1);		
	}
	botAntSig();
});

$("#butAnt").click(function(){
	if(pagina > 0){
		pagina = mostrarPagina(pagina-1);
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

	pagina = mostrarPagina(arrayPaginas.length-1);
	botAntSig();

	//Checkeo en cada pregunta si contesto bien se suma un punto y se colorea en verde
	//Sino se marca en naranja y si el usuario selecciono alguna mal en rojo la opcion erronea .
	//De ser posible uso las funciones que defini previamente

	paraRadio2($(".CG"),0);
	paraSelect(document.getElementById("SuperCiudad"),"4");

	/*Como en los checkbox se necesitan varias selecciones en simultaneo y varia la dimension segun cada checkbox uso una coleccion 
	esta coleccion la voy redefiniendo en cada checkbox con las respuestas correctas de cada pregunta */
	var correctas = [];
	paraCheckBox($(".cbFlash") , correctas = [0,3] );

	paraRadio2($(".manhattan"),2);	
	paraSelect(document.getElementById("superLogo"),"8");
	paraCheckBox($(".pJT"),correctas = [0,2,4]); 

	paraRadio2($(".MujerMaravilla"),2);	
	paraSelect(document.getElementById("victorStone"),"4");
	paraCheckBox($(".cbES"),correctas=[0,5,7] );

	paraRadio2($(".Harley"),3);
	paraSelect(document.getElementById("victorFries"),"6");
	paraCheckBox($(".villanosG"), correctas=[0,1,2,3,4,5,6,7,8,9] );

	paraRadioImg($(".Oscars"),1);
	paraRadioImg($(".dosCaras"),3);

	//Luego de saber la puntuacion total defino el msj 
	if( (arrayPreguntas.length/puntuacion) >2 ){
		msj="ouch " + $("#boxUs").val() + " :/ ";
	}else{
		msj="Felicidades " + $("#boxUs").val() +" eres una persona de cultura ;)";
	}

	//Y lo muestro en la pagina 
	$("#puntuacion").html("Contesto bien " + puntuacion+" de " + arrayPreguntas.length +" preguntas <br> " + msj );
	
	//Cambio el boton para que no puedan responder de vuelta 
	$("#butPun").show();
	$("#butFin").hide();

	//Ademas de que no puedan cambiar el nombre
	document.getElementById("boxUs").disabled = true;

});

$("#butPun").click(function(){
	pagina = mostrarPagina(arrayPaginas.length-1);
	botAntSig();
});

//Modo oscuro 
/*Se activa cuando el checkbox/slider cambia de estado*/
$("#togBtn").on('change', function() {
	var body = document.body;
	/*alterna entre el color original y el oscuro de todo el body */
	body.classList.toggle("dark-mode");
});


//Agregar una pregunta con imagenes mas 





