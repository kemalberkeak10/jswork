$(function() {
    var projeTip = $('#F1EE94ECDE124EA09D919332621C712A').select2('data');
    if (projeTip != null) {
        HideandShow(projeTip.id, true);
    } else {
        HideandShow("", true);
    }
    if (!String.isNullOrWhiteSpace($('#F1EE94ECDE124EA09D919332621C712A').val())) {
        HideandShow($('#F1EE94ECDE124EA09D919332621C712A').val(), false);
    } else {
        HideandShow("", true);
    }
    $('body').on('change', '#F1EE94ECDE124EA09D919332621C712A', function() {
        if (!String.isNullOrWhiteSpace($(this).val())) {
            HideandShow($(this).select2('data').id, false);
        } else {
            HideandShow("", true);
        }
    });
    $('body').on('change',
        '#390D3844249C4BBC8D022C952BA23749',
        function() {
            if (!String.isNullOrWhiteSpace($(this).val())) {
                if ($(this).select2('data').id == "3E242C9BA2144B0E9EE1A7D8A025C657") {
                    $('div[data-publicid=4BB4F8D318254990A5EA1D4FEF928F57]').show();
                    $('div[data-publicid=30693CA68A1F4B618B17BCCAF30E61C0]').show();
                } else {
                    $('div[data-publicid=4BB4F8D318254990A5EA1D4FEF928F57]').hide();
                    $('div[data-publicid=30693CA68A1F4B618B17BCCAF30E61C0]').hide();
                }
            } else {
                $('div[data-publicid=4BB4F8D318254990A5EA1D4FEF928F57]').hide();
                $('div[data-publicid=30693CA68A1F4B618B17BCCAF30E61C0]').hide();
            }

        })


    function HideandShow(projeTipi, allHideElements) {

        if (allHideElements) {
            var hideArray = ["B7D74A090DB04F84AB4F7C212B47D992",
                "2ABEE0F1AE9D4AE3881E90DE0A5300BF",
                "E5C7C045D11C4417A206941D7AED367E",
                "85BBECBE354D47F78351E5F95685AB4B",
                "866F87E3200B47478F9FE9B2A1E66BF5",
                "FB97DA1F2A2643E0AF43476805BABB09",
                "630C2D51A0C1430382140532D47D60BA",
                "390D3844249C4BBC8D022C952BA23749",
                "4BB4F8D318254990A5EA1D4FEF928F57",
                "30693CA68A1F4B618B17BCCAF30E61C0",
                "FC5EAC3CB09D487E850F12A76589CC25",
                "7D349DBF43D74CC787A0553AE78DABF3",
                "0A0066A1E992451BBBAB6732A8318B60",
                "8C1A9BB4F56E4B1FA7A18A0BADC6783A",
                "1967E15BFAAE45D495385478837310AD",
                "404CBC4639394519B341AAE5A3A7FD43",
                "4CF737FA01964258B3561AD1931C40E4",
                "013784F13AFD41C59FA8F1B79ECC6AF4",
                "DF75E4BFFC114841BD28DF19F0E63679",
                "A99CC319522645779454D087D241D1EF"
            ];
            $.each(hideArray, function(i, v) {
                $('div[data-publicid=' + v + ']').hide();
            });

            return;
        }

        if (projeTipi == "84CDE8C51FE347A995ED3F2B97140965") {
            var hideArray = ["B7D74A090DB04F84AB4F7C212B47D992",
                "2ABEE0F1AE9D4AE3881E90DE0A5300BF",
                "E5C7C045D11C4417A206941D7AED367E",
                "85BBECBE354D47F78351E5F95685AB4B",
                "866F87E3200B47478F9FE9B2A1E66BF5",
                "FB97DA1F2A2643E0AF43476805BABB09",
                "630C2D51A0C1430382140532D47D60BA",
                "390D3844249C4BBC8D022C952BA23749",
                "4BB4F8D318254990A5EA1D4FEF928F57",
                "30693CA68A1F4B618B17BCCAF30E61C0"
            ];

            $.each(hideArray, function(i, v) {
                $('div[data-publicid=' + v + ']').hide();
            });

            var showArray = ["FC5EAC3CB09D487E850F12A76589CC25",
                "7D349DBF43D74CC787A0553AE78DABF3",
                "0A0066A1E992451BBBAB6732A8318B60",
                "8C1A9BB4F56E4B1FA7A18A0BADC6783A",
                "1967E15BFAAE45D495385478837310AD",
                "404CBC4639394519B341AAE5A3A7FD43",
                "4CF737FA01964258B3561AD1931C40E4",
                "013784F13AFD41C59FA8F1B79ECC6AF4",
                "DF75E4BFFC114841BD28DF19F0E63679",
                "A99CC319522645779454D087D241D1EF"
            ];

            $.each(showArray, function(i, v) {
                $('div[data-publicid=' + v + ']').show();
            });

        } else if (projeTipi == "A6B8EE8F2C0B427B98390ECC040AD133") {
            var hideArray = ["FC5EAC3CB09D487E850F12A76589CC25",
                "7D349DBF43D74CC787A0553AE78DABF3",
                "0A0066A1E992451BBBAB6732A8318B60",
                "8C1A9BB4F56E4B1FA7A18A0BADC6783A",
                "1967E15BFAAE45D495385478837310AD",
                "404CBC4639394519B341AAE5A3A7FD43",
                "4CF737FA01964258B3561AD1931C40E4",
                "013784F13AFD41C59FA8F1B79ECC6AF4",
                "DF75E4BFFC114841BD28DF19F0E63679",
                "A99CC319522645779454D087D241D1EF",
                "630C2D51A0C1430382140532D47D60BA",
                "390D3844249C4BBC8D022C952BA23749",
                "4BB4F8D318254990A5EA1D4FEF928F57",
                "30693CA68A1F4B618B17BCCAF30E61C0",
                "630C2D51A0C1430382140532D47D60BA"
            ];

            $.each(hideArray, function(i, v) {
                $('div[data-publicid=' + v + ']').hide();
            });

            var showArray = ["B7D74A090DB04F84AB4F7C212B47D992",
                "2ABEE0F1AE9D4AE3881E90DE0A5300BF",
                "E5C7C045D11C4417A206941D7AED367E",
                "85BBECBE354D47F78351E5F95685AB4B",
                "866F87E3200B47478F9FE9B2A1E66BF5",
                "FB97DA1F2A2643E0AF43476805BABB09"
            ];

            $.each(showArray, function(i, v) {
                $('div[data-publicid=' + v + ']').show();
            });

        } else {

            var showArray = ["B7D74A090DB04F84AB4F7C212B47D992",
                "2ABEE0F1AE9D4AE3881E90DE0A5300BF",
                "E5C7C045D11C4417A206941D7AED367E",
                "85BBECBE354D47F78351E5F95685AB4B",
                "866F87E3200B47478F9FE9B2A1E66BF5",
                "FB97DA1F2A2643E0AF43476805BABB09",
                "630C2D51A0C1430382140532D47D60BA",
                "390D3844249C4BBC8D022C952BA23749",
                "4BB4F8D318254990A5EA1D4FEF928F57",
                "30693CA68A1F4B618B17BCCAF30E61C0",
                "630C2D51A0C1430382140532D47D60BA",
                "390D3844249C4BBC8D022C952BA23749"
            ];

            $.each(showArray, function(i, v) {
                $('div[data-publicid=' + v + ']').show();
            });

            var hideArray = ["FC5EAC3CB09D487E850F12A76589CC25",
                "7D349DBF43D74CC787A0553AE78DABF3",
                "0A0066A1E992451BBBAB6732A8318B60",
                "8C1A9BB4F56E4B1FA7A18A0BADC6783A",
                "1967E15BFAAE45D495385478837310AD",
                "404CBC4639394519B341AAE5A3A7FD43",
                "4CF737FA01964258B3561AD1931C40E4",
                "013784F13AFD41C59FA8F1B79ECC6AF4",
                "DF75E4BFFC114841BD28DF19F0E63679",
                "A99CC319522645779454D087D241D1EF"
            ];

            $.each(hideArray, function(i, v) {
                $('div[data-publicid=' + v + ']').hide();
            });

            if ($('div[data-publicid=390D3844249C4BBC8D022C952BA23749]').data('publicids') == "3E242C9BA2144B0E9EE1A7D8A025C657") {
                $('div[data-publicid=4BB4F8D318254990A5EA1D4FEF928F57]').show();
                $('div[data-publicid=30693CA68A1F4B618B17BCCAF30E61C0]').show();
            } else {
                $('div[data-publicid=4BB4F8D318254990A5EA1D4FEF928F57]').hide();
                $('div[data-publicid=30693CA68A1F4B618B17BCCAF30E61C0]').hide();
            }
        };
    }
});