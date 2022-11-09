$(function() {
    //var leadAta = $('label[for=D9C63AAB419F45D192BBB954ECABF54A]').parent().data('value');
    //if (leadAta == 'False') {
    $('.well .pull-right:eq(0)').prepend('<a id="btnAtama" class="btn btn-sm btn-success"  style="margin-right:10px;" >Üzerine Al</a>');
    //}
    $('body').on('click', '#btnAtama1', function() {
        $('#modalMtAta').remove();
        window.setModal.Create({
            id: 'modalMtAta',
            html: {
                header: ' ',
                body: '<div id="txt" style="margin:0 0 5px; width: 100%;">İşleminiz Yapılıyor, lütfen bekleyiniz..<br/> <img src="/Public/img/loading_bar.gif"></div>',
                footer: ''
            }
        });

        $('#mtAktarModal').remove();
        window.setModal.Create({
            id: 'mtAktarModal',
            html: {
                header: 'Müşteri Temsilcisine Ata',
                body: '',
                footer: '<button type="button" class="btn btn-default  btn-sm pull-right"  data-dismiss="modal" >Kapat</button>' +
                    '<button type="button" id="btnMusteriAtama" class="btn btn-sm btn-success pull-right" style="margin-right:5px">Müşteri Temsilcisine Ata</button>'
            }
        });
        debugger;
        var vfId = "0238B5B0D8A54C94B80B7C4422A3B95A";
        var coId = "40B2C5F45222443197FA7FE6A1D1EF11";

        var url = 'https://nefwebapi.setcrm.com/api/data/VfOkuma?coId=' + coId + '&vfId=' + vfId;
        var localurl = 'https://localhost:44305/api/data/VfOkuma?coId=' + coId + '&vfId=' + vfId;

        $('#mtAktarModal .modal-body').html('<div id="msg" ></div>' +
            '<input id="inputRiskSearch" class="form-control" type="text" style="margin-bottom:10px;" value="" tabindex="-1" placeholder="Kullanıcı Ara">' +
            '<div id="cihazlar" ></div>');
        $('#mtAktarModal .modal-body').css('max-height', '');
        $('#mtAktarModal .modal-body').css('height', '300px');
        $('#mtAktarModal .modal-dialog').css('width', '50%');

        // $.get(url, function(r) {
        //     debugger;
        //     if (r.IsOk === true) {
        //         $('#newTbl thead').html('');
        //         $('#newTbl tbody').html('');
        //         var newTbl = $('<table id="newTbl" class="table table-bordered table-hover" style="width: 100%;overflow-x: scroll" />');
        //         var thead = $('<thead />');
        //         var newRow = $('<tr  style="background-color:lightblue;"/>');
        //         newRow.append($('<th style="text-align: centre; width: 50px; background-color:lightblue;position: sticky;top: 0;z-index: 5;" "/>').text('Seçim'));
        //         newRow.append($('<th style="text-align: left; background-color:lightblue;position: sticky;top: 0;z-index: 5;" "/>').text('Ad Soyad'));
        //         thead.append(newRow);
        //         newTbl.append(thead);
        //         var tbody = $('<tbody />');
        //         $.each(r.Records, function(i, v) {
        //             debugger;
        //             var yetkiGrubu = v.Values.first('FieldPublicId', '8AD924F2682045B482D37077B9090B88').Value;
        //             var check = false;

        //             if (yetkiGrubu == "Çağrı Merkezi Temsilcisi") {
        //                 var adSoyad = v.Values.first('FieldPublicId', '5038F50F45414A0DB32C9CF192ED9AEF').Value;
        //                 var newRow = $('<tr />').attr('data-id', v.PublicId);

        //                 if (toBool(check)) {
        //                     newRow.append($('<td style="text-align: left;" />').append(''));
        //                 } else {
        //                     newRow.append($('<td style="text-align: left;" />').append($('<input />', {
        //                         'id': 'chkTablo',
        //                         'name': 'chkTablo',
        //                         'value': '',
        //                         'type': 'checkbox',
        //                         'style': 'margin; auto;',
        //                     })));
        //                 }
        //                 newRow.append($('<td style="text-align: left;" />').text(adSoyad));
        //                 tbody.append(newRow);
        //                 newTbl.append(tbody);

        //             } else {
        //                 //continue;
        //             }
        //         });
        //         $('#mtAktarModal').find('.modal-body #cihazlar').append(newTbl);
        //         $('#mtAktarModal').modal('toggle');

        //     } else {
        //         $('#mtAktarModal').find('#msg').text(r.Message);
        //     }

        // });
        $("body").on("keyup",
            '#inputRiskSearch',
            function() {
                var trList = $('#newTbl tbody tr');
                var value = $(this).val().toLowerCase();
                trList.filter(function() {
                    $(this).toggle($(this).find('td:eq(1)').text().trim().toLowerCase().indexOf(value) > -1);
                });

            });
    });

    // $(document).on('click', 'input[type="checkbox"]', function() {
    //     $('input[type="checkbox"]').not(this).prop('checked',
    //         false);
    // });

    $('body').on('click', '#btnAtama', function() {
        debugger;
        var items = [];
        var itemsChecked = [];
        var tblData2 = $('#mtAktarModal tbody tr input#chkTablo:checked');
        var tblData = $('#mtAktarModal tbody tr');
        notify("warning", "İşleminiz yapılıyor. Lütfen bekleyiniz.")
            // if (tblData2.length == 1) {

        // tblData2.each(function(i, v) {
        //     var tr = $(this).closest('tr');
        //     itemsChecked.push(
        //         tr.data('id')
        //     );
        // });

        //    if (tblData.length > 0) {

        //  console.log(itemsChecked);

        $('#mtAktarModal').modal('toggle');
        itemsChecked.push(userData.email)

        var model = {
                RecordId: $('#RecordPublicId').val(),
                ProjeId: $('label[for=E54A861EAE3646BDB6BE309C8C783BC0]').parent().data('publicids'),
                CheckedList: itemsChecked,
            }
            //    }
        console.log(model);
        var localUrl = 'https://localhost:44305/api/data/MtAtama';
        var realUrl = 'https://nefwebapi.setcrm.com/api/data/MtAtama';
        $.post(realUrl, model, function(r) {
            if (r.Status) {
                debugger;
                var data = {};
                var leadList = [];
                leadList.push($('#RecordPublicId').val());
                data = {
                    RecordId: userData.id,
                    CheckedList: leadList,
                    LeadDevredildimi: false,
                    Mail: userData.email
                };
                console.log(data);
                var localUrl = 'https://localhost:44305/api/data/TopluMtAtama';
                var realUrl = 'https://nefwebapi.setcrm.com/api/data/TopluMtAtama';
                $.post(realUrl,
                    data,
                    function(r) {
                        if (r.Status) {
                            notify("success", "Islem basarili, sayfa yenileniyor...");
                            setTimeout(function() {
                                window.location.reload();
                            }, 1000);
                        } else {
                            notify("danger", r.Message);
                        }
                    });

            } else {
                notify("danger", r.Message);
            }
        });
        // } else if (tblData2.length > 1) {
        //     setUtil.alert({
        //         container: '#mtAktarModal .modal-body #msg',
        //         message: 'Lütfen yalnızca 1 tane Lead seçiniz..',
        //         alertClass: 'alert-danger',
        //         autoClose: true
        //     });
        // } else {
        //     setUtil.alert({
        //         container: '#mtAktarModal .modal-body #msg',
        //         message: 'En az 1 tane Lead seçiniz..',
        //         alertClass: 'alert-danger',
        //         autoClose: true
        //     });
        // }
    });

    function notify(type, message) {
        $.notify({
            icon: type === "success" ? 'fas fa-check-double' : 'fas fa-times-circle',
            message: message
        }, {
            z_index: '9999999',
            type: type,
            placement: {
                from: "top",
                align: "right"
            },
            offset: 50,
            animate: {
                enter: 'animated flipInY',
                exit: 'animated flipOutX'
            },
        });
    }

});