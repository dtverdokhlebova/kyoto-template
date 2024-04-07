export default function uiSelect() {
  const selects = document.querySelectorAll('.ui-select select')
  for (const select of selects) {
    const selectParent = select.parentElement
    const minResultForSearch = selectParent.classList.contains('ui-select--input') ? 0 : Number.POSITIVE_INFINITY
    $(select).select2({
      minimumResultsForSearch: minResultForSearch,
      width: 'auto',
      dropdownAutoWidth: true,
      dropdownParent: selectParent,
      placeholder: select.dataset.placeholder ?? '',
      closeOnSelect: !select.getAttribute('multiple'),
      language: 'ru'
    })
  }
}
