<!DOCTYPE html>
<html>

<?php include('head.php'); ?>
	
<body id="back">
	<div class="container">
		<form action='EmailConfirmation.php' method='post' style='color:white'>
			<fieldset>
				<legend>Identité</legend>
				<ul>
				<li>Prénom</li>
				<input type='text' name='prenom' id='prenom'></input>
				<li>Nom</li>
				<input type='text' name='nom' id='nom'></input>
				<li>Adresse email</li>
				<input type='email' name='email' id='email'></input>
				</ul>
			</fieldset>
			<fieldset>
				<legend>Suggestions</legend>
				<ul>
				<li>Entrez vos remarques</li>
				<input type='textarea' name='remarques' id='remarques' rows="8">
				<ul>
			</fieldset>
			<fieldset>
				<legend>Valider</legend>
				<input type='submit' id='valider'></a>
			</fieldset>
		</form>
	
	</div>
	
	<?php include('RetourMenuCMS.php'); ?>
	
</body>
</html>