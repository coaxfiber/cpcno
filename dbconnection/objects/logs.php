<?php
date_default_timezone_set('Asia/Manila');
class Logs{
 
    // database connection and table name
    private $conn;
    private $table_name = "`npcno_logs`";
 
    // object properties
    public $id;
    public $descript;
    public $datetimelog;
    public $user_id;
 
    public function __construct($db){
        $this->conn = $db;
    }
 
    function create(){
     
        // update query
        $query = "INSERT INTO
                    " . $this->table_name . "
                VALUES(null,:descript,'".strtotime("now")."',:user_id)";
     
        // prepare query statement
        $stmt = $this->conn->prepare($query);
     
        $stmt->bindParam(':descript', $this->descript);
        $stmt->bindParam(':user_id', $this->user_id);
        
        // bind new values
        //$stmt->bindParam(':full_name', $this->full_name);
         
            if($stmt->execute()){
                return true;
            }else{
                return false;
            }
        
    } 

    function read($start,$end){
           $query = "SELECT
                    *
                FROM
                    " . $this->table_name ." WHERE datatimelog BETWEEN ".$start." AND ".$end."";  
        
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
 
        return $stmt;
    }

}
?>