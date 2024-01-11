var version='2.12';
var cMaxPr5=5;
var datum = location.search;
var fehler='';
var artemail=0;

var scschwerpunkt=-1;
var scfach=new Array(cMaxFachzeile);

var scstunden=new Array(3);
scstunden[0]=new Array(cMaxFachzeile);
scstunden[1]=new Array(cMaxFachzeile);
scstunden[2]=new Array(cMaxFachzeile);
var scfachart=new Array(cMaxFachzeile);
var scbelegung=new Array(3);
scbelegung[0]=new Array(cMaxFachzeile);
scbelegung[1]=new Array(cMaxFachzeile);
scbelegung[2]=new Array(cMaxFachzeile);

function FormularFuellen() {
  var obj = document.getElementById('legendtitle');
  var stitel='Indiware Sch&uuml;lerfachwahl '+version;
  if (confBundesland=="Bw") {
    obj.innerHTML=stitel+' (Baden-W&uuml;rttemberg)';
    document.getElementById('zeileprofil').style.display="none";
    }
  if (confBundesland=="Ni") {
    obj.innerHTML=stitel+' (Niedersachsen)';
    }
  if (confBundesland=="Sn") {
    obj.innerHTML=stitel+' (Sachsen)';
    document.getElementById('zeileprofil').style.display="none";
    }
  if (confBundesland=="Th") {
    obj.innerHTML=stitel+' (Th&uuml;ringen)';
    document.getElementById('zeileprofil').style.display="none";
    }
  if (confBundesland=="Mv") {
    obj.innerHTML=stitel+' (Mecklenburg-Vorpommern)';
    document.getElementById('zeileprofil').style.display="none";
    }
  if (confBundesland=="St") {
    obj.innerHTML=stitel+' (Sachsen-Anhalt)';
    document.getElementById('zeileprofil').style.display="none";
    }
    
  if (document.location.hostname=='') {
    document.getElementById('buttonspeichern').style.display="none";
    document.getElementById('divemail').style.display="none";
    }

  if (document.location.hostname=='localhost') {
    document.getElementById('divemail').style.display="none";
    }

  if (confEmail=="")
    document.getElementById('divemail').style.display="none";
  if (confButtonSpeichern==0)  
    document.getElementById('buttonspeichern').style.display="none";
  if (confButtonEmail==0)  
    document.getElementById('divemail').style.display="none";

  var obj = document.getElementById('nachname');
  obj.onchange=function() {DatenPruefen();};
  var obj = document.getElementById('vorname');
  obj.onchange=function() {DatenPruefen();};

  KlassenFuellen();
  ProfileFuellen();
  BereichFaecherFuellen();
  MitteilungenFuellen();

  BereichFaecherAktualisieren();
  BereichStundenAktualisieren();
  DatenPruefen();
  }
   
function KlassenFuellen() {
  var obj = document.getElementById('klasse');
  obj.onchange=function() {DatenPruefen();};
  s=obj.options[obj.selectedIndex].value;
  s='';
  obj.options[0].text=s;
  for (var i = 1; i <= klassen.length; ++i) {
    s=klassen[i-1];
    var option = new Option(s,i);
    obj.options[i] = option;
    }
  }

function ProfileFuellen() {
  var obj = document.getElementById('profil');
  s=obj.options[obj.selectedIndex].value;
  var anz=0;
  for (var i = 1; i <= schwerpunkte.length; ++i) {
    s=schwerpunkte[i-1];
    if (s=="")
      continue;
    anz++;  
    var option = new Option(s,anz);
    obj.options[anz] = option;
    }
  }

function MitteilungenFuellen() {
  var obj = document.getElementById('mitteilungen');
  var s='';
  var l=mitteilungen.length;
  if (l==1)
    if (mitteilungen[0]=='') {
      document.getElementById('pmitteilungen').style.display="none";
      obj.style.display="none";
      return;
      }
      
  for (var i = 1; i <= l; ++i) {
    if (s!='')
      s+='\r\n';
    s+=mitteilungen[i-1];
    }

  obj.value=s;
  if (l>10)
    l=10;
  if (l<2)
    l=2;
  obj.rows=l;
  }

function BereichFaecherFuellen() {
  var anzlk=0;
  var anzpr=0;
  if (confBundesland=="St") {
    anzlk=2;
    anzpr=6;
    }  
  objdivbereich=document.getElementById("bereich_faecher");
  for (var i = 1; i <= cMaxFachzeile; ++i) {
    var objdiv=document.createElement("div");
    objdiv.className='divzeile';

    obj=document.createElement("label");
    obj.className='labellinks';
    
    var s='Fach '+i+':';
    if (confBundesland=="Bw") {
      if (i<=5)
        s='P-Fach '+i+'*:';
      if (i<=3)
        s='L-Fach '+i+':';
      }  
    if (confBundesland=="Mv") {
      if (i<=2)
        s='L-Fach '+i+':';
      }  
    if (confBundesland=="Ni") {
      if (i<=5)
        s='P-Fach '+i+':';
      }  
    if (confBundesland=="Sn") {
      if (i<=2)
        s='LF '+i+':'
      else  
        s='GF '+(i-2)+':'
      if (i==7)
        s='GF5: (GRW)';
      if (i==8)
        s='GF6: (GEO)';
      if (i==9)
        s='GF7: (BIO)';
      }  
    if (confBundesland=="Th") {
      s='Band '+i+':';
      }  
    obj.innerHTML=s;
    objdiv.appendChild(obj);

    obj=document.createElement("select");
    obj.className='selectfach';
    if (i<=anzpr)
      obj.style.backgroundColor="#e1f0ff";
    if (i<=anzlk)
      obj.style.backgroundColor="#fff0f0";
    obj.id='selectfach'+i;
    obj.onchange=function() {BereichStundenAktualisieren();DatenPruefen();};
    objdiv.appendChild(obj);
    
    var objdivcheck=document.createElement("div");
    objdivcheck.className='divcheck';
    for (var sj=1;sj<=2;++sj) {
      obj=document.createElement("input");
      obj.className='inputbox';
      obj.type='checkbox';
      obj.id='inputbox'+sj+i;
      obj.title='Belegung im '+sj+'. Schuljahr';
      obj.checked='checked';
      if (confBundesland=="Mv") {
        if (i<=6)
          obj.style.display="none";
        }
      if (confBundesland=="Bw") {
        if (i<=5)
          obj.style.display="none";
        }
      if (confBundesland=="Ni") {
        if (i<=5)
          obj.style.display="none";
        }
      if (confBundesland=="Sn") {
        if (i<=2)
          obj.style.display="none";
        }
      if (confBundesland=="Th") {
        obj.style.display="none";
        }
      if (confBundesland=="St") {
        if (i<=6)
          obj.style.display="none";
        }
      obj.onchange=function() {BereichStundenAktualisieren();DatenPruefen();};
      objdivcheck.appendChild(obj);
      }
    objdiv.appendChild(objdivcheck);

    var objdivstunden=document.createElement("div");
    objdivstunden.className='divstunden';
    for (var sj=1;sj<=2;++sj) {
      obj=document.createElement("label");
      obj.className='labelstunden';
      obj.id='labelstunden'+sj+i;
      obj.innerHTML='';
      obj.title='Stunden im '+sj+'. Schuljahr';
      objdivstunden.appendChild(obj);
      if (sj==2) 
        if (confBundesland=="Th") {
          obj.style.display="none";
          }
      }
    objdiv.appendChild(objdivstunden);
      
    objdivbereich.appendChild(objdiv);
    }

  objdiv=document.createElement("div");
  objdiv.className='divzeile';
  objdivbereich.appendChild(objdiv);
  obj=document.createElement("label");
  obj.id='labelseminarfach';
  obj.innerHTML='Seminarfach';
  objdiv.appendChild(obj);
  obj=document.createElement("label");
  obj.id='labelseminarfachst';
  obj.title='Stunden Seminarfach';
  obj.innerHTML='1.5';
  objdiv.appendChild(obj);
  if (confBundesland!="Th") {
    objdiv.style.display="none";
    }

  objdiv=document.createElement("div");
  objdiv.className='divzeile';
  objdivbereich.appendChild(objdiv);
  obj=document.createElement("label");
  obj.id='labelprhinweis';
  obj.innerHTML='(* Die m&uuml;ndlichen Pr&uuml;fungsf&auml;cher werden erst nach dem 3. Hj. verbindlich gew&auml;hlt.)';
  objdiv.appendChild(obj);
  if (confBundesland!="Bw") {
    objdiv.style.display="none";
    }

  objdiv=document.createElement("div");
  objdiv.className='divzeile';

  objdivstunden=document.createElement("div");
  objdivstunden.className='divstundengesamt';
  for (var sj=1;sj<=2;++sj) {
    obj=document.createElement("label");
    obj.className='labelstundengesamt';
    obj.id='labelstundengesamt'+sj;
    obj.innerHTML='';
    obj.title='Stundensumme im '+sj+'. Schuljahr';
    objdivstunden.appendChild(obj);
    if (sj==2) 
      if (confBundesland=="Th") {
        obj.style.display="none";
        }
    }
  objdiv.appendChild(objdivstunden);
  objdivbereich.appendChild(objdiv);
  }
   
function BereichFaecherAktualisieren() {
  var obj=document.getElementById('profil');
  var s=obj.options[obj.selectedIndex].text;
  var sp=schwerpunkte.indexOf(s)+1;
  if (sp<0) {
    sp=1;
    }
  if (confBundesland=="Bw") {
    sp=1;
    }
  if (confBundesland=="Sn") {
    sp=1;
    }
  if (confBundesland=="Th") {
    sp=1;
    }
  if (confBundesland=="Mv") {
    sp=1;
    }
  if (confBundesland=="St") {
    sp=1;
    }
  for (var zeile = 1; zeile <= fachangebot[sp].length-1; zeile++) {
    obj=document.getElementById('selectfach'+zeile);
    var merkfach='';
    if (obj.selectedIndex>-1) {
      merkfach=obj.options[obj.selectedIndex].text;
      }
    if (fachvor[sp][zeile]!='') {
      merkfach=FachLangform(fachvor[sp][zeile]);
      }
      
    obj.length=0;
    for (var i = 1; i <= fachangebot[sp][zeile].length; ++i) {
      var kurz=fachangebot[sp][zeile][i-1];
      var lang=FachLangform(kurz);
      var option = new Option(lang,i);
      obj.options[i] = option;
      if (lang==merkfach) {
        obj.selectedIndex=i;
        }
      }
    }
  }

function BereichStundenAktualisieren() {
  var sp=schwerpunkte.indexOf(s)+1;
  if (sp<0) {
    sp=1;
    }
  var sum1=0;  
  var sum2=0;  
  if (confBundesland=="Th") {
    sum1=1.5;
    }
  for (var zeile = 1; zeile <= fachangebot[sp].length-1; zeile++) {
    var obj=document.getElementById('selectfach'+zeile);
    var sfa='';
    var fa=-1;
    if (obj.selectedIndex>-1) {
      sfa=obj.options[obj.selectedIndex].text;
      sfa=FachLangformZuKurzform(sfa);
      fa=IndexFach(sfa);
      }
   
    var st1=FachStunden(sfa,zeile,1);
    var st2=FachStunden(sfa,zeile,2);
    var s='';
    if (fa>-1) {
      s=st1;
      obj=document.getElementById('inputbox1'+zeile);
      if (obj.checked==false) {
        s='-';
        }
      else
        sum1+=st1;  
      }
    obj=document.getElementById('labelstunden1'+zeile);
    obj.innerHTML=s;

    s='';
    if (fa>-1) {
      s=st2;
      obj=document.getElementById('inputbox2'+zeile);
      if (obj.checked==false) {
        s='-';
        }
      else
        sum2+=st2;  
      }
    obj=document.getElementById('labelstunden2'+zeile);
    obj.innerHTML=s;
    }
  obj=document.getElementById('labelstundengesamt1');
  obj.innerHTML=sum1;
  obj=document.getElementById('labelstundengesamt2');
  obj.innerHTML=sum2;
  
  }

function FormularInUebergabe() {
  var s='';
  
  var obj = document.getElementById('klasse');
  var skl=obj.options[obj.selectedIndex].text;

  var sprofil="";
  if (confBundesland=="Ni") {
    obj=document.getElementById('profil');
    sprofil=obj.options[obj.selectedIndex].text;
    }

  s='[Schueler]'+'\r\n';
  s+='nachname='+document.getElementById('nachname').value+'\r\n';
  s+='vorname='+document.getElementById('vorname').value+'\r\n';
  s+='klasse='+skl+'\r\n';
  s+='profil='+sprofil+'\r\n';
  var anz=0;
  for (var i=1; i<=cMaxFachzeile ; i++) {
    var obj=document.getElementById('selectfach'+i);
    var sfa='';
    var fa=-1;
    anz++;
    if (obj.selectedIndex>-1) {
      sfa=FachKurzform(scfach[i-1]);
      }
    s+='fach'+(anz)+'='+sfa+'\r\n';  
    s+='beleg1'+(anz)+'='+scbelegung[1][i-1]+'\r\n';
    s+='beleg2'+(anz)+'='+scbelegung[2][i-1]+'\r\n';
    }
  var date=new Date();
  
  s+='Zeit='+date.getDate()+'.'+(date.getMonth()+1)+'.'+date.getFullYear();
  s+=' '+date.getHours()+':'+(date.getMinutes()<10?'0':'')+date.getMinutes()+'\r\n';
  
  var ul=document.getElementById('ulpruefen');
  var li = ul.getElementsByTagName('li');
  s+='[Meldungen]'+'\r\n';
  for (var i = 0; i < li.length; i++) {
    s+=li[i].firstChild.data+'\r\n';
    }
   
  document.getElementById('inputklasse').value=skl;
  obj=document.getElementById('fachwahl');
  obj.value=s;
  }

function SchwerpunktWechsel() {
  BereichFaecherAktualisieren();
  BereichStundenAktualisieren();
  DatenPruefen();
  }

function FachKurzform(fa) {
  if (fa<0)
    return "";
  return faecher[fa][0];
  }

function IndexFach(sfa) {
  var fa=-1;
  for (var i=0; i <= faecher.length-1; i++) {
    if (faecher[i][0]==sfa) {
      fa=i;
      }
    }
  return fa;
  }
  
function FachLangformZuKurzform(lang) {
  var kurz='';
  if (lang=="")
    return kurz;
  for (var i=0; i <= faecher.length-1; i++) {
    if (FachLangform(faecher[i][0])==lang) {
      kurz=faecher[i][0];
      }
    }
  return kurz;
  }
  
function FachLangform(kurz) {
  var lang='';
  for (var i=0; i <= faecher.length-1; i++) {
    if (faecher[i][0]==kurz) {
      lang=kurz;
      if (faecher[i][1]!='')
        lang+=' - '+faecher[i][1];
      }
    }
  return lang;
  }
  
function FachStunden(sfa,zeile,asj) {
  var st=0;
  var anzlk=3;
  if (confBundesland=="Mv") {
    anzlk=2;
    }
  if (confBundesland=="St") {
    anzlk=2;
    }
  if (confBundesland=="Th") {
    anzlk=4;
    }
  for (var i=0; i <= faecher.length-1; i++) {
    if (faecher[i][0]==sfa) {
      if (zeile<=anzlk)
        st=faecher[i][3]
      else  
        st=faecher[i][4];
      if (confBundesland=="Sn") {
        if (zeile<=2)
          st=faecher[i][3]
        else  
          st=faecher[i][4];
        }
      if (confBundesland=="Ni") {
        if (faecher[i][2]==cNiFachartSF) 
          if (st==2)
            if (asj==2)
              st=1;
        }
      if (confBundesland=="Bw") {
        if (faecher[i][2]==cBwFachartGK) 
          if (st==2)
            st=1;
        if (faecher[i][2]==cBwFachartGEO) 
          if (st==2)
            st=1;
        }
      }
    }
  return st;
  }

function FachArt(sfa) {
  var art=0;
  for (var i=0; i <= faecher.length-1; i++) {
    if (faecher[i][0]==sfa) {
      art=faecher[i][2];
      }
    }
  return art;
  }

function FormularInSchueler() {
  scschwerpunkt=-1;
  for (var i=0; i <cMaxFachzeile ; i++) {
    scfach[i]=-1;
    scstunden[0][i]=0;
    scstunden[1][i]=0;
    scstunden[2][i]=0;
    scfachart[i]=0;
    scbelegung[0][i]=0;
    scbelegung[1][i]=0;
    scbelegung[2][i]=0;
    }

  scschwerpunkt=1;
  if (confBundesland=="Ni") {
    var obj=document.getElementById('profil');
    var s=obj.options[obj.selectedIndex].text;
    scschwerpunkt=schwerpunkte.indexOf(s)+1;
    }
  for (var i=1; i<=cMaxFachzeile ; i++) {
    var obj=document.getElementById('selectfach'+i);
    var sfa='';
    var fa=-1;
    if (obj.selectedIndex>-1) {
      sfa=obj.options[obj.selectedIndex].text;
      sfa=FachLangformZuKurzform(sfa);
      fa=IndexFach(sfa);
      }
    if (fa>-1) {
      scfach[i-1]=fa;
      scstunden[0][i-1]=FachStunden(sfa,i,1);
      scstunden[1][i-1]=FachStunden(sfa,i,1);
      scstunden[2][i-1]=FachStunden(sfa,i,2);
      scfachart[i-1]=FachArt(sfa);

      obj=document.getElementById('inputbox1'+i);
      if (obj.checked==true) {
        scbelegung[1][i-1]=1;
        }
      obj=document.getElementById('inputbox2'+i);
      if (obj.checked==true) {
        scbelegung[2][i-1]=1;
        }
      scbelegung[0][i-1]=scbelegung[1][i-1]+scbelegung[2][i-1]*2;
      }
    }
  }

function FormularLeeren() {
  window.location.reload();
  document.getElementById('nachname').value="";
  document.getElementById('vorname').value="";
  }
  
function ButtonSpeichernClick() {
  artemail=0;
  }

function ButtonEmailClick() {
  artemail=1;
  }

function PruefenVorSpeichern() {
  DatenPruefen();
  if (document.getElementById('nachname').value=="") {
    alert('Kein Nachname eingetragen.');
    return(false);
    }
  if (document.getElementById('vorname').value=="") {
    alert('Kein Vorname eingetragen.');
    return(false);
    }
  if (confBundesland=="Ni") {
    if (obj=document.getElementById('profil').selectedIndex<1) {
      alert('Kein Schwerpunkt eingetragen.');
      return(false);
      }
    }
    
  if (artemail==1) {
    if (document.getElementById('inputemail').value=="") {
      alert('Keine E-Mail-Adresse eingetragen.');
      return(false);
      }
    if (document.getElementById('inputemail').value!=confEmail) {
      alert('E-Mail-Adressse wurde nicht freigeschaltet.');
      return(false);
      }
    }
  
  if (confirm("Daten werden gespeichert.")!=true)
    return(false);
  
  
  FormularInUebergabe();

  if (artemail==1) {
    document.getElementById('form').action="email.php"
    document.getElementById('form').target="_blank"
    artemail=0; //zur Sicherheit 
    }
  else {
    document.getElementById('form').action="speichern.php"
    document.getElementById('form').target="_blank"
    }
  
  return(true);
  }

function DatenPruefen() {
  fehler='';
  FormularInSchueler();

  var obj=document.getElementById('nachname');
  if (obj.value=="") {
    fehler+='<li>Kein Nachname eingetragen.</li>';
    }
  var obj=document.getElementById('vorname');
  if (obj.value=="") {
    fehler+='<li>Kein Vorname eingetragen.</li>';
    }
  var obj=document.getElementById('klasse');
  if (obj.value=="") {
    fehler+='<li>Keine Klasse eingetragen.</li>';
    }

  if (confBundesland=="Bw") {
    DatenPruefenBw();
    }

  if (confBundesland=="Ni") {
    DatenPruefenNi();
    }

  if (confBundesland=="Sn") {
    DatenPruefenSn();
    }

  if (confBundesland=="Th") {
    DatenPruefenTh();
    }
    
  if (confBundesland=="Mv") {
    DatenPruefenMv();
    }

  if (confBundesland=="St") {
    DatenPruefenSt();
    }
    
  if (fehler=='') {
    fehler='<ul id="ulpruefen"></ul>'+'Keine Fehler gefunden.';
    }
  else {
    fehler='<ul id="ulpruefen">'+fehler+'</ul>'
    }
  var obj=document.getElementById('fehlermeldung');
  obj.innerHTML=fehler;
  }