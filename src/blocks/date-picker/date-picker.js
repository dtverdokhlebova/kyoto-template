export default function datePicker() {
  Datepicker.locales.ru = {
    days: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
    daysShort: ['Вск', 'Пнд', 'Втр', 'Срд', 'Чтв', 'Птн', 'Суб'],
    daysMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
    months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
    monthsShort: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
    today: 'Сегодня',
    clear: 'Очистить',
    format: 'dd.mm.yyyy',
    weekStart: 1,
    monthsTitle: 'Месяцы'
  }

  for (const block of document.querySelectorAll('.date-picker')) {
    const datepickers = []
    const hiddenInput = block.querySelector('.date-picker__input')
    for (const month of block.querySelectorAll('.date-picker__item')) {
      console.log(block.dataset.disabled.split(','))
      const datepicker = new Datepicker(month, {
        todayHighlight: true,
        language: 'ru',
        maxView: 0,
        defaultViewDate: `01.${month.dataset.monthYear}`,
        minDate: month.dataset.minDate ?? null,
        maxDate: month.dataset.maxDate ?? null,
        datesDisabled: block.dataset.disabled ? block.dataset.disabled.split(',').map(date => date.trim()) : []
      })
      datepickers.push(datepicker)

      // удаление года в названии месяца
      // const monthTitle = month.querySelector('.button.view-switch')
      // monthTitle.textContent = monthTitle.textContent.slice(0, -5)
    }

    // Связывание дейтпикеров
    const [first, last] = datepickers

    first.element.addEventListener('changeDate', (event) => {
      const currentDate = event.detail.date
      if (currentDate) {
        const thisMonth = +first.element.dataset.monthYear.split('.')[0] - 1
        const currentMonth = currentDate.getMonth()

        // Если дата из следующего месяца, то установка на следующий
        if (currentMonth > thisMonth) {
          first.setDate({
            clear: true
          })
          last.setDate(currentDate)
        }

        // Если дата из этого месяца, то чистим следующий
        else {
          last.setDate({
            clear: true
          })
          hiddenInput.value = currentDate.toLocaleDateString('ru-Ru')
        }
      }
    })

    last.element.addEventListener('changeDate', (event) => {
      const currentDate = event.detail.date
      if (currentDate) {
        const thisMonth = +last.element.dataset.monthYear.split('.')[0] - 1
        const currentMonth = currentDate.getMonth()

        // Если дата из предыдущего месяца, то установка на предыдущего
        if (currentMonth < thisMonth) {
          last.setDate({
            clear: true
          })
          first.setDate(currentDate)
        }

        // Если дата из этого месяца, то чистим предыдущий
        else {
          first.setDate({
            clear: true
          })
          hiddenInput.value = currentDate.toLocaleDateString('ru-Ru')
        }
      }
    })
  }

  window.updateDatePickerItem = function (element, monthYear, minDate, maxDate, disabled) {
    const datepicker = element.datepicker
    datepicker.setOptions({
      defaultViewDate: `01.${monthYear}`,
      minDate: minDate ?? null,
      maxDate: maxDate ?? null,
      datesDisabled: disabled ?? []
    })
  }
}
