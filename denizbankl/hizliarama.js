$(function() {

    $('label[for=71CB0A490BA441FE8215E9986B177FE8]').append('<div class="input-group" style="">  <input class="form-control input-sm" id="sicilInput" placeholder="Sicil no ile ara..."> <div class="input-group-addon" style="padding: 0;"><button type="button" id="personelSearch" class="btn btn-xs"><i class="fa fa-search"></i></button></div> </div>')

    $('body').on('click', '#personelSearch', function() {
        var sicilNo = $('#sicilInput').val();
        console.log(sicilNo);
        if (sicilNo === "") {

        } else {
            var url = String.format('//mayawebapi.denizbank.com/api/data/GetPersonelSicilNo?sicilNo={0}', sicilNo);
            $.get(url, function(r) {
                if (r.IsOk) {
                    $('#C41A352C06664C318992A3AA8A8E9B78').select2('data', { id: r.RecordId, text: sicilNo }).trigger('change');
                }
                // else {
                //     $('#personelSicilNo').select2('data', { id: "", text: "Arama Yapiniz." }).trigger('change');
                // }
            });
        }
    });

});