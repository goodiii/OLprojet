<?php //correspond à olemarquand/cv //
try
{
    $bdd = new PDO('mysql:host=localhost;dbname=olprojets', 'root', '');
}
catch(Exception $e)
{
        die('Erreur : '.$e->getMessage());
}
 
$req = $bdd->query('SELECT titre, imagepresentation FROM projets') or die(print_r($bdd->errorInfo()));

while ($donnees = $req->fetch())
{
  //  echo '<li style="width:100px;height:60px;list-style:none;display:inline-block;margin-top:21px;color:white;position:relative;margin-left:20px;background-color:black;cursor:pointer;vertical-align:top"><div style="text-align:center;color:white">' . $donnees['titre'] . '</div><div style="background-image:url(' . $donnees['imagepresentation'] . ');width:100%;height:80%"></div></li>';
}
$req->closeCursor();

?>