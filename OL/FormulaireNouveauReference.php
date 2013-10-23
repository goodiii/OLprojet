<!DOCTYPE html>
<html>	

<?php include('head.php'); ?>

<body id="back">
	<div class="container">
		<form style="color:white" enctype="multipart/form-data" action='CreationReference.php' method='post'>
			<fieldset>
				<legend>Nouvel référence à mettre en ligne</legend>
				<ul>
					<li>Titre de la référence :</li> 
						<input type='text' name='titre' id='titre'></input>
						</br>
						</br>
					<li>Catégorie :</li>  
						<select name="categorie" id="categorie">
							<option value="logement">Logement</option>
							<option value="espace public">Espace public</option>
							<option value="equipement public">Equipement public</option>
						</select>
						</br>
						</br>
					<li>Image de présentation de la référence : </li>
						<input type='file' name='imagepresentation' id='imagepresentation'></input>
					<li>Synthèse de la référence (20 lignes max.) :</li>
						<textarea name='textpresentation' id='textpresentation' rows="12"></textarea>
						</br>
						</br>
					<li>Image descriptive (1):</li>
						<input type='file' name='image1' id='image1'></input>
					<li>Texte descriptif de l'image (1) (2 phrases max.):</li>
						<textarea type='textarea' name='commentaire1' id='commentaire' rows="3"></textarea>
						</br>
						</br>
					<li>Image descriptive (2):</li>
						<input type='file' name='image2' id='image2'></input>
					<li>Texte descriptif de l'image (2) (2 phrases max.):</li>
						<textarea type='textarea' name='commentaire2' id='commentaire' rows="3"></textarea>
						</br>
						</br>
					<li>Image descriptive (3):</li>
						<input type='file' name='image3' id='image3'></input>
					<li>Texte descriptif de l'image (3) (2 phrases max.):</li>
						<textarea type='textarea' name='commentaire3' id='commentaire' rows="3"></textarea>
						</br>
						</br>
					<li>Image descriptive (4):</li>
						<input type='file' name='image4' id='imageprojet'></input>
					<li>Texte descriptif de l'image (4) (2 phrases max.):</li>
						<textarea type='textarea' name='commentaire4' id='commentaire' rows="3"></textarea>
						</br>
						</br>
					<li>Image descriptive (5):</li>
						<input type='file' name='image5' id='imageprojet'></input>
					<li>Texte descriptif de l'image (5) (2 phrases max.):</li>
						<textarea type='textarea' name='commentaire5' id='commentaire' rows="3"></textarea>
						</br>
						</br>
			</fieldset>
			
			<!-- <fieldset> 
				<legend>Références du projet</legend>
					<li>Quels sont les références à lier au projet? </li>
						<?php include("SQLreferences.php"); ?>
			</fieldset> --> 
			</ul>
			<fieldset>
				<legend>Valider la mise en ligne de la référence</legend>
						<input type='submit' id='valider'></a>
			</fieldset>
		</form>
	</div>
	
<?php include('RetourMenuCMS.php'); ?>

</body>
</html>