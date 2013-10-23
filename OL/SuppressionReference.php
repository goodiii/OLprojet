<!DOCTYPE html>
<html>
<?php include('head.php'); ?>

<body id="back">
		<div class="container" style="color:white">
<?php
if (isset($_POST['test']))
	{
	if (is_array($_POST['test']))
		{
		foreach ($_POST['test'] as $titreref)
			{				
				$titresansespace = str_replace(' ','',$titreref);
				$titreutf = utf8_decode($titresansespace);
				$a = '@ÀÁÂÃÄÅÇÈÉÊËÌÍÎÏÒÓÔÕÖÙÚÛÜÝàáâãäåçèéêëìíîïðòóôõöùúûüýÿ';
				$b = 'aAAAAAACEEEEIIIIOOOOOUUUUYaaaaaaceeeeiiiioooooouuuuyy';
				$a1 = utf8_decode($a);
				$b1 = utf8_decode($b);
				$url = strtr($titreutf, $a1, $b1);
					
				try
				{
					$bdd = new PDO('mysql:host=localhost;dbname=olprojets', 'root', '');
				}
				catch(Exception $e)
				{
						die('Erreur : '.$e->getMessage());
				}
				if ($req = $bdd->query('DELETE FROM ref WHERE titre ="'.$titreref.'"'))
					{
					echo 'La référence '.$titreref.' a bien été supprimée de la base de données <br/>';
					}	
				if (unlink('page/'.$url.'.php'))
					{
					echo 'Le fichier '.$titreref.' a bien ete supprimé <br/> <a href="navolcms.php" style="color:white"><p>Retour au menu principal</p></a><br/>';
					}
			}
		}	
	}
?>
</body>
</html>