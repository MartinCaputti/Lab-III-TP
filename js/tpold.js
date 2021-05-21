"use strict"

var boxNom = document.getElementById("boxUs");

window.onload = function () {

	boxNom ;

	boxNom.value = "EJ:Edward Nygma";
	boxNom.style.color = "grey";	
}

boxNom.onfocus  = function () {
	boxNom.value = "";
	boxNom.style.color ="black";
}

//boton comenzar
document.getElementById("butIn").onclick = function (){

	var facs = document.getElementById("facs"); 
	//Pido que ingresen un nombre
	if(boxNom.value =="" || boxNom.value=="EJ:Edward Nygma"){
		document.getElementById("nomError").innerHTML = "Forastero identificate!" + "<br/>" + "<br/>" ;
		return false;
	}else{
		document.getElementById("nomError").innerHTML="";
	}

	//seleccionan el radio heroes
	if(document.getElementById("rHeroes").checked) {
	  	facs.innerHTML = "Candidato para la liga de la justicia"
	  	facs.style.color = "black";
	}//seleccionan el radio villanos 
	else if(document.getElementById("rVillanos").checked) {
  		facs.innerHTML = "Nuevo recluta del Escuadron Suicida"
  		facs.style.color = "black";
  	//Si no seleccionan ningun radio 
	}else if(!document.getElementById("rVillanos").checked && !document.getElementById("rHeroes").checked) {
		facs.innerHTML = "Es peligroso enfrentar este mundo solo ,por favor elige una faccion"
		facs.style.color = "red";
		return false
	}

	//Si completaron el nombre y eligieron el radio aparece el formulario 
	document.getElementById("cuestionario").style.display="initial";
}






