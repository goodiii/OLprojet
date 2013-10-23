bgcolor='#000000';
bgcolor2='#7B7B7B';
document.write('<style type="text/css">');
document.write('.popper { POSITION: absolute; VISIBILITY: hidden; z-index:3; }')
document.write('#topgauche { position:absolute;  z-index:10; }')
document.write('A:hover.ejsmenu {color:#000000; text-decoration:none;}')
document.write('A.ejsmenu {color:#000000; text-decoration:none;}')
document.write('</style>')
document.write('<div style="position:relative;height:25"><DIV class=popper id=topdeck></DIV>');
/*
SCRIPT EDITE SUR L'EDITEUR JAVACSRIPT
http://www.editeurjavascript.com
*/

/*
LIENS
*/
zlien = new Array;
var nava = (document.layers);
var dom = (document.getElementById);
var iex = (document.all);
if (nava) { skn = document.topdeck }
else if (dom) { skn = document.getElementById("topdeck").style }
else if (iex) { skn = topdeck.style }
skn.top = 24;

function pop(msg,pos)
{
skn.visibility = "hidden";
a=true
skn.left = pos;
var content ="<TABLE BORDER=0 CELLPADDING=0 CELLSPACING=0 BGCOLOR=#000000 WIDTH=150><TR><TD><TABLE WIDTH=100% BORDER=0 CELLPADDING=0 CELLSPACING=1>";
pass = 0
while (pass < msg.length)
	{
	content += "<TR><TD BGCOLOR="+bgcolor+" onMouseOver=\"this.style.background='"+bgcolor2+"'\" onMouseOut=\"this.style.background='"+bgcolor+"'\" HEIGHT=20><FONT SIZE=1 FACE=\"Verdana\">&nbsp;&nbsp;"+msg[pass]+"</FONT></TD></TR>";
	pass++;
	}
content += "</TABLE></TD></TR></TABLE>";
if (nava)
  {
    skn.document.write(content);
	  skn.document.close();
	  skn.visibility = "visible";
  }
    else if (dom)
  {
	  document.getElementById("topdeck").innerHTML = content;
	  skn.visibility = "visible";
  }
    else if (iex)
  {
	  document.all("topdeck").innerHTML = content;
	  skn.visibility = "visible";
  }
}
function kill()
{
	skn.visibility = "hidden";
}
document.onclick = kill;
document.write('<DIV ID=topgauche><TABLE BORDER=5 CELLPADDING=10 CELLSPACING=10 BGCOLOR=#ffffff WIDTH=200><TR><TD><TABLE CELLPADING=0 CELLSPACING=1 BORDER=0 WIDTH=100% HEIGHT=25><TR>')
document.write('</TR></TABLE></TD></TR></TABLE></DIV></div>')