<!DOCTYPE html>
<html>
<?php include('head.php'); ?>
	
	<body id="back">
		<div class="container">
				<div class="nav">
					<ul class="liste1">
						<li class="projets">PROJETS</li>
						<li class="projets2">O.LEMARQUAND</li>
						<li class="projets3">REFERENCES</li>
							<ul class="p-under">
								<li class="p1" style="display:none"></li>
								<li class="p2" style="display:none"></li>
								<li class="p3" style="display:none"></li>
							</ul>
					</ul>
				<ul class="pp-under">
				</ul>
				</div>
		</div>
		<script>
		/* 1er menu deroulant*/
			/*Pour le 1er onglet */
			
		$(".projets").mouseenter(function(){
			$(".p-under").css("top","10px");
			$(".projets2,.projets3").css("opacity","0.5");
			$(".projets,.p1,.p2,.p3").css("opacity","1");
		$(".p1,.p2,.p3").css("font-size","200%");
			$(".blockpp").stop().hide(1);
			$(".p1").text("ESPACE PUBLIC");
			$(".p2").text("EQUIPEMENT PUBLIC");
			$(".p3").text("LOGEMENT");
			$(".p1,.p2,.p3").stop().show(1);
			$(this).stop().animate({fontSize: "220%"}, 10 );
			$(".projets2, .projets3").stop().animate({fontSize: "200%"}, 10 );
		});

			/*Pour le 2eme onglet */
			
		$(".projets2").mouseenter(function(){
			$(".projets,.projets3").css("opacity","0.5");
			$(".projets2,.p1,.p2,.p3").css("opacity","1");
			$(".p-under").css("top","65px");
			$(".p1,.p2,.p3").css("font-size","200%");
			$(".p1,.p2,.p3").stop().show(1);
			$(".blockpp").stop().hide(1);
			$(".p1").text("CV");
			$(".p2").text("CONTACT");
			$(".p3").text("ADMINISTRATION");
			$(".projets2").stop().animate({fontSize: "220%"}, 10 );
		$(".projets, .projets3").stop().animate({fontSize: "200%"}, 10 );
		});
			/*Pour le 3eme onglet */	
			
		$(".projets3").mouseenter(function(){
			$(".projets3,.p1,.p2,.p3").css("opacity","1");
			$(".projets,.projets2").css("opacity","0.5");
			$(".p1,.p2,.p3").css("font-size","200%");
			$(".p-under").css("top","115px");
			$(".p1,.p2,.p3").stop().show(1);
			$(".blockpp").stop().hide(1);
			$(".p1").text("ESPACE PUBLIC");
			$(".p2").text("EQUIPEMENT PUBLIC");
			$(".p3").text("LOGEMENT");
		$(".projets3").stop().animate({fontSize: "220%"}, 10 );
			$(".projets, .projets2").stop().animate({fontSize: "200%"}, 10 );
		});
		
		/* 2eme menu deroulant */
		
		$(".p1").mouseover(function(){
			$(".blockpp").stop().show(1);
			$(".p2,.p3").css("opacity","0.5");
			$(".p2,.p3").css("font-size","200%");
			$(".p1").css("opacity","1");
			if ($(".projets").css("opacity") === "1"){ /*correspond à projets/espace public */
				$(".pp-under").html ('<?php include("InsertionPp1.php"); ?>');}
			else if ($(".projets2").css("opacity") === "1"){ /*correspond à olemarquand/cv */
				$(".pp-under").html ('<?php include("InsertionPp2.php"); ?>');}
			else if ($(".projets3").css("opacity") === "1"){ /*correspond à reference/espace public */
				$(".pp-under").html ('<?php include("InsertionPp3.php"); ?>');}
		});
		
		$(".p2").mouseover(function(){		
			$(".blockpp").stop().show(1);
			$(".p1,.p3").css("opacity","0.5");
			$(".p2").css("opacity","1");
			$(".p1,.p3").css("font-size","200%");
			if ($(".projets").css("opacity") === "1"){ /*correspond à projets/equipement public */
				$(".pp-under").html ('<?php include("InsertionPp4.php"); ?>');}
			else if ($(".projets2").css("opacity") === "1"){ /*correspond à olemarquand/contact */
				$(".pp-under").html ('<?php include("InsertionPp5.php"); ?>');}
			else if ($(".projets3").css("opacity") === "1"){ /*correspond à references/equipement public */
				$(".pp-under").html ('<?php include("InsertionPp6.php"); ?>');}
		});
		
		$(".p3").mouseover(function(){ 
			$(".blockpp").stop().show(1);
			$(".p2,.p1").css("opacity","0.5");
			$(".p3").css("opacity","1");
			$(".p2,.p1").css("font-size","200%");
			if ($(".projets").css("opacity") === "1"){ /*correspond à projets/logement */
				$(".pp-under").html ('<?php include("InsertionPp7.php"); ?>');}
			else if ($(".projets2").css("opacity") === "1"){ /*correspond à olemarquand/administration */
				$(".pp-under").html ('<?php include("InsertionPp9.php"); ?>');}
			else if ($(".projets3").css("opacity") === "1"){ /*correspond à references/logement */
				$(".pp-under").html ('<?php include("InsertionPp8.php"); ?>');}
				});
				
		$(".blockpp").click(function() {
		$("#testos").submit();});
		
		$(".p1,.p2,.p3").mouseenter(function(){
		$(this).stop().animate({fontSize: "220%"}, 10 );
		});
		
		/*3eme menu deroulant */			 
	$(".imagepp").mouseover(function(){
		$(this).stop().animate({width: "120%", height:"120%"}, 50 );
		});
		
	$(".imagepp").mouseout(function(){
		$(this).stop().animate({width: "100px", height:"80px"}, 50 );
	});
		
		/*En cas de sortie du curseur du menu nav*/
		
		$(".nav").mouseleave(function(){
			$(".p1,.p2,.p3").css("opacity","1");
			$(".p1,.p2,.p3").css("font-size","200%");
			$(".projets,.projets2,.projets3").css("opacity","1");
			$(".projets,.projets2,.projets3").stop().animate({fontSize: "200%"}, 10 );
			$(".imagepp").stop().animate({width: "100px", height:"80px"}, 1 );
			$(".p1,.p2,.p3").stop().hide(1);
			$(".pp-under").html('');
		});
		
		</script>
	</body>
	
</html>