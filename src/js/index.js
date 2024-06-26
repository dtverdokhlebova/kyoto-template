/* eslint-disable unicorn/prefer-dom-node-dataset */
import '../styles/style.scss'
import accordion from '../blocks/accordion/accordion'
import askQuestion from '../blocks/ask-question/ask-question'
import articleSlider from '../blocks/article-slider/article-slider'
import banner from '../blocks/banner/banner'
import category from '../blocks/category/category'
import certificates from '../blocks/certificates/certificates'
import certificatesPromo from '../blocks/certificates-promo/certificates-promo'
import datePicker from '../blocks/date-picker/date-picker'
import interior from '../blocks/interior/interior'
import popup from '../blocks/popup/popup'
import promotionsItem from '../blocks/promotions-item/promotions-item'
import promotionsSlider from '../blocks/promotions-slider/promotions-slider'
import reviews from '../blocks/reviews/reviews'
import reviewsSlider from '../blocks/reviews-slider/reviews-slider'
import servicesSimular from '../blocks/services-simular/services-simular'
import reviewsVideo from '../blocks/reviews-video/reviews-video'
import tabs from '../blocks/tabs/tabs'
import header from '../blocks/header/header'
import navbar from '../blocks/navbar/navbar'
import largeActiveSlider from '../blocks/large-active-slider/large-active-slider'
import uiSelect from '../blocks/_ui/ui-select/ui-select'

// $('body *').on('touchstart', function () {})
document.addEventListener('DOMContentLoaded', function () {
  plyrInit()
  uiSelect()
  accordion()
  articleSlider()
  askQuestion()
  banner()
  datePicker()
  category()
  certificates()
  certificatesPromo()
  header()
  interior()
  popup()
  promotionsItem()
  promotionsSlider()
  reviews()
  reviewsSlider()
  reviewsVideo()
  servicesSimular()
  tabs()
  largeActiveSlider()
})

$(window).on('load', () => {
  navbar()
})

function plyrInit() {
  for (const plyrHolder of document.querySelectorAll('.js-fullscreen-player')) {
    const plyrWrapper = document.createElement('div')
    plyrWrapper.className = 'plyr-wrapper'

    const plyrContainer = document.createElement('div')
    plyrContainer.setAttribute('data-plyr-provider', plyrHolder.getAttribute('data-plyr-provider'))
    plyrContainer.setAttribute('data-plyr-embed-id', plyrHolder.getAttribute('data-plyr-embed-id'))
    plyrWrapper.append(plyrContainer)

    const plyrWrapperClose = document.createElement('div')
    plyrWrapperClose.className = 'plyr-wrapper__close'
    plyrWrapper.append(plyrWrapperClose)

    document.body.append(plyrWrapper)

    const player = new Plyr(plyrContainer, {
      controls: ['play-large', 'play', 'progress', 'current-time', 'volume', 'captions', 'fullscreen'],
      hideControls: true,
      ratio: '9:16',
      youtube: {
        rel: 0, showinfo: 0, iv_load_policy: 3, modestbranding: 1
      }
    })
    plyrHolder.addEventListener('click', () => {
      plyrWrapper.classList.add('active')
      document.documentElement.classList.add('no-scroll')
      player.pause()
      player.play()
    })
    plyrWrapperClose.addEventListener('click', () => {
      plyrWrapper.classList.remove('active')
      document.documentElement.classList.remove('no-scroll')
      player.stop()
    })
  }
}
