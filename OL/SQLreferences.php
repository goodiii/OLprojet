<?php
try
{
    $bdd = new PDO('mysql:host=localhost;dbname=olprojets', 'root', '');
}
catch(Exception $e)
{
        die('Erreur : '.$e->getMessage());
}
 
$req = $bdd->query('SELECT titre FROM ref') or die(print_r($bdd->errorInfo()));

while ($donnees = $req->fetch())
{
    echo '<input type="checkbox" name="reference[]" value="' . $donnees['titre'] . '" id="' . $donnees['titre'] . '" /><label for="' . $donnees['titre'] . '">' . $donnees['titre'] . '</label></br>';
}	
$req->closeCursor();

?>