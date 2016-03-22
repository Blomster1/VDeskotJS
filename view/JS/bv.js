$(function($) {
	
	function jsTreeToJSON(e, data){
		console.log(data);
		$.post('../save.php', {data: JSON.stringify(data.instance.get_json())});
	}
	
	$('#jsTree').jstree({
		'core': {
			"check_callback": true,
			'data': {"cache": false, "url": "../jsTree.json", "dataType": "json"}// needed only if you do not supply JSON headers
		},
		'types': {
			"root": {'icon': "./libs/jsTree/icons/blue-folder.png"},
			"default": {'icon': "./libs/jsTree/icons/blue-folder.png"},
			"file": {'icon': "glyphicon glyphicon-file"}
		},
		'plugins' : [ "contextmenu", "types", "dnd", "unique" ]
	})
		.on('create_node.jstree', function (e, data) {
			jsTreeToJSON(e, data);
	})
		.on('rename_node.jstree', function (e, data) {
			jsTreeToJSON(e, data);
	})
		.on('delete_node.jstree', function (e, data) {
			jsTreeToJSON(e, data);
	})
		.on('move_node.jstree', function (e, data) {
			jsTreeToJSON(e, data);
	})
		.on('remove_node.jstree', function (e, data) {
			jsTreeToJSON(e, data);
	});
	
	
    $( "#tabs" ).tabs({
	heightStyle: "fill"
   });
    $( "#accordion" ).accordion({
	heightStyle: "fill"
   });
    
	 doc = $('#textBox');
	 $('.intLink').click( function(){
		doc.focus();
		//console.log($(this).data('action'));
		document.execCommand($(this).data('action'), false, null);
		//formatDoc( $(this).data('action') );
	 });
});

//EDITEUR DE text
var doc;

function initDoc(){
    //doc = document.getElementById("textBox");
}

function formatDoc(sCmd){
    //doc.focus();
    
    document.execCommand(sCmd, false, null);
}

// onclick="formatDoc('italic');" 