document.addEventListener('DOMContentLoaded', function() {
  var calendarContainer = document.getElementById('calendar');
  var currentDate = new Date();
  var currentMonth = currentDate.getMonth();
  var currentYear = currentDate.getFullYear();
  var selectedDays = []; // Array para almacenar los días seleccionados
  var selectedHours = []; // Array para almacenar las horas seleccionadas

  createCalendar(currentMonth, currentYear);

  function createCalendar(month, year) {
    calendarContainer.innerHTML = '';

    var monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    var daysOfWeek = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
    var firstDayOfMonth = new Date(year, month, 1);
    var lastDayOfMonth = new Date(year, month + 1, 0);
    var numDaysInMonth = lastDayOfMonth.getDate();
    var firstDayIndex = firstDayOfMonth.getDay();

    var calendarHeader = document.createElement('div');
    calendarHeader.classList.add('calendar-header');
    calendarHeader.innerHTML = `
      <button id="prev-month">Anterior</button>
      <span>${monthNames[month]} ${year}</span>
      <button id="next-month">Siguiente</button>
    `;
    calendarContainer.appendChild(calendarHeader);

    var calendarTable = document.createElement('table');
    calendarTable.classList.add('calendar-table');
    var tableHead = document.createElement('thead');
    var headRow = document.createElement('tr');
    daysOfWeek.forEach(function(day) {
      var th = document.createElement('th');
      th.textContent = day;
      headRow.appendChild(th);
    });
    tableHead.appendChild(headRow);
    calendarTable.appendChild(tableHead);

    var tableBody = document.createElement('tbody');
    var currentDay = 1;
    for (var i = 0; i < 6; i++) {
      var row = document.createElement('tr');
      for (var j = 0; j < 7; j++) {
        var cell = document.createElement('td');
        if (i === 0 && j < firstDayIndex) {
          cell.textContent = '';
        } else if (currentDay <= numDaysInMonth) {
          cell.textContent = currentDay;
          cell.addEventListener('click', function() {
            this.classList.toggle('selected');
            var day = parseInt(this.textContent);
            if (this.classList.contains('selected')) {
              selectedDays.push(day);
            } else {
              var index = selectedDays.indexOf(day);
              if (index !== -1) {
                selectedDays.splice(index, 1);
              }
            }
          });
          currentDay++;
        }
        row.appendChild(cell);
      }
      tableBody.appendChild(row);
    }
    calendarTable.appendChild(tableBody);
    calendarContainer.appendChild(calendarTable);

    document.getElementById('prev-month').addEventListener('click', function() {
      if (month === 0) {
        createCalendar(11, year - 1);
      } else {
        createCalendar(month - 1, year);
      }
    });

    document.getElementById('next-month').addEventListener('click', function() {
      if (month === 11) {
        createCalendar(0, year + 1);
      } else {
        createCalendar(month + 1, year);
      }
    });

    var hours = ['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM'];
    var hourSelect = document.createElement('select');
    hourSelect.multiple = true; // Permitir selección múltiple
    hourSelect.innerHTML = '<option value="">Selecciona la hora</option>';
    hours.forEach(function(hour) {
      var option = document.createElement('option');
      option.textContent = hour;
      hourSelect.appendChild(option);
    });
    hourSelect.addEventListener('change', function() {
      var selectedOptions = Array.from(this.options).filter(option => option.selected);
      selectedHours = selectedOptions.map(option => option.value);
    });
    calendarContainer.appendChild(hourSelect);
  }
});
