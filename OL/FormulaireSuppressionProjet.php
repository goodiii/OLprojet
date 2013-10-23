<!DOCTYPE html>
<html>	
<?php include('head.php'); ?>

<body id="back">
	<div class="container">
		<form style="color:white" enctype="multipart/form-data" action='SuppressionProjet.php' method='post'>
			<fieldset>
				<legend>Projet à supprimer</legend>
				<ul>
					<?php include('SQLprojetasupp.php'); ?>
				</ul>
			</fieldset>	

			<fieldset>
				<legend>Valider la suppression du ou des projets</legend>
						<input type='submit' id='valider'></a>
			</fieldset>
		</form>
	</div>
	
<?php include('RetourMenuCMS.php'); ?>

</body>
</html>