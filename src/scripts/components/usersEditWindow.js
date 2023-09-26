import { createButton } from './button.js'
import { getActiveBoardColor } from '../utils/getActiveBoardColor.js'

export const createUsersEditWindow = () => {
  const mainColor = getActiveBoardColor('normal')

  const usersEditWrapper = document.createElement('div')
  usersEditWrapper.classList = 'users-edit-wrapper'

  const usersEditWindow = document.createElement('div')
  usersEditWindow.classList = 'users-edit'
  usersEditWindow.style.borderColor = mainColor
  usersEditWrapper.append(usersEditWindow)

  const usersEditHeader = document.createElement('p')
  usersEditHeader.classList = 'users-edit__header'
  usersEditHeader.style.background = mainColor

  const usersAddForm = document.createElement('form')
  usersAddForm.classList = 'users-edit__add-form'

  const newUserSelect = document.createElement('select')
  newUserSelect.classList = 'users-edit__select'
  newUserSelect.name = 'users-edit-select'

  newUserSelect.onmouseover = function () {
    newUserSelect.style.borderColor = mainColor
  }
  newUserSelect.onmouseout = function () {
    newUserSelect.style.borderColor = 'transparent'
  }

  usersAddForm.append(newUserSelect,
    createButton('user-edit-select-button', 'modal-button', 'Add to project', 'submit', '', 'fill'))

  const usersEditContainer = document.createElement('ul')
  usersEditContainer.classList = 'users-edit__container'

  const buttonsContainer = document.createElement('div')
  buttonsContainer.classList = 'users-edit__buttons-container'
  buttonsContainer.append(
    createButton('user-edit-save-button', 'modal-button', 'Save', 'button', 'Save changes', 'fill'),
    createButton('user-edit-cancel-button', 'modal-button', 'Cancel', 'button', 'Cancel changes', 'fill'))

  usersEditWindow.append(usersEditHeader, usersAddForm, usersEditContainer, buttonsContainer)

  const root = document.querySelector('#root')
  document.body.style.overflow = 'hidden'
  root.append(usersEditWrapper)
}
