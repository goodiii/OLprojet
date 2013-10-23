<html>
<head>
<meta charset="utf-8"/>
</head>
<body>

<?php
$email = "ouba78@hotmail.com"; // Mets ton adresse ici
$message_html = "<html><head></head><body><p>Bonjour Florent !</p><br /><p>Un message a été posté sur OLemarquand.com par <b>".$_POST["prenom"]." ".$_POST["nom"]." </b>(".$_POST["email"].")</p><br /><p> \"<b> ".$_POST["remarques"]." </b>\" </p><br /><p> Bonne journée! </p></body></html>";

$sujet = 'Message déposé sur OLemarquand.com';

	$headers ="From: OL website <ol@gmail.fr>\r\n";
	$headers .="Content-Type: text/html \r\n";
	$headers .="MIME-version: 1.0\r\n";
	
	$message = "\r\n";
	$message .= "\r\n" . $message_html . "\r\n";
	
if (mail($email, $sujet, $message, $headers))
	{
	echo "Un message de confirmation a été envoyé à O. Lemarquand.<br /><br /><a href='navtest1.php'>Retourner à la page principale</a>";
	}
else
	{
	echo "Votre message n\'a pas pu étre pris en compte.<br /><br /><a href='mainNew.php'>Retourner à la page principale</a>";
	}
?>
</body>
</html>