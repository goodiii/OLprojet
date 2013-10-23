<?php /*correspond à references/logement */
try
{
    $bdd = new PDO('mysql:host=localhost;dbname=olprojets', 'root', '');
}
catch(Exception $e)
{
        die('Erreur : '.$e->getMessage());
}
 
$req = $bdd->query('SELECT id, titre, imagepresentation, textpresentation, image1, commentaire1, image2, commentaire2, image3, commentaire3, image4, commentaire4, image5, commentaire5 FROM ref WHERE categorie="logement"') or die(print_r($bdd->errorInfo()));

while ($donnees = $req->fetch())
{
    echo '<form id="testos" action="projet.php" method="post"><input type="hidden" name="titre" value="'. addslashes($donnees['titre']).'"/><input type="hidden" name="textpresentation" value="'.addslashes($donnees['textpresentation']).'"/><input type="hidden" name="image1" value="'.addslashes($donnees['image1']).'"/><input type="hidden" name="commentaire1" value="'.addslashes($donnees['commentaire1']).'"/><input type="hidden" name="image2" value="'.addslashes($donnees['image2']).'"/><input type="hidden" name="commentaire2" value="'.addslashes($donnees['commentaire2']).'"/><input type="hidden" name="image3" value="'.addslashes($donnees['image3']).'"/><input type="hidden" name="commentaire3" value="'.addslashes($donnees['commentaire3']).'"/><input type="hidden" name="image4" value="'.addslashes($donnees['image4']).'"/><input type="hidden" name="commentaire4" value="'.addslashes($donnees['commentaire4']).'"/><input type="hidden" name="image5" value="'.addslashes($donnees['image5']).'"/><input type="hidden" name="commentaire5" value="'.addslashes($donnees['commentaire5']).'"/></form><li class="blockpp"><div style="text-align:center;color:white">' . addslashes($donnees['titre']) . '</div><div class="imagepp" style="background-image:url(image/' . addslashes($donnees['imagepresentation']) . ');background-size:100% 100%;width:100%;height:80%"></div></li>';
}

$req->closeCursor();

?>