"use strict"

window.onload = function () {

	var boxNom = document.getElementById("boxUs");

	boxNom.value = "EJ:Edward Nygma";
	boxNom.style.color = "grey";	
}


document.getElementById("boxUs").onfocus  = function () {
	var box = document.getElementById("boxUs");
	box.value = "";
	box.style.color ="black";
}

//boton comenzar
document.getElementById("butIn").onclick = function (){

	var nombre = document.getElementById("boxUs");
	var facs = document.getElementById("facs"); 

	//Pido que ingresen un nombre
	if(nombre.value =="" || nombre.value=="EJ:Edward Nygma"){
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


	document.getElementById("cuestionario").style.display="initial";

}






