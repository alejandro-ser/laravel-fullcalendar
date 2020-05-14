@extends('layouts.app')

<!-- Styles -->
@section('styles')
<link rel="stylesheet" href="{{ asset('fullcalendar/core/main.css') }}">
<link rel="stylesheet" href="{{ asset('fullcalendar/daygrid/main.css') }}">
<link rel="stylesheet" href="{{ asset('fullcalendar/list/main.css') }}">
<link rel="stylesheet" href="{{ asset('fullcalendar/timegrid/main.css') }}">
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
<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Datos del evento</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>

        <div class="modal-body">
            <label for="txtId">Id:</label>
            <input type="text" name="txtId" id="txtId">
            <br>
            <label for="txtFecha">Fecha</label>
            <input type="text" name="txtFecha" id="txtFecha">
            <br>
            <label for="txtTitulo">Titulo</label>
            <input type="text" name="txtTitulo" id="txtTitulo">
            <br>
            <label for="txtHora">Hora</label>
            <input type="text" name="txtHora" id="txtHora">
            <br>
            <label for="txtDescription">Descripción</label>
            <textarea name="txtDescription" id="txtDescription" cols="30" rows="10"></textarea>
            <br>
            <label for="txtColor">Color</label>
            <input type="color" name="txtColor" id="txtColor">
        </div>

        <div class="modal-footer">
            <button id="btnAgregar" class="btn btn-success">Agregar</button>
            <button id="btnModificar" class="btn btn-primary">Modificar</button>
            <button id="btnBorrar" class="btn btn-warning">Borrar</button>
            <button id="btnCancelar" class="btn btn-danger" data-dismiss="modal">Cancelar</button>
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

<script src="{{ asset('js/main.js') }}"></script>
@endsection