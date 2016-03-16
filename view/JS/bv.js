$(function($) {
	$('#jsTree').jstree({
                    'core': {
			"animation": 0,
			"check_callback": true,
			"themes": {"stripes": true},
			'data': {"cache": false, "url": "libs/jsTree/root.json", "dataType": "json"}// needed only if you do not supply JSON headers
		},
		"types": {
			"#": {"max_children": 1, "max_depth": 4, "valid_children": ["root"]},
			"root": {'icon': "./icons/folder.png", "valid_children": ["default"]},
			"default": {'icon': "./icons/folder.png", "valid_children": ["default", "file"]},
			"file": {'icon': "./icons/blog.png", "valid_children": []}
		}
	});
	
	
    $( "#tabs" ).tabs();
    $( "#accordion" ).accordion();
});
