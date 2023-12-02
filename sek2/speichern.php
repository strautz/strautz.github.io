<?php
header('Content-Type: text/html; charset=iso-8859-1');
$output="{$_POST['fachwahl']}\r\n"; 
$output=trim($output);
$output=strip_tags($output);

$datei="fw";
$s=$_POST['klasse'];
$s=str_replace("/","_",$s);
$datei.=str_replace("-","_",$s);
$datei.=$_POST['nachname'];
$datei.=$_POST['vorname'];
$datei = preg_replace ( '/[^a-z0-9 ]/i','', $datei);
$datei =substr($datei,0,50);
$datei.=".txt";
$datei=trim($datei);
$datei=strip_tags($datei);
$datei=str_replace("/","_",$datei);
$datei="daten/".$datei;
$fp = fopen($datei, 'wb');
fputs($fp, $output);
fclose($fp); 


$schueler=$_POST['nachname'].', '.$_POST['vorname'];
$schueler=trim($schueler);
$schueler=strip_tags($schueler);

if ($fp)
  $meldung='Die Daten f&uuml;r Sch&uuml;ler <b>'.$schueler.'</b> wurden gespeichert.';
else  
  $meldung='Fehler! Die Daten konnten nicht gespeichert werden.';

echo '<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">';
echo '<html lang="de">';
echo '<head>';
echo '<meta http-equiv="content-type" content="text/html">';
echo '<title>Indiware</title>';
echo '</head>';
echo '<body>';
echo '<p>';
echo $meldung;
echo '<br>';
echo '<br>';
echo '<input type="button" value="Fenster schlie&szlig;en" onclick="javascript:self.close();"/>';
echo '</p>';
echo '</body>';
echo '</html>';

?>