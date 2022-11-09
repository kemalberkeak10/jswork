jQuery(function($) {
    $('body').on('click', '.slotImg', function() {
        $('#carInformation').addClass('show');
        $('#carInformation').modal('toggle');
    });

    $('body').on('click', '#carInformation .btn-close', function() {
        $('#carInformation').removeClass('show');
        $('#carInformation').modal('toggle');
    });
    // startData();
    // var panelList = $('#draggablePanelList');


    // panelList.sortable({
    //     revert: '300',
    //     start: function(event, ui) {
    //         ui.item.addClass('tilt');
    //         tilt_direction(ui.item);
    //     },
    //     stop: function(event, ui) {
    //         ui.item.removeClass('tilt');
    //         tilt_direction(ui.item);
    //     },
    //     update: function() {
    //         $('.panel', panelList).each(function(index, elem) {
    //             var $listItem = $(elem),
    //                 newIndex = $listItem.index();
    //         });
    //     }
    // });

    // setInterval(function() { startData(); }, 500000);

});

// function startData() {
//     $('#AnnouncementList').html('');
//     $('#project-info').html('');
//     $.ajax({
//         type: 'get',
//         dataType: 'json',
//         url: 'https://webapibbs-inklab-test.tr152.corpintra.net/api/data/GetAnnouncement',

//         success: function(data) {
//             $.each(data.AnnouncementList, function(key, value) {
//                 $('#AnnouncementList').prepend('<li><b>' + value.InformationDate.split(' ')[0] + '</b> - ' + value.InformationText + '</li>');
//             });
//         },
//         error: function(data) {
//             MesajInfo('Announcements Unable to connect to server Failed to load data.', 'Data Loading Error');
//         }
//     });

//     $.ajax({
//         type: 'get',
//         dataType: 'json',
//         url: 'https://webapibbs-inklab-test.tr152.corpintra.net/api/data/GetProjectInformation',

//         success: function(data) {
//             $.each(data.Model.InformationList, function(key, value) {

//                 switch (value.Progress) {
//                     case "RED":
//                         inputID = "color1";
//                         css = "tl-color1";
//                         break;
//                     case "YELLOW":
//                         inputID = "color2";
//                         css = "tl-color2";
//                         break;
//                     case "GREEN":
//                         inputID = "color3";
//                         css = "tl-color3";
//                         break;
//                     default:
//                         inputID = "color";
//                         css = "tl-color";
//                 }
//                 var desc = '';
//                 if (value.Description !== null) {
//                     desc = value.Description;
//                 }
//                 var tmpl = '<div class="row" style="border: 1px solid #fff; border-radius: 10px;"><div class="col-md-1" style="padding: 10px;"><input type="radio" name="traffic-light-color" id="color2" value="color2" class="' + css + '"style="width: 25px; height:25px;"/></div><div class="col-md-11"><div class="col-md-2" style="padding: 0px;">' + value.Station + '</div><div class="col-md-9" style="padding: 0px;">' + value.ProjectInformation + '</div><div class="col-md-1"></div><div class="col-md-11" style="padding: 0px;">Description : ' + value.Description + '</div></div></div>';
//                 var tmpl2 = '<div class="row" style="background:#3A3F44; margin-bottom:10px; border-radius:10px;border: 1px solid #12335d;box-shadow:0 2px 0 0 rgba(255,255,255,0.75);"><div class="col-md-2"><input type="radio" name="traffic-light-color" id="color2" value="color2" class="' + css + '" style="width: 25px; height:25px; position:absolute;margin-top: 25px;margin-left: 15px;"/></div><div class="col-md-10" style="border-bottom: 1px solid #fff; padding: 0px;">' + value.Station + '</div><div class="col-md-12" style="padding: 0px;"><div class="col-md-2"></div><div class="col-md-10" style="padding: 0px; color:lightgreen;">' + value.ProjectInformation + '</div><div class="col-md-2"></div><div class="col-md-10" style="padding: 0px;">Description : ' + desc + '</div></div></div>';
//                 $('#project-info').prepend(tmpl2);
//             });
//         },
//         error: function(data) {
//             MesajInfo('Project Information Unable to connect to server Failed to load data.', 'Data Loading Error');
//         }
//     });


//     $.ajax({
//         type: 'get',
//         dataType: 'json',
//         url: 'ta/GetReservation',

//         success: function(data) {
//             $('.warningData').hide();
//             $.each(data.SlotInformations, function(key, value) {
//                 var datae = value.VeriVarmi;
//                 var slotName = value.SlotName.replace(' ', '-');
//                 if (!datae) {
//                     $('#' + slotName + '-SHOW').hide();
//                     $('#' + slotName + '-SHOWT1').hide();
//                     $('#' + slotName + '-SHOWT2').hide();
//                     $('#' + slotName + '-SHOWIMG').hide();
//                     $('#' + slotName + '-INFO').show();
//                 } else {
//                     $('#' + slotName + '-SHOW').show();
//                     $('#' + slotName + '-SHOWT1').show();
//                     $('#' + slotName + '-SHOWT2').show();
//                     $('#' + slotName + '-SHOWIMG').show();
//                     $('#' + slotName + '-INFO').hide();
//                 }

//                 $.each(value.Slots, function(key, value) {
//                     var slot = $('#' + slotName + ' #' + value.StationName);
//                     var slotInfo = $('#pInfo-' + value.StationName);
//                     //console.log(value.StationName+' - '+value.ProjectProgressText);
//                     switch (value.ProjectProgressText) {
//                         case "RED":
//                             inputID = "color1";
//                             css = "tl-color1";
//                             break;
//                         case "YELLOW":
//                             inputID = "color2";
//                             css = "tl-color2";
//                             break;
//                         case "GREEN":
//                             inputID = "color3";
//                             css = "tl-color3";
//                             break;
//                         default:
//                             inputID = "color";
//                             css = "tl-color";
//                     }

//                     var light = $('.light' + value.StationName + ' #' + inputID);
//                     for (let i = 1; i < 4; i++) {
//                         light.removeClass('tl-color' + i);
//                     }
//                     var PIN = '';
//                     var PK = '';
//                     var startDate = '';
//                     var endDate = '';

//                     if (value.ProjectInformationName !== null) {
//                         PIN = value.ProjectInformationName;
//                     }
//                     if (value.ProjectKoordinator !== null) {
//                         PK = value.ProjectKoordinator;
//                     }
//                     if (value.StartDate !== null) {
//                         startDate = 'S: ' + value.StartDate.split(" ")[0];
//                     }

//                     if (value.EndDate !== null) {
//                         endDate = 'E: ' + value.EndDate.split(" ")[0];
//                     }
//                     slot.html(value.StationName);
//                     slotInfo.html('<div class="stName">' + value.StationName + '</div><p style="color:lightgreen; font-weight:bold;">' + PIN + '</p></br><p>' + PK + '</p><br/>' + startDate + '<br/>' + endDate);
//                     light.toggleClass(css);
//                 });
//             });
//             setInterval(function() {
//                 $('.card-container').toggleClass('flip');
//             }, 5000);
//             $('body').loadingModal("destroy");

//         },
//         error: function(data) {
//             $('.warningData').show();
//             $('body').loadingModal("destroy");
//             MesajInfo('Unable to connect to server Failed to load data.', 'Data Loading Error');
//         }
//     });
//     $('body').loadingModal({
//         text: "<img src='assets/img/mercedes.gif' width='100px'><br/>Veriler yükleniyor...",
//         animation: 'none',
//         backgroundColor: 'black'
//     });
// }

// function tilt_direction(item) {
//     var left_pos = item.position().left,
//         move_handler = function(e) {
//             if (e.pageX >= left_pos) {
//                 item.addClass("right");
//                 item.removeClass("left");
//             } else {
//                 item.addClass("left");
//                 item.removeClass("right");
//             }
//             left_pos = e.pageX;
//         };
//     $("html").bind("mousemove", move_handler);
//     item.data("move_handler", move_handler);
// };

// function loadRandom() {
//     $(".number2").each(function() {
//         var number = 1 + Math.floor(Math.random() * 150);
//         $(this).text(number);
//     });
// }
// /*
// loadRandom();
// setInterval(function() {
//      loadRandom(); 
// },3000);
// */

// $(document).ready(function() {
//     $('.fa-cog').on('click', function() {
//         $('.dashboard').toggleClass('isOpen');
//     });
// });

// function MesajSuccess(mesaj, title) {
//     if (typeof title == "undefined" && title == null) {
//         title = "İşlem Başarılı";
//     }
//     feedback(JSON.parse(('{"action":"","title":"' + title + '","message":"' + mesaj + '","status":"success","timeout":8}').replace(/\n/g, '<br />')));
// }

// function MesajError(mesaj) {
//     feedback(JSON.parse(('{"action":"","title":"Sistem Uyarısı","message":"' + mesaj + '","status":"error","timeout":8}').replace(/\n/g, '<br />')));
// }

// function MesajWarning(mesaj, title) {
//     if (typeof title === "undefined") {
//         title = "İşlem Eksik Gerçekleşti";
//     }
//     feedback(JSON.parse(('{"action":"","title":"' + title + '","message":"' + mesaj + '","status":"warning","timeout":8}').replace(/\n/g, '<br />')));
// }

// function MesajInfo(mesaj, title) {
//     if (typeof title === "undefined") {
//         title = "İşlem Eksik Gerçekleşti";
//     }
//     feedback(JSON.parse(('{"action":"","title":"' + title + '","message":"' + mesaj + '","status":"info","timeout":8}').replace(/\n/g, '<br />')));
// }

// function feedback(feedback) {

//     if (feedback == "" || feedback == null || feedback == "null") return false;

//     if (feedback == 'SERVER') {
//         feedback = {
//             action: '',
//             status: 'error',
//             timeout: 20,
//             message: 'Sunucu ile bağlantı kurulamıyor. Lütfen tekrar deneyin.',
//             title: 'Sunucu Bağlantı Problemi !'
//         };
//     }

//     var feedbackObj = feedback;

//     toastr.options = {
//         "closeButton": true,
//         "debug": false,
//         "newestOnTop": false,
//         "progressBar": true,
//         "positionClass": "toast-bottom-right",
//         "preventDuplicates": false,
//         "onclick": null,
//         "showDuration": "300",
//         "hideDuration": "1000",
//         "timeOut": feedbackObj.timeout * 1000,
//         "extendedTimeOut": 0,
//         "showEasing": "swing",
//         "hideEasing": "linear",
//         "showMethod": "fadeIn",
//         "hideMethod": "fadeOut",
//         "tapToDismiss": false
//     }

//     if (typeof feedbackObj.action != "undefined" && feedbackObj.action != null && feedbackObj.action != "") {
//         toastr.options.onHidden = function(a) {
//             location.href = feedbackObj.action;
//         }
//     } else {
//         //bura grid refresh metodu ile güncelleneccek sayfaya refresh atılmıcak
//         toastr.options.onHidden = function(a) {
//             //location.reload(true);
//         }
//     }

//     if (feedbackObj.message != "" && feedbackObj.status != "") {
//         toastr[feedbackObj.status](feedbackObj.message, feedbackObj.title);
//     }

// }

// var hoveredAnnouncement = null;

// function announcementTicker() {
//     $(".announcements")
//         .filter(function(item) {
//             return !$(this).is(hoveredAnnouncement);
//         })
//         .each(function() {
//             $(this)
//                 .find("li:first")
//                 .slideUp(function() {
//                     var announcement = $(this).closest(".announcements");
//                     $(this)
//                         .appendTo(announcement)
//                         .slideDown();
//                 });
//         });
// }
// setInterval(announcementTicker, 3000);

// $(function() {
//     $(".announcements").hover(
//         function() {
//             hoveredAnnouncement = $(this);
//         },
//         function() {
//             hoveredAnnouncement = null;
//         }
//     );
// });

// window.setInterval('datetime()', 1000);

// function datetime() {
//     var zeit = new Date();
//     var stunde = (zeit.getHours() < 10 ? '0' + zeit.getHours() : zeit.getHours());
//     var minute = (zeit.getMinutes() < 10 ? '0' + zeit.getMinutes() : zeit.getMinutes());
//     var sekunde = (zeit.getSeconds() < 10 ? '0' + zeit.getSeconds() : zeit.getSeconds());
//     document.getElementById('zeit').innerHTML =
//         stunde + ':' + minute + ':' + sekunde;
//     document.getElementById('datum').innerHTML =
//         zeit.getDate() + '.' + (zeit.getMonth() + 1) + '.' + zeit.getFullYear();
// }



// datetime();