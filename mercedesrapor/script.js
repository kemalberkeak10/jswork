jQuery(function($) {
    var model = {};
    var myChart = null;
    var selectedSubGroups = [];
    var currentYear = new Date().getFullYear();
    //#region data arrays
    // var abgeleisteteStudenteData = [2.635, 5.9222, 9.650, 13.998, 15.552];
    // var abzuleistendeStudenteData = [2.05, 9.282, 13.989, 18.664, 22.240, 26.905, 30.529, 34.154, 37.779, 41.212, 44.837, 48.462];
    // var forecastData = [4.605, 9.282, 13.989, 18.664, 22.240, 26.905, 30.529, 34.154, 37.779, 41.212, 44.837, 48.462];
    // var erledigungsgradData = [57, 64, 69, 68, 70];
    // var kritischeUnterGrenzeData = [3.453, 6.961, 10.492, 13.998, 16.680, 20.178, 22.897, 25.616, 28.334, 30.909, 33.628, 36.347];
    var abgeleisteteStudenteData = [];
    var abzuleistendeStudenteData = [];
    var forecastData = [];
    var erledigungsgradData = [];
    var kritischeUnterGrenzeData = [];

    //#endregion
    //#region yearData

    var selectYearData = [];
    for (let i = 2018; i <= currentYear; i++) {
        selectYearData.push({
            id: i,
            text: i
        });
    }
    $('#yearSelect').select2({
        data: selectYearData,
        placeholder: "Select a year",
        closeOnSelect: true,
        theme: "classic",
        minimumResultsForSearch: -1
    });
    $('#yearSelect').val(currentYear).trigger('change');
    //#endregion
    getReportData();


    $('body').on('click', '.subgroup-input', function() {
        var li = $(this).parent();
        li.toggleClass('active-subgroup');
        var activeSubGroups = $('body').find('.active-subgroup');
        selectedSubGroups = [];
        $.each(activeSubGroups, function(i, v) {;
            selectedSubGroups.push($(v).text().trim());
        });
    });
    $('body').on('click', '.subgroup-input-selectall', function() {
        var selectAllBtn = $('#selectAll');
        var subgroupButtons = $('.subgroup-input').closest('li');
        selectAllBtn.toggleClass('select-all-subgroup');
        if (selectAllBtn.hasClass('select-all-subgroup')) {
            subgroupButtons.addClass('active-subgroup');
            subgroupButtons.removeClass('passive-subgroup');
        } else {
            subgroupButtons.removeClass('active-subgroup');
            subgroupButtons.addClass('passive-subgroup');
        }
        var activeSubGroups = $('body').find('.active-subgroup');
        selectedSubGroups = [];
        $.each(activeSubGroups, function(i, v) {;
            selectedSubGroups.push($(v).text().trim());
        });
    });
    $('body').on('click', '#btnSearch', function() {
        getReportData();
    });

    function getReportData() {
        model.Year = $('#yearSelect').val();
        model.SubGroupList = selectedSubGroups;
        var localurl = 'http://localhost:54006/api/data/GetDelegierteBemusterungReport';
        var testUrl = 'https://mbstest.setcrm.com/api/data/GetDelegierteBemusterungReport';
        var realUrl = 'https://mbstest.setcrm.com/api/data/GetDelegierteBemusterungReport';
        $.post(localurl, model, function(r) {
            if (r.Status) {
                abgeleisteteStudenteData = r.totalCompletedTimeData;
                abzuleistendeStudenteData = r.abzuleistendeData;
                forecastData = r.abzuleistendeData;
                erledigungsgradData = r.erledigungsgradData;
                kritischeUnterGrenzeData = r.kritischeUntergrenzeData;
                abgeleisteteStudenteData = abgeleisteteStudenteData.slice(0, r.lastAbgeleisteteMonth);
                erledigungsgradData = r.erledigungsgradData.slice(0, r.lastAbgeleisteteMonth);
                if (currentYear == $('#yearSelect').val()) {
                    abzuleistendeStudenteData = abzuleistendeStudenteData.slice(0, new Date().getMonth() + 1);
                    kritischeUnterGrenzeData = kritischeUnterGrenzeData.slice(0, new Date().getMonth() + 1);
                    forecastData = forecastData.slice(0, new Date().getMonth() + 1);
                }
                createChart();
            } else {
                alert();
            }
        });
    };


    function createChart() {
        if (myChart != null) {
            myChart.destroy();
        }
        //#region chart const
        const labels = [
            'Jan',
            'Feb',
            'Marz',
            'April',
            'Mai',
            'Juni',
            'Juli',
            'Aug',
            'Sept',
            'Okt',
            'Nov',
            'Dez',
        ];
        const data = {
            labels: labels,
            datasets: [{
                label: 'Abgeleistete Stunden',
                fill: true,
                data: abgeleisteteStudenteData,
                borderColor: '#009f54',
                backgroundColor: '#009f54',
                order: 0,
                fontColor: "#FAC003",
                maintainAspectRatio: false,
                datalabels: {
                    align: 'bottom',
                    anchor: 'bottom'
                }
            }, {
                label: 'Abzuleistende Stunden',
                fill: true,
                data: abzuleistendeStudenteData,
                borderColor: '#d6d7d9',
                backgroundColor: '#d6d7d9',
                order: 1,
                datalabels: {
                    align: 'end',
                    anchor: 'center'
                }
            }, {
                label: 'Forecast',
                data: forecastData,
                borderColor: '#579bae',
                backgroundColor: '#579bae',
                type: 'line',
                order: 2,
            }, {
                label: 'Erledigungsgrad',
                data: erledigungsgradData,
                borderColor: '#85b963',
                backgroundColor: '#85b963',
                type: 'line',
                order: 3,
                hidden: true

            }, {
                label: '-25% kritische Untergrenze',
                data: kritischeUnterGrenzeData,
                borderColor: '#c51445',
                backgroundColor: '#c51445',
                type: 'line',
                order: 4,
            }, ]
        };
        const footer = (tooltipItems) => {
            let abzuleistendeStudente = 0;
            let abgeleisteteStudente = 0;
            tooltipItems.forEach(function(tooltipItem) {
                if (tooltipItem.datasetIndex == 1) {
                    abzuleistendeStudente = tooltipItem.parsed.y;
                }
                if (tooltipItem.datasetIndex == 0) {
                    abgeleisteteStudente = tooltipItem.parsed.y;
                }
            });
            return ['Differenz Std: ' + (abzuleistendeStudente - abgeleisteteStudente).toFixed(2), 'Erledigungsgrad: ' + ((abgeleisteteStudente / abzuleistendeStudente) * 100).toFixed(2) + '%'];
        };
        //#endregion
        ;
        Chart.register(ChartDataLabels);
        const ctx = document.getElementById('myChart').getContext('2d')
        myChart = new Chart(ctx, {
            type: 'bar',
            borderColor: '#009f54',
            borderWidth: 3,
            borderStyle: 'dash',
            maintainAspectRatio: false,
            showTooltips: false,
            data: data,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: 'Delegierte Bemusterunghochlauf ' + $('#yearSelect').val(),
                        padding: 20,
                        font: {
                            size: 30
                        }
                    },
                    tooltip: {
                        usePointStyle: true,
                        callbacks: {
                            // labelPointStyle: function(context) {
                            //     return {
                            //         // pointStyle: 'triangle',
                            //         rotation: 0
                            //     };
                            // }
                            footer: footer,
                        }
                    },
                    datalabels: {
                        // anchor: 'end',
                        // align: 'top',
                        // backgroundColor: function(context) {
                        //     return context.dataset.backgroundColor;
                        // },
                        borderRadius: 4,
                        color: 'black',
                        font: {
                            weight: 'bold'
                        },
                        // formatter: function(value, context) {
                        //     console.log(context)
                        //     return context.chart.data.labels[context.dataIndex];
                        // },
                        formatter: function(value, context) {
                            if (context.datasetIndex == 3) {
                                return context.dataset.data[context.dataIndex] + '%';
                            } else if (context.datasetIndex == 2 || context.datasetIndex == 4 || context.datasetIndex == 0) {
                                return context.dataset.data[context.dataIndex];
                            } else {
                                return null
                            }
                        },
                        // padding: 6
                    }

                },
                scales: {
                    x: {
                        stacked: true,
                    },
                    y: {
                        beginAtZero: true,
                    },
                },
                interaction: {
                    mode: 'x'
                },

            },
        });
    }
});