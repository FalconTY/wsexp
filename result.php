<?php

// if data are received via POST, with index of 'test'

// if (isset($_POST['test'])) {

  

	$str = $_POST['subname'];      
	$tname=time();
	
//	$dataname=file($str);
//	$file=fopen("temp.txt","w+");
	file_put_contents("$tname.txt",$str,FILE_APPEND);

//	 fwrite($file, $str);
//	fclose($file);
	
	$data=file("$tname.txt");
	echo $data[0];
	
	$filename=str_replace("\n","",$data[0]);
	
	
	
	
//	$subname= $_POST['subname'];

	// get data

	echo "The string: '<i>"."$data[0]"."</i>' contains ". strlen($data[0]). ' characters and '. str_word_count($data[0], 0). ' words.';
	
	//file_put_contents($data[0].".txt",$str,FILE_APPEND);
	

//	$filename="training";
	
 	file_put_contents("$filename.$tname.txt",$str,FILE_APPEND);
//	file_put_contents("results\Test_$filename.txt",$str,FILE_APPEND);
	
	
//	echo "your name is". $subname;

	

//	$getcon=$subname."\n".$str;

	



// }

?> 

