export default function askQuestion() {
  // ask-question
  window.askQuestionThankShow = function () {
    $('.ask-question').addClass('ask-question--thank-active')
  }
  window.askQuestionThankHide = function () {
    $('.ask-question').removeClass('ask-question--thank-active')
    $('.ask-question__form').trigger('reset')
  }
}
