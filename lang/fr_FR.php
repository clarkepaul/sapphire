<?php

/**
 * French (France) language pack
 * @package sapphire
 * @subpackage i18n
 */

i18n::include_locale_file('sapphire', 'en_US');

global $lang;

if(array_key_exists('fr_FR', $lang) && is_array($lang['fr_FR'])) {
	$lang['fr_FR'] = array_merge($lang['en_US'], $lang['fr_FR']);
} else {
	$lang['fr_FR'] = $lang['en_US'];
}

$lang['fr_FR']['AdvancedSearchForm']['ALLWORDS'] = 'Tous les mots';
$lang['fr_FR']['AdvancedSearchForm']['ATLEAST'] = 'Au moins un des mots';
$lang['fr_FR']['AdvancedSearchForm']['EXACT'] = 'Phrase exacte';
$lang['fr_FR']['AdvancedSearchForm']['FROM'] = 'A partir de ';
$lang['fr_FR']['AdvancedSearchForm']['GO'] = 'Aller';
$lang['fr_FR']['AdvancedSearchForm']['LASTUPDATED'] = 'Dernière mise à jour';
$lang['fr_FR']['AdvancedSearchForm']['LASTUPDATEDHEADER'] = 'DERNIERE MISE A JOUR';
$lang['fr_FR']['AdvancedSearchForm']['PAGETITLE'] = 'Titre de la page';
$lang['fr_FR']['AdvancedSearchForm']['RELEVANCE'] = 'Pertinence';
$lang['fr_FR']['AdvancedSearchForm']['SEARCHBY'] = 'RECHERCHER PAR';
$lang['fr_FR']['AdvancedSearchForm']['SORTBY'] = 'TRIER LES RESULTATS PAR';
$lang['fr_FR']['AdvancedSearchForm']['TO'] = 'à';
$lang['fr_FR']['AdvancedSearchForm']['WITHOUT'] = 'Sans les mots';
$lang['fr_FR']['BankAccountField']['VALIDATIONJS'] = 'Veuillez saisir un numéro bancaire valide';
$lang['fr_FR']['BasicAuth']['ENTERINFO'] = 'Entrer un identifiant et un mot de passe s\'il vous plaît.';
$lang['fr_FR']['BasicAuth']['ERRORNOTADMIN'] = 'Cet utilisateur n\'est pas un administrateur.';
$lang['fr_FR']['BasicAuth']['ERRORNOTREC'] = 'Cet identifiant / mot de passe n\'est pas reconnu';
$lang['fr_FR']['BBCodeParser']['ALIGNEMENT'] = 'Alignement';
$lang['fr_FR']['BBCodeParser']['ALIGNEMENTEXAMPLE'] = 'alignement à droite';
$lang['fr_FR']['BBCodeParser']['BOLD'] = 'Texte en gras';
$lang['fr_FR']['BBCodeParser']['BOLDEXAMPLE'] = 'Gras';
$lang['fr_FR']['BBCodeParser']['CODE'] = 'Bloc de code';
$lang['fr_FR']['BBCodeParser']['CODEDESCRIPTION'] = 'Bloc de texte non formaté';
$lang['fr_FR']['BBCodeParser']['CODEEXAMPLE'] = 'Bloc de code';
$lang['fr_FR']['BBCodeParser']['COLORED'] = 'Texte coloré';
$lang['fr_FR']['BBCodeParser']['COLOREDEXAMPLE'] = 'texte bleu';
$lang['fr_FR']['BBCodeParser']['EMAILLINK'] = 'Lien email';
$lang['fr_FR']['BBCodeParser']['EMAILLINKDESCRIPTION'] = 'Créer un lien vers une adresse email';
$lang['fr_FR']['BBCodeParser']['IMAGE'] = 'Image';
$lang['fr_FR']['BBCodeParser']['IMAGEDESCRIPTION'] = 'Afficher une image dans votre message';
$lang['fr_FR']['BBCodeParser']['ITALIC'] = 'Texte en italique';
$lang['fr_FR']['BBCodeParser']['ITALICEXAMPLE'] = 'Italique';
$lang['fr_FR']['BBCodeParser']['LINK'] = 'Lien du site internet';
$lang['fr_FR']['BBCodeParser']['LINKDESCRIPTION'] = 'Lien d\'un autre site internet ou URL';
$lang['fr_FR']['BBCodeParser']['STRUCK'] = 'Texte barré';
$lang['fr_FR']['BBCodeParser']['STRUCKEXAMPLE'] = 'Barrer';
$lang['fr_FR']['BBCodeParser']['UNDERLINE'] = 'Texte souligné';
$lang['fr_FR']['BBCodeParser']['UNDERLINEEXAMPLE'] = 'Souligné';
$lang['fr_FR']['BBCodeParser']['UNORDERED'] = 'Liste non ordonnée';
$lang['fr_FR']['BBCodeParser']['UNORDEREDDESCRIPTION'] = 'Liste non ordonnée';
$lang['fr_FR']['BBCodeParser']['UNORDEREDEXAMPLE1'] = 'élément non ordonné 1';
$lang['fr_FR']['BBCodeParser']['UNORDEREDEXAMPLE2'] = 'élément non ordonné 2';
$lang['fr_FR']['ChangePasswordEmail.ss']['CHANGEPASSWORDTEXT1'] = 'Vous avez modifié votre mot de passe pour';
$lang['fr_FR']['ChangePasswordEmail.ss']['CHANGEPASSWORDTEXT2'] = 'Vous pouvez maintenant utiliser les détails suivants pour vous connecter :';
$lang['fr_FR']['ChangePasswordEmail.ss']['HELLO'] = 'Salut';
$lang['fr_FR']['ComplexTableField.ss']['ADDITEM'] = 'Ajouter';
$lang['fr_FR']['ComplexTableField.ss']['DELETE'] = 'Supprimer';
$lang['fr_FR']['ComplexTableField.ss']['DELETEROW'] = 'Supprimer cette ligne';
$lang['fr_FR']['ComplexTableField.ss']['EDIT'] = 'Modifier';
$lang['fr_FR']['ComplexTableField.ss']['NOITEMSFOUND'] = 'Aucun élément trouvé';
$lang['fr_FR']['ComplexTableField.ss']['SHOW'] = 'Afficher';
$lang['fr_FR']['ComplexTableField.ss']['SORTASC'] = 'Tri croissant';
$lang['fr_FR']['ComplexTableField.ss']['SORTDESC'] = 'Tri décroissant';
$lang['fr_FR']['ComplexTableField_popup.ss']['NEXT'] = 'Suivant';
$lang['fr_FR']['ComplexTableField_popup.ss']['PREVIOUS'] = 'Précédent';
$lang['fr_FR']['CompositeDateField']['DAY'] = 'Jour';
$lang['fr_FR']['CompositeDateField']['DAYJS'] = 'jour';
$lang['fr_FR']['CompositeDateField']['MONTH'] = 'Mois';
$lang['fr_FR']['CompositeDateField']['MONTHJS'] = 'mois';
$lang['fr_FR']['CompositeDateField']['VALIDATIONJS1'] = 'Veuillez vous assurer que vous avez saisi';
$lang['fr_FR']['CompositeDateField']['VALIDATIONJS2'] = 'correctement';
$lang['fr_FR']['CompositeDateField']['YEARJS'] = 'année';
$lang['fr_FR']['ConfirmedPasswordField']['ATLEAST'] = 'Les mots de passe doivent contenir au minimum %s caractères.';
$lang['fr_FR']['ConfirmedPasswordField']['BETWEEN'] = 'Les mots de passe doivent contenir %s à %s caractères.';
$lang['fr_FR']['ConfirmedPasswordField']['HAVETOMATCH'] = 'Les mots de passe de correspondent pas.';
$lang['fr_FR']['ConfirmedPasswordField']['LEASTONE'] = 'Le mots de passe doivent au moins contenir un chiffre et un caractère alphanumérique.';
$lang['fr_FR']['ConfirmedPasswordField']['MAXIMUM'] = 'Les mots de passe ne doivent pas contenir plus de  %s caractères.';
$lang['fr_FR']['ConfirmedPasswordField']['NOEMPTY'] = 'Les mots de passe ne doivent pas être vide.';
$lang['fr_FR']['ContentController']['DRAFT_SITE_ACCESS_RESTRICTION'] = 'Vous devez vous authentifier avec votre mot de passe CMS afin de pouvoir consulter le contenu brouillon ou archivé. <a href="%s">Cliquer ici pour revenir au site publié.</a>';
$lang['fr_FR']['Controller']['FILE'] = 'Fichier';
$lang['fr_FR']['Controller']['IMAGE'] = 'Image';
$lang['fr_FR']['CreditCardField']['FIRST'] = 'premier';
$lang['fr_FR']['CreditCardField']['FOURTH'] = 'quatrième';
$lang['fr_FR']['CreditCardField']['SECOND'] = 'second';
$lang['fr_FR']['CreditCardField']['THIRD'] = 'troisième';
$lang['fr_FR']['CreditCardField']['VALIDATIONJS1'] = 'Veuillez vous assurer que vous avez entré le';
$lang['fr_FR']['CreditCardField']['VALIDATIONJS2'] = 'le bon numéro de de la carte de crédit.';
$lang['fr_FR']['CurrencyField']['CURRENCYSYMBOL'] = '$';
$lang['fr_FR']['CurrencyField']['VALIDATIONJS'] = 'Merci d\'entrer une devise existante';
$lang['fr_FR']['DataReport']['EXPORTCSV'] = 'Exporter vers un fichier CSV';
$lang['fr_FR']['Date']['AGO'] = 'auparavant';
$lang['fr_FR']['Date']['AWAY'] = 'plus tard';
$lang['fr_FR']['Date']['DAY'] = 'jour';
$lang['fr_FR']['Date']['DAYS'] = 'jours';
$lang['fr_FR']['Date']['HOUR'] = 'heure';
$lang['fr_FR']['Date']['HOURS'] = 'heures';
$lang['fr_FR']['Date']['MIN'] = 'minutes';
$lang['fr_FR']['Date']['MINS'] = 'minutes';
$lang['fr_FR']['Date']['MONTH'] = 'mois';
$lang['fr_FR']['Date']['MONTHS'] = 'mois';
$lang['fr_FR']['Date']['SEC'] = 'seconde';
$lang['fr_FR']['Date']['SECS'] = 'secondes';
$lang['fr_FR']['Date']['YEAR'] = 'année';
$lang['fr_FR']['Date']['YEARS'] = 'années';
$lang['fr_FR']['DateField']['NODATESET'] = 'Au';
$lang['fr_FR']['DateField']['NOTSET'] = 'pas d\'ensemble';
$lang['fr_FR']['DateField']['TODAY'] = 'aujourd\'hui';
$lang['fr_FR']['DateField']['VALIDATIONJS'] = 'Veuillez saisir un format de date valide (JJ-MM-AAAA).';
$lang['fr_FR']['DateField']['VALIDDATEFORMAT'] = 'S\'il vous plaît, entrer une date au format valide ( JJ/MM/AAAA ).';
$lang['fr_FR']['DMYDateField']['VALIDDATEFORMAT'] = 'Veuillez saisir un format de date valide (JJ-MM-AAAA).';
$lang['fr_FR']['DropdownField']['CHOOSE'] = '(Choisir)';
$lang['fr_FR']['EmailField']['VALIDATION'] = 'Entrer une adresse email s\'il vous plaît.';
$lang['fr_FR']['EmailField']['VALIDATIONJS'] = 'Veuillez saisir une adresse email.';
$lang['fr_FR']['ErrorPage']['400'] = '400 - Mauvaise demande';
$lang['fr_FR']['ErrorPage']['401'] = '401 - Non autorisé';
$lang['fr_FR']['ErrorPage']['403'] = '403 - Interdit';
$lang['fr_FR']['ErrorPage']['404'] = '404 - Non trouvé';
$lang['fr_FR']['ErrorPage']['405'] = '405 - Méthode non permise';
$lang['fr_FR']['ErrorPage']['406'] = '406 - Inacceptable';
$lang['fr_FR']['ErrorPage']['407'] = '407 - Authentification de mandataire (Proxy) requise';
$lang['fr_FR']['ErrorPage']['408'] = '408 - Temps d\'attente d\'une réponse du serveur écoulé';
$lang['fr_FR']['ErrorPage']['409'] = '409 - La requête ne peut être traitée à l\'état actuel';
$lang['fr_FR']['ErrorPage']['410'] = '410 - La ressource est indisponible et aucune adresse de redirection n\'est connue';
$lang['fr_FR']['ErrorPage']['411'] = '411 - La longueur de la requête n\'a pas été précisée';
$lang['fr_FR']['ErrorPage']['412'] = '412 - Préconditions envoyées par la requête non-vérifiées';
$lang['fr_FR']['ErrorPage']['413'] = '413 - Entité de la requête trop grande';
$lang['fr_FR']['ErrorPage']['414'] = '414 - URI de la requête trop longue';
$lang['fr_FR']['ErrorPage']['415'] = '415 - Type de média non géré';
$lang['fr_FR']['ErrorPage']['416'] = '416 - Champs d\'en-tête de requête \'range\' incorrect.';
$lang['fr_FR']['ErrorPage']['417'] = '417 - Comportement attendu et défini dans l\'en-tête de la requête insatisfaisable';
$lang['fr_FR']['ErrorPage']['500'] = '500 - Erreur interne du serveur';
$lang['fr_FR']['ErrorPage']['501'] = '501 - Fonctionnalité réclamée non supportée par le serveur';
$lang['fr_FR']['ErrorPage']['502'] = '502 - Mauvaise passerelle d\'accès';
$lang['fr_FR']['ErrorPage']['503'] = '503 - Service indisponible';
$lang['fr_FR']['ErrorPage']['504'] = '504 - Temps d\'attente d\'une réponse d\'un serveur à un serveur intermédiaire écoulé';
$lang['fr_FR']['ErrorPage']['505'] = '505 - Version HTTP non supportée';
$lang['fr_FR']['ErrorPage']['CODE'] = 'Erreur de code';
$lang['fr_FR']['ErrorPage']['DEFAULTERRORPAGECONTENT'] = '<p>Désolé, il semble que vous tentez d\'avoir accès à une page qui n\'existe pas</p><p>Merci de vérifier l\'URL que vous avez saisie puis d\'essayer à nouveau.<p>';
$lang['fr_FR']['ErrorPage']['DEFAULTERRORPAGETITLE'] = 'Page non trouvée';
$lang['fr_FR']['File']['NOFILESIZE'] = 'La taille du fichier est de zéro bytes.';
$lang['fr_FR']['FileIframeField']['NOTEADDFILES'] = 'Vous pouvez ajouter des fichiers une fois que vous avez enregistré pour la première fois.';
$lang['fr_FR']['Folder']['CREATED'] = 'Premier téléchargement';
$lang['fr_FR']['Folder']['DELETEUNUSEDTHUMBNAILS'] = 'Supprimer les miniatures inutilisées';
$lang['fr_FR']['Folder']['DELSELECTED'] = 'Supprimer les fichiers sélectionnés';
$lang['fr_FR']['Folder']['DETAILSTAB'] = 'Détails';
$lang['fr_FR']['Folder']['FILENAME'] = 'Nom du fichier';
$lang['fr_FR']['Folder']['FILESTAB'] = 'Fichiers';
$lang['fr_FR']['Folder']['LASTEDITED'] = 'Dernière mise à jour';
$lang['fr_FR']['Folder']['TITLE'] = 'Titre';
$lang['fr_FR']['Folder']['TYPE'] = 'Type';
$lang['fr_FR']['Folder']['UNUSEDFILESTAB'] = 'Fichiers inutilisés';
$lang['fr_FR']['Folder']['UNUSEDFILESTITLE'] = 'Fichiers inutilisés';
$lang['fr_FR']['Folder']['UNUSEDTHUMBNAILSTITLE'] = 'Miniatures inutilisées';
$lang['fr_FR']['Folder']['UPLOADTAB'] = 'Télécharger';
$lang['fr_FR']['Folder']['URL'] = 'URL';
$lang['fr_FR']['Folder']['VIEWASSET'] = 'Voir le fichier';
$lang['fr_FR']['Folder']['VIEWEDITASSET'] = 'Voir/Editer le fichier';
$lang['fr_FR']['ForgotPasswordEmail.ss']['HELLO'] = 'Salut';
$lang['fr_FR']['ForgotPasswordEmail.ss']['TEXT1'] = 'Voici votre';
$lang['fr_FR']['ForgotPasswordEmail.ss']['TEXT2'] = 'lien de réinitialisation de mot de passe';
$lang['fr_FR']['ForgotPasswordEmail.ss']['TEXT3'] = 'pour';
$lang['fr_FR']['Form']['DATENOTSET'] = '( Aucune date définie )';
$lang['fr_FR']['Form']['FIELDISREQUIRED'] = '%s est requis';
$lang['fr_FR']['Form']['LANGAOTHER'] = 'Autres langues';
$lang['fr_FR']['Form']['LANGAVAIL'] = 'Langues disponibles';
$lang['fr_FR']['Form']['NOTSET'] = '( Non défini )';
$lang['fr_FR']['Form']['SAVECHANGES'] = 'Enregistrer Modifications';
$lang['fr_FR']['Form']['VALIDATIONALLDATEVALUES'] = 'Assurez vous d\'avoir entré toutes les données s\'il vous plaît';
$lang['fr_FR']['Form']['VALIDATIONBANKACC'] = 'Entrer un numéro de banque valide s\'il vous plaît';
$lang['fr_FR']['Form']['VALIDATIONCREDITNUMBER'] = 'Assurez vous d\'avoir entré le numéro de carte de crédit %s correctement.';
$lang['fr_FR']['Form']['VALIDATIONFAILED'] = 'Validation echouée';
$lang['fr_FR']['Form']['VALIDATIONNOTUNIQUE'] = 'La valeur entrée n\'est pas unique';
$lang['fr_FR']['Form']['VALIDATIONPASSWORDSDONTMATCH'] = 'Les mots de passe ne correspondent pas';
$lang['fr_FR']['Form']['VALIDATIONPASSWORDSNOTEMPTY'] = 'Les mots de passe peuvent être vides';
$lang['fr_FR']['Form']['VALIDATIONSTRONGPASSWORD'] = 'Les mots de passe doivent avoir au moins un chiffre et une lettre.';
$lang['fr_FR']['Form']['VALIDATOR'] = 'Validateur';
$lang['fr_FR']['Form']['VALIDCURRENCY'] = 'Entrer une devise valide.';
$lang['fr_FR']['FormField']['NONE'] = 'aucun';
$lang['fr_FR']['GhostPage']['NOLINKED'] = 'Cette page fantôme n\'a aucun lien à d\'autres pages';
$lang['fr_FR']['GSTNumberField']['VALIDATION'] = 'Entrer une valeur GST ( TPS : Taxe sur les Produits et Services ) valide s\'il vous plaît';
$lang['fr_FR']['GSTNumberField']['VALIDATIONJS'] = 'Entrer s\'il vous plaît un Nombre GST valide';
$lang['fr_FR']['HtmlEditorField']['ALTTEXT'] = 'Description';
$lang['fr_FR']['HtmlEditorField']['ANCHOR'] = 'Insérer / Modifier une ancre';
$lang['fr_FR']['HtmlEditorField']['ANCHORVALUE'] = 'Ancre';
$lang['fr_FR']['HtmlEditorField']['BULLETLIST'] = 'Liste non numérotée';
$lang['fr_FR']['HtmlEditorField']['BUTTONALIGNCENTER'] = 'Centré';
$lang['fr_FR']['HtmlEditorField']['BUTTONALIGNJUSTIFY'] = 'Justifié';
$lang['fr_FR']['HtmlEditorField']['BUTTONALIGNLEFT'] = 'Aligné à gauche';
$lang['fr_FR']['HtmlEditorField']['BUTTONALIGNRIGHT'] = 'Aligné à droite';
$lang['fr_FR']['HtmlEditorField']['BUTTONBOLD'] = 'Gras ( Ctrl + B )';
$lang['fr_FR']['HtmlEditorField']['BUTTONEDITIMAGE'] = 'Editer image';
$lang['fr_FR']['HtmlEditorField']['BUTTONINSERTFLASH'] = 'Insérer Flash';
$lang['fr_FR']['HtmlEditorField']['BUTTONINSERTIMAGE'] = 'Insérer image';
$lang['fr_FR']['HtmlEditorField']['BUTTONINSERTLINK'] = 'Insérer un lien';
$lang['fr_FR']['HtmlEditorField']['BUTTONITALIC'] = 'Italique ( Ctrl + I )';
$lang['fr_FR']['HtmlEditorField']['BUTTONREMOVELINK'] = 'Supprimer le lien';
$lang['fr_FR']['HtmlEditorField']['BUTTONSTRIKE'] = 'Barré';
$lang['fr_FR']['HtmlEditorField']['BUTTONUNDERLINE'] = 'Souligné ( Ctrl + U )';
$lang['fr_FR']['HtmlEditorField']['CHARMAP'] = 'Insérer un symbole';
$lang['fr_FR']['HtmlEditorField']['CLOSE'] = 'fermer';
$lang['fr_FR']['HtmlEditorField']['COPY'] = 'Copier ( Ctrl + C )';
$lang['fr_FR']['HtmlEditorField']['CREATEFOLDER'] = 'Créer dossier';
$lang['fr_FR']['HtmlEditorField']['CSSCLASS'] = 'Alignement / Style';
$lang['fr_FR']['HtmlEditorField']['CSSCLASSCENTER'] = 'Centré';
$lang['fr_FR']['HtmlEditorField']['CSSCLASSLEFT'] = 'A gauche, avec texte à la ligne.';
$lang['fr_FR']['HtmlEditorField']['CSSCLASSLEFTALONE'] = 'Sur la gauche seulement';
$lang['fr_FR']['HtmlEditorField']['CSSCLASSRIGHT'] = 'a droite, avec texte à la ligne.';
$lang['fr_FR']['HtmlEditorField']['CUT'] = 'Couper ( Ctrl + X )';
$lang['fr_FR']['HtmlEditorField']['DELETECOL'] = 'Supprimer colonne';
$lang['fr_FR']['HtmlEditorField']['DELETEROW'] = 'Supprimer ligne';
$lang['fr_FR']['HtmlEditorField']['EDITCODE'] = 'Modifier code HTML';
$lang['fr_FR']['HtmlEditorField']['EMAIL'] = 'Adresse email';
$lang['fr_FR']['HtmlEditorField']['FILE'] = 'Fichier';
$lang['fr_FR']['HtmlEditorField']['FLASH'] = 'Flash';
$lang['fr_FR']['HtmlEditorField']['FOLDER'] = 'Dossier';
$lang['fr_FR']['HtmlEditorField']['FOLDERCANCEL'] = 'Annuler';
$lang['fr_FR']['HtmlEditorField']['FORMATADDR'] = 'Adresse';
$lang['fr_FR']['HtmlEditorField']['FORMATH1'] = 'Titre 1';
$lang['fr_FR']['HtmlEditorField']['FORMATH2'] = 'Titre 2';
$lang['fr_FR']['HtmlEditorField']['FORMATH3'] = 'Titre 3';
$lang['fr_FR']['HtmlEditorField']['FORMATH4'] = 'Titre 4';
$lang['fr_FR']['HtmlEditorField']['FORMATH5'] = 'Titre 5';
$lang['fr_FR']['HtmlEditorField']['FORMATH6'] = 'Titre 6';
$lang['fr_FR']['HtmlEditorField']['FORMATP'] = 'Paragraphe';
$lang['fr_FR']['HtmlEditorField']['HR'] = 'Insérer une ligne horizontale';
$lang['fr_FR']['HtmlEditorField']['IMAGE'] = 'Image';
$lang['fr_FR']['HtmlEditorField']['IMAGEDIMENSIONS'] = 'Dimensions';
$lang['fr_FR']['HtmlEditorField']['IMAGEHEIGHTPX'] = 'Hauteur';
$lang['fr_FR']['HtmlEditorField']['IMAGEWIDTHPX'] = 'Largeur';
$lang['fr_FR']['HtmlEditorField']['INDENT'] = 'Augmenter indentation';
$lang['fr_FR']['HtmlEditorField']['INSERTCOLAFTER'] = 'Insérer colonne après';
$lang['fr_FR']['HtmlEditorField']['INSERTCOLBEF'] = 'Insérer colonne avant';
$lang['fr_FR']['HtmlEditorField']['INSERTROWAFTER'] = 'Insérer ligne après';
$lang['fr_FR']['HtmlEditorField']['INSERTROWBEF'] = 'Insérer ligne avant';
$lang['fr_FR']['HtmlEditorField']['INSERTTABLE'] = 'Insérer tableau';
$lang['fr_FR']['HtmlEditorField']['LINK'] = 'Lien';
$lang['fr_FR']['HtmlEditorField']['LINKANCHOR'] = 'Ancre sur cette page';
$lang['fr_FR']['HtmlEditorField']['LINKDESCR'] = 'Description du lien';
$lang['fr_FR']['HtmlEditorField']['LINKEMAIL'] = 'Une adresse email';
$lang['fr_FR']['HtmlEditorField']['LINKEXTERNAL'] = 'Un autre site web';
$lang['fr_FR']['HtmlEditorField']['LINKFILE'] = 'Un fichier à télécharger';
$lang['fr_FR']['HtmlEditorField']['LINKINTERNAL'] = 'Une page du site';
$lang['fr_FR']['HtmlEditorField']['LINKOPENNEWWIN'] = 'Ouvrir le lien dans une nouvelle fenêtre ?';
$lang['fr_FR']['HtmlEditorField']['LINKTO'] = 'Lier à';
$lang['fr_FR']['HtmlEditorField']['OK'] = 'Ok';
$lang['fr_FR']['HtmlEditorField']['OL'] = 'Liste numérotée';
$lang['fr_FR']['HtmlEditorField']['OUTDENT'] = 'Réduire indentation';
$lang['fr_FR']['HtmlEditorField']['PAGE'] = 'Page';
$lang['fr_FR']['HtmlEditorField']['PASTE'] = 'Coller ( Ctrl + V )';
$lang['fr_FR']['HtmlEditorField']['PASTETEXT'] = 'Coller le texte brut';
$lang['fr_FR']['HtmlEditorField']['PASTEWORD'] = 'Coller depuis Word';
$lang['fr_FR']['HtmlEditorField']['REDO'] = 'Refaire ( Ctrl + Y )';
$lang['fr_FR']['HtmlEditorField']['SELECTALL'] = 'Tout selectionner (Ctrl+A)';
$lang['fr_FR']['HtmlEditorField']['UNDO'] = 'Défaire ( Ctrl + Z )';
$lang['fr_FR']['HtmlEditorField']['UNLINK'] = 'Supprimer lien';
$lang['fr_FR']['HtmlEditorField']['UPLOAD'] = 'Charger';
$lang['fr_FR']['HtmlEditorField']['URL'] = 'URL';
$lang['fr_FR']['HtmlEditorField']['VISUALAID'] = 'Afficher / Cacher directives';
$lang['fr_FR']['ImageField']['NOTEADDIMAGES'] = 'Vous pouvez ajouter des images une fois que vous avez enregistré la première fois.';
$lang['fr_FR']['ImageUplaoder']['ONEFROMFILESTORE'] = 'Avec un à partir des fichiers enregistrés';
$lang['fr_FR']['ImageUploader']['ATTACH'] = 'Attacher %s';
$lang['fr_FR']['ImageUploader']['DELETE'] = 'Supprimer %s';
$lang['fr_FR']['ImageUploader']['FROMCOMPUTER'] = 'A partir de votre ordinateur';
$lang['fr_FR']['ImageUploader']['FROMFILESTORE'] = 'A partir des fichiers enregistrés';
$lang['fr_FR']['ImageUploader']['ONEFROMCOMPUTER'] = 'Avec un à partir de votre ordinateur';
$lang['fr_FR']['ImageUploader']['REALLYDELETE'] = 'Voulez-vous vraiment supprimer ce %s ?';
$lang['fr_FR']['ImageUploader']['REPLACE'] = 'Remplacer %s';
$lang['fr_FR']['Image_iframe.ss']['TITLE'] = 'Fenêtre de chargement d\'images';
$lang['fr_FR']['Member']['ADDRESS'] = 'Adresse';
$lang['fr_FR']['Member']['BUTTONCHANGEPASSWORD'] = 'Changer mot de passe';
$lang['fr_FR']['Member']['BUTTONLOGIN'] = 'Se connecter';
$lang['fr_FR']['Member']['BUTTONLOGINOTHER'] = 'Connectez vous avec un différent identifiant';
$lang['fr_FR']['Member']['BUTTONLOSTPASSWORD'] = 'J\'ai perdu mon mot de passe';
$lang['fr_FR']['Member']['CONFIRMNEWPASSWORD'] = 'Confirmer nouveau mot de passe';
$lang['fr_FR']['Member']['CONFIRMPASSWORD'] = 'Confirmer Mot De Passe';
$lang['fr_FR']['Member']['CONTACTINFO'] = 'Informations de contacts';
$lang['fr_FR']['Member']['EMAIL'] = 'Email';
$lang['fr_FR']['Member']['EMAILPASSWORDAPPENDIX'] = 'Votre mot de passe a été modifié. Conservez cet email pour votre prochaine connexion.';
$lang['fr_FR']['Member']['EMAILPASSWORDINTRO'] = 'Voila votre nouveau mot de passe';
$lang['fr_FR']['Member']['EMAILSIGNUPINTRO1'] = 'Merci de vous être inscrit pour devenir un nouveau membre, vos détails sont listés ci-dessous pour pouvoir y accéder plus tard.';
$lang['fr_FR']['Member']['EMAILSIGNUPINTRO2'] = 'Vous pouvez vous connecter au site web en utilisant vos détaisl de connexion listés ci-dessous';
$lang['fr_FR']['Member']['EMAILSIGNUPSUBJECT'] = 'Merci de vous être inscrit';
$lang['fr_FR']['Member']['ERRORLOCKEDOUT'] = 'Votre compte a été désactivé temporairement à cause de multiples tentatives de connexions. Veuillez réessayer dans 20 minutes.';
$lang['fr_FR']['Member']['ERRORNEWPASSWORD'] = 'Vous avez entré votre nouveau mot de passe différemment, essayez encore';
$lang['fr_FR']['Member']['ERRORPASSWORDNOTMATCH'] = 'Votre actuel mot de passe ne correspond pas, essayez encore s\'il vous plaît';
$lang['fr_FR']['Member']['ERRORWRONGCRED'] = 'Il semble que ce ne soit pas le bon email ou mot de passe. Essayez encore s\'il vous plaît.';
$lang['fr_FR']['Member']['FIRSTNAME'] = 'Prénom';
$lang['fr_FR']['Member']['GREETING'] = 'Bienvenue';
$lang['fr_FR']['Member']['INTERFACELANG'] = 'Langue de l\'interface';
$lang['fr_FR']['Member']['LOGGEDINAS'] = 'Vous êtes connecté en tant que %s.';
$lang['fr_FR']['Member']['MOBILE'] = 'Portable';
$lang['fr_FR']['Member']['NAME'] = 'Nom';
$lang['fr_FR']['Member']['NEWPASSWORD'] = 'Nouveau mot de passe';
$lang['fr_FR']['Member']['PASSWORD'] = 'Mot de passe';
$lang['fr_FR']['Member']['PASSWORDCHANGED'] = 'Votre mot de passe a été changé et une copie vous a été envoyée.';
$lang['fr_FR']['Member']['PERSONALDETAILS'] = 'Détails Personnels';
$lang['fr_FR']['Member']['PHONE'] = 'Téléphone';
$lang['fr_FR']['Member']['REMEMBERME'] = 'Se souvenir de moi la prochaine fois ?';
$lang['fr_FR']['Member']['SUBJECTPASSWORDCHANGED'] = 'Votre mot de passe a été changé';
$lang['fr_FR']['Member']['SUBJECTPASSWORDRESET'] = 'Lien pour modifier votre mot de passe';
$lang['fr_FR']['Member']['SURNAME'] = 'Nom de famille';
$lang['fr_FR']['Member']['USERDETAILS'] = 'Détails Utilisateur';
$lang['fr_FR']['Member']['VALIDATIONMEMBEREXISTS'] = 'Il existe déjà un membre avec cet email';
$lang['fr_FR']['Member']['WELCOMEBACK'] = 'Bienvenue de retour, %s';
$lang['fr_FR']['Member']['YOUROLDPASSWORD'] = 'Votre ancien mot de passe';
$lang['fr_FR']['MemberAuthenticator']['TITLE'] = 'Email &amp; Mot de passe';
$lang['fr_FR']['NumericField']['VALIDATION'] = '\'%s\' n\'est pas un nombre, seul un nombre est autorisé pour cette donnée';
$lang['fr_FR']['NumericField']['VALIDATIONJS'] = 'ce n\'est pas un nombre, seuls les nombres peuvent être acceptés pour ce champ.';
$lang['fr_FR']['Permission']['FULLADMINRIGHTS'] = 'Droits d\'administration complets';
$lang['fr_FR']['Permission']['PERMSDEFINED'] = 'Les codes de permissions suivants sont définis';
$lang['fr_FR']['PhoneNumberField']['VALIDATION'] = 'Entrer un numéro de téléphone valide';
$lang['fr_FR']['RedirectorPage']['HASBEENSETUP'] = 'Une page de redirection sans adresse de redirection a été créée.';
$lang['fr_FR']['RedirectorPage']['HEADER'] = 'Cette page va rediriger les utilisateurs vers une autre page';
$lang['fr_FR']['RedirectorPage']['OTHERURL'] = 'Autre URL de site web';
$lang['fr_FR']['RedirectorPage']['REDIRECTTO'] = 'Rediriger vers';
$lang['fr_FR']['RedirectorPage']['REDIRECTTOEXTERNAL'] = 'Autre site web';
$lang['fr_FR']['RedirectorPage']['REDIRECTTOPAGE'] = 'Une page de votre site web';
$lang['fr_FR']['RedirectorPage']['YOURPAGE'] = 'Page de votre site web';
$lang['fr_FR']['RelationComplexTableField.ss']['ADD'] = 'Ajouter';
$lang['fr_FR']['RelationComplexTableField.ss']['DELETE'] = 'supprimer';
$lang['fr_FR']['RelationComplexTableField.ss']['EDIT'] = 'éditer';
$lang['fr_FR']['RelationComplexTableField.ss']['NOTFOUND'] = 'Aucun élément trouvé';
$lang['fr_FR']['RelationComplexTableField.ss']['SHOW'] = 'montrer';
$lang['fr_FR']['SearchForm']['GO'] = 'Aller';
$lang['fr_FR']['SearchForm']['SEARCH'] = 'Rechercher';
$lang['fr_FR']['Security']['ALREADYLOGGEDIN'] = 'Vous n\'avez pas accès à cette page. Si vous avez un autre identifiant pouvant accéder à cette page, vous pouvez l\'utiliser ci-dessous.';
$lang['fr_FR']['Security']['BUTTONSEND'] = 'Envoyer moi le lien pour modifier le mot de passe';
$lang['fr_FR']['Security']['CHANGEPASSWORDBELOW'] = 'Vous pouvez modifier votre mot de passe ci-dessous.';
$lang['fr_FR']['Security']['CHANGEPASSWORDHEADER'] = 'Modifier votre mot de passe';
$lang['fr_FR']['Security']['EMAIL'] = 'E-Mail:';
$lang['fr_FR']['Security']['ENCDISABLED1'] = 'Cryptage du mot de passe désactivé!';
$lang['fr_FR']['Security']['ENCDISABLED2'] = 'Pour crypter vos mots de passe, changer les réglages du mot de passe en ajoutant';
$lang['fr_FR']['Security']['ENCDISABLED3'] = 'mysite/_config.php';
$lang['fr_FR']['Security']['ENCRYPT'] = 'Crypter tous les mots de passe';
$lang['fr_FR']['Security']['ENCRYPTEDMEMBERS'] = 'Qualifications cryptés pour les membres &quot;';
$lang['fr_FR']['Security']['ENCRYPTWITH'] = 'Les mots de passe seront cryptés en utilisant l\'algorithme &quot;%s&quot;';
$lang['fr_FR']['Security']['ENCRYPTWITHOUTSALT'] = 'sans clef pour améliorer la sécurité.';
$lang['fr_FR']['Security']['ENCRYPTWITHSALT'] = 'avec une clef pour améliorer la sécurité.';
$lang['fr_FR']['Security']['ENTERNEWPASSWORD'] = 'Entrer un nouveau mot de passe s\'il vous plaît.';
$lang['fr_FR']['Security']['ERRORPASSWORDPERMISSION'] = 'Vous devez être connecté pour modifier votre mot de passe !';
$lang['fr_FR']['Security']['ID'] = 'ID:';
$lang['fr_FR']['Security']['IPADDRESSES'] = 'Adresses IP';
$lang['fr_FR']['Security']['LOGGEDOUT'] = 'Vous avez été déconnecté. Si vous voulez vous reconnecter, entrer vos détaisl ci-dessous.';
$lang['fr_FR']['Security']['LOGIN'] = 'Connectez-vous';
$lang['fr_FR']['Security']['LOSTPASSWORDHEADER'] = 'Mot de passe perdu';
$lang['fr_FR']['Security']['NOTEPAGESECURED'] = 'Cette page est sécurisée. Entrer vos détails ci-dessous et nous vous enverrons directement.';
$lang['fr_FR']['Security']['NOTERESETPASSWORD'] = 'Entrer votre adresse email et nous vous enverrons un lien pour modifier votre mot de passe';
$lang['fr_FR']['Security']['NOTHINGTOENCRYPT1'] = 'Aucun mot de passe à crypter';
$lang['fr_FR']['Security']['NOTHINGTOENCRYPT2'] = 'Il n\'y a aucun membre avec un mot de passe qui pourrait être crypté';
$lang['fr_FR']['Security']['PASSWORDSENTHEADER'] = 'Le lien pour modifier le mot de passe a été envoyé à \'%s\'';
$lang['fr_FR']['Security']['PASSWORDSENTTEXT'] = 'Merci ! Le lien pour modifier le mot de passe a été envoyé à \'%s\'.';
$lang['fr_FR']['Security']['PERMFAILURE'] = 'Cette page est sécurisée et vous devez posséder les droits d\'administration pou l\'accéder. Entrez vos identifiants pour pouvoir poursuivre cette action.';
$lang['fr_FR']['SecurityAdmin']['ADVANCEDONLY'] = 'Cette section est seulement pour les utilisateurs avancés. Voir <a href="http://doc.silverstripe.com/doku.php?id=permissions:codes" target="_blank">cette page</a> pour plus d\'informations.';
$lang['fr_FR']['SecurityAdmin']['CODE'] = 'Code';
$lang['fr_FR']['SecurityAdmin']['GROUPNAME'] = 'Nom du group';
$lang['fr_FR']['SecurityAdmin']['IPADDRESSESHELP'] = '<p>Vous pouvez restreindre ce groupe à des classes d\'adressage IP. Entrez une classe par ligne. Une classe peut-être exprimée selon l\'un de ces 4 formats: <br />
203.96.152.12<br />
203.96.152/24<br />
203.96/16<br />
203/8<br /><br />
Si vous entrez une ou plusieurs classes dans ce champ, les membres ne pourront être reconnus en tant que tels que depuis l\'une de ces adresses, mais cela ne les empéchera pas de se logger depuis d\'autres lieu d\'Internet. Cela permet à l\'utilisateur de se logger en tout temps pour accéder à d\'autres parties du site non restreintes à des classes d\'adressage IP.';
$lang['fr_FR']['SecurityAdmin']['MEMBERS'] = 'Membres';
$lang['fr_FR']['SecurityAdmin']['OPTIONALID'] = 'ID Optionnelle';
$lang['fr_FR']['SecurityAdmin']['PERMISSIONS'] = 'Permissions';
$lang['fr_FR']['SecurityAdmin']['VIEWUSER'] = 'Voir les utilisateurs';
$lang['fr_FR']['SimpleImageField']['NOUPLOAD'] = 'Aucune image chargée';
$lang['fr_FR']['SiteTree']['ACCESSANYONE'] = 'Tout le monde';
$lang['fr_FR']['SiteTree']['ACCESSHEADER'] = 'Qui peut voir cette page sur mon site ?';
$lang['fr_FR']['SiteTree']['ACCESSLOGGEDIN'] = 'Les utilisateurs connectés';
$lang['fr_FR']['SiteTree']['ACCESSONLYTHESE'] = 'Seulement ces personnes ( Choisir à partir de la liste )';
$lang['fr_FR']['SiteTree']['ADDEDTODRAFT'] = 'Ajouté au site brouillon';
$lang['fr_FR']['SiteTree']['ALLOWCOMMENTS'] = 'Autoriser les commentaires sur cette page ?';
$lang['fr_FR']['SiteTree']['APPEARSVIRTUALPAGES'] = 'Ce contenu apparaît aussi sur les pages virtuelles dans les sections %s.';
$lang['fr_FR']['SiteTree']['BUTTONCANCELDRAFT'] = 'Annuler les changements brouillons';
$lang['fr_FR']['SiteTree']['BUTTONCANCELDRAFTDESC'] = 'Supprimer votre brouillon et remplacer par la page publiée';
$lang['fr_FR']['SiteTree']['BUTTONSAVEPUBLISH'] = 'Enregistrer & Publier';
$lang['fr_FR']['SiteTree']['BUTTONUNPUBLISH'] = 'Retirer du site publié';
$lang['fr_FR']['SiteTree']['BUTTONUNPUBLISHDESC'] = 'Retirer cette page du site publié';
$lang['fr_FR']['SiteTree']['CHANGETO'] = 'Changer pour';
$lang['fr_FR']['SiteTree']['CURRENT'] = 'actuel';
$lang['fr_FR']['SiteTree']['CURRENTLY'] = 'Actuellement';
$lang['fr_FR']['SiteTree']['DEFAULTABOUTCONTENT'] = '<p>Vous pouvez remplir cette page avec votre propre contenu ou supprimer celle-ci et créer vos propres pages.<br></p>';
$lang['fr_FR']['SiteTree']['DEFAULTABOUTTITLE'] = 'A propos de nous';
$lang['fr_FR']['SiteTree']['DEFAULTCONTACTCONTENT'] = '<p>Vous pouvez remplir cette page avec votre propre contenu ou supprimer celle-ci et créer vos propres pages.<br></p>';
$lang['fr_FR']['SiteTree']['DEFAULTCONTACTTITLE'] = 'Contactez-nous';
$lang['fr_FR']['SiteTree']['DEFAULTHOMECONTENT'] = '<p>Bienvenue sur SilverStripe! Ceci est la page d\'accueil par défaut. Vous pouvez modifier cette page dans <a href="admin/">le panneau administration</a> du CMS.  Vous pouvez accéder à la<a href="http://doc.silverstripe.com">documentation développeur</a>, ou commencer <a href="http://doc.silverstripe.com/doku.php?id=tutorials">les tutoriaux.</a></p>';
$lang['fr_FR']['SiteTree']['DEFAULTHOMETITLE'] = 'Accueil';
$lang['fr_FR']['SiteTree']['EDITANYONE'] = 'Toute personne pouvant se connecter au CMS';
$lang['fr_FR']['SiteTree']['EDITHEADER'] = 'Qui peut modifier ceci dans le CMS ?';
$lang['fr_FR']['SiteTree']['EDITONLYTHESE'] = 'Seulement ces personnes ( Choisir à partir de la liste )';
$lang['fr_FR']['SiteTree']['GROUP'] = 'Groupe';
$lang['fr_FR']['SiteTree']['HASBROKENLINKS'] = 'Cette page a des liens cassés.';
$lang['fr_FR']['SiteTree']['HOMEPAGEFORDOMAIN'] = 'Domaine(s)';
$lang['fr_FR']['SiteTree']['HTMLEDITORTITLE'] = 'Contenu';
$lang['fr_FR']['SiteTree']['LINKSALREADYUNIQUE'] = '%s est déjà unique';
$lang['fr_FR']['SiteTree']['LINKSCHANGEDTO'] = 'Modifié %s -> %s';
$lang['fr_FR']['SiteTree']['MENUTITLE'] = 'Nom de navigation';
$lang['fr_FR']['SiteTree']['METAADVANCEDHEADER'] = 'Options Avancées';
$lang['fr_FR']['SiteTree']['METADESC'] = 'Description';
$lang['fr_FR']['SiteTree']['METAEXTRA'] = 'Méta Balises Personnalisées';
$lang['fr_FR']['SiteTree']['METAHEADER'] = 'Méta-balises de recherche';
$lang['fr_FR']['SiteTree']['METAKEYWORDS'] = 'Mots clés';
$lang['fr_FR']['SiteTree']['METANOTEPRIORITY'] = 'Spécifier manuellement une priorité pour cette page : ( les valeurs valides sont entre 0 et , 0 supprimera la page de l\'index )';
$lang['fr_FR']['SiteTree']['METAPAGEPRIO'] = 'Priorité de la Page';
$lang['fr_FR']['SiteTree']['METATITLE'] = 'Titre';
$lang['fr_FR']['SiteTree']['MODIFIEDONDRAFT'] = 'Modifié sur le site brouillon';
$lang['fr_FR']['SiteTree']['NOBACKLINKS'] = 'Aucune page n\'a de liens vers cette page.';
$lang['fr_FR']['SiteTree']['NOTEUSEASHOMEPAGE'] = 'Utiliser cette page comme \'page d\'accueil\' pour les domaines suivants : ( séparer les domaines par des virgules )';
$lang['fr_FR']['SiteTree']['PAGESLINKING'] = 'Cette page est liée par les pages suivantes :';
$lang['fr_FR']['SiteTree']['PAGETITLE'] = 'Nom de la page';
$lang['fr_FR']['SiteTree']['PAGETYPE'] = 'Type de page';
$lang['fr_FR']['SiteTree']['PRIORITYLEASTIMPORTANT'] = 'Moins importante';
$lang['fr_FR']['SiteTree']['PRIORITYMOSTIMPORTANT'] = 'Plus importante';
$lang['fr_FR']['SiteTree']['PRIORITYNOTINDEXED'] = 'Non indexé';
$lang['fr_FR']['SiteTree']['REMOVEDFROMDRAFT'] = 'Supprimé du site brouillon';
$lang['fr_FR']['SiteTree']['SHOWINMENUS'] = 'Afficher dans les menus ?';
$lang['fr_FR']['SiteTree']['SHOWINSEARCH'] = 'Afficher dans les recherches ?';
$lang['fr_FR']['SiteTree']['TABACCESS'] = 'Accès';
$lang['fr_FR']['SiteTree']['TABBACKLINKS'] = 'Liens de retour';
$lang['fr_FR']['SiteTree']['TABBEHAVIOUR'] = 'Comportement';
$lang['fr_FR']['SiteTree']['TABCONTENT'] = 'Contenu';
$lang['fr_FR']['SiteTree']['TABMAIN'] = 'Principal';
$lang['fr_FR']['SiteTree']['TABMETA'] = 'Méta-données';
$lang['fr_FR']['SiteTree']['TABREPORTS'] = 'Rapports';
$lang['fr_FR']['SiteTree']['TODOHELP'] = '<p>Vous pouvez utiliser ceci pour garder une trace du travail qui doit être effectué sur le contenu de votre site. Pour voir toutes les pages qui ont un "A faire", ouvrez le \'Rapport de site\' sur la fenêtre de gauche et sélectionnez \' A faire\'</p>';
$lang['fr_FR']['SiteTree']['TOPLEVEL'] = 'Contenu du Site ( Premier Niveau )';
$lang['fr_FR']['SiteTree']['URL'] = 'URL';
$lang['fr_FR']['SiteTree']['VALIDATIONURLSEGMENT1'] = 'Une autre page utilise cette URL. L\'URL doit être unique pour chaque page';
$lang['fr_FR']['SiteTree']['VALIDATIONURLSEGMENT2'] = 'Les URLs ne peuvent contenir que des lettres, chiffres et tirets.';
$lang['fr_FR']['TableField']['ISREQUIRED'] = 'Dans %s, \'%s\' est requis.';
$lang['fr_FR']['TableField.ss']['ADD'] = 'Ajouter une nouvelle ligne';
$lang['fr_FR']['TableField.ss']['CSVEXPORT'] = 'Exporter vers CSV';
$lang['fr_FR']['TableListField']['CSVEXPORT'] = 'Exporter vers un fichier CSV';
$lang['fr_FR']['TableListField']['PRINT'] = 'Imprimer';
$lang['fr_FR']['TableListField_PageControls.ss']['DISPLAYING'] = 'Afficher';
$lang['fr_FR']['TableListField_PageControls.ss']['OF'] = 'de';
$lang['fr_FR']['TableListField_PageControls.ss']['TO'] = 'à';
$lang['fr_FR']['TableListField_PageControls.ss']['VIEWFIRST'] = 'Voir le(s) premier(s)';
$lang['fr_FR']['TableListField_PageControls.ss']['VIEWLAST'] = 'Voir le(s) dernier(s)';
$lang['fr_FR']['TableListField_PageControls.ss']['VIEWNEXT'] = 'Voir le(s) suivant(s)';
$lang['fr_FR']['TableListField_PageControls.ss']['VIEWPREVIOUS'] = 'Voir le(s) précédent(s)';
$lang['fr_FR']['ToggleCompositeField.ss']['HIDE'] = 'Cacher';
$lang['fr_FR']['ToggleCompositeField.ss']['SHOW'] = 'Afficher';
$lang['fr_FR']['ToggleField']['LESS'] = 'moins';
$lang['fr_FR']['ToggleField']['MORE'] = 'plus';
$lang['fr_FR']['Translatable']['CREATE'] = 'Créer une nouvelle traduction';
$lang['fr_FR']['Translatable']['CREATEBUTTON'] = 'Créer';
$lang['fr_FR']['Translatable']['EXISTING'] = 'Traductions existantes:';
$lang['fr_FR']['Translatable']['NEWLANGUAGE'] = 'Nouveau langage';
$lang['fr_FR']['Translatable']['TRANSLATIONS'] = 'Traductions';
$lang['fr_FR']['TreeSelectorField']['CANCEL'] = 'annuler';
$lang['fr_FR']['TreeSelectorField']['SAVE'] = 'sauver';
$lang['fr_FR']['TypeDropdown']['NONE'] = 'Aucun';
$lang['fr_FR']['VirtualPage']['CHOOSE'] = 'Choisir le lien d\'une page';
$lang['fr_FR']['VirtualPage']['EDITCONTENT'] = 'cliquer ici pour modifier le contenu';
$lang['fr_FR']['VirtualPage']['HEADER'] = 'Cette page est virtuelle';

?>