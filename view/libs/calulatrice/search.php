<?php

	$term = $_GET['term'];
	$data = "[";
	$fonctions = array("Math.abs", "Math.ceil", "Math.cos", "Math.E", "Math.exp", "Math.floor", "Math.log", "Math.max", "Math.min", "Math.PI", "Math.pow", "Math.round", "Math.sin", "Math.sqrt");
	foreach ($fonctions as $value) {
		$pos = stripos($value, $term);
		if ($pos !== false) {
			$data = $data . '"' . $value . '",';
		}
	}
	if (strlen($data) > 1) {
		$data = substr($data, 0, strlen($data) - 1) . ']';
	} else {
		$data = $data . ']';
	}
	echo $data;