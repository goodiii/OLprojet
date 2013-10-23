<html>

<?php include('head.php'); ?>

<body id="back">
		<div class="container" style="color:white">
<?php
		// definition du chemin vers le dossier image pour le move_upload
		$emplacementtempimagepresentation = $_FILES['imagepresentation']['tmp_name'];
		$emplacementtempimage1 = $_FILES['image1']['tmp_name'];
		$emplacementtempimage2 = $_FILES['image2']['tmp_name'];
		$emplacementtempimage3 = $_FILES['image3']['tmp_name'];
		$emplacementtempimage4 = $_FILES['image4']['tmp_name'];
		$emplacementtempimage5 = $_FILES['image5']['tmp_name'];
		// recuperation des noms des fichiers images
		$nomimagepresentation = $_FILES['imagepresentation']['name'];
		$nomimage1 = $_FILES['image1']['name'];
		$nomimage2 = $_FILES['image2']['name'];
		$nomimage3 = $_FILES['image3']['name'];
		$nomimage4 = $_FILES['image4']['name'];
		$nomimage5 = $_FILES['image5']['name'];
		// adresse ou deplacer les fichiers telecharges
		$adresse = 'C:\Users\Thomas\Desktop\PROGRAMATION\wamp\www\test\OL\image\\';
		
		// recuperation des variables par la methode post
		$titre = $_POST["titre"];
		$categorie = $_POST["categorie"];
		$textpresentation = nl2br($_POST["textpresentation"]);
		$commentaire1 = $_POST["commentaire1"];
		$commentaire2 = $_POST["commentaire2"];
		$commentaire3 = $_POST["commentaire3"];
		$commentaire4 = $_POST["commentaire4"];
		$commentaire5 = $_POST["commentaire5"];
		
		//creation de la variable url
		$titresansespace = str_replace(' ','',$titre);
		$titreutf = utf8_decode($titresansespace);
		$a = '@ÀÁÂÃÄÅÇÈÉÊËÌÍÎÏÒÓÔÕÖÙÚÛÜÝàáâãäåçèéêëìíîïðòóôõöùúûüýÿ';
		$b = 'aAAAAAACEEEEIIIIOOOOOUUUUYaaaaaaceeeeiiiioooooouuuuyy';
		$a1 = utf8_decode($a);
		$b1 = utf8_decode($b);
		$url = strtr($titreutf, $a1, $b1);
		
		//Récupération et transformation de la variable references
	//	$references	= $_POST["references"]];
		
		
try
{
    $bdd = new PDO('mysql:host=localhost;dbname=olprojets', 'root', '');
}
catch(Exception $e)
{
        die('Erreur : '.$e->getMessage());
}
$req = $bdd->prepare('INSERT INTO projets(titre, url, categorie, imagepresentation, textpresentation, image1, commentaire1, image2, commentaire2, image3, commentaire3, image4, commentaire4, image5, commentaire5) VALUES(:titre, :url, :categorie, :imagepresentation, :textpresentation, :image1, :commentaire1, :image2, :commentaire2, :image3, :commentaire3, :image4, :commentaire4, :image5, :commentaire5)');
if( $req->execute(array(
    'titre'  => $titre,
	'url' => $url,
    'categorie'  => $categorie,
    'imagepresentation'  => $nomimagepresentation,
    'textpresentation'  => $textpresentation,
    'image1'  => $nomimage1,
    'commentaire1'  => $commentaire1,
	'image2'  => $nomimage2,
    'commentaire2'  => $commentaire2,
	'image3'  => $nomimage3,
    'commentaire3'  => $commentaire3,
	'image4'  => $nomimage4,
    'commentaire4'  => $commentaire4,
	'image5'  => $nomimage5,
    'commentaire5'  => $commentaire5,
//	'references'  => $references;
    )))

	{
echo '</br> Le projet a été intégré dans la base de données </br>'; 
	}
	
else

	{
	echo '</br> BUGGG sur le Base de données </br>';
	}	


if (move_uploaded_file($emplacementtempimagepresentation, $adresse.$nomimagepresentation) && 
move_uploaded_file($emplacementtempimage1, $adresse.$nomimage1) &&
move_uploaded_file($emplacementtempimage2, $adresse.$nomimage2) &&
move_uploaded_file($emplacementtempimage3, $adresse.$nomimage3) &&
move_uploaded_file($emplacementtempimage4, $adresse.$nomimage4) &&
move_uploaded_file($emplacementtempimage5, $adresse.$nomimage5))

{
echo '</br> Les 6 images ont bien ete ajoutees! </br>'; 
}

else

{
echo '</br> BUGGG dans le telechargement des fichiers images! </br>';
}
// Creation de la page web d apres les donnees du formulaire

$page = fopen('C:\Users\Thomas\Desktop\PROGRAMATION\wamp\www\test\OL\page\\'.$url.'.php', 'w');
if (fwrite($page, '<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8"/>
		<Title>'.$titre.' </Title>
		<link rel="stylesheet" href="../styletest2.css" />
		<meta name="viewport" content="initial-scale=1.0">
		<script src="../js/jquery-1.10.2.min.js" type="text/javascript">></script>
		<script src="../js/jquery-ui-1.10.3.custom.js" type="text/javascript">></script>		
		<script src="../js/blueberry.js" type="text/javascript">></script>
		<script src="../js/FancyZoom.js" type="text/javascript">></script>
		<script src="../js/FancyZoomHTML.js" type="text/javascript">></script>
		
	</head>
	
	<body id="back" onload="setupZoom()">
		<div class="containerpage">
			<header class="header">
				<a href="../navtest1.php"><div class="home">
				</div></a>
				<h1 class="titre">'.$titre.'</h1>
			</header>
			<div class="synthese">'.$textpresentation.'
			</div>
			<div class="blocdroite">
				<div class="blocimage">
					<div class="blueberry">
						<ul class="slides">
						<li><a href="../image/'.$nomimage1.'"><img src="../image/'.$nomimage1.'" style="width:100%;height:100%"/><p>'.$commentaire1.'</p></a></li>
						<li><a href="../image/'.$nomimage2.'"><img src="../image/'.$nomimage2.'" style="width:100%;height:100%"/><p>'.$commentaire2.'</p></a></li>
						<li><a href="../image/'.$nomimage3.'"><img src="../image/'.$nomimage3.'" style="width:100%;height:100%"/><p>'.$commentaire3.'</p></a></li>
						<li><a href="../image/'.$nomimage4.'"><img src="../image/'.$nomimage4.'" style="width:100%;height:100%"/><p>'.$commentaire4.'</p></a></li>
						<li><a href="../image/'.$nomimage5.'"><img src="../image/'.$nomimage5.'" style="width:100%;height:100%"/><p>'.$commentaire5.'</p></a></li>
						</ul>
					</div>
				</div>
				<div class="refer">
				</div>
			</div>
			<footer>
				<p> Copyright © 2013 Olivier Lemarquand</p>
			</footer>
		</div>
		<script>
		$(window).load(function() {
		$(".blueberry").blueberry();
		});
		</script>
	</body>	
</html>'))
{
echo '<p> La page a bien ete créée. </p><a href="page/'.$url.'.php" style="color:white"><p>Voir la page créée pour le projet: '.$titre.' </p></a><a href="navolcms.php" style="color:white"><p>Retour au menu principal</p></a>'; 
}

else
{
echo '<p> La page n a pas pu etre créée</p></br>';
}


?>

</div>
</body>
</html>