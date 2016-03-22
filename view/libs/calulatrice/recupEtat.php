<?php
	$fich=fopen('calculatriceContext.json','r');
	$data = fgets($fich);
	echo($data);
	fclose($fich);