<?php

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

$empfaenger=$_POST['emailschule'];
$empfaenger=trim($empfaenger);
$empfaenger=strip_tags($empfaenger);
$empfaenger=str_replace("/","_",$empfaenger);

$betreff="Schülerfachwahl";
$text=$output;

$trenner = md5(uniqid(time()));
$mailaddi="fachwahl";
$kopf="MIME-Version: 1.0\r\n";
$kopf.="From: $mailaddi\n";
$kopf.= "Content-Type: multipart/mixed;\n\tboundary=$trenner\n";

$rumpf = "\n";
$rumpf .= "MIME-Version: 1.0";
$rumpf .= "\n";
$rumpf .= "Content-Type: multipart/mixed; boundary=$trenner";
$rumpf .= "\n\n"; 
$rumpf .= "This is a multi-part message in MIME format";
$rumpf .= "\n";
$rumpf .= "--$trenner";
$rumpf .= "\n";
$rumpf .= "Content-Type: text/plain";
$rumpf .= "\n";
$rumpf .= "Content-Transfer-Encoding: 8bit"; 
$rumpf .= "\n\n";
$rumpf .= "Fachwahl"; 
$rumpf .= "\n";
$rumpf .= "--$trenner";
$rumpf .= "\n";
$rumpf .= "Content-Type: text/plain; name=$datei";
$rumpf .= "\n";
$rumpf .= "Content-Transfer-Encoding: 8bit"; 
$rumpf .= "\n";
$rumpf .= "Content-Disposition: attachment; filename=$datei";
$rumpf .= "\n\n";
$rumpf .= $output;
$rumpf .= "\n";
$rumpf .= "--$trenner--";

if (mail($empfaenger,$betreff, $rumpf, $kopf))
  $meldung="Ihre Daten wurden &uuml;bermittelt.";
else
  $meldung="Die Informations&uuml;bermittlung ist fehlgeschlagen.";

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