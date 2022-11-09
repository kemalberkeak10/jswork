$(function() {
    var kisiAd = '';
    $('.well-xxs').append("<div><label>Phone Number or Patient ID</label><br><input id='phoneNumber' type='text' title = 'Phone Number' class='input-group input-group-sm' style='width:180px;height:30px;margin-top: 7px;margin-left: -1px;' value='' data-mask=''><input id='searchPhone' type='button' class='btn btn-sm btn-warning' data-icon='plus' value='Search'>");
    $("#phoneNumber").keypress(function(e) {
        if (e.which == 13) {
            $('#searchPhone').trigger('click');
        }
    });
    var filterVal = '';
    $('body').on('click',
        '#searchPhone',
        function() {
            $('#modalBilgi').remove();
            window.setModal.Create({
                id: 'modalBilgi',
                html: {
                    header: 'Information Message',
                    body: '',
                    footer: '<button id="createNew" type="button" class="btn btn-sm btn-warning">Create New</button>'
                }
            });
            $('#modalBilgi').modal('toggle');
            var q = $('#phoneNumber').val().replaceAll('-', '').replaceAll('+', '').toUpperCase();
            if (q.contains('L')) {
                if (q.length < 4) {
                    $('#modalBilgi .modal-body').text('Patient ID must have four digits.');
                    $('#createNew').hide();
                } else {
                    search(q);
                }
            } else {
                if (q.split('_')[0].length < 9) {
                    $('#modalBilgi .modal-body').text('You must enter at least nine digits.');
                    $('#createNew').hide();
                } else {
                    search(q);
                }
            }
        });
    var search = function(q) {
        var url = '/search/elasticsearch?query=' + q + '&customObjectName=CONTACT&fieldName=item.PATIENT_ID,item.MOBILETSS,item.LAST_NAME,item.OTHER_PHONETSS,item.OTHER_PHONE_2TSS,item.CONTACT_OWNER&methodType=1';
        $.get(url,
            function(result) {
                if (result.Items.length === 0) {
                    $('#modalBilgi .modal-body').text('Contact not found.');
                    $('#createNew').show();
                    $.get('https://clinicexpertwebapi.setcrm.com/api/data/KayitTelNo?durum=NotFound&q=' + q + '&user=' + userData.id + '&contactOwner=' + '&publicId=', function(result) {});
                } else if (result.Items.length === 1) {
                    var contactOwner = result.Items[0].item.CONTACT_OWNER;
                    console.log(contactOwner);
                    var co = '';
                    if (contactOwner === 'DA031CFE327449689B578BD4446EFD28' || contactOwner.contains('Pool')) {
                        co = 'Pool';
                    } else if (contactOwner === 'Havuz_Pool Havuz_Pool' || contactOwner === '429C89656CC24B1A88EA3B932E97E1BE') {
                        co = 'Havuz Pool';
                    } else if (contactOwner === userData.id || contactOwner.contains(userData.name.trim())) {
                        co = userData.name;
                    } else {
                        co = 'Owned';
                        kisiAd = contactOwner;
                    }
                    if (co !== 'Owned') {
                        window.location.href = '/set/contact/detail/' + result.Items[0].item.RecordPublicId;
                    } else {
                        var url = "https://clinicexpertwebapi.setcrm.com/api/data/GetPanelText?recordId=" + result.Items[0].item.RecordPublicId;
                        var localurl = "";
                        $.get(url, function(r) {
                            if (r.Status) {
                                var newRow = $('<tr class="class"/>');
                                $('#modalBilgi .modal-body').append('<table id="tableKisi" class="table table-striped table-hover"><thead>' +
                                    '<tr>' + '<th>Fullname</th>' +
                                    '<th>Contact Owner</th>' +
                                    '<th>Detail</th>' +
                                    '</tr>' +
                                    '</thead>' +
                                    '<tbody></tbody>' +
                                    '</table></td>');
                                newRow.append($('<td data-id=""/><input style="display: none;">').text(r.FullName));
                                newRow.append($('<td data-id=""/><input style="display: none;">').text(r.Text));
                                $('#createNew').hide();
                                $('#tableKisi').find('tbody').append(newRow);
                                if (!q.contains('L')) {
                                    $.get('https://clinicexpertwebapi.setcrm.com/api/data/KayitTelNo?durum=Found&q=' + q + '&user=' + userData.id + '&contactOwner=' + result.Items[0].item.CONTACT_OWNER_PublicId + '&publicId=' + result.Items[0].item.RecordPublicId, function(result) {});
                                }
                            }
                        });

                    }
                } else {
                    $('#modalBilgi .modal-body').text('');
                    for (var i = 0; i < result.Items.length; i++) {
                        var ad = result.Items[i].item.LAST_NAME;
                        var contactOwner = result.Items[i].item.CONTACT_OWNER;
                        console.log(contactOwner);
                        var publicId = result.Items[i].item.RecordPublicId;
                        var co = '';
                        if (contactOwner === 'DA031CFE327449689B578BD4446EFD28' || contactOwner.contains('Pool')) {
                            co = 'Pool';
                        } else if (contactOwner === 'Havuz_Pool Havuz_Pool' || contactOwner === '429C89656CC24B1A88EA3B932E97E1BE') {
                            co = 'Havuz Pool';
                        } else if (contactOwner === userData.id || contactOwner.contains(userData.name.trim())) {
                            co = userData.name;
                        } else {
                            co = 'Owned';
                            kisiAd = contactOwner;
                        }
                        if (i === 0) {
                            $('#modalBilgi .modal-body').append('<table id="tableKisi" class="table table-striped table-hover"><thead>' +
                                '<tr>' + '<th>Fullname</th>' +
                                '<th>Contact Owner</th>' +
                                '<th>Detail</th>' +
                                '</tr>' +
                                '</thead>' +
                                '<tbody></tbody>' +
                                '</table></td>');
                        }
                        var newRow = $('<tr class="class"/>');
                        if (co !== 'Owned') {
                            newRow.append($('<td data-id=""/><input style="display: none;">').text(ad));
                            newRow.append($('<td data-id=""/><input style="display: none;">').text(co));
                            newRow.append($('<td/>')
                                .append($('<div/>', {
                                        'class': 'btn-group'
                                    })
                                    .append($('<a/>', {
                                        'data-id': publicId,
                                        'target': '_blank',
                                        'class': 'btn btn-primary btn-actions btn-sm',
                                        'href': '/set/contact/detail/' + publicId
                                    }).append('<i class="fas fa-external-link-alt"></i>'))
                                ));
                        } else {

                            var url = "https://clinicexpertwebapi.setcrm.com/api/data/GetSalesMan?recordId=" + publicId;
                            var localurl = "";
                            $.get(url, function(r) {
                                if (r.Status) {
                                    newRow.append($('<td data-id=""/><input style="display: none;">').text(ad));
                                    newRow.append($('<td data-id=""/><input style="display: none;">').text(r.Text));
                                    $('#createNew').hide();
                                    if (!q.contains('L')) {
                                        $.get('https://clinicexpertwebapi.setcrm.com/api/data/KayitTelNo?durum=Found&q=' + q + '&user=' + userData.id + '&contactOwner=' + result.Items[0].item.CONTACT_OWNER_PublicId + '&publicId=' + publicId, function(result) {});
                                    }
                                }
                            });

                        }
                        if (newRow.length === 0) {
                            $('#modalBilgi .modal-body').text('Contact not found.');
                            $('#createNew').show();
                        }
                        $('#tableKisi').find('tbody').append(newRow);
                    };
                }
            });
    };
    $('body').on('click',
        '#createNew',
        function() {
            window.location.href = 'https://clinicexpert.setcrm.com/set/new/contact';
        });
    window.setModal.Create({
        id: 'modalUyr',
        html: {
            header: 'My Total Revenue',
            body: '',
            footer: '<button id="btnKapat" type="button" class="btn btn-sm btn-info" data-dismiss="modal">Close</button>'
        }
    });
    $('.well .pull-right:eq(0)').prepend('<a id="totalRev" class="btn btn-sm btn-info" > My Total Revenue </a>');
    $('#totalRev').click(function() {
        $('#modalUyr').modal('toggle');
        var recordId = $('#RecordPublicId').val();
        var urls = 'https://clinicexpertwebapi.setcrm.com/api/data/DashboardToplamVeriCekme?userId=' + userData.id;
        $.get(urls, function(result) {
            if (result.Message !== "") {
                $('#modalUyr .modal-body').html(' ');
                $('#modalUyr .modal-body').append('<label> My Revenue Last Month : </label>').append('<label>' + result.Message.split('*')[3].split(',')[0] + ' $ </label>').append('<br />');
                $('#modalUyr .modal-body').append('<label> My Revenue This Month: </label>').append('<label>' + result.Message.split('*')[4].split(',')[0] + ' $ </label>');
            }
        });
    });
});