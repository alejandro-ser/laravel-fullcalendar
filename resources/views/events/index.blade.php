@extends('layouts.app')

<!-- Styles -->
@section('styles')
<link rel="stylesheet" href="{{ asset('fullcalendar/core/main.css') }}">
<link rel="stylesheet" href="{{ asset('fullcalendar/daygrid/main.css') }}">
<link rel="stylesheet" href="{{ asset('fullcalendar/list/main.css') }}">
<link rel="stylesheet" href="{{ asset('fullcalendar/timegrid/main.css') }}">
<link rel="stylesheet" href="{{ asset('fullcalendar/bootstrap/main.css') }}">
<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.6/css/all.css">
<style>
	.fc-event-container a {
		cursor: pointer;
	}
</style>
@endsection

@section('content')
<div class="row">
    <div class="col"></div>
    <div class="col-10 col-sx-12">
        <div id="calendar"></div>
    </div>
    <div class="col"></div>
</div>

<!-- Modal -->
<div class="modal fade" id="eventModal" tabindex="-1" role="dialog" aria-labelledby="eventModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="eventModalLabel">Event information</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>

        <div class="modal-body">
			<input type="hidden" name="id" id="id">
			
			<div class="form-row">
				<div class="form-group col-md-12">
					<label for="title">Title</label>
					<input class="form-control" type="text" name="title" id="title">
				</div>

				<div class="form-group col-md-6">
					<label for="start_date">Start date</label>
					<input class="form-control" type="date" name="start_date" id="start_date">
				</div>

				<div class="form-group col-md-6">
					<label for="start_time">Start time</label>
            		<input class="form-control" type="time" min="01:00 a.m." max="23:59 p.m." step="600" name="start_time" id="start_time">
				</div>

				<div class="form-group col-md-6">
					<label for="end_date">End date</label>
            		<input class="form-control" type="date" name="end_date" id="end_date">
				</div>

				<div class="form-group col-md-6">
					<label for="end_time">End time</label>
            		<input class="form-control" type="time" min="01:00 a.m." max="23:59 p.m." step="600" name="end_time" id="end_time">
				</div>

				<div class="form-group col-md-12">
					<label for="color">Color</label>
            		<input class="form-control" type="color" name="color" id="color">
				</div>

				<div class="form-group col-md-12">
					<label for="description">Description</label>
            		<textarea class="form-control" name="description" id="description" cols="30" rows="10"></textarea>
				</div>

			</div>
        </div>

        <div class="modal-footer">
            <button id="btnAdd" class="btn btn-success">Add</button>
            <button id="btnEdit" class="btn btn-warning">Edit</button>
            <button id="btnDelete" class="btn btn-danger">Delete</button>
            <button id="btnCancel" class="btn btn-primary" data-dismiss="modal">Cancel</button>
        </div>
      </div>
    </div>
</div>
@endsection

@section('scripts')
<script src="{{ asset('fullcalendar/core/main.js') }}"></script>
<script src="{{ asset('fullcalendar/interaction/main.js') }}"></script>
<script src="{{ asset('fullcalendar/daygrid/main.js') }}"></script>
<script src="{{ asset('fullcalendar/list/main.js') }}"></script>
<script src="{{ asset('fullcalendar/timegrid/main.js') }}"></script>
<script src="{{ asset('fullcalendar/bootstrap/main.js') }}"></script>

<script>
	var url_ = "{{ route('events.index') }}";
	var url_show = "{{ route('events.show', 0) }}";
</script>

<script src="{{ asset('js/main.js') }}"></script>

@endsection