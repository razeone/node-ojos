// Tamano de pantalla  FINAL w x h  1920 x 1080
// Tamaño de prueba 393 x 700


SCREEN_DIM = [1920, 1080];
//H = 600;
H = $(window).height();//1080;

SCREEN_DIM_TEST = [H * (SCREEN_DIM[0] / SCREEN_DIM[1]), H];

factores = [SCREEN_DIM_TEST[0] / SCREEN_DIM[0], SCREEN_DIM_TEST[1] / SCREEN_DIM[1]];



debugging = true;

user_img_url = "";
user_name = "";
user_id = "";
first_user_scanned = false;
second_user_scaned = false;
waitingSecond = false;

first_user_name = '';
first_user_foto = '';

second_user_name = '';
second_user_foto = '';




can_izq = document.getElementById('canvas-izq');
can_der = document.getElementById('canvas-der');

/*


======================================================================================================================================================================================
======================================================================================================================================================================================
*/

tiempo_espera = 3500000; //4000 segundos


esperaFinal = 7 //15 segundos
/*
======================================================================================================================================================================================
======================================================================================================================================================================================
*/


show_concepto = false;

usuarios_anteriores = ['Juan','Andrés','Pedrito','Marcela','Osiris'];

currentScreen = '';
currentEye = 1;

screensIds = ["s-inicial","s-elige","s-coloca","s-zoom","s-final"];


var mensaje_error = 'Inténtalo de nuevo.'; 
var mensaje_toma = 'Coloca tu cara dentro de la silueta y toca la cámara.';
var mensaje_listo_1 = '¡Listo! Ahora compara ambos ojos.';
var mensaje_listo_2 = '¡Listo! Ahora toma la foto de tu amigo.';



//var spriteTimer;
// Para el stream de video
var video;
var localStream;

var anterior = '';
var camId = '';
function gotSources(devices){
	for(i = 0; i < devices.length; i++){
		device = devices[i];
		//console.log(device);
		if(device.label.indexOf("HD Pro Webcam C920") > -1 && device.kind === "video"){
			camId = device.id;
			console.log("jjjj");
		}
	}
}

function camaraBien(stream){
	console.log('Dispositivo leido correctamente');
	video.src = window.URL.createObjectURL(stream);
	localStream = stream;
}

function camaraMal(){
	console.log('no se puede leer dispositivo');
}

function preparaCamara(){

	MediaStreamTrack.getSources(gotSources);
	video = document.getElementById('videocam');

	b = setTimeout(function(){
		var videoSource = camId;
	  	var constraints = {

	    video: {
	      optional: [{
	        sourceId: videoSource
	      }]
	    }
	  };
	  navigator.getUserMedia  = navigator.getUserMedia ||
		                          navigator.webkitGetUserMedia ||
		                          navigator.mozGetUserMedia ||
		                          navigator.msGetUserMedia;

	  var webcam = navigator.getUserMedia(constraints, camaraBien, camaraMal);
	}, 500);
  
/*

	video = document.getElementById('videocam');
	videoObj = { "video": true };
	errBack = function(error) {
		console.log("Video capture error: ", error.code); 
	};
	navigator.getUserMedia  = navigator.getUserMedia ||
	                          navigator.webkitGetUserMedia ||
	                          navigator.mozGetUserMedia ||
	                          navigator.msGetUserMedia;

	
	if(navigator.getUserMedia) {
		var webcam  = navigator.getUserMedia(videoObj, function(stream){
			video.src = window.URL.createObjectURL(stream);
			localStream = stream;
		}, errBack);
	}
*/
}

	windowW = $(window).width();
	windowH = $(window).height();

function setupApp(){

	// PREPARAMOS LA CAMARA PARA EVITAR RETRASOS

	// En este elemento <video> vamos a mostrar stream de webcam

	cargaCaras();







	var anchoReloj = windowW *.23;
    var altoReloj = windowW *.23;

/*
    reloj = $('#timer1');
	reloj.width(anchoReloj);
    reloj.height(altoReloj);
    reloj.TimeCircles({ time: { Days: { show: false }, Hours: { show: false }, Minutes: { show: false } }});
  */  

		console.log("winW " + windowW + " winH " + windowH);


	spriteTimer = new SpriteCanvas({
    	framesPath : "assets/timer_blanco",
	    canvas     : document.getElementById("timer1"),
	    width      : 320 * factores[0],
	    height     : 320 * factores[1],
	    fps        : 12
    });


	ojitos = new SpriteCanvas({
    	framesPath : "assets_finales/Parecidos_Ojitos",
	    canvas     : document.getElementById("personaje-animado"),
	    width      : $(window).width(),
	    height     : $(window).height(),
	    fps        : 30
    });

	ojitos.play();


	mariposa_rfid = new SpriteCanvas({
    	framesPath : "assets_finales/RFID_sprite",
	    canvas     : document.getElementById("mariposa_rfid"),
	    width      : $(window).width(),
	    height     : $(window).height(),
	    fps        : 30
    });

    mariposa_rfid.play();


	var zin = 0;
	var titulo_zindex = setInterval(function(){
		$('#titulo').css('z-index',zin);
		if(zin == 0){
			zin = 1;
		} else {
			zin = 0;
		}
	}, 500);




	//$('#svg-image').attr('width',SCREEN_DIM_TEST[0]);
	//$('#svg-image').attr('height',SCREEN_DIM_TEST[1]);





		$('#face1').width((windowW * 0.316) + 'px');
		$('#face1').height((windowW * 0.316) + 'px');


		$('#face2').width((windowW * 0.316) + 'px');
		$('#face2').height((windowW * 0.316) + 'px');


		// alto en % ($('#face2').height() / windowH) * 100;

		// Acomodar caras justo a la mitad
		// top (100 - (alto de cara  en porcentaje con respecto a alto))/2
		$('#caras').css('top', ((100 - (($('#face2').height() / windowH) * 100)) / 2) + '%');
		$('#video').css('top', ((100 - (($('#face2').height() / windowH) * 100)) / 2) + '%');


		
		// Caritas laterales 96px x 90px en 1920 x 1080
		
		//antes 0.046

		$('.cara-lateral').width((windowW * 0.05208) + 'px');
		$('.cara-lateral').height((windowW * 0.05208) + 'px');

		$('.marco').width((windowW * 0.05208) + 'px');
		$('.marco').height((windowW * 0.05208) + 'px');

		$('#scan-rfid').width((windowW * 0.05208) + 'px');
		$('#scan-rfid').height((windowW * 0.05208) + 'px');



		$('#ojoizq-wrap').css('top', ((100 - (($('#face2').height() / windowH) * 100)) / 2) + '%');
		$('#ojoder-wrap').css('top', ((100 - (($('#face2').height() / windowH) * 100)) / 2) + '%');

		$('#ojoizq-wrap').width((windowW * 0.316) + 'px');
		$('#ojoizq-wrap').height((windowW * 0.316) + 'px');
		$('#ojoder-wrap').width((windowW * 0.316) + 'px');
		$('#ojoder-wrap').height((windowW * 0.316) + 'px');

/*
		$('#canvas-izq').width((windowW * 0.316) + 'px');
		$('#canvas-izq').height((windowW * 0.316) + 'px');
		$('#canvas-der').width((windowW * 0.316) + 'px');
		$('#canvas-der').height((windowW * 0.316) + 'px');*/

		//$('#ojo').width((windowW * 0.316) + 'px');
		//$('#ojo').height((windowW * 0.316) + 'px');



		// PANTALLA PARA TOMAR FOTO


		// Video para tomar la foto



		$('#video').width((windowW * 0.316) + 'px');
		$('#video').height((windowW * 0.316) + 'px');

		$("#videocam").width((windowW * 0.316) + 'px');
		$("#videocam").height((windowW * 0.316) + 'px');
		
		$("#videocanvas").width((windowW * 0.316) + 'px');
		$("#videocanvas").height((windowW * 0.316) + 'px');
		
		
		//obtener porcetjae de alto de contador respecto a windowH


		console.log('contadoor ' + $('#contador').height());

		console.log(100 * ($('#contador').height() / windowH));

		console.log(100 - (100 * ($('#contador').height() / windowH)));

		$('#contador').css('top', (100 - (100 * ($('#contador').height() / windowH))) + '%');
		// Canvas Dos iris

		$("#mix-eye").width((windowW * 0.316) + 'px');
		$("#mix-eye").height((windowW * 0.316) + 'px');
		
		screensIds.forEach(
			function(e){
				$("#" + e).css("display", "none");
			}
		);




}


/*

Cada pantala debe tener una funcion que maneje la interaacion de esa pantalla
CADA PANTALLA:
	@ efecto de entrada
	@ manejar funcionalidad
	@ efecto de salida

	+ Efecto de entrada (inTransition)
		@ entrada de los elementos

	+ Efecto de salida (outTransition)
		@ hace los efectos de salida y deja todo listo para los efectos de inTransition.

	+ La funcion escargada de brindar funcionalidad se ejecuta una vez que todos los elementos estan
		en su lugar, es decir, debe ser llamada dentro de inTransition.
	+ La funcion encargada de brindar funcionalidad en algun momento debe llamar a outTransition

*/
function cargaCaras(){

	//var gui = require('nw.gui');
	//gui.App.clearCache();

	console.log("carganddo caras");
	
	// Limpiamos el wrapper de las caras

	//$('#wrapper').empty();

	// Limpiamos lo de la animacion final

	//$('#ojo').empty();



	usersIds = ['1', '2', '3', '4','5'];
	
	/*usersDivs = [];
	usersIds.forEach(function(e){
		usersDivs.push("<div id=" + e + " class='cara-lateral'></div>");
	});
	numUsers = usuarios_anteriores.length;

	img = "../usuarios_anteriores/ojo_usuario_";
	// Agregamos los divs

	for(i = 0; i < numUsers; i++){
		$("#wrapper").append(usersDivs[i]);
	}
*/

img = "../usuarios_anteriores/ojo_usuario_";
	if(using_){

		console.log("using _ " + using_);
		// Agregamos los <img>
		i = 1;
		usersIds.forEach(function(e){
			/*$("#" + e).append("<img src='../assets_finales/marco.png' class='marco seleccionable'>");*/
			/*$("#" + e).append("<img src='../assets/perfil.png' class='marco'>");
			$("#" + e).append("<img src='" + img + i + "_.png' class='circular2 fotito seleccionable'>");
			*/

			$("." + e + ' img:nth-child(2)').attr('src', img + i + "_.png");
			i++;
		});
/*
		for(i = 1; i < 6; i++){
			$('#ojo_final' + i).attr('src', img + i + '_.png');
		}
		*/


	} else {
		// Agregamos los <img>
		i = 1;
		usersIds.forEach(function(e){
			/*$("#" + e).append("<img src='../assets_finales/marco.png' class='marco seleccionable'>");*/
			
			/*$("#" + e).append("<img src='../assets/perfil.png' class='marco'>");
			$("#" + e).append("<img src='" + img + i + ".png' class='circular2 fotito seleccionable'>");
			*/
			$("." + e + ' img:nth-child(2)').attr('src', img + i + ".png");
			i++;
		});
/*
		for(i = 1; i < 6; i++){
			$('#ojo_final' + i).attr('src', img + i + '.png');
		}
		*/
	}



	$('.cara-lateral').width((windowW * 0.05208) + 'px');
	$('.cara-lateral').height((windowW * 0.05208) + 'px');

	$('.marco').width((windowW * 0.05208) + 'px');
	$('.marco').height((windowW * 0.05208) + 'px');
	
	//var gui = require('nw.gui');
	//gui.App.clearCache();



}

function inTransition(pantalla, funcionalidad){
	switch(pantalla){
		case 's-inicial':
			currentScreen = 's-inicial';
			$('#s-inicial').show();
			$('#titulo').fadeIn(1500, function(){
				$('.icono-rfid').fadeIn();
				funcionalidad();

			});

			
			break;

		case 's-elige':
			currentScreen = 's-elige';
			if(first_user_foto != null){
				$("#face1 > img").attr("src", first_user_foto);
			} else {
				$("#face1 > img").attr('src','../assets/personaje_default.png');
			}
			
			if(first_user_name != null){
				$(".nom1 > span").text("¡Hola, " + first_user_name + '!');
			} else {
				$(".nom1 > span").text("¡Hola! Bienvenido.");
			}

			$('#s-elige').fadeIn();

			// Cargamos la camara
			preparaCamara();

			// Primero aparecen ciruclos
			$('#caras').fadeIn(1000, function(){
				
				$('.invita-amigo').fadeIn(800);
				// Lista de usuarios
				$('#lista-usuarios').fadeIn(800, function(){			
					$('.terminar-esquina').fadeIn(800, function(){
						takeSnapshot();


						setTimeout(function(){
							funcionalidad();
						}, 300)
					});
					
				});

			});

			break;

		case 's-coloca':
			currentScreen = 's-coloca';
			$('#s-coloca').fadeIn();
			//$('.terminar-esquina').fadeIn();
			$('#videocam').fadeIn(1000);
			$('#silueta').fadeIn(1000);
			$('#noom > span').fadeIn(1000, function(){
				$('#cam').fadeIn(1000, function(){
					$('#instruccion_abajo').fadeIn();
					//$('#inst3').fadeIn(function(){
						funcionalidad();
					//});	
				});
			});
			
			break;

		case 's-zoom':
			currentScreen = 's-zoom';


		
			//cargaCaras();
			$('#s-zoom').fadeIn();
			$('.nombres').fadeIn(500);
			$('#ojos').fadeIn(400, function(){
				$('#slider').fadeIn(400);
				$('#barra').fadeIn(400, function(){
					$('#inst4').fadeIn();
					//$('#manita').fadeIn(200, function(){
						animacion_manita(function(){
							funcionalidad();
							
							

						});


					//});
					
				})
			});
			//$('#s-zoom').fadeIn(1000, function(){
				
			//});
			break;

		case 's-final':
			currentScreen = 's-final';
			$('#s-final').fadeIn();
			$('#texto-final').fadeIn(function(){
				//$('#ojo').fadeIn(function(){
					funcionalidad();
				//});
			})
			break;

		case 'concepto':
			show_concepto = true;
			$('.blur-background').fadeIn(function(){
				$("#concepto").fadeIn(function(){
					funcionalidad();
				});
			});
			break;

		case 'sigues-ahi':
			currentScreen = 'sigues-ahi';
			$('#black-background').fadeIn(function(){
				$('#sigues-ahi').fadeIn();
				$('#timer1').fadeIn(function(){
					$('#sigues-ahi > span').fadeIn(function(){
						funcionalidad();
					});
				});
			});
			break;

		case 'salir':
			currentScreen = 'salir';
			$('#black-background2').fadeIn(function(){
				$('#salir').fadeIn(function(){
					funcionalidad();
				});
			});
			break;
	}

}


	
function animacion_manita(callback){



	//var origen = $("#manita").css('left');
	var origen_s = $('#slider').css('left');
	//console.log('origen manita ' + origen);
	//console.log('origen slider ' + origen_s);
	

	var ancho = $('#barra').width() - parseFloat($('#slider').css('width'));
	/*
	$('#manita').animate({left: (parseFloat(origen) + parseFloat(ancho)) + 'px'}, 1500, function(){
		$('#manita').animate({left: parseFloat(origen) + 'px'}, 1500, function(){
			$('#manita').fadeOut();
		});
	});
*/

	var escuchaPos = setInterval(function(){

			valor_m = (parseFloat($('#slider').css('left')) - parseFloat(origen_s)) / ancho;
			doZoom(valor_m);
			//console.log(valor_m + '   --------');
	});
	$('#slider').animate({left: (parseFloat(origen_s) + parseFloat(ancho)) + 'px'}, 1500, function(){
		$('#slider').animate({left: parseFloat(origen_s) + 'px'}, 1500, function(){
			callback();
			clearInterval(escuchaPos);
		});
	})

}

function outTransition(pantalla, funcion){
	anterior = pantalla;
	switch(pantalla){
		case 's-inicial':
			$('#s-inicial').fadeOut(1500, function(){
				restoreScreen('s-inicial')
				funcion();
			});
			
			break;

		case 's-elige':
			$('#s-elige').fadeOut(1000, function(){
				restoreScreen('s-elige');
				funcion();		
			});
			break;

		case 's-coloca':
			$('#s-coloca').fadeOut(1000, function(){
				restoreScreen('s-coloca');
				funcion();
			});
					
			break;

		case 's-zoom':
			$('#s-zoom').fadeOut(1000, function(){
				cargaCaras();
				restoreScreen('s-zoom');
				
				funcion();
					
			});
			break;

		case 's-final':
				
			$('#s-final').fadeOut(1000, function(){
				restoreScreen('s-final');
				funcion();		
			});
			break;

		case 'concepto':
			show_concepto = false;
			$('#concepto').fadeOut(1000);
			$('.blur-background').fadeOut(1000, function(){
				restoreScreen('concepto');
				currentScreen = 's-elige';
				funcion();
			});
			

			break;

		case 'sigues-ahi':
			$('#sigues-ahi').fadeOut(300, function(){
				$('#black-background').fadeOut(200, function(){
					restoreScreen('sigues-ahi');
					funcion();
				});
			});
			break;

		case 'salir':
			
			$('#salir').fadeOut(200, function(){
				$('#black-background2 ').fadeOut(200, function(){
					restoreScreen('salir');
					funcion();
				});
			});
			break;
	}
}

function restoreScreen(pantalla){
	switch(pantalla){
		case 's-inicial':
			$('#titulo').css('display', 'none');
			$('.icono-rfid').css('display', 'none');
			break;

		case 's-elige':


			ids = ['1','2','3','4','5'];
			ids.forEach(function(e){
				$('.' + e).removeClass('noselected');
			});
			$('#scan-rfid').removeClass('noselected');

			$("#boton1").css('display','none');
			$('#boton1 > img').attr('src', '../assets/continuar1.png');

			$('#face2 > img').attr('src', '../assets/invitado.png');
			// Primero aparecen ciruclos
			$('#caras').hide();


			// Lista de usuarios
			$('#lista-usuarios').hide();

			// boton de rfid
			$('.invita-amigo').hide();

			$('#face2').removeClass('aro');
			//$('.terminar-esquina').hide();
			break;

		case 's-coloca':
			// Restauramos boton de camara
			$('#cam > img').attr('src', '../assets/camara1.png');

			// Restauramos oton de continuar
			$('#continuar1 > img').attr('src', '../assets/continuar1.png');

			// Instruccion toca el boton de camara

			$('#instruccion_abajo > span').text('Toca la cámara para fotografiar tu ojo.');

			/*
			$('#inst3').width((660 * factores[0]) + 'px');
			$('#inst3').height((98 * factores[1]) + 'px');
			$('#inst3').attr('src', '../assets/instrucción-parecidos2_660_98.png');
			*/

			// Desaparecemos la instruccion de arriba
			$('#inst3').css('display', 'none');
			


			// Desaparecemos camara

			$('#cam').hide();

			// Desaparecemos contador
			$('#contador').css('display', 'none')

			// Desaparecemos boton de coninuar
			$('#continuar1').css('display', 'none');

			// Desaparecemos videostreaming

			$('#videocanvas').css('display', 'none');
			
			// Desaparecemos canvas que usamos para mostrar snapshot
			$('#videocam').css('display', 'none');

			// Desaparecmos siluete
			$('#silueta').hide();

			break;

		case 's-zoom':

			$('#boton1').hide();
			$('#inst5').css('display','none');
			$('#barra').css('display','none');
			$('#toca_terminar').css('display','none');
			$('#terminar').attr('src', '../assets/terminar1.png');
			$('#terminar').css('display','none');
			primer_drag = true;
			$('.terminar-esquina').css('display','none');
			$('#slider').css('left', ($(window).width() * 0.38025) + 'px');
			$('#slider_big').css('left', ($(window).width() * 0.3555) + 'px');

			//can_izq.getContext('2d').restore();
			//can_der.getContext('2d').restore();
			$('#canvas-izq').css('-webkit-transform', 'scale(1,1)');
			$('#canvas-der').css('-webkit-transform', 'scale(1,1)');

			ids = ['1','2','3','4','5'];
			ids.forEach(function(e){
				$('.' + e).removeClass('noselected');
			});
			$('#scan-rfid').removeClass('noselected');


			break;

		case 's-final':

			//$('#reiniciar').attr('src','../assets_finales/reiniciar1.png');		
			break;

		case 'concepto':
			$('#continuar_1').attr('src', '../assets_finales/continuar_ov1.png');
			break;

		case 'sigues-ahi':
			break;

		case 'salir':
			$("#si").attr('src','../assets/si1.png');
			$("#no").attr('src','../assets/no1.png');
			break;
	}
}


function takeSnapshot() {
    var gui = require('nw.gui');
    var win = gui.Window.get();

    win.capturePage(function(buffer)
    {
        require('fs').writeFile('screenshot.png', buffer, function (err) {
            if (err) throw err;
            console.log('It\'s saved!');
            $('.blur-background > img').attr('src', '../screenshot.png');
        });

    }, { format : 'png', datatype : 'buffer'} );
}


/*
Funcion para S-INICIAL
Para manejar la entrada del usuario
*/


var primer_usuario = true;

function waitUser(){
	console.log("En wait user");
var a;
/*
	console.log("funcion waitUser");
	$(".icono-rfid > canvas").click(function(){
		clearInterval(a);
		console.log("yaaa");
		$(this).off('click');
		first_user_scanned = true;
		first_user_name = 'Fernanda';
		first_user_foto = '../img/faces/face.jpg';
		//usuarios_anteriores[currentEye - 1] = first_user_name;
		outTransition('s-inicial', function(){
			inTransition('s-elige', segunda);
		});
	});
*/
	a = setInterval(function(){
		if(first_user_scanned){
			clearInterval(a);
			first_user_name = user_name;
			first_user_foto = user_img_url;
			//usuarios_anteriores[currentEye - 1] = user_name;
			console.log('here');
			
			//first_user_scanned = false;
			outTransition('s-inicial', function(){
				inTransition('s-elige', function(){
					
					segunda()
				});
			});
			
		}
	}, 200);
}

/*

 Brinda funcionalidad a la pantalla de elegir foto

*/

function segunda(){



	//Cambiamos el saludo por el puro nombre
	setTimeout(function(){
		$('.nom1 > span').fadeOut(200, function(){

			if(first_user_name != null && first_user_name != ''){
				$(this).text(first_user_name);
			} else {
				$(this).text("¡Hola!");
			}
			
			$(this).fadeIn(200);
		})
	}, 1000);

	waitSelection();

}


/*

Brinda funcionalidad a la pantalla para ELEGIR FOTO

*/

var first_run = true;





var an;

var waitScan = false;
var userSelected = false;
var ojo_elegido = '';


console.log("metiendo clicks");

	console.log("waiting selection!");

	//}



	$('.1').click(function(){
		seleccionaCirculo(0);
		$(".nom2 > span").text(usuarios_anteriores[0]);
		$('.nom2').show();

		//$('.1 img:nth-child(2)').attr('src');, img + i + "_.png");

		canvasD = document.getElementById('canvas-der');
		canvasD.getContext('2d').drawImage(document.getElementById('foto1'), 0,0, canvasD.width, canvasD.height);
		console.log('dibujando 1');

	});
	$('.2').click(function(){
		seleccionaCirculo(1);
		$(".nom2 > span").text(usuarios_anteriores[1]);
		$('.nom2').show();
		canvasD = document.getElementById('canvas-der');
		canvasD.getContext('2d').drawImage(document.getElementById('foto2'), 0,0, canvasD.width, canvasD.height);
			
	});
	$('.3').click(function(){
		seleccionaCirculo(2);
		$(".nom2 > span").text(usuarios_anteriores[2]);
		$('.nom2').show();
		canvasD = document.getElementById('canvas-der');
		canvasD.getContext('2d').drawImage(document.getElementById('foto3'), 0,0, canvasD.width, canvasD.height);
		
	});
	$('.4').click(function(){
		seleccionaCirculo(3);
		$(".nom2 > span").text(usuarios_anteriores[3]);
		$('.nom2').show();
		canvasD = document.getElementById('canvas-der');
		canvasD.getContext('2d').drawImage(document.getElementById('foto4'), 0,0, canvasD.width, canvasD.height);
		
	});
	$('.5').click(function(){
		seleccionaCirculo(4);
		$(".nom2 > span").text(usuarios_anteriores[4]);
		$('.nom2').show();
		canvasD = document.getElementById('canvas-der');
		canvasD.getContext('2d').drawImage(document.getElementById('foto5'), 0,0, canvasD.width, canvasD.height);
		
	});

	$(".seleccionable").on('click', function(){

				console.log("click seleccionable --------------------------------------");
				userSelected = true;
				waitScan = false;	
				second_user_scaned = false;

				$('#face2').addClass('aro');


				console.log("antes de mostrar foto en grande src = " + $(this).attr("src"));
				// Mostramos la foto en grande
				$("#face2 > img").attr('src','');
				$("#face2 > img").attr("src", $(this).attr("src"));

				// La metemos de una vez al canvas

				/*
				canvasD = document.getElementById('canvas-der');
				canvasD.getContext('2d').drawImage(document.getElementById('ojo2'), 0,0, canvasD.width, canvasD.height);

				console.log("dibuje imagen en canvas der");
				*/
				// Mostramos el texto
				// Este nombre como lo obtengo

				//console.log('click a ' + (parseInt($(this).parent().attr("id")) - 1));

								
				$('#instruccion_braza').hide();
	
				// Aparezco boton
				$('#boton1').fadeIn(400);

				// Obtengo src de la imagen para ZOOM
				ojo_elegido = $(this).attr('src');

	});

	$(".invita-amigo").click(function(){
		$('.nom2').hide();
		seleccionaCirculo(-1);
		$('#face2').removeClass('aro');

		waitScan = true;
		userSelected = false;
		waitingSecond = true;
		second_user_scaned = false;

		
		
		//Desaparecemos boton de continuar si esta
		$('#boton1').fadeOut(400);

		$('.nom2').hide();
		// Actualizamos texto arriba de cara 2
		$('#instruccion_braza > span').text('Pasa el brazalete de tu amigo.');
		$('#instruccion_braza').show();

		// Actualizmos imagen ciruclo grande 2
		$("#face2 > img").attr("src","../assets/mariposa.png");
		
		// Esperamos el escaneo
		var an = setInterval(function(){
			console.log('esperando scan de segundo');
			if(waitScan === false){
				clearInterval(an);
			}

			if(second_user_scaned){
				waitingSecond = false;

				second_user_name = user_name;
				second_user_foto = user_img_url;

				$('#face2').addClass('aro');
				$('#instruccion_braza').hide();
				$('.nom2').show();
				// Actualizamos datos con el usuario escaneado

				// Imagen

				$("#face2 > img").attr("src", second_user_foto);
				
				// Nombre
				$(".nom2 > span").text(second_user_name);

				//Aparecemos boton
				$("#boton1").fadeIn();
				
				
				clearInterval(an);
			}
		}, 200);
	});

	$("#boton1 > img").click(function(){
		$("#boton1 > img").attr('src', '../assets/continuar2.png');
		// Debo desactivar los clicks
		// #boton1
		// .seleccionable
		// #invita-amigo

		//$("#boton1 > img").off("click");
		//$(".seleccionable").off("click");
		//$("#invita-amigo").off("click");
		
		
		if(userSelected){

			outTransition('s-elige', function(){
				inTransition('s-coloca', function(){
					takePictures(1, ojo_elegido);
				});
			});
		
		}

		if(second_user_scaned){
			outTransition('s-elige', function(){
				inTransition('s-coloca', function(){
					//$("#boton1").off("click");
					//$(".seleccionable").off("click");
					//$("#invita-amigo").off("click");
					takePictures(2, '');
				});
			});
			
		}
	});


function waitSelection(){

		
}




function seleccionaCirculo(id){
	
	console.log(id);
	console.log('aaaaaaaa');
	ids = ['1','2','3','4','5'];

	// en el rfid
	if(id == -1){

		ids.forEach(function(e){
			$('.' + e).addClass('noselected');
		});
		$('#scan-rfid').removeClass('noselected');

	} else {
		$('#scan-rfid').addClass('noselected');
		for(i = 0; i < 5; i++){
			if(i != id){
				$('.' + ids[i]).addClass('noselected');
			} else {
				$('.' + ids[i]).removeClass('noselected');
			}
		}

	}


}

var png2;

/* 

Brinda funcionalidad a la pantalla de TOMAR FOTOS

*/

function takePictures(n, user_ojo_url){

var esperaSnapshot = function(){

	console.log("esperanado botonazo");
		$('#cam > img').click(function(){

			$('#instruccion_abajo').fadeOut();
			// Efecto boton apretado
			$(this).attr('src','../assets/camara2.png');

			$(this).off('click');


			/*
			$('#inst3').fadeOut(function(){
				// Cuando den botonazo a la camara cambiamos el texto de arriba
				$('#inst3').width((100 * (595 / SCREEN_DIM[0])) + '%');
				//$('#inst3').height((98 * factores[1]) + 'px');
				$('#inst3').attr('src', '../assets_finales/instrucción-parecidos3_595_98.png');

				$(this).fadeIn();
			});
			
			*/

			/*
			// Aparecemos contador
			$('#cam').fadeOut(function(){
				$('#contador > img').attr('src','../assets_finales/camara3.png');
				$('#contador').fadeIn();
			});
			*/


			//var t = 2;
			//var b = setInterval(function(){


				//if(t == 0){
					$('#flash-background').fadeIn(200, function(){
						
						$(this).fadeOut(200);
					});

					//$('#contador > img').attr('src','../assets_finales/camara' + t + '.png');					
					clearInterval(b);

					// Dibujamos snapshot del video en el conteneddor
					context.drawImage(video, 0, 0, canvas.width , canvas.height);

						// Guardamos el screenshot en un <img> para poder usar el detector
						var dataURL = canvas.toDataURL("image/png");
					    document.getElementById('img-canvas').src = dataURL;




					    $('#instruccion_abajo').fadeIn();
					    //Reconocer ojos en la <img> anterior
					    
					    detectaOjos("img-canvas", function(data){
					    	
					    	// No se detectaron ojos
					    	if(data.length == 0){
					    		
					    		// Desaparecemos la insruccion anterior

					    		//$('#inst3').fadeOut();


					    		/*
					    		$('#inst3').width((627 * factores[0]) + 'px');
					    		$('#inst3').height((98 * factores[1]) + 'px');
					    		$('#inst3').attr('src', '../assets/instrucción-parecidos4.3_627_98.png');
								*/



					    		//$("#arriba").animate({opacity:1},200);


					    		//$('#contador').fadeOut(function(){
					    		
						    		$('#cam > img').attr('src', '../assets/camara1.png')
						    		
						    		console.log("antes error");
						    		// Error
						    		$('#instruccion_abajo > span').text(mensaje_error);
						    		$('#instruccion_abajo').fadeIn();

						    		// aprecemos boton de camara y activamos clicks
						    		$('#cam').fadeIn();

						    		// Mostramos la silueta nuevamente

						    		$('#silueta').fadeIn();

						    		// Mostramos la camara de nuevo y ocultamos canvas e img
						    		
						    		$('#videocanvas').fadeOut();
						    		$('#img-canvas').fadeOut();
						    		$('#videocam').fadeIn();

						    		console.log('snap 1');
						    		esperaSnapshot();

					    		//});

					    		

					    	} else {
					    		$('#instruccion_abajo').fadeOut();
					    		// Una foto correcta del ojo

					    		fotosCorrectas++;
					    		
					    		// Primer ojo detectado
					    		eyeRect = data[0];

					    		// En este punto en el elemento CANVAS
					    		// tengo el snapshot de la cara
					    		// Entonces solo debo dibujar el cuadro del ojo
					    		ancho = eyeRect.width + 20;
					    		alto = eyeRect.height + 20;

					    		// Obtenemos el cuadro que contiene un ojo
					    		var imgData = context.getImageData(eyeRect.x, eyeRect.y, ancho, alto);
					    		
					    		var fs = require('fs')
					    		PNG = require('pngjs').PNG;

								var png1 = new PNG({
								    width: ancho,
								    height: alto,
								    filterType: -1
								});
								png2 = new PNG({
								    width: ancho,
								    height: alto,
								    filterType: -1
								});
								
								
								for(i = 0; i < ancho; i++){
									for(j = 0; j < alto; j++){
										 var idx = (png1.width * i + j) << 2;
										 png1.data[idx] = imgData.data[idx];
										 png1.data[idx + 1] = imgData.data[idx + 1];
										 png1.data[idx + 2] = imgData.data[idx + 2];
										 png1.data[idx + 3] = imgData.data[idx + 3];

										 png2.data[idx] = imgData.data[idx];
										 png2.data[idx + 1] = imgData.data[idx + 1];
										 png2.data[idx + 2] = imgData.data[idx + 2];
										 png2.data[idx + 3] = imgData.data[idx + 3];
									}
								}

								//recorreFotos(png2);

									/*function(){
									//Guardamos el ojo del usuario actual en un png 
									png1.pack().pipe(fs.createWriteStream('usuarios_actuales/ojo_usuario_' + fotosCorrectas + '.png'));

									// Guardamos el ojo para los usuarios anteriores
									//png2.pack().pipe(fs.createWriteStream('usuarios_anteriores/ojo_usuario_' + currentEye + '.png'));
									png2.pack().pipe(fs.createWriteStream('usuarios_anteriores/ojo_usuario_1.png'));

								});*/


								// Guardamos para meterla 
								//png.pack().pipe(fs.createWriteStream('ojo_' + currentEye + '.png'));
								
					    		var newCanvas = $("<canvas>")
								    .attr("width", imgData.width)
								    .attr("height", imgData.height)[0];
					    		context.clearRect(0, 0, canvas.width, canvas.height);
					    		//context.putImageData(imgData, 100, 100);

					    		// Mostramos la imagen del ojo en el canvas
					    		newCanvas.getContext("2d").putImageData(imgData, 0, 0);
					    		
					    		
					    		context.scale(canvas.width / imgData.width, canvas.height / imgData.height);

								context.drawImage(newCanvas, 0, 0);

								//fotos.push(canvas.toDataURL());
								fotos[fotosCorrectas - 1] = canvas.toDataURL();//'../usuarios_actuales/ojo_usuario_' + fotosCorrectas + '.png';
								

								// Metemos imagen en el cuadro correspondiente de elige ojo
								
								
								//$("#q :first").next().attr("src",canvas.toDataURL());//'../usuarios_anteriores/ojo_usuario_' + currentEye + '.png');
								
								if(n == 1){
									//recorreNombres();
									usuarios_anteriores[currentEye - 1] = first_user_name;
								}
								if(n == 2){
									if(fotosCorrectas == 1){
										usuarios_anteriores[currentEye - 1] = first_user_name;
									}
									if(fotosCorrectas == 2){
										usuarios_anteriores[currentEye - 1] = second_user_name;
									}
								}

								currentEye++;
								if(currentEye == 6){
									currentEye = 1;
								}
								context.scale(1/(canvas.width / imgData.width), 1/(canvas.height / imgData.height));
								

								if(fotosCorrectas == 1 && n == 2){
								

									console.log("foto 1 de 2");
									// Desaparecemos camara y silueta

									$('#silueta').fadeOut();
									$('#cam').fadeOut();

									$('#videocanvas').fadeIn();

									// anotamos texto "Bien continua foto amigo"
									$('#instruccion_abajo > span').text(mensaje_listo_2);

									$('#instruccion_abajo').fadeIn();

									/*
									$('#inst3').fadeOut(function(){
										$(this).width((100 * (803 / SCREEN_DIM[0])) + '%');
										//$(this).height((98 * factores[1]) + 'px');
										$(this).attr('src', '../assets_finales/instrucción-parecidos4.1_803_98.png');
										$(this).fadeIn();

									});
					*/

									// Aparecemos boton de continuar
									$("#continuar1").fadeIn();
									$("#continuar1").click(function(){
										$(this).attr('src', '../assets/continuar2.png');
										$(this).off('click');


										console.log('antes de restaurar');
										// componemos todo para tomar la foto
										restauraCamara();
										// Esperamos que tomen la foto
										console.log('snap2');
										esperaSnapshot();
									});
								}


								
							}
						});

				//}


			//	$('#contador > img').attr('src','../assets_finales/camara' + t + '.png');
			//	t--;
			//}, 1000); // Set interval
		


		
		}); // click
	};// esperaSnap




	$('#cam').fadeIn();

	that = this;
	fotosCorrectas = 0;
	fotos = ['',''];

	// En este canvas vamos a mostrar el screenshot
	var canvas = document.getElementById("videocanvas");
	var context = canvas.getContext("2d");


	if(n == 1){

		fotos[1] = user_ojo_url;

		console.log('snap3');
		esperaSnapshot();
		var f = setInterval(function(){
			if(fotosCorrectas == 1){
				console.log("desaparece silueta 1");
				$('#silueta').fadeOut();
				clearInterval(f);
				// Desaparecemos contador
				//$('#contador').fadeOut();

				// Mostramos la imagen del ojo
				$('#videocanvas').fadeIn();


				$('#cam').fadeOut();

				// Anotamos texto bien! continua para compara ambos ojos
				$('#instruccion_abajo > span').text(mensaje_listo_1);

				$('#instruccion_abajo').fadeIn();

				/*
				$('#inst3').fadeOut(function(){
					$(this).width((100 * (736 / SCREEN_DIM[0])) + '%');
					//$(this).height((98 * factores[1]) + 'px');
					$(this).attr('src', '../assets_finales/instrucción-parecidos4.2_736_98.png');
					$(this).fadeIn();
				});
				*/



				// Aparecemos boton de continuar
				$('#continuar1').fadeIn(function(){
					$(this).click(function(){
						$(this).off('click');
						
						// Efecto boton apretado
						$(this).attr('src', '../assets/continuar2.png');
						var canvasIzq = document.getElementById("canvas-izq");
						var ctxI = canvasIzq.getContext('2d');
						var canvasDer = document.getElementById("canvas-der");
						var ctxD = canvasDer.getContext('2d');
						var im1 = new Image;
						var im2 = new Image;
						im1.src = fotos[0];
						im2.src = fotos[1];
						console.log("src im1 " + im1.src);
						console.log("src im2 " + im2.src);
						
						im1.onload = function(){
							ctxI.drawImage(im1,0,0,canvasIzq.width,canvasIzq.height);
						};
						
						im2.onload = function(){
							ctxD.drawImage(im2,0,0,canvasDer.width,canvasDer.height);
						};

						//trackTransforms(ctxI);
						//trackTransforms(ctxD);

						outTransition('s-coloca', function(){

							recorreFotos(png2);
								inTransition('s-zoom', function(){
									mainInteraction(fotos, canvasIzq, canvasDer);
								});
							});
					});
				});


			}
		}, 100);
	} else {

		//Esperamos a que tomen dos fotos correctas
		console.log('snap4');
		esperaSnapshot();

		var espera = setInterval(function(){
		

			if(fotosCorrectas == 2){
				clearInterval(espera);
				$('#silueta').fadeOut();
				$('#cam').fadeOut();
				// Desaparecemos contador
				//$('#contador').fadeOut();

				// Mostramos la imagen del ojo
				$('#videocanvas').fadeIn();

				// Anotamos texto bien! continua para compara ambos ojos
				$('#instruccion_abajo > span').text(mensaje_listo_1);
				$('#instruccion_abajo').fadeIn();
				/*
				$('#inst3').fadeOut(function(){
					$(this).width((100 * (736 / SCREEN_DIM[0])) + '%');
					//$(this).height((98 * factores[1]) + 'px');
					$(this).attr('src', '../assets_finales/instrucción-parecidos4.2_736_98.png');
					$(this).fadeIn();
				});
				*/

				// Aparecemos boton de continuar
				$('#continuar1').fadeIn(function(){
					$(this).click(function(){
						$(this).off('click');
						
						// Efecto boton apretado
						$(this).attr('src', '../assets/continuar2.png');
						var canvasIzq = document.getElementById("canvas-izq");
						var ctxI = canvasIzq.getContext('2d');
						var canvasDer = document.getElementById("canvas-der");
						var ctxD = canvasDer.getContext('2d');
						var im1 = new Image;
						var im2 = new Image;
						im1.src = fotos[0];
						im2.src = fotos[1];

						im1.onload = function(){
							ctxI.drawImage(im1,0,0,canvasIzq.width,canvasIzq.height);
						};
						
						im2.onload = function(){
							ctxD.drawImage(im2,0,0,canvasDer.width,canvasDer.height);
						};


						outTransition('s-coloca', function(){

							recorreFotos(png2);
								inTransition('s-zoom', function(){
									console.log("antes main");
									mainInteraction(fotos, canvasIzq, canvasDer);
								});
							});
					});
				});


			}
		}, 100);

	}

}//take piktures

function restauraCamara(){


	$('#silueta').fadeIn();
	$('#noom > span').text(second_user_name);
	// Desaparecemos boton de continuar
	$('#continuar1').fadeOut();
	$('#continuar1').attr('src', '../assets/continuar1.png');

	// Desaparecemmos texto de arriba y aparecemos nuevo

	$('#inst3').hide();
	$('#instruccion_abajo > span').text(mensaje_toma);
	$('#instruccion_abajo').fadeIn();
	$('#cam > img').attr('src', '../assets/camara1.png');
	// Desaparecmos foto mostrada de ojo y mostramos la cam
	// silueta y boton de camara

	$('#videocanvas').fadeOut(function(){
		$('#videocam').fadeIn(function(){
			$('#cam').fadeIn();
			$('#silueta').fadeIn();
		});
	});
}


var cI;
var cD;
var imI;
var imD;

function mainInteraction(fotos, canvasI, canvasD){
	console.log("listo para zoom!");
	console.log(fotos[0]);
	console.log(fotos[1]);

/*
	$("#canvas-izq").attr("width", $("#ojoizq-wrap").width());
	$("#canvas-izq").attr("height", $("#ojoizq-wrap").height());

	$("#canvas-der").attr("width", $("#ojoder-wrap").width());
	$("#canvas-der").attr("height", $("#ojoder-wrap").height());
*/
	var im1 = new Image;
	im1.src = fotos[0];//'http://phrogz.net/tmp/gkhead.jpg';

	var im2 = new Image;
	im2.src = fotos[1];

	//putReady(canvasI, im1);
	//putReady(canvasD, im2);


	cI = canvasI;
	cD = canvasD;
	imI = im1;
	imD = im2;

	var primera = true;

	escuchaDrag('slider_big');

	// Boton de t4rminar
	
	$("#terminar").click(function(){
		//cI.getContext('2d').restore();
		//cD.getContext('2d').restore();
		$(this).attr('src', '../assets/terminar2.png');
		console.log("click en terminar");

		$('#terminar').off('click');

		terminaApp();
	});	
}


var sl_inicial;
var sl_final;
var sl_x;
var sl_y;
var dragging = false;

var total;

// Esta var va desde 0 a total
var pos_anterior = 0;

var acumulador = 1;

function escuchaDrag(id){

	sl_big_ini = parseFloat($('#slider_big').css('left'));

	sl_inicial = parseFloat($('#slider').css('left'));

	dist = sl_inicial - sl_big_ini;

	sl_final = sl_inicial + parseFloat($('#barra').width()) - parseFloat($('#slider').css('width'));
	total = sl_final - sl_inicial;
	
	document.getElementById(id).addEventListener('dragstart', tDragStart, false);
	document.getElementById(id).addEventListener('drag', tDrag, false);
	document.getElementById(id).addEventListener('dragend', tDragEnd, false);
}

function tDragStart(e){
	console.log(e);
	dragging = true;
	e.dataTransfer.effectAllowed = "move";
	e.dataTransfer.dropEffect = 'move';
	var img = document.createElement("img");
    img.src = "../assets/cuadrito.png";
    img.style.visibility = 'hidden';
   	//e.style.cursor = 'none';
    e.dataTransfer.setDragImage(img, 0, 0);

}


var primer_drag = true;

function tDrag(e){

	if(dragging){

		if(primer_drag){
			primer_drag = false;

			$('#terminar').fadeIn();
			$('#toca_terminar').fadeIn();

			setTimeout(function(){
				$('#inst4').fadeOut();
			}, 2000);
		}
		if(sl_inicial <= e.clientX  && e.clientX <= sl_final){
			$('#slider').css('left', e.clientX  + 'px');
			
			$('#slider_big').css('left', e.clientX - dist + 'px');
			// Primero mapear e.clientX a [0,1]

			valor_m = (e.clientX - sl_inicial) / (sl_final - sl_inicial);
			doZoom(valor_m);




		} 
		if(e.clientX < sl_inicial){
			$('#slider').css('left', sl_inicial + 'px');
			$('#slider_big').css('left', sl_big_ini + 'px');
		}
		if(e.clientX > sl_final){
			$('#slider').css('left', sl_final + 'px');
			$('#slider_big').css('left', (sl_final - dist) + 'px');	
		}
	}
}
function tDragEnd(e){
	if(dragging){
		dragging = false;
		if(sl_inicial <= e.clientX  && e.clientX <= sl_final){
			$('#slider').css('left', e.clientX + 'px');
		} 
		if(e.clientX < sl_inicial){
			$('#slider').css('left', sl_inicial + 'px');
			$('#slider_big').css('left', sl_big_ini + 'px');
		}
		if(e.clientX > sl_final){
			$('#slider').css('left', sl_final + 'px');
			$('#slider_big').css('left', (sl_final - dist) + 'px');
		}
	}
}

function tStart(e){
	console.log(e);
}
function tMove(e){
	console.log(e);
}
function tEnd(e){
	console.log(e);
}


// Aplica Zoom con escala de 1 a 3
function doZoom(valor){
	zoom = 1 + valor * (2);

	$('#canvas-izq').css('-webkit-transform','scale(' + zoom + ',' + zoom + ')');
	$('#canvas-der').css('-webkit-transform','scale(' + zoom + ',' + zoom + ')');
}


/*
CAMBIOS AQUI
======================================================================================================================================================================================
======================================================================================================================================================================================
======================================================================================================================================================================================
======================================================================================================================================================================================
*/
function terminaApp(){
	console.log('termina App!');

		console.log("terminando app");
		//uneOjos();

		outTransition('s-zoom', function(){
			inTransition('s-final', function(){
				



				var t = esperaFinal;
				var a = setInterval(function(){
					if(t == 0){
						clearInterval(a);
						// Reiniciar variables de control de usuarios
						reiniciaApp();
						outTransition('s-final', function(){
							inTransition('s-inicial', function(){
								waitUser();
							})
						});						
						
					}
					t--;
				}, 1000);

				/*
				$('#reiniciar').click(function(){
					$(this).attr('src','../assets_finales/reiniciar2.png');
					$(this).off('click');
					reiniciaApp();
					outTransition('s-final', function(){
						inTransition('s-inicial', function(){
							waitUser();
						})
					});		
					clearInterval(a);
				});*/

			});
		});

}

function reiniciaApp(){


	


	var gui = require('nw.gui');
	gui.App.clearCache();



	user_img_url = "";
	user_name = "";
	user_id = "";
	first_user_scanned = false;
	second_user_scaned = false;
	waitingSecond = false;
	anterior = '';
	cargaCaras();
	$('.nom1 > span').text('');
	$('.nom2 > span').text('');
	$('#cam > img').off('click');


	$('#face2').removeClass('aro');
	$('#ojo2').attr('src','../assets/invitado.png');


		
}





function detectaOjos(imgId, handler) {
	
	var canvas = document.getElementById("videocanvas");
	var context = canvas.getContext("2d");
	var tracker = new tracking.ObjectTracker(['eye']);
	
	numOjos = 0;

	tracker.setInitialScale(4);
	tracker.setStepSize(2);
	tracker.setEdgesDensity(0.1);
	tracking.track('#' + imgId, tracker);
	  
	tracker.on('track', function(event) {

		handler(event.data);
   
  });
}


function uneOjos(){
	canvas = document.getElementById('mix-eye');
		ctx = canvas.getContext('2d');
		console.log('une ojos! ' + canvas.width);
		app_path = '~/Desktop/interactivos_V2/parecidos_ojos_V2/app/';//document.URL.replace('views/index.html', '');
		script_path = app_path + 'js/eye_tracker.py';
		ojos_urls = [app_path + 'eye2.jpg', app_path + 'eye3.jpg'];
		console.log(canvas.width + " <--------");
		comando_iris = "python " + script_path + ' ' + ojos_urls[0] + " 40 " + ojos_urls[1] + " 20 " + canvas.width;
		//comando_iris = "python eye_tracker.py " + ojos_urls[0] + " 40 " + ojos_urls[1] + " 20 " + canvas.width;
		var exec = require('child_process').exec;
		
		var child = exec( comando_iris, 
		function(error, stdout, stderr){
			console.log(error);
			console.log(stderr);
			acomodaIris(canvas);
			console.log(stdout);

		});	
}

function acomodaIris(canvas){
	ctx = canvas.getContext('2d');

	iris_izq = new Image();
	iris_izq.src = '../iris_izq.png';
	iris_izq.onload = function(){
		ctx.drawImage(iris_izq, 0, 0);
	};

	iris_der = new Image();
	iris_der.src = '../iris_der.png';
	iris_der.onload = function(){
		ctx.drawImage(iris_der, canvas.width / 2, 0);
	}
	

}

function putReady(canvas, gkhead){

	
	gkhead.width = canvas.width;
	gkhead.height = canvas.height;
	var ctx = canvas.getContext('2d');
	trackTransforms(ctx);
	ctx.save();

	//redraw(canvas, gkhead);

}
function zoom(canvas, gkhead, delta){

	console.log("offsetleft canvas izq " + canvas.offsetLeft);
	console.log("offsetTop canvas izq " + canvas.offsetTop);
	var ctx = canvas.getContext("2d");
	var pt = ctx.transformedPoint(canvas.offsetLeft + (canvas.width / 2), canvas.offsetTop + (canvas.height / 2));
	ctx.translate( pt.x, pt.y);
	var factor = Math.pow(1.01,delta);
	ctx.scale(factor,factor);
	ctx.translate(-pt.x,-pt.y);
	//ctx.translate(-(canvas.offsetLeft + (canvas.width / 2)) , -(canvas.offsetTop + (canvas.height / 2)));
	redraw(canvas, gkhead);
}
function zoom2(canvas, gkhead, delta){

	console.log("offsetleft canvas der " + canvas.offsetLeft);
	console.log("offsetTop canvas der " + canvas.offsetTop);
	var ctx = canvas.getContext("2d");
	var pt = ctx.transformedPoint(/*canvas.offsetLeft - 500 +  */(canvas.width / 2), canvas.offsetTop + (canvas.height / 2));
	ctx.translate( pt.x, pt.y);
	var factor = Math.pow(1.01,delta);
	ctx.scale(factor,factor);
	ctx.translate(-pt.x,-pt.y);
	//ctx.translate(-(canvas.offsetLeft + (canvas.width / 2)) , -(canvas.offsetTop + (canvas.height / 2)));
	redraw(canvas, gkhead);
}
function redraw(canvas, gkhead){
	ctx = canvas.getContext('2d');
	// Alternatively:
	ctx.save();
	ctx.setTransform(1,0,0,1,0,0);
	ctx.clearRect(0,0,canvas.width,canvas.height);
	ctx.restore();
	ctx.drawImage(gkhead, 0, 0, canvas.width, canvas.height);
		
			
}
	

// Adds ctx.getTransform() - returns an SVGMatrix
// Adds ctx.transformedPoint(x,y) - returns an SVGPoint
function trackTransforms(ctx){
		var svg = document.createElementNS("http://www.w3.org/2000/svg",'svg');
		var xform = svg.createSVGMatrix();
		ctx.getTransform = function(){ return xform; };
		
		var savedTransforms = [];
		var save = ctx.save;
		ctx.save = function(){
			savedTransforms.push(xform.translate(0,0));
			return save.call(ctx);
		};
		var restore = ctx.restore;
		ctx.restore = function(){
			xform = savedTransforms.pop();
			return restore.call(ctx);
		};

		var scale = ctx.scale;
		ctx.scale = function(sx,sy){
			xform = xform.scaleNonUniform(sx,sy);
			return scale.call(ctx,sx,sy);
		};
		var rotate = ctx.rotate;
		ctx.rotate = function(radians){
			xform = xform.rotate(radians*180/Math.PI);
			return rotate.call(ctx,radians);
		};
		var translate = ctx.translate;
		ctx.translate = function(dx,dy){
			xform = xform.translate(dx,dy);
			return translate.call(ctx,dx,dy);
		};
		var transform = ctx.transform;
		ctx.transform = function(a,b,c,d,e,f){
			var m2 = svg.createSVGMatrix();
			m2.a=a; m2.b=b; m2.c=c; m2.d=d; m2.e=e; m2.f=f;
			xform = xform.multiply(m2);
			return transform.call(ctx,a,b,c,d,e,f);
		};
		var setTransform = ctx.setTransform;
		ctx.setTransform = function(a,b,c,d,e,f){
			xform.a = a;
			xform.b = b;
			xform.c = c;
			xform.d = d;
			xform.e = e;
			xform.f = f;
			return setTransform.call(ctx,a,b,c,d,e,f);
		};
		var pt  = svg.createSVGPoint();
		ctx.transformedPoint = function(x,y){
			pt.x=x; pt.y=y;
			return pt.matrixTransform(xform.inverse());
	}
}


var using_;
function recorreFotos(png){

	/*
	for(var user = 5; user > 1; user--){
		cara_anterior = $("#" + (user - 1) + " :first").next().attr("src");
		$('#' + user + ' :first').next().attr('src', cara_anterior);
		//$("#" + (user - 1) + " :first").next().attr("src"),canvas.toDataURL());//'../usuarios_anteriores/ojo_usuario_' + currentEye + '.png');
	}*/

	if(!using_){
		require('fs').unlinkSync('usuarios_anteriores/ojo_usuario_5.png');

		require('fs').renameSync('usuarios_anteriores/ojo_usuario_4.png','usuarios_anteriores/ojo_usuario_5_.png');

		//require('fs').unlinkSync('usuarios_anteriores/ojo_usuario_4.png');
		require('fs').renameSync('usuarios_anteriores/ojo_usuario_3.png','usuarios_anteriores/ojo_usuario_4_.png');

		//require('fs').unlinkSync('usuarios_anteriores/ojo_usuario_3.png');
		require('fs').renameSync('usuarios_anteriores/ojo_usuario_2.png','usuarios_anteriores/ojo_usuario_3_.png');
		//require('fs').unlinkSync('usuarios_anteriores/ojo_usuario_2.png');
		require('fs').renameSync('usuarios_anteriores/ojo_usuario_1.png','usuarios_anteriores/ojo_usuario_2_.png');

		png.pack().pipe(require('fs').createWriteStream('usuarios_anteriores/ojo_usuario_1_.png'));

		using_ = true;
		json.using_ = using_;

		require('fs').writeFileSync('package.json', JSON.stringify(json));



	} else {
		require('fs').unlinkSync('usuarios_anteriores/ojo_usuario_5_.png');

		require('fs').renameSync('usuarios_anteriores/ojo_usuario_4_.png','usuarios_anteriores/ojo_usuario_5.png');

		//require('fs').unlinkSync('usuarios_anteriores/ojo_usuario_4.png');
		require('fs').renameSync('usuarios_anteriores/ojo_usuario_3_.png','usuarios_anteriores/ojo_usuario_4.png');

		//require('fs').unlinkSync('usuarios_anteriores/ojo_usuario_3.png');
		require('fs').renameSync('usuarios_anteriores/ojo_usuario_2_.png','usuarios_anteriores/ojo_usuario_3.png');
		//require('fs').unlinkSync('usuarios_anteriores/ojo_usuario_2.png');
		require('fs').rename('usuarios_anteriores/ojo_usuario_1_.png','usuarios_anteriores/ojo_usuario_2.png', function(){
			png.pack().pipe(require('fs').createWriteStream('usuarios_anteriores/ojo_usuario_1.png'));
			using_ = false;
			json.using_ = using_;

			require('fs').writeFileSync('package.json', JSON.stringify(json));

		});

	}
	
	
	
	

}


function cleanData(data){
	id_pulsera = data.replace("\u0002", "").replace("\r", "").replace("\u0003","");
	return id_pulsera;
};


/*
function requestUserData(id_pulsera){
	$.getJSON('http://artehum.com.mx/hot/datos.php', { get_param: 'value' }, function(data) {
			$.each(data, function(index, element) {
				if (element.idpul === id_pulsera) {
	    			
	    			if(first_user_scanned && waitingSecond){
	    				second_user_scaned = true;
	    			}		
					// AQUI HACES LO NECESARIO CON TUS DATOS
	    			user_img_url = element.foto;
	    			user_name = element.nombre;
	    			user_id = element.id;
	    			console.log("id: " + user_id + " nombre: " + user_name + " url_foto: " + user_img_url);
	   				first_user_scanned = true;
	   				console.log("regrsé user!");

	   				//return [element.id, element.nombre, element.foto];

	   				}
				});
			});
};
*/
function requestUserData(id_pulsera){
         $.getJSON('http://artehum.com.mx/hot/usuario.php?rfid='+id_pulsera, { get_param: 'value' }, function(data) {
                 $.each(data, function(index, element) {
                     
	    				if(first_user_scanned && waitingSecond){
		    				second_user_scaned = true;
		    			}		
						// AQUI HACES LO NECESARIO CON TUS DATOS
		    			user_img_url = element.foto;
		    			user_name = element.nombre;
		    			user_id = element.id;
		    			console.log("id: " + user_id + " nombre: " + user_name + " url_foto: " + user_img_url);
		   				first_user_scanned = true;
		   				console.log("regrsé user!");
                         // AQUI HACES LO NECESARIO CON TUS DATOS
/*
                         user_img_url = element.foto;
                         user_name = element.nombre;
                         user_id = element.id;
                         rfid = id_pulsera;*/

                         /*
                         if(user_id == null){
                           $('#noUsuario').fadeIn().delay(3000).fadeOut();
                         }else{
                            $('#titulo').fadeOut();
                            $('#rfid').fadeOut();
                            $('#inicio').fadeIn();
                            $('#userData').fadeIn();
                            $('#userScreen').fadeIn();
                            $('#saludo').append(' ' + user_name + '!');
                            $('#foto').attr('src',user_img_url);
                            serialPort.close();

                         }*/

                         console.log(id_pulsera)
                         //console.log("id: " + user_id + " nombre: " + user_name + " url_foto: " + user_img_url + "rfid" + rfid);
                         first_user_scanned = true;
                         console.log("Vientos usuario!");

                            //return [element.id, element.nombre, element.foto];

                            
                     });
                 });
     };


function checkLastInteraction(){
	var d = new Date();
	var ultima_vez = d.getTime();

	// Cambiar el evento a mousemove
	document.addEventListener('mousedown', function(){
			ultima_vez = d.getTime();
	});

	var checker = setInterval(
		function(){
			d = new Date();
			if(currentScreen == 's-inicial' || currentScreen == 's-final'){
				ultima_vez = d.getTime();
				return;
			}
			if((d.getTime() - ultima_vez) > tiempo_espera && currentScreen != 's-inicial' && currentScreen != 's-final' && currentScreen != 'sigues-ahi'){
				anterior = currentScreen;

				

				console.log(currentScreen + ' aaa');
				// Entra la pantalla de sigues ahi
				
				inTransition('sigues-ahi', function(){
					esperaInteraccion(anterior);
				});

			}
		}
	, 100);

}

/*
	El usuario no ha tocado pantalla y la pantalla actual es sigues-ahi
	Necesito saber cual era la pantalla anterior
*/
function esperaInteraccion(anterior){


    spriteTimer.play();
	//reloj.TimeCircles({ time: { Days: { show: false }, Hours: { show: false }, Minutes: { show: false } }});
    //reloj.TimeCircles().start();

    t = 9;
	var espera = setInterval(function(){
		if(t == 0){
			//reloj.TimeCircles().stop();
			spriteTimer.stop();
			$('.textDiv_Seconds > span').text('10');
			clearInterval(espera);
			console.log(anterior + '    aaant');
			if(show_concepto){
					console.log("anterior concepto!!");
					outTransition('concepto', function(){});
					//outTransition('s-elige', function(){});
			}
			outTransition('sigues-ahi', function(){});
			$('.terminar-esquina').fadeOut();
			outTransition(anterior, function(){
				reiniciaApp();
				inTransition('s-inicial', waitUser);
			});
			
		}
		t--;
	}, 970);

	$('#sigues-ahi').click(function(){
		//$('.textDiv_Seconds > span').text('10');
		clearInterval(espera);
		
		spriteTimer.stop();
		outTransition('sigues-ahi', function(){
			currentScreen = anterior;
		})
		$(this).off('click');
	});	
}

function checkLogout(){
	var pantalla_anterior;
	$('#logout').click(function(){
		pantalla_anterior = currentScreen;
		$(this).attr('src', '../assets/salida2.png');
		console.log('click salir anterior ' + pantalla_anterior);
		inTransition('salir', function(){

		});
	});
	$('#si').click(function(){
		//$(this).off('click');
		$('#logout').fadeOut();
		$("#logout").attr('src', '../assets/salida1.png');
		$(this).attr('src','../assets/si2.png');
		outTransition('salir', function(){});
		/*
		if(pantalla_anterior === 's-zoom'){
			can_izq.getContext('2d').restore();
			can_der.getContext('2d').restore();
		}*/
		
		outTransition(pantalla_anterior, function(){
			reiniciaApp();

			inTransition('s-inicial', waitUser);
		});
	});
	$('#no').click(function(){
		//$(this).off('click');
		$("#logout").attr('src', '../assets/salida1.png');
		$(this).attr('src','../assets/no2.png');
		outTransition('salir', function(){
			currentScreen = pantalla_anterior;
		});
	});
}


var json;

$(document).ready(function(){




 file = require('fs').readFileSync('package.json', 'utf-8');

 json = JSON.parse(file);

 using_ =  json.using_;




/*

{
  "using_": true,
  "name": "parecidosojos",
  "main": "views/index.html",
  "version": "0.0.1",
  "single-instance": true,
  "window": {
    "title": "parecidosOjos",
"width": 1920,
"height": 1080,
    "fullscreen" : true,
    "toolbar": true
  },
  "chromium-args": "--child-clean-exit"
}



*/


/*
var gui = require('nw.gui');
console.log(gui.App.argv);

if(gui.App.argv[0] === 'false'){
	using_ = false;
} else {
	using_ = true;
}

console.log(using_ + ' akaka');
*/



	/*
	for(module in global.require.cache){
    	if(global.require.cache.hasOwnProperty(module)){
        	delete global.require.cache[module];
    	}
	}
location.reload()
4('')
*/

	$('#icono-rfid').click(function(){
		outTransition('s-inicial', function(){
			inTransition('s-elige', function(){
				
				segunda()
			});
		});
	});
	setupApp();
	inTransition('s-inicial', function(){
				

		waitUser();
	});
	
	checkLogout();
	//checkLastInteraction();

	$(window).on('resize', function(){
      var win = $(this); //this = window
      $('#face1').width((win.width() * 0.316) + 'px');
      $('#face1').height((win.width() * 0.316) + 'px');
      $('#face2').width((win.width() * 0.316) + 'px');
      $('#face2').height((win.width() * 0.316) + 'px');


      // antes 0.046
      $('.cara-lateral').width((win.width() * 0.05208) + 'px');
      $('.cara-lateral').height((win.width() * 0.05208) + 'px');

      $('.marco').width((win.width() * 0.05208) + 'px');
      $('.marco').height((win.width() * 0.05208) + 'px');

      $('#scan-rfid').width((win.width() * 0.05208) + 'px');
	$('#scan-rfid').height((win.width() * 0.05208) + 'px');


});

			// Primero obtenemos la lista de puertos de la computadora
		// ejecutando el comando ls /dev/tty.* 
		var exec = require('child_process').exec;
		var child = exec("ls /dev/tty.*", 
			function(error, stdout, stderr){
				datos = stdout.split("\n");

				// Para cada puerto hacemos una busqueda de
				// aquellos que contengan la cadena "usb"
				// Esto podría cambiarse por un 'filter' para que no
				// inicialice puertos de más.
				datos.forEach(
					function(puertoS){
						if(puertoS.indexOf("usb") > -1){
							// creamos objeto puerto
							serialport = new serialPort(puertoS, 
								
								// Función manejadora de los
								// datos leidos del puerto serial.

								function(dataRecieved){
									if(!first_user_scanned){
										requestUserData(cleanData(dataRecieved));
									}
									if(first_user_scanned && waitingSecond){
										requestUserData(cleanData(dataRecieved));
									}	
								}
							);
							// Lo inicializamos
							serialport.init();
						}
					}
				);
			}
		);

/*
var aa = setInterval(function(){
	console.log("anteriooor "+ anterior);
	console.log("currentScreen " + currentScreen);
}, 1000);

*/

		$('#s-inicial').click(function(){
			outTransition('s-inicial', function(){
				inTransition('s-elige', function(){
					
					segunda()
				});
			});
		});


});
