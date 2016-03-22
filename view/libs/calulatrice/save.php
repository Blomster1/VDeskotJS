<?php
	$str=$_POST['data'];
	$fich=fopen('etat.json','w');
	fputs($fich,$str);
	fclose($fich);