$(document).ready(function(){

    $('#optionsfeldRadio1').click(function(){
        $('#eingabePreissofort').attr('disabled','disabled');
        $("#eingabePreis").removeAttr('disabled');
        $('#eingabePreissofort').val('');
    });

    $('#optionsfeldRadio2').click(function(){
        $("#eingabePreissofort").removeAttr('disabled');
        $("#eingabePreis").removeAttr('disabled');
    });

    $('#optionsfeldRadio3').click(function(){
        $('#eingabePreis').attr('disabled','disabled');
        $("#eingabePreissofort").removeAttr('disabled');
        $('#eingabePreis').val('');
    });

    $.validator.addMethod("lettersandwhitespace", function(value, element) {
        return this.optional(element) || /^[a-z \-]+$/i.test(value);
    }, ".");

    $.validator.addMethod("lettersandnumb", function(value, element) {
        return this.optional(element) || /^[a-z0-9 \-]+$/i.test(value);
    }, "Bitte gebe nur zahlen und buchstaben ein");

    $('#Verkaufen-form').validate({
        rules:{
            titel:{
                required: true,
                lettersandnumb: true,
                minlength: 6
            },
            text:{
              required: true,
                minlength: 20
            },
            price:{
                number: true,
                required: true
            },
            pricenow:{
                number: true,
                required: true
            },
            plz:{
                required: true,
                postalcodeIT: true,
                nowhitespace: true
            },
            ort:{
                required: true,
                lettersandwhitespace: true,
                minlength: 6
            },
            radioprice:{
                required: true
            }

        },
        messages:{
            titel:{
                required: "bitte gebe ein Titel ein",
                lettersandwhitespace: "Bitte gebe einen gueltigen Titel ein",
                minlength: "Der Titel muss mindestens 6 Zeichen lang sein"
            },
            text:{
                required: "Bitte gebe eine Beschriebung ein",
                minlength: "Bitte gebe mindestens 20 Zeichen ein"
            },
            price:{
                number: "Bitte gebe einen gueltigen Preis ein"
            },
            pricenow:{
                number: "Bitte gebe einen gueltigen Preis ein"
            },
            plz:{
                required: 'Bitte gebe deine Postleitzahl ein',
                nowhitespace: "Leerzeichen sind nicht erlaubt",
                postalcodeIT: "Bitte gebe deine Postleitzahl ein"
            },
            ort:{
                required: "Bitte gebe einen Ort ein",
                lettersandwhitespace: "Bitte gebe einen gueltigen Ort ein",
                minlength: "mindestens 6 Buchstaben"
            },
            radioprice:{
                required: "Bitte waehle eine Gebots-Art aus"
            }
        },

        errorElement: "em",
        errorPlacement: function ( error, element ) {
            error.addClass( "help-block" );
            element.parents( ".feedback" ).addClass( "has-feedback" );
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
            $( element ).parents( ".feedback" ).addClass( "has-error" ).removeClass( "has-success" );
            $( element ).next( "span" ).addClass( "glyphicon-remove" ).removeClass( "glyphicon-ok" );
        },
        unhighlight: function (element, errorClass, validClass) {
            $( element ).parents( ".feedback" ).addClass( "has-success" ).removeClass( "has-error" );
            $( element ).next( "span" ).addClass( "glyphicon-ok" ).removeClass( "glyphicon-remove" );
        }
    });
});