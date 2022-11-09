$(function() {

    var talebiacanId = $('#DCBB4E134A3E4158B99B13E8BD03D2B7').val();

    var coId = "18C0FE4C34C240C1B34497CE0D102199";
    var vfId = "40D7C1E513F540B89F3C3B7C5CE4ACA8";
    var url = 'https://karsanservice.setcrm.com/api/data/VfOkuma?coId=' + coId + '&vfId=' + vfId;
    var url2 = 'http://localhost:53015/api/data/VfOkuma?coId=' + coId + '&vfId=' + vfId;
    $.get(url, function(r) {
        if (r.IsOk === true) {
            $.each(r.Records, function(i, v) {
                var bayiyeAitSistemKullanicisi = v.Values.first('FieldPublicId', 'B447078C3D8C4ED2AEE6E3E95908A325').SelectedItemPublicIds;
                if (bayiyeAitSistemKullanicisi.includes("|")) {
                    var list = bayiyeAitSistemKullanicisi.split('|');
                    $.each(list, function(j, k) {
                        if (talebiacanId == list[j]) {
                            //  var firmaAdiId = v.Values.first('FieldPublicId', 'C99209BA72574F99B6556B7E45CFD018').SelectedItemPublicIds;
                            var firmaAdiId = v.PublicId;
                            var firmaAdi = v.Values.first('FieldPublicId', 'C99209BA72574F99B6556B7E45CFD018').Value;

                            $('#B043D98A3EBA4640A4F9FE5848DCE7E4 ').select2('data', {
                                id: firmaAdiId,
                                text: firmaAdi
                            }).trigger('change');

                            var teknikSorumlu = v.Values.first('FieldPublicId', 'B108F59F9C9B4E7AA7CCFE878941D3E0').Value;
                            var teknikSorumluId = v.Values.first('FieldPublicId', 'B108F59F9C9B4E7AA7CCFE878941D3E0').SelectedItemPublicIds;
                            $('#4E986C47542D46C99144AAA14DD3BA3C ').select2('data', {
                                id: teknikSorumluId,
                                text: teknikSorumlu
                            }).trigger('change');
                        }

                    });
                } else {
                    if (talebiacanId == bayiyeAitSistemKullanicisi) {


                        // var firmaAdiId = v.Values.first('FieldPublicId', 'C99209BA72574F99B6556B7E45CFD018').SelectedItemPublicIds;
                        var firmaAdiId = v.PublicId;
                        var firmaAdi = v.Values.first('FieldPublicId', 'C99209BA72574F99B6556B7E45CFD018').Value;

                        $('#B043D98A3EBA4640A4F9FE5848DCE7E4 ').select2('data', {
                            id: firmaAdiId,
                            text: firmaAdi
                        }).trigger('change');


                        var teknikSorumlu = v.Values.first('FieldPublicId', 'B108F59F9C9B4E7AA7CCFE878941D3E0').Value;
                        var teknikSorumluId = v.Values.first('FieldPublicId', 'B108F59F9C9B4E7AA7CCFE878941D3E0').SelectedItemPublicIds;
                        $('#4E986C47542D46C99144AAA14DD3BA3C ').select2('data', {
                            id: teknikSorumluId,
                            text: teknikSorumlu
                        }).trigger('change');
                    }
                }

            });
        }
    });
});


$(function() {

    var talebiacanId = $('#E4A062B4185546D09C7E256E7EFF4D4C').val();

    var coId = "18C0FE4C34C240C1B34497CE0D102199";
    var vfId = "40D7C1E513F540B89F3C3B7C5CE4ACA8";
    var url = 'https://karsanservice.setcrm.com/api/data/VfOkuma?coId=' + coId + '&vfId=' + vfId;
    var url2 = 'http://localhost:53015/api/data/VfOkuma?coId=' + coId + '&vfId=' + vfId;
    $.get(url, function(r) {
        if (r.IsOk === true) {
            $.each(r.Records, function(i, v) {

                var bayiyeAitSistemKullanicisi = v.Values.first('FieldPublicId', 'B447078C3D8C4ED2AEE6E3E95908A325').SelectedItemPublicIds;
                if (bayiyeAitSistemKullanicisi.includes("|")) {
                    var list = bayiyeAitSistemKullanicisi.split('|');
                    $.each(list, function(j, k) {
                        if (talebiacanId == list[j]) {
                            //var firmaAdiId = v.Values.first('FieldPublicId', 'C99209BA72574F99B6556B7E45CFD018').SelectedItemPublicIds;
                            var firmaAdiId = v.PublicId;
                            var firmaAdi = v.Values.first('FieldPublicId', 'C99209BA72574F99B6556B7E45CFD018').Value;

                            $('#9FC6970A05DD4C3E9F633C393BBFFB1F ').select2('data', {
                                id: firmaAdiId,
                                text: firmaAdi
                            }).trigger('change');

                            var teknikSorumlu = v.Values.first('FieldPublicId', 'B108F59F9C9B4E7AA7CCFE878941D3E0').Value;
                            var teknikSorumluId = v.Values.first('FieldPublicId', 'B108F59F9C9B4E7AA7CCFE878941D3E0').SelectedItemPublicIds;
                            $('#A752ECB5CE6543ACBD338454C9E9F971 ').select2('data', {
                                id: teknikSorumluId,
                                text: teknikSorumlu
                            }).trigger('change');
                        }

                    });
                } else {
                    if (talebiacanId == bayiyeAitSistemKullanicisi) {
                        var firmaAdiId = v.PublicId;
                        //var firmaAdiId = v.Values.first('FieldPublicId', 'C99209BA72574F99B6556B7E45CFD018').SelectedItemPublicIds;
                        var firmaAdi = v.Values.first('FieldPublicId', 'C99209BA72574F99B6556B7E45CFD018').Value;

                        $('#9FC6970A05DD4C3E9F633C393BBFFB1F ').select2('data', {
                            id: firmaAdiId,
                            text: firmaAdi
                        }).trigger('change');

                        var teknikSorumlu = v.Values.first('FieldPublicId', 'B108F59F9C9B4E7AA7CCFE878941D3E0').Value;
                        var teknikSorumluId = v.Values.first('FieldPublicId', 'B108F59F9C9B4E7AA7CCFE878941D3E0').SelectedItemPublicIds;
                        $('#A752ECB5CE6543ACBD338454C9E9F971 ').select2('data', {
                            id: teknikSorumluId,
                            text: teknikSorumlu
                        }).trigger('change');
                    }
                }

            });
        }
    });
});