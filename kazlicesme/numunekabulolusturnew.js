$(function() {
    $('.btn-br-actions[data-publicid=3B5D1A3FCD4D4EEE95ADA91BE9321571]').hide();
    $('.btn-br-actions[data-publicid=3B5D1A3FCD4D4EEE95ADA91BE9321571]').closest('td').prepend('<a id="btnNumuneKabulOlustur" class="btn btn-sm btn-warning"  style="margin-right:10px;" >Numune Kabul Oluştur</a>');
    var numuneKabulNo = $('label[for=0EC1B858E261438EB30FCAEA9DA22313]').parent().data('value');
    $('body').on('click', '#btnNumuneKabulOlustur', function() {
        if (numuneKabulNo != "") {
            alert("Numune Kabul Kaydı zaten oluşturulmuş!");
        } else {
            $('#modelNumuneForm').remove();
            window.setModal.Create({
                id: 'modelNumuneForm',
                html: {
                    header: 'Numune Kabul Oluştur',
                    body: '<div id="txt" style="margin:0 0 5px; width: 100%;"></div>' +
                        '<div id="msg" style="margin:0 0 5px; width: 100%;">İşleminiz Yapılıyor, lütfen bekleyiniz..<br/> <img src="/Public/img/loading_bar.gif"></div>' +
                        '<table id="analizTable" class="table" style="width: 100%">' +
                        '<thead>' +
                        '<tr><th>Rapor Tipi</th></tr>' +
                        '</thead>' +
                        '<tbody>' +
                        '<tr>' +
                        '<td><div id="Raportipi" class="form-control"></div></td>' +
                        '</tr>' +
                        '</tbody>' +
                        '</table>',
                    footer: '<button id="btnNumuneForm" type="button" class="btn btn-sm btn-success" >Numune Kabul Oluştur</button>' + '<button type="button" class="btn btn-sm btn-default" data-dismiss="modal">Kapat</button>'
                }
            });
            $('#msg').hide();
            $('#modelNumuneForm').modal('toggle');
            var modelList = [];
            prepareSelect2('#Raportipi', '/Summary/LookupFieldValues', {
                coId: '6D25484F38754C9D940AB3594E5CE2D9',
                id: 'B63AB7CB87994A66A8E9E23DA66A1CFD',
                viewFilterId: 'AA0D44427065458BBA8E94B868AE44EF',
            }, null, false);
            var raporTipiId = $('label[for=B63AB7CB87994A66A8E9E23DA66A1CFD]').parent().data('publicids');
            var raporTipi = $('label[for=B63AB7CB87994A66A8E9E23DA66A1CFD]').parent().data('value');

            prepareSelect2SelectedOneItem('#Raportipi', raporTipiId, raporTipi, false);

            $('body').on('click', '#btnNumuneForm', function() {
                $('#btnNumuneForm').prop("disabled", true);
                $('btnNumuneForm').hide();
                var raporTipiKontrol = $('#Raportipi').val();
                if (String.isNullOrWhiteSpace(raporTipiKontrol)) {
                    setUtil.alert({
                        container: '#modelNumuneForm .modal-body #txt',
                        message: "Lütfen rapor tipi giriniz!",
                        alertClass: 'alert-danger',
                        autoClose: true
                    });
                    return;
                } else {
                    TalepFormOlustur();
                }
            })

            function TalepFormOlustur() {
                $('#msg').show();

                var model = {
                    RaporTipi: $('#Raportipi').select2('data').id,
                    RecordId: $('#RecordPublicId').val(),
                }
                var localUrl = String.format('http://localhost:44358/api/data/NumuneKabulFormuOlustur');
                var realUrl = String.format('https://kazlicesmewebapi.setcrm.com/api/data/NumuneKabulFormuOlustur');
                $.ajax({
                    contentType: 'application/json',
                    type: "POST",
                    url: realUrl,
                    dataType: "json",
                    data: JSON.stringify(model),
                    async: true,
                    success: function(r) {
                        if (r.Status) {
                            $('#msg').hide();
                            $('#modelNumuneForm .modal-body').html('');
                            setUtil.alert({
                                container: '#modelNumuneForm .modal-body #txt',
                                message: "İşleminiz başarıyla gerçekleşti",
                                alertClass: 'alert-success',
                                autoClose: true
                            });
                            $('#modelNumuneForm .modal-body').append(String.format('<a href="https://proje.setcrm.com/set/numune-kabul/detail/{0}" target="_blank" class="btn btn-primary btn-sm"><i class="fas fa-external-link-alt"></i> Görüntüleme</a>', r.id));
                        } else {
                            setUtil.alert({
                                container: '#modelNumuneForm .modal-body #txt',
                                message: r.Message,
                                alertClass: 'alert-danger',
                                autoClose: false
                            });
                        }
                    }
                });

            }
        }
    });
});