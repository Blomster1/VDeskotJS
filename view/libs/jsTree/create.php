<?php
	$name = htmlentities($_POST['name']);
	
	$monfichier = fopen('usrFiles/' . $name, 'a+');
	fclose($monfichier);
	