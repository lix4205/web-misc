//valeurs par défaut des paramètres
var epaisseur=2;	// epaisseur des lignes tracées en px
var colorLine = "#000"; // couleur des lignes tracées
// 		var colorLine = "#000";

// var runBg; // processus contenant le timer
timer = 100; // le temps qui passe entre chaque dessin
pas_def = 0.005; 

// var running=1; // defilement ou pas...
var cur_x=Math.floor((Math.random() * 100) + 1); // La valeur de la table de multiplication observée
var cur_y=Math.floor((Math.random() * 100) + 1); // La valeur de départ du nombre de points

// On stocke les valeurs des paramètres des etoiles dans un tableau
var t_mod = [];
/*
function load_star
	avec :
	cnt_frc = element dans lequel inserer le canvas
	w = largeur de l'element a creer
	h = hauteur de l'element a creer
	xx=0 = valeur de la table de multiplication observée
	yy=0 = nombre de point au départ
	color=colorLine = couleur du tracé
	epais=epaisseur = epaisseur des lignes
	time=timer = frequence de rafraichissement
	
	si xx = 0 alors on prend 30 par defaut
	si yy = 0 alors on prend le temps comme reference
*/
function load_star(cnt_frc,w,xx=0,yy=0,color=colorLine,epais=epaisseur,time=timer,pas=pas_def) {
	// On cree le conteneur du canvas
	$("#"+cnt_frc).append("<canvas id=\"can"+cnt_frc+"\" width=\""+w+"\" height=\""+w+"\"><p>Désolé, votre navigateur ne supporte pas Canvas.</p></canvas>")
	
// 	$("#Debug")+cnt_frc).append("");
// 	$("#"+cnt_frc).append("<canvas id=\"can"+cnt_frc+"\" width=\""+w+"\" height=\""+w+"\"><p>Désolé, votre navigateur ne supporte pas Canvas.</p></canvas>")
	t_mod[cnt_frc+"_color"] = color;
	t_mod[cnt_frc+"_epais"] = epais;
	t_mod[cnt_frc+"_timer"] = time;
	t_mod[cnt_frc+"_pas"] = pas;
	
	xaffiche=w;  //largeur et longueur de la fenêtre d'affichage des figures
	yaffiche=w;
	var nb_opt=0;
	if (xx==0) {
		xx=30;
	}
	t_mod[cnt_frc+"_running"]=1;
	if (yy==0) {
		yy=45;
		// On boucle toute les 100ms, les lignes sont calculées en fonction de la seconde+(millescondes/1000) en cours
// 		runI
		t_mod[cnt_frc] = setInterval(function(){
			var currentTime = new Date();
			var s = currentTime.getSeconds();
			var ms = currentTime.getMilliseconds();
			var s = s+(ms/1000);
			clear(t_mod[cnt_frc]);
			// debug 
			debug(cnt_frc);
// 			xx+=pas
			t_mod[cnt_frc+"_cur_x"] = xx;
			t_mod[cnt_frc+"_cur_y"] = s;
			t_mod[cnt_frc+"_pas"] = 0.1;
			anim_star(xx,s,"can"+cnt_frc,color,epais);
		},t_mod[cnt_frc+"_timer"]);
	} else {
		// On boucle selon le timer, les lignes sont calculées en fonction de la valeur du pas, ici 0,0005
		t_mod[cnt_frc] = setInterval(function(){
			yy+=t_mod[cnt_frc+"_pas"]
// 			xx+=pas
			// On reassigne la valeur des points en cours (necessaire pour reprendre l'animation)
			t_mod[cnt_frc+"_cur_x"] = xx;
			t_mod[cnt_frc+"_cur_y"] = yy;
// 			cur_y = yy;
			// debug 
			debug(cnt_frc);
			// puis on rafrachi			
			anim_star(xx,yy,"can"+cnt_frc,color,epais);
		},t_mod[cnt_frc+"_timer"]);
	} 
// 	alert( $("#Debug"+cnt_frc).length)
	
	// fonction pour arreter le defilement et supprimer le conteneur si il n'y a rien dedans 
	function clear(cur_run) {
// 		alert($("#"+cnt_frc).find("canvas").hasClass("loading")  );
		if ( $("#"+cnt_frc).find("canvas").hasClass("loading") && ( ! $("#"+cnt_frc).length == 0 )) {
			// On arrete l'animation
			setTimeout(function(){ clearInterval(cur_run);
			// On supprime le canvas
			$("#"+cnt_frc).find("canvas").remove(); 
			}, 500);
		}
	}
}
function debug(cnt_frc) {
	if ( $("#Debug"+cnt_frc).length > 0 ) {
// 		nb_opt++;
// 			$("#Debug"+cnt_frc).css( "left", $("#"+cnt_frc).width()+"px" )
		$("#Debug"+cnt_frc).height( $("#"+cnt_frc).parent().height() )
// 			if ( nb_opt % 5 == 0 ) { 
// 			}
		$("#Debug"+cnt_frc).prepend(" x="+t_mod[cnt_frc+"_cur_y"]+" y="+t_mod[cnt_frc+"_cur_x"]+"<br /> ");
	}
}

function anim_star(n,k,cnt_frc,color=colorLine,epais=epaisseur){
	var canvas  = document.querySelector('#'+cnt_frc);
	var xcan=$('#'+cnt_frc).width();
	var ycan= $('#'+cnt_frc).height();
	var rayonEtoile=Math.min(xcan,ycan)/2.2;
	var context = canvas.getContext('2d');
	context.clearRect ( 0 , 0 , canvas.width, canvas.height );
	context.strokeStyle = color;
	context.fillStyle = color;
	context.lineWidth = ""+epais;
	context.beginPath();	
	for (var i=0 ; i<n ; i++) {
		context.moveTo(xcan/2+rayonEtoile*Math.cos(2*i*(1/n)*Math.PI), ycan/2+rayonEtoile*Math.sin(2*i*(1/n)*Math.PI));
		context.lineTo(xcan/2+rayonEtoile*Math.cos(2*i*k*(1/n)*Math.PI), ycan/2+rayonEtoile*Math.sin(2*i*k*(1/n)*Math.PI));
	}
	context.stroke();
	

}

function anim_pause(cnt_frc){
	if ( t_mod[cnt_frc+"_running"] == 0 ) {
		t_mod[cnt_frc+"_running"]=1;
		t_mod[cnt_frc+""] = setInterval(function(){
		debug(cnt_frc);
		t_mod[cnt_frc+"_cur_y"]=t_mod[cnt_frc+"_cur_y"]+t_mod[cnt_frc+"_pas"]
		anim_star(t_mod[cnt_frc+"_cur_x"],t_mod[cnt_frc+"_cur_y"],"can"+cnt_frc,t_mod[cnt_frc+"_color"],t_mod[cnt_frc+"_epais"]);
		},t_mod[cnt_frc+"_timer"]);
	} else {
		clearInterval(t_mod[cnt_frc]);
		t_mod[cnt_frc+"_running"]=0;
	}
}
