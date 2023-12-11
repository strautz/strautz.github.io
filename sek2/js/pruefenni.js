var cNiSchwerpunktSpr=1;
var cNiSchwerpunktMus=2;
var cNiSchwerpunktGes=3;
var cNiSchwerpunktNat=4;
var cNiSchwerpunktSpo=5;

var cNiFachartDE=1;
var cNiFachartFSF=2;
var cNiFachartFSN=3;
var cNiFachartKU=4;
var cNiFachartMU=5;
var cNiFachartDS=6;
var cNiFachartPO=7;
var cNiFachartGE=8;
var cNiFachartEK=9;
var cNiFachartRK=10;
var cNiFachartPL=11;
var cNiFachartPA=12;
var cNiFachartPS=13;
var cNiFachartWI=14;
var cNiFachartREL=15;
var cNiFachartWN=16;
var cNiFachartMA=17;
var cNiFachartPH=18;
var cNiFachartCH=19;
var cNiFachartBI=20;
var cNiFachartIF=21;
var cNiFachartEL=22;
var cNiFachartSP=23;
var cNiFachartSPT=24; //Sporttheorie
var cNiFachartSF=25;  //Seminarfach
var cNiFachartAG=26;  //Arbeitsgemeinschaft
var cNiFachartWeitere=27;//Ohne Zuordnung
var cNiFachartMax=27;//Ohne Zuordnung

var cNiFachmengeNat=[cNiFachartPH,cNiFachartCH,cNiFachartBI];
var cNiFachmengeNatIf=[cNiFachartPH,cNiFachartCH,cNiFachartBI,cNiFachartIF];
var cNiFachmengeFS=[cNiFachartFSF,cNiFachartFSN];
var cNiFachmengeKuMuDs=[cNiFachartKU,cNiFachartMU,cNiFachartDS];
var cNiFachmengeRel=[cNiFachartREL,cNiFachartPL,cNiFachartWN];

var cNiFachmengeAfSpr=[cNiFachartDE,cNiFachartFSF,cNiFachartFSN,cNiFachartKU,cNiFachartMU,cNiFachartDS];
var cNiFachmengeAfGes=[cNiFachartPO,cNiFachartGE,cNiFachartEK,cNiFachartRK,cNiFachartPL,cNiFachartPA,cNiFachartPS,
cNiFachartWI,cNiFachartREL,cNiFachartPL,cNiFachartWN];
var cNiFachmengeAfNat=[cNiFachartMA,cNiFachartPH,cNiFachartCH,cNiFachartBI,cNiFachartIF,cNiFachartEL];

function SchuelerStundenzahlSj(asj) {
  var anz=0;
  for (var i=0; i<cMaxFachzeile ; i++) {
    if (scbelegung[asj][i]==0)
      continue;
    anz+=scstunden[asj][i];
    }
  return anz;
  }

function AnzahlFachartInPruefung(menge) {
  var anz=0;
  for (var i=0; i<cMaxPr5 ; i++) {
    if (scfachart[i]>0) {
      if (menge.indexOf(scfachart[i])>-1)
        anz++;
      }
    }
  return anz;
  }

function AnzahlFachartInPruefungP13(menge) {
  var anz=0;
  for (var i=0; i<3 ; i++) {
    if (scfachart[i]>0) {
      if (menge.indexOf(scfachart[i])>-1)
        anz++;
      }
    }
  return anz;
  }

function AnzahlFachartInFachwahl(menge,astmin,asj) {
  var anz=0;
  for (var i=0; i<cMaxFachzeile ; i++) {
    if (scfachart[i]>0) {
      if (menge.indexOf(scfachart[i])==-1)
        continue;
      if (scstunden[asj][i]<astmin)
        continue;
      if (scbelegung[1][i]==0)
        if (asj!=2)
          continue;
      if (scbelegung[2][i]==0)
        if (asj!=1)
          continue;
      anz++;
      }
    }
  return anz;
  }

function SchuelerMindestEinbringung() {
  var cEinDe=1;
  var cEinMa=2;
  var cEinFs=3;
  var cEinKuMuDs=4;
  var cEinGe=5;
  var cEinPo=6;
  var cEinRel=7;
  var cEinNat=8;
  var cEinNat2=9;
  var cEinFsNeu=10;
  var cEinFs2=11;
  var cEinFsNat=12;
  var cEinSF=13;
  var cEinKuMuDs2=14;

  var sum=20;

  if (scfach[0]<0)
    return sum;  
  if (scfach[1]<0)
    return sum;  
  if (scfach[2]<0)
    return sum;  
  if (scfach[3]<0)
    return sum;  
  if (scfach[4]<0)
    return sum;  

  var cEinMax=14;
  for (var i=1; i<=cEinMax ; i++) {
    var minart=1;
    var emin=2;
    if (i==cEinDe) {
      menge=[cNiFachartDE];
      emin=4;
      if (AnzahlFachartInPruefung(menge)>=minart) 
        continue;
      }
    if (i==cEinMa) {
      menge=[cNiFachartMA];
      emin=4;
      if (AnzahlFachartInPruefung(menge)>=minart) 
        continue;
      }
    if (i==cEinFs) {
      menge=cNiFachmengeFS;
      emin=4;
      if (AnzahlFachartInPruefung(menge)>=minart) 
        continue;
      }
    if (i==cEinKuMuDs) {
      menge=cNiFachmengeKuMuDs;
      if (AnzahlFachartInPruefung(menge)>=minart) 
        continue;
      }
    if (i==cEinGe) {
      menge=[cNiFachartGE];
      if (AnzahlFachartInPruefung(menge)>=minart) 
        continue;
      }
    if (i==cEinPo) {
      if (scschwerpunkt==cNiSchwerpunktGes) 
        if (AnzahlFachartInPruefung([cNiFachartWI,cNiFachartEK])>=1) 
          continue;
      menge=[cNiFachartPO];
      if (AnzahlFachartInPruefung(menge)>=minart) 
        continue;
      }
    if (i==cEinRel) {
      menge=cNiFachmengeRel;
      if (AnzahlFachartInPruefung(menge)>=minart) 
        continue;
      }
    if (i==cEinNat) {
      menge=cNiFachmengeNat;
      if (scschwerpunkt==cNiSchwerpunktNat) 
        menge=cNiFachmengeNatIf;
      emin=4;
      if (AnzahlFachartInPruefung(menge)>=minart) 
        continue;
      }
    if (i==cEinNat2) {
      if (scschwerpunkt!=cNiSchwerpunktNat) 
        continue;
      menge=cNiFachmengeNatIf;
      minart=2;
      emin=4;
      if (AnzahlFachartInPruefung(menge)>=minart) 
        continue;
      }
    if (i==cEinFsNeu) {
      menge=cNiFachmengeFS;
      continue;
      }
    if (i==cEinFs2) {
      if (scschwerpunkt!=cNiSchwerpunktSpr) 
        continue;
      menge=cNiFachmengeFS;
      emin=4;
      minart=2;
      if (AnzahlFachartInPruefung(menge)>=minart) 
        continue;
      }
    if (i==cEinFsNat) {
      if (scschwerpunkt!=cNiSchwerpunktGes) 
        if (scschwerpunkt!=cNiSchwerpunktSpo) 
          continue;
      menge=cNiFachmengeFS;
      menge=menge.concat(cNiFachmengeNatIf);
      minart=3;
      if (AnzahlFachartInPruefung(menge)>=minart) 
        continue;
      }
    if (i==cEinSF) {
      menge=[cNiFachartSF];
      }
    if (i==cEinKuMuDs2) {
      if (scschwerpunkt!=cNiSchwerpunktMus) 
        continue;
      menge=cNiFachmengeKuMuDs;
      minart=2;
      if (AnzahlFachartInPruefung(menge)>=minart) 
        continue;
      }
    sum+=emin;
    }
  return sum;  
  }

function DatenPruefenNi() {
  if (scschwerpunkt<1) {
    fehler+='<li>Kein Schwerpunkt eingetragen.</li>';
    return;
    }

  var menge=[];

  //Fach in keinem Sj belegt
  for (var i=0; i<cMaxFachzeile ; i++) {
    if (scfach[i]>-1)
      if (scbelegung[1][i]==0)
        if (scbelegung[2][i]==0)
          fehler+='<li>Fach '+faecher[scfach[i]][0]+' wurde ausgewählt, aber in keinem Schuljahr belegt.</li>';
    }

  //Fach mehrfach belegt  
  for (var i=0; i<cMaxFachzeile ; i++) {
    for (var j=i+1; j<cMaxFachzeile ; j++) {
      if (scfach[i]>-1)
        if (scfach[i]==scfach[j]) {
          fehler+='<li>Fach '+faecher[scfach[i]][0]+' mehrfach belegt.</li>';
          break;
          }
      }
    }

  //Fachart mehrfach belegt  
  menge=[cNiFachartFSF,cNiFachartFSN,cNiFachartAG,cNiFachartWeitere];
  for (var i=0; i<cMaxFachzeile ; i++) {
    if (scfachart[i]<1)
      continue;
    if (menge.indexOf(scfachart[i])>-1)  
      continue;
    for (var j=i+1; j<cMaxFachzeile ; j++) {
      if (scfach[i]==scfach[j]) 
        continue;
      if (scfachart[i]==scfachart[j]) {
        fehler+='<li>F&auml;cher '+faecher[scfach[i]][0]+' und '+faecher[scfach[j]][0]+' mit derselben Fachart.</li>';
        break;
        }
      }
    }

  //nur im 1. Sj angeboten
  var sfa='';
  for (var i=5; i<cMaxFachzeile ; i++) {
    if (scfach[i]<0)
      continue;
    sfa=faecher[scfach[i]][0];
    if (scbelegung[2][i]!=0)
      if (FachNurSj[scschwerpunkt][0].indexOf(sfa)>-1)
        fehler+='<li>Fach '+sfa+' darf nur im 1. Schuljahr belegt werden.</li>';
    if (scbelegung[1][i]!=0)
      if (FachNurSj[scschwerpunkt][1].indexOf(sfa)>-1)
        fehler+='<li>Fach '+sfa+' darf nur im 2. Schuljahr belegt werden.</li>';
    if (scbelegung[1][i]!=0)
      if (scbelegung[2][i]!=0)
        if (FachNurSj[scschwerpunkt][2].indexOf(sfa)>-1)
          fehler+='<li>Fach '+sfa+' darf nur in einem Schuljahr belegt werden.</li>';
    if (scbelegung[1][i]!=0)
      if (scbelegung[2][i]==0)
        if (FachNurSj[scschwerpunkt][3].indexOf(sfa)>-1)
          fehler+='<li>Fach '+sfa+' darf nicht nur im 1. Schuljahr belegt werden.</li>';
    if (scbelegung[1][i]==0)
      if (scbelegung[2][i]!=0)
        if (FachNurSj[scschwerpunkt][4].indexOf(sfa)>-1)
          fehler+='<li>Fach '+sfa+' darf nicht nur im 2. Schuljahr belegt werden.</li>';
    }

  //Prüfungsfach nicht belegt  
  for (var i=1; i<=cMaxPr5 ; i++) {
    if (scfach[i-1]==-1)
      fehler+='<li>Prüfungsfach '+i+' nicht belegt.</li>';
    }

  //Prüfungsfach P1-P3 unzulässig
  for (var i=1; i<=3 ; i++) {
    if (scfachart[i-1]==cNiFachartFSN)
      fehler+='<li>Prüfungsfach '+i+' darf keine neu einsetzende Fremdsprache sein.</li>';
    }

  //Prüfungsfach aus sprachl. Aufgabenfeld
  menge=cNiFachmengeAfSpr;
  var anz=AnzahlFachartInPruefung(menge);
  if (anz==0)
    fehler+='<li>Kein Prüfungsfach aus sprachl. Aufgabenfeld.</li>';

  //Prüfungsfach aus gesellschaftswiss. Aufgabenfeld
  menge=cNiFachmengeAfGes;
  anz=AnzahlFachartInPruefung(menge);
  if (anz==0)
    fehler+='<li>Kein Prüfungsfach aus gesellschaftswiss. Aufgabenfeld.</li>';

  //Prüfungsfach aus naturwiss. Aufgabenfeld
  menge=cNiFachmengeAfNat;
  anz=AnzahlFachartInPruefung(menge);
  if (anz==0)
    fehler+='<li>Kein Prüfungsfach aus naturwiss. Aufgabenfeld.</li>';

  //2 der 3 Fächer Deutsch, Fremdsprache und Mathematik müssen Prüfungsfach sein
  anz=0;
  menge=[cNiFachartDE];
  if (AnzahlFachartInPruefung(menge)>0) 
    anz++;
  menge=[cNiFachartMA];
  if (AnzahlFachartInPruefung(menge)>0) 
    anz++;
  menge=cNiFachmengeFS;
  if (AnzahlFachartInPruefung(menge)>0) 
    anz++;
  if (anz<2)
    fehler+='<li>2 der 3 Fächer Deutsch, Fremdsprache und Mathematik müssen Prüfungsfach sein.</li>';

  //Mathematik nicht durchgängig belegt
  menge=[cNiFachartMA];
  anz=AnzahlFachartInFachwahl(menge,3,0);
  if (anz==0)
    fehler+='<li>Mathematik nicht durchgängig belegt.</li>';

  //Deutsch nicht durchgängig belegt
  menge=[cNiFachartDE];
  anz=AnzahlFachartInFachwahl(menge,3,0);
  if (anz==0)
    fehler+='<li>Deutsch nicht durchgängig belegt.</li>';
    
  //Keine Naturwissenschaft durchgängig belegt
  menge=cNiFachmengeNat;
  anz=AnzahlFachartInFachwahl(menge,3,0);
  if (anz==0)
    fehler+='<li>Keine Naturwissenschaft durchgängig belegt.</li>';
    
  //Keine weitere Naturwissenschaft oder Informatik (3-stündig) durchgängig belegt
  if (scschwerpunkt==cNiSchwerpunktNat) {
    menge=cNiFachmengeNatIf;
    anz=AnzahlFachartInFachwahl(menge,3,0);
    if (anz<2)
      fehler+='<li>Keine weitere Naturwissenschaft oder Informatik (3-stündig) durchgängig belegt.</li>';
    }

  //Keine fortgeführte Fremdsprache durchgängig belegt
  menge=cNiFachmengeFS;
  anz=AnzahlFachartInFachwahl(menge,3,0);
  if (anz==0)
    fehler+='<li>Keine Fremdsprache durchgängig belegt.</li>';

  //Keine weitere Fremdsprache durchgängig belegt
  if (scschwerpunkt==cNiSchwerpunktSpr) {
    menge=cNiFachmengeFS;
    anz=AnzahlFachartInFachwahl(menge,3,0);
    if (anz<2)
      fehler+='<li>Keine weitere Fremdsprache durchgängig belegt.</li>';
    }

  //Keine weitere Naturwissenschaft oder Informatik (3-stündig) oder Fremdsprache in 2 Schulhalbjahren belegt
  if (scschwerpunkt==cNiSchwerpunktGes || scschwerpunkt==cNiSchwerpunktSpo) {
    menge=cNiFachmengeFS;
    menge=menge.concat(cNiFachmengeNatIf);
    var anz1=AnzahlFachartInFachwahl(menge,3,1);
    var anz2=AnzahlFachartInFachwahl(menge,3,2);
    if (anz1<3 && anz2<3)
      fehler+='<li>Keine weitere Naturwissenschaft oder Informatik (3-stündig) oder Fremdsprache in 2 Schulhalbjahren belegt.</li>';
    }

  //Religion, Werte und Normen oder Philosophie muss zwei Halbjahre eines Schuljahres belegt werden
  menge=cNiFachmengeRel;
  anz1=AnzahlFachartInFachwahl(menge,2,1);
  anz2=AnzahlFachartInFachwahl(menge,2,2);
  if (anz1+anz2==0)
    fehler+='<li>Religion, Werte und Normen oder Philosophie  muss zwei Halbjahre eines Schuljahres belegt werden.</li>';

  //Politik-Wirtschaft muss zwei Halbjahre eines Schuljahres belegt werden
  anz=0;
  if (scschwerpunkt==cNiSchwerpunktGes) {
    menge=[cNiFachartWI,cNiFachartEK];
    anz=AnzahlFachartInPruefungP13(menge);
    }
  if (anz==0) {  
    menge=[cNiFachartPO];
    anz1=AnzahlFachartInFachwahl(menge,2,1);
    anz2=AnzahlFachartInFachwahl(menge,2,2);
    if (anz1+anz2==0)
      fehler+='<li>Politik-Wirtschaft muss zwei Halbjahre eines Schuljahres belegt werden.</li>';
    }  

  //Geschichte muss zwei Halbjahre eines Schuljahres belegt werden
  menge=[cNiFachartGE];
  anz1=AnzahlFachartInFachwahl(menge,2,1);
  anz2=AnzahlFachartInFachwahl(menge,2,2);
  if (anz1+anz2==0)
    fehler+='<li>Geschichte muss zwei Halbjahre eines Schuljahres belegt werden.</li>';

  //Kunst oder Musik oder Darstellendes Spiel muss zwei Halbjahre belegt werden
  menge=cNiFachmengeKuMuDs;
  anz1=AnzahlFachartInFachwahl(menge,2,1);
  anz2=AnzahlFachartInFachwahl(menge,2,2);
  if (anz1+anz2==0)
    fehler+='<li>Kunst oder Musik oder Darstellendes Spiel muss zwei Halbjahre belegt werden.</li>';

  //Kunst oder Musik oder Darstellendes Spiel muss als Ergänzungsfach zwei Halbjahre belegt werden
  if (scschwerpunkt==cNiSchwerpunktMus) {
    menge=cNiFachmengeKuMuDs;
    anz1=AnzahlFachartInFachwahl(menge,2,1);
    anz2=AnzahlFachartInFachwahl(menge,2,2);
    if (anz1+anz2<3)
      fehler+='<li>Kunst oder Musik oder Darstellendes Spiel muss als Ergänzungsfach zwei Halbjahre belegt werden.</li>';
    }

  //Sport muss durchgängig belegt werden
  menge=[cNiFachartSP];
  anz=AnzahlFachartInFachwahl(menge,2,0);
  if (anz==0)
    fehler+='<li>Sport muss durchgängig belegt werden.</li>';

  //Seminarfach muss durchgängig belegt werden
  menge=[cNiFachartSF];
  anz=AnzahlFachartInFachwahl(menge,2,0);
  if (anz==0)
    fehler+='<li>Seminarfach muss durchgängig belegt werden.</li>';

  //
  anz=SchuelerMindestEinbringung();
  max=36;
  if (anz>max) {
    fehler+='<li>Wahl der Pr&uuml;fungsf&auml;cher unzul&auml;ssig: Es m&uuml;ssten mindestens '+anz+
                      ' Halbjahresleistungen eingebracht werden (max. '+max+').</li>';
    }

  //Stundenzahl
  anz1=SchuelerStundenzahlSj(1);
  anz2=SchuelerStundenzahlSj(2);
  var min=0;
  min=confStundenMin[0];
  if (min>0) 
    if (anz1+anz2<min) {
      fehler+='<li>Stundensumme beider Schuljahre < '+min+'.</li>';
      }
  min=confStundenMin[1];
  if (min>0) 
    if (anz1<min) {
      fehler+='<li>Stundensumme im 1. Schuljahr < '+min+'.</li>';
      }
  min=confStundenMin[2];
  if (min>0) 
    if (anz2<min) {
      fehler+='<li>Stundensumme im 2. Schuljahr < '+min+'.</li>';
      }
  var max=0;
  max=confStundenMax[0];
  if (max>0) 
    if (anz1+anz2>max) {
      fehler+='<li>Stundensumme beider Schuljahre > '+max+'.</li>';
      }
  max=confStundenMax[1];
  if (max>0) 
    if (anz1>max) {
      fehler+='<li>Stundensumme im 1. Schuljahr > '+max+'.</li>';
      }
  max=confStundenMax[2];
  if (max>0) 
    if (anz2>max) {
      fehler+='<li>Stundensumme im 2. Schuljahr > '+max+'.</li>';
      }
  }