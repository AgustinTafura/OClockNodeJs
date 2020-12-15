
{{--  Show Specialties - SpecialtyController - getspecialties($category_id) --}}
@if (isset($specialties))
    <option value='0' class='titleCat' > Especialidad </option>
  @foreach ($specialties as $key => $value)
    <option value="{{$value->id}}"> {{$value->name}} </option>
  @endforeach

@endif

{{--  Show services - ServiceController - getservices($category_id) --}}
@if (isset($services))
  @foreach ($services as $key => $value)
    <div class="funkyradio-warning">
        <input type="checkbox" name="service_id_{{$value->id}}" id="service_id_{{$value->id}}" value="{{$value->id}}" />
        <label for="service_id_{{$value->id}}">{{$value->name}}</label>
    </div>
  @endforeach

@endif
