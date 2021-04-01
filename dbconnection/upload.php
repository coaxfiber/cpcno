<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true ");
header("Access-Control-Allow-Methods: OPTIONS, GET, POST");
header("Access-Control-Allow-Headers: Content-Type, Depth, User-Agent, X-File-Size, X-Requested-With, If-Modified-Since, X-File-Name, Cache-Control");
header('Content-Type: application/json');
date_default_timezone_set('Asia/Manila');
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

if ($_GET['type']=='0'||$_GET['type']=='1') {
 $targetfolder = "uploads/cno/";
}else
 $targetfolder = "uploads/cp/";

 $targetfolder = $targetfolder . basename( $_GET['data']) . '.pdf';

if (file_exists($targetfolder)) {
	if (!is_writable($targetfolder)) {
        @chmod(0777, $targetfolder);
     }
   unlink($targetfolder);echo "unlinked<br>";
}


 $ok=1;

$file_type=$_FILES['file']['type'];

if ($file_type=="application/pdf") {
 if(move_uploaded_file($_FILES['file']['tmp_name'], $targetfolder))
 {
 	echo "The file ". basename( $_FILES['file']['name']). " is uploaded-" . $targetfolder;
 }

 else {

 echo "Problem uploading file";

 }

}

else {

 echo "You may only upload PDFs, JPEGs or GIF files.<br>";

}

?>