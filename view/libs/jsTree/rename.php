<?php
	$base = './usrFiles/';
	$oldName = $base . htmlentities($_POST['old']);
	$newName = $base . htmlentities($_POST['nouv']);
	
	rename($oldName, $newName);
	