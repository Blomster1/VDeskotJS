<?php
	$str=$_POST['data'];
	$fich=fopen('calculatriceContext.json','w');
	fputs($fich,$str);
	fclose($fich);