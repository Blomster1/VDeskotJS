	var memory = undefined;
	var edition = false;
	var topSide = true;
	var zoneAffJQ;

	$(document).ready(function() {
		$.fn.runCalc = function(){
			$( "#listeChoixCalc" ).accordion({
				collapsible: true,
				heightStyle: "content"
			});

			$("input[type='button']").button();
			
			$(this)
				.attr('tabindex', 1)
				.keypress(function( event ) {
					//event.preventDefault();
					var k = event.which;
					//console.log(k);
					if( !zoneAffJQ.is(':focus') ) {
						// 1
						if( k == 38 || k == 49 )
							zoneAffJQ.affiche(1);
						// 2
						else if( k == 50 || k == 233 )
							zoneAffJQ.affiche(2);
						// 3
						else if( k == 51 || k == 34 )
							zoneAffJQ.affiche(3);
						// 4
						else if( k == 39 || k == 52 )
							zoneAffJQ.affiche(4);
						// 5
						else if( k == 53 )
							zoneAffJQ.affiche(5);
						// 6
						else if( k == 54 )
							zoneAffJQ.affiche(6);
						// 7
						else if( k == 55 || k == 232 )
							zoneAffJQ.affiche(7);
						// 8
						else if( k == 95 || k == 56 )
							zoneAffJQ.affiche(8);
						// 9
						else if( k == 57 || k == 231 )
							zoneAffJQ.affiche(9);
						// 0
						else if( k == 48 || k == 224 )
							zoneAffJQ.affiche(0);
						// ENTER
						else if( k == 13 )
							$('#calcul').trigger('click');

						// +
						else if( k == 43 || k == 61 )
							zoneAffJQ.affiche('+');

						// -
						else if( k == 45)
							zoneAffJQ.affiche('-');

						// *
						else if( k == 42 )
							zoneAffJQ.affiche('*');

						// /
						else if( k == 47 || k == 58 )
							zoneAffJQ.affiche('/');

						// .
						else if( k == 46 || k == 59 )
							zoneAffJQ.affiche('.');

						// (
						else if( k == 40 )
							zoneAffJQ.affiche('(');

						// )
						else if( k == 41 )
							zoneAffJQ.affiche(')');
					}
					
				})
				.keydown(function( event ) {
					var k = event.keyCode;
					console.log(k);
				
					// BACKSPACE
					if( k == 8 ) {
						event.preventDefault();
						var value = zoneAffJQ.val();
						zoneAffJQ.val( value.substr( 0, value.length - 1 ) );
						console.log(value.substr( 0, value.length - 1 ));
					}
				})
				.focus();

		};

		$.fn.affiche = function( val ) {
			
			//console.log(val);
			
			if( val === undefined )
				zoneAffJQ.val(zoneAffJQ.val() + $(this).val());
			else 
				zoneAffJQ.val(zoneAffJQ.val() + val);
			
			//console.log('[' + zoneAffJQ.val() + ']');
		};

		$.fn.openDialog = function( titre, text ){
			$('<div/>', { title: titre})
				.html( text )
				.appendTo('body')
				.dialog({
					autoOpen: true,
					modal: true,
					title: titre,
					show: {
						effect: "blind",
						duration: 1000
					},
					hide: {
						effect: "explode",
						duration: 1000
					},
					buttons: [{
						text: "OK",
						click: function() {
							$(this).dialog("close");
						}
					}]

				});
		};

		$.fn.edit = function(){
			$(this)
				.attr("type", "text")
				.dblclick(function(){
					$(this).fix();
				})
				.blur(function(){
					$(this).save();
				});
		};

		$.fn.fix = function(){
			$(this)
				.attr("type", "button")
				.dblclick(function(){
					$(this).edit();
				})
				.save();
		};

		$.fn.save = function(){
			console.log($(this).attr('id'));
			document.cookie = $(this).attr('id') + "=" + $(this).val();
			console.log(JSON.parse(toJSON()));

			ajax("POST", null, "libs/calulatrice/save.php", true, toJSON());
		};

		$.fn.initValue = function(){
			$(this).val('');
		};


		zoneAffJQ = $('#zone_affichage');
		zoneAffJQ.initValue();

		ajax("POST", majEtat, 'libs/calulatrice/recupEtat.php', true, null);

		var btns = $(".bouton_simple");

		btns.click(function() {
			$(this).affiche();
		});

		$('#calcul').click(function() {
			try {
				var valueTosend = zoneAffJQ.val().replace(/Math\./g, "");
				ajax("GET", maj_zone_aff, "libs/calulatrice/process.php", true, valueTosend);

			} catch (err) {
				$(this).openDialog('Erreur', err);
				//alert("Erreur ! " + err);
				console.error(err);
			}
		});

		$('#CE').click(function() {
			zoneAffJQ.initValue();
		});

		$('#MC').click(function() {
			memory = undefined;
		});

		$('#MR').click(function() {
			zoneAffJQ.val((memory === undefined) ? zoneAffJQ.val() : memory + zoneAffJQ.val());
		});

		$('#MS').click(function() {
			var regex = /^-?\d+\.?\d*$/;

			if (regex.test(zoneAffJQ.val()))
				memory = zoneAffJQ.val();
			else
				$(this).openDialog('Erreur', 'Impossible d\'effectuer l\'action');
				//alert("Impossible d'effectuer l'action");
		});

		$('#plusMoins').click(function() {
			zoneAffJQ.val((zoneAffJQ.val().charAt(0) == '-') ? zoneAffJQ.val().substr(1, zoneAffJQ.val().length) : ('-' + zoneAffJQ.val()));
		});

		$('#E').click(function(){
			var btnE = $(this);
			var btnEdit = $('.bouton_libre');

			if (!edition) {
				edition = true;
				btnE.css('color', 'red');

				btnEdit.each(function() {
					$(this)
						.button('destroy')
						.addClass('bouton_simple bouton_libre')
						.unbind("click")
						.dblclick(function(){
							$(this).edit();
						})
						.attr("type", "text")
						.css({
							width: "100px",
							padding: "5px"
						})
						.unbind("blur");
				});


			} else {
				edition = false;
				btnE.removeAttr("style");

				btnEdit.each(function() {
					$(this)
						.removeAttr("style")
						.click(function(){
							$(this).affiche();
						})
						.attr("type", "button")
						.button();
				});
			}
		});




		zoneAffJQ.autocomplete({
			source: "libs/calulatrice/search.php",
			minLength: 2,
			select: function(event, ui) {
				$(this).val(ui.item ?
					"Selected: " + ui.item.value + " aka " + ui.item.id :
					"Nothing selected, input was " + this.value);
			}})
			.dblclick(function(){
				var calc = $('#calc');
				var aff = $('#ligne_affichage');

				aff.removeChild(aff);
				console.log(topSide);

				if (topSide) {
					topSide = false;
					calc.append(aff);

				} else {
					topSide = true;
					calc.prepend(aff);
				}
			});


		$('.draggable').draggable({
			revert: true,
			start: function(event, ui){
				$('.draggable').addClass('noDraggable');
				ui.helper.removeClass('noDraggable');

				//console.log(ui.helper.attr('class'));
			},
			stop: function(event, ui){
				$('.draggable').removeClass('noDraggable');
			}
		});
		$('.bouton_libre').droppable({
			accept: ".draggable",
			drop: function(event, ui) {
				//console.log(ui);
				if( edition ) {
					ui.draggable.removeAttr('style');
					$(this).val(ui.draggable.text());

					ui.draggable.save();
				}
			}
		});
		
		
		
		//$('#calc').runCalc();

	});




	function ajax(type, callback, url, async, dataU) {
		if (type === "POST") {
			$.post(url, {data: dataU})
				.done(function(dataR) {
					if (callback != null)
						callback(dataR);
				});

		} else if (type === "GET")
			$.get(url, {data: dataU})
				.done(function(dataR) {
					if (callback != null)
						callback(dataR);
				});
		else
			console.error("Erreur AJAX");
	}


	function toJSON() {
		var btnEdit = $(".bouton_libre");
		var fx = [];
		var i = 0;

		btnEdit.each(function() {
			fx[i] = {
				id: $(this).attr('id'),
				value: $(this).val()
			};
			i++;
		});

		var data = {
			memory: zoneAffJQ.val(),
			functions: fx
		};

		return JSON.stringify(data);
		//return data;
	}

	function maj_zone_aff(data) {
		zoneAffJQ.val(eval(data));
	}

	function majEtat(data) {
		data = JSON.parse(data);
		//console.log(data);

		zoneAffJQ.val(data.memory);
		//console.log(data.functions);

		for (indiceFx in data.functions) {
			var fx = data.functions[indiceFx];

			var elem = $('#' + fx.id);

			console.log(fx);

			elem.val(fx.value);
		}
	}

	function getCookie(cname) {
		var name = cname + "=";
		var ca = document.cookie.split(';');
		console.log(ca);
		for (var i = 0; i < ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0) == ' ')
				c = c.substring(1);
			if (c.indexOf(name) == 0)
				return c.substring(name.length, c.length);
		}
		return "";
	}
