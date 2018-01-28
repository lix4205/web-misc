var epaisseur=1;
var colorline="#32a244";
// var colorline="#d2d4d5";
var tableau = [];
var t_frcs=[0,0,0,0];
var iteration = 1000;
var facenter=0.85
var facote=1/3; //0.25
var angcenter=0.05;
var angcote=-2*Math.PI/5;
var wwidth=980; 	//hauteur=largeur

function getContext(cva_name) {
	var canvas  = document.querySelector(cva_name);
	var context = canvas.getContext('2d');
	return context;
}


function creefrac(angle=0) {
	tableau = [
		0,0,
		0,-100,
		27,-109,
		0,-100,
		-27,-109,
		0,-100,
		-4,-185
	]
	if ( angle != 0 )
	for ( i=1;i < (tableau.length/2) ;i++) {
		x1=tableau[2*i];
		y1=tableau[2*i+1];
		x2=tableau[2*i+2];
		y2=tableau[2*i+3];
		longueur=Math.sqrt((x2-x1)*(x2-x1)+(y2-y1)*(y2-y1))
		tableau[i*2]=x1*Math.cos(angle)+y1*Math.sin(angle)
		tableau[i*2+1]=-x1*Math.sin(angle)+y1*Math.cos(angle)
	}
}

function dess_frac(cnt_frc,facteur=1,angle=angcenter,posx=wwidth/2,posy=wwidth){
	
	var context = getContext("#can"+cnt_frc);

// 	context.clearRect ( 0 , 0 , wwidth, wwidth );
	context.strokeStyle = colorline;
	context.fillStyle = colorline;
	context.lineWidth = ""+epaisseur;
	context.beginPath();
	
	creefrac(angle);
	trace_tige(cnt_frc, angle, facteur,posx,posy);
	
// 	alert("\nag: "+angle+"\nfg: "+facteur+"\nfce: "+facenter+"\nace: "+angcenter+"\nfco: "+facote+"\nac: "+angcote+"\n"+posx+" "+posy)
	pt=1;
	$("#"+cnt_frc).append("<div class=\"blueborder\" style=\"position:absolute;left:"+posx+"px;top:"+posy+"px;\" >"+
	"ag: "+angle+"<br />"+
	"fg: "+facteur+"<br />"+
	"fce: "+facenter+"<br />"+
	"ace: "+angcenter+"<br />"+
	"fco: "+facote+"<br />"+
	"ac: "+angcote+"<br />"+
	posx+" "+posy+"<br />"+
	tableau.length+"</div>\n")
// 	ty=setInterval(function(){
		while ( t_frcs.length < iteration ) {
				repeat_frac(cnt_frc,pt,angcenter,facenter)
				repeat_frac(cnt_frc,pt,angcote,facote)
				repeat_frac(cnt_frc,pt,-angcote,facote)
			pt++;
		}
// 		clear2(ty);
// 	},100);
// 	function clear2(ty) {clearInterval(ty);}
	t_frcs=[t_frcs[4],t_frcs[5],t_frcs[6],t_frcs[7]];
}

function repeat_frac(cnt_frc,num_frac,ang=angcenter,fac=facenter) {

	posx=t_frcs[num_frac*4]
	posy=t_frcs[num_frac*4+1]
	n_fac=t_frcs[num_frac*4+2]
	n_ang=t_frcs[num_frac*4+3]+ang
	
	creefrac(n_ang);
	trace_tige(cnt_frc, n_ang, fac*n_fac,posx,posy);
}

function trace_tige(cnt_frc,angle, facteur=1,posx,posy) {
	var context = getContext("#can"+cnt_frc);
	
	context.moveTo(posx, posy);
	nbpoints=tableau.length/2;

	for (i=1 ; i<nbpoints ; i++){
		tableau[2*i]*=facteur;
		tableau[2*i+1]*=facteur;
		varx=posx+tableau[2*i];
		vary=posy+tableau[2*i+1];
		context.lineTo(varx, vary);
	}
	context.stroke();
	t_frcs.push(posx+tableau[2]);
	t_frcs.push(posy+tableau[3]);
	t_frcs.push(facteur);
	t_frcs.push(angle);
// 	$("#"+cnt_frc).append("<div class=\"blueborder\" style=\"position:absolute;left:"+(t_frcs[t_frcs.length-4])+"px;top:"+(t_frcs[t_frcs.length-3])+"px;\" >itr="+angle+"<br />Fac:"+facteur+"\n<br />"+t_frcs[t_frcs.length-4]+"</div>\n")

}

function anim_frac(cnt_frc,facteur=1,angle=angcenter,posx=wwidth/2,posy=wwidth){
	$("#"+cnt_frc).append("<canvas class=\"redborder\" id=\"can"+cnt_frc+"\" width=\""+wwidth+"\" height=\""+wwidth+"\"><p>Désolé, votre navigateur ne supporte pas Canvas.</p></canvas>\n");
// 	dess_frac(cnt_frc,facteur,angle,posx,posy);
	
	var context = getContext("#can"+cnt_frc);

// 	context.clearRect ( 0 , 0 , wwidth, wwidth );
	creefrac(angle-angcenter);
		dess_frac(cnt_frc,facteur,angle,posx,posy);
// 	for (itr=1 ; itr<tableau.length/2 ; itr++){
// 		facteur*=1.1
// 		tableau[2*itr]*=facteur;
// 		tableau[2*itr+1]*=facteur;
// 		varx=posx+tableau[2*itr];
// 		vary=posy+tableau[2*itr+1];
// // 		context.lineTo(varx, vary);
// // 		alert(itr);
// // 	angle=angle-angcenter
// 		dess_frac(cnt_frc,facteur,angle,posx+tableau[4],posy+tableau[5]);
// // 		dess_frac(cnt_frc,facteur,angle,posx+tableau[9],posy+tableau[10]);
// 	creefrac(angle-angcenter);
// // 		dess_frac(cnt_frc,facteur,angle,posx+tableau[4],posy+tableau[5]);
// // 		alert(itr);
// // 		$("#"+cnt_frc).append("<div class=\"blueborder\" style=\"position:absolute;left:"+(t_frcs[t_frcs.length-4])+"px;top:"+(t_frcs[t_frcs.length-3])+"px;\" >itr="+angle+"<br />Fac:"+facteur+"\n<br />"+t_frcs[t_frcs.length-4]+"</div>\n")
// // 	creefrac(angle);
// 
// 	}
// 	cxt = getContext(cnt_frc)
// 	creefrac(angle)
// 	boucle=setInterval(function(){
// // 		alert("f1:"+facteur);
// 		facteur+=0.1;
// 		posx=t_frcs[0];
// 		posy=t_frcs[1];
// // 		angle+=angle;
// 		creefrac(angle)
// // 	alert( posx+" "+posy);
// 		dess_frac(cnt_frc,facteur,angle,posx,posy);
// 		clear(facteur);
// // 		alert("f2:"+facteur);
// 	},200);
// 	
// 	// fonction pour arreter le defilement et supprimer le conteneur si il n'y a rien dedans 
// 	function clear(facteur) {
// 		if ( facteur >5.9 ) {
// // 		alert("fin:"+facteur);
// 			// On arrete l'animation
// 			setTimeout(function(){ clearInterval(boucle);
// 			// On supprime le canvas
// 				//$("#"+cnt_frc).find("canvas").remove(); 
// 			}, 500);
// 		}
// 	}
}