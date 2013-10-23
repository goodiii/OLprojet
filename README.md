OLprojet
========

Le site d'olivier.

Objectif:

Réaliser un site web pour le besoin d'O. Lemarquand.

Les contraintes:

Site sobre. Elements de design simple.
Evolutif. Olivier doit pouvoir changer le contenu du site par lui mm.
Un menu naviguer comprenant:
Projets =)3sous catégories par type de projets (logement/equipement public/espace public)
References =) 3sous catégories (logement/equipement public/espace public)
OL =) Nombre de sous catégories a definir (administration/CV/contact)

La méthode employé pour l'instant:

Les pages projets et références sont réalisé par formulaire (titre, texte de presentation, image de presentation, image avec commentaires, synthese du projet,..)
Les données du formulaire sont stockées dans une BD.
Une page est alors créée (oui oui un .php et je vais corriger ca).
Les images sont telechargées dans le menu image.
Les données de la BD sont requetés pour le menu naviguer (afficher les elements grace a une boucle)

Un menu cms, graphiquement identik au menu naviguer client, permet de creer et de supprimer les donnees de la BD.
