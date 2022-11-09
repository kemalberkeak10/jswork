$(function() {
    var stagesPanelStage = $('label[for=37BA8E5CBDB6446FBDFFA9D5B2FC3C68]').parent().data('publicids');
    if (stagesPanelStage == "" || stagesPanelStage == "343B5102AA454C60861F431696D6DB3C") { //waitingfordetails
        $('#btnDetailsReceiev').hide();
        $('#requestdiagnosis').hide();
        $('#btnNegotiation').hide();
        $('#btnDecision').hide();
        $('#btnOfferStage').hide();
    } else if (stagesPanelStage == "2CC0ADFABEF94DD7A8EEC7F2C4952A6F") { //detailsreceived
        $('#btnWaitingForDetails').hide();
        $('#requestdiagnosis').hide();
        $('#btnNegotiation').hide();
        $('#btnDecision').hide();
        $('#btnOfferStage').hide();
    } else if (stagesPanelStage == "DBC909DAFE8D46D68418868807F3CA7E") { //requestdiagnosis
        $('#btnWaitingForDetails').hide();
        $('#btnDetailsReceiev').hide();
        $('#btnNegotiation').hide();
        $('#btnDecision').hide();
        $('#btnOfferStage').hide();
    } else if (stagesPanelStage == "58156FDCF1E74006ADFD89A037E3872B") { //offerstage
        $('#btnWaitingForDetails').hide();
        $('#btnDetailsReceiev').hide();
        $('#requestdiagnosis').hide();
        $('#btnNegotiation').hide();
        $('#btnDecision').hide();
    } else if (stagesPanelStage == "094A3B6806994EBABB4D0EE4A4C2F1B6") { //negation
        $('#btnWaitingForDetails').hide();
        $('#btnDetailsReceiev').hide();
        $('#requestdiagnosis').hide();
        $('#btnDecision').hide();
        $('#btnOfferStage').hide();
    } else if (stagesPanelStage == "8A3EA0E7DCE041458EBF59FCE50F9CBE") { //decision
        $('#btnWaitingForDetails').hide();
        $('#btnDetailsReceiev').hide();
        $('#requestdiagnosis').hide();
        $('#btnNegotiation').hide();
        $('#btnOfferStage').hide();
    } else if (stagesPanelStage == "D02E48FED56141A4A73CCBCEE024414B") { //allhide
        $('#btnWaitingForDetails').hide();
        $('#btnDetailsReceiev').hide();
        $('#requestdiagnosis').hide();
        $('#btnNegotiation').hide();
        $('#btnOfferStage').hide();
        $('#btnDecision').hide();
    }
});