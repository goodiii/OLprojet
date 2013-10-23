<?php /*correspond à projets/logement */
try
{
    $bdd = new PDO('mysql:host=localhost;dbname=olprojets', 'root', '');
}
catch(Exception $e)
{
        die('Erreur : '.$e->getMessage());
}
 
$req = $bdd->query('SELECT titre, url, imagepresentation FROM projets WHERE categorie="logement"') or die(print_r($bdd->errorInfo()));

while ($donnees = $req->fetch())
{
	echo '<a href=page/'. addslashes($donnees['url']) .'.php><li class="blockpp" ><div style="text-align:center;color:white">' . addslashes($donnees['titre']) . '</div><div class="imagepp" style="background-image:url(image/' . addslashes($donnees['imagepresentation']) . ');background-size:100% 100%;width:100%;height:80%"></div></li></a>';
}
$req->closeCursor();

?>