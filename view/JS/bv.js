	$(function ($) {

		function jsTreeToJSON(data) {
			//console.log(data);
			$.post('./libs/jsTree/save.php', {data: JSON.stringify(data.instance.get_json())});
		}

		function contextmenu(node) {
			var tree = $('#jsTree').jstree(true);

			return {
				"create_file": {
					"seperator_before": false,
					"seperator_after": true,
					"label": "Create file",
					action: function () {
						if (node.type != 'file') {
							node = tree.create_node(node, {"type": "file"});
							tree.edit(node);
						}
					}
				},
				"Create": {
					"separator_before": false,
					"separator_after": false,
					"label": "Create folder",
					action: function () {
						node = tree.create_node(node);
						tree.edit(node);
					}
				},
				"Rename": {
					"separator_before": false,
					"separator_after": false,
					"label": "Rename",
					action: function () {
						tree.edit(node);
					}
				},
				"Remove": {
					"separator_before": false,
					"separator_after": false,
					"label": "Remove",
					action: function () {
						tree.delete_node(node);
					}
				}
			};
		}

		$('#jsTree').jstree({
			'core': {
				"check_callback": true,
				'data': {"cache": false, "url": "./libs/jsTree/jsTree.json", "dataType": "json"}// needed only if you do not supply JSON headers
			},
			'types': {
				"#": {"max_children": 1, "valid_children": ["root"]},
				"root": {'icon': "./libs/jsTree/icons/blue-folder.png", "valid_children": ["default"]},
				"default": {'icon': "./libs/jsTree/icons/blue-folder.png", "valid_children": ["default", "file"]},
				"file": {'icon': "./libs/jsTree/icons/blue-document-node.png", "valid_children": []}
			},
			'plugins': ["contextmenu", "types", "dnd", "unique", "sort", "state", "types"],
			"contextmenu": {
				items: contextmenu
			}
		})
			.on('create_node.jstree', function (e, data) {
				jsTreeToJSON(data);

				if( data.node.type === 'file' ){
					var nameFile = data.node.text + "." + data.node.parent;

					console.log("CREATE ------------- [ F ] : " + nameFile);

					$.post('./libs/jsTree/create.php', {
						name: nameFile
					});

				} else
					console.log("CREATE ------------- [ D ] : " + data.node.text);
			})
			.on('rename_node.jstree', function (e, data) {
				jsTreeToJSON(data);

				if( data.node.type === 'file' ){
					var nameFileNew = data.text + "." + data.node.parent;
					var oldNameFile = data.old + "." + data.node.parent;
					console.log("RENAME ------------- [ F ] : " + oldNameFile + " => " + nameFileNew);

					$.post('./libs/jsTree/rename.php', {
						old: oldNameFile,
						nouv: nameFileNew
					});

				} else
					console.log("RENAME ------------- [ D ] : " + data.old + " => " + data.text);
			})
			.on('delete_node.jstree', function (e, data) {
				jsTreeToJSON(data);

				if( data.node.type === 'file' ){
					var nameFile = data.node.text + "." + data.node.parent;
					console.log("DELETE ------------- [ F ] : " + nameFile);

					$.post('./libs/jsTree/delete.php', {
						name: nameFile
					});

				} else {
					console.log("DELETE ------------- [ D ] : " + data.node.text);
					$.post('./libs/jsTree/delete.php', {
						name: data.node.id,
						dir: true,
						childs: data.node.children_d
					});
				}
			})
			.on('move_node.jstree', function (e, data) {
				jsTreeToJSON(data);

				if( data.node.type === 'file' ){
					var nameFileNew = data.node.text + "." + data.parent;
					var oldNameFile = data.node.text + "." + data.old_parent;
					console.log("MOVE ------------- [ F ] : " + oldNameFile + " => " + nameFileNew);

					$.post('./libs/jsTree/rename.php', {
						old: oldNameFile,
						nouv: nameFileNew
					});

				} else
					console.log("MOVE ------------- [ D ] : " + data.node.text);

			})
			.on('changed.jstree', function (e, data) {
				var item = data.node;
				if(data.node.type == "file" ){
					tabTitle = item.text;
					nameFile = tabTitle+"."+item.parent;
					if(findTab(item.text)){
						console.log("il existe deja");
					} else {
						var content = $.post('./libs/tabs/recup.php',{
							nameFile: tabTitle+"."+item.parent
						})
						.done(function(data){
							var newEditDoc = '<div id="toolbar"><section><img class="intLink" title="Save" onclick="save(this)" src="../view/libs/jsTree/icons/document-copy.png"/></section><section><img class="intLink" title="Bold" onclick="formatDoc(\'bold\');" src="../view/libs/jsTree/icons/edit-bold.png" /><img class="intLink" title="Italic" data-action="italic" src="../view/libs/jsTree/icons/edit-italic.png" /><img class="intLink" title="Underline" onclick="formatDoc(\'underline\');" src="../view/libs/jsTree/icons/edit-underline.png" /></section><section><img class="intLink" title="undo" data-action="undo" src="../view/libs/jsTree/icons/arrow-return-180-left.png" /><img class="intLink" title="redo" data-action="redo" src="../view/libs/jsTree/icons/arrow-curve.png" /></section><section><img class="intLink" title="increaseFontSize" onclick="formatDoc(\'increaseFontSize\');" src="../view/libs/jsTree/icons/edit-size-up.png" alt=""><img class="intLink" title="decreaseFontSize" onclick="formatDoc(\'decreaseFontSize\');" src="../view/libs/jsTree/icons/edit-size-down.png" alt=""></section><section id="alignment"><img class="intLink" title="left" onclick="formatDoc(\'justifyLeft\');" src="../view/libs/jsTree/icons/edit-alignment.png" alt=""><img class="intLink" title="RightAlign" onclick="formatDoc(\'justifyRight\');" src="../view/libs/jsTree/icons/edit-alignment-right.png" alt=""><img class="intLink" title="Justify" onclick="formatDoc(\'justifyFull\');" src="../view/libs/jsTree/icons/edit-alignment-justify.png" alt=""></section><section><img class="intLink" title="listUnordered" onclick="formatDoc(\'insertUnorderedList\');" src="../view/libs/jsTree/icons/edit-list.png" alt=""><img class="intLink" title="listOrdered" onclick="formatDoc(\'insertOrderedList\');" src="../view/libs/jsTree/icons/edit-list-order.png" alt=""></section></div>';
							tabContent = newEditDoc+"<div class=\"textBox\" data-name=\""+nameFile+"\" contenteditable=\"true\">"+data+"</div>";
							tabTemplate = "<li><a href='#{href}'>#{label} </a><span class='ui-icon ui-icon-close' role='presentation'>Remove Tab</span></li>";
							tabCounter = $('#tabs ul li').length+1;
							var tabs = $("#tabs").tabs();
					  		var label = tabTitle || "Tab " + tabCounter,
							id = "tabs-" + tabCounter,
							li = $( tabTemplate.replace( /#\{href\}/g, "#" + id ).replace( /#\{label\}/g, label ) ),
							tabContentHtml = tabContent || "Tab " + tabCounter + " content.";

							tabs.find( ".ui-tabs-nav" ).append( li );
							tabs.append( "<div id='" + id + "'><p>" + tabContentHtml + "</p></div>" );
							tabs.tabs( "refresh" );
							tabCounter++;
						})
					}
				}
			});


		$("#tabs").tabs({
			heightStyle: "fill"
		}).delegate( "span.ui-icon-close", "click", function() {
  			var panelId = $( this ).closest( "li" ).remove().attr( "aria-controls" );
  			$( "#" + panelId ).remove();
  			tabs.tabs( "refresh" );
			});
		$("#accordion").accordion({
			heightStyle: "fill"
		});

		doc = $('#textBox');
		$('.intLink').click(function () {
			doc.focus();
			//console.log($(this).data('action'));
			document.execCommand($(this).data('action'), false, null);
			//formatDoc( $(this).data('action') );
		});
		//CALENDAR
		$('#calendar').eCalendar({
			weekDays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
			months: ['January', 'February', 'March', 'April', 'May', 'June',
				'July', 'August', 'September', 'October', 'November', 'December'],
			textArrows: {previous: '<', next: '>'},
			eventTitle: 'Events',
			url: '',
			events: [{
				title: 'Event 1',
				description: 'Description 1',
				datetime: new Date(2014, 7, 15, 17)

			},{
				title: 'Event 2',
				description: 'Description 2',
				datetime: new Date(2014, 7, 14, 16)

			},{
				title: 'Event 3',
				description: 'jQueryScript.Net',
				datetime: new Date(2014, 7, 10, 16)
			}]
		});
	});

//EDITEUR DE text



	function findTab(name){
		tabs = $('#tabs>ul>li>a');
		var bool = false;
		$.each(tabs,function(key, value) {
			if(value.text.trim() == name){
				bool = true;
			}
		});
		console.log(bool);
		return bool;
	}

	var doc;

	function formatDoc(sCmd) {
		//doc.focus();

		document.execCommand(sCmd, false, null);
	}

	function save(obj){
		var $obj = $(obj).parents('.ui-widget-content').find('.textBox');
		var contentF = $obj.html();
		console.log(contentF);
		var nameFile = $obj.attr('data-name');
		$.post('./libs/tabs/save.php',{
			fileContent: contentF,
			nameFile: nameFile
		});
	}
