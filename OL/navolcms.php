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
			$(".p1").html("<a href=FormulaireNouveauProjet.php style='text-decoration:none;color:white'>AJOUTER</a>");
			$(".p2").html("<a href=FormulaireSuppressionProjet.php style='text-decoration:none;color:white'>SUPPRIMER</a>");
			$(".p1,.p2,.p3").stop().show(1);
			$(".projets").stop().animate({fontSize: "220%"}, 10 );
			$(".projets2, .projets3").stop().animate({fontSize: "200%"}, 10 );
		});

			/*Pour le 2eme onglet */
			
		$(".projets2").mouseenter(function(){
			$(".projets,.projets3").css("opacity","0.5");
			$(".projets2,.p1,.p2,.p3").css("opacity","1");
			$(".p-under").css("top","65px");
			$(".p1,.p2,.p3").css("font-size","200%");
			$(".p1,.p2").stop().show(1);
			$(".p3").stop().hide(1);
			$(".p1").text("AJOUTER UN CV");
			$(".p2").text("SUPPRIMER UN CV");
			$(".projets2").stop().animate({fontSize: "220%"}, 10 );
			$(".projets, .projets3").stop().animate({fontSize: "200%"}, 10 );
		});
			/*Pour le 3eme onglet */	
			
		$(".projets3").mouseenter(function(){
			$(".projets3,.p1,.p2,.p3").css("opacity","1");
			$(".projets,.projets2").css("opacity","0.5");
			$(".p1,.p2,.p3").css("font-size","200%");
			$(".p-under").css("top","115px");
			$(".p1,.p2").stop().show(1);
			$(".p1").html("<a href=FormulaireNouveauReference.php style='text-decoration:none;color:white'>AJOUTER</a>");
			$(".p2").html("<a href=FormulaireSuppressionReference.php style='text-decoration:none;color:white'>SUPPRIMER</a>");
			$(".projets3").stop().animate({fontSize: "220%"}, 10 );
			$(".projets, .projets2").stop().animate({fontSize: "200%"}, 10 );
		});
		
		/* 2eme menu deroulant */
		
		$(".p1").mouseover(function(){
			$(".p2,.p3").css("opacity","0.5");
			$(".p2,.p3").css("font-size","200%");
			$(".p1").css("opacity","1");
		});
		
		$(".p2").mouseover(function(){		
			$(".p1,.p3").css("opacity","0.5");
			$(".p2").css("opacity","1");
			$(".p1,.p3").css("font-size","200%");
		});
		
		$(".p3").mouseover(function(){ 
			$(".p2,.p1").css("opacity","0.5");
			$(".p3").css("opacity","1");
			$(".p2,.p1").css("font-size","200%");	
		});
		
		$(".p1,.p2,.p3").mouseenter(function(){
			$(this).stop().animate({fontSize: "220%"}, 10 );
		});
		
		/*En cas de sortie du curseur du menu nav*/
		
		$(".nav").mouseleave(function(){
			$(".p1,.p2,.p3").css("opacity","1");
			$(".p1,.p2,.p3").css("font-size","200%");
			$(".projets,.projets2,.projets3").css("opacity","1");
			$(".projets,.projets2,.projets3").stop().animate({fontSize: "200%"}, 10 );
			$(".blockpp").stop().animate({width: "100px", height:"80px"}, 1 );
			$(".p1,.p2,.p3").stop().hide(1);
			$(".pp-under").html('');
		});
		</script>
	</body>
	
</html>