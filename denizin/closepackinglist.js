$(function() {

    $('.btn-br-actions[data-publicid=0DFEC2C689AB410496305029A2EE4A6B]').hide();
    $('.btn-br-actions[data-publicid=0DFEC2C689AB410496305029A2EE4A6B]').closest('td').prepend('<a id="btnCloseThePackingList" class="btn btn-sm btn-warning"  style="margin-right:10px;" >Close the Packing List</a>');
    $('body').on('click', '#btnCloseThePackingList', function() {
        $('#modalCloseThePackingListAlert').remove();
        window.setModal.Create({
            id: 'modalCloseThePackingListAlert',
            html: {
                body: '<div id="msgAlert" style="margin:0 0 5px; width: 100%;">Are you sure you want to close the list? <br/>  After this package list is closed,<br/> no action can be taken</div>',
                footer: '<button id="btnApprove" type="button" class="btn btn-sm btn-success" >YES</button> <button class="btn btn-danger btn-sm" data-dismiss="modal" onclick="window.location.reload()">NO</button>'
            },
            settings: {
                widthClass: 'modal-md'
            }
        });
        $('#modalCloseThePackingListAlert').modal({
            backdrop: false
        });
    });
    $('body').on('click', '#btnApprove', function() {
        $('#modalCloseThePackingListAlert').remove();
        $('#modalCloseThePackingList').remove();
        window.setModal.Create({
            id: 'modalCloseThePackingList',
            html: {
                header: 'Close the Packing List',
                body: '<div id="txt" style="margin:0 0 5px; width: 100%;">İşleminiz Yapılıyor, lütfen bekleyiniz..<br/> <img src="/Public/img/loading_bar.gif"></div>' +
                    '<div id="msg" style="margin:0 0 5px; width: 100%;"></div>' +
                    '<table class="table" style="width: 100%">' +
                    '<thead>' +
                    '<tr><th>Cargo Company</th><th>Airway Bill No</th>' +
                    '</thead>' +
                    '<tbody>' +
                    '<tr>' +
                    '<td colspan="1" rowspan="1"><input id="cargoCompany" type="select"  style="resize:none;width:100%;"></td>' +
                    '<td colspan="1" rowspan="1"><input id="airwayBillNo" type="text" style="width:100%; border-radius: 3px; border: 1px solid #5BC0DE; padding: 8px 12px;"></td>' +
                    '</tr>' +
                    '</tbody>' +
                    '</table>' +
                    '<table class="table" style="width: 100%">' +
                    '<thead>' +
                    '<tr><th>Documents</th>' +
                    '</thead>' +
                    '<tbody>' +
                    '<tr>' +
                    '<td colspan="1" rowspan="1"><input type="file" class="file" id="file1"/></td>' +
                    '</tr>' +
                    '</tbody>' +
                    '</table>',
                footer: '<button id="btnSavePackingList" type="button" class="btn btn-sm btn-success" >Save</button><button class="btn btn-danger btn-sm" data-dismiss="modal" onclick="window.location.reload()">Close</button>'
            },
            settings: {
                widthClass: 'modal-md'
            }
        });
        prepareSelect2('#cargoCompany', '/summary/fielditems', {
            id: '040AE464030C4014B77DCA553AC501D1'
        }, null, null);
        var cargoCompanyVal = $('label[for=040AE464030C4014B77DCA553AC501D1]').parent().data('value');
        var cargoCompanyId = $('label[for=040AE464030C4014B77DCA553AC501D1]').parent().data('publicids');

        $('#cargoCompany').select2('data', {
            id: cargoCompanyId,
            text: cargoCompanyVal
        }).trigger('change');

        var airwayBillNo = $('label[for=9906C28881E6467E8F3BD8B8D4977D5C]').parent().data().value;
        if (!String.isNullOrWhiteSpace(airwayBillNo)) {
            $('#airwayBillNo').val(airwayBillNo);
        }
        $('.modal-header').addClass('text-center');
        $('#modalCloseThePackingList').modal({
            backdrop: false
        });
        $('#txt').hide();
    });

    $('body').on('click', '#btnSavePackingList', function() {
        if (!String.isNullOrWhiteSpace($('#airwayBillNo').val()) && !String.isNullOrWhiteSpace($('#cargoCompany').val())) {
            $('#txt').show();
            var docId = "";
            var files = document.getElementById("file1").files;
            if (files.length > 0) {
                var list = new Array();
                for (let index = 0; index < files.length; index++) {
                    const file = files[index];
                    var formData = new FormData();
                    formData.append('id', 'F8DAFCE27CFB4FEB9AD1444EA02EB940');
                    formData.append('fieldId', '2384A6D6B48149EC89CFC3D043B0CCB6');
                    formData.append('files[]', file, file.name);
                    var ajax = new XMLHttpRequest();
                    ajax.open('POST', '/Document/Upload', false);
                    ajax.onloadend = function() {
                        if (ajax.status == 200) {
                            var result = JSON.parse(ajax.response).Result;
                            docId = result.DocumentId;
                            list.push(docId);
                        }
                    }
                    ajax.send(formData);
                }
            }

            var data = {
                CustomObjectId: $('#CustomObjectPublicId').val(),
                RecordId: $('#RecordPublicId').val(),
                CargoCompanyId: $('#cargoCompany').val(),
                AirwayBillNo: $('#airwayBillNo').val(),
                DocumentId: docId,
            };
            var url = 'https://templateprocess.setcrm.com/api/dataDenizin/ClosePackingList';
            var url2 = 'http://localhost:52129/api/dataDenizin/ClosePackingList';
            $.post(url, data, function(r) {
                if (r.Status) {
                    $('#modalCloseThePackingList').modal('toggle');
                    $('.btn-br-actions[data-publicid=0DFEC2C689AB410496305029A2EE4A6B]').trigger('click');
                } else {
                    setUtil.alert({
                        container: '#modalCloseThePackingList .modal-body #msg',
                        message: r.Message,
                        alertClass: 'alert-danger',
                        autoClose: true
                    });
                }
            });
        } else {
            setUtil.alert({
                container: '#modalCloseThePackingList .modal-body #msg',
                message: 'Please fill the required fields',
                alertClass: 'alert-warning',
                autoClose: true
            });
        }

    });
});