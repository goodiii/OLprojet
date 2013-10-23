<!DOCTYPE html>
<html>
<?php include('head.php');
$titre = $_POST['titre'];
$textpresentation = $_POST['textpresentation'];
$nomimage1 = $_POST['nomimage1'];
$nomimage2 = $_POST['nomimage2'];
$nomimage3 = $_POST['nomimage3'];
$nomimage4 = $_POST['nomimage4'];
$nomimage5 = $_POST['nomimage5'];
$commentaire1 = $_POST['commentaire1'];
$commentaire2 = $_POST['commentaire2'];
$commentaire3 = $_POST['commentaire3'];
$commentaire4 = $_POST['commentaire4'];
$commentaire5 = $_POST['commentaire5'];
?>
	<body id="back" onload="setupZoom()">
		<div class="containerpage">
			<header class="header">
				<a href="navtest1.php"><div class="home">
				</div></a>
				<h1 class="titre"><?php echo $titre; ?> </h1>
			</header>
			<div class="synthese"><?php echo $textpresentation; ?>
			</div>
			<div class="blocdroite">
				<div class="blocimage">
					<div class="blueberry">
						<ul class="slides">
						<li><a href="../image/<?php echo $nomimage1; ?>"><img src="../image/<?php echo $nomimage1; ?>" style="width:100%;height:100%"/><p><?php echo $commentaire1; ?></p></a></li>
						<li><a href="../image/<?php echo $nomimage2; ?>"><img src="../image/<?php echo $nomimage2; ?>" style="width:100%;height:100%"/><p><?php echo $commentaire2; ?></p></a></li>
						<li><a href="../image/<?php echo $nomimage3; ?>"><img src="../image/<?php echo $nomimage3; ?>" style="width:100%;height:100%"/><p><?php echo $commentaire3; ?></p></a></li>
						<li><a href="../image/<?php echo $nomimage4; ?>"><img src="../image/<?php echo $nomimage4; ?>" style="width:100%;height:100%"/><p><?php echo $commentaire4; ?></p></a></li>
						<li><a href="../image/<?php echo $nomimage5; ?>"><img src="../image/<?php echo $nomimage5; ?>" style="width:100%;height:100%"/><p><?php echo $commentaire5; ?></p></a></li>
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
</html>