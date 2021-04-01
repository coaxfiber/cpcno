<?php
class cncno{
 
    // database connection and table name
    private $conn;
    private $table_name = "`npcno_data`";
 
    // object properties
    public $id;
    public $controlno;
    public $cno;
    public $name;
    public $title;
    public $dateissue;
    public $location;
    public $attachment;
    public $attachmentname;
    public $user_id;
    public $type;
 
    public function __construct($db){
        $this->conn = $db;
    }
 
    function create(){
     
        // update query
        $query = "INSERT INTO
                    " . $this->table_name . "
                VALUES(null,null,:cno,:name,:title,:dateissue,:location,:attachment,:attachmentname,:user_id,'cno')";
     
        // prepare query statement
        $stmt = $this->conn->prepare($query);
     
        $stmt->bindParam(':cno', $this->cno);
        $stmt->bindParam(':name', $this->name);
        $stmt->bindParam(':title', $this->title);
        $stmt->bindParam(':dateissue', $this->dateissue);
        $stmt->bindParam(':location', $this->location);
        $stmt->bindParam(':attachment', $this->attachment);
        $stmt->bindParam(':attachmentname', $this->attachmentname);
        $stmt->bindParam(':user_id', $this->user_id);
        
        // bind new values
        //$stmt->bindParam(':full_name', $this->full_name);
         
            if($stmt->execute()){
                return true;
            }else{
                return false;
            }
        
    } 
    function createcp(){
     
        // update query
        $query = "INSERT INTO
                    " . $this->table_name . "
                VALUES(null,:controlno,null,:name,:title,:dateissue,:location,:attachment,:attachmentname,:user_id,'cp')";
     
        // prepare query statement
        $stmt = $this->conn->prepare($query);
     
        $stmt->bindParam(':controlno', $this->controlno);
        $stmt->bindParam(':name', $this->name);
        $stmt->bindParam(':title', $this->title);
        $stmt->bindParam(':dateissue', $this->dateissue);
        $stmt->bindParam(':location', $this->location);
        $stmt->bindParam(':attachment', $this->attachment);
        $stmt->bindParam(':attachmentname', $this->attachmentname);
        $stmt->bindParam(':user_id', $this->user_id);
        
        // bind new values
        //$stmt->bindParam(':full_name', $this->full_name);
         
            if($stmt->execute()){
                return true;
            }else{
                return false;
            }
        
    }
    function read($id){
        //select all data
           $query = "SELECT
                    attachment
                FROM
                    " . $this->table_name ." WHERE id = :id ";  
 
        $stmt = $this->conn->prepare( $query );

        $stmt->bindParam(':id', $id);
        $stmt->execute();
 
        return $stmt;
    }
 
    function readall(){
        //select all data
           $query = "SELECT
                    *
                FROM
                    " . $this->table_name ." WHERE type like 'cno' Order by dateissue asc" ;  
 
        $stmt = $this->conn->prepare( $query );
        $stmt->execute();
 
        return $stmt;
    }
    function readallcp(){
        //select all data
           $query = "SELECT
                    *
                FROM
                    " . $this->table_name ." WHERE type like 'cp' Order by dateissue asc" ;  
 
        $stmt = $this->conn->prepare( $query );
        $stmt->execute();
 
        return $stmt;
    }


function delete(){
 
    // update query
    $query = "DELETE FROM
                " . $this->table_name . "
            WHERE
                id = '".$this->id."'";
 
    // prepare query statement
    $stmt = $this->conn->prepare($query);
 
    // posted values
 
    // bind new values     
    // execute the query
    if($stmt->execute()){
        return true;
    }else{
        return false;
    }
}

// update the product
function update(){
    // update query
    $query = "UPDATE 
                " . $this->table_name . "
            SET 
                cno = :cno, 
                name = :name, 
                title = :title, 
                dateissue = :dateissue, 
                location = :location,
                attachment = :attachment,
                attachmentname = :attachmentname,
                user_id = :user_id
            WHERE
                id = :id";
 
    // prepare query statement
    $stmt = $this->conn->prepare($query);
 
    // posted values 
    // bind new values$stmt->bindParam(':controlno', $this->controlno);
        $stmt->bindParam(':id', $this->id);
        $stmt->bindParam(':cno', $this->cno);
        $stmt->bindParam(':name', $this->name);
        $stmt->bindParam(':title', $this->title);
        $stmt->bindParam(':dateissue', $this->dateissue);
        $stmt->bindParam(':location', $this->location);
        $stmt->bindParam(':attachment', $this->attachment);
        $stmt->bindParam(':attachmentname', $this->attachmentname);
        $stmt->bindParam(':user_id', $this->user_id);
 
            if($stmt->execute()){
                return true;
            }else{
                return false;
            }
}
function updatecp(){
    // update query
    $query = "UPDATE 
                " . $this->table_name . "
            SET 
                controlno = :controlno, 
                name = :name, 
                title = :title, 
                dateissue = :dateissue, 
                location = :location,
                attachment = :attachment,
                attachmentname = :attachmentname,
                user_id = :user_id
            WHERE
                id = :id";
 
    // prepare query statement
    $stmt = $this->conn->prepare($query);
 
    // posted values 
    // bind new values$stmt->bindParam(':controlno', $this->controlno);
        $stmt->bindParam(':id', $this->id);
        $stmt->bindParam(':controlno', $this->controlno);
        $stmt->bindParam(':name', $this->name);
        $stmt->bindParam(':title', $this->title);
        $stmt->bindParam(':dateissue', $this->dateissue);
        $stmt->bindParam(':location', $this->location);
        $stmt->bindParam(':attachment', $this->attachment);
        $stmt->bindParam(':attachmentname', $this->attachmentname);
        $stmt->bindParam(':user_id', $this->user_id);
 
            if($stmt->execute()){
                return true;
            }else{
                return false;
            }
}
}
?>