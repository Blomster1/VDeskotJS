<?php	
	if( isset($_POST['dir']) || $_POST['dir'] ){
		$files = scandir('usrFiles');
		
		var_dump($files);
		
		function verif( $var ){
			$name = htmlentities($_POST['name']);
			preg_match('/.*\.(.*)/', $var, $matches);
			
			return $matches[1] === $name;
		}
		
		$files = array_filter($files, "verif");
		foreach ($files as $file) 
			unlink('usrFiles/' . $file);
		
		
	} else {
		$name = htmlentities($_POST['name']);
		unlink('usrFiles/' . $name);
	}
	