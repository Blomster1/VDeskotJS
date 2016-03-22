<?php
	$fich=fopen('etat.json','r');
	$data = fgets($fich);
	echo($data);
	fclose($fich);