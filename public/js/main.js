document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');

    var calendar = new FullCalendar.Calendar(calendarEl, {
        
        defaultDate: new Date(2019,8,1),
        plugins: [ 'dayGrid', 'interaction', 'timeGrid', 'list' ],
        //defaultView: 'timeGridDay',

        header: {
            left: 'today Miboton',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay,',
        },

        footer: {
            left: '',
            center: '',
            right: 'prevYear prev,next nextYear'
        },

        buttonText: {
            today:    'Hoy',
            month:    'Mes',
            week:     'Semana',
            day:      'Día',
            list:     'Lista'
        },

        customButtons: {
            Miboton: {
                text: 'Botón',
                click: function() {
                    alert("Hola mundo");
                    $('#exampleModal').modal();
                }
            }
        },

        dateClick: function(info) {
            $('#exampleModal').modal();
            console.log(info);
            calendar.addEvent({ title: "Evento X", date:info.dateStr });
        },

        eventClick: function(info) {
            console.log(info);
            console.log(info.event.title);

            console.log(info.event.start);
            console.log(info.event.end);
            console.log(info.event.testColor);
            console.log(info.event.backgroundColor);

            console.log(info.event.extendedProps.description);
        },

        events: [
            {
                title: "Mi evento 1",
                start: "2019-09-13 12:30:00",
                description: "DEscripción del evento 1"
            },
            {
                title: "Mi evento 2",
                start: "2019-09-14 12:30:00",
                description: "DEscripción del evento 2"
            }
        ]
    });

    calendar.setOption('locale', 'es');

    calendar.render();
});