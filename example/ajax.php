<?php
$module = $_GET['m'];
if($module == 'suggestions')
{
	$suggestions = array
					(
							'response'=>'OK',
							'relationscount'=>'16',
							'pagination'=>'12',
							'relations'=>array
									(
											array('value'=>1,'caption'=>'Jquery','icon'=>'-1'),
											array('value'=>2,'caption'=>'Php','icon'=>'-1'),
											array('value'=>3,'caption'=>'C++','icon'=>'-1'),
											array('value'=>4,'caption'=>'Javascript','icon'=>'-1'),
											array('value'=>5,'caption'=>'Python','icon'=>'-1'),
											array('value'=>6,'caption'=>'C','icon'=>'-1'),
											array('value'=>7,'caption'=>'Basic','icon'=>'-1'),
											array('value'=>8,'caption'=>'Smalltalk','icon'=>'-1'),
											array('value'=>9,'caption'=>'Ruby','icon'=>'-1'),
											array('value'=>10,'caption'=>'Perl','icon'=>'-1'),
											array('value'=>11,'caption'=>'Sql','icon'=>'-1'),
											array('value'=>12,'caption'=>'Pascal','icon'=>'-1'),
											array('value'=>13,'caption'=>'C#','icon'=>'-1'),
											array('value'=>14,'caption'=>'Shell Scripting','icon'=>'-1'),
											array('value'=>15,'caption'=>'Tcl','icon'=>'-1'),
											array('value'=>16,'caption'=>'Jquery','icon'=>'-1')
										)
							);
							
							echo json_encode($suggestions);
}
?>
