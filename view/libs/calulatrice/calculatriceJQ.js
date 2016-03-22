	var memory = undefined;
	var edition = false;
	var topSide = true;




	$(document).ready(function() {
		zoneAffJQ = $('#zone_affichage');
		rab();

		ajax("POST", majEtat, 'recupEtat.php', true, null);

		var btns = $(".bouton_simple");

		btns.click(function() {
			$(this).affiche();
		});

		$('#calcul').click(function() {
			calcul();
		});

		$('#CE').click(function() {
			rab();
		});


		$.fn.affiche = function( ) {
			zoneAffJQ.val(zoneAffJQ.val() + $(this).val());
			console.log('[' + zoneAffJQ.val() + ']');
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
			console.log(btn.attr('id'));
			document.cookie = btn.attr('id') + "=" + btn.val();
			console.log(JSON.parse(toJSON()));

			ajax("POST", null, "save.php", true, toJSON());
		};
		
		zoneAffJQ.autocomplete({
			source: "search.php",
			minLength: 2,
			select: function(event, ui) {
				$(this).val(ui.item ?
					"Selected: " + ui.item.value + " aka " + ui.item.id :
					"Nothing selected, input was " + this.value);
			}
		});
		
		
		
		
		$( "#accordion" ).accordion({
			collapsible: true
		});
		
		$("input[type='button']").button();


		$('.draggable').draggable();
		$('.bouton_libre').droppable({
			accept: ".draggable",
			drop: function(event, ui) {
				//console.log(ui);

				ui.draggable.removeAttr('style');
				$(this).val(ui.draggable.text());

				save(ui.draggable);
			},
			over: function( event, ui ) {
				/*$(this).removeClass('ui-state-default');
				$(this).addClass('ui-state-hover');*/
			}
		});
		
		
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






	function rab() {
		zoneAffJQ.val('');
	}

	function calcul() {

		try {
			var valueTosend = zoneAffJQ.val().replace(/Math\./g, "");
			ajax("GET", maj_zone_aff, "process.php", true, valueTosend);

		} catch (err) {
			$(this).openDialog('Erreur', err);
			//alert("Erreur ! " + err);
			console.error(err);
		}
	}

	function maj_zone_aff(data) {
		zoneAffJQ.val(eval(data));
	}



	function plusmoins() {
		zoneAffJQ.val((zoneAffJQ.val().charAt(0) == '-') ? zoneAffJQ.val().substr(1, zoneAffJQ.val().length) : ('-' + zoneAffJQ.val()));
	}

	function range_memory() {
		var regex = /^-?\d+\.?\d*$/;


		if (regex.test(zoneAffJQ.val()))
			memory = zoneAffJQ.val();
		else
			$(this).openDialog('Erreur', 'Impossible d\'effectuer l\'action');
			//alert("Impossible d'effectuer l'action");
	}

	function affiche_memory() {
		zoneAffJQ.val((memory === undefined) ? zoneAffJQ.val() : memory + zoneAffJQ.val());
	}

	function raz_memory() {
		memory = undefined;
	}

	function mode_editon() {

		var btnE = $('#E');
		var btnEdit = $('.bouton_libre');

		if (!edition) {
			edition = true;
			btnE.css('color', 'red');

			btnEdit.each(function() {
				$(this)
					.unbind("onclick")
					.dblclick(function(){
						$(this).edit();
					})
					.unbind("onblur");
			});

			btnE.unbind("onclick");

		} else {
			edition = false;
			btnE.removeAttr("style");

			btnEdit.each(function() {
				$(this)
					.unbind("ondblclick")
					.onclick(function(){
						$(this).affiche();
					})
					.attr("type", "button");
			});
		}
	}

	function switchAffiche() {
		var calc = $('#calc');
		var aff = $('#ligne_affichage');

		aff.removeChild(aff);
		console.log(topSide);

		if (topSide) {
			topSide = false;
			calc.append(aff);

		} else {
			topSide = true;
			calc.prepend(aff)
		}
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