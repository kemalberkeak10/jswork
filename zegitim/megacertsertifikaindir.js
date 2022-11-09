$(function() {
    $('body').on('lookupRelationLoadTriggerEvent', function(e, relationId) {
        if (relationId === '72F58ED2BFC94C5A945CC6DE81551259') {
            $('.panel-lookup[data-id=72F58ED2BFC94C5A945CC6DE81551259] table tbody tr').each(function() {
                var publicid = $(this).closest('tr').data('id');
                $(this).find('td:last-child').prepend($('<a id="' + publicid + '" class="btn btn-primary btn-actions btn-sm btnUpdate" style="margin-right:3px">Formları İndir</a>'));
            });
        }
        if (relationId === 'C5A5BAF6B0934B17B1F31B57E9745CE1') {
            $('.panel-lookup[data-id=C5A5BAF6B0934B17B1F31B57E9745CE1] table tbody tr').each(function() {
                var publicid = $(this).closest('tr').data('id');
                $(this).find('td:last-child').prepend($('<a id="' + publicid + '" class="btn btn-primary btn-actions btn-sm btnUpdate" style="margin-right:3px">Formları İndir</a>'));
            });
        }
    });

    $('body').on('click',
        '.btnUpdate',
        function() {
            $('#modalKopyala').remove();
            window.setModal.Create({
                id: 'modalKopyala',
                html: {
                    header: 'Form Dili',
                    body: '<div id="msg" style="margin:0 0 5px"></div>',
                    footer: '<button id="btnFormIndir" class="btn btn-success btn-sm">Formları İndir</button>' +
                        '<button id="btnClose" data-dismiss="modal" class="btn btn-primary btn-sm">Vazgeç</button>'
                }
            });
            $('#modalKopyala .modal-body').html('<div id="msg" style="margin:0 0 5px"></div>' + '<div id="kayitPublicId" style="margin:0 0 5px"></div>' +
                '<table id="tblKopyala3" class="table table-striped table-hover">' +
                '<thead>' +
                '<tr><th>Doküman Tipi Seçiniz</th></tr>' +
                '</thead>' +
                '<tbody>' +
                '<tr><td><input id="dokumanTuru" type="select" value="" tabindex="-1" ></td></tr>' +
                '</tbody>' +
                '</table>');
            $('#modalKopyala .modal-body #kayitPublicId').attr('data-value', $(this).closest('tr').find('td[data-id=6ED4C2BFB88640138B25603785BDCA30]').data('value'));
            $('#modalKopyala .modal-body #kayitPublicId').attr('data-id', $(this).closest('tr').data('id'));
            $('#modalKopyala').modal('toggle');

            var headerViewData2 = [{
                    id: "turkce",
                    text: 'Türkçe'
                },
                {
                    id: 'ingilice',
                    text: 'İngilizce'
                },
                {
                    id: 'almanca',
                    text: 'Almanca'
                },
            ];
            prepareSelect2WithData('#dokumanTuru', headerViewData2);
        });

    $('body').on('click',
        '#btnFormIndir',
        function() {
            if ($('#dokumanTuru').val() === '') {
                setUtil.alert({
                    container: '#modalKopyala .modal-body #msg',
                    message: 'Lütfen Documan Tipi Seçiniz.',
                    alertClass: 'alert-danger',
                    autoClose: true
                });
            } else {
                var detayId = $('#modalKopyala .modal-body #kayitPublicId').data('value');
                var publicid = $('#modalKopyala .modal-body #kayitPublicId').data('id');
                var url = '/set/rapor-tipi/detail/' + detayId;
                var formArray = [];
                $.get(url, function(sdata) {
                    //raporTipiDetail
                    var elem = $('<div/>').html(sdata);
                    if ($('#dokumanTuru').val() === "turkce") {
                        var form1 = elem.find('label[for=26F5A6FC586544EBB27C7CC9DCD531F0]').parent().data('value');
                        var form2 = elem.find('label[for=C096ADF57BC84643ABC44FED390691EF]').parent().data('value');
                        var form3 = elem.find('label[for=32F12ED8A1AB4EE69245CE04251240D1]').parent().data('value');
                        var form4 = elem.find('label[for=B2757F467B194DE39564335EFA248361]').parent().data('value');
                        var form5 = elem.find('label[for=8BA2E84797A942F2A9038ADECC241452]').parent().data('value');
                        var form6 = elem.find('label[for=D56D5A6399684D91BCF71A5722BFAE8A]').parent().data('value');
                        var form7 = elem.find('label[for=26FB6DD3794947669CA262609EC0B49E]').parent().data('value');
                        var form8 = elem.find('label[for=73B40D7C066C4B84956EB996B69C019E]').parent().data('value');
                        var form9 = elem.find('label[for=9413415E94774FAA85F9967BD817E814]').parent().data('value');
                        var form10 = elem.find('label[for=1A046A99153F432C89955CC591A3214B]').parent().data('value');
                        var form11 = elem.find('label[for=4C153AEAEB4349D1AAD15EB96CF5F2C2]').parent().data('value');
                        var form12 = elem.find('label[for=392EBF6F15AA46C8AA17F74AE118B0BE]').parent().data('value');
                        var form13 = elem.find('label[for=FA89642476B346658E6E0A5E599C1391]').parent().data('value');
                        var form14 = elem.find('label[for=E5455A4ABFC040948A8831A7A5D8F588]').parent().data('value');
                        var form15 = elem.find('label[for=142D7B77DC374AC39699623F407A6E27]').parent().data('value');
                        var form16 = elem.find('label[for=F343D564134343F480593E757F104312]').parent().data('value');
                        var form17 = elem.find('label[for=3BDEE5E2E5EA4A5EB74694E5A776DEA9]').parent().data('value');
                        var form18 = elem.find('label[for=AC66744DD3D4432692352CA30AC48250]').parent().data('value');
                        var form19 = elem.find('label[for=39CD2D6766134195B40BC221459F0AB0]').parent().data('value');
                        var form20 = elem.find('label[for=1F71ABB441764755A172C90E14AF529F]').parent().data('value');
                        var form21 = elem.find('label[for=59178D46478D4782B7B02C37E279F1FE]').parent().data('value');
                        var form22 = elem.find('label[for=EAC968C723DB43DCB8B7E87A6B259F9B]').parent().data('value');
                        var form23 = elem.find('label[for=2B1FECC1D5A94F1796F82ABC5E589148]').parent().data('value');
                        var form24 = elem.find('label[for=25B9F425709A4364A76D3D85B9BC0BC0]').parent().data('value');
                        var form25 = elem.find('label[for=02533D8B9B0E4C07AAE8D445EEFD4904]').parent().data('value');


                        formArray.push(form1);
                        formArray.push(form2);
                        formArray.push(form3);
                        formArray.push(form4);
                        formArray.push(form5);
                        formArray.push(form6);
                        formArray.push(form7);
                        formArray.push(form8);
                        formArray.push(form9);
                        formArray.push(form10);
                        formArray.push(form11);
                        formArray.push(form12);
                        formArray.push(form13);
                        formArray.push(form14);
                        formArray.push(form15);
                        formArray.push(form16);
                        formArray.push(form17);
                        formArray.push(form18);
                        formArray.push(form19);
                        formArray.push(form20);
                        formArray.push(form21);
                        formArray.push(form22);
                        formArray.push(form23);
                        formArray.push(form24);
                        formArray.push(form25);
                    } else if ($('#dokumanTuru').val() === "ingilice") {
                        var form31 = elem.find('label[for=9369B13A45274AF7BCE02986527BE2D0]').parent().data('value');
                        var form32 = elem.find('label[for=8861862C7CF74771909312962E5B4AAB]').parent().data('value');
                        var form33 = elem.find('label[for=752ED875356E4728884C398375056CF2]').parent().data('value');
                        var form34 = elem.find('label[for=6D4A9EB408104051AB14B4A28DA72B8C]').parent().data('value');
                        var form35 = elem.find('label[for=A3F51DFE36BF47719E98685A8B66945B]').parent().data('value');
                        var form36 = elem.find('label[for=68162B732E86472D8C9897686B632A40]').parent().data('value');
                        var form37 = elem.find('label[for=BE72F141A850492996FFE8AD1E942A81]').parent().data('value');
                        var form38 = elem.find('label[for=83BCC62BC4A942229715EA61B9F13CC4]').parent().data('value');
                        var form39 = elem.find('label[for=56EC512A7C5D40158B0DDA464FE3E7F6]').parent().data('value');
                        var form40 = elem.find('label[for=C652B286AD644AC3A9697CDDC88CBB6D]').parent().data('value');
                        var form41 = elem.find('label[for=A50F25E3B7E04106BC7E914E91332F7D]').parent().data('value');
                        var form42 = elem.find('label[for=26A21D1548164CD78DCC91D9BBDF2550]').parent().data('value');
                        var form43 = elem.find('label[for=7081161532FD4E9BA5D632D9B0FA77F4]').parent().data('value');
                        var form44 = elem.find('label[for=F83B5F09EE154C389F31137A8296962C]').parent().data('value');
                        var form45 = elem.find('label[for=791084313C6D4B8993AF9AA590C3DDA8]').parent().data('value');
                        var form46 = elem.find('label[for=68FD7EC87CA444129C385982B0F5D369]').parent().data('value');
                        var form47 = elem.find('label[for=068FCCAEFFFA4C389BDFCF82C46D2BCB]').parent().data('value');
                        var form48 = elem.find('label[for=C69A059144C04DE5A45881B19E3CB7EB]').parent().data('value');
                        var form49 = elem.find('label[for=E8780785A7D144DDBF36552B56C6E043]').parent().data('value');
                        var form50 = elem.find('label[for=2700F96735834BA1B99448FBE72DB101]').parent().data('value');
                        var form51 = elem.find('label[for=377507D4271441E8BA930B67B439C1F0]').parent().data('value');
                        var form52 = elem.find('label[for=A85B18B954D84A02B8323AFAA19AC7D0]').parent().data('value');
                        var form53 = elem.find('label[for=1FFC615F97B44A0A8E2D23B8EE9E849F]').parent().data('value');
                        var form54 = elem.find('label[for=D2C93CAB88584A93AF537124451435FE]').parent().data('value');
                        var form55 = elem.find('label[for=70B6FFF4765742A3A958D6A4933A148B]').parent().data('value');
                        var form56 = elem.find('label[for=E2626E128600409EA4A6953DDFBEB8F1]').parent().data('value');
                        var form57 = elem.find('label[for=F9C2BDFCB2F94758BA904E8E264BE174]').parent().data('value');
                        var form58 = elem.find('label[for=45F15CBCE74A40B391E1CEEE7FE1ED78]').parent().data('value');
                        var form59 = elem.find('label[for=1FCC8D1877AD4D8C95AE86B85F6BE834]').parent().data('value');
                        var form60 = elem.find('label[for=10DEE79EEACD4A28BFF46F47D413CB3C]').parent().data('value');

                        formArray.push(form31);
                        formArray.push(form32);
                        formArray.push(form33);
                        formArray.push(form34);
                        formArray.push(form35);
                        formArray.push(form36);
                        formArray.push(form37);
                        formArray.push(form38);
                        formArray.push(form39);
                        formArray.push(form40);
                        formArray.push(form41);
                        formArray.push(form42);
                        formArray.push(form43);
                        formArray.push(form44);
                        formArray.push(form45);
                        formArray.push(form46);
                        formArray.push(form47);
                        formArray.push(form48);
                        formArray.push(form49);
                        formArray.push(form50);
                        formArray.push(form51);
                        formArray.push(form52);
                        formArray.push(form53);
                        formArray.push(form54);
                        formArray.push(form55);
                        formArray.push(form56);
                        formArray.push(form57);
                        formArray.push(form58);
                        formArray.push(form59);
                        formArray.push(form60);

                    } else if ($('#dokumanTuru').val() === "almanca") {
                        var form61 = elem.find('label[for=B3AC787BCD5149058C5A16BAB8B3AC71]').parent().data('value');
                        var form62 = elem.find('label[for=F44E3601019E4ABB9BF5021CA75B4E00]').parent().data('value');
                        var form63 = elem.find('label[for=5A11F846664F40F9B73B0516B3B339E3]').parent().data('value');
                        var form64 = elem.find('label[for=A568FCE5EB084716A670C0620E7779D3]').parent().data('value');
                        var form65 = elem.find('label[for=957E74FD9999409C9A2F39248DBDBF45]').parent().data('value');
                        var form66 = elem.find('label[for=F5B777EBC8CC45E098400DD72F32B6BE]').parent().data('value');
                        var form67 = elem.find('label[for=520B76B276F542A9A4ED309239ECFBCD]').parent().data('value');
                        var form68 = elem.find('label[for=50487BB842564553B87BEDBB47480066]').parent().data('value');
                        var form69 = elem.find('label[for=847214DF9CC94DBAAAB08D4BBF131D97]').parent().data('value');
                        var form70 = elem.find('label[for=402DFB73B59540B094D5DF38FB13E914]').parent().data('value');
                        var form71 = elem.find('label[for=31A8EDD56C8B4E6A942C9F662BC12BFB]').parent().data('value');

                        var form72 = elem.find('label[for=3DABBA2B4C5749AE9F368A6B1FFE143D]').parent().data('value');
                        var form73 = elem.find('label[for=D036358F71EC45D584B7F907794BC471]').parent().data('value');
                        var form74 = elem.find('label[for=3D2FF09C461F4578A20E25E5742705E4]').parent().data('value');
                        var form75 = elem.find('label[for=55BD9AF2D42B40AC9F8E4A76C212CF89]').parent().data('value');

                        var form76 = elem.find('label[for=160916AABC4646C892DC51C3A35207B2]').parent().data('value');
                        var form77 = elem.find('label[for=01F3130EE0A945A890289CEA28922343]').parent().data('value');
                        var form78 = elem.find('label[for=241C4E7B881C48D5AB4BDF1C41C76B24]').parent().data('value');
                        var form79 = elem.find('label[for=1A725F0D743148EEBADF66DB66321A15]').parent().data('value');
                        var form80 = elem.find('label[for=00131426DB4F40D29D47E3A3ED7490F6]').parent().data('value');
                        var form81 = elem.find('label[for=FF38DFA743394A138977F10DC3952974]').parent().data('value');
                        var form82 = elem.find('label[for=0EE96D11F6D147E28651FBF33E4CC3E8]').parent().data('value');
                        var form83 = elem.find('label[for=216067FB9CE74579B12764B98CFF265B]').parent().data('value');
                        var form84 = elem.find('label[for=C372D371947C467DAF153D7438CC24AD]').parent().data('value');
                        var form85 = elem.find('label[for=A1C90E8793DB40D98BE8F9750CC7F076]').parent().data('value');
                        var form86 = elem.find('label[for=F31951460EE3469AA295E260EA5F5BC8]').parent().data('value');
                        var form87 = elem.find('label[for=E1B4B1C6FC3847FEB2DF8DE3B6BBD67F]').parent().data('value');
                        var form88 = elem.find('label[for=6F5E4A39B2D746618E5D41A2040AFB91]').parent().data('value');
                        var form89 = elem.find('label[for=43C51C7577A94D33A5AC1D0E73FCA9FC]').parent().data('value');
                        var form90 = elem.find('label[for=1E21CBCE913046DEB5C327947621A223]').parent().data('value');

                        formArray.push(form61);
                        formArray.push(form62);
                        formArray.push(form63);
                        formArray.push(form64);
                        formArray.push(form65);
                        formArray.push(form66);
                        formArray.push(form67);
                        formArray.push(form68);
                        formArray.push(form69);
                        formArray.push(form70);
                        formArray.push(form71);
                        formArray.push(form72);
                        formArray.push(form73);
                        formArray.push(form74);
                        formArray.push(form75);
                        formArray.push(form76);
                        formArray.push(form77);
                        formArray.push(form78);
                        formArray.push(form79);
                        formArray.push(form80);
                        formArray.push(form81);
                        formArray.push(form82);
                        formArray.push(form83);
                        formArray.push(form84);
                        formArray.push(form85);
                        formArray.push(form86);
                        formArray.push(form87);
                        formArray.push(form88);
                        formArray.push(form89);
                        formArray.push(form90);


                    }

                    $('#modalKopyala').modal('toggle');
                    $.each(formArray, function(key, value) {
                        if (value !== "" && value !== undefined) {
                            // var url = "https://maya.setcrm.com/formtemplate/get/?id=" + value + "&coId=0EC1A5FEB600458C92ACBFB1746EC54D&recordId=" + publicid;
                            window.open("https://maya.setcrm.com/formtemplate/get/?id=" + value + "&coId=0EC1A5FEB600458C92ACBFB1746EC54D&recordId=" + publicid, "_blank");
                        }
                    });
                });
            }
        });
});