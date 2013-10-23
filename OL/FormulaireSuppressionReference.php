<!DOCTYPE html>
<html>	
<?php include('head.php'); ?>

<body id="back">
	<div class="container">
		<form style="color:white" enctype="multipart/form-data" action='SuppressionReference.php' method='post'>
			<fieldset>
				<legend>Référence à supprimer</legend>
				<ul>
					<?php include('SQLrefasupp.php'); ?>
				</ul>
			</fieldset>	

			<fieldset>
				<legend>Valider la supression de la référence</legend>
						<input type='submit' id='valider'></a>
			</fieldset>
		</form>
	</div>
	
<?php include('RetourMenuCMS.php'); ?>

</body>
</html>