<?php
class Users{
 
    // database connection and table name
    private $conn;
    private $table_name = "npcno_users";
 
    // object properties
    public $id;
    public $username;
    public $password;
    public $name;
    public $date_created;
    public $status;
    public $type;
    public $picture;
 
    public function __construct($db){
        $this->conn = $db;
    }
 
    // used by select drop-down list
    function read(){
           $query = "SELECT
                    *
                FROM
                    " . $this->table_name ." WHERE email = :email";  
        
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':email', $this->email);
        $stmt->execute();
 
        return $stmt;
    }
    function readall(){
           $query = "SELECT
                    *
                FROM
                    " . $this->table_name ."";  
        
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
 
        return $stmt;
    }
    function readid(){
           $query = "SELECT
                    *
                FROM
                    " . $this->table_name ." WHERE id = :id";  
        
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id', $this->id);
        $stmt->execute();
 
        return $stmt;
    }

function reada(){
        //select all data
           $query = "SELECT
                    *
                FROM
                    " . $this->table_name ." WHERE type = 'Administrator' or type = 'User' ";  
 
        $stmt = $this->conn->prepare( $query );
        $stmt->execute();
 
        return $stmt;
    }
    function readu(){
        //select all data
           $query = "SELECT
                    *
                FROM
                    " . $this->table_name ." WHERE type = 'User' ";  
 
        $stmt = $this->conn->prepare( $query );
        $stmt->execute();
 
        return $stmt;
    }


 
// update the product
function update(){
    // update query
    $query = "UPDATE 
                " . $this->table_name . "
            SET 
                fname = :fname, 
                lname = :lname, 
                mname = :mname, 
                suffix = :suffix, 
                address = :address, 
                photo = :photo
            WHERE
                email = :email";
 
    // prepare query statement
    $stmt = $this->conn->prepare($query);
 
    // posted values 
    // bind new values
    $stmt->bindParam(':fname', $this->fname);
    $stmt->bindParam(':lname', $this->lname);
    $stmt->bindParam(':mname', $this->mname);
    $stmt->bindParam(':suffix', $this->suffix);
    $stmt->bindParam(':address', $this->address);
    $stmt->bindParam(':photo', $this->photo);
    $stmt->bindParam(':email', $this->email);
    $stmt->execute();

    $query = "SELECT
                    *
                FROM
                    " . $this->table_name ." WHERE email = :email";  
        
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':email', $this->email);
        $stmt->execute();
 
        return $stmt;
}
// update the product
function updateprof(){
    // update query
    $query = "UPDATE 
                " . $this->table_name . "
            SET 
                name = :name, 
                picture = :picture
            WHERE
                id = :id";
 
    // prepare query statement
    $stmt = $this->conn->prepare($query);
 
    // posted values 
    // bind new values
    $stmt->bindParam(':name', $this->name);
    $stmt->bindParam(':picture', $this->picture);
    $stmt->bindParam(':id', $this->id);
   
        if($stmt->execute()){
            return true;
        }else{
            return false;
        }
}

// update for admin
function changepassword($pw){
    $pw=sha1(htmlspecialchars(strip_tags($pw)));
    $pw2=sha1(htmlspecialchars(strip_tags($this->password)));
    // update query
    $query = "UPDATE 
                " . $this->table_name . "
            SET 
                password = :password
            WHERE
                id = :id and password = '".$pw."'";
 
    // prepare query statement
    $stmt = $this->conn->prepare($query);
 
    // posted values 
    // bind new values
    $stmt->bindParam(':id', $this->id);
    $stmt->bindParam(':password',$pw2);
        // execute the query
    if($stmt->execute()){
        return true;
    }else{
        return false;
    }
}

function reset(){
    $pw=sha1(htmlspecialchars(strip_tags("ncip@2020")));
    // update query
    $query = "UPDATE 
                " . $this->table_name . "
            SET 
                password = :password
            WHERE
                id = :id";
 
    // prepare query statement
    $stmt = $this->conn->prepare($query);
 
    // posted values 
    // bind new values
    $stmt->bindParam(':id', $this->id);
    $stmt->bindParam(':password',$pw);
        // execute the query
    if($stmt->execute()){
        return true;
    }else{
        return false;
    }
}



function remove(){
 
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


function login(){
         $pw=sha1(htmlspecialchars(strip_tags($this->password)));
           $query = "SELECT
                    *
                FROM
                    " . $this->table_name ." WHERE username = :username && password = :password ";  
        
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':username', $this->username);
        $stmt->bindParam(':password', $pw);
        $stmt->execute();
 
        return $stmt;
    }

function adduser(){
 
    // update query
    $pw=sha1(htmlspecialchars(strip_tags("ncip@2020")));
    $query = "INSERT INTO
                " . $this->table_name . "
            VALUES(null,:username,:password,:name,'".strtotime("now")."','active',:type,:picture)";
 
    // prepare query statement
    $stmt = $this->conn->prepare($query);
 
    // posted valuesF
    // bind new values
    $stmt->bindParam(':type', $this->type);
    $stmt->bindParam(':username', $this->username);
    $stmt->bindParam(':picture', $this->picture);
    $stmt->bindParam(':name', $this->name);
    $stmt->bindParam(':password', $pw);
     
    // execute the query
    if($stmt->execute()){
        return true;
    }else{
        return false;
    }
}function updateuser(){
 
    // update query
    $pw=sha1(htmlspecialchars(strip_tags("ncip@2020")));
     $query = "UPDATE 
                " . $this->table_name . "
            SET 
                username = :username, 
                type = :type, 
                password = :password, 
                name = :name
            WHERE
                id = :id";
    // prepare query statement
    $stmt = $this->conn->prepare($query);
 
    // posted valuesF
    // bind new values
    $stmt->bindParam(':type', $this->type);
    $stmt->bindParam(':username', $this->username);
    $stmt->bindParam(':name', $this->name);
    $stmt->bindParam(':password', $pw);
     
    $stmt->bindParam(':id',  $this->id);
     
    // execute the query
    if($stmt->execute()){
        return true;
    }else{
        return false;
    }
}

}
?>