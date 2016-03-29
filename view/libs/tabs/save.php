<?php
    var_dump($_POST);

    file_put_contents("../jsTree/usrFiles/".htmlentities($_POST['nameFile']), $_POST['fileContent']);

 ?>
