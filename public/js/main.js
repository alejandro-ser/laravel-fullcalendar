document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');

    var calendar = new FullCalendar.Calendar(calendarEl, {
        
        // Setting plugins
        plugins: [ 'dayGrid', 'interaction', 'timeGrid', 'list', 'bootstrap' ],
        
        //defaultDate: new Date(2019,8,1),
        //defaultView: 'timeGridDay',

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
                    $('#end_time').val('12:00');

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
            
            $('#start_date').prop('disabled', true);

            // Setting form fields with teh selected date and time
            $('#start_date').val(info.dateStr);
            $('#start_time').val('12:00');
            $('#end_date').val(info.dateStr);
            $('#end_time').val('12:00');
            
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
        sendInfoEvent('',eventObj);
	})
    
    // Config edit actions
	$('#btnEdit').click(function() {
        eventObj = getFormEventData("PATCH");
        sendInfoEvent('/'+$('#id').val(),eventObj);
    })

    // Config delete actions
	$('#btnDelete').click(function() {
        eventObj = getFormEventData("DELETE");
        sendInfoEvent('/'+$('#id').val(),eventObj);
	})

    // Getting data from form event modal
    function getFormEventData(method) {

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
    }

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