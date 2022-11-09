$(function() {

    var recordId = localStorage.getItem("SalesOrderId_ForContact");
    if (recordId != 'undefined' || !String.isNullOrWhiteSpace(recordId)) {
        $.get('/set/contact/detail/' + recordId,
            function(r) {
                if (r) {
                    $('#modalSoldUnsold').remove();
                    window.setModal.Create({
                        id: 'modalSoldUnsold',
                        html: {
                            content: 'style="width:900px !important"',
                            header: 'Bilgi Aktarımı',
                            body: '<div id="msg" width: 10%;font-size:15px;"></div>' +
                                '<table class="table">' +
                                '<tbody>' +
                                '<div id="txt" style="margin:0 0 5px; width: 50%;">Bilgiler aktarılıyor, lütfen bekleyiniz..<br/> <img src="/Public/img/loading_bar.gif"></div>' +
                                '</tbody>' +
                                '</table>',
                            footer: '<button type="button" class="btn btn-sm btn-default" data-dismiss="modal">Kapat</button>'
                        }
                    });

                    $('#modalSoldUnsold .modal-dialog').css('width', '30%');
                    $('#modalSoldUnsold').modal('toggle');

                    var elem = $('<div/>').html(r);
                    var fullName = elem.find('label[for=CC91A13828A648E79DE9A320CE91B35E]').parent().data('value');;
                    var PatientId = elem.find('label[for=58E2FDBF25C74982B93FC1641F81EB44]').parent().data('value');;
                    var spokenLanguageId = elem.find('label[for=C45A8DFB45AF4C4CBC24F8CA9A1A853B]').parent().data('publicids');
                    var spokenLanguageText = elem.find('label[for=C45A8DFB45AF4C4CBC24F8CA9A1A853B]').parent().data('value');
                    var countryId = elem.find('label[for=C90D21C6FE3F4F37A848D4923E2CE6D9]').parent().data('publicids');
                    var countryText = elem.find('label[for=C90D21C6FE3F4F37A848D4923E2CE6D9]').parent().data('value');

                    var contactText = fullName + " - " + PatientId;

                    if (!String.isNullOrWhiteSpace(spokenLanguageId) && !String.isNullOrWhiteSpace(spokenLanguageText)) {
                        $('#2B53282D07E7480B9B251DA97D6082E6').select2('data', {
                            id: spokenLanguageId,
                            text: spokenLanguageText
                        }).trigger('change');
                    }

                    if (!String.isNullOrWhiteSpace(countryId) && !String.isNullOrWhiteSpace(countryText)) {
                        $('#46F18CD48FD44E1C9D7474C09E58A2B1').select2('data', {
                            id: countryId,
                            text: countryText
                        }).trigger('change');
                    }
                    $('#74BD68A53DAB493591553CD16661CD77').select2('data', {
                        id: recordId,
                        text: contactText
                    }).trigger('change');


                }

                localStorage.removeItem("SalesOrderId_ForContact");
                $('#modalSoldUnsold').modal('toggle');

            });
    }

});