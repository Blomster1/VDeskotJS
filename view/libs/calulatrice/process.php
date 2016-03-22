<?php
	$str=$_GET['data'];
	//var_dump($str);
	eval("\$r=$str;");
	echo $r;