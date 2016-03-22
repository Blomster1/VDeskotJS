<?php
	$str=$_POST['data'];
	$fich=fopen('jsTree.json','w');
	fputs($fich,$str);
	fclose($fich);