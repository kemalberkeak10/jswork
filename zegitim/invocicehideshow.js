$(function() {
    if ($('div [for=477E9D8D67D04824A6B0C0227CD22891]').parent().data().publicids !== null) {
        var statu = $('div [for=477E9D8D67D04824A6B0C0227CD22891]').parent().data().publicids;
    }

    if (statu == "88D2229B32534905833FFA2011995BF5") /*xray statu*/ {
        $('a[data-publicid= 5D269E9A16584586A01EB885CBD639BE]').closest('td').hide(); //open medical Form
        $('a[data-publicid= 3A5CDF27A8EA4B6F8CD41FB50F0F9EF1]').closest('td').hide(); //With Accounted
        $('a[data-publicid= 0D4FC71E01144AB3A16390000F649098]').closest('td').hide(); //Medication Check
        $('a[data-publicid= 16879AF614434B98AC2E94C12DFBF09E]').closest('td').show();
        $('a[data-publicid= 16879AF614434B98AC2E94C12DFBF09E]').show(); //X-Ray
        $('a[data-publicid= 6F694F6DBD304745A64F539E7DB7A62F]').closest('td').hide(); //We Took Payment
        $('a[data-publicid= E850A6F8CEF24F148C4995570191802E]').closest('td').hide(); //Take Him To The Next Doctor
        $('a[data-publicid= 602A8C560FD04F6796159E78C0A18B21]').closest('td').hide(); //Send To Interview
        $('a[data-publicid= 247960BC33AE4BB185B409EEC0BDD612]').closest('td').hide(); //With Photographer
        $('a[data-publicid= 6D20E2A9E73A43B59DB3ACDD47F951B7]').closest('td').hide(); //Request A Car
        $('a[data-publicid= 83DFA5803998437BA0C6779C1F81DFA5]').closest('td').hide(); //Inter Interview
        $('a[data-publicid= 5627B7E24F2C42DCBC0D41C066DEF8F9]').closest('td').hide(); //Finished Photographer
        $('a[data-publicid= E14C74E8A64F4BBD983234B6CC85E6F6]').closest('td').hide(); //Next Visit Day
        $('a[data-publicid= 746DA67F0C814DBF889B29C3FCEDB0FA]').closest('td').hide(); //Finished Interview
        $('a[data-publicid= E02BD894B0394EADB9AAF19A1EF8FD20]').closest('td').hide(); //Waiting The Doctor
        $('a[data-publicid= 432A1F3EA144450298897FF6ACD2B2B2]').closest('td').hide(); //Accounted today
        $('a[data-publicid= 17855BD0A233480FAD4C3F77C25B85CF]').closest('td').hide(); //With the doctor

    }

    if (statu == "C3361B08C66B4DCC8D5F236649E3ABAB") /*waiting interview statu*/ {
        $('a[data-publicid= 5D269E9A16584586A01EB885CBD639BE]').closest('td').hide(); //open medical Form
        $('a[data-publicid= 3A5CDF27A8EA4B6F8CD41FB50F0F9EF1]').closest('td').hide(); //With Accounted
        $('a[data-publicid= 0D4FC71E01144AB3A16390000F649098]').closest('td').hide(); //Medication Check
        $('a[data-publicid= 16879AF614434B98AC2E94C12DFBF09E]').closest('td').hide(); //X-Ray
        $('a[data-publicid= 6F694F6DBD304745A64F539E7DB7A62F]').closest('td').hide(); //We Took Payment
        $('a[data-publicid= E850A6F8CEF24F148C4995570191802E]').closest('td').hide(); //Take Him To The Next Doctor
        $('a[data-publicid= 602A8C560FD04F6796159E78C0A18B21]').closest('td').hide();
        $('a[data-publicid= 602A8C560FD04F6796159E78C0A18B21]').show(); //Send To Interview
        $('a[data-publicid= 247960BC33AE4BB185B409EEC0BDD612]').closest('td').hide(); //With Photographer
        $('a[data-publicid= 6D20E2A9E73A43B59DB3ACDD47F951B7]').closest('td').hide(); //Request A Car
        $('a[data-publicid= 83DFA5803998437BA0C6779C1F81DFA5]').closest('td').hide(); //Inter Interview
        $('a[data-publicid= 5627B7E24F2C42DCBC0D41C066DEF8F9]').closest('td').hide(); //Finished Photographer
        $('a[data-publicid= E14C74E8A64F4BBD983234B6CC85E6F6]').closest('td').hide(); //Next Visit Day
        $('a[data-publicid= 746DA67F0C814DBF889B29C3FCEDB0FA]').closest('td').hide(); //Finished Interview
        $('a[data-publicid= E02BD894B0394EADB9AAF19A1EF8FD20]').closest('td').hide(); //Waiting The Doctor
        $('a[data-publicid= 432A1F3EA144450298897FF6ACD2B2B2]').closest('td').hide(); //Accounted today
        $('a[data-publicid= 17855BD0A233480FAD4C3F77C25B85CF]').closest('td').hide(); //With the doctor
        $('a[data-publicid=746DA67F0C814DBF889B29C3FCEDB0FA]').hide();
    }

    if (statu == "E97FBBC082314661B281373FD893FD1C") /*interview room statu*/ {
        $('a[data-publicid= 5D269E9A16584586A01EB885CBD639BE]').closest('td').hide(); //open medical Form
        $('a[data-publicid= 3A5CDF27A8EA4B6F8CD41FB50F0F9EF1]').closest('td').hide(); //With Accounted
        $('a[data-publicid= 0D4FC71E01144AB3A16390000F649098]').closest('td').hide(); //Medication Check
        $('a[data-publicid= 16879AF614434B98AC2E94C12DFBF09E]').closest('td').hide(); //X-Ray
        $('a[data-publicid= 6F694F6DBD304745A64F539E7DB7A62F]').closest('td').hide(); //We Took Payment
        $('a[data-publicid= E850A6F8CEF24F148C4995570191802E]').closest('td').hide(); //Take Him To The Next Doctor
        $('a[data-publicid= 602A8C560FD04F6796159E78C0A18B21]').closest('td').hide(); //Send To Interview
        $('a[data-publicid= 247960BC33AE4BB185B409EEC0BDD612]').closest('td').hide(); //With Photographer
        $('a[data-publicid= 6D20E2A9E73A43B59DB3ACDD47F951B7]').closest('td').hide(); //Request A Car
        $('a[data-publicid= 83DFA5803998437BA0C6779C1F81DFA5]').closest('td').show();
        $('a[data-publicid= 83DFA5803998437BA0C6779C1F81DFA5]').show(); //Inter Interview
        $('a[data-publicid= 5627B7E24F2C42DCBC0D41C066DEF8F9]').closest('td').hide(); //Finished Photographer
        $('a[data-publicid= E14C74E8A64F4BBD983234B6CC85E6F6]').closest('td').hide(); //Next Visit Day
        $('a[data-publicid= 746DA67F0C814DBF889B29C3FCEDB0FA]').closest('td').hide(); //Finished Interview
        $('a[data-publicid= E02BD894B0394EADB9AAF19A1EF8FD20]').closest('td').hide(); //Waiting The Doctor
        $('a[data-publicid= 432A1F3EA144450298897FF6ACD2B2B2]').closest('td').hide(); //Accounted today
        $('a[data-publicid= 17855BD0A233480FAD4C3F77C25B85CF]').closest('td').hide(); //With the doctor
    }

    if (statu == "E7F9399E59F9451A9ABDC12BA0F911AD") /*Waiting Patient Payment  statu*/ {
        $('a[data-publicid= 5D269E9A16584586A01EB885CBD639BE]').closest('td').hide(); //open medical Form
        $('a[data-publicid= 3A5CDF27A8EA4B6F8CD41FB50F0F9EF1]').closest('td').hide(); //With Accounted
        $('a[data-publicid= 0D4FC71E01144AB3A16390000F649098]').closest('td').hide(); //Medication Check
        $('a[data-publicid= 16879AF614434B98AC2E94C12DFBF09E]').closest('td').hide(); //X-Ray
        $('a[data-publicid= 6F694F6DBD304745A64F539E7DB7A62F]').closest('td').hide(); //We Took Payment
        $('a[data-publicid= E850A6F8CEF24F148C4995570191802E]').closest('td').hide(); //Take Him To The Next Doctor
        $('a[data-publicid= 602A8C560FD04F6796159E78C0A18B21]').closest('td').hide(); //Send To Interview
        $('a[data-publicid= 247960BC33AE4BB185B409EEC0BDD612]').closest('td').hide(); //With Photographer
        $('a[data-publicid= 6D20E2A9E73A43B59DB3ACDD47F951B7]').closest('td').hide(); //Request A Car
        $('a[data-publicid= 83DFA5803998437BA0C6779C1F81DFA5]').closest('td').hide(); //Inter Interview
        $('a[data-publicid= 5627B7E24F2C42DCBC0D41C066DEF8F9]').closest('td').hide(); //Finished Photographer
        $('a[data-publicid= E14C74E8A64F4BBD983234B6CC85E6F6]').closest('td').hide(); //Next Visit Day
        $('a[data-publicid= 746DA67F0C814DBF889B29C3FCEDB0FA]').closest('td').show();
        $('a[data-publicid= 746DA67F0C814DBF889B29C3FCEDB0FA]').hide(); //Finished Interview
        $('a[data-publicid= E02BD894B0394EADB9AAF19A1EF8FD20]').closest('td').hide(); //Waiting The Doctor
        $('a[data-publicid= 432A1F3EA144450298897FF6ACD2B2B2]').closest('td').hide(); //Accounted today
        $('a[data-publicid= 17855BD0A233480FAD4C3F77C25B85CF]').closest('td').hide(); //With the doctor
    }

    if (statu == "5B0F5E6225C44F1C9CD70F44C09E5B62") /*Go to Accountant statu*/ {
        $('a[data-publicid= 5D269E9A16584586A01EB885CBD639BE]').closest('td').hide(); //open medical Form
        $('a[data-publicid= 3A5CDF27A8EA4B6F8CD41FB50F0F9EF1]').closest('td').hide(); //With Accounted
        $('a[data-publicid= 0D4FC71E01144AB3A16390000F649098]').closest('td').hide(); //Medication Check
        $('a[data-publicid= 16879AF614434B98AC2E94C12DFBF09E]').closest('td').hide(); //X-Ray
        $('a[data-publicid= 6F694F6DBD304745A64F539E7DB7A62F]').closest('td').hide(); //We Took Payment
        $('a[data-publicid= E850A6F8CEF24F148C4995570191802E]').closest('td').hide(); //Take Him To The Next Doctor
        $('a[data-publicid= 602A8C560FD04F6796159E78C0A18B21]').closest('td').hide(); //Send To Interview
        $('a[data-publicid= 247960BC33AE4BB185B409EEC0BDD612]').closest('td').hide(); //With Photographer
        $('a[data-publicid= 6D20E2A9E73A43B59DB3ACDD47F951B7]').closest('td').hide(); //Request A Car
        $('a[data-publicid= 83DFA5803998437BA0C6779C1F81DFA5]').closest('td').hide(); //Inter Interview
        $('a[data-publicid= 5627B7E24F2C42DCBC0D41C066DEF8F9]').closest('td').hide(); //Finished Photographer
        $('a[data-publicid= E14C74E8A64F4BBD983234B6CC85E6F6]').closest('td').hide(); //Next Visit Day
        $('a[data-publicid= 746DA67F0C814DBF889B29C3FCEDB0FA]').closest('td').hide(); //Finished Interview
        $('a[data-publicid= E02BD894B0394EADB9AAF19A1EF8FD20]').closest('td').hide(); //Waiting The Doctor
        $('a[data-publicid= 432A1F3EA144450298897FF6ACD2B2B2]').closest('td').show();
        $('a[data-publicid= 432A1F3EA144450298897FF6ACD2B2B2]').show(); //Accounted today
        $('a[data-publicid= 17855BD0A233480FAD4C3F77C25B85CF]').closest('td').hide(); //With the doctor
    }

    if (statu == "694A2F1AA534461899BB81BAC5D4403E") /*Accountant statu*/ {
        $('a[data-publicid= 5D269E9A16584586A01EB885CBD639BE]').closest('td').hide(); //open medical Form
        $('a[data-publicid= 3A5CDF27A8EA4B6F8CD41FB50F0F9EF1]').closest('td').show();
        $('a[data-publicid= 3A5CDF27A8EA4B6F8CD41FB50F0F9EF1]').show(); //With Accounted
        $('a[data-publicid= 0D4FC71E01144AB3A16390000F649098]').closest('td').hide(); //Medication Check
        $('a[data-publicid= 16879AF614434B98AC2E94C12DFBF09E]').closest('td').hide(); //X-Ray
        $('a[data-publicid= 6F694F6DBD304745A64F539E7DB7A62F]').closest('td').hide(); //We Took Payment
        $('a[data-publicid= E850A6F8CEF24F148C4995570191802E]').closest('td').hide(); //Take Him To The Next Doctor
        $('a[data-publicid= 602A8C560FD04F6796159E78C0A18B21]').closest('td').hide(); //Send To Interview
        $('a[data-publicid= 247960BC33AE4BB185B409EEC0BDD612]').closest('td').hide(); //With Photographer
        $('a[data-publicid= 6D20E2A9E73A43B59DB3ACDD47F951B7]').closest('td').hide(); //Request A Car
        $('a[data-publicid= 83DFA5803998437BA0C6779C1F81DFA5]').closest('td').hide(); //Inter Interview
        $('a[data-publicid= 5627B7E24F2C42DCBC0D41C066DEF8F9]').closest('td').hide(); //Finished Photographer
        $('a[data-publicid= E14C74E8A64F4BBD983234B6CC85E6F6]').closest('td').hide(); //Next Visit Day
        $('a[data-publicid= 746DA67F0C814DBF889B29C3FCEDB0FA]').closest('td').hide(); //Finished Interview
        $('a[data-publicid= E02BD894B0394EADB9AAF19A1EF8FD20]').closest('td').hide(); //Waiting The Doctor
        $('a[data-publicid= 432A1F3EA144450298897FF6ACD2B2B2]').closest('td').hide(); //Accounted today
        $('a[data-publicid= 17855BD0A233480FAD4C3F77C25B85CF]').closest('td').hide(); //With the doctor
    }

    if (statu == "FA00E9AB7E234D37BC0641D7795CBA1E") /*we took payment statu*/ {
        $('a[data-publicid= 5D269E9A16584586A01EB885CBD639BE]').closest('td').hide(); //open medical Form
        $('a[data-publicid= 3A5CDF27A8EA4B6F8CD41FB50F0F9EF1]').closest('td').hide(); //With Accounted
        $('a[data-publicid= 0D4FC71E01144AB3A16390000F649098]').closest('td').hide(); //Medication Check
        $('a[data-publicid= 16879AF614434B98AC2E94C12DFBF09E]').closest('td').hide(); //X-Ray
        $('a[data-publicid= 6F694F6DBD304745A64F539E7DB7A62F]').closest('td').show();
        $('a[data-publicid= 6F694F6DBD304745A64F539E7DB7A62F]').show(); //We Took Payment
        $('a[data-publicid= E850A6F8CEF24F148C4995570191802E]').closest('td').hide(); //Take Him To The Next Doctor
        $('a[data-publicid= 602A8C560FD04F6796159E78C0A18B21]').closest('td').hide(); //Send To Interview
        $('a[data-publicid= 247960BC33AE4BB185B409EEC0BDD612]').closest('td').hide(); //With Photographer
        $('a[data-publicid= 6D20E2A9E73A43B59DB3ACDD47F951B7]').closest('td').hide(); //Request A Car
        $('a[data-publicid= 83DFA5803998437BA0C6779C1F81DFA5]').closest('td').hide(); //Inter Interview
        $('a[data-publicid= 5627B7E24F2C42DCBC0D41C066DEF8F9]').closest('td').hide(); //Finished Photographer
        $('a[data-publicid= E14C74E8A64F4BBD983234B6CC85E6F6]').closest('td').hide(); //Next Visit Day
        $('a[data-publicid= 746DA67F0C814DBF889B29C3FCEDB0FA]').closest('td').hide(); //Finished Interview
        $('a[data-publicid= E02BD894B0394EADB9AAF19A1EF8FD20]').closest('td').hide(); //Waiting The Doctor
        $('a[data-publicid= 432A1F3EA144450298897FF6ACD2B2B2]').closest('td').hide(); //Accounted today
        $('a[data-publicid= 17855BD0A233480FAD4C3F77C25B85CF]').closest('td').hide(); //With the doctor
    }

    if (statu == "62BCBBDE4AAA41D18DFC27DF84E9E931") /*with photographer statu*/ {
        $('a[data-publicid= 5D269E9A16584586A01EB885CBD639BE]').closest('td').hide(); //open medical Form
        $('a[data-publicid= 3A5CDF27A8EA4B6F8CD41FB50F0F9EF1]').closest('td').hide(); //With Accounted
        $('a[data-publicid= 0D4FC71E01144AB3A16390000F649098]').closest('td').hide(); //Medication Check
        $('a[data-publicid= 16879AF614434B98AC2E94C12DFBF09E]').closest('td').hide(); //X-Ray
        $('a[data-publicid= 6F694F6DBD304745A64F539E7DB7A62F]').closest('td').hide(); //We Took Payment
        $('a[data-publicid= E850A6F8CEF24F148C4995570191802E]').closest('td').hide(); //Take Him To The Next Doctor
        $('a[data-publicid= 602A8C560FD04F6796159E78C0A18B21]').closest('td').hide(); //Send To Interview
        $('a[data-publicid= 247960BC33AE4BB185B409EEC0BDD612]').closest('td').show();
        $('a[data-publicid= 247960BC33AE4BB185B409EEC0BDD612]').show(); //With Photographer
        $('a[data-publicid= 6D20E2A9E73A43B59DB3ACDD47F951B7]').closest('td').hide(); //Request A Car
        $('a[data-publicid= 83DFA5803998437BA0C6779C1F81DFA5]').closest('td').hide(); //Inter Interview
        $('a[data-publicid= 5627B7E24F2C42DCBC0D41C066DEF8F9]').closest('td').hide(); //Finished Photographer
        $('a[data-publicid= E14C74E8A64F4BBD983234B6CC85E6F6]').closest('td').hide(); //Next Visit Day
        $('a[data-publicid= 746DA67F0C814DBF889B29C3FCEDB0FA]').closest('td').hide(); //Finished Interview
        $('a[data-publicid= E02BD894B0394EADB9AAF19A1EF8FD20]').closest('td').hide(); //Waiting The Doctor
        $('a[data-publicid= 432A1F3EA144450298897FF6ACD2B2B2]').closest('td').hide(); //Accounted today
        $('a[data-publicid= 17855BD0A233480FAD4C3F77C25B85CF]').closest('td').hide(); //With the doctor
    }

    if (statu == "4E3D40CB4A55499A8BF3691FFFB24FE0") /*finished photographer statu*/ {
        $('a[data-publicid= 5D269E9A16584586A01EB885CBD639BE]').closest('td').hide(); //open medical Form
        $('a[data-publicid= 3A5CDF27A8EA4B6F8CD41FB50F0F9EF1]').closest('td').hide(); //With Accounted
        $('a[data-publicid= 0D4FC71E01144AB3A16390000F649098]').closest('td').hide(); //Medication Check
        $('a[data-publicid= 16879AF614434B98AC2E94C12DFBF09E]').closest('td').hide(); //X-Ray
        $('a[data-publicid= 6F694F6DBD304745A64F539E7DB7A62F]').closest('td').hide(); //We Took Payment
        $('a[data-publicid= E850A6F8CEF24F148C4995570191802E]').closest('td').hide(); //Take Him To The Next Doctor
        $('a[data-publicid= 602A8C560FD04F6796159E78C0A18B21]').closest('td').hide(); //Send To Interview
        $('a[data-publicid= 247960BC33AE4BB185B409EEC0BDD612]').closest('td').hide(); //With Photographer
        $('a[data-publicid= 6D20E2A9E73A43B59DB3ACDD47F951B7]').closest('td').hide(); //Request A Car
        $('a[data-publicid= 83DFA5803998437BA0C6779C1F81DFA5]').closest('td').hide(); //Inter Interview
        $('a[data-publicid= 5627B7E24F2C42DCBC0D41C066DEF8F9]').closest('td').show();
        $('a[data-publicid= 5627B7E24F2C42DCBC0D41C066DEF8F9]').show(); //Finished Photographer
        $('a[data-publicid= E14C74E8A64F4BBD983234B6CC85E6F6]').closest('td').hide(); //Next Visit Day
        $('a[data-publicid= 746DA67F0C814DBF889B29C3FCEDB0FA]').closest('td').hide(); //Finished Interview
        $('a[data-publicid= E02BD894B0394EADB9AAF19A1EF8FD20]').closest('td').hide(); //Waiting The Doctor
        $('a[data-publicid= 432A1F3EA144450298897FF6ACD2B2B2]').closest('td').hide(); //Accounted today
        $('a[data-publicid= 17855BD0A233480FAD4C3F77C25B85CF]').closest('td').hide(); //With the doctor
    }

    if (statu == "5EFB8D7512E74DBDACAE288B646C3CA0") /*waiting the doctor statu*/ {
        $('a[data-publicid= 5D269E9A16584586A01EB885CBD639BE]').closest('td').hide(); //open medical Form
        $('a[data-publicid= 3A5CDF27A8EA4B6F8CD41FB50F0F9EF1]').closest('td').hide(); //With Accounted
        $('a[data-publicid= 0D4FC71E01144AB3A16390000F649098]').closest('td').hide(); //Medication Check
        $('a[data-publicid= 16879AF614434B98AC2E94C12DFBF09E]').closest('td').hide(); //X-Ray
        $('a[data-publicid= 6F694F6DBD304745A64F539E7DB7A62F]').closest('td').hide(); //We Took Payment
        $('a[data-publicid= E850A6F8CEF24F148C4995570191802E]').closest('td').hide(); //Take Him To The Next Doctor
        $('a[data-publicid= 602A8C560FD04F6796159E78C0A18B21]').closest('td').hide(); //Send To Interview
        $('a[data-publicid= 247960BC33AE4BB185B409EEC0BDD612]').closest('td').hide(); //With Photographer
        $('a[data-publicid= 6D20E2A9E73A43B59DB3ACDD47F951B7]').closest('td').hide(); //Request A Car
        $('a[data-publicid= 83DFA5803998437BA0C6779C1F81DFA5]').closest('td').hide(); //Inter Interview
        $('a[data-publicid= 5627B7E24F2C42DCBC0D41C066DEF8F9]').closest('td').hide(); //Finished Photographer
        $('a[data-publicid= E14C74E8A64F4BBD983234B6CC85E6F6]').closest('td').hide(); //Next Visit Day
        $('a[data-publicid= 746DA67F0C814DBF889B29C3FCEDB0FA]').closest('td').hide(); //Finished Interview
        $('a[data-publicid= E02BD894B0394EADB9AAF19A1EF8FD20]').closest('td').show();
        $('a[data-publicid= E02BD894B0394EADB9AAF19A1EF8FD20]').show(); //Waiting The Doctor
        $('a[data-publicid= 432A1F3EA144450298897FF6ACD2B2B2]').closest('td').hide(); //Accounted today
        $('a[data-publicid= 17855BD0A233480FAD4C3F77C25B85CF]').closest('td').hide(); //With the doctor
    }

    if (statu == "DBA5AEAAF67743F1838362BDE2CCEB49") /* With The Doctor statu */ {
        $('a[data-publicid= 5D269E9A16584586A01EB885CBD639BE]').closest('td').hide(); //open medical Form
        $('a[data-publicid= 3A5CDF27A8EA4B6F8CD41FB50F0F9EF1]').closest('td').hide(); //With Accounted
        $('a[data-publicid= 0D4FC71E01144AB3A16390000F649098]').closest('td').hide(); //Medication Check
        $('a[data-publicid= 16879AF614434B98AC2E94C12DFBF09E]').closest('td').hide(); //X-Ray
        $('a[data-publicid= 6F694F6DBD304745A64F539E7DB7A62F]').closest('td').hide(); //We Took Payment
        $('a[data-publicid= E850A6F8CEF24F148C4995570191802E]').closest('td').hide(); //Take Him To The Next Doctor
        $('a[data-publicid= 602A8C560FD04F6796159E78C0A18B21]').closest('td').hide(); //Send To Interview
        $('a[data-publicid= 247960BC33AE4BB185B409EEC0BDD612]').closest('td').hide(); //With Photographer
        $('a[data-publicid= 6D20E2A9E73A43B59DB3ACDD47F951B7]').closest('td').hide(); //Request A Car
        $('a[data-publicid= 83DFA5803998437BA0C6779C1F81DFA5]').closest('td').hide(); //Inter Interview
        $('a[data-publicid= 5627B7E24F2C42DCBC0D41C066DEF8F9]').closest('td').hide(); //Finished Photographer
        $('a[data-publicid= E14C74E8A64F4BBD983234B6CC85E6F6]').closest('td').hide(); //Next Visit Day
        $('a[data-publicid= 746DA67F0C814DBF889B29C3FCEDB0FA]').closest('td').hide(); //Finished Interview
        $('a[data-publicid= E02BD894B0394EADB9AAF19A1EF8FD20]').closest('td').hide(); //Waiting The Doctor
        $('a[data-publicid= 432A1F3EA144450298897FF6ACD2B2B2]').closest('td').hide(); //Accounted today
        $('a[data-publicid= 17855BD0A233480FAD4C3F77C25B85CF]').closest('td').show();
        $('a[data-publicid= 17855BD0A233480FAD4C3F77C25B85CF]').show(); //With the doctor
    }

    if (statu == "86CF3A31606B4F7585E12949146D73AE") /*Medication Check statu*/ {
        $('a[data-publicid= 5D269E9A16584586A01EB885CBD639BE]').closest('td').hide(); //open medical Form
        $('a[data-publicid= 3A5CDF27A8EA4B6F8CD41FB50F0F9EF1]').closest('td').hide(); //With Accounted
        $('a[data-publicid= 0D4FC71E01144AB3A16390000F649098]').closest('td').show();
        $('a[data-publicid= 0D4FC71E01144AB3A16390000F649098]').show(); //Medication Check
        $('a[data-publicid= 16879AF614434B98AC2E94C12DFBF09E]').closest('td').hide(); //X-Ray
        $('a[data-publicid= 6F694F6DBD304745A64F539E7DB7A62F]').closest('td').hide(); //We Took Payment
        $('a[data-publicid= E850A6F8CEF24F148C4995570191802E]').closest('td').hide(); //Take Him To The Next Doctor
        $('a[data-publicid= 602A8C560FD04F6796159E78C0A18B21]').closest('td').hide(); //Send To Interview
        $('a[data-publicid= 247960BC33AE4BB185B409EEC0BDD612]').closest('td').hide(); //With Photographer
        $('a[data-publicid= 6D20E2A9E73A43B59DB3ACDD47F951B7]').closest('td').hide(); //Request A Car
        $('a[data-publicid= 83DFA5803998437BA0C6779C1F81DFA5]').closest('td').hide(); //Inter Interview
        $('a[data-publicid= 5627B7E24F2C42DCBC0D41C066DEF8F9]').closest('td').hide(); //Finished Photographer
        $('a[data-publicid= E14C74E8A64F4BBD983234B6CC85E6F6]').closest('td').hide(); //Next Visit Day
        $('a[data-publicid= 746DA67F0C814DBF889B29C3FCEDB0FA]').closest('td').hide(); //Finished Interview
        $('a[data-publicid= E02BD894B0394EADB9AAF19A1EF8FD20]').closest('td').hide(); //Waiting The Doctor
        $('a[data-publicid= 432A1F3EA144450298897FF6ACD2B2B2]').closest('td').hide(); //Accounted today
        $('a[data-publicid= 17855BD0A233480FAD4C3F77C25B85CF]').closest('td').hide(); //With the doctor
    }

    if (statu == "3355857A2760445786DBB60F0B4EDF12") /* Request a car statu*/ {
        $('a[data-publicid= 5D269E9A16584586A01EB885CBD639BE]').closest('td').hide(); //open medical Form
        $('a[data-publicid= 3A5CDF27A8EA4B6F8CD41FB50F0F9EF1]').closest('td').hide(); //With Accounted
        $('a[data-publicid= 0D4FC71E01144AB3A16390000F649098]').closest('td').hide(); //Medication Check
        $('a[data-publicid= 16879AF614434B98AC2E94C12DFBF09E]').closest('td').hide(); //X-Ray
        $('a[data-publicid= 6F694F6DBD304745A64F539E7DB7A62F]').closest('td').hide(); //We Took Payment
        $('a[data-publicid= E850A6F8CEF24F148C4995570191802E]').closest('td').hide(); //Take Him To The Next Doctor
        $('a[data-publicid= 602A8C560FD04F6796159E78C0A18B21]').closest('td').hide(); //Send To Interview
        $('a[data-publicid= 247960BC33AE4BB185B409EEC0BDD612]').closest('td').hide(); //With Photographer
        $('a[data-publicid= 6D20E2A9E73A43B59DB3ACDD47F951B7]').closest('td').show();
        $('a[data-publicid= 6D20E2A9E73A43B59DB3ACDD47F951B7]').show(); //Request A Car
        $('a[data-publicid= 83DFA5803998437BA0C6779C1F81DFA5]').closest('td').hide(); //Inter Interview
        $('a[data-publicid= 5627B7E24F2C42DCBC0D41C066DEF8F9]').closest('td').hide(); //Finished Photographer
        $('a[data-publicid= E14C74E8A64F4BBD983234B6CC85E6F6]').closest('td').hide(); //Next Visit Day
        $('a[data-publicid= 746DA67F0C814DBF889B29C3FCEDB0FA]').closest('td').hide(); //Finished Interview
        $('a[data-publicid= E02BD894B0394EADB9AAF19A1EF8FD20]').closest('td').hide(); //Waiting The Doctor
        $('a[data-publicid= 432A1F3EA144450298897FF6ACD2B2B2]').closest('td').hide(); //Accounted today
        $('a[data-publicid= 17855BD0A233480FAD4C3F77C25B85CF]').closest('td').hide(); //With the doctor
    }

    if (statu == "5D57F49EE39C49A1A1DD7782FE5C3EEF") /* New Patient  statu */ {
        $('a[data-publicid= 5D269E9A16584586A01EB885CBD639BE]').closest('td').show();
        $('a[data-publicid= 5D269E9A16584586A01EB885CBD639BE]').show(); //open medical Form
        $('a[data-publicid= 3A5CDF27A8EA4B6F8CD41FB50F0F9EF1]').closest('td').hide(); //With Accounted
        $('a[data-publicid= 0D4FC71E01144AB3A16390000F649098]').closest('td').hide(); //Medication Check
        $('a[data-publicid= 16879AF614434B98AC2E94C12DFBF09E]').closest('td').hide(); //X-Ray
        $('a[data-publicid= 6F694F6DBD304745A64F539E7DB7A62F]').closest('td').hide(); //We Took Payment
        $('a[data-publicid= E850A6F8CEF24F148C4995570191802E]').closest('td').hide(); //Take Him To The Next Doctor
        $('a[data-publicid= 602A8C560FD04F6796159E78C0A18B21]').closest('td').hide(); //Send To Interview
        $('a[data-publicid= 247960BC33AE4BB185B409EEC0BDD612]').closest('td').hide(); //With Photographer
        $('a[data-publicid= 6D20E2A9E73A43B59DB3ACDD47F951B7]').closest('td').hide(); //Request A Car
        $('a[data-publicid= 83DFA5803998437BA0C6779C1F81DFA5]').closest('td').hide(); //Inter Interview
        $('a[data-publicid= 5627B7E24F2C42DCBC0D41C066DEF8F9]').closest('td').hide(); //Finished Photographer
        $('a[data-publicid= E14C74E8A64F4BBD983234B6CC85E6F6]').closest('td').hide(); //Next Visit Day
        $('a[data-publicid= 746DA67F0C814DBF889B29C3FCEDB0FA]').closest('td').hide(); //Finished Interview
        $('a[data-publicid= E02BD894B0394EADB9AAF19A1EF8FD20]').closest('td').hide(); //Waiting The Doctor
        $('a[data-publicid= 432A1F3EA144450298897FF6ACD2B2B2]').closest('td').hide(); //Accounted today
        $('a[data-publicid= 17855BD0A233480FAD4C3F77C25B85CF]').closest('td').hide(); //With the doctor
    }

    if (statu == "043D1747B7CC4FA7A2212C94B83BFF3B") /* waiting for next visit*/ {
        $('a[data-publicid= 5D269E9A16584586A01EB885CBD639BE]').closest('td').hide(); //open medical Form
        $('a[data-publicid= 3A5CDF27A8EA4B6F8CD41FB50F0F9EF1]').closest('td').hide(); //With Accounted
        $('a[data-publicid= 0D4FC71E01144AB3A16390000F649098]').closest('td').hide(); //Medication Check
        $('a[data-publicid= 16879AF614434B98AC2E94C12DFBF09E]').closest('td').hide(); //X-Ray
        $('a[data-publicid= 6F694F6DBD304745A64F539E7DB7A62F]').closest('td').hide(); //We Took Payment
        $('a[data-publicid= E850A6F8CEF24F148C4995570191802E]').closest('td').hide(); //Take Him To The Next Doctor
        $('a[data-publicid= 602A8C560FD04F6796159E78C0A18B21]').closest('td').hide(); //Send To Interview
        $('a[data-publicid= 247960BC33AE4BB185B409EEC0BDD612]').closest('td').hide(); //With Photographer
        $('a[data-publicid= 6D20E2A9E73A43B59DB3ACDD47F951B7]').closest('td').hide(); //Request A Car
        $('a[data-publicid= 83DFA5803998437BA0C6779C1F81DFA5]').closest('td').hide(); //Inter Interview
        $('a[data-publicid= 5627B7E24F2C42DCBC0D41C066DEF8F9]').closest('td').hide(); //Finished Photographer
        $('a[data-publicid= E14C74E8A64F4BBD983234B6CC85E6F6]').closest('td').show();
        $('a[data-publicid= E14C74E8A64F4BBD983234B6CC85E6F6]').show(); //Next Visit Day
        $('a[data-publicid= 746DA67F0C814DBF889B29C3FCEDB0FA]').closest('td').hide(); //Finished Interview
        $('a[data-publicid= E02BD894B0394EADB9AAF19A1EF8FD20]').closest('td').hide(); //Waiting The Doctor
        $('a[data-publicid= 432A1F3EA144450298897FF6ACD2B2B2]').closest('td').hide(); //Accounted today
        $('a[data-publicid= 17855BD0A233480FAD4C3F77C25B85CF]').closest('td').hide(); //With the doctor
    }
});