	$(function($) {

		function jsTreeToJSON(data) {
			//console.log(data);
			$.post('./libs/jsTree/save.php', {data: JSON.stringify(data.instance.get_json())});
		}
		
		function contextmenu(node){
			var tree = $('#jsTree').jstree(true);

			return {
				"create_file": {
					"seperator_before": false,
					"seperator_after": true,
					"label": "Create file",
					action: function() {
						if( node.type != 'file' ) {
							node = tree.create_node(node,{"type":"file"});
							tree.edit(node);
						}
					}
				},
				"Create": {
					"separator_before": false,
					"separator_after": false,
					"label": "Create folder",
					action: function() {						
						node = tree.create_node(node);
						tree.edit(node);
					}
				},
				"Rename": {
					"separator_before": false,
					"separator_after": false,
					"label": "Rename",
					action: function() {
						tree.edit(node);
					}
				},
				"Remove": {
					"separator_before": false,
					"separator_after": false,
					"label": "Remove",
					action: function() {
						tree.delete_node(node);
					}
				}
			};
		}

		$('#jsTree').jstree({
			'core': {
				"animation" : 0,
				"check_callback": true,
				'data': {"cache": false, "url": "./libs/jsTree/jsTree.json", "dataType": "json"}// needed only if you do not supply JSON headers
			},
			'types': {
				"#" : { "max_children" : 1, "valid_children" : ["root"] },
				"root": {'icon': "./libs/jsTree/icons/blue-folder.png", "valid_children" : ["default"]},
				"default": {'icon': "./libs/jsTree/icons/blue-folder.png", "valid_children" : ["default","file"]},
				"file": {'icon': "./libs/jsTree/icons/blue-document-node.png", "valid_children" : []}
			},
			'plugins': ["contextmenu", "types", "dnd", "unique", "html_data", "ui", "crrm", "state", "types", "wholerow"],
			"contextmenu": {
				"items": contextmenu
			}
		})
			.on('create_node.jstree', function(e, data) {
				jsTreeToJSON(data);
				console.log("CREATE ------------- : " + data.node.text);
				
				$.post('./libs/jsTree/create.php', {
					name: data.node.text
				});
			})
			.on('rename_node.jstree', function(e, data) {
				jsTreeToJSON(data);
			
				console.log("RENAME ------- : " + data.old + " => " + data.text);
				
				$.post('./libs/jsTree/rename.php', {
					old: data.old,
					nouv: data.text
				});
			})
			.on('delete_node.jstree', function(e, data) {
				jsTreeToJSON(data);
			})
			.on('move_node.jstree', function(e, data) {
				jsTreeToJSON(data);
			})
			.on('remove_node.jstree', function(e, data) {
				jsTreeToJSON(data);
			})
			.on("select_node.jstree",function(e,data) {
				// si le noeud représente un fichier
				//console.log("Type: " + data.node.type);
			
				if (data.node.type=='file')
					console.log("fichier "+data.node.text+" sélectionné");
					
				
		});


		$("#tabs").tabs({
			heightStyle: "fill"
		});
		$("#accordion").accordion({
			heightStyle: "fill"
		});

		doc = $('#textBox');
		$('.intLink').click(function() {
			doc.focus();
			//console.log($(this).data('action'));
			document.execCommand($(this).data('action'), false, null);
			//formatDoc( $(this).data('action') );
		});
	});

//EDITEUR DE text
	var doc;

	function initDoc() {
		//doc = document.getElementById("textBox");
	}

	function formatDoc(sCmd) {
		//doc.focus();

		document.execCommand(sCmd, false, null);
	}

// onclick="formatDoc('italic');"
