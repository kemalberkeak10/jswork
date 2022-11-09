$(function() {
    // var filtreId = $('#ViewFilterPublicId').val();
    // if (filtreId == '873FDD4124E343EDBE8EF0221CCDC7E1') {
    //     $('.well .pull-right:eq(0)').prepend("<a id='btnTeklifAlExcel' class='btn btn-sm btn-success pull-left'  style='margin-right:10px;'>Teklif Al</a>");
    // }
    var filterName = $('#FilterButtonWrapper span').text();
    if (filterName.includes('Takibe Alınan Cihazlar Listesi')) {
        $('.well .pull-right:eq(0)').prepend("<a id='btnTeklifAlExcel' class='btn btn-sm btn-success pull-left'  style='margin-right:10px;'>Teklif Al</a>");
    }
    var recordListTopluTeklif = [];
    $('body').on('click', '#btnTeklifAlExcel', function() {
        var isExistTeklif = false;
        var chcListTeklif = $('.sec');
        $.each(chcListTeklif, function(i, el) {
            if ($(this).prop('checked')) {
                isExistTeklif = true;
                var recordId = $(this).parents('tr').attr('data-id');
                recordListTopluTeklif.push(recordId);
            }
        });
        if (!isExistTeklif) {
            alert("Bu işlemi gerçekleştirmek için en az bir kayıt seçmelisiniz.");
        } else {
            $('#modalTeklifAlExcel').remove();
            window.setModal.Create({
                id: 'modalTeklifAlExcel',
                html: {
                    header: 'Teklif Al',
                    body: '<div id="txt" style="margin:0 0 5px; width: 100%;"></div>' +
                        '<style>.call-animation{background:#fff;width:135px;text-align: center;font-size: 16px;height:135px;position:relative;margin:0 auto;border-radius:100%;border:solid 5px #82b74b;animation:play 2s ease infinite;-webkit-backface-visibility:hidden;-moz-backface-visibility:hidden;-ms-backface-visibility:hidden;backface-visibility:hidden}.call-animation i{font-size: 80px;display: flex;justify-content: center;margin-top: 19px;}@keyframes play{0%{transform:scale(1)}15%{box-shadow:0 0 0 5px ##82b74b}25%{box-shadow:0 0 0 10px #82b74b,0 0 0 20px #82b74b}25%{box-shadow:0 0 0 15px #82b74b,0 0 0 30px #82b74b}}</style><div class="call-animation"><i class="fa fa-file-excel img-circle" style="color:#82b74b"></i></div><br><div id="msg" style="margin:10px 0 0 0;text-align:center;">Excel oluşturuluyor, lütfen bekleyiniz...</div>' +
                        '<table id=modalTable class="table" style="width: 100%">' +
                        '<tbody>' +
                        '<tr>' +
                        '<td id="selectTopluCihaz1" colspan="1" rowspan="1"><label>Kalibrasyon Firması</label></br><input id="kalibrasyonFirmaSelect" type="select"  style="resize:none;width:100%;"></td>' +
                        '</tr>' +
                        '</tbody>' +
                        '</table>' +
                        '<table id=modalTable class="table" style="width: 100%">' +
                        '<tbody>' +
                        '<tr>' +
                        '<td id="selectTopluCihaz2" colspan="1" rowspan="1"><label>Kalibrasyon Laboratuvar Sorumlusu</label></br><input id="kalibrasyonSorumluSelect" type="select"  style="resize:none;width:100%;"></td>' +
                        '</tr>' +
                        '</tbody>' +
                        '</table>' +
                        '</table>' +
                        '<table id=modalTable class="table" style="width: 100%">' +
                        '<tbody>' +
                        '<tr>' +
                        '<td id="selectTopluCihaz3" colspan="1" rowspan="1"><label>Dil</label></br><input id="dilSelect" type="select"  style="resize:none;width:100%;"></td>' +
                        '</tr>' +
                        '</tbody>' +
                        '</table>',
                    footer: '<button id="btnKaydetTTopluTeklif" type="button" class="btn btn-sm btn-success" >Kaydet</button>' + '<button class="btn btn-sm btn-default" data-dismiss="modal">Kapat</button>',
                }
            });
            $('.call-animation').hide();
            $('#msg').hide();
            $('#modalTeklifAlExcel').modal('toggle');

            // https://maya-inklab.tr152.corpintra.net/Summary/LookupFieldValues?coId=273E316370484FB5BA4F46A2AE6BC9D4&id=3E5D2896797043739C434A7172E3CF90&viewFilterId=6BEDE514767A48F6AC60AB86AEF7626A&pageSize=8&q=&pageNumber=1&_=1645603331326

            // canli
            prepareSelect2(
                "#kalibrasyonFirmaSelect",
                "/Summary/LookupFieldValues", {
                    coId: "273E316370484FB5BA4F46A2AE6BC9D4",
                    id: "3E5D2896797043739C434A7172E3CF90",
                    viewFilterId: "6BEDE514767A48F6AC60AB86AEF7626A",
                },
                null,
                false
            );

            // prepareSelect2(
            //     "#kalibrasyonFirmaSelect",
            //     "/Summary/LookupFieldValues", {
            //         coId: "5D3C3682F6CC4CC3AC97E283AF1F239F",
            //         id: "801CDAA610C2415C90A001E1A83F0663",
            //         viewFilterId: "749B99563F4A43378E25375EF4E8364D",
            //     },
            //     null,
            //     false
            // );

            //    https://maya-inklab.tr152.corpintra.net/summary/organizationalunititems?publicId=C0CB6133954A4458A808FA3DE6BC8D93&name=User&filterType=User&groupIds=&depth=1&includeItSelf=False&pageSize=8&q=&pageNumber=1&_=1645603331325

            prepareSelect2('#kalibrasyonSorumluSelect',
                '/summary/organizationalunititems', {
                    publicId: 'C0CB6133954A4458A808FA3DE6BC8D93',
                    name: 'User',
                    filterType: 'User',
                    groupIds: null,
                    depth: 1,
                    includeItSelf: false
                }, null, false);

            // prepareSelect2(
            //     "#kalibrasyonSorumluSelect",
            //     "/Summary/LookupFieldValues", {
            //         coId: "5D3C3682F6CC4CC3AC97E283AF1F239F",
            //         id: "801CDAA610C2415C90A001E1A83F0663",
            //         viewFilterId: "749B99563F4A43378E25375EF4E8364D",
            //     },
            //     null,
            //     false
            // );

            // https://maya-inklab.tr152.corpintra.net/summary/fielditems?id=7D3BADF68C1A4A7999CB4939D47925CC&pageSize=8&q=&pageNumber=1&_=1645603331324

            // prepareSelect2('#dilSelect', '/summary/fielditems', { id: '7D3BADF68C1A4A7999CB4939D47925CC' }, null, null);
            var headerViewData2 = [{
                    id: 'EA8B2DF8483D4051A27BDD27CFCB8473',
                    text: 'Türkçe'
                },
                {
                    id: 'E482ABCB4EB845CDAD5283F63629B28E',
                    text: 'İngilizce'
                },
            ];
            prepareSelect2WithData('#dilSelect', headerViewData2);

        };
    });

    $('body').on('click',
        '#btnKaydetTTopluTeklif',
        function() {
            $('.modal-footer').hide();
            var firmaVal = $('#kalibrasyonFirmaSelect').val();
            var sorumluVal = $('#kalibrasyonSorumluSelect').val();
            var dilVal = $('#dilSelect').val();
            var data = {
                CustomObjectId: $('#CustomObjectPublicId').val(),
                FirmaId: firmaVal,
                SorumluId: sorumluVal,
                DilId: dilVal,
                UserId: userData.id,
                FileName: "Teklif_Cihazlari",
                Fields: recordListTopluTeklif,
            }
            $('#selectTopluCihaz1').hide();
            $('#selectTopluCihaz2').hide();
            $('#selectTopluCihaz3').hide();
            $('#msg').show();
            $('.call-animation').show();
            var url = 'https://webapi-inklab.tr152.corpintra.net/api/data/TeklifAlExcelOlustur';
            $.post(url, data, function(r) {
                if (r.Status) {
                    $('#msg').hide();
                    $('.call-animation').hide();
                    setUtil.alert({
                        container: '#modalTeklifAlExcel .modal-body #txt',
                        message: "işleminiz başarıyla tamamlandı. Sayfa yenileniyor lütfen bekleyiniz...",
                        alertClass: 'alert-success',
                        autoClose: true
                    });
                    window.location.reload();
                } else {
                    $('#msg').hide();
                    $('.call-animation').hide()();
                    setUtil.alert({
                        container: '#modalTeklifAlExcel .modal-body #txt',
                        message: r.Message,
                        alertClass: 'alert-danger',
                        autoClose: false
                    });
                }
            });
        });
});