$(function() {

    $.get(String.format('/lookuprelation/records?id=7CC49578F75A4B81ABDCFBE4CF82B25B&recordId=' + $('#RecordPublicId').val() + '&pageSize=300&pageNumber=1&q=&filter=&fieldPublicId=A7C1FC843D96433DA46FBCCF29B8B630&_=1579504845227')).done(function(result) {
        if (result.PagedItems.ItemCount > 0) {
            var aksarayCheckUpdate = true;
            var worthCheckUpdate = true;
            $('.well .pull-right:eq(0)').prepend('<a id="btnRemainingHour" class="btn btn-sm btn-warning"  style="margin-right:10px;" >Proje Kalan Saat</a>');
            var koordinatorId = $('label[for=F12BEC19BC834F5D9945166E62CCEC9C]').parent().data('publicids');
            var userId = userData.id;
            var lastRowTotalTd = [];
            var worthTotalHour = 0;
            var aksarayTotalHour = 0;
            var brazilTotalHour = 0;
            $('body').on('click', '#btnRemainingHour', function() {
                $('#modalLoadingUpdate').remove();
                window.setModal.Create({
                    id: 'modalLoadingUpdate',
                    html: {
                        header: ' ',
                        body: '<div id="txt" style="margin:0 0 5px; width: 100%;">Processing, please wait ..<br/> <img src="/Public/img/loading_bar.gif"></div>',
                        footer: '<button class="btn btn-sm btn-default" data-dismiss="modal" >Close</button>'
                    }
                });
                // $('#modalLoadingUpdate').modal('toggle');
                $.get(String.format('/lookuprelation/records?id=7CC49578F75A4B81ABDCFBE4CF82B25B&recordId=' + $('#RecordPublicId').val() + '&pageSize=300&pageNumber=1&q=&filter=&fieldPublicId=A7C1FC843D96433DA46FBCCF29B8B630&_=1579504845227')).done(function(result) {
                    var projectValue = [];
                    var cityName = [];
                    var tarih = [];
                    if (result.PagedItems.ItemCount > 0) {
                        //Baslangıc tarihi Lr den gelen kayıtlarda en sonuncusu 2019 .
                        var bst = $('label[for=795EB0EC0CAE46C38B60C3C0249DB823]').parent().data('value');
                        var btst = $('label[for=5CA2501DFFBA4A3D97D321154DF66FDA]').parent().data('value');
                        var bastarihInt = 0;
                        var bitTarihiInt = 0;
                        if (bst.contains('/')) {
                            bastarihInt = parseInt(bst.split(' ')[0].split('/')[2]);
                            bitTarihiInt = parseInt(btst.split(' ')[0].split('/')[2]);
                        } else {
                            bastarihInt = parseInt(bst.split(' ')[0].split('.')[2]);
                            bitTarihiInt = parseInt(btst.split(' ')[0].split('.')[2]);
                        }

                        for (bastarihInt; bastarihInt <= bitTarihiInt; bastarihInt++) {
                            tarih.push(bastarihInt);
                        }
                        // Lrde gelen verilerden unique olarak cityler ayrılıyor ve her kayıt projectValue de toplanıyor.
                        // Sonrasında tablo doldurmada kullanmak için.
                        $.each(result.PagedItems.Items.reverse(), function(key, value) {
                            if (value.Values.first('FieldPublicId', '648B8D1A25854893A6AD663E92D7D838') != null) {
                                var city = value.Values.first('FieldPublicId', '648B8D1A25854893A6AD663E92D7D838').Value;
                                var varMi = $.inArray(city, cityName);
                                if (varMi === -1) {
                                    cityName.push(city);
                                }

                                var lrYear = "";
                                // ingilizce TR ayrıştırma
                                if (value.Values.first('FieldPublicId', 'D3893CAF9A5043C08EAA24F56167DDCC').Value.contains('/')) {
                                    lrYear = value.Values.first('FieldPublicId', 'D3893CAF9A5043C08EAA24F56167DDCC').Value.split(' ')[0].split('/')[2];
                                } else {
                                    lrYear = value.Values.first('FieldPublicId', 'D3893CAF9A5043C08EAA24F56167DDCC').Value.split(' ')[0].split('.')[2];
                                }
                                var object = {
                                    TeamId: value.Values.first('FieldPublicId', '56CC2B774209457EA485902B1CC49616').SelectedItemPublicIds,
                                    SubTeamId: value.Values.first('FieldPublicId', 'EB97009BD88F4AEAA1715B6348278FA9').SelectedItemPublicIds,
                                    City: value.Values.first('FieldPublicId', '648B8D1A25854893A6AD663E92D7D838').Value,
                                    Hour: value.Values.first('FieldPublicId', 'AED23976813247D18B6E3C6A5F3F441B').Value,
                                    Year: lrYear,
                                    PublicId: value.PublicId,
                                    Check: value.Values.first('FieldPublicId', '004EF23DF197441C9FED4B865C1A88A7').Value
                                };
                                projectValue.push(object);
                            }
                        });

                        var tempCity = [];
                        if ($.inArray("Wörth", cityName) > -1) {
                            tempCity.push("Wörth");
                        }
                        if ($.inArray("Aksaray", cityName) > -1) {
                            tempCity.push("Aksaray");
                        }
                        if ($.inArray("Brazil", cityName) > -1) {
                            tempCity.push("Brazil");
                        }
                        cityName = tempCity;

                        $('#modalRemainingHour').remove();
                        window.setModal.Create({
                            id: 'modalRemainingHour',
                            html: {
                                header: '',
                                body: '<div id="msg" style="margin:0 23px 5px; width: 100%;"></div>' +
                                    '<table class="table" style="width: 100%">' +
                                    '<tbody>' +
                                    '<tr>' +
                                    '<td colspan="1" rowspan="1"><label>Total Hours</label></br><input id="teamHours" type="number" style="width:100%; border-radius: 3px; border: 1px solid #5BC0DE; padding: 8px 12px;" disabled></td>' +
                                    '<td colspan="1" rowspan="1"><label>Start Date</label></br><input id="startDate" type="text" style="width:100%; border-radius: 3px; border: 1px solid #5BC0DE; padding: 8px 12px;" disabled></td>' +
                                    '<td colspan="1" rowspan="1"><label>End Date</label></br><input id="endDate" type="text" style="width:100%; border-radius: 3px; border: 1px solid #5BC0DE; padding: 8px 12px;" disabled></td>' +
                                    '</tr>' +
                                    '<tr>' +
                                    '<td colspan="1" rowspan="1"><label>Wörth Hours</label></br><input id="team1" type="number" value="0" min="0" style="width:100%; border-radius: 3px; border: 1px solid #5BC0DE; padding: 8px 12px;" disabled></td>' +
                                    '<td colspan="1" rowspan="1"><label>Aksaray Hours</label></br><input id="team2" type="number"  value="0" min="0" style="width:100%; border-radius: 3px; border: 1px solid #5BC0DE; padding: 8px 12px;" disabled></td>' +
                                    '<td colspan="1" rowspan="1"><label>Brazil Hours</label></br><input id="team3" type="number" value="0" min="0" style="width:100%; border-radius: 3px; border: 1px solid #5BC0DE; padding: 8px 12px;" disabled></td>' +
                                    '<td colspan="1" rowspan="1" style=" padding-top: 25px;"><button id="btnDraw" type="button" class="btn btn-warning" style="width:100%; border-radius: 3px; border: 1px solid #5BC0DE; padding: 8px 12px;display:none;">Draw</td>' +
                                    '</tr>' +
                                    '<tr>' +
                                    '<td colspan="1" rowspan="1">' +
                                    '<label style="width:50%;"> Total hours entered for Wörth</label><label  style="width:50%;text-align:left">Hours left for Wörth</label></br>' +
                                    '<input class="pull-left" id="worthTotal" type="number" value="0" min="0" style="width:37%; border-radius: 3px; border: 1px solid #5BC0DE; padding: 8px 12px;" readonly/>' +
                                    '<input class="pull-left" id="worthLeftHour" type="number"  style="width:37%;border-radius: 3px;border: 1px solid #5BC0DE;padding: 8px 12px;margin-left: 65px;" readonly/></br></br>' +
                                    '<p class="text-danger" id="worthp"></p></td>' +
                                    '<td colspan="1" rowspan="1">' +
                                    '<label style="width:50%;">Total hours entered for Aksaray</label><label style="width:50%;text-align:left">Hours left for Aksaray</label></br>' +
                                    '<input class="pull-left" id="aksarayTotal" type="number"  value="0" min="0"  style="width:37%; border-radius: 3px; border: 1px solid #5BC0DE; padding: 8px 12px;" readonly/>' +
                                    '<input class="pull-left" id="aksarayLeftHour" type="number"   style="width:37%;border-radius: 3px;border: 1px solid #5BC0DE;padding: 8px 12px;margin-left: 65px;" readonly/></br></br>' +
                                    '<p class="text-danger" id="aksarayp"></p></td>' +
                                    '<td colspan="1" rowspan="1">' +
                                    '<label style="width:50%;">Total hours entered for Brazil</label><label style="width:50%;text-align:left">Hours left for Brazil</label></br>' +
                                    '<input class="pull-left" id="brazilTotal" type="number" value="0" min="0" style="width:37%; border-radius: 3px; border: 1px solid #5BC0DE; padding: 8px 12px;" readonly/>' +
                                    '<input class="pull-left" id="brazilLeftHour" type="number"  style="width:37%;border-radius: 3px;border: 1px solid #5BC0DE;padding: 8px 12px;margin-left: 65px;" readonly/></br></br>' +
                                    '<p class="text-danger" id="brazilp"></p></td>' +
                                    '</tr>' +
                                    '</tbody>' +
                                    '</table>' +
                                    '<div id="kp" style="overflow: auto;"></div>' +
                                    '<div id="urunler" style="margin:0 23px 5px; width: 100%;"></div>',
                                footer: '<div id="msg2" width: 100%;"></div>' + '<button  id="btnKapatXM" class="btn btn-success btn-sm">Close</button>'
                            },
                            settings: {
                                backdrop: 'static',
                            }
                        });

                        $('#startDate').datetimepicker({
                            inline: false,
                            closeOnDateSelect: true,
                            timepicker: false,
                            format: 'd.m.Y',
                            mask: false,
                            scrollMonth: false,
                            scrollTime: false,
                            scrollInput: false,
                            dayOfWeekStart: 1
                        });
                        $('#endDate').datetimepicker({
                            inline: false,
                            closeOnDateSelect: true,
                            timepicker: false,
                            format: 'd.m.Y',
                            mask: false,
                            scrollMonth: false,
                            scrollTime: false,
                            scrollInput: false,
                            dayOfWeekStart: 1
                        });
                        var bastarih = $('label[for=795EB0EC0CAE46C38B60C3C0249DB823]').parent().data('value').split(' ')[0];
                        var bit = $('label[for=5CA2501DFFBA4A3D97D321154DF66FDA]').parent().data('value').split(' ')[0];
                        var worth = parseInt($('label[for=8D4629A43F804D78BA5FE2AFDD407573]').parent().data('value'));
                        var aksaray = parseInt($('label[for=24CA6BD0F5E44DE5A98C711768195D82]').parent().data('value'));
                        var brazil = parseInt($('label[for=5FE3C356D270475194BF47D589FD87E7]').parent().data('value'));

                        $('#team1').val(worth);
                        $('#team2').val(aksaray);
                        $('#team3').val(brazil);
                        var worthTotalHour = $('#team1').val();
                        var aksarayTotalHour = $('#team2').val();
                        var brazilTotalHour = $('#team3').val();
                        $('#worthTotal').val(worthTotalHour);
                        $('#aksarayTotal').val(aksarayTotalHour);
                        $('#brazilTotal').val(brazilTotalHour);
                        $('#teamHours').val(parseInt($('label[for=7DA1B001A7D94C9C8167553026663A8C]').parent().data('value')));
                        $('#startDate').val(bastarih);
                        $('#endDate').val(bit);
                        $('#modalLoadingUpdate').remove();
                        $('#modalRemainingHour .modal-body').css('max-height', '');
                        $('#modalRemainingHour .modal-body').css('height', '90%');
                        $('#modalRemainingHour .modal-dialog').css('width', '95%');
                        //if(!userData.permissionGroupIds.contains('7A334D5EE289470CA1CBD9F0C62C68A7') || !userData.permissionGroupIds.contains('E0EC3516978B46AB83115BC7C79D494C')){
                        // modaldaki update butonunun silinmesi
                        //  $('#btnUpdateUP').remove();
                        //}

                        $('#modalRemainingHour').modal('toggle');
                        // #region HELPERS
                        function alertMsg(msg) {
                            setUtil.alert({
                                container: '#modalRemainingHour .modal-body #msg',
                                message: msg,
                                alertClass: 'alert-danger',
                                autoClose: false
                            });
                        }

                        function clearMsgTimeOut(second) {
                            setTimeout(function() {
                                $('#modalRemainingHour .modal-body #msg ').html(' ');
                            }, second);
                        }
                        // #endregion HELPERS
                        $('#modalRemainingHour .modal-body #kp').html('');
                        var team1Val = parseInt($('#team1').val()) || 0;
                        var team2Val = parseInt($('#team2').val()) || 0;
                        var team3Val = parseInt($('#team3').val()) || 0;
                        var totalHours = parseInt($('#teamHours').val());
                        var teamHours = team1Val + team2Val + team3Val;
                        $('#newTbl thead').html('');
                        $('#newTbl tbody').html('');
                        var newTbl = $('<table id="newTbl" style="width: 100%;overflow-x: scroll" />');
                        var thead = $('<thead />');
                        var newRow = $('<tr class="table table-bordered table-hover thead-dark" style="height:50px;"/>');
                        newRow.append($('<th style="text-align: center;white-space: pre;color:white; background-color:black;position: sticky;top: 0;z-index: 5;" class="col-md-2"/>').text('Team'));
                        newRow.append($('<th style="text-align: center;white-space: pre;color:white; background-color:black;position: sticky;top: 0;z-index: 5;" class="col-md-6"/>').html('<span style="color:black;">                                      .</span> Team <span style="color:black;">                                        .</span>'));
                        newRow.append($('<th style="text-align: center;white-space: pre;color:white; background-color:black;position: sticky;top: 0;z-index: 5;" class="col-md-2"/>').text('Total Hours'));
                        newRow.append($('<th style="text-align: center;white-space: pre;color:white; background-color:black;position: sticky;top: 0;z-index: 5;" class="col-md-2"/>').text('AVW 060'));
                        newRow.append($('<th style="text-align: center;white-space: pre;color:white; background-color:black;position: sticky;top: 0;z-index: 5;" class="col-md-2"/>').text('AVW 152'));
                        for (var i = 0; i < tarih.length; i++) {
                            for (var j = 0; j < cityName.length; j++) {

                                newRow.append($('<th  style="text-align: center;white-space: pre;color:yellow; background-color:black;position: sticky;top: 0;z-index: 5;" class="col-md-2">' + tarih[i] + ' ' + cityName[j] + '<i id="right-' + i + j + '" class="fa fa-chevron-circle-right r' + i + ' ' + i + '" style="margin-left:5px;" data-i="' + i + '" data-l="' + j + '"></i><i id="left-' + i + j + '" class="fa fa-chevron-circle-left l' + i + ' ' + i + '" style="display:none;margin-left:5px;" data-i="' + i + '" data-l="' + j + '"></i></th>'));
                                newRow.append($('<th style="display:none;text-align: center;white-space: pre;color:yellow; background-color:black;position: sticky;top: 0;z-index: 5;"  data-i="' + i + '" data-l="' + j + '" data-city="' + cityName[j] + '" class="col-md-2 finished-th' + i + ' ' + i + j + '"/>').text("Çalışılmış Saat"));
                                newRow.append($('<th style="display:none;text-align: center;white-space: pre;color:yellow; background-color:black;position: sticky;top: 0;z-index: 5;"  data-i="' + i + '" data-l="' + j + '" data-city="' + cityName[j] + '" class="col-md-2 remaining-th' + i + ' ' + i + j + '"/>').text("Kalan Saat"));
                            }
                        }

                        for (var i = 0; i < tarih.length; i++) {
                            for (var j = 0; j < cityName.length; j++) {
                                var tdCode = "" + i + j
                                lastRowTotalTd.push(tdCode);
                            }
                        }
                        newRow.append($('<th style="text-align: center;white-space: pre;color:white; background-color:black;position: sticky;top: 0;z-index: 5;" class="col-md-2"/>').text('Wörh Total'));
                        newRow.append($('<th style="text-align: center;white-space: pre;color:white; background-color:black;position: sticky;top: 0;z-index: 5;" class="col-md-2"/>').text('Aksaray Total'));
                        newRow.append($('<th style="text-align: center;white-space: pre;color:white; background-color:black;position: sticky;top: 0;z-index: 5;" class="col-md-2"/>').text('Sub Total Hours'));
                        thead.append(newRow);
                        newTbl.append(thead);
                        var tbody = $('<tbody />');
                        var check = 0;
                        for (var n = 0; n <= 13; ++n) {
                            var team = "";
                            var group = "";
                            switch (n) {
                                case 0:
                                    team = "C";
                                    teamId = "8A6F0A9BE5E0441B97C9ACF3C01D6768";
                                    group = "Cab Trim";
                                    groupId = "16B76D8D007A40879CD76AABECFA8063"
                                    break;
                                case 1:
                                    team = "C";
                                    teamId = "8A6F0A9BE5E0441B97C9ACF3C01D6768";
                                    group = "Cab Body";
                                    groupId = "2668576524FD4A7693D0C73FCFF3EBFB"
                                    break;
                                case 2:
                                    team = "C";
                                    teamId = "8A6F0A9BE5E0441B97C9ACF3C01D6768";
                                    group = "Cab Modellbau";
                                    groupId = "0F95C777ECA347748EE1BE47E4BE6C34"
                                    break;
                                case 3:
                                    team = "E";
                                    teamId = "0D970854B82D4D9CBD832C0F3077D051";
                                    group = "E/E-Center";
                                    groupId = "4BF4F99AF9824CABA98F9CB5F577F1F1"
                                    break;
                                case 4:
                                    team = "F";
                                    teamId = "DFCA6EA1E6D74ECDBFE1169FDACADC74";
                                    group = "Fahrgestell Rahmen & Anbauteile";
                                    groupId = "0EE6B7CB7D864D8F82B428FC9CC0DE7C"
                                    break;
                                case 5:
                                    team = "F";
                                    teamId = "DFCA6EA1E6D74ECDBFE1169FDACADC74";
                                    group = "Fahrgestell Antriebstrang & Peripherie";
                                    groupId = "68606CED8EBE4A0A9F815F3FE5A0EE8A"
                                    break;
                                case 6:
                                    team = "F";
                                    teamId = "DFCA6EA1E6D74ECDBFE1169FDACADC74";
                                    group = "Fahrgestell Hydraulik";
                                    groupId = "73C12EEEAF3441E1B1D211301BE92776"
                                    break;
                                case 7:
                                    team = "M";
                                    teamId = "3B766B67412A45A9851ACB48D297B7C4";
                                    group = "Mechatronik Pneumatik";
                                    groupId = "C7E3624C5A004814B0D333DAAF13D366"
                                    break;
                                case 8:
                                    team = "M";
                                    teamId = "3B766B67412A45A9851ACB48D297B7C4";
                                    group = "Mechatronik eDrive / Frame Harness ";
                                    groupId = "4E7D0F3D2396489FBD9BBBD1E8A9F4A0"
                                    break;
                                case 9:
                                    team = "M";
                                    teamId = "3B766B67412A45A9851ACB48D297B7C4";
                                    group = "Mechatronik Wiring Harness";
                                    groupId = "56CB56A3CCAF4831B93AA22168A75171"
                                    break;
                                case 10:
                                    team = "P";
                                    teamId = "526BCB1CC8AD435685B8391AE4ADC2A1";
                                    group = "Bauraum / BBA";
                                    groupId = "87CB3D40BCE047A398E15813E0037B3B"
                                    break;
                                case 11:
                                    team = "P";
                                    teamId = "526BCB1CC8AD435685B8391AE4ADC2A1";
                                    group = "Prozess";
                                    groupId = "E56F57595BC3461E9613AC1FD199CE82"
                                    break;
                                case 12:
                                    team = "P";
                                    teamId = "526BCB1CC8AD435685B8391AE4ADC2A1";
                                    group = "Systeme / Methoden";
                                    groupId = "29F705D94F3C41D1917FF72462E7BB5F"
                                    break;
                                case 13:
                                    team = "Lei";
                                    teamId = "B5A3CAD09A5A4F98A90BA8D4518165C4";
                                    group = "Leitung";
                                    groupId = "257CFBD5DD494C488F41D98174861117"
                                    break;

                            }
                            var newRow = $('<tr class="table table-bordered table-hover" style="height:50px;"/>').attr('data-id', '');
                            if (n == 0 && check == 0) {
                                newRow.append($('<td colspan="1" rowspan="3" style="text-align: center;padding-left: 0px;padding-right: 0px;background-color:#3296E1;" class="col-md-1"/>').append($('<label style="font-size:30px;">C</label>')));
                                check = 1;
                            } else if (n == 3 && check == 1) {
                                newRow.append($('<td colspan="1" rowspan="1" style="text-align: center;padding-left: 0px;padding-right: 0px;background-color:#3296E1;" class="col-md-1"/>').append($('<label style="font-size:30px;">E</label>')));
                                check = 2;
                            } else if (n == 4 && check == 2) {
                                newRow.append($('<td colspan="1" rowspan="3" style="text-align: center;padding-left: 0px;padding-right: 0px;background-color:#3296E1;" class="col-md-1"/>').append($('<label style="font-size:30px;">F</label>')));
                                check = 3;
                            } else if (n == 7 && check == 3) {
                                newRow.append($('<td colspan="1" rowspan="3" style="text-align: center;padding-left: 0px;padding-right: 0px;background-color:#3296E1;" class="col-md-1"/>').append($('<label style="font-size:30px;">M</label>')));
                                check = 4;
                            } else if (n == 10 && check == 4) {
                                newRow.append($('<td colspan="1" rowspan="3" style="text-align: center;padding-left: 0px;padding-right: 0px;background-color:#3296E1;" class="col-md-1"/>').append($('<label style="font-size:30px;">P</label>')));
                                check = 5;
                            } else if (n == 13 && check == 5) {
                                newRow.append($('<td colspan="1" rowspan="1" style="text-align: center;padding-left: 0px;padding-right: 0px;background-color:#3296E1;" class="col-md-1"/>').append($('<label style="font-size:30px;">L</label>')));
                                check = 6;
                            }

                            newRow.append($('<td style="text-align: center;padding-left: 0px;padding-right: 0px;"class="col-md-3"/>').append($('<input />', {
                                'id': 'groupName',
                                'name': 'groupName',
                                'type': 'text',
                                'width': '100%',
                                'height': '50px',
                                'value': group,
                                'data-id': team + '-' + teamId + '-' + groupId,
                                'class': 'col-md-2',
                                disabled: true
                            })));

                            newRow.append($('<td style="text-align: center;padding-left: 0px;padding-right: 0px;"/>').append($('<input />', {
                                'id': 'totalHour' + n,
                                'type': 'text',
                                'width': '100%',
                                'height': '50px',
                                'value': '',
                                'class': 'col-md-2',
                                'class': "leftHourTotal",
                                'min': '0',
                                disabled: true
                                    // 'data-id': cityName[j] + '-' + tarih[i]
                            })));

                            newRow.append($('<td style="text-align: center;padding-left: 0px;padding-right: 0px;"/>').append($('<input />', {
                                'id': 'worthAwm' + n,
                                'type': 'text',
                                'width': '100%',
                                'height': '50px',
                                'value': '',
                                'class': 'col-md-2',
                                'class': "WavwUp",
                                'text-align': 'center',
                                'min': '0',
                                'data-id': cityName[j] + '-' + tarih[i],
                                disabled: true
                            })));
                            newRow.append($('<td style="text-align: center;padding-left: 0px;padding-right: 0px;"/>').append($('<input />', {
                                'id': 'aksarayAwm' + n,
                                'type': 'text',
                                'width': '100%',
                                'height': '50px',
                                'value': '',
                                'class': 'col-md-2',
                                'class': "AavwUp",
                                'text-align': 'center',
                                'min': '0',
                                'data-id': cityName[j] + '-' + tarih[i],
                                disabled: true
                            })));
                            var rowNumber = 0;
                            for (var i = 0; i < tarih.length; i++) {
                                for (var j = 0; j < cityName.length; j++) {
                                    newRow.append($('<td style="text-align: center;padding-left: 0px;padding-right: 0px;"/>').append($('<input />', {
                                        'id': 'hour' + rowNumber,
                                        // 'data-index': rowNumber,
                                        // 'data-rowindex':i,
                                        'name': '',
                                        'type': 'text',
                                        'width': '100%',
                                        'height': '50px',
                                        'value': '',
                                        'class': 'col-md-2',
                                        'class': "ınpuT hour hour" + i + j,
                                        'text-align': 'center',
                                        'min': '0',
                                        'data-id': cityName[j] + '-' + tarih[i],
                                        'data-city': cityName[j],
                                        'data-tdId': '' + i + j,
                                        disabled: true
                                    })));
                                    newRow.append($('<td style="display:none;text-align: center;padding-left: 0px;padding-right: 0px;"/>').append($('<input />', {
                                        'id': 'finished' + rowNumber,
                                        // 'data-index': rowNumber,
                                        // 'data-rowindex':i,
                                        'name': '',
                                        'type': 'text',
                                        'width': '100%',
                                        'height': '50px',
                                        'value': '',
                                        'class': 'col-md-2',
                                        'class': 'finished-hour' + tarih[i] + " finished finished" + i + j,
                                        'text-align': 'center',
                                        'min': '0',
                                        'data-id': tarih[i],
                                        'data-city': cityName[j],
                                        'data-cityYear': cityName[j] + tarih[i],
                                        disabled: true
                                    })));
                                    newRow.append($('<td style="display:none;text-align: center;padding-left: 0px;padding-right: 0px;"/>').append($('<input />', {
                                        'id': 'remaining' + rowNumber,
                                        // 'data-index': rowNumber,
                                        // 'data-rowindex':i,
                                        'name': '',
                                        'type': 'text',
                                        'width': '100%',
                                        'height': '50px',
                                        'value': '',
                                        'class': 'col-md-2',
                                        'class': "remaining-hour" + tarih[i] + " remaining remaining" + i + j,
                                        'text-align': 'center',
                                        'min': '0',
                                        'data-id': tarih[i],
                                        'data-city': cityName[j],
                                        // 'data-cityYear': cityName[j] + tarih[i],
                                        disabled: true
                                    })));
                                }
                                rowNumber++;
                            }


                            newRow.append($(String.format('<td style="text-align: center;padding-left: 0px;padding-right: 0px;" class="worh-total" />')));
                            newRow.append($(String.format('<td style="text-align: center;padding-left: 0px;padding-right: 0px;" class="aksaray-total" />')));

                            newRow.append($('<td style="text-align: center;padding-left: 0px;padding-right: 0px;"/>').append($('<input />', {
                                'id': 'satirtottal' + i,
                                'name': 'satirtottal',
                                'type': 'text',
                                'width': '100%',
                                'height': '50px',
                                'value': '',
                                'disabled': true,
                                'class': 'col-md-2',
                                'text-align': 'center',
                                disabled: true
                            })));
                            tbody.append(newRow);
                            newTbl.append(tbody);
                            $('#modalRemainingHour .modal-body #kp').append(newTbl);
                        }

                        var tbody2 = $('<tbody />');
                        var newRow2 = $('<tr class="table table-bordered table-hover" style="height:50px;"/>').attr('data-id', '');
                        newRow2.append($('<td colspan="1" rowspan="1" style="text-align: left;padding-left: 0px;padding-right: 0px;background-color:#3296E1;"class="col-md-1" ></td>'));
                        newRow2.append($('<td colspan="1" rowspan="1" style="text-align: left;padding-left: 0px;padding-right: 0px;background-color:#3296E1;"class="col-md-1"></td>'));
                        newRow2.append($('<td style="text-align: left;padding-left: 0px;padding-right: 0px;"/>').append($('<input />', {
                            'id': 'totalBottomHour',
                            'name': 'totalBottomHour',
                            'type': 'text',
                            'width': '100%',
                            'height': '50px',
                            'value': '',
                            'class': 'col-md-2',
                            disabled: true
                        })));
                        newRow2.append($('<td style="text-align: left;padding-left: 0px;padding-right: 0px;" colspan="2"/>').append($('<input />', {
                            'id': 'projectTotalHours',
                            'name': '',
                            'type': 'text',
                            'width': '100%',
                            'height': '50px',
                            'value': 'Project Total Hours : ' + $('#teamHours').val(),
                            'class': 'col-md-2',
                            disabled: true
                        })));

                        for (var i = 0; i < tarih.length; i++) {
                            for (var j = 0; j < cityName.length; j++) {
                                newRow2.append($('<td style="text-align: left;padding-left: 0px;padding-right: 0px;" class="col-md-2"/>').append($('<input />', {
                                    'id': "total_" + cityName[j] + '-' + tarih[i],
                                    'name': '',
                                    'type': 'text',
                                    'width': '100%',
                                    'height': '50px',
                                    'value': '',
                                    'class': 'col-md-2',
                                    disabled: true
                                })));
                                newRow2.append($('<td style="display:none;text-align: left;padding-left: 0px;padding-right: 0px;" class="col-md-2"/>').append($('<input />', {
                                    'id': "finished_" + i + j,
                                    'name': '',
                                    'type': 'text',
                                    'width': '100%',
                                    'height': '50px',
                                    'value': '',
                                    'class': 'col-md-2 ' + cityName[j] + '-' + tarih[i] + " finished_" + i + j,
                                    disabled: true
                                })));
                                newRow2.append($('<td style="display:none;text-align: left;padding-left: 0px;padding-right: 0px;" class="col-md-2"/>').append($('<input />', {
                                    'id': "remaining_" + i,
                                    'name': '',
                                    'type': 'text',
                                    'width': '100%',
                                    'height': '50px',
                                    'value': '',
                                    'class': 'col-md-2 ' + cityName[j] + '-' + tarih[i] + " remaining_" + i + j,
                                    disabled: true
                                })));
                            }
                        }

                        $("body").on("click", ".fa-chevron-circle-right", function() {
                            var i = $(this)[0].classList[3];

                            var cityYearThVal = $(this).data('i').toString() + $(this).data('l').toString();
                            $('.' + cityYearThVal).show();
                            $(this).hide();
                            $('#left-' + $(this).data('i').toString() + $(this).data('l').toString()).show();

                            $('.finished' + cityYearThVal).closest('td').show();
                            $('.remaining' + cityYearThVal).closest('td').show();


                            $('.finished_' + cityYearThVal).closest('td').show();
                            $('.remaining_' + cityYearThVal).closest('td').show();
                        });

                        $("body").on("click", ".fa-chevron-circle-left", function() {
                            var i = $(this)[0].classList[3];

                            var cityYearThVal = $(this).data('i').toString() + $(this).data('l').toString();
                            $('.' + cityYearThVal).hide();
                            $(this).hide();
                            $('#right-' + $(this).data('i').toString() + $(this).data('l').toString()).show();

                            $('.finished' + cityYearThVal).closest('td').hide();
                            $('.remaining' + cityYearThVal).closest('td').hide();

                            $('.finished_' + cityYearThVal).closest('td').hide();
                            $('.remaining_' + cityYearThVal).closest('td').hide();
                        });
                        newRow2.append($('<td style="text-align: left;padding-left: 0px;padding-right: 0px;"/>').append($('<input />', {
                            'id': 'worhBottomTotal',
                            'name': 'worhBottomTotal',
                            'type': 'text',
                            'width': '100%',
                            'height': '50px',
                            'value': '',
                            'class': 'col-md-2',
                            disabled: true
                        })));

                        newRow2.append($('<td style="text-align: left;padding-left: 0px;padding-right: 0px;"/>').append($('<input />', {
                            'id': 'aksarayBottomTotal',
                            'name': 'aksarayBottomTotal',
                            'type': 'text',
                            'width': '100%',
                            'height': '50px',
                            'value': '',
                            'class': 'col-md-2',
                            disabled: true
                        })));

                        newRow2.append($('<td style="text-align: left;padding-left: 0px;padding-right: 0px;" colspan="1"/>').append($('<input />', {
                            'id': 'satirTotal',
                            'name': '',
                            'type': 'text',
                            'width': '100%',
                            'height': '50px',
                            'value': '0',
                            'class': 'col-md-2',
                            disabled: true
                        })));
                        tbody.append(newRow2);
                        newTbl.append(tbody2);
                        $('#modalRemainingHour .modal-body #kp').append(newTbl);
                        $('#satirTotal').css('background-color', 'orange');
                        $('#projectTotalHours').css('background-color', 'yellow');
                        var datas = $('#modalRemainingHour .modal-body #kp #newTbl  tbody tr td');
                        if (datas.length > 0) {
                            datas.each(function(i, v) {
                                $(v).find('input').css('text-align', 'center');
                            });
                        }
                        // }
                        $(document).on("input", ".WavwUp", function() {
                            this.value = this.value.replace(/\D/g, '');
                        });

                        $(document).on("input", ".leftHourTotal", function() {
                            this.value = this.value.replace(/\D/g, '');
                        });

                        var totalHours = $("#totalBottomHour"),
                            totalHourSum = 0,
                            totalAvw060 = 0,
                            totalAvw152 = 0;

                        $(".leftHourTotal").on("blur", function() {
                            totalHourSum = 0;

                            var $this = $(this)
                            value = $(this).val(),
                                tr = $(this).parents('tr'),
                                avw060 = tr.find('.WavwUp').val(),
                                avw152 = tr.find('.AavwUp').val();

                            value = String.isNullOrWhiteSpace(value) ? 0 : parseFloat(value);
                            avw060 = String.isNullOrWhiteSpace(avw060) ? 0 : parseFloat(avw060);
                            avw152 = String.isNullOrWhiteSpace(avw152) ? 0 : parseFloat(avw152);
                            if (value != (avw060 + avw152)) {
                                $this.css('background', 'red');
                            } else {
                                $this.css('background', 'green');
                            }

                            $('.leftHourTotal').each(function(i, v) {
                                var value = $(v).val();
                                if (String.isNullOrWhiteSpace(value)) value = 0;

                                totalHourSum += parseFloat(value);
                            });

                            totalHours.val(totalHourSum);
                        });

                        var totalHour = 0;
                        $(".hour").on("blur", function() {
                            totalHour = 0;

                            var relationHourName = $(this).data('id'),
                                $relationHour = $(String.format("[data-id={0}]", relationHourName)),
                                totalInput = $(String.format("#total_{0}", relationHourName));

                            if ($relationHour.length > 0) {
                                $relationHour.each(function(i, v) {
                                    var value = $(v).val();
                                    if (String.isNullOrWhiteSpace(value)) value = 0;

                                    totalHour += parseFloat(value);
                                });
                            }

                            var city = $(this).data('city'),
                                currentRowRelationCities = $(this).parents('tr').find(String.format('input[data-city="{0}"]', city)),
                                relationCityTotal = 0;
                            if (currentRowRelationCities.length > 0) {
                                currentRowRelationCities.each(function(i, v) {
                                    var value = $(v).val();
                                    if (String.isNullOrWhiteSpace(value)) value = 0;

                                    relationCityTotal += parseFloat(value);
                                });
                            }

                            if (city.contains("Wörth")) {
                                $(this).parents('tr').find(".worh-total").text(relationCityTotal);

                                var wavwUpTotal = $(this).parents('tr').find(".WavwUp").val();
                                wavwUpTotal = String.isNullOrWhiteSpace(wavwUpTotal) ? 0 : parseFloat(wavwUpTotal);

                                var worhTotalBottom = 0;
                                $('.worh-total').each(function(i, v) {
                                    var value = $(this).text();
                                    if (String.isNullOrWhiteSpace(value)) value = 0;
                                    else value.trim();

                                    worhTotalBottom += parseFloat(value);
                                });
                                $("#worhBottomTotal").val(worhTotalBottom);

                                if (wavwUpTotal != relationCityTotal) {
                                    $(this).parents('tr').find(".worh-total").css('background', 'red');
                                } else {
                                    $(this).parents('tr').find(".worh-total").css('background', 'green');
                                }

                            } else {
                                $(this).parents('tr').find(".aksaray-total").text(relationCityTotal);

                                var avwUpTotal = $(this).parents('tr').find(".AavwUp").val();
                                avwUpTotal = String.isNullOrWhiteSpace(avwUpTotal) ? 0 : parseFloat(avwUpTotal);

                                var aksarayTotalBottom = 0;
                                $('.aksaray-total').each(function(i, v) {
                                    var value = $(this).text();
                                    if (String.isNullOrWhiteSpace(value)) value = 0;
                                    else value.trim();

                                    aksarayTotalBottom += parseFloat(value);
                                });
                                $("#aksarayBottomTotal").val(aksarayTotalBottom);

                                if (avwUpTotal != relationCityTotal) {
                                    $(this).parents('tr').find(".aksaray-total").css('background', 'red');
                                } else {
                                    $(this).parents('tr').find(".aksaray-total").css('background', 'green');
                                }
                            }

                            totalInput.val(totalHour);
                        });

                        $(document).on("input",
                            ".AavwUp",
                            function() {
                                this.value = this.value.replace(/\D/g, '');
                            });

                        $(document).on("input",
                            ".ınpuT",
                            function() {
                                this.value = this.value.replace(/\D/g, '');
                            });

                        var compare = "";
                        var hour = "";
                        var subTeamId = "";
                        var totalHourTeams = 0;
                        var recordId = "";
                        var compareCity = "";
                        $.each(projectValue,
                            function(key, value) {
                                var satirCount = parseInt(tarih.length) * (parseInt(cityName.length));
                                compare = value.City + "-" + value.Year;
                                compareCity = value.City;
                                subTeamId = value.SubTeamId;
                                hour = parseInt(value.Hour);
                                recordId = value.PublicId;
                                var datas = $('#modalRemainingHour #kp #newTbl tbody tr');
                                datas.splice(-1, 1);
                                if (datas.length > 0) {
                                    datas.each(function(i, v) {
                                        // Sub group satırı
                                        if (subTeamId === $(this).find('#groupName').data('id').split('-')[2]) {
                                            // bu satırdaki .ınpuT class lı ınputlar geziliyor ve tablo olusturulurken yetleştirilen tarih ve şehir ismine göre karşılaştırma yapılıp bulunuyor.
                                            if (value.Check === "false") {
                                                var inputs = $(this).find('.ınpuT');
                                                inputs.each(function(index, input) {
                                                    var cityAndYear = $(this).data('id') || "";
                                                    if (cityAndYear !== "" && cityAndYear.trim() === compare.trim()) {
                                                        $(this).val(hour);
                                                        $(this).attr("name", "");
                                                        $(this).attr("name", recordId);
                                                        totalHourTeams = totalHourTeams + hour;
                                                    }
                                                });
                                            } else {
                                                if (compareCity === "Wörth") {
                                                    var worthInput = $(this).find('#worthAwm' + i);
                                                    worthInput.val(hour);
                                                    worthInput.attr("name", "");
                                                    worthInput.attr("name", recordId);
                                                } else if (compareCity === "Aksaray") {
                                                    var aksarayInput = $(this).find('#aksarayAwm' + i);
                                                    aksarayInput.val(hour);
                                                    aksarayInput.attr("name", "");
                                                    aksarayInput.attr("name", recordId);
                                                }
                                            }
                                        }

                                        var worthToplam = $(v).find('.WavwUp').val();
                                        var aksarayToplam = $(v).find('.AavwUp').val();
                                        if (String.isNullOrWhiteSpace(worthToplam)) worthToplam = "0";
                                        if (String.isNullOrWhiteSpace(aksarayToplam)) aksarayToplam = "0";

                                        var waToplam = parseFloat(aksarayToplam) + parseFloat(worthToplam);
                                        $(v).find('.leftHourTotal').val(waToplam);
                                    });
                                }
                            });
                        $('#satirTotal').val(totalHourTeams);
                        // END REGİON
                        // #REGİON SONDAKİ KUTULARI DOLDURMA
                        var createData = $('#modalRemainingHour #kp #newTbl tbody tr td .ınpuT');
                        if (createData.length > 0) {
                            createData.each(function(i, v) {
                                var satirToplam = 0;
                                var sutunToplam = 0;
                                var datas = $(this).closest('tr').find('td .ınpuT');
                                if (datas.length > 0) {
                                    datas.each(function(i, v) {
                                        var x = parseInt($(this).val()) || 0;
                                        if ((parseInt($(this).val()) !== NaN)) {
                                            satirToplam += x;
                                        }
                                    });
                                }
                                $(this).closest('tr').find('td:last-child').text(satirToplam);

                                var lastData = $('#modalRemainingHour #kp #newTbl tbody tr td:last-child');
                                if (lastData.length > 0) {
                                    lastData.each(function(i, v) {
                                        var sToplam = parseInt($(v).text()) || 0;
                                        if ((parseInt($(v).text()) !== NaN)) {
                                            sutunToplam += sToplam;
                                        }
                                    });
                                }
                                $('#satirTotal').val(sutunToplam);
                            });
                            if (parseInt($('#satirTotal').val()) === parseInt($('#projectTotalHours').val().split(':')[1].trim())) {
                                $('#satirTotal').css('background-color', 'green');
                                $('#projectTotalHours').css('background-color', 'green');
                            }
                        }

                        //END REGİON
                        // $('#btnUpdateUP').prop('disabled', true);
                        var worthAksarayCheck = true;
                        $('#modalRemainingHour #kp #newTbl tbody tr td').on('blur', '.ınpuT', function(event) {
                            var satirToplam = 0;
                            var sutunToplam = 0;
                            var worthSatirToplam = 0;
                            var aksaraySatirToplam = 0;
                            var brazilSatirToplam = 0;
                            var datas = $(this).closest('tr').find('td .ınpuT');
                            if (datas.length > 0) {
                                worthSatirToplam = 0;
                                aksaraySatirToplam = 0;
                                datas.each(function(i, v) {
                                    var citz = $(this).data('id').split('-')[0];
                                    var x = parseInt($(this).val()) || 0;
                                    if ((parseInt($(this).val()) !== NaN)) {
                                        satirToplam += x;
                                        if (citz === "Wörth") {
                                            worthSatirToplam += x;
                                        } else if (citz === "Aksaray") {
                                            aksaraySatirToplam += x;
                                        } else if (citz === "Brazil") {
                                            brazilSatirToplam += x;
                                        }
                                    }
                                });
                            }
                            $(this).closest('tr').find('td:last-child').text(satirToplam);
                            var wortSatir060 = $(this).closest('tr').find('.WavwUp').val() || 0;
                            var aksaraySatir152 = $(this).closest('tr').find('.AavwUp').val() || 0;
                            if (worthSatirToplam > parseInt(wortSatir060)) {
                                worthCheckUpdate = false;
                                $($(this).closest('tr').find('.WavwUp')[0]).css('background-color', 'red');
                            } else if (worthSatirToplam < parseInt(wortSatir060)) {
                                worthCheckUpdate = true;
                                $($(this).closest('tr').find('.WavwUp')[0]).css('background-color', '');
                            } else if (worthSatirToplam == parseInt(wortSatir060)) {
                                worthCheckUpdate = true;
                                $($(this).closest('tr').find('.WavwUp')[0]).css('background-color', '');
                            }
                            if (aksaraySatirToplam > parseInt(aksaraySatir152)) {
                                aksarayCheckUpdate = false;
                                $($(this).closest('tr').find('.AavwUp')[0]).css('background-color', 'red');
                            } else if (aksaraySatirToplam < parseInt(aksaraySatir152)) {
                                aksarayCheckUpdate = true;
                                $($(this).closest('tr').find('.AavwUp')[0]).css('background-color', '');
                            } else if (aksaraySatirToplam == parseInt(aksaraySatir152)) {
                                aksarayCheckUpdate = true;
                                $($(this).closest('tr').find('.AavwUp')[0]).css('background-color', '');
                            }

                            var lastData = $('#modalRemainingHour #kp #newTbl tbody tr td:last-child');
                            if (lastData.length > 0) {
                                lastData.each(function(i, v) {
                                    var sToplam = parseInt($(v).text()) || 0;
                                    if ((parseInt($(v).text()) !== NaN)) {
                                        sutunToplam += sToplam;
                                    }
                                });
                            }
                            $('#satirTotal').val(sutunToplam);
                            if (parseInt($('#satirTotal').val().trim()) === parseInt($('#projectTotalHours').val().split(':')[1].trim())) {
                                $('#satirTotal').css('background-color', 'green');
                                $('#projectTotalHours').css('background-color', 'green');
                            } else if (parseInt($('#satirTotal').val().trim()) < parseInt($('#projectTotalHours').val().split(':')[1].trim())) {
                                $('#satirTotal').css('background-color', 'orange');
                                $('#projectTotalHours').css('background-color', 'yellow');
                            } else if (parseInt($('#satirTotal').val().trim()) > parseInt($('#projectTotalHours').val().split(':')[1].trim())) {
                                $('#satirTotal').css('background-color', 'red');
                                $('#projectTotalHours').css('background-color', 'yellow');
                            }

                            worthTotalHour = 0;
                            aksarayTotalHour = 0;
                            brazilTotalHour = 0;
                            var data = $('#modalRemainingHour #kp #newTbl tbody tr');
                            if (data.length > 0) {
                                data.each(function(i, v) {
                                    var datas = $(this).find('td .ınpuT');
                                    if (datas.length > 0) {
                                        datas.each(function(i, v) {
                                            var value = parseInt($(this).val()) || 0;
                                            var citz = $(this).data('id').split('-')[0];
                                            if ((value !== NaN) && citz === "Wörth") {
                                                worthTotalHour += value;
                                            } else if ((value !== NaN) && citz === "Aksaray") {
                                                aksarayTotalHour += value;
                                            } else if ((value !== NaN) && citz === "Brazil") {
                                                brazilTotalHour += value;
                                            }
                                        });
                                    }
                                });

                                $('#worthTotal').val(worthTotalHour);
                                $('#worthLeftHour').val(parseInt($('#team1').val()) - parseInt(worthTotalHour));
                                $('#aksarayTotal').val(aksarayTotalHour);
                                $('#aksarayLeftHour').val(parseInt($('#team2').val()) - parseInt(aksarayTotalHour));
                                $('#brazilTotal').val(brazilTotalHour);
                                $('#brazilLeftHour').val(parseInt($('#team3').val()) - parseInt(brazilTotalHour));

                                if (worthTotalHour > $('#team1').val()) {
                                    $('#worthTotal').closest('td').find('#worthp').text('');
                                    $('#worthTotal').closest('td').find('#worthp').text("The times you entered must not be greater than Wörth.");
                                    $('#worthTotal').css('background-color', 'red');
                                } else if (worthTotalHour < $('#team1').val()) {
                                    $('#worthTotal').closest('td').find('#worthp').text('');
                                    $('#worthTotal').closest('td').find('#worthp').text("The times you entered less than Wörth..");
                                    $('#worthTotal').css('background-color', 'orange');
                                } else if (worthTotalHour = $('#team1').val()) {
                                    $('#worthTotal').closest('td').find('#worthp').text('');
                                    $('#worthTotal').css('background-color', 'green');
                                }
                                if (aksarayTotalHour > $('#team2').val()) {
                                    $('#aksarayTotal').closest('td').find('#aksarayp').text('');
                                    $('#aksarayTotal').closest('td').find('#aksarayp').text("The times you entered must not be greater than Aksaray.");
                                    $('#aksarayTotal').css('background-color', 'red');
                                } else if (aksarayTotalHour < $('#team2').val()) {
                                    $('#aksarayTotal').closest('td').find('#aksarayp').text('');
                                    $('#aksarayTotal').closest('td').find('#aksarayp').text("The times you entered less than Aksaray..");
                                    $('#aksarayTotal').css('background-color', 'orange');
                                } else if (aksarayTotalHour = $('#team2').val()) {
                                    $('#aksarayTotal').closest('td').find('#aksarayp').text('');
                                    $('#aksarayTotal').css('background-color', 'green');
                                }
                                if (brazilTotalHour > $('#team3').val()) {
                                    $('#brazilTotal').closest('td').find('#brazilp').text('');
                                    $('#brazilTotal').closest('td').find('#brazilp').text("The times you entered must not be greater than Brazil.");
                                    $('#brazilTotal').css('background-color', 'red');
                                } else if (brazilTotalHour < $('#team3').val()) {
                                    $('#brazilTotal').closest('td').find('#brazilp').text('');
                                    $('#brazilTotal').closest('td').find('#brazilp').text("The times you entered less than Brazil.");
                                    $('#brazilTotal').css('background-color', 'orange');
                                } else if (brazilTotalHour = $('#team3').val()) {
                                    $('#brazilTotal').closest('td').find('#brazilp').text('');
                                    $('#brazilTotal').css('background-color', 'green');
                                }
                            }
                            var redVarmiAksayar = false;
                            var redVarmiWorth = false;
                            var avw60Total = 0;
                            var data = $('#modalRemainingHour #kp #newTbl tbody tr .WavwUp');
                            if (data.length > 0) {
                                data.each(function(i, v) {
                                    var value = parseInt($(this).val()) || 0;
                                    avw60Total += value;
                                    if ($(this).css('background-color') === "rgb(255, 0, 0)") {
                                        redVarmiWorth = true;
                                    }
                                });
                            }
                            var avw152Total = 0;
                            var data2 = $('#modalRemainingHour #kp #newTbl tbody tr .AavwUp');
                            if (data2.length > 0) {
                                data2.each(function(i, v) {
                                    var value = parseInt($(this).val()) || 0;
                                    avw152Total += value;
                                    if ($(this).css('background-color') === "rgb(255, 0, 0)") {
                                        redVarmiAksayar = true;
                                    }
                                });
                            }
                        });
                        $('#modalRemainingHour #kp #newTbl tbody tr td').on('blur',
                            '.AavwUp',
                            function(event) {
                                var deger = parseInt($(this).val()) || 0;
                                if (deger > parseInt(($('#team1').val()))) {
                                    $('#btnCreateCT').prop('disabled', true);
                                    $(this).css('background-color', 'red');
                                } else {
                                    $(this).css('background-color', '');
                                }
                                $(".leftHourTotal").trigger('blur');
                                $(this).parents('tr').find('.hour').trigger('blur');
                                GenelKontrol();
                            });
                        $('#modalRemainingHour #kp #newTbl tbody tr td').on('blur',
                            '.WavwUp',
                            function(event) {
                                // Worth
                                var deger = parseInt($(this).val()) || 0;
                                if (deger > parseInt(($('#team2').val()))) {
                                    $('#btnCreateCT').prop('disabled', false);
                                    $(this).css('background-color', 'red');
                                } else {
                                    $(this).css('background-color', '');
                                }
                                $(".leftHourTotal").trigger('blur');
                                $(this).parents('tr').find('.hour').trigger('blur');
                                GenelKontrol();
                            });

                        $(".hour").trigger('blur');
                        $(".leftHourTotal").trigger('blur');

                        function GenelKontrol() {
                            var avw152Total = 0;
                            var data2 = $('#modalRemainingHour #kp #newTbl tbody tr .AavwUp');
                            if (data2.length > 0) {
                                data2.each(function(i, v) {
                                    var value = parseInt($(this).val()) || 0;
                                    avw152Total += value;
                                });
                            }
                            var avw60Total = 0;
                            var data = $('#modalRemainingHour #kp #newTbl tbody tr .WavwUp');
                            if (data.length > 0) {
                                data.each(function(i, v) {
                                    var value = parseInt($(this).val()) || 0;
                                    avw60Total += value;
                                });
                            }

                            if ((avw152Total > parseInt($('#team2').val()) || (avw60Total > parseInt($('#team1').val())))) {
                                // $('#btnUpdateUP').prop('disabled', true);
                                worthAksarayCheck = false;
                            } else {
                                worthAksarayCheck = true;
                            }
                        }

                        setTimeout(function() {
                            $(".modal-backdrop").remove();
                        }, 3000);
                        $('#modalRemainingHour').on('hide.bs.modal', function(e) {
                            return false;
                        });

                        $('body').on('click', '#btnKapatXM', function() {
                            window.location.reload(true);
                        });

                    } else {
                        alertMsg('You cannot update until the distributed project hours are less or equals.');
                        clearMsgTimeOut(5000);
                    }
                });
                setTimeout(() => {
                    $.get(String.format('/lookuprelation/records?id=ABCF367722AC4EC495CF20832FD28571&recordId=' + $('#RecordPublicId').val() + '&pageSize=300&pageNumber=1&q=&filter=&fieldPublicId=409790159DB948A1AAD77DDACE8126AD&_=1579504845227')).done(function(memberResult) {
                        var memberProjectValue = [];
                        var memberCityName = [];
                        var memberTarih = [];
                        if (memberResult.PagedItems.ItemCount > 0) {
                            //Baslangıc memberTarihi Lr den gelen kayıtlarda en sonuncusu 2019 .
                            var mbst = $('label[for=795EB0EC0CAE46C38B60C3C0249DB823]').parent().data('value');
                            var mbtst = $('label[for=5CA2501DFFBA4A3D97D321154DF66FDA]').parent().data('value');
                            var mbastarihInt = 0;
                            var mbitTarihiInt = 0;
                            if (mbst.contains('/')) {
                                mbastarihInt = parseInt(mbst.split(' ')[0].split('/')[2]);
                                mbitTarihiInt = parseInt(mbtst.split(' ')[0].split('/')[2]);
                            } else {
                                mbastarihInt = parseInt(mbst.split(' ')[0].split('.')[2]);
                                mbitTarihiInt = parseInt(mbtst.split(' ')[0].split('.')[2]);
                            }

                            for (mbastarihInt; mbastarihInt <= mbitTarihiInt; mbastarihInt++) {
                                memberTarih.push(mbastarihInt);
                            }
                            $.each(memberResult.PagedItems.Items.reverse(), function(key, value) {
                                var memberLrYear = "";
                                // ingilizce TR ayrıştırma
                                if (value.Values.first('FieldPublicId', '05D13F76DE974E9D8641CBCA21CB9405').Value.contains('/')) {
                                    memberLrYear = value.Values.first('FieldPublicId', '05D13F76DE974E9D8641CBCA21CB9405').Value.split(' ')[0].split('/')[2];
                                } else {
                                    memberLrYear = value.Values.first('FieldPublicId', '05D13F76DE974E9D8641CBCA21CB9405').Value.split(' ')[0].split('.')[2];
                                }
                                var object = {
                                    TeamId: value.Values.first('FieldPublicId', 'A01B7204DD6B4D64A142C36C6A75D9C7').SelectedItemPublicIds,
                                    SubTeamId: value.Values.first('FieldPublicId', '22D80A703DC8471599308AE61682670C').SelectedItemPublicIds,
                                    WhiteHour: value.Values.first('FieldPublicId', 'B5BDFC55F79D48B18E4FEEB7D71EF5E8').Value,
                                    BlueHour: value.Values.first('FieldPublicId', 'AC5431D7BC734CADA40436093087AAC4').Value,
                                    SpecificCode3: value.Values.first('FieldPublicId', '028FFDFA928041B6AD64063A38DD7AA7').Value,
                                    Year: memberLrYear,
                                    PublicId: value.PublicId,
                                };
                                memberProjectValue.push(object);
                            });

                            var hour = "";
                            var subTeamId = "";
                            var recordId = "";
                            var specificCode3Value = "";
                            $.each(memberProjectValue,
                                function(key, value) {

                                    subTeamId = value.SubTeamId;
                                    whiteHour = parseInt(value.WhiteHour);
                                    blueHour = parseInt(value.BlueHour)
                                    totalDelegeHour = whiteHour + blueHour;
                                    recordId = value.PublicId;
                                    specificCode3Value = value.SpecificCode3;
                                    var memberDatas = $('#modalRemainingHour #kp #newTbl tbody tr');
                                    memberDatas.splice(-1, 1);
                                    if (memberDatas.length > 0) {
                                        memberDatas.each(function(i, v) {
                                            // Sub group satırı
                                            if (subTeamId === $(this).find('#groupName').data('id').split('-')[2]) {
                                                if (totalDelegeHour > 0) {
                                                    //var finishedInputs = $(this).find('.finished-hour' + value.Year);
                                                    if (specificCode3Value == "AVW 060") {
                                                        var finishedInput = $(this).find('[data-cityYear=Wörth' + value.Year + ']');
                                                        if (finishedInput.val() != "") {
                                                            var prevTotal = parseInt(finishedInput.val());
                                                            finishedInput.val(prevTotal + totalDelegeHour);
                                                        } else {
                                                            finishedInput.val(totalDelegeHour);
                                                        }
                                                    } else {
                                                        var finishedInput = $(this).find('[data-cityYear=Aksaray' + value.Year + ']');
                                                        if (finishedInput.val() != "") {
                                                            var prevTotal = parseInt(finishedInput.val());
                                                            finishedInput.val(prevTotal + totalDelegeHour);
                                                        } else {
                                                            finishedInput.val(totalDelegeHour);
                                                        }
                                                    }
                                                }
                                            }
                                        });
                                    }
                                });
                            var memberRows = $('#modalRemainingHour #kp #newTbl tbody tr');
                            if (memberRows.length > 0) {
                                memberRows.each(function(i, v) {

                                    var inputs = $(this).find('.ınpuT');
                                    inputs.each(function(i, input) {
                                        var inputId = $(this).data('tdid');
                                        var tr = $(this).closest('tr');
                                        var totalHourRow = tr.find('.hour' + inputId).val();
                                        var finishedHourRow = tr.find('.finished' + inputId).val();
                                        if (!String.isNullOrWhiteSpace(totalHourRow)) {
                                            if (String.isNullOrWhiteSpace(finishedHourRow)) {
                                                finishedHourRow = 0;
                                                tr.find('.finished' + inputId).val(finishedHourRow);
                                            }
                                            tr.find('.remaining' + inputId).val(parseInt(totalHourRow) - parseInt(finishedHourRow));
                                        }
                                    });

                                });
                            }
                            // #REGİON SONDAKİ KUTULARI DOLDURMA

                            var totalFinishedHour, totalRemainingHour;
                            var lastTdCount = -1;


                            $('#modalRemainingHour #kp #newTbl thead th').each(function(index) {
                                totalFinishedHour = 0;
                                var isValueExist = false;
                                // if ($(this).text() === 'Çalışılmış Saat' && $(this).data('city') != 'Wörth') {
                                var finishedRows = $('#modalRemainingHour #kp #newTbl tbody tr').find("td:eq(" + "'" + index + "'" + ") .finished");
                                finishedRows.each(function(i, v) {
                                    isValueExist = true;
                                    var finishedHourRowVal = $(this).val();
                                    if (String.isNullOrWhiteSpace(finishedHourRowVal)) {
                                        finishedHourRowVal = 0;
                                    }
                                    totalFinishedHour += parseInt(finishedHourRowVal);
                                });
                                if (finishedRows.length > 0) {
                                    lastTdCount += 0.5;
                                }
                                finishedRows = $('#modalRemainingHour #kp #newTbl tbody tr').find("td:eq(" + "'" + (index - 1) + "'" + ") .finished");
                                finishedRows.each(function(i, v) {
                                    isValueExist = true;
                                    var finishedHourRowVal = $(this).val();
                                    if (String.isNullOrWhiteSpace(finishedHourRowVal)) {
                                        finishedHourRowVal = 0;
                                    }
                                    totalFinishedHour += parseInt(finishedHourRowVal);
                                });

                                finishedRows = $('#modalRemainingHour #kp #newTbl tbody tr').find("td:eq(" + "'" + (index + 1) + "'" + ") .finished");
                                finishedRows.each(function(i, v) {
                                    isValueExist = true;
                                    var finishedHourRowVal = $(this).val();
                                    if (String.isNullOrWhiteSpace(finishedHourRowVal)) {
                                        finishedHourRowVal = 0;
                                    }
                                    totalFinishedHour += parseInt(finishedHourRowVal);
                                });
                                console.log(lastTdCount,
                                    isValueExist,
                                    $('.finished_' + lastRowTotalTd[lastTdCount]), totalFinishedHour);
                                if (lastTdCount % 1 == 0 && isValueExist && totalFinishedHour > 0) {
                                    $('.finished_' + lastRowTotalTd[lastTdCount]).val(totalFinishedHour);
                                }
                            });


                            var lastRemainingTdCount = -1;
                            $('#modalRemainingHour #kp #newTbl thead th').each(function(index) {
                                totalRemainingHour = 0;
                                var isValueExist = false;
                                // if ($(this).text() === 'Kalan Saat' && $(this).data('city') != 'Wörth') {
                                var remainingRows = $('#modalRemainingHour #kp #newTbl tbody tr').find("td:eq(" + "'" + index + "'" + ") .remaining");
                                if (remainingRows.length > 0) {
                                    lastRemainingTdCount += 0.5;
                                }
                                remainingRows.each(function(i, v) {
                                    isValueExist = true;
                                    var remainingHourRowVal = $(this).val();
                                    if (String.isNullOrWhiteSpace(remainingHourRowVal)) {
                                        remainingHourRowVal = 0;
                                    }
                                    totalRemainingHour += parseInt(remainingHourRowVal);
                                });
                                remainingRows = $('#modalRemainingHour #kp #newTbl tbody tr').find("td:eq(" + "'" + (index - 1) + "'" + ") .remaining");

                                remainingRows.each(function(i, v) {
                                    isValueExist = true;
                                    var remainingHourRowVal = $(this).val();
                                    if (String.isNullOrWhiteSpace(remainingHourRowVal)) {
                                        remainingHourRowVal = 0;
                                    }
                                    totalRemainingHour += parseInt(remainingHourRowVal);
                                });

                                remainingRows = $('#modalRemainingHour #kp #newTbl tbody tr').find("td:eq(" + "'" + (index + 1) + "'" + ") .remaining");

                                remainingRows.each(function(i, v) {
                                    isValueExist = true;
                                    var remainingHourRowVal = $(this).val();
                                    if (String.isNullOrWhiteSpace(remainingHourRowVal)) {
                                        remainingHourRowVal = 0;
                                    }
                                    totalRemainingHour += parseInt(remainingHourRowVal);
                                });
                                if (lastRemainingTdCount % 1 == 0 && isValueExist && totalRemainingHour > 0) {
                                    $('.remaining_' + lastRowTotalTd[lastRemainingTdCount]).val(totalRemainingHour);
                                }
                            });
                            $(lastRowTotalTd).each(function(i, v) {
                                if (String.isNullOrWhiteSpace($('.remaining_' + lastRowTotalTd[i]).val())) {
                                    $('.remaining_' + lastRowTotalTd[i]).val(0);
                                }
                            });


                        } else {
                            // alertMsg('You cannot update until the distributed project hours are less or equals.');
                            //clearMsgTimeOut(5000);
                        }
                    });
                }, 500);
                //delege ve kalan saat

            });
        }
    });
});