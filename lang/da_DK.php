<?php

/**
 * Danish (Denmark) language pack
 * @package sapphire
 * @subpackage i18n
 */

i18n::include_locale_file('sapphire', 'en_US');

global $lang;

if(array_key_exists('da_DK', $lang) && is_array($lang['da_DK'])) {
	$lang['da_DK'] = array_merge($lang['en_US'], $lang['da_DK']);
} else {
	$lang['da_DK'] = $lang['en_US'];
}

$lang['da_DK']['AdvancedSearchForm']['ALLWORDS'] = 'Alle ord';
$lang['da_DK']['AdvancedSearchForm']['ATLEAST'] = 'Mindst ét af ordene';
$lang['da_DK']['AdvancedSearchForm']['EXACT'] = 'Præcis udtryk';
$lang['da_DK']['AdvancedSearchForm']['FROM'] = 'Formular';
$lang['da_DK']['AdvancedSearchForm']['GO'] = 'Søg';
$lang['da_DK']['AdvancedSearchForm']['LASTUPDATED'] = 'Senest opdateret';
$lang['da_DK']['AdvancedSearchForm']['LASTUPDATEDHEADER'] = 'SENEST OPDATERET';
$lang['da_DK']['AdvancedSearchForm']['PAGETITLE'] = 'Title på side';
$lang['da_DK']['AdvancedSearchForm']['RELEVANCE'] = 'Relevans';
$lang['da_DK']['AdvancedSearchForm']['SEARCHBY'] = 'Søg efter';
$lang['da_DK']['AdvancedSearchForm']['SORTBY'] = 'Sortér resultat efter';
$lang['da_DK']['AdvancedSearchForm']['TO'] = 'Til';
$lang['da_DK']['AdvancedSearchForm']['WITHOUT'] = 'Uden ordene';
$lang['da_DK']['BankAccountField']['VALIDATIONJS'] = 'Indtast venligst et valid kontonummer';
$lang['da_DK']['BasicAuth']['ENTERINFO'] = 'Indtast brugernavn og kodeord.';
$lang['da_DK']['BasicAuth']['ERRORNOTADMIN'] = 'Denne bruger er ikke en administrator.';
$lang['da_DK']['BasicAuth']['ERRORNOTREC'] = 'Dette brugernavn / kodeord blev ikke genkendt';
$lang['da_DK']['BBCodeParser']['ALIGNEMENT'] = 'Justering';
$lang['da_DK']['BBCodeParser']['ALIGNEMENTEXAMPLE'] = 'Højrestillet';
$lang['da_DK']['BBCodeParser']['BOLD'] = 'Fed tekst';
$lang['da_DK']['BBCodeParser']['BOLDEXAMPLE'] = 'Fed';
$lang['da_DK']['BBCodeParser']['CODE'] = 'Kodeblok';
$lang['da_DK']['BBCodeParser']['CODEDESCRIPTION'] = 'Uformatteret kodeblok';
$lang['da_DK']['BBCodeParser']['CODEEXAMPLE'] = 'Kodeblok';
$lang['da_DK']['BBCodeParser']['COLORED'] = 'Farvet tekst';
$lang['da_DK']['BBCodeParser']['COLOREDEXAMPLE'] = 'Blå tekst';
$lang['da_DK']['BBCodeParser']['EMAILLINK'] = 'Email link';
$lang['da_DK']['BBCodeParser']['EMAILLINKDESCRIPTION'] = 'Opret link til anden emailadresse';
$lang['da_DK']['BBCodeParser']['IMAGE'] = 'Billede';
$lang['da_DK']['BBCodeParser']['IMAGEDESCRIPTION'] = 'Vis et billede i dit indlæg';
$lang['da_DK']['BBCodeParser']['ITALIC'] = 'Kursiv tekst';
$lang['da_DK']['BBCodeParser']['ITALICEXAMPLE'] = 'Kursiv';
$lang['da_DK']['BBCodeParser']['LINK'] = 'Website link';
$lang['da_DK']['BBCodeParser']['LINKDESCRIPTION'] = 'Link til anden hjemmeside eller URL';
$lang['da_DK']['BBCodeParser']['STRUCK'] = 'Gennemstreget tekst';
$lang['da_DK']['BBCodeParser']['STRUCKEXAMPLE'] = 'Gennemstreget';
$lang['da_DK']['BBCodeParser']['UNDERLINE'] = 'Understreget tekst';
$lang['da_DK']['BBCodeParser']['UNDERLINEEXAMPLE'] = 'Understreget';
$lang['da_DK']['BBCodeParser']['UNORDERED'] = 'Usorteret liste';
$lang['da_DK']['BBCodeParser']['UNORDEREDDESCRIPTION'] = 'Usorteret liste';
$lang['da_DK']['BBCodeParser']['UNORDEREDEXAMPLE1'] = 'usorteret punkt 1';
$lang['da_DK']['BBCodeParser']['UNORDEREDEXAMPLE2'] = 'usorteret punkt 2';
$lang['da_DK']['ChangePasswordEmail.ss']['CHANGEPASSWORDTEXT1'] = 'Du har skiftet dit kodeord til';
$lang['da_DK']['ChangePasswordEmail.ss']['CHANGEPASSWORDTEXT2'] = 'Du kan nu bruge følgende oplysninger til af logge ind:';
$lang['da_DK']['ChangePasswordEmail.ss']['HELLO'] = 'Hej';
$lang['da_DK']['ComplexTableField.ss']['ADDITEM'] = 'Tilføj';
$lang['da_DK']['ComplexTableField.ss']['DELETE'] = 'slet';
$lang['da_DK']['ComplexTableField.ss']['DELETEROW'] = 'Slet denne række';
$lang['da_DK']['ComplexTableField.ss']['EDIT'] = 'rediger';
$lang['da_DK']['ComplexTableField.ss']['NOITEMSFOUND'] = 'ingen artikler fundet';
$lang['da_DK']['ComplexTableField.ss']['SHOW'] = 'vis';
$lang['da_DK']['ComplexTableField.ss']['SORTASC'] = 'Sorter stigende';
$lang['da_DK']['ComplexTableField.ss']['SORTDESC'] = 'Sorter faldende';
$lang['da_DK']['ComplexTableField_popup.ss']['NEXT'] = 'Næste';
$lang['da_DK']['ComplexTableField_popup.ss']['PREVIOUS'] = 'Forrige';
$lang['da_DK']['CompositeDateField']['DAY'] = 'Dag';
$lang['da_DK']['CompositeDateField']['DAYJS'] = 'dag';
$lang['da_DK']['CompositeDateField']['MONTH'] = 'Måned';
$lang['da_DK']['CompositeDateField']['MONTHJS'] = 'måned';
$lang['da_DK']['CompositeDateField']['VALIDATIONJS1'] = 'Kontroller venligst om du har sat';
$lang['da_DK']['CompositeDateField']['YEARJS'] = 'år';
$lang['da_DK']['ConfirmedPasswordField']['ATLEAST'] = 'Password skal mindst være %s tegn langt';
$lang['da_DK']['ConfirmedPasswordField']['BETWEEN'] = 'Password skal være mellem %s og %S tegn langt';
$lang['da_DK']['ConfirmedPasswordField']['HAVETOMATCH'] = 'Password skal være ens';
$lang['da_DK']['ConfirmedPasswordField']['LEASTONE'] = 'Password';
$lang['da_DK']['ConfirmedPasswordField']['MAXIMUM'] = 'Password skal højst være %s tegn langt';
$lang['da_DK']['ConfirmedPasswordField']['NOEMPTY'] = 'Passwordfeltet kan ikke være tomt';
$lang['da_DK']['ContentController']['DRAFT_SITE_ACCESS_RESTRICTION'] = 'Du skal logge ind med dit CMS kodeord for at kunne se kladde eller arkiveret indhold. <a href="%s">Klik her for at gå tilbage til den udgivne side.</a>';
$lang['da_DK']['Controller']['FILE'] = 'Fil';
$lang['da_DK']['Controller']['IMAGE'] = 'Billede';
$lang['da_DK']['CreditCardField']['FIRST'] = 'første';
$lang['da_DK']['CreditCardField']['FOURTH'] = 'fjerde';
$lang['da_DK']['CreditCardField']['SECOND'] = 'anden';
$lang['da_DK']['CreditCardField']['THIRD'] = 'tredje';
$lang['da_DK']['CreditCardField']['VALIDATIONJS1'] = 'Kontroller venligst at du har indtastet';
$lang['da_DK']['CurrencyField']['CURRENCYSYMBOL'] = 'Kr.';
$lang['da_DK']['CurrencyField']['VALIDATIONJS'] = 'Indtast venligst en valid valuta';
$lang['da_DK']['DataReport']['EXPORTCSV'] = 'Eksporter til CSV';
$lang['da_DK']['Date']['AGO'] = 'siden';
$lang['da_DK']['Date']['AWAY'] = 'fra nu';
$lang['da_DK']['Date']['DAY'] = 'dag';
$lang['da_DK']['Date']['DAYS'] = 'dage';
$lang['da_DK']['Date']['HOUR'] = 'time';
$lang['da_DK']['Date']['HOURS'] = 'timer';
$lang['da_DK']['Date']['MIN'] = 'min';
$lang['da_DK']['Date']['MINS'] = 'min';
$lang['da_DK']['Date']['MONTH'] = 'måned';
$lang['da_DK']['Date']['MONTHS'] = 'måneder';
$lang['da_DK']['Date']['SEC'] = 'sek';
$lang['da_DK']['Date']['SECS'] = 'sek';
$lang['da_DK']['Date']['YEAR'] = 'år';
$lang['da_DK']['Date']['YEARS'] = 'år';
$lang['da_DK']['DateField']['NODATESET'] = 'Ingen dato sat';
$lang['da_DK']['DateField']['NOTSET'] = 'ikke sat';
$lang['da_DK']['DateField']['TODAY'] = 'i dag';
$lang['da_DK']['DateField']['VALIDATIONJS'] = 'Indtast venligst et valid datoformat (DD/MM/YYYY)';
$lang['da_DK']['DateField']['VALIDDATEFORMAT'] = 'Indtast en gyldig dato (DD/MM/YYYY)';
$lang['da_DK']['DMYDateField']['VALIDDATEFORMAT'] = 'Indtast venligst et valid datoformat (DD-MM-YYYY)';
$lang['da_DK']['DropdownField']['CHOOSE'] = '(Vælg)';
$lang['da_DK']['EmailField']['VALIDATION'] = 'Indtast emailadresse';
$lang['da_DK']['EmailField']['VALIDATIONJS'] = 'Indtast venligst en valid emailadresse';
$lang['da_DK']['ErrorPage']['400'] = '400 - Ugyldig forespørgsel';
$lang['da_DK']['ErrorPage']['401'] = '401 - Uautoriseret ';
$lang['da_DK']['ErrorPage']['403'] = '403 - Ingen adgang';
$lang['da_DK']['ErrorPage']['404'] = '404 - Side ikke fundet';
$lang['da_DK']['ErrorPage']['405'] = '405 - Metode ikke tilladt';
$lang['da_DK']['ErrorPage']['406'] = '406 - Ikke accepteret';
$lang['da_DK']['ErrorPage']['407'] = '407 - Proxy server tilladelse påkrævet';
$lang['da_DK']['ErrorPage']['408'] = '408 - Forespørgsel fik timeout';
$lang['da_DK']['ErrorPage']['409'] = '409 - Konflikt';
$lang['da_DK']['ErrorPage']['411'] = '411 - Længde påkrævet';
$lang['da_DK']['ErrorPage']['412'] = '412 - Forudsætning fejlede';
$lang['da_DK']['ErrorPage']['413'] = '413 - Forespørgsel for lang';
$lang['da_DK']['ErrorPage']['414'] = '414 - Forespørgsels URI for lang';
$lang['da_DK']['ErrorPage']['415'] = '415 - Medietype ikke understøttet';
$lang['da_DK']['ErrorPage']['CODE'] = 'Fejlkode';
$lang['da_DK']['ErrorPage']['DEFAULTERRORPAGECONTENT'] = '<p>Beklager, siden du forsøger at komme ind på findes tilsyneladende ikke.</p><p>Tjek venligst adressen(URL) er stavet rigtig og prøv igen</p>';
$lang['da_DK']['ErrorPage']['DEFAULTERRORPAGETITLE'] = 'Side ikke fundet';
$lang['da_DK']['File']['NOFILESIZE'] = 'Filstørrelsen er 0 bytes';
$lang['da_DK']['FileIframeField']['NOTEADDFILES'] = 'Du kan tilføje filer, når du har gemt første gang.';
$lang['da_DK']['Folder']['CREATED'] = 'Først uploaded';
$lang['da_DK']['Folder']['DELETEUNUSEDTHUMBNAILS'] = 'Slet ubenyttede thumbnails';
$lang['da_DK']['Folder']['DELSELECTED'] = 'Slet valgte filer';
$lang['da_DK']['Folder']['DETAILSTAB'] = 'Detaljer';
$lang['da_DK']['Folder']['FILENAME'] = 'Filnavn';
$lang['da_DK']['Folder']['FILESTAB'] = 'Filer';
$lang['da_DK']['Folder']['LASTEDITED'] = 'Senest opdateret';
$lang['da_DK']['Folder']['TITLE'] = 'Title';
$lang['da_DK']['Folder']['TYPE'] = 'Type';
$lang['da_DK']['Folder']['UNUSEDFILESTAB'] = 'Ubenyttede filer';
$lang['da_DK']['Folder']['UNUSEDFILESTITLE'] = 'Ubenyttede';
$lang['da_DK']['Folder']['UNUSEDTHUMBNAILSTITLE'] = 'Ubenyttede thumbnails';
$lang['da_DK']['Folder']['UPLOADTAB'] = 'Upload';
$lang['da_DK']['Folder']['URL'] = 'URL';
$lang['da_DK']['ForgotPasswordEmail.ss']['HELLO'] = 'Hej';
$lang['da_DK']['ForgotPasswordEmail.ss']['TEXT2'] = 'Nulstil password link';
$lang['da_DK']['Form']['DATENOTSET'] = '(Ingen dato sat)';
$lang['da_DK']['Form']['FIELDISREQUIRED'] = '%s skal udfyldes';
$lang['da_DK']['Form']['LANGAOTHER'] = 'Andre sprog';
$lang['da_DK']['Form']['LANGAVAIL'] = 'Tilgængelige sprog';
$lang['da_DK']['Form']['NOTSET'] = '(ikke sat)';
$lang['da_DK']['Form']['SAVECHANGES'] = 'Gem ændringer';
$lang['da_DK']['Form']['VALIDATIONALLDATEVALUES'] = 'Tjek om du har indtastet alle datoer korrekt';
$lang['da_DK']['Form']['VALIDATIONBANKACC'] = 'Indtast gyldigt banknummer';
$lang['da_DK']['Form']['VALIDATIONCREDITNUMBER'] = 'Tjek om du har indtastet kreditkortnummeret korrekt.';
$lang['da_DK']['Form']['VALIDATIONFAILED'] = 'Validering fejlede';
$lang['da_DK']['Form']['VALIDATIONNOTUNIQUE'] = 'Den indtastede værdi er ikke unik';
$lang['da_DK']['Form']['VALIDATIONPASSWORDSDONTMATCH'] = 'Kodeord matcher ikke';
$lang['da_DK']['Form']['VALIDATIONPASSWORDSNOTEMPTY'] = 'Kodeord kan ikke være tomme';
$lang['da_DK']['Form']['VALIDATIONSTRONGPASSWORD'] = 'Kodeord skal indeholde mindst et tal og et bogstav.';
$lang['da_DK']['Form']['VALIDCURRENCY'] = 'Indtast gyldig valuta';
$lang['da_DK']['FormField']['NONE'] = 'ingen';
$lang['da_DK']['GhostPage']['NOLINKED'] = 'Denne spøgelsesside har ingen refererende sider.';
$lang['da_DK']['GSTNumberField']['VALIDATION'] = 'Indtast gyldigt CVR nummer';
$lang['da_DK']['GSTNumberField']['VALIDATIONJS'] = 'Indtast venligst et valid GST tal';
$lang['da_DK']['HtmlEditorField']['ALTTEXT'] = 'Beskrivelse';
$lang['da_DK']['HtmlEditorField']['ANCHOR'] = 'Indsæt / rediger link';
$lang['da_DK']['HtmlEditorField']['ANCHORVALUE'] = 'Anker';
$lang['da_DK']['HtmlEditorField']['BULLETLIST'] = 'Opstilling med punkttegn';
$lang['da_DK']['HtmlEditorField']['BUTTONALIGNCENTER'] = 'Centrering';
$lang['da_DK']['HtmlEditorField']['BUTTONALIGNJUSTIFY'] = 'Lige margener';
$lang['da_DK']['HtmlEditorField']['BUTTONALIGNLEFT'] = 'Venstrejuster';
$lang['da_DK']['HtmlEditorField']['BUTTONALIGNRIGHT'] = 'Højrejuster';
$lang['da_DK']['HtmlEditorField']['BUTTONBOLD'] = 'Fed (Ctrl+B)';
$lang['da_DK']['HtmlEditorField']['BUTTONEDITIMAGE'] = 'Rediger billede';
$lang['da_DK']['HtmlEditorField']['BUTTONINSERTFLASH'] = 'Indsæt Flash';
$lang['da_DK']['HtmlEditorField']['BUTTONINSERTIMAGE'] = 'Indsæt billede';
$lang['da_DK']['HtmlEditorField']['BUTTONINSERTLINK'] = 'Indsæt link';
$lang['da_DK']['HtmlEditorField']['BUTTONITALIC'] = 'Kursiv (Ctrl+I)';
$lang['da_DK']['HtmlEditorField']['BUTTONREMOVELINK'] = 'Fjern link';
$lang['da_DK']['HtmlEditorField']['BUTTONSTRIKE'] = 'Gennemstreg';
$lang['da_DK']['HtmlEditorField']['BUTTONUNDERLINE'] = 'Understreg (Ctrl+U)';
$lang['da_DK']['HtmlEditorField']['CHARMAP'] = 'indsæt symbol';
$lang['da_DK']['HtmlEditorField']['CLOSE'] = 'luk';
$lang['da_DK']['HtmlEditorField']['COPY'] = 'Kopier';
$lang['da_DK']['HtmlEditorField']['CREATEFOLDER'] = 'Opret mappe';
$lang['da_DK']['HtmlEditorField']['CSSCLASS'] = 'Justering / stil';
$lang['da_DK']['HtmlEditorField']['CSSCLASSCENTER'] = 'Centreret for sig selv';
$lang['da_DK']['HtmlEditorField']['CSSCLASSLEFT'] = 'til venstre med tektsombrydning';
$lang['da_DK']['HtmlEditorField']['CSSCLASSLEFTALONE'] = 'Til venste, alene';
$lang['da_DK']['HtmlEditorField']['CSSCLASSRIGHT'] = 'Højrejusteret med tekstombrydning';
$lang['da_DK']['HtmlEditorField']['CUT'] = 'Klip';
$lang['da_DK']['HtmlEditorField']['DELETECOL'] = 'slet kolonne';
$lang['da_DK']['HtmlEditorField']['DELETEROW'] = 'Slet række';
$lang['da_DK']['HtmlEditorField']['EDITCODE'] = 'Rediger HTML kode';
$lang['da_DK']['HtmlEditorField']['EMAIL'] = 'Emailadresse';
$lang['da_DK']['HtmlEditorField']['FILE'] = 'Fil';
$lang['da_DK']['HtmlEditorField']['FLASH'] = 'Indsæt Flash';
$lang['da_DK']['HtmlEditorField']['FOLDER'] = 'Mappe';
$lang['da_DK']['HtmlEditorField']['FOLDERCANCEL'] = 'annuller';
$lang['da_DK']['HtmlEditorField']['FORMATADDR'] = 'Adresse';
$lang['da_DK']['HtmlEditorField']['FORMATH1'] = 'Overskrift 1';
$lang['da_DK']['HtmlEditorField']['FORMATH2'] = 'Overskrift 2';
$lang['da_DK']['HtmlEditorField']['FORMATH3'] = 'Overskrift 3';
$lang['da_DK']['HtmlEditorField']['FORMATH4'] = 'Overskrift 4';
$lang['da_DK']['HtmlEditorField']['FORMATH5'] = 'Overskrift 5';
$lang['da_DK']['HtmlEditorField']['FORMATH6'] = 'Overskrift 6';
$lang['da_DK']['HtmlEditorField']['FORMATP'] = 'Afsnit';
$lang['da_DK']['HtmlEditorField']['HR'] = 'Indsæt horisontal linie';
$lang['da_DK']['HtmlEditorField']['IMAGE'] = 'Indsæt billede';
$lang['da_DK']['HtmlEditorField']['IMAGEDIMENSIONS'] = 'Dimensioner';
$lang['da_DK']['HtmlEditorField']['IMAGEHEIGHTPX'] = 'Højde';
$lang['da_DK']['HtmlEditorField']['IMAGEWIDTHPX'] = 'Bredde';
$lang['da_DK']['HtmlEditorField']['INDENT'] = 'Forøg indrykning';
$lang['da_DK']['HtmlEditorField']['INSERTCOLAFTER'] = 'Indsæt kolonne efter';
$lang['da_DK']['HtmlEditorField']['INSERTCOLBEF'] = 'Indsæt kolonne før';
$lang['da_DK']['HtmlEditorField']['INSERTROWAFTER'] = 'Indsæt række efter';
$lang['da_DK']['HtmlEditorField']['INSERTROWBEF'] = 'Indsæt række før';
$lang['da_DK']['HtmlEditorField']['INSERTTABLE'] = 'Indsæt tabel';
$lang['da_DK']['HtmlEditorField']['LINK'] = 'Indsæt / rediger link for markeret tekst';
$lang['da_DK']['HtmlEditorField']['LINKANCHOR'] = 'Anker på denne side';
$lang['da_DK']['HtmlEditorField']['LINKDESCR'] = 'Link beskrivelse';
$lang['da_DK']['HtmlEditorField']['LINKEMAIL'] = 'Emaladresse';
$lang['da_DK']['HtmlEditorField']['LINKEXTERNAL'] = 'En anden hjemmeside';
$lang['da_DK']['HtmlEditorField']['LINKFILE'] = 'Download en fil';
$lang['da_DK']['HtmlEditorField']['LINKINTERNAL'] = 'Side på denne hjemmeside';
$lang['da_DK']['HtmlEditorField']['LINKOPENNEWWIN'] = 'Åben link i et nyt vindue?';
$lang['da_DK']['HtmlEditorField']['LINKTO'] = 'Link til';
$lang['da_DK']['HtmlEditorField']['OK'] = 'ok';
$lang['da_DK']['HtmlEditorField']['OL'] = 'Opstilling med tal';
$lang['da_DK']['HtmlEditorField']['OUTDENT'] = 'Formindsk indrykning';
$lang['da_DK']['HtmlEditorField']['PAGE'] = 'Side';
$lang['da_DK']['HtmlEditorField']['PASTE'] = 'Sæt ind';
$lang['da_DK']['HtmlEditorField']['PASTETEXT'] = 'Indsæt enkel tekst';
$lang['da_DK']['HtmlEditorField']['PASTEWORD'] = 'Indsæte fra Word';
$lang['da_DK']['HtmlEditorField']['REDO'] = 'Gentag';
$lang['da_DK']['HtmlEditorField']['SELECTALL'] = 'Marker alt (Ctrl + A)';
$lang['da_DK']['HtmlEditorField']['UNDO'] = 'Fortryd';
$lang['da_DK']['HtmlEditorField']['UNLINK'] = 'Fjern link';
$lang['da_DK']['HtmlEditorField']['UPLOAD'] = 'upload';
$lang['da_DK']['HtmlEditorField']['URL'] = 'URL';
$lang['da_DK']['HtmlEditorField']['VISUALAID'] = 'Vis / skjul hjælpelinjer';
$lang['da_DK']['ImageField']['NOTEADDIMAGES'] = 'Du kan tilføje billeder, når du har gemt første gang.';
$lang['da_DK']['ImageUplaoder']['ONEFROMFILESTORE'] = 'med en fra filbiblioteket';
$lang['da_DK']['ImageUploader']['ATTACH'] = 'Vedhæft %s';
$lang['da_DK']['ImageUploader']['DELETE'] = 'Slet %s';
$lang['da_DK']['ImageUploader']['FROMCOMPUTER'] = 'Fra din computer';
$lang['da_DK']['ImageUploader']['FROMFILESTORE'] = 'Fra filbiblioteket';
$lang['da_DK']['ImageUploader']['ONEFROMCOMPUTER'] = 'Med en fra din computer';
$lang['da_DK']['ImageUploader']['REALLYDELETE'] = 'Er du sikker på, at du vil fjerne %s?';
$lang['da_DK']['ImageUploader']['REPLACE'] = 'Erstat %s';
$lang['da_DK']['Image_iframe.ss']['TITLE'] = 'Upload Billede Iframe';
$lang['da_DK']['Member']['ADDRESS'] = 'Adresse';
$lang['da_DK']['Member']['BUTTONCHANGEPASSWORD'] = 'Skift kodeord';
$lang['da_DK']['Member']['BUTTONLOGIN'] = 'Log ind';
$lang['da_DK']['Member']['BUTTONLOGINOTHER'] = 'Log ind som en anden';
$lang['da_DK']['Member']['BUTTONLOSTPASSWORD'] = 'Jeg har glemt mit kodeord';
$lang['da_DK']['Member']['CONFIRMNEWPASSWORD'] = 'Bekræft nyt kodeord';
$lang['da_DK']['Member']['CONFIRMPASSWORD'] = 'Bekræft kodeord';
$lang['da_DK']['Member']['CONTACTINFO'] = 'Kontaktinformation';
$lang['da_DK']['Member']['EMAIL'] = 'Email';
$lang['da_DK']['Member']['EMAILPASSWORDAPPENDIX'] = 'Dit kodeord er blevet ændret. Gem denne email for fremtidig reference.';
$lang['da_DK']['Member']['EMAILPASSWORDINTRO'] = 'Her er dit nye kodeord';
$lang['da_DK']['Member']['EMAILSIGNUPINTRO1'] = 'Tak fordi du tilmeldte dig som bruger, dine oplysninger er vist herunder for senere reference.';
$lang['da_DK']['Member']['EMAILSIGNUPINTRO2'] = 'Du kan logge ind på hjemmesiden ved at bruge nedenstående oplysninger';
$lang['da_DK']['Member']['EMAILSIGNUPSUBJECT'] = 'Tak for din tilmelding';
$lang['da_DK']['Member']['ERRORNEWPASSWORD'] = 'Du har indtastet dit nye kodeord forskelligt, prøv igen';
$lang['da_DK']['Member']['ERRORPASSWORDNOTMATCH'] = 'Dit nuværende kodeord passede ikke, prøv igen';
$lang['da_DK']['Member']['ERRORWRONGCRED'] = 'Link til at nulstille kodeordet er sendt til \'%s\'';
$lang['da_DK']['Member']['FIRSTNAME'] = 'Fornavn';
$lang['da_DK']['Member']['GREETING'] = 'Velkommen';
$lang['da_DK']['Member']['INTERFACELANG'] = 'Brugergrænseflade til sprog';
$lang['da_DK']['Member']['LOGGEDINAS'] = 'Du er logget ind som %s.';
$lang['da_DK']['Member']['MOBILE'] = 'Mobil';
$lang['da_DK']['Member']['NAME'] = 'Navn';
$lang['da_DK']['Member']['NEWPASSWORD'] = 'Nyt kodeord';
$lang['da_DK']['Member']['PASSWORD'] = 'Kodeord';
$lang['da_DK']['Member']['PASSWORDCHANGED'] = 'Dit kodeord er blevet ændret, og en kopi er sendt med email til dig';
$lang['da_DK']['Member']['PERSONALDETAILS'] = 'Personlige Detaljer';
$lang['da_DK']['Member']['PHONE'] = 'Telefon';
$lang['da_DK']['Member']['REMEMBERME'] = 'Husk mig næste gang?';
$lang['da_DK']['Member']['SUBJECTPASSWORDCHANGED'] = 'Dit kodeord er blevet ændret';
$lang['da_DK']['Member']['SUBJECTPASSWORDRESET'] = 'Link til at nulstille dit kodeord';
$lang['da_DK']['Member']['SURNAME'] = 'Efternavn';
$lang['da_DK']['Member']['USERDETAILS'] = 'Brugerdetaljer';
$lang['da_DK']['Member']['VALIDATIONMEMBEREXISTS'] = 'Der findes allerede et medlem med denne email';
$lang['da_DK']['Member']['WELCOMEBACK'] = 'Velkommen tilbage, %s';
$lang['da_DK']['Member']['YOUROLDPASSWORD'] = 'Dit gamle kodeord';
$lang['da_DK']['MemberAuthenticator']['TITLE'] = 'Email & kodeord';
$lang['da_DK']['NumericField']['VALIDATION'] = '\'%s\' er ikke et tal, kun tal bliver accepteret i dette felt';
$lang['da_DK']['NumericField']['VALIDATIONJS'] = 'er ikke et tal, kun tal er accepteret i dette felt';
$lang['da_DK']['PhoneNumberField']['VALIDATION'] = 'Indtast gyldigt telefonnummer';
$lang['da_DK']['RedirectorPage']['HASBEENSETUP'] = 'En videresendelsesside er sat op uden at videresende nogle steder hen.';
$lang['da_DK']['RedirectorPage']['HEADER'] = 'Denne side vil videresende brugeren til en anden side';
$lang['da_DK']['RedirectorPage']['OTHERURL'] = 'En anden hjemmeside URL';
$lang['da_DK']['RedirectorPage']['REDIRECTTO'] = 'Videresend til';
$lang['da_DK']['RedirectorPage']['REDIRECTTOEXTERNAL'] = 'En anden hjemmeside';
$lang['da_DK']['RedirectorPage']['REDIRECTTOPAGE'] = 'En side på din hjemmeside';
$lang['da_DK']['RedirectorPage']['YOURPAGE'] = 'Side på din hjemmeside';
$lang['da_DK']['RelationComplexTableField.ss']['ADD'] = 'Tilføj';
$lang['da_DK']['RelationComplexTableField.ss']['DELETE'] = 'slet';
$lang['da_DK']['RelationComplexTableField.ss']['EDIT'] = 'rediger';
$lang['da_DK']['RelationComplexTableField.ss']['NOTFOUND'] = 'Ingen punkter fundet';
$lang['da_DK']['RelationComplexTableField.ss']['SHOW'] = 'vis';
$lang['da_DK']['SearchForm']['GO'] = 'Søg';
$lang['da_DK']['SearchForm']['SEARCH'] = 'Søg';
$lang['da_DK']['Security']['ALREADYLOGGEDIN'] = 'Du har ikke rettigheder til denne side. Hvis du har en anden konto, som har rettigheder, kan du logge ind herunder.';
$lang['da_DK']['Security']['BUTTONSEND'] = 'Send mig et link til at nulstille kodeordet';
$lang['da_DK']['Security']['CHANGEPASSWORDBELOW'] = 'Du kan ændre dit kodeord nedenunder.';
$lang['da_DK']['Security']['CHANGEPASSWORDHEADER'] = 'Skift dit kodeord';
$lang['da_DK']['Security']['ENTERNEWPASSWORD'] = 'Indtast nyt kodeord.';
$lang['da_DK']['Security']['ERRORPASSWORDPERMISSION'] = 'Du skal være logget ind for at kunne ændre dit kodeord!';
$lang['da_DK']['Security']['IPADDRESSES'] = 'IP-Adresser';
$lang['da_DK']['Security']['LOGGEDOUT'] = 'Du er blevet logget ud, hvis du vil logge ind igen, kan du indtaste dine oplysninger herunder.';
$lang['da_DK']['Security']['LOGIN'] = 'Log ind';
$lang['da_DK']['Security']['LOSTPASSWORDHEADER'] = 'Glemt kodeord';
$lang['da_DK']['Security']['NOTEPAGESECURED'] = 'Denne side er sikret. Indtast dine brugeroplysninger herunder og du vil blive sendt videre.';
$lang['da_DK']['Security']['NOTERESETPASSWORD'] = 'Indtast din emailadresse og vi sender dig et link, som kan bruges til at nulstille kodeordet';
$lang['da_DK']['Security']['PASSWORDSENTHEADER'] = 'Link til at nulstille kodeordet er sendt til \'%s\'';
$lang['da_DK']['Security']['PASSWORDSENTTEXT'] = 'Tak! Et link til at nulstille kodeordet er sendt til \'%s\'.';
$lang['da_DK']['SecurityAdmin']['CODE'] = 'Kode';
$lang['da_DK']['SecurityAdmin']['GROUPNAME'] = 'Gruppenavn';
$lang['da_DK']['SecurityAdmin']['MEMBERS'] = 'Medlemmer';
$lang['da_DK']['SecurityAdmin']['PERMISSIONS'] = 'Tilladelser';
$lang['da_DK']['SecurityAdmin']['VIEWUSER'] = 'Vis bruger';
$lang['da_DK']['SimpleImageField']['NOUPLOAD'] = 'Intet billede uploadet';
$lang['da_DK']['SiteTree']['ACCESSANYONE'] = 'Alle';
$lang['da_DK']['SiteTree']['ACCESSHEADER'] = 'Hvem kan se denne side?';
$lang['da_DK']['SiteTree']['ACCESSLOGGEDIN'] = 'Brugere som er logget ind';
$lang['da_DK']['SiteTree']['ACCESSONLYTHESE'] = 'Kun disse folk (vælg fra liste)';
$lang['da_DK']['SiteTree']['ADDEDTODRAFT'] = 'Tilføjet til kladde';
$lang['da_DK']['SiteTree']['ALLOWCOMMENTS'] = 'Tillad kommentarer på denne side?';
$lang['da_DK']['SiteTree']['APPEARSVIRTUALPAGES'] = 'Dette indhold optræder også på de virtuelle sider i disse %s sektioner.';
$lang['da_DK']['SiteTree']['BUTTONCANCELDRAFT'] = 'Annuller ændringer af kladde';
$lang['da_DK']['SiteTree']['BUTTONCANCELDRAFTDESC'] = 'Slet din kladde og gå tilbage til den nuværende udgivne side';
$lang['da_DK']['SiteTree']['BUTTONSAVEPUBLISH'] = 'Gem og udgiv';
$lang['da_DK']['SiteTree']['BUTTONUNPUBLISH'] = 'Ikke udgivet';
$lang['da_DK']['SiteTree']['BUTTONUNPUBLISHDESC'] = 'Fjern denne side fra den udgivne hjemmeside';
$lang['da_DK']['SiteTree']['CHANGETO'] = 'Ændre til ';
$lang['da_DK']['SiteTree']['CURRENT'] = 'nuværende';
$lang['da_DK']['SiteTree']['CURRENTLY'] = 'Nuværende';
$lang['da_DK']['SiteTree']['DEFAULTABOUTTITLE'] = 'Om os';
$lang['da_DK']['SiteTree']['DEFAULTCONTACTTITLE'] = 'Kontakt os';
$lang['da_DK']['SiteTree']['DEFAULTHOMETITLE'] = 'Hjem';
$lang['da_DK']['SiteTree']['EDITANYONE'] = 'Alle der kan logge ind i CMS';
$lang['da_DK']['SiteTree']['EDITHEADER'] = 'Hvem kan ændre denne side i CMS?';
$lang['da_DK']['SiteTree']['EDITONLYTHESE'] = 'Kun disse folk (vælg fra liste)';
$lang['da_DK']['SiteTree']['GROUP'] = 'Gruppe';
$lang['da_DK']['SiteTree']['HASBROKENLINKS'] = 'Denne side har brudte links.';
$lang['da_DK']['SiteTree']['HOMEPAGEFORDOMAIN'] = 'Domæne(r)';
$lang['da_DK']['SiteTree']['HTMLEDITORTITLE'] = 'Indhold';
$lang['da_DK']['SiteTree']['LINKSALREADYUNIQUE'] = ' %s er allerede unik';
$lang['da_DK']['SiteTree']['LINKSCHANGEDTO'] = 'ændrede %s -> %s';
$lang['da_DK']['SiteTree']['MENUTITLE'] = 'Navigeringsetikette';
$lang['da_DK']['SiteTree']['METAADVANCEDHEADER'] = 'Avancerede muligheder...';
$lang['da_DK']['SiteTree']['METADESC'] = 'Beskrivelse';
$lang['da_DK']['SiteTree']['METAEXTRA'] = 'Tilpassede Meta Tags';
$lang['da_DK']['SiteTree']['METAHEADER'] = 'Søgemaskine Meta-tags';
$lang['da_DK']['SiteTree']['METAKEYWORDS'] = 'Nøgleord';
$lang['da_DK']['SiteTree']['METANOTEPRIORITY'] = 'Specificer manuelt en Google Sitemaps prioritering for denne side (%s)';
$lang['da_DK']['SiteTree']['METAPAGEPRIO'] = 'Sideprioritet';
$lang['da_DK']['SiteTree']['METATITLE'] = 'Titel';
$lang['da_DK']['SiteTree']['MODIFIEDONDRAFT'] = 'Ændret på kladde';
$lang['da_DK']['SiteTree']['NOBACKLINKS'] = 'Denne side er ikke blevet linket til fra nogle sider.';
$lang['da_DK']['SiteTree']['NOTEUSEASHOMEPAGE'] = 'Brug denne side som "startside" for følgende domæner: (adskil flere domæner med komma) ';
$lang['da_DK']['SiteTree']['PAGESLINKING'] = 'Følgende sider linker til denne side:';
$lang['da_DK']['SiteTree']['PAGETITLE'] = 'Sidenavn';
$lang['da_DK']['SiteTree']['PAGETYPE'] = 'Sidetype';
$lang['da_DK']['SiteTree']['PRIORITYLEASTIMPORTANT'] = 'Mindst betydningsfuld';
$lang['da_DK']['SiteTree']['PRIORITYMOSTIMPORTANT'] = 'Mest betydningsfuld';
$lang['da_DK']['SiteTree']['PRIORITYNOTINDEXED'] = 'Ikke indekseret';
$lang['da_DK']['SiteTree']['REMOVEDFROMDRAFT'] = 'Fjernet fra kladde';
$lang['da_DK']['SiteTree']['SHOWINMENUS'] = 'Vis i menuer?';
$lang['da_DK']['SiteTree']['SHOWINSEARCH'] = 'Vis i søgninger?';
$lang['da_DK']['SiteTree']['TABACCESS'] = 'Adgang';
$lang['da_DK']['SiteTree']['TABBACKLINKS'] = 'Tilbagelinks';
$lang['da_DK']['SiteTree']['TABBEHAVIOUR'] = 'Opførsel';
$lang['da_DK']['SiteTree']['TABCONTENT'] = 'Indhold';
$lang['da_DK']['SiteTree']['TABMAIN'] = 'Primær';
$lang['da_DK']['SiteTree']['TABMETA'] = 'Meta-Data';
$lang['da_DK']['SiteTree']['TABREPORTS'] = 'Rapporter';
$lang['da_DK']['SiteTree']['TOPLEVEL'] = 'Sideindhold (Top Level)';
$lang['da_DK']['SiteTree']['URL'] = 'URL';
$lang['da_DK']['SiteTree']['VALIDATIONURLSEGMENT1'] = 'En anden side bruger denne URL. URL\'en skal være unik for hver side.';
$lang['da_DK']['SiteTree']['VALIDATIONURLSEGMENT2'] = 'URLs kan kun indeholde bogstaver, tal og tankestreger.';
$lang['da_DK']['TableField']['ISREQUIRED'] = 'I %s \'%s\' er påkrævet.';
$lang['da_DK']['TableField.ss']['ADD'] = 'Tilføj ny række';
$lang['da_DK']['TableField.ss']['CSVEXPORT'] = 'Eksporter til CSV';
$lang['da_DK']['TableListField']['CSVEXPORT'] = 'Eksporter til CSV';
$lang['da_DK']['TableListField']['PRINT'] = 'Print';
$lang['da_DK']['TableListField_PageControls.ss']['DISPLAYING'] = 'Viser';
$lang['da_DK']['TableListField_PageControls.ss']['OF'] = 'af';
$lang['da_DK']['TableListField_PageControls.ss']['TO'] = 'til';
$lang['da_DK']['TableListField_PageControls.ss']['VIEWFIRST'] = 'Vis første';
$lang['da_DK']['TableListField_PageControls.ss']['VIEWLAST'] = 'Vis sidste';
$lang['da_DK']['TableListField_PageControls.ss']['VIEWNEXT'] = 'Vis næste';
$lang['da_DK']['TableListField_PageControls.ss']['VIEWPREVIOUS'] = 'Vis forrige';
$lang['da_DK']['ToggleCompositeField.ss']['HIDE'] = 'Skjul';
$lang['da_DK']['ToggleCompositeField.ss']['SHOW'] = 'Vis';
$lang['da_DK']['ToggleField']['LESS'] = 'mindre';
$lang['da_DK']['ToggleField']['MORE'] = 'mere';
$lang['da_DK']['Translatable']['CREATE'] = 'Opret ny oversættelse';
$lang['da_DK']['Translatable']['CREATEBUTTON'] = 'Opret';
$lang['da_DK']['Translatable']['EXISTING'] = 'Eksisterende oversættelser:';
$lang['da_DK']['Translatable']['NEWLANGUAGE'] = 'Nyt sprog';
$lang['da_DK']['Translatable']['TRANSLATIONS'] = 'Oversættelser';
$lang['da_DK']['TreeSelectorField']['CANCEL'] = 'annuler';
$lang['da_DK']['TreeSelectorField']['SAVE'] = 'gem';
$lang['da_DK']['TypeDropdown']['NONE'] = 'ingen';
$lang['da_DK']['VirtualPage']['CHOOSE'] = 'Vælg en side at linke til';
$lang['da_DK']['VirtualPage']['EDITCONTENT'] = 'klik her for at redigere indholdet';
$lang['da_DK']['VirtualPage']['HEADER'] = 'Dette er en virtuel side';

?>