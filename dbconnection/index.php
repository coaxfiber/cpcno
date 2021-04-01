
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


    include_once 'config/database.php';
    include_once 'objects/cno.php';
    include_once 'objects/user.php';
    include_once 'objects/logs.php';
    
    $database = new Database();
    $db = $database->getConnection();
                
    header("Cache-Control: no-cache, must-revalidate"); // HTTP/1.1
    header("Expires: Sat, 26 Jul 1997 05:00:00 GMT"); // Date in the past

    $value = array("message" => 'forbidden.');

                

    if (isset($_POST['pass'])) {

      if ($_POST['pass']=='getdataall') {
               $data= new cncno($db);
               $stmt = $data->readall();
               $x=0;
               $put=[];
               $value = array(
                        "message" => "no record",
                        "data" => []);
               while ($row = $stmt->fetch()){
                  $put[$x]=array(
                                    "id" => $row[0],
                                    "controlno" => $row[1],
                                    "cno" => $row[2],
                                    "name" => $row[3],
                                    "title" => $row[4],
                                    "dataissue" =>$row[5],
                                    "location" => $row[6],
                                    "attach" => $row[7],
                                    "attachname" => $row[8],
                                    "user_id" => $row[9]
                                    );
                  $x++;
                              }

                          if ($x>0) {
                            $value = array(
                                "message" => "found",
                                "data" => $put
                                        );
                            }
                          }  
          if ($_POST['pass']=='getlogs') {
               $data= new Logs($db);
               $stmt = $data->read($_POST['start'],$_POST['end']);
               $x=0;
               $put=[];
               $value = array(
                        "message" => "no record",
                        "data" => []);
               while ($row = $stmt->fetch()){
                  $put[$x]=array(
                                    "id" => $row[0],
                                    "descript" => $row[1],
                                    "datetimelog" => $row[2]
                                    );
                  $x++;
                              }

                          if ($x>0) {
                            $value = array(
                                "message" => "found",
                                "data" => $put
                                        );
                            }
                          } 
      if ($_POST['pass']=='getusers') {
               $data= new Users($db);
               $stmt = $data->readall();
               $x=0;
               $put=[];
               $value = array(
                        "message" => "no record",
                        "data" => []);
               while ($row = $stmt->fetch()){
                  $put[$x]=array(
                                    "id" => $row[0],
                                    "username" => $row[1],
                                    "name" => $row[3],
                                    "date" => $row[4],
                                    "status" =>$row[5],
                                    "type" => $row[6],
                                    "picture" => $row[7]
                                    );
                                  $x++;
                              }

                          if ($x>0) {
                            $value = array(
                                "message" => "found",
                                "data" => $put
                                        );
                            }
                          } 
      if ($_POST['pass']=='getdataallcp') {
               $data= new cncno($db);
               $stmt = $data->readallcp();
               $x=0;
               $put=[];
               $value = array(
                        "message" => "no record",
                        "data" => []);
               while ($row = $stmt->fetch()){
                  $put[$x]=array(
                                    "id" => $row[0],
                                    "controlno" => $row[1],
                                    "cno" => $row[2],
                                    "name" => $row[3],
                                    "title" => $row[4],
                                    "dataissue" =>$row[5],
                                    "location" => $row[6],
                                    "attach" => $row[7],
                                    "attachname" => $row[8],
                                    "user_id" => $row[9]
                                    );
                  $x++;
                              }

                          if ($x>0) {
                            $value = array(
                                "message" => "found",
                                "data" => $put
                                        );
                            }
                          } 

          if ($_POST['pass']=='createdata') {
               $data= new cncno($db);
                
                    $data->cno = $_POST['cno'];
                    $data->name = $_POST['name'];
                    $data->title = $_POST['title'];
                    $data->dateissue = $_POST['dateissue'];
                    $data->location = $_POST['location'];
                    $data->attachment = $_POST['attachment'];
                    $data->attachmentname = $_POST['attachmentname'];
                    $data->user_id = $_POST['user_id'];

               if ($data->create()) {
                  $value = array("message" => 'success');
               }else
                  $value = array("message" => 'failed');

            $log= new Logs($db);
            $log->descript=$_POST['user'] . " added cno(" . $_POST['name'] . ")";
            $log->user_id=$_POST['user_id'];
            $log->create();

        }

          if ($_POST['pass']=='createdatacp') {
               $data= new cncno($db);
                
                    $data->controlno = $_POST['controlno'];
                    $data->name = $_POST['name'];
                    $data->title = $_POST['title'];
                    $data->dateissue = $_POST['dateissue'];
                    $data->location = $_POST['location'];
                    $data->attachment = $_POST['attachment'];
                    $data->attachmentname = $_POST['attachmentname'];
                    $data->user_id = $_POST['user_id'];

               if ($data->createcp()) {
                  $value = array("message" => 'success');
               }else
                  $value = array("message" => 'failed');

                   $log= new Logs($db);
            $log->descript=$_POST['user'] . " added cp(" . $_POST['name'] . ")";
            $log->user_id=$_POST['user_id'];
            $log->create();
        }



        if ($_POST['pass']=='deletecno') {
               $data= new cncno($db);
               $data->id = $_POST['id'];
               if ($data->delete()) {
                  $value = array("message" => 'success');
               }else
                  $value = array("message" => 'fail');

                   $log= new Logs($db);
            $log->descript=$_POST['user'] . " Deleted data(with id " . $_POST['id'] . ")";
            $log->user_id='';
            $log->create();
        }

       
        if ($_POST['pass']=='deleteuser') {
               $data= new Users($db);
               $data->id = $_POST['id'];
               if ($data->remove()) {
                  $value = array("message" => 'success');
               }else
                  $value = array("message" => 'fail');

            $log= new Logs($db);
            $log->descript=$_POST['user'] . " Deleted a USER with id " . $_POST['id'] . "";
            $log->user_id='';
            $log->create();
        }




        if ($_POST['pass']=='Updatedata') {
               $data= new cncno($db);
                
                    $data->id = $_POST['id'];
                    $data->cno = $_POST['cno'];
                    $data->name = $_POST['name'];
                    $data->title = $_POST['title'];
                    $data->dateissue = $_POST['dateissue'];
                    $data->location = $_POST['location'];
                    $data->attachment = $_POST['attachment'];
                    $data->attachmentname = $_POST['attachmentname'];
                    $data->user_id = $_POST['user_id'];

               if ($data->update()) {
                  $value = array("message" => 'success');
               }else
                  $value = array("message" => 'failed');

            $log= new Logs($db);
            $log->descript=$_POST['user'] . " Updated cno(" . $_POST['id'] .' - '.$_POST['name']  .")";
            $log->user_id='';
            $log->create();

        }

        if ($_POST['pass']=='Updatedatacp') {
               $data= new cncno($db);
                
                    $data->id = $_POST['id'];
                    $data->controlno = $_POST['controlno'];
                    $data->name = $_POST['name'];
                    $data->title = $_POST['title'];
                    $data->dateissue = $_POST['dateissue'];
                    $data->location = $_POST['location'];
                    $data->attachment = $_POST['attachment'];
                    $data->attachmentname = $_POST['attachmentname'];
                    $data->user_id = $_POST['user_id'];

               if ($data->updatecp()) {
                  $value = array("message" => 'success');
               }else
                  $value = array("message" => 'failed');

            $log= new Logs($db);
            $log->descript=$_POST['user'] . " Updated cp(" . $_POST['id'] .' - '.$_POST['name']  .")";
            $log->user_id='';
            $log->create();

        }


      if ($_POST['pass']=='login') {
               $data= new Users($db);
               $data->username = $_POST['username'];
               $data->password = $_POST['password'];
               $stmt = $data->login();
               $x=0;
               $put=[];
               $value = array(
                        "message" => "no record",
                        "data" => []);
               while ($row = $stmt->fetch()){
                  $put=array(
                                    "id" => $row[0],
                                    "username" => $row[1],
                                    "name" => $row[3],
                                    "date" => $row[4],
                                    "status" =>$row[5],
                                    "type" => $row[6],
                                    "picture" => $row[7]
                                    );
                                  $x++;
                              }

                  if ($x>0) {
                    $value = array(
                        "message" => "found",
                        "data" => $put
                                );
                    }


            $log= new Logs($db);
            $log->descript=$_POST['username'] . " Logged In.";
            $log->user_id='';
            $log->create();
          }


        if ($_POST['pass']=='updateprofile') {
               $data= new Users($db);
                
                   
                    $data->picture = $_POST['picture'];
                    $data->name = $_POST['name'];
                    $data->id = $_POST['id'];

               if ($data->updateprof()) {
                  $value = array("message" => $_POST['name']);
               }else
                  $value = array("message" => 'failed');


            $log= new Logs($db);
            $log->descript=$_POST['name'] . " Update Profile";
            $log->user_id='';
            $log->create();
        }

        if ($_POST['pass']=='changepassword') {

                $data= new Users($db);
               $data->username = $_POST['username'];
               $data->password = $_POST['old'];
               $stmt = $data->login();
               $value = array("message" => 'failed');
               while ($row = $stmt->fetch()){
                 $data2= new Users($db);
                
                   
                    $data2->password = $_POST['new'];
                    $data2->id = $_POST['id'];

               if ($data2->changepassword($_POST['old'])) {
                  $value = array("message" => 'success');
               }else
                  $value = array("message" => 'failed');
                              }

            $log= new Logs($db);
            $log->descript=$_POST['username'] . " Changed Password Profile";
            $log->user_id='';
            $log->create();

              
        }
        if ($_POST['pass']=='adduser') {

                $data= new Users($db);
               $data->username = $_POST['username'];
               $data->type = $_POST['acctype'];
               $data->picture = $_POST['picture'];
               $data->name = $_POST['name'];
                   
               if ( $data->adduser()) {
                  $value = array("message" => 'success');
               }else
                  $value = array("message" => $_POST['username']);

            $log= new Logs($db);
            $log->descript=$_POST['user'] . " Added a USER with username " . $_POST['username'] . "-".$_POST['username'];
            $log->user_id='';
            $log->create();

              
        }
        if ($_POST['pass']=='updateuser') {

                $data= new Users($db);
               $data->username = $_POST['username'];
               $data->type = $_POST['acctype'];
               $data->name = $_POST['name'];
               $data->id = $_POST['id'];
                   
               if ( $data->updateuser()) {
                  $value = array("message" => 'success');
               }else
                  $value = array("message" =>'failed');

            $log= new Logs($db);
            $log->descript=$_POST['user'] . " updated a USER with username " . $_POST['username'] . "-".$_POST['username'];
            $log->user_id='';
            $log->create();

              
        }


    }

exit(json_encode($value));

?>
           