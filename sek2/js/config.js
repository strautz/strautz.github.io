var confZeit="01.12.2023 13:48";
var confBundesland="Ni";
var confVerordnung="Niedersachsen";
var confVersion="6.0.21";
var confPin=0;
var confButtonSpeichern=1;
var confButtonEmail=0;
var confEmail="langbein@hvf-bs.net";
var cMaxSchwerpunkt=5;
var cMaxFachzeile=14;

//Klassen
var klassen = new Array("11a","11b","11c","11d");

//Stundenzahlen
var confStundenMin=new Array(3);
confStundenMin[0]=64;
confStundenMin[1]=0;
confStundenMin[2]=0;
var confStundenMax=new Array(3);
confStundenMax[0]=67;
confStundenMax[1]=0;
confStundenMax[2]=0;

//Schwerpunkte
var schwerpunkte = new Array("sprachlich","musisch-künstlerisch","gesellschaftswissenschaftlich","math.-naturwissenschaftlich","");

//Fächer
var cMaxFach=48;
var faecher=new Array(cMaxFach);
faecher[0]=new Array("AG-As","AG Astronomie Geophysik",26,0,0);
faecher[1]=new Array("AG-Ba","AG Brazz-Band",26,0,0);
faecher[2]=new Array("AG-Ci","AG Chinesisch",26,0,0);
faecher[3]=new Array("AG-En","AG LCCI",26,0,0);
faecher[4]=new Array("AG-Rh","AG Rhetorik",26,0,0);
faecher[5]=new Array("AG-Th","AG Theater",26,0,0);
faecher[6]=new Array("Ag-Li","AG Literatur",26,0,0);
faecher[7]=new Array("BI","Biologie",20,5,3);
faecher[8]=new Array("CH","Chemie",19,5,3);
faecher[9]=new Array("CI","Chinesisch",2,0,2);
faecher[10]=new Array("DE","Deutsch",1,5,3);
faecher[11]=new Array("DS","Darstellendes Spiel",6,0,3);
faecher[12]=new Array("EK","Erdkunde",9,5,3);
faecher[13]=new Array("EN","Englisch",2,5,3);
faecher[14]=new Array("FR","Französisch",2,5,3);
faecher[15]=new Array("FRN","Französisch neu",3,0,4);
faecher[16]=new Array("GE","Geschichte",8,5,3);
faecher[17]=new Array("GR","Griechisch",2,0,3);
faecher[18]=new Array("HE","Hebräisch",2,0,3);
faecher[19]=new Array("IF","Informatik",21,5,3);
faecher[20]=new Array("IT","Italienisch",2,0,3);
faecher[21]=new Array("ITN","Italienisch neu",3,0,4);
faecher[22]=new Array("JA","Japanisch",2,0,2);
faecher[23]=new Array("KU","Kunst",4,5,3);
faecher[24]=new Array("LA","Latein",2,5,3);
faecher[25]=new Array("LW","Latein (Wahlfach)",2,0,2);
faecher[26]=new Array("MA","Mathematik",17,5,3);
faecher[27]=new Array("MU","Musik",5,5,3);
faecher[28]=new Array("NL","Niederländisch",2,0,3);
faecher[29]=new Array("NLN","Niederländisch neu",3,0,4);
faecher[30]=new Array("PA","Pädagogik",12,0,3);
faecher[31]=new Array("PH","Physik",18,5,3);
faecher[32]=new Array("PL","Philosophie",11,5,3);
faecher[33]=new Array("PO","Politik-Wirtschaft",7,5,3);
faecher[34]=new Array("RE","Evangelische Religionslehre",15,5,3);
faecher[35]=new Array("RK","Katholische Religionslehre",15,5,3);
faecher[36]=new Array("RL","Rechtskunde",10,0,3);
faecher[37]=new Array("RS","Russisch",2,5,3);
faecher[38]=new Array("RSN","Russisch neu",3,5,4);
faecher[39]=new Array("SF","Seminarfach",25,0,2);
faecher[40]=new Array("SN","Spanisch",2,5,3);
faecher[41]=new Array("SNN","Spanisch neu",3,5,4);
faecher[42]=new Array("SP","Sport",23,0,2);
faecher[43]=new Array("SPP","Sport",23,6,4);
faecher[44]=new Array("SPT","Sporttheorie",24,0,2);
faecher[45]=new Array("SW","Spanisch (Wahlfach)",2,0,2);
faecher[46]=new Array("WI","Wirtschaftslehre",14,5,3);
faecher[47]=new Array("WN","Werte und Normen",16,0,3);

//Fachangebot
var fachangebot=new Array(cMaxSchwerpunkt+1);
for (var i = 0; i <= cMaxSchwerpunkt; i++) {
  fachangebot[i]=new Array(cMaxFachzeile+1);
  for (var j = 0; j <= cMaxFachzeile; j++) {
    fachangebot[i][j]=new Array();
    fachangebot[i][j]=[];
    }
  }
fachangebot[1][1]=["EN","FR","LA","SN"];
fachangebot[1][2]=["DE","EN","FR","LA","SN"];
fachangebot[1][3]=["BI","CH","DE","EK","EN","FR","GE","KU","LA","MA","MU","PH","PO","SN","WI"];
fachangebot[1][4]=["BI","CH","DE","EK","EN","FR","GE","KU","LA","MA","MU","PH","PO","RE","RK","SN","WN"];
fachangebot[1][5]=["BI","CH","DE","DS","EK","EN","FR","GE","KU","LA","MA","MU","PH","PO","RE","RK","SN","WN"];
fachangebot[1][6]=["BI","CH","DE","EK","EN","FR","IF","LA","MA","PH","SN"];
fachangebot[1][7]=["DS","KU","MU"];
fachangebot[1][8]=["GE"];
fachangebot[1][9]=["PO"];
fachangebot[1][10]=["RE","RK","WN"];
fachangebot[1][11]=["SF"];
fachangebot[1][12]=["SP"];
fachangebot[1][13]=["BI","CH","DE","EK","EN","FR","IF","LA","MA","PH","SN"];
fachangebot[2][1]=["KU","MU"];
fachangebot[2][2]=["DE","MA"];
fachangebot[2][3]=["BI","CH","DE","EK","EN","FR","GE","LA","MA","PH","PO","SN","WI"];
fachangebot[2][4]=["BI","CH","DE","EK","EN","FR","GE","LA","MA","PH","PO","RE","RK","SN","WN"];
fachangebot[2][5]=["BI","CH","DE","EK","EN","FR","GE","LA","MA","PH","PO","RE","RK","SN","WN"];
fachangebot[2][6]=["BI","CH","DE","EK","EN","FR","IF","LA","MA","PH","SN"];
fachangebot[2][7]=["DS","KU","MU"];
fachangebot[2][8]=["GE"];
fachangebot[2][9]=["PO"];
fachangebot[2][10]=["RE","RK","WN"];
fachangebot[2][11]=["SF"];
fachangebot[2][12]=["SP"];
fachangebot[2][13]=["BI","CH","DE","EK","EN","FR","IF","LA","MA","PH","SN"];
fachangebot[3][1]=["GE"];
fachangebot[3][2]=["BI","CH","DE","EN","FR","LA","MA","PH","SN"];
fachangebot[3][3]=["EK","PO","WI"];
fachangebot[3][4]=["BI","CH","DE","EN","FR","KU","LA","MA","MU","PH","RE","RK","SN","WN"];
fachangebot[3][5]=["BI","CH","DE","DS","EN","FR","KU","LA","MA","MU","PH","RE","RK","SN","WN"];
fachangebot[3][6]=["BI","CH","DE","EN","FR","IF","LA","MA","PH","SN"];
fachangebot[3][7]=["BI","CH","DE","EN","FR","IF","LA","MA","PH","SN"];
fachangebot[3][8]=["DS","KU","MU"];
fachangebot[3][10]=["RE","RK","WN"];
fachangebot[3][11]=["SF"];
fachangebot[3][12]=["SP"];
fachangebot[3][13]=["BI","CH","DE","EK","EN","FR","IF","LA","MA","PH","SN"];
fachangebot[4][1]=["BI","CH","MA","PH"];
fachangebot[4][2]=["BI","CH","IF","MA","PH"];
fachangebot[4][3]=["BI","CH","DE","EK","EN","FR","GE","IF","KU","LA","MA","MU","PH","PO","SN","WI"];
fachangebot[4][4]=["BI","CH","DE","EK","EN","FR","GE","IF","KU","LA","MA","MU","PH","PO","RE","RK","SN","WN"];
fachangebot[4][5]=["BI","CH","DE","DS","EK","EN","FR","GE","IF","KU","LA","MA","MU","PH","PO","RE","RK","SN","WN"];
fachangebot[4][6]=["BI","CH","DE","EK","EN","FR","IF","LA","MA","PH","SN"];
fachangebot[4][7]=["DS","KU","MU"];
fachangebot[4][8]=["GE"];
fachangebot[4][9]=["PO"];
fachangebot[4][10]=["RE","RK","WN"];
fachangebot[4][11]=["SF"];
fachangebot[4][12]=["SP"];
fachangebot[4][13]=["BI","CH","DE","EK","EN","FR","IF","LA","MA","PH","SN"];

//Fachvorbesetzung
var fachvor=new Array(cMaxSchwerpunkt+1);
for (var i = 0; i <= cMaxSchwerpunkt; i++) {
  fachvor[i]=new Array(cMaxFachzeile+1);
  for (var j = 0; j <= cMaxFachzeile; j++) {
    fachvor[i][j]="";
    }
  }
fachvor[1][11]=["SF"];
fachvor[1][12]=["SP"];
fachvor[2][11]=["SF"];
fachvor[2][12]=["SP"];
fachvor[3][1]=["GE"];
fachvor[3][11]=["SF"];
fachvor[3][12]=["SP"];
fachvor[4][11]=["SF"];
fachvor[4][12]=["SP"];

//FachNurSj
var cMaxFachNurSj=5;
var FachNurSj=new Array(cMaxSchwerpunkt+1);
for (var i = 0; i <= cMaxSchwerpunkt; i++) {
  FachNurSj[i]=new Array(cMaxFachNurSj);
  for (var j = 0; j < cMaxFachNurSj; j++) {
    FachNurSj[i][j]=[];
    }
  }

//Mitteilungen
var mitteilungen=new Array(10);
mitteilungen[0]="Die folgenden Fächer müssen, wenn sie nicht als P-Fach gewählt werden, mindestens in Q1 ODER Q2 ";
mitteilungen[1]="belegt werden:";
mitteilungen[2]="- Geschichte und ";
mitteilungen[3]="- Politik-Wirtschaft und ";
mitteilungen[4]="- Kunst oder Musik oder Darstellendes Spiel und ";
mitteilungen[5]="- evangelische Religionslehre oder katholische Religionslehre oder Werte und Normen.";
mitteilungen[6]="Nur wenn die genannten Fächer freiwillig für Q1 UND Q2 gewählt werden, darf die maximale ";
mitteilungen[7]="Stundensumme von 67 Stunden überschritten werden.";
mitteilungen[8]="";
mitteilungen[9]="";
