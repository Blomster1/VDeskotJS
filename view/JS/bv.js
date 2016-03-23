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
	})
		.on('changed.jstree', function (e, data) {
			showSelectedItem(data.node);
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

var newEditDoc = '<div id="toolbar"><section><img class="intLink" title="Save" onclick="" src="../view/libs/jsTree/icons/document-copy.png"/></section><section><img class="intLink" title="Bold" onclick="formatDoc(\'bold\');" src="../view/libs/jsTree/icons/edit-bold.png" /><img class="intLink" title="Italic" data-action="italic" src="../view/libs/jsTree/icons/edit-italic.png" /><img class="intLink" title="Underline" onclick="formatDoc(\'underline\');" src="../view/libs/jsTree/icons/edit-underline.png" /></section><section><img class="intLink" title="undo" data-action="undo" src="../view/libs/jsTree/icons/arrow-return-180-left.png" /><img class="intLink" title="redo" data-action="redo" src="../view/libs/jsTree/icons/arrow-curve.png" /></section><section><img class="intLink" title="increaseFontSize" onclick="formatDoc(\'increaseFontSize\');" src="../view/libs/jsTree/icons/edit-size-up.png" alt=""><img class="intLink" title="decreaseFontSize" onclick="formatDoc(\'decreaseFontSize\');" src="../view/libs/jsTree/icons/edit-size-down.png" alt=""></section><section id="alignment"><img class="intLink" title="left" onclick="formatDoc(\'justifyLeft\');" src="../view/libs/jsTree/icons/edit-alignment.png" alt=""><img class="intLink" title="RightAlign" onclick="formatDoc(\'justifyRight\');" src="../view/libs/jsTree/icons/edit-alignment-right.png" alt=""><img class="intLink" title="Justify" onclick="formatDoc(\'justifyFull\');" src="../view/libs/jsTree/icons/edit-alignment-justify.png" alt=""></section><section><img class="intLink" title="listUnordered" onclick="formatDoc(\'insertUnorderedList\');" src="../view/libs/jsTree/icons/edit-list.png" alt=""><img class="intLink" title="listOrdered" onclick="formatDoc(\'insertOrderedList\');" src="../view/libs/jsTree/icons/edit-list-order.png" alt=""></section></div>';

	function showSelectedItem(item){
		addTab(item);
	}

	function addTab(item) {
		tabTitle = item.text;
		tabContent = newEditDoc+"<div id=\"textBox\" contenteditable=\"true\"><p>Lorem ipsum</p></div>";
		tabTemplate = "<li><a href='#{href}'>#{label}</a></li>";
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
}

var doc;

function initDoc(){
    //doc = document.getElementById("textBox");
}

function formatDoc(sCmd){
    //doc.focus();

    document.execCommand(sCmd, false, null);
}

// onclick="formatDoc('italic');"
