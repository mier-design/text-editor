<?php
if (!file_exists('uploads')) {
    mkdir('uploads', 0777);
}
  
$filename = time().'_'.$_FILES['file']['name'];
  
$move = move_uploaded_file($_FILES['file']['tmp_name'], './save/images/'.$filename);
if($move){
    echo '/save/images/'.$filename;
}else{
    echo '/upload-error.png';
}
die;