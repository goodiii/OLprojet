/**
 * imZoom
 * =============================================================================
 * charger les liens vers des images dans un diaporama
 * 
 * @author      Erwan Lef�vre <erwan.lefevre@gmail.com>
 * @copyright   Erwan Lef�vre 2009
 * @license     Creative Commons - Paternit� 2.0 France - http://creativecommons.org/licenses/by/2.0/fr/
 * @version     3.2.1 / 2010-10-25
 * @see			http://www.webbricks.org/bricks/imZoom/
 
 * @compatible	au 25 octobre 2010, compatibilit� assur�e pour :
 *				Firefox, Internet Explorer 5.5+, Op�ra, Safari, Chrome 
 */

/*global getKeyCode,preventDefault,css3,Anim,anim,window,addElem,addEvent,byId,byTN,getPos,pageDim,redimArea,remEvent,scrolled,setStyle,winDim */


/* exemples d'utilisation :
  
-	mettre en place sur un lien :

		var target = document.getElementById('target');
		imZoom.applyTo(target);
  
-	mettre en place sur une liste de liens :

		var targets = document.getElementById('container').getElementsByTagName('a');
		imZoom.applyTo(targets); //  comme pour un seul lien
  
-	mettre en place sur tous les liens �ligibles de la page :

		imZoom.autoApplyInto();
  
-	mettre en place sur tous les liens �ligibles d'un �l�ment donn� :

		var container = document.getElementById('container');
		imZoom.autoApplyInto(container);
		
-	pour passer des options :

	-	avec imZoom.applyTo() :
		
		var options = {
			opt1 : val1,
			optn : valn
		}
		imZoom.applyTo(target, options); (options en second param�tre)

	-	avec imZoom.autoApplyInto() :
		
		var options = {
			opt1 : val1,
			optn : valn
		}
		imZoom.autoApplyInto(options, container); (options en premier param�tre)

*/





var imZoom = (function (window, document, undefined) {

/**
 * transfer
 * =============================================================================
 * retourne un objet contenant les propri�t�s et m�thodes de l'objet /dest/,
 * compl�t�es et/ou �cras�es par celles de l'objet /source/
 *
 * @param       source       {object}        l'objet source
 * @param       dest         {object}        l'objet de destination
 * @return      {object}
 *
 */
function transfer (source, dest) {
    var prop, transfered={};
    for ( prop in dest ) { transfered[prop] = dest[prop]; }
    for ( prop in source ) { transfered[prop] = source[prop]; }
    return transfered; 
}





/**
 * easeInOut v1.1 / 2010-06-26
 * 
 * calcule des �tapes d'animation douces
 *
 * @param       startValue      {Float}          valeur de d�part (peut �tre inf�rieure � celle de fin)
 * @param       endValue        {Float}          valeur de fin (peut �tre sup�rieure � celle de fin)
 * @param       totalSteps      {Integer}        nombre total d'�tapes dans l'animation
 * @param       actualStep      {Integer}        �tapes actuelle de l'animation
 * @param       powr            {Float}          "puissance" de la courbe. 1=lin�aire et ease-out<1<ease-in. (0.2 et 3 font de belles courbes)
 * @param       round           {Integer}        indique d'arrondir le r�sultat ou non
 * 
 * @returns     {mixed}         Integer|Float selon la valeur du param�tre round
 * 
 * =============================================================================
 */
function easeInOut(startValue,endValue,totalSteps,actualStep,powr,round) { 
    var stepp, delta = endValue - startValue; 
    stepp = startValue+(Math.pow(((1 / totalSteps) * actualStep), powr) * delta); 

    return round ? Math.round(stepp) : stepp;
}





/**
 * each()  v1.2.1 - 2010-10-12
 * =============================================================================
 * extensions de l'objet Object, permettant de parcourir son contenu

 * @param		{function}		fn				obligatoire - fonction callBack � appliquer � chaque �l�ment de l'objet
 * @param		{boolean}		recursive		facultatif - la valeur cherch�e pour l'attibut. accepte une chaine ou une expression r�guli�re; par d�faut : toutes
 *
 * @return      Object			retourne l'objet initial
 *
 */
Object.prototype.each = function (fn, recursive) {
	
	for (var key in this) {
		if (this.hasOwnProperty(key)) {
			if (recursive && typeof this[key] === 'object') {
				this[key].each(fn);
			}
			else {
				fn.apply(
					this,
					[ this[key], key ]
				);
			}
		}
	}
	
	return this;
};






/** 
 * winDim v2.0.1, 2010-07-07
 * 
 * retourne les dimentions int�rieurs de la fen�tre
 *
 * @returns		{Object}
 * 
 * =============================================================================
 */
function winDim() {
	var w,h,
		i = window,
		d = document,
		de = d.documentElement,
		db = d.body;
		
	if ( i.innerWidth ) { // autres que IE
		w = i.innerWidth;
		h = i.innerHeight;
	} else if ( de.clientWidth ) { // IE8
		w = de.clientWidth;
		h = de.clientHeight;
	}
	else { // IE6
		w = db.clientWidth;
		h = db.clientHeight;
	}

	return {'w':w, 'h':h} ;
}






/** 
 * setStyle v1.0
 * 
 * Modifie l'attribut style de l'�l�ment /element/, selon le tableau associatif /styles/.
 *
 * @param           elem            {HTMLElement}           l'�l�ment dont on veut modifier les styles
 * @param           styles          {Object}                d�finition (javascript) des styles � appliquer � l'�l�ment
 * @returns         {void}
 * 
 * =============================================================================
 */
function setStyle(elem, styles) { // 58 octets
	for (var prop in styles) {
		elem.style[prop] = styles[prop];
	}
}




/** scrolled
 * =============================================================================
 * retoune les valeurs (horizontale et verticale) de d�filement de la fen�tre
 * (en tenant compte du navigateur)
 *
 * @return          Object      {'x','y'}         
 */
function scrolled () {
    var x,y,
		w = window,
		d = document,
		de = d.documentElement,
		db = d.body;
    
    // vrais navigateurs
    if ( w.pageXOffset!==undefined) {
        x = w.pageXOffset;
        y = w.pageYOffset;
    }
    // ie
    else {
        x = de.scrollLeft ? de.scrollLeft : (db.scrollLeft?db.scrollLeft:0) ;
        y = de.scrollTop ? de.scrollTop : (db.scrollTop?db.scrollTop:0) ;
    }
    
    return {'x':x, 'y':y};
}






/**
 * remEvent()
 * 
 * retire la fonction /fn/ de la pile de r�solution de l'�v�nement /evenType/ de
 * l'objet /obj/
 * 
 * merci � : http://www.scottandrew.com/weblog/articles/cbs-events
 * 
 * @param		{Mixed}				obj			window, ou document, ou un �l�ment HTML
 * @param		{string}			evType		type d'event (click, mouseover, mouseout, etc.�)
 * @param		{string}			fn			la fonction � supprimer
 * @param		{boolean}			useCapture	
 * 
 * @returns		void
 * 
 * =============================================================================
 */
function remEvent(obj, evType, fn, useCapture){
	if (obj.removeEventListener) { obj.removeEventListener(evType, fn, useCapture); }
	else { obj.detachEvent("on"+evType, fn); }
}




/**
 * redimArea v1.2 / 2010-06-26
 * 
 * retourne les mesures /{w,h}/ de /src_w/ et /scr_h/, apr�s redimentionnement homot�tique
 * d'apr�s les crit�res /mesures{max_w, min_w, max_h, max_h}/
 *
 * @param		{Integer}		src_w		largeur de la surface � redimentionner
 * @param		{Integer}		src_h		hauteur de la surface � redimentionner
 * @param		{Object}		mesures		mesures maximales et/ou minimales pour
 *											la largeur et/ou la hauteur
 *
 * @returns		{Object}
 *											
 * =============================================================================
 */
function redimArea (src_w, src_h, options) {
	
	// initialisations
	
		var max_w, min_w, max_h, min_h, // contraintes donn�es en options
			round,						// option indiquant d'arrondir les dimensions obtenues
			wh, hw,						// rapports de proportion de la surface
			height, width;				// dimensions finales de la surface
		
		// mesures souhait�es
		options = options || {};
		max_w = options.max_w;
		min_w = options.min_w;
		max_h = options.max_h;
		min_h = options.max_h;
		
		// autres options
		round = options.round===undefined ? 1 : options.round; // pour r�trocompatibilit� : undefined=>true
	
		// calcul du rapport largeur/hauteur de la source
		wh = src_w / src_h ;
		hw = src_h / src_w ;
		
		// par d�faut, garder les mesures initiales
		height = src_h ;
		width = src_w ;
		
	// redimentionnements
		
		// agrandissement largeur
		if ( width < min_w ) {
			width = min_w;
			height = width * hw ;
		}
		
		// agrandissement hauteur
		if ( height < min_h ) {
			height = min_h;
			width = height * wh ;
		}
	
		// r�duction largeur
		if ( max_w && (width > max_w) ) {
			width = max_w;
			height = width * hw ;
		}
	
		// r�duction hauteur
		if ( max_h && (height > max_h) ) {
			height = max_h;
			width = height * wh ;
		}
		
	// valeurs n�gatives interdites
		width = width<0 ? 0 : width;
		height = height<0 ? 0 : height;
	
	return {
		w : round ? Math.round(width) : width,
		h : round ? Math.round(height) : height
	};
}





/**
 * preventDefault()
 * 
 * permet d'annuler l'effet normal d'un �v�nement sur un �l�ment html
 * (revient � faire un "return false" pour cet �v�nement, en passant par le event-handeler)
 *
 * v1.0 - 2010-05-30
 * 
 * @returns		void
 * 
 * =============================================================================
 */
function preventDefault(e){
	e = e||event;
	if (e.preventDefault) { e.preventDefault(); }
	else { e.returnValue = false;  }
}



/** 
 * pageDim() 
 * -----------------------------------------------------------------------------
 * retourne les dimentions de la page
 *
 * @return		{Object}		{'w','h'}
 */
function pageDim() {
	var d = document,
		dE = d.documentElement,
		dB = d.body,
		w, h;
		
	// firefox is ok
	h = dE.scrollHeight;
	w = dE.scrollWidth;
	
	// now IE 7 + Opera with "min window"
	if ( dE.clientHeight > h ) { h  = dE.clientHeight; }
	if ( dE.clientWidth > w ) { w  = dE.clientWidth; }
	
	// last for safari
	if ( dB.scrollHeight > h ) { h = dB.scrollHeight; }
	if ( dB.scrollWidth > w ) { w = dB.scrollWidth; }

	return {'w':w, 'h':h} ;
}






/** 
 * getPos v1.01
 * 
 * retourne la position (dans la page) de chacun des c�t�s de l'�l�ment /elem/,
 * dispatch� dans un tableau associatif contenant les cl�s t|b|l|r
 * (la valeur retourn�e est donn�e en pixels)
 * (tient compte des diff�rences de fonctionnement des navigateur)
 *
 * @param           Object          elem            l'�l�ment inspect�
 * 
 * @returns         Integer
 * 
 * =============================================================================
 */
function getPos(elem) {
    var pos={'r':0,'l':0,'t':0,'b':0},
        tmp=elem;
    
    // on proc�de de parent en parent car IE fonctionne comme �a
    // (les autres donnent directement la position par rapport � la page)
    
    do {
        pos.l += tmp.offsetLeft;
        tmp = tmp.offsetParent;
    } while( tmp !== null );
    pos.r = pos.l + elem.offsetWidth;
    
    tmp=elem;
    do {
        pos.t += tmp.offsetTop;
        tmp = tmp.offsetParent;
    } while( tmp !== null );
    pos.b = pos.t + elem.offsetHeight;
    
    return pos;
}





/** 
 * getKeyCode v1.2 / 2010-06-26
 * 
 * retourne le code de la touche press�e, pour l'event /e/.
 *
 * @requires	addEvent
 * 
 * @param		event		e		l'�v�nement courant
 * 
 * @returns		{Integer}
 *
 * =============================================================================
 */
function getKeyCode(e) {
	e = e||event;
	keyCode = e.which || e.keyCode;
	return keyCode;
}




/**
 * Css3 v1.0 / 2010-10-14
 * =============================================================================
 * cr��e un objet Css3
 *
 * @param		elem		{HTMLElement}		L'�l�ment auquel appliquer des propri�t�s css3
 */
function Css3(elem){
	
	var self = this;
	
	this.elem = elem;
	
	/**
	 * extend
	 * -------------------------------------------------------------------------
	 * permet d'ajouter des modules � Css3, de fa�on manuelle ou automatis�e
	 *
	 * @param		fnName		{Mixed}			nom de la m�thode � ajouter {String}
	 *											dans le cas d'un ajout automatis�, plusieurs noms de m�thodes
	 *											peuvent �tre donn�s, s�par�s par des espaces {String},
	 *											ou dispatch�s dans un tableau {Array}
	 * @param		fn			{Mixed}			facultatif - m�thode � ajouer {Function}
	 *											si non fourni, la m�thode est cr�e de fa�on automatique {undefined}
	 *
	 * @returns		{this}
	 *
	 */
	this.extend = function(fnName, fn){
		if ( fnName ) {
			if (!fn) {
				var i, max, propList, tmp;
				propList = fnName instanceof Array ? fnName : fnName.split(" ");
				for ( i = 0, max = propList.length; i < max ; i++) {
					fnName = propList[i];
					tmp = new Function("val", "css3(this.elem).auto('"+fnName+"', val); return this;");
					self.extend(fnName, tmp);
				}
			}
			else {
				Css3.prototype[fnName] = fn;
			}
		}
		return this;
	};
	
	/**
	 * auto
	 * -------------------------------------------------------------------------
	 * permet d'�muler un certain nombre de propri�t�s css3, en apposant simplement
	 * au non de la propri�t� les pr�fixes des diff�rents navigateurs
	 *
	 * @param		fnName		{String}		nom de la m�thode � ajouter
	 * @param		fn			{Function}		m�thode � ajouter
	 *
	 * @returns		{this}
	 *
	 */
	this.auto = function(propName, value){

		var elem = self.elem;

		// conversion des syntaxes css en syntaxes js (boderWidth vient doubler border-width)
		if ( /-/.test(propName) ) {
			propName = propName.css2js();
		}
		
		// pour les navigateur supportant la r�ellement la propri�t� css3
		elem.style[propName] = value;
		
		// pour les alternatives propri�taires
		propName = propName.substring(0,1).toUpperCase() + propName.substring(1); // propName[0] n'est pas compatible ie<8
		elem.style["O"+propName] = value;
		elem.style["Moz"+propName] = value;
		elem.style["Webkit"+propName] = value;
		elem.style["Khtml"+propName] = value;
		
		return this;
	};
	
	
	/**
	 * isset
	 * -------------------------------------------------------------------------
	 * Retourne vrai si une m�thode du nom fnName a �t� cr��e dans l'objet Css3.
	 * Sinon faux.
	 *
	 * @param		propList		{Array}		noms des modules � g�n�rer
	 *
	 * @returns		{this}
	 *
	 */
	this.isset = function (fnName){
		return Css3.prototype[fnName];
	};
}


/**
 * css3 (sans majuscule)
 * -----------------------------------------------------------------------------
 * raccourci, retournant un objet Css3
 *
 * @returns		{Css3 Object}
 */
function css3(elem){
	return new Css3(elem);
}



/**
 * Css3.opacity
 * =============================================================================
 * r�gle l'opacit� d'un �l�ment
 *
 * @param       elem            {HTMLElement}		l'�l�ment � traiter
 * @param       value           {Float}				valeur souhait�e (0=transparent, 1=opaque)
 * 
 * @return      {this}
 */
css3().extend('opacity', function (value) {
	var self = this; // pour gagner quelques octets
	value = (value == 1) ? 0.99999:value;

	// ie
	self.elem.style.zoom = 1; // obtenir le layout
	self.elem.style.filter = 'alpha(opacity=' + value * 100 + ')';
	
	// autres navigateurs
	self.auto('opacity', value);
	
	return self;
});






/**
 * byTN()
 * 
 * raccourci pour [element].getElementsByTagName()
 * retourne l'�l�ment html de type /tagName/
 *
 * @param		tagName		{String}		Le type d'�l�ments recherch�
 *
 * @returns		{HTMLCollection}
 * 
 * =============================================================================
 */
function byTN(tagName,container) {
	return (container||document).getElementsByTagName(tagName) ;
}








/**
 * byId()
 * raccourci pour document.getElementById()
 * retourne l'�l�ment html dont l'attribut id vaut /id/
 *
 * @param		id		{String}		L'attribut id de l'�l�ment recherch�
 *
 * @returns		{HTMLElement}
 * 
 * =============================================================================
 */
function byId(id) {
	return document.getElementById(id) ;
}







/**
 * addEvent
 * 
 * ajoute la fonction /fn/ � la pile de r�solution de l'�v�nement /evenType/ de
 * l'objet /obj/
 * 
 * merci � : http://www.scottandrew.com/weblog/articles/cbs-events
 *
 * @param		{Mixed}				obj			window, ou document, ou un �l�ment HTML
 * @param		{String}			evType		type d'event (click, mouseover, mouseout, etc.�)
 * @param		{String}			fn			la fonction � ajouter
 * @param		{Boolean}			useCapture	"useCapture un bool�en
 * 
 * @returns		void
 * 
 * =============================================================================
 */
function addEvent (obj, evType, fn, useCapture){
	if (obj.addEventListener) { obj.addEventListener(evType, fn, useCapture); }
	else { obj.attachEvent("on"+evType, fn); }
}





/**
 * addElem v1.01
 * raccourci pour [HTMLElement].appendChild(document.createElement([tagName]))
 * 
 * @param		{HTMLElement}		container		(optionnel) l'�l�ment dans lequel en cr�er un nouveau (par d�faut :  <body>)
 * @param		{string}			tagName			le type d'�lement � cr�er (div|p|a|table, etc.)
 *
 * @returns		{HTMLElement}
 * 
 * =============================================================================
 */
function addElem(tagName,container){
	container = container || document.getElementsByTagName("body")[0]; 
	return container.appendChild(document.createElement(tagName));
}



/**
 * Anim v1.1.1 / 2010-10-24
 * 
 * permet d'animer des �l�ments HTML au moyen de leurs propri�t�s de styles
 *
 * @requires    transfer	
 * @requires    easeInOut
 * @requires    Object.each
 * @requires    css3				(uniquement pour la compatibilit� des propri�t�s css3)
 * @requires    css3.opacity		(uniquement pour la compatibilit� de la propri�t� 'opacity')
 * @requires    Color				(uniquement pour les animation de couleurs)
 * @requires    getPos				(uniquement pour d�tecter automatiquement la position d'un �l�ment dans la page)
 * 
 * @param       elem			{HTMLElement}		l'�l�ment � animer
 * @param       defSettings		{Object}			facultatif - les r�glages qui serviront par d�faut (voir d�tail dans le code source, � la d�claration de self.def)
 *
 * =============================================================================
 */
function Anim(elem, defSettings){
	
	var self = this; // surtout pour jsMin
	
    // options par d�faut
    self.def = { 
        from : {}, // Object - propri�t�s de style initiales - exemple : {width:'300px', color:'#faa'}
        to : {}, // Object - propri�t�s de style finales - exemple : {fontSize:'2em', backgroundColor:'rgb(200,55,0)'}
        restart : 1, // Boolean - si l'animation vient � �tre relanc�e avant la fin, faut-il la reprendre � z�ro
        ease : 1, // Float - r�gularit� de l'anim. 1=lin�aire, et ease-out<1<ease-in
        duration : 500, // Integer - dur�e de l'animation (en millisecondes)
		onStart : 0, // Function - une fonction callback � ex�cuter au d�but de l'animation
		onNewFrame : 0, // Function - une fonction callback � ex�cuter � chaque �tape de l'animation
		onFinish : 0 // Function - une fonction callback � ex�cuter � la fin de l'animation
    };
	
    // lecture de l'�l�ment courant
    self.elem = elem;
	
    // chargement des options
    self.def = transfer(defSettings||{}, self.def);
    
    
	
    /**
     * setDef
     * 
     * d�termine les param�tres par d�faut de l'animation courante
     *
     * @param           {Object}		settings		les param�tres par d�faut � attribuer � l'animation courante
     * @return			{self}
     * 
     * -------------------------------------------------------------------------
     */
    self.setDef = function (settings) {
		self.def = transfer(settings, self.def);
		return self;
	};
    
    
	
    /**
     * detectProp
     * 
     * tente de d�terminer la valeur actuelle de la propri�t� /prop/
     *
     * @param           {String}		prop		le nom de la propri�t� de style - exemple : 'backgroundColor'
     * @return			{Mixed}
     * 
     * -------------------------------------------------------------------------
     */
    self.detectProp = function (prop) {
		var elem = self.elem,
			getPos = window.getPos,
			px = 'px', zpx = '0px'; // pour jsMin
        switch (prop) {
                case 'width': return elem.clientWidth+px;
                case 'height': return elem.clientHeight+px;
					
				// ont recours � d'autres scripts
                case 'top':		return getPos ? getPos(elem).t+px : zpx ; 
                case 'bottom':	return getPos ? getPos(elem).b+px : zpx ; 
                case 'left':	return getPos ? getPos(elem).l+px : zpx ; 
                case 'right':	return getPos ? getPos(elem).r+px : zpx ; 
                        
                /* valeurs fermes, �tablies d'apr�s les valeurs par d�faut des principaux navigateurs
                case 'borderColor': return 'rgb(0,0,0)';
                case 'backgroundColor': return 'rgb(255,255,255)';
                case 'color': return 'rgb(0,0,0)';
                case 'borderWidth': return '1px';
                case 'opacity': return 1;
                */
                
                default : return 0;
        }
        return false;
    };
    
    
    
    /**
     * readProp
     * 
     * d�compose la valeur d'une propri�t� de style donn�e, et retourne le r�sultat
     * dans un tableau associatif contenant (selon pertinence) la valeur soumise (.asked),
     * les unit�s de mesure (.unit), la valeur num�rique sans unit�s (.clean),
     * et un tableau d�composant les valeurs rvb de coloration
     *
     * @param           propValue			{String}		la valeur de la propri�t� � d�composer
     * 
     * @return          {Array}				retourne un tableau associatif contenant une s�rie d'interpr�tations de la valeur donn�e
     * 
     * -------------------------------------------------------------------------
     */
    self.readProp = function (propValue) {
		var decomposed = {},
			asked,
			color;
		
		asked = decomposed.asked = propValue+''; // rappel de la valeur soumise
		decomposed.unit = asked.match(/px|em|%/); // unit�s
		
		decomposed.clean = parseFloat(asked); // valeur num�rique (��d sans les unit�s)           
		// gestion des couleurs (seulement si les fonction sp�cifiques ont �t� d�clar�es)
		if ( window.Color && asked.match(/rgb|(#[a-f0-9]{3,6})/i) ) {
			decomposed.clean = asked; // pour l'initialisation
			color = new Color(asked);
			decomposed.rgb = color.rgbArr();
		}
		return decomposed;    
	};
	
	
	
	/**
     * readFromTo
     * 
     * d�compose les diff�rentes propri�t�s list�es dans options.from et options.to
     * (soumettre l'une ou l'autre de ces variables comme param�tre de la fonction)
     *
     * @param           set				{Mixed}			les options .to ou .from de l'animation.
     *													accepte de pr�f�rence un tableau associatif,
     *													mais peut traiter des chaines proprement r�dig�e
     * @return          {Object}		retourne un tableau associatif d�composant,
     *									pour chaque propri�t� d�clar�e, des mesures
     *									et int�pr�tations (cf. self.readProp())
     * 
     * -------------------------------------------------------------------------
     */
    self.readFromTo = function (set) {
        
        if (!set) {return false;}
		var prop, eachDeclared={},
			declared, i, lg, tmp; // pour traiter les d�clarations abr�g�es
		
		// d�composition des d�clarations abr�g�es
		if ( set instanceof String ) {
			
			// conversion de la syntaxe css en syntaxe js (border-width devient boderWidth)
			if ( set.css2js ) {
				set = set.css2js();
			}
			
			// relev� des diff�rentes propri�t�s d�clar�es dans la cha�ne
				set = set.trim();
				declared = set.split(/;/);
				declared.each(function(v,k){ // supprimer les lignes vides
					if (!v) {
						declared.splice(k,1);
					}
				});
				lg = declared.length;
			
			// recomposition de la d�claration sous forme d'objet
				set = {};
				for (i=0; i<lg; i++) {
					tmp = declared[i].split(/:/);
					prop = tmp[0].trim(); // propri�t� concern�e
					set[prop] = tmp[1].trim() ;
				}
		}
		
		// traitement de chacune des propri�t�s
		set.each(function(propVal,propName){
			eachDeclared[propName] = self.readProp(propVal+'');
		});
		
        return eachDeclared;
    };
    
	
    
    /**
     * go
     * 
     * lance l'animation, avec les options /options/
     *
     * @param       options          {Object}       les options pour cette occurence de l'animation
     * 
     * -------------------------------------------------------------------------
     */
    self.go = function (options) {

        var opt, // raccourci pour self.options
			prop, // pour boucle for in
			st; // raccourci pour self.elem.style
        
        // chargement des r�glages
		opt = self.options = transfer(options||{}, self.def);

		// callback de d�but d'anim
		if ( opt.onStart ) {
			opt.onStart();
		}

		// intialisation du compteur de temps
        if ( opt.restart || !self.startTime ) {
			self.startTime = new Date().getTime();
			self.pauseTime = 0;
		}
		
        // d�compostions des propri�t�s de from et to
        self.from = self.readFromTo( opt.from ? opt.from : self.def.from );
        self.to = self.readFromTo( opt.to ? opt.to : self.def.to );

        
        // compl�ter les from manquants...
        st = elem.style;
        for (prop in self.to) {
			if ( !self.from[prop] ){
				if ( st[prop] || st[prop]===0 ) { // ...par la propri�t�  de style si d�j� d�finie par js
					self.from[prop] = self.readProp(st[prop]);
				}
				if ( !self.from[prop] ) { // ...sinon t�cher de d�tecter la valeur courante
					self.from[prop] = self.readProp(self.detectProp(prop));
				}
			}
		}
		   
        // initialiser l'�l�ment anim�, tel que d�clar� dans .from
		self.from.each(function(propName, propVal){
			st[propName] = propVal.clean;
		});
        
        // lancer le premier frame
        self.next() ;
		
		return self;
    };
	
	
        
    /**
     * next
     * 
     * lance le frame suivant
     * 
     * -------------------------------------------------------------------------
     */
    self.next = function () {
		self.prog = setTimeout(self.frame, 1);
		if ( self.pauseStart ) {
			var t = new Date().getTime();
			self.pauseTime += t - self.pauseStart;
			self.pauseStart = 0;
		}
		return self;
	};
	
	
        
    /**
     * pause
     * 
     * suspend l'animation
     * 
     * -------------------------------------------------------------------------
     */
    self.pause = function () {
		clearTimeout(self.prog);
		self.pauseStart = new Date().getTime();
		return self;
	};
	    
      
	    
    /**
     * frame
     * 
     * ex�cution d'une �tape de l'animation
     * 
     * -------------------------------------------------------------------------
     */
    self.frame = function () {
        // raccourcis
        var opt = self.options, // raccourci
			duration, ease, // raccourcis pour options.duration et options.ease
			newVal,
			st, // raccourci pour les styles de l'�l�ment � modifier
			coulTo, coulFrom, r, g, b, // pour la manipulation des couleurs
			t, animTime, // compteurs de temps
			fromProp; // raccourci pour les noms de propri�t�s de from
			
		st = elem.style;
			
		// calculs du temps �coul�
		t = new Date();
		t = t.getTime();
		animTime = t - self.startTime - (self.pauseTime||0);
		
		// callback appliqu�e � chaque frame
		if ( opt.onNewFrame ) {
			opt.onNewFrame();
		}
        
        // si anim termin�e
        if ( animTime >= opt.duration ) {
			self.to.each(function(propVal, propName){
				st[propName] = propVal.asked;
				if ( window.Css3 && css3().isset(propName) ) {
					css3(self.elem)[propName](propVal.asked);
				} 
			});
			if ( opt.onFinish) {
				opt.onFinish(); // fonction callback
			}
			self.startTime = 0;
			self.pauseTime = 0;
        }
        
        // sinon �x�cuter le frame courant
        else {
			self.to.each(function(propVal,propName){
				fromProp = self.from[propName];
				duration = opt.duration;
				ease = opt.ease;
				// gestion propri�t�s de coloration
                if (propVal.rgb) {
                    coulTo = propVal.rgb;
                    coulFrom = fromProp.rgb;
                    r = easeInOut(parseInt(coulFrom[0],10), parseInt(coulTo[0],10), duration, animTime, ease);
                    g = easeInOut(parseInt(coulFrom[1],10), parseInt(coulTo[1],10), duration, animTime, ease);
                    b = easeInOut(parseInt(coulFrom[2],10), parseInt(coulTo[2],10), duration, animTime, ease);
                    st[propName] = 'rgb('+Math.round(r)+','+Math.round(g)+','+Math.round(b)+')';
                }
				// gestion des autres types de propri�t�s
                else {
					newVal = easeInOut(fromProp.clean, propVal.clean, duration, animTime, ease);
					if (self.to[propName].unit==='px') {
						newVal = parseInt(newVal,10);
					}
					st[propName] = newVal + self.to[propName].unit;
					
					// traitement crossbrowser des propri�t�s css3
                    if ( window.Css3 && css3().isset(propName) ) {
						css3(self.elem)[propName](newVal);
					} 
				}
			});
            self.next();
        }
		
    };
	
}





/**
 * anim (sans majuscule)
 * -----------------------------------------------------------------------------
 * raccourci, retournant un objet Anim
 *
 * @param		voir Anim()
 *
 * @returns		{Anim Object}
 */
function anim(elem, defSettings){
	return new Anim(elem, defSettings);
}



/**
 * imZoom - v3.2.1, 2010-10-25
 * =============================================================================
 * charger les liens vers des images dans un diaporama
 * 
 * @uses		anim
 * @uses		addElem
 * @uses		addEvent
 * @uses		byId
 * @uses		byTN
 * @uses		getPos
 * @uses		getKeyCode
 * @uses		pageDim
 * @uses		preventDefault
 * @uses		redimArea
 * @uses		remEvent
 * @uses		setStyle
 * @uses		scrolled
 * @uses		winDim
 * @uses		Object.each
 */		
var imZoom = {  
	
	/**
	 * gal
	 * -------------------------------------------------------------------------
	 * liste de lien � traiter dans le diaporama
	 */
	gal : [], 
	
	/**
	 * defaultOpt
	 * -------------------------------------------------------------------------
	 * tableau associatif des options par d�faut
	 */
	defaultOpt : {
		screenColor : '#fff',           // couleur du fond
		screenOpacity : 0.6,            // opacit� du fond
		zIndex : 1000,					// propri�t� css zIndex appliqu�e aux �l�ments de imZoom
		anim : 1,						// indique d'encha�ner par animations ou non
		animDuration : 1000,             // dur�e des animations d'ouverture et de changement (fadeout+fadein) (en millisecondes)
		animEase : 2,                   // effet d'animation : 1=lin�aire, ease-out<1<ease-in
		//onOpen : 0,					// fonction callback, � l'ouveture (� la fin de l'animation)
		//onChange : 0,					// fonction callback, au changement d'image (� la fin de l'animation)
		//onClose : 0,					// fonction callback, � la fermeture
		showNav : 1,					// indique d'afficher ou non la barre de navigation
		showTitle : 1,					// indique d'afficher ou non le titre du lien
		prevTxt : '&lt;&lt;',			// texte pour le bouton "prev"
		nextTxt : '&gt;&gt;',			// texte pour le bouton "next"
		playTxt : 'diaporama',			// texte pour le bouton "play"
		pauseTxt : 'pause',				// texte pour le bouton "pause"
		slideDelay : 4000,				// temporisation entre deux images dans le diaporama (en millisecondes)
		//autoPlay : 0,					// indique de lancer ou non un diaporama d�s l'ouverture
		preloaderUrl : 'loading.gif',   // url de l'image indiquant un chargement en cours
		maxSize : 1                     // indique s'il on restreint l'agrandissement de l'image (� ses mesures normales)
	},
	
	/**
	 * applyTo()
	 * -------------------------------------------------------------------------
	 * applique l'effet � un �l�ment ou une liste d'�l�ments (sans v�rifier leur �ligibilit�)
	 *
	 * @param		mixed		actionners		un �lement html (ou un liste d'�l�ments html) sur lequel mettre en place l'effet
	 * @param		object		options			(facultatif) les options � appliquer pour cet (ou ces) �l�ment(s)
	 */
	applyTo : function (actionners, options) {
		if (!actionners.length) {
			actionners = [actionners];
		}
		this.gal = actionners;
		var actNb = actionners.length,
			i,
			go = function () {
				imZoom.go(this, options);
				return false;
			};
		for (i = 0; i < actNb; i++) {
			actionners[i].onclick = go;
		}
	},  
	
	/**
	 * autoApplyInto()
	 * -------------------------------------------------------------------------
	 * tente de mettre en place l'effet sur tous les liens �ligibles � l'int�rieur de la page ou d'un �l�ment donn�
	 *
	 * @param		object			options			(facultatif) les options � appliquer pour cet �l�ment
	 * @param		htmlElement		container		(facultatif) l'�lement au sein duquel on cherchera des liens �ligible pour leur appliquer l'effet. (par d�faut : document)
	 */
	autoApplyInto : function (options, container) {
		var liens = byTN('a', container),
			nbLiens = liens.length,
			i, n = 0,
			list = [];
		for (i = 0; i < nbLiens; i++) {
			if (/\.(jpe?g|gif|png|tiff?)/i.test(liens[i].href)) {
				list[n] = liens[i];
				n++;
			}
		}
		imZoom.applyTo(list, options); 
	}, 
	
	/**
	 * keyNav()
	 * -------------------------------------------------------------------------
	 * navigation au clavier
	 * ne fonctionne pas sous ie !!!
	 */
	keyNav : function (e) {
		var prevent,
			keyCode = getKeyCode(e),
			iz = imZoom;
			
			
		switch (keyCode) {
		case 37 : // gauche
			iz.prev();
			prevent = 1;
			break; 
		case 13 : // entr�e 
		case 39 : // droite
			iz.next();
			prevent = 1;
			break; 
		case 27 : // escape
			iz.close();
			prevent = 1;
			break; 
		case 32 : // espace
			if (iz.prog) {
				iz.pause();
			}
			else {
				iz.play();
			}
			prevent = 1; 
			break; 
		}
		if (prevent) {
			preventDefault(e);
		}
	}, 
	
	/**
	 * goTo()
	 * -------------------------------------------------------------------------
	 * lancer le chargement d'une des images, d�sign�e par son num�ro
	 * les num�ros trop grands renvoient � la derni�re image
	 * les num�ros trop petits renvoient � la premi�re image
	 *
	 * @param		integer			n			(facultatif) le num�ro de l'image � charger (par d�faut : la suivante)
	 */
	goTo : function (n) {
		var iz = this;
		iz.cancelLoading();
		n = n > iz.gal.length - 1 ? 0 : (n < 0 ? iz.gal.length - 1 : n); // boucler en cas de d�passement du nb d'images
		iz.active = n;
		iz.go(iz.gal[n]);
	}, 
	
	/**
	 * prev()
	 * -------------------------------------------------------------------------
	 * lancer le chargement de l'image pr�c�dente
	 */
	prev : function () {
		imZoom.goTo(imZoom.active - 1);
	}, 
	
	/**
	 * next()
	 * -------------------------------------------------------------------------
	 * lancer le chargement de l'image suivante
	 */
	next : function () {
		imZoom.goTo(imZoom.active + 1);
	}, 
	
	/**
	 * progImg()
	 * -------------------------------------------------------------------------
	 * programme le chargement d'une image
	 *
	 * @param		integer			imgNb			(facultatif) le num�ro de l'image � charger (par d�faut : la suivante)
	 */
	progImg : function (imgNb) {
		var iz = imZoom;
		imgNb = imgNb === undefined ? iz.active + 1 : imgNb;
		iz.prog = setTimeout(
			function () {
				iz.goTo(imgNb);
			},
			iz.options.slideDelay
		);
	},
	
	/**
	 * play()
	 * -------------------------------------------------------------------------
	 * lance un diaporama, � partir de l'image active
	 */
	play : function () {
		if (!imZoom.prog) {
			this.progImg();
			byId('izPlay').style.display = 'none';
			byId('izPause').style.display = '';
		}
	},
	
	/**
	 * pause()
	 * -------------------------------------------------------------------------
	 * interromp le diaporama
	 */
	pause : function () {
		clearTimeout(imZoom.prog);
		imZoom.prog = 0;
		byId('izPause').style.display = 'none';
		byId('izPlay').style.display = '';
	},
	
	/**
	 * callback()
	 * -------------------------------------------------------------------------
	 * appelle une des fonctions callback pass�es en options
	 */
	callback : function (functionName) {
		var func = imZoom.options[functionName];
		if (func && byId('izImg')) {
			func();
		}
	},
	
	/**
	 * change()
	 * -------------------------------------------------------------------------
	 * lance l'animation de changement d'image
	 */
	change : function () {
		
		var iz = imZoom,
			ani;
			
		ani = iz.options.anim;
		
		function onAppear() {
			iz.callback('onChange');
			if (iz.prog) {
				clearTimeout(iz.prog);
				iz.prog = 0;
				iz.progImg();
			}
		}
		
		function onDisappear() {
			var img = byId('izImg');
			if (img) { // une condition (pour l'anim), des fois qu'on ait ferm� imZoom entre temps
				img.onload = function () {
					setTimeout( // Google Chrome me contraint � faire un timeout
						function(){
							iz.setPos(); // pour ajuster la barre de nav � l'image
							var izTitle = byId('izTitle');
							if (izTitle && iz.options.showTitle) {
								izTitle.innerHTML = iz.gal[iz.active].title;
							}
							
							if (ani) {
								iz.animGlob.go({
									to: {opacity: 1},
									onFinish: onAppear
								});
							}
							else {
								onAppear();
							}
						},
						1
					);
					
				};
						
				// changer l'image source
				img.src = iz.gal[iz.active].href;
			}
		}
		
		if (ani) {
			iz.animGlob.go({
				to: {opacity: 0}, // disparition en fondu
				onFinish: onDisappear // puis changement d'image, et r�apparition
			});
		}
		else {
			onDisappear();
		}
		
	},
	
	/**
	 * go()
	 * -------------------------------------------------------------------------
	 * charge l'image voulue, apr�s avoir ouvert imZoom s'il ne l'�tait d�j�
	 */
	go : function (actionner, options) {
		
		var iz = this,
			i = 0, opt, // pointeurs, dans des boucles
			area, // la zone occup�e par le lien
			loading = byId('izLoading'), // image de preloader (peut valoir undefined)
			loadingArea, // zone dans laquelle centrer le preloader
			loadingPos; // position le la zone o� centrer le preloader
		
		// attention aux r�ouvertures alors qu'un pr�chargement a lieu
		if (loading) {
			iz.close();
		}
		
		// r�serv� � l'ouverture initiale :
		if (!iz.isOpen) {
			// lecture des options et mise en place des options par d�faut
			options = options || {};
			for (opt in iz.defaultOpt ) {
				if (options[opt] === undefined) {
					options[opt] = iz.defaultOpt[opt];
				}
			}
			iz.options = options; // m�morisation
			
			// relever le n� de l'image qu'on est en train d'ouvrir
			while (iz.gal[i] !== actionner && i < iz.gal.length) {
				i++;
			}
			iz.active = i;
		}
		options = iz.options;
		
		// d�terminer la surface occup�e par le lien
		area = actionner.firstChild.nodeType === 3 ? actionner : actionner.firstChild; // pas toujours pertinent, mais souvent
			
		// mise en place du preloader
		loading = addElem("img");
		loading.src = options.preloaderUrl;
		loading.id = 'izLoading';
		loadingArea = byId('izImg') || area; // selon qu'imZoom est d�j� ouvert ou non, on se r�f�re � l'actionneur ou � la gde image
		loadingPos = getPos(loadingArea);
		loading.onclick = iz.close;
		setStyle(loading, {
			position : 'absolute',
			zIndex : options.zIndex,
			top : (loadingArea.offsetHeight - loading.offsetHeight) / 2 + loadingPos.t + 'px', // centr� dans la hauteur
			left : (loadingArea.offsetWidth - loading.offsetWidth) / 2 + loadingPos.l + 'px' // centr� dans la largeur
		});
			
		// m�moriser les param�tres
		iz.actionner = actionner;
		iz.area = area;
		
		// charger l'image et m�moriser ses dimensions
		iz.loadImg();
	},
	
	
	/**
	 * loadImg()
	 * -------------------------------------------------------------------------
	 * charge une image, prend ses mesures normales, et lance son affichage
	 */
	loadImg : function () {
		
		var iz = imZoom,
			izTmp = addElem("img");
		
		// cr�ation d'une image temporaire (invisible)
		izTmp.id = 'izTmp';
		setStyle(izTmp, {
			visibility: 'hidden',
			position: 'absolute',
			top: '0px',
			left: '0px'
		});
		
		// actions sur cette image :
		izTmp.onclick = iz.close;
		
		izTmp.onload = function () {
			setTimeout(
				function(){
					// prise des mesures de l'image
					iz.imgSize = {
						w: izTmp.offsetWidth,
						h: izTmp.offsetHeight
					};
					
					// suppression de l'image temporaire et du preloader
					iz.remove('izLoading');
					
					// affichage de l'image dans imZoom
					if (!iz.isOpen) {
						iz.open();
					}
					else {
						iz.remove('izTmp');
						iz.change();
					}
				},
				1
			);
		};
		
		izTmp.src = iz.actionner.href;
	},
	
	
	/**
	 * getImgDim()
	 * -------------------------------------------------------------------------
	 * rel�ve les mesures max pour l'image courante
	 */
	getImgDim : function () {
		
		var iz = imZoom;
		
		if (iz.isOpen) {
			
			var winDims = winDim(),
				opt = iz.options,
				maxSize = opt.maxSize,
				imgSize = iz.imgSize,
				izGlob = byId('izGlob'),
				izImg = byId('izImg'),
				globMes, // mesure du conteneur global (sans l'image)
				maxSizeDims, // dimensions pour l'image
				ret; // valeur de retour : {w,h}
				
	
			// si ce n'est fait, lire la mesure du conteneur global (sans l'image)
			// j'ignore pourquoi, mais �a d�conne qd he recalcule � chaque fois
			if (!iz.globMes) {
				iz.globMes = {
					w : izGlob.offsetWidth - izImg.offsetWidth,
					h : izGlob.offsetHeight - izImg.offsetHeight
				};
			}
			globMes = iz.globMes;
	
			// calculer et retourner les dimensions pour l'image
			maxSizeDims = {
				w : winDims.w - globMes.w,
				h : winDims.h - globMes.h
			};
			
			ret = redimArea(imgSize.w, imgSize.h, {
				max_w : maxSize ? Math.min(maxSizeDims.w, imgSize.w) : maxSizeDims.w,
				max_h : maxSize ? Math.min(maxSizeDims.h, imgSize.h) : maxSizeDims.h
			});
			
			return ret;
		}
	},
	
	
	
	/**
	 * getAnimOpenMes()
	 * -------------------------------------------------------------------------
	 * retourne les mesures de d�part et de fin pour l'animation d'ouverture
	 */
	getAnimOpenMes : function () {
		var izTmp = byId('izTmp'),
			izImg = byId('izImg'),
			tmpMes, imgMes,
			px = "px"; // pour jsMin
			
		tmpMes = getPos(izTmp);
		imgMes = getPos(izImg);

		return {
			from : {
				width : izTmp.offsetWidth + px,
				height : izTmp.offsetHeight + px,
				top : tmpMes.t + px,
				left : tmpMes.l + px
			},
			to : {
				width : izImg.offsetWidth + px,
				height : izImg.offsetHeight + px,
				left : imgMes.l + px,
				top : imgMes.t + px
			}
		};
	},
	
	
	
	/**
	 * setPos()
	 * -------------------------------------------------------------------------
	 * (re)positionne les �l�ments de imZoom dans la fen�tre
	 */
	setPos : function () {
		
		var  iz = imZoom;
		
		// si on a effectivement une image d'ouverte
		if (iz.isOpen) {
			
			// raccourcis
			var izScreen = byId('izScreen'), // je ne prends pas directement le style car �a fait boguer ie
				izGlob = byId('izGlob'),
				izImg = byId('izImg'),
				scroll = scrolled(),
				winDims = winDim(),
				pageDims = pageDim(),
				imgDims = iz.getImgDim(),
				px = "px"; // pour jsMin
			
			// ajustement de l'image
			izImg.width = imgDims.w; // plus agr�able � l'oeil que height, lors de onchange, sans anim
			
			// ajustement du conteneur global
			setStyle(izGlob, {
				top : Math.round((winDims.h - izGlob.offsetHeight) / 2) + scroll.y + px,
				left : Math.round((winDims.w - izGlob.offsetWidth) / 2) + scroll.x + px
			});
			
			// modifier l'animation d'ouverture
			if (iz.animOpen && iz.animOpen.framesLeft) {
				iz.animOpen.go(iz.getAnimOpenMes());
			}
			
			// ajustement de l'�cran modal
			// (le redimensionnement de la fen�tre peut modifier les dimensions de la page)
			setStyle(izScreen, {display: 'none'});
			setStyle(izScreen, {
				width : pageDims.w + px,
				height : pageDims.h + px
			});
			setStyle(izScreen, {display: ''});
		}
	},
	
	/**
	 * remove()
	 * -------------------------------------------------------------------------
	 * s'il existe, retire du dom l'�l�ment dont l'identifiant est /id/
	 */
	remove : function (id) {
		var elem = byId(id);
		if (elem) {
			elem.parentNode.removeChild(elem);
		}
	},
	
	/**
	 * cancelLoading()
	 * -------------------------------------------------------------------------
	 * annule le chargement d'une image
	 */
	cancelLoading : function (id) {
		var izTmp = byId('izTmp');
		if (izTmp) {
			izTmp.onload = function () {};
		} // delete et izTmp.onload=0 boguent sous ie
		imZoom.remove('izLoading');
	},
	
	/**
	 * close()
	 * -------------------------------------------------------------------------
	 * ferme la imZoom
	 */
	close : function () {
		
		var iz = imZoom;
		
		iz.isOpen = 0;
		
		remEvent(document, 'keydown', iz.keyNav);
		
		// arr�ter ce qui est en cours
		if (iz.prog) {
			iz.pause();
		}
		iz.cancelLoading();
		
		// d�truire les �l�ments html
		iz.remove('izLoading');
		iz.remove('izTmp');
		iz.remove('izGlob');
		iz.remove('izScreen');
		
		// callback
		iz.callback('onClose');
	},
	
	/**
	 * open()
	 * -------------------------------------------------------------------------
	 * d�clenche l'affiche la grande image dans un calque de premier plan
	 */
	open : function () {
		
		var iz = imZoom;
		
		// si on a pas d�j� une image ouverte
		if (!iz.isOpen) {
			iz.isOpen = 1;
			
			// raccourcis et d�clarations de variables
			var pageDims = pageDim(),
				opt = iz.options,
				izGlob, // conteneur global
				izCont, // conteneur designable
				izScreen, // l'�cran modal
				izMeta, // le conteneur du titre et de la nav
				izImg, // l'image
				izTmp = byId('izTmp'),
				zero = "0px", div = "div"; // pour jsMin
			
			// cr�ation des �l�ments
				
				// un �cran modal
				izScreen = addElem(div);
				izScreen.id='izScreen';
				setStyle(izScreen, {
					position : 'absolute',
					backgroundColor : opt.screenColor,
					top : zero,
					left : zero,
					width : pageDims.w+'px',
					height : pageDims.h+'px',
					zIndex : opt.zIndex
				});
				css3(izScreen).opacity(0);
				
				// un conteneur global
				izGlob = addElem(div);
				if (opt.anim) {
					css3(izGlob).opacity(0);
				}
				setStyle(izGlob, {
					position : 'absolute',
					top : zero,
					left : zero,
					zIndex : opt.zIndex,
					textAlign : 'center'
				});
				izGlob.id='izGlob';
				
				// un conteneur designable
				izCont = addElem(div,izGlob);
				izCont.id='izCont';
				
				// une image dans le conteneur (izImg.src est donn�e plus bas)
				izImg = addElem("img",izCont);
				izImg.id='izImg';
				izImg.onload = function(){
					setTimeout( // Google Chrome me contraint � un timeout
						iz.openAnim,
						1
					);
				};
				
				// une barre de nav dans le conteneur
				izMeta = addElem(div,izCont);
				izMeta.id = 'izMeta';
				if ( !opt.showNav && !opt.showTitle ) {izMeta.style.display='none';}
				if (opt.showTitle) { izMeta.innerHTML = '<span id="izTitle">'+iz.gal[iz.active].title+'</span>'; }
				if (opt.showNav && iz.gal.length>1) {
					izMeta.innerHTML += '' +
					'<span id="izNav">' +
					' <a href="#" id="izPrev" onclick="imZoom.prev();return false;">'+opt.prevTxt+'</a>' +
					' <a href="#" id="izPlay" onclick="imZoom.play();return false;">'+opt.playTxt+'</a>' +
					' <a href="#" id="izPause" style="display:none;" onclick="imZoom.pause();return false;">'+opt.pauseTxt+'</a>' +
					' <a href="#" id="izNext" onclick="imZoom.next();return false;">'+opt.nextTxt+'</a>' +
					'</span>';
				}
					
				// actions de clics sur les diff�rents �lements
				izScreen.onclick = izGlob.onclick = iz.close;
				izCont.onclick=function (e) { // �viter qu'un clic sur la zone de design ne ferme imZoom
					e = e||event;
					if (e.stopPropagation) { e.stopPropagation(); } 
					e.cancelBubble = true;
				};
				
				// on n'indique l'url de l'image qu'au dernier moment, car son chargement d�clenche la suite
				izImg.src = iz.actionner.href;
		}
	},
	
	/**
	 * openAnim()
	 * -------------------------------------------------------------------------
	 * (non-)animation d'ouverture
	 */
	openAnim : function () {
		
		var iz = imZoom;
		
		// si on a pas d�j� une image ouverte
		if (iz.isOpen) {
			
			var	opt = iz.options,
				area = iz.area, // raccourci pour la zone de l'actionneur
				areaHeight, areaWidth, areaPos, // position/mesures de l'actionneur
				izGlob = byId("izGlob"), // conteneur global
				izMeta = byId("izMeta"), 
				izTmp = byId("izTmp"), 
				screenStyle, // styles pour l'�cran, une fois ouvert
				globStyle, // styles pour le conteneur global, une fois ouvert
				animOpenMes, // mesures from/to pour l'animation d'ouverture
				animScreen, // animation de l'�cran
				onOpen, // actions � effectuer � la fin des (non-)animations
				imgMes, // mesures de l'image
				izTmpFrom, // mesures de d�part pour l'animation d'ouverture
				rien;
				
			areaPos = getPos(area);
			areaWidth = area.offsetWidth;
			areaHeight = area.offsetHeight;
			
			// pr�partion des (non-)animations
			
				// relev� de mesures pr�alable
				if ( opt.showNav || opt.showTitle ) {
					izMeta.style.display = '';
				}
				iz.setPos();
				imgMes = getPos( byId( "izImg" ) );

				// mesures finales pour les diff�rents �l�ments
				screenStyle = { opacity : opt.screenOpacity };
				globStyle = { opacity : 1 };
				animOpenMes = iz.getAnimOpenMes();
				
				// actions � effectuer � la fin des (non-)animations
				onOpen = function () {
					if (iz.options.autoPlay) {iz.play();}
					addEvent(document, 'keydown', iz.keyNav); // keydown est le seul qui accepte "enter" et "escape" sous ie, mais il n'accepte pas le prevent default
					iz.callback('onOpen');
					iz.remove('izTmp');
				};

			// ouverture, avec animation
			if (opt.anim) {
				
				// encore quelques pr�paratifs
					
					// r�gler le fondu du conteneur global
					iz.animGlob = new Anim(izGlob, {duration: opt.animDuration / 2, ease: opt.animEase});
					
					// faire en sorte que l'image ne soit pas d�form�e (surtout en cas de liens textuels)
					izTmpFrom = redimArea(izTmp.offsetWidth, izTmp.offsetHeight, {
						max_w : areaWidth,
						max_h : areaHeight
					});
					
					// faire en sorte que l'image soit centr�e dans son actionneur
					izTmpFrom.l = (areaWidth - izTmpFrom.w) / 2 + areaPos.l;
					izTmpFrom.t = (areaHeight - izTmpFrom.h) / 2 + areaPos.t;
				
				// et on y va !
				
					// affichage de l'�cran modal
					animScreen = new Anim(byId("izScreen"), {to:screenStyle,from:{opacity:0},duration:opt.animDuration,ease:opt.animEase}).go();
					
					// effet de zoom sur l'image (suivi de l'apparition du conteneur global, en fondu)
					iz.animOpen = new Anim(izTmp, {
						duration : opt.animDuration,
						ease : opt.animEase,
						from : {
							width : izTmpFrom.w+'px',
							height : izTmpFrom.h+'px',
							top : izTmpFrom.t+'px', // pour faire l'�conomie du centrage : "top : areaPos.t+'px',"
							left : izTmpFrom.l+'px' // pour faire l'�conomie du centrage : "left : areaPos.l+'px'"
						},
						to : animOpenMes.to,
						onStart : function () {
							// r�afficher izTmp avant de l'animer
							izTmp.style.zIndex=opt.zIndex+1;
							setTimeout(function () {izTmp.style.visibility='';},50);
						},
						onFinish : function () {
							iz.setPos();
							iz.animGlob.go({
								from : { opacity : 0 },
								to : globStyle,
								onFinish : onOpen
							});
						}
					}).go();
			}
			
			// ouverture, sans animation
			else {
				setStyle(byId("izScreen"), screenStyle);
				setStyle(izTmp, animOpenMes.to);
				setStyle(izGlob, globStyle);
				onOpen();
			}
			
		}
	}
};


// en cas de scroll ou redimentionnement de la fen�tre, repositionner l'agrandissement
addEvent(window, 'resize', imZoom.setPos);
addEvent(window, 'scroll', imZoom.setPos);

return imZoom;

})(window,document);