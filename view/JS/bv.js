	$(function($) {

		function jsTreeToJSON(data) {
			//console.log(data);
			$.post('./libs/jsTree/save.php', {data: JSON.stringify(data.instance.get_json())});
		}

		$('#jsTree').jstree({
			'core': {
				"check_callback": true,
				'data': {"cache": false, "url": "./libs/jsTree/jsTree.json", "dataType": "json"}// needed only if you do not supply JSON headers
			},
			'types': {
				"root": {'icon': "./libs/jsTree/icons/blue-folder.png"},
				"default": {'icon': "./libs/jsTree/icons/blue-folder.png"},
				"file": {'icon': "glyphicon glyphicon-file"}
			},
			'plugins': ["contextmenu", "types", "dnd", "unique", "html_data", "ui", "crrm"],
			"contextmenu": {
				"items": {
					"create_file": {
						"seperator_before": false,
						"seperator_after": true,
						"label": "Add file",
						action: function(obj) {
							console.log(obj);
							this.create(obj, "last", {"attr": {"rel": "default"}});
						}
					},
					"Create": {
						"separator_before": false,
						"separator_after": false,
						"label": "Create",
						action: function(obj) {
							this.create(obj, "last", {"attr": {"rel": "folder"}});
						}
					},
					"Rename": {
						"separator_before": false,
						"separator_after": false,
						"label": "Rename",
						action: function(obj) {
							this.rename_node(obj);
						}
					},
					"Remove": {
						"separator_before": false,
						"separator_after": false,
						"label": "Remove",
						action: function(obj) {
							this.delete_node(obj);
						}
					}
				}
			}
		})
			.on('create_node.jstree', function(e, data) {
				jsTreeToJSON(data);
				//$.post('./libs/jsTree/create.php','');
			})
			.on('rename_node.jstree', function(e, data) {
				jsTreeToJSON(data);
			})
			.on('delete_node.jstree', function(e, data) {
				jsTreeToJSON(data);
			})
			.on('move_node.jstree', function(e, data) {
				jsTreeToJSON(data);
			})
			.on('remove_node.jstree', function(e, data) {
				jsTreeToJSON(data);
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