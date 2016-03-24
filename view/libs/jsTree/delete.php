<?php	
	if( isset($_POST['dir']) || $_POST['dir'] ){
		$files = scandir('usrFiles');
		$children = $_POST['childs'];
		$children[] = htmlentities($_POST['name']);
		
		echo htmlentities($_POST['name']);
		
		//var_dump($files);
		//var_dump($children);
		
		/*function verif( $var ){
			$name = htmlentities($_POST['name']);
			preg_match('/.*\.(.*)/', $var, $matches);
			
			return $matches[1] === $name;ss
		}*/
		
		$filesToDelete = [];
		foreach ($children as $node) {
			
			foreach ($files as $file) {
				preg_match('/.*\.(.*)/', $file, $matches);
				
				if( $matches[1] === $node )
					$filesToDelete[] = $file;
			}
			
			//$files = array_filter($files, "verif");
			
		}
		
		//var_dump($filesToDelete);
		
		foreach ($filesToDelete as $file) 
			unlink('usrFiles/' . $file);
		
		
	} else {
		$name = htmlentities($_POST['name']);
		unlink('usrFiles/' . $name);
	}
	