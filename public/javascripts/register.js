
$(document).ready(function(){

    $.validator.addMethod("check_date_of_birth", function (value, element) {
        if (this.optional(element)) {
            return true;
        }
        var dateOfBirth = value;
        var arr_dateText = dateOfBirth.split("/");
        day = arr_dateText[0];
        month = arr_dateText[1];
        year = arr_dateText[2];
        var mydate = new Date();
        mydate.setFullYear(year, month - 1, day);
        var maxDate = new Date();
        maxDate.setYear(maxDate.getYear() - 18);
        if(maxDate < mydate) {
            return false;
        }
        return true;
    }, 'Du musst mindestens 18 Jahte alt sein');

    $.validator.addMethod( "letterswithbasicpunc", function( value, element ) {
        return this.optional( element ) || /^[a-z0-9\-.,()'"\s]+$/i.test( value );
    }, "Letters or punctuation only please" );

    $.validator.addMethod("lettersandwhitespace", function(value, element) {
        return this.optional(element) || /^[a-z \-]+$/i.test(value);
    }, "Bitte gebe eine gültige Hausnummer ein");

    $('#Registrieren-form').validate({
        rules:{
            email: {
                remote: "http://localhost:3000/checkemail"
            },
            username: {
                remote: "http://localhost:3000/checkusername",
                nowhitespace: true,
                minlength: 6,
                letterswithbasicpunc: true
            },
            password:{
                minlength: 6
            },
            password2: {
                equalTo: "#password"
            },
            name1:{
                minlength: 3,
                lettersonly: true
            },
            lastname: {
                minlength: 3,
                lettersonly: true
            },
            street: {
                minlength: 6,
                lettersandwhitespace: true
            },
            housenumber: {
                number: true,
                nowhitespace: true
            },
            place: {
                minlength: 3,
                lettersandwhitespace: true
            },
            zip:{
                nowhitespace: true,
                postalcodeIT: true
            },
            phonenumber:{
                number: true
            },
            agb:{
                required: true
            },
            gender:{
                required: true
            },
            bday:{
                dateITA: true,
                check_date_of_birth: true
            }
        },
        messages: {
            email: {
                required: 'Bitte gebe deine E-mail Adresse ein',
                email: 'Bitte gebe eine gueltige E-mail Adresse ein',
                remote: "Unter dieser E-mail existiert bereits ein Account."
            },
            username:{
                required: 'Bitte gebe ein Benutzernamen ein',
                nowhitespace: 'Leerzeichen sind nicht erlaubt',
                letterswithbasicpunc: "Nur diese Sonderzeichen sind erlaubt: -.,()'",
                minlength: "Mindestens 6 Zeichen",
                remote: "Diesen Benutzernamen ist schon vergeben"
            },
            password: {
                required: 'Bitte gebe ein Passwort ein',
                minlength: "Das Passwort muss mindestens 6 Zeichen lang sein"
            },
            password2: {
                required: 'Bitte gebe erneut dein Passwort ein',
                equalTo: 'Bitte gebe das gleiche Passwort erneut ein'
            },
            name1:{
                required: 'Bitte gebe deinen Vornamen ein',
                lettersonly: "Bitte gebe einen gueltigen Namen ein",
                minlength: "Der Name muss mindestens 3 Buchstaben lang sein"
            },
            lastname:{
                required: 'Bitte gebe deinen Nachnamen ein',
                lettersonly: "Bitte gebe einen gueltigen Namen ein",
                minlength: "Der Nachname muss mindestens 3 Buchstaben lang sein"
            },
            street:{
                required: 'Bitte gebe deine Strasse ein',
                lettersandwhitespace: "Bitte gebe eine gueltige Strasse ein",
                minlength: "Die Strasse muss mindestens 6 Buchstaben lang sein"
            },
            housenumber:{
                required: 'Bitte gebe deine Hausnummer ein',
                nowhitespace: "Leerzeichen sind nicht erlaubt",
                number: "Nur Zahlen sind hier erlaubt"
            },
            place: {
                required: 'Bitte gebe deinen Ort ein',
                lettersandwhitespace: "Bitte gebe einen gueltigen Ort ein",
                minlength: "Mindestens 3 Zeichen"
            },
            zip:{
                required: 'Bitte gebe deine Postleitzahl ein',
                nowhitespace: "Leerzeichen sind nicht erlaubt",
                postalcodeIT: "Bitte gebe deine Postleitzahl ein"
            },
            phonenumber:{
                number: "Hier sind nur Zahlen erlaubt"
            },
            agb:{required: "Bitte akzptiere die AGB's"},
            gender:{required: "Waehle dein Geschlecht aus"},
            bday:{
                required: "Bitte gebe dein  Geburtsdatum an. TT/MM/JJJJ",
                dateITA: "Bitte gebe ein gueltiges datum ein: TT/MM/JJJJ"
            }
        },

        errorElement: "em",
        errorPlacement: function ( error, element ) {
            error.addClass( "help-block" );
            element.parents( ".col-sm-5, .col-sm-3, .col-sm-2" ).addClass( "has-feedback" );
            if ( element.prop( "type" ) === "checkbox" || element.prop( "type" ) === "radio" ) {
                error.insertAfter( element.parent( "label" ) );
            } else {
                error.insertAfter( element );
            }
            if ( !element.next( "span" )[ 0 ] ) {
                $( "<span class='glyphicon glyphicon-remove form-control-feedback'></span>" ).insertAfter( element );
            }
        },
        success: function ( label, element ) {
            if ( !$( element ).next( "span" )[ 0 ] ) {
                $( "<span class='glyphicon glyphicon-ok form-control-feedback'></span>" ).insertAfter( $( element ) );
            }
        },
        highlight: function ( element, errorClass, validClass ) {
            $( element ).parents( ".col-sm-5, .col-sm-3, .col-sm-2, .checkbox" ).addClass( "has-error" ).removeClass( "has-success" );
            $( element ).next( "span" ).addClass( "glyphicon-remove" ).removeClass( "glyphicon-ok" );
        },
        unhighlight: function (element, errorClass, validClass) {
            $( element ).parents( ".col-sm-5, .col-sm-3, .col-sm-2, .checkbox" ).addClass( "has-success" ).removeClass( "has-error" );
            $( element ).next( "span" ).addClass( "glyphicon-ok" ).removeClass( "glyphicon-remove" );
        }
    });
});