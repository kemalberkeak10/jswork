jQuery(function($) {

    //add user with enter 
    $("body").on("keyup",
        '#addUserInput',
        function(e) {
            if (e.key === 'Enter' || e.keyCode === 13) {
                newElement();
            }
        });
});


document.addEventListener('DOMContentLoaded', function() {

    var firstDayOfWeek = getMonday(new Date());
    var lastDayOfCalendar = getLastMonday(new Date());
    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
        headerToolbar: {
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,listMonth",
        },
        views: {
            dayGridMonth: { buttonText: "Takvim" },
            timeGridWeek: { buttonText: "week" },
            timeGridDay: { buttonText: "day" },
            listMonth: { buttonText: "Liste" }
        },

        validRange: {
            start: firstDayOfWeek,
            end: lastDayOfCalendar
        },

        locale: 'tr',
        initialView: 'dayGridMonth',
        //timeZone: 'local',

        initialDate: firstDayOfWeek,
        firstDay: 1,

        //     editable: true,
        // dayMaxEvents: true, // allow "more" link when too many events
        // navLinks: true,

        selectable: true,
        selectMirror: true,
        editable: true,
        droppable: true,
        unselectAuto: false,

        eventDisplay: "block",
        eventBackgroundColor: "##06b414", //secilen event arka plan
        // select: function(start, end, jsEvent, view) {
        //     calendar.addEventSource([{
        //             start: start,
        //             end: end,
        //             rendering: 'background',
        //             block: true,
        //         }, ])
        //         // calendar.unselect();
        //         // calendar.clientEvents();
        // },
        // selectOverlap: function(event) {
        //     return !event.block;
        // }

        events: [{
            title: "Yılbaşı",
            start: "2023-01-01",
            display: 'block',
            block: true,
            backgroundColor: 'red'
        }, {
            title: "Ulusal Egemenlik ve Çocuk Bayramı",
            start: "2023-04-23",
            display: 'block',
            block: true,
            backgroundColor: 'red'
        }, {
            title: "İşçi Bayramı",
            start: "2023-05-01",
            display: 'block',
            block: true,
            backgroundColor: 'red'
        }, {
            title: "Demokrasi ve Milli Birlik Günü",
            start: "2023-07-15",
            display: 'block',
            block: true,
            backgroundColor: 'red'
        }, {
            title: "Zafer Bayramı",
            start: "2023-08-30",
            display: 'block',
            block: true,
            backgroundColor: 'red'
        }, {
            title: "Cumhuriyet Bayramı",
            start: "2022-10-29",
            display: 'block',
            block: true,
            backgroundColor: 'red'
        }, ],
        select: function(arg) {
            var secilenTdler = $('.fc-highlight');
            $.each(secilenTdler, function(i, v) {
                var tr = $(this).closest('tr');
            });
            console.log(arg);
            var startStr = arg.startStr.replaceAll('-', '');
            console.log(startStr);
            var endStr = arg.endStr.replaceAll('-', '');
            console.log(endStr);
            Swal.fire({
                // html: `<div class="mb-7">Tarih aralığını onaylıyor musunuz?</div><div class="fw-bold mb-5">Event Name:</div><input type="text" class="form-control" name="event_name" />`,
                html: `<div class="mb-7">Tarih aralığını onaylıyor musunuz?</div></div>`,
                icon: "info",
                showCancelButton: true,
                buttonsStyling: false,
                confirmButtonText: "Evet",
                cancelButtonText: "Hayır",
                customClass: {
                    confirmButton: "btn btn-primary",
                    cancelButton: "btn btn-active-light"
                }
            }).then(function(result) {
                if (result.value) {
                    $('#addUserDiv').hide();
                    $('.close').hide();
                    $('#calendar').hide();
                    $('#secondCalendar').show();
                    //var title = document.querySelector("input[name='event_name']").value;
                    // if (title) {
                    calendar.addEvent({
                            // title: title,
                            start: arg.start,
                            end: arg.end,
                            // allDay: arg.allDay
                            allDay: true,
                            display: "background"

                        })
                        // }
                    calendar.unselect()
                } else if (result.dismiss === "cancel") {
                    Swal.fire({
                        text: "Lütfen tarih aralığını tekrar seçin!",
                        icon: "error",
                        buttonsStyling: false,
                        confirmButtonText: "Kapat!",
                        customClass: {
                            confirmButton: "btn btn-primary",
                        }
                    });
                }
            });
        },

        drop: function(arg) {
            // is the "remove after drop" checkbox checked?
            if (document.getElementById("drop-remove").checked) {
                // if so, remove the element from the "Draggable Events" list
                arg.draggedEl.parentNode.removeChild(arg.draggedEl);
            }
        }
    });
    calendar.render();



    var secondCalendarEl = document.getElementById('secondCalendar');
    var secondCalendar = new FullCalendar.Calendar(secondCalendarEl, {
        headerToolbar: {
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,listMonth",
        },
        views: {
            dayGridMonth: { buttonText: "Takvim" },
            timeGridWeek: { buttonText: "week" },
            timeGridDay: { buttonText: "day" },
            listMonth: { buttonText: "Liste" }
        },

        validRange: {
            start: firstDayOfWeek,
            end: lastDayOfCalendar
        },

        locale: 'tr',
        initialView: 'dayGridMonth',
        //timeZone: 'local',

        initialDate: firstDayOfWeek,
        firstDay: 1,

        //     editable: true,
        // dayMaxEvents: true, // allow "more" link when too many events
        // navLinks: true,

        selectable: true,
        selectMirror: true,
        editable: true,
        droppable: true,
        unselectAuto: false,

        eventDisplay: "block",
        eventBackgroundColor: "##06b414", //secilen event arka plan
        // select: function(start, end, jsEvent, view) {
        //     calendar.addEventSource([{
        //             start: start,
        //             end: end,
        //             rendering: 'background',
        //             block: true,
        //         }, ])
        //         // calendar.unselect();
        //         // calendar.clientEvents();
        // },
        // selectOverlap: function(event) {
        //     return !event.block;
        // }

        events: [{
            title: "Yılbaşı",
            start: "2023-01-01",
            display: 'block',
            block: true,
            backgroundColor: 'red'
        }, {
            title: "Ulusal Egemenlik ve Çocuk Bayramı",
            start: "2023-04-23",
            display: 'block',
            block: true,
            backgroundColor: 'red'
        }, {
            title: "İşçi Bayramı",
            start: "2023-05-01",
            display: 'block',
            block: true,
            backgroundColor: 'red'
        }, {
            title: "Demokrasi ve Milli Birlik Günü",
            start: "2023-07-15",
            display: 'block',
            block: true,
            backgroundColor: 'red'
        }, {
            title: "Zafer Bayramı",
            start: "2023-08-30",
            display: 'block',
            block: true,
            backgroundColor: 'red'
        }, {
            title: "Cumhuriyet Bayramı",
            start: "2022-10-29",
            display: 'block',
            block: true,
            backgroundColor: 'red'
        }, ],
        select: function(arg) {
            var secilenTdler = $('.fc-highlight');
            $.each(secilenTdler, function(i, v) {
                var tr = $(this).closest('tr');
            });
            console.log(arg);
            var startStr = arg.startStr.replaceAll('-', '');
            console.log(startStr);
            var endStr = arg.endStr.replaceAll('-', '');
            console.log(endStr);
            Swal.fire({
                // html: `<div class="mb-7">Tarih aralığını onaylıyor musunuz?</div><div class="fw-bold mb-5">Event Name:</div><input type="text" class="form-control" name="event_name" />`,
                html: `<div class="mb-7">Tarih aralığını onaylıyor musunuz?</div></div>`,
                icon: "info",
                showCancelButton: true,
                buttonsStyling: false,
                confirmButtonText: "Evet",
                cancelButtonText: "Hayır",
                customClass: {
                    confirmButton: "btn btn-primary",
                    cancelButton: "btn btn-active-light"
                }
            }).then(function(result) {
                if (result.value) {

                    //var title = document.querySelector("input[name='event_name']").value;
                    // if (title) {
                    secondCalendar.addEvent({
                        // title: title,
                        start: arg.start,
                        end: arg.end,
                        // allDay: arg.allDay
                        allDay: true,
                        display: "background"
                    })

                    // }
                    secondCalendar.unselect()
                } else if (result.dismiss === "cancel") {
                    Swal.fire({
                        text: "Lütfen tarih aralığını tekrar seçin!",
                        icon: "error",
                        buttonsStyling: false,
                        confirmButtonText: "Kapat!",
                        customClass: {
                            confirmButton: "btn btn-primary",
                        }
                    });
                }
            });
        },

        drop: function(arg) {
            // is the "remove after drop" checkbox checked?
            if (document.getElementById("drop-remove").checked) {
                // if so, remove the element from the "Draggable Events" list
                arg.draggedEl.parentNode.removeChild(arg.draggedEl);
            }
        }
    });
    secondCalendar.render();

    $('#secondCalendar').hide();
});

function createSecondCalendar() {
    $('#addUserInput').hide();
    var secondCalendarEl = document.getElementById('secondCalendar');
    var secondCalendar = new FullCalendar.Calendar(secondCalendarEl, {
        headerToolbar: {
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,listMonth",
        },
        views: {
            dayGridMonth: { buttonText: "Takvim" },
            timeGridWeek: { buttonText: "week" },
            timeGridDay: { buttonText: "day" },
            listMonth: { buttonText: "Liste" }
        },

        validRange: {
            start: firstDayOfWeek,
            end: lastDayOfCalendar
        },

        locale: 'tr',
        initialView: 'dayGridMonth',
        //timeZone: 'local',

        initialDate: firstDayOfWeek,
        firstDay: 1,

        //     editable: true,
        // dayMaxEvents: true, // allow "more" link when too many events
        // navLinks: true,

        selectable: true,
        selectMirror: true,
        editable: true,
        droppable: true,
        unselectAuto: false,

        eventDisplay: "block",
        eventBackgroundColor: "##06b414", //secilen event arka plan
        // select: function(start, end, jsEvent, view) {
        //     calendar.addEventSource([{
        //             start: start,
        //             end: end,
        //             rendering: 'background',
        //             block: true,
        //         }, ])
        //         // calendar.unselect();
        //         // calendar.clientEvents();
        // },
        // selectOverlap: function(event) {
        //     return !event.block;
        // }

        events: [{
            title: "Yılbaşı",
            start: "2023-01-01",
            display: 'block',
            block: true,
            backgroundColor: 'red'
        }, {
            title: "Ulusal Egemenlik ve Çocuk Bayramı",
            start: "2023-04-23",
            display: 'block',
            block: true,
            backgroundColor: 'red'
        }, {
            title: "İşçi Bayramı",
            start: "2023-05-01",
            display: 'block',
            block: true,
            backgroundColor: 'red'
        }, {
            title: "Demokrasi ve Milli Birlik Günü",
            start: "2023-07-15",
            display: 'block',
            block: true,
            backgroundColor: 'red'
        }, {
            title: "Zafer Bayramı",
            start: "2023-08-30",
            display: 'block',
            block: true,
            backgroundColor: 'red'
        }, {
            title: "Cumhuriyet Bayramı",
            start: "2022-10-29",
            display: 'block',
            block: true,
            backgroundColor: 'red'
        }, ],
        select: function(arg) {
            var secilenTdler = $('.fc-highlight');
            $.each(secilenTdler, function(i, v) {
                var tr = $(this).closest('tr');
            });
            console.log(arg);
            var startStr = arg.startStr.replaceAll('-', '');
            console.log(startStr);
            var endStr = arg.endStr.replaceAll('-', '');
            console.log(endStr);
            Swal.fire({
                // html: `<div class="mb-7">Tarih aralığını onaylıyor musunuz?</div><div class="fw-bold mb-5">Event Name:</div><input type="text" class="form-control" name="event_name" />`,
                html: `<div class="mb-7">Tarih aralığını onaylıyor musunuz?</div></div>`,
                icon: "info",
                showCancelButton: true,
                buttonsStyling: false,
                confirmButtonText: "Evet",
                cancelButtonText: "Hayır",
                customClass: {
                    confirmButton: "btn btn-primary",
                    cancelButton: "btn btn-active-light"
                }
            }).then(function(result) {
                if (result.value) {
                    //var title = document.querySelector("input[name='event_name']").value;
                    // if (title) {
                    secondCalendar.addEvent({
                            // title: title,
                            start: arg.start,
                            end: arg.end,
                            // allDay: arg.allDay
                            allDay: true,
                            display: "background"

                        })
                        // }
                    secondCalendar.unselect()
                } else if (result.dismiss === "cancel") {
                    Swal.fire({
                        text: "Lütfen tarih aralığını tekrar seçin!",
                        icon: "error",
                        buttonsStyling: false,
                        confirmButtonText: "Kapat!",
                        customClass: {
                            confirmButton: "btn btn-primary",
                        }
                    });
                }
            });
        },

        drop: function(arg) {
            // is the "remove after drop" checkbox checked?
            if (document.getElementById("drop-remove").checked) {
                // if so, remove the element from the "Draggable Events" list
                arg.draggedEl.parentNode.removeChild(arg.draggedEl);
            }
        }
    });
    secondCalendar.render();
}

//add user in first page
function newElement() {
    var inputValue = document.getElementById("addUserInput").value;
    inputValue = capitalizeFirstLetter(inputValue);
    var t = document.createTextNode(inputValue);
    if (inputValue.trim() === '') {
        $.notify("Lütfen değer giriniz!", {
            color: "#fff",
            background: "#4B7EE0",
            z_index: '9999999',
            type: "success",
            placement: {
                from: "top",
                align: "right"
            },
            offset: 50,
            animate: {
                enter: 'animated flipInY',
                exit: 'animated flipOutX'
            }
        });
    } else {
        var cardIndex = $('.card-body').length + 1;
        var cardColorCode = colorRgbList(cardIndex);

        var span = document.createElement("SPAN");
        var txt = document.createTextNode("\u00D7");
        span.className = "close";
        span.appendChild(txt);

        // var newUserDiv = `<div class="card text-white mb-3" id="card-` + cardIndex + `" style="background-color:` + cardColorCode + `">
        // <div class="card-body" id="card-body-` + cardIndex + `">
        //     <h5 class="card-title user-name-info"><i class="fa fa-user-md fa-6"></i>` + inputValue + `</h5>
        // </div>
        // </div>`
        // $('#myUL').append(newUserDiv);
        // $('#card-' + cardIndex).append(span);


        var newUserDiv = `<div class="card text-white mb-3 mt-2" id="card-` + cardIndex + `" style="background-color:` + cardColorCode + `">
        <div class="card-body" id="card-body-` + cardIndex + `">
            <i class="fa fa-user-md" style=font-size:2em;>   ` + inputValue + `</i> 
        </div>
        </div>`
        $('#myUL').append(newUserDiv);
        $('#card-' + cardIndex).append(span);

    }
    document.getElementById("addUserInput").value = "";


    for (i = 0; i < close.length; i++) {
        close[i].onclick = function() {
            var div = this.parentElement;
            div.style.display = "none";
        }
    }
}
var myNodelist = document.getElementsByTagName("LI");
var i;
for (i = 0; i < myNodelist.length; i++) {
    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    myNodelist[i].appendChild(span);
}
// Click on a close button to hide the current list item
var close = document.getElementsByClassName("close");
var i;
for (i = 0; i < close.length; i++) {
    close[i].onclick = function() {
        var div = this.parentElement;
        div.remove()
    }
}

function colorRgbList(index) {
    index = index % 15;
    switch (index) {
        case 1:
            return "#0275d8"
            break;
        case 2:
            return "#5cb85c"
            break;
        case 3:
            return "#5bc0de"
            break;
        case 4:
            return "#f0ad4e"
            break;
        case 5:
            return "#d9534f"
            break;
        case 6:
            return "#292b2c"
            break;
        case 7:
            return "#59287a"
            break;
        case 8:
            return "#6cccec"
            break;
        case 9:
            return "#744424"
            break;
        case 10:
            return "#1c3474"
            break;
        case 11:
            return "#f29dd6"
            break;
        case 12:
            return "#0dd157"
            break;
        case 13:
            return "#926040"
            break;
        case 14:
            return "#3e5c74"
            break;
        case 15:
            return "#00c9a7"
            break;
        case 16:
            return "#fab633"
            break;
        default:
            return "#0275d8"
    }
}

function getMonday(d) {
    d = new Date(d);
    var day = d.getDay(),
        diff = d.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday
    var mondayDate = new Date(d.setDate(diff));

    return mondayDate.toISOString().slice(0, 10);
}

function getLastMonday(d) {
    d = new Date(d);
    var day = d.getDay(),
        diff = d.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday
    var lastMondayDate = new Date(d.setDate(diff));
    lastMondayDate.setDate(lastMondayDate.getDate() + 5 * 7);
    return lastMondayDate.toISOString().slice(0, 10);
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}