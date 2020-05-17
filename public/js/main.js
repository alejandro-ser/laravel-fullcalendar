document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');

    var calendar = new FullCalendar.Calendar(calendarEl, {
        
        // Setting plugins
        plugins: [ 'dayGrid', 'interaction', 'timeGrid', 'list', 'bootstrap' ],
        
        //defaultDate: new Date(2019,8,1),
        //defaultView: 'timeGridDay',

        businessHours: [ // specify an array instead
            {
              daysOfWeek: [ 1, 2, 3, 4 ], // Monday, Tuesday, Wednesday
              startTime: '12:00', // 8am
              endTime: '20:00' // 6pm
            },
            {
              daysOfWeek: [ 5, 6, 0 ], // Thursday, Friday
              startTime: '10:00', // 10am
              endTime: '22:00' // 4pm
            }
        ],

        // Setting header
        header: {
            left: 'today addNewEvent',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
        },

        // Setting footer
        footer: {
            left: '',
            center: '',
            right: 'prevYear prev,next nextYear'
        },

        // Setting bootstrap themes
        themeSystem: 'bootstrap',

        // Getting events from server
        events: url_show,

        // Setting buttons texts
        buttonText: {
            today:    'Today',
            month:    'Month',
            week:     'Week',
            day:      'Day',
            list:     'List'
        },

        // Setting custom buttons
        customButtons: {

            // Creating new button
            addNewEvent: {
                text: 'Add event',
                click: function() {
                    // Clean form fields
                    cleanForm();

                    // Enable star date field
                    $('#start_date').prop('disabled', false);

                    // Setting date and time
                    var date = new Date();
                    var year = date.getFullYear();
                    var month = (date.getMonth()+1);
                    var day = date.getDate();
                    
                    month = (month<10)?"0"+month:month;
                    day = (day<10)?"0"+day:day;

                    $('#start_date').val(year+'-'+month+'-'+day);
                    $('#start_time').val('12:00');
                    $('#end_date').val(year+'-'+month+'-'+day);
                    $('#end_time').val('12:30');

                    // Show hide footer buttons
                    $("#btnAdd").show();
                    $("#btnEdit").hide();
                    $("#btnDelete").hide();

                    // Show form modal
                    $('#eventModal').modal();
                }
            }
        },

        // Config actions when clicking in a date
        dateClick: function(info) {
            // Clean form fields
            cleanForm();
            
            // Disable star date field
            $('#start_date').prop('disabled', true);

            // Setting form fields with teh selected date and time
            $('#start_date').val(info.dateStr);
            $('#start_time').val('12:00');
            $('#end_date').val(info.dateStr);
            $('#end_time').val('12:30');
            
            // Show hide footer buttons
            $("#btnAdd").show();
			$("#btnEdit").hide();
			$("#btnDelete").hide();
			
            // Show form modal
			$('#eventModal').modal();
			
            //calendar.addEvent({ title: "Evento X", date:info.dateStr });
        },

        // Config actions when clicking in an event
        eventClick: function(info) {
            // Enable star date field
            $('#start_date').prop('disabled', false);

            // Getting start date and time
			start_month = (info.event.start.getMonth()+1);
			start_day = info.event.start.getDate();
			start_year = info.event.start.getFullYear();
			start_hours = info.event.start.getHours();
			start_minutes = info.event.start.getMinutes();

			start_month = (start_month<10)?"0"+start_month:start_month;
			start_day = (start_day<10)?"0"+start_day:start_day;
			start_hours = (start_hours<10)?"0"+start_hours:start_hours;
			start_minutes = (start_minutes<10)?"0"+start_minutes:start_minutes;
            
            // Getting end date and time
			end_month = (info.event.end.getMonth()+1);
			end_day = info.event.end.getDate();
			end_year = info.event.end.getFullYear();
			end_hours = info.event.end.getHours();
			end_minutes = info.event.end.getMinutes();

			end_month = (end_month<10)?"0"+end_month:end_month;
			end_day = (end_day<10)?"0"+end_day:end_day;
			end_hours = (end_hours<10)?"0"+end_hours:end_hours;
            end_minutes = (end_minutes<10)?"0"+end_minutes:end_minutes;
            
            // setting date and time
			$('#id').val(info.event.id),
            $('#title').val(info.event.title),            
            $('#start_date').val(start_year+"-"+start_month+"-"+start_day),
            $('#start_time').val(start_hours+":"+start_minutes),
            $('#end_date').val(end_year+"-"+end_month+"-"+end_day),
            $('#end_time').val(end_hours+":"+end_minutes),
            $('#color').val(info.event.backgroundColor),
            $('#description').val(info.event.extendedProps.description),

            // Show hide footer buttons
			$("#btnAdd").hide();
			$("#btnEdit").show();
            $("#btnDelete").show();

            // Show form modal
            $('#eventModal').modal();
        }

    });

    // Setting calendar language
    calendar.setOption('locale', 'en');

    // Rendering calendar
    calendar.render();

    // Config add actions
    $('#btnAdd').click(function() {
        eventObj = getFormEventData("POST");
        sendInfoEvent('', eventObj);
	})
    
    // Config edit actions
	$('#btnEdit').click(function() {
        eventObj = getFormEventData("PATCH");
        sendInfoEvent('/'+$('#id').val(), eventObj);
    })

    // Config delete actions
	$('#btnDelete').click(function() {
        eventObj = getFormEventData("DELETE");
        sendInfoEvent('/'+$('#id').val(), eventObj);
	})

    // Getting data from form event modal
    function getFormEventData(method) {

        // Validate date and time
        if (validateDate()) {
            // Creating event data object
            newEventObj = {
                title: $('#title').val(),
                start: $('#start_date').val()+" "+$('#start_time').val(),
                end: $('#end_date').val()+" "+$('#end_time').val(),
                color: $('#color').val(),
                textColor: '#ffffff',
                description: $('#description').val(),
                '_token': $("meta[name='csrf-token']").attr("content"),
                '_method': method
            }

            return newEventObj;            
        } else {
            return
        }
    }

    // Sendind event data object to the action
    function sendInfoEvent(action,eventObj) {
        $.ajax(
            {
                type: "POST",
                url: url_+action,
                data: eventObj,
                success: function(msg){
					$('#eventModal').modal('toggle');
					calendar.refetchEvents();
				},
                error: function(error){
                    console.log(error);
                }
            }
        );
    }

    // Validate date and time    
    function validateDate(){
        
        if (($('#start_date').val() === $('#end_date').val())
            && ($('#start_time').val() > $('#end_time').val())) {
            alert("The end time cannot be less than the start time");
        } else if ($('#start_date').val() > $('#end_date').val()) {
            alert("The end date cannot be less than the start date");
        } else {
            return true;
        }

    }
    
    // Clean form fields
	function cleanForm() {
		$('#id').val(""),
		$('#title').val(""),
		$('#description').val(""),
		$('#color').val(""),
		$('#start_date').val(""),
        $('#start_time').val(""),
        $('#end_date').val(""),
		$('#end_time').val("")
	}
});