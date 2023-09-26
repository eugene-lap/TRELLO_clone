import { initEditCardModalWindow } from '../components/editCardModalWindow.js'
import { initConfirmModalWindow } from '../components/confirmModalWindow.js'
import { renderPanel } from '../renderers/renderPanel.js'
import { getDomElements } from '../utils/getDomElements.js'
import { getActiveBoardIndex } from '../utils/getActiveBoardIndex.js'
import { getData, setData, createNewCard } from '../utils/dataUtils.js'
import { scrollDown } from '../utils/scrollDown.js'

export const handlerCreateNewCard = () => {
  initEditCardModalWindow('new')
  const domElements = getDomElements()
  domElements.clickSound.play()

  window.addEventListener(
    'keydown',
    (event) => {
      if (event.code === 'Escape') {
        domElements.editModalOverlay.remove()
        document.body.style.overflow = 'auto'
      }
    },
    { once: true }
  )

  domElements.modalContainer.addEventListener('click', (event) => {
    if (event.target.id === 'modal-edit-cancel') {
      domElements.editModalOverlay.remove()
      domElements.clickSound.play()
    }
    if (event.target.id === 'modal-edit-confirm') {
      event.preventDefault()

      if (domElements.modalTitle.value.replace(/ /g, '') === '' &&
        domElements.modalDescription.value.replace(/ /g, '') === '') {
        initConfirmModalWindow('Please, enter task title or task description!', 'alert')
        const domElements = getDomElements()
        domElements.errorSound.play()

        domElements.modalConfirmContainer.addEventListener('click', (event) => {
          if (event.target.id === 'modal-cancel') {
            domElements.modalOverlay.remove()
            domElements.clickSound.play()
          }
        })
        window.addEventListener(
          'keydown',
          (event) => {
            if (event.code === 'Escape') {
              domElements.modalOverlay.remove()
              document.body.style.overflow = 'auto'
            }
          },
          { once: true }
        )
      } else {
        domElements.editModalOverlay.remove()
        const boardsArray = getData()
        const activeBoardIndex = getActiveBoardIndex()
        domElements.ringSound.play()

        if (domElements.newUserSelect.value === 'empty') {
          boardsArray[activeBoardIndex].todoTasks.push(
            createNewCard(domElements.modalTitle.value, domElements.modalDescription.value, 'user is not assigned')
          )
        } else {
          boardsArray[activeBoardIndex].todoTasks.push(
            createNewCard(
              domElements.modalTitle.value,
              domElements.modalDescription.value,
              domElements.newUserSelect.value
            )
          )
        }
        setData(boardsArray)
        renderPanel(domElements, 'todo')
        scrollDown(domElements.todoPanelContainer)
      }
    }
  })
}
