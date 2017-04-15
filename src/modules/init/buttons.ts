import { stringToNode } from '../utils';
import { injectElIntoModal } from './modal';

import CLASS_NAMES from '../class-list';
const { BUTTON } = CLASS_NAMES;

import { ButtonList, ButtonOptions } from '../options';
import { buttonListMarkup, buttonMarkup } from '../markup';

import { closeModal } from '../actions';
import state from '../state';

const onButtonClick = (value: string|Boolean): void => {
  closeModal();

  state.promise.resolve(value);
};

/*
 * Generate a button, with a container element,
 * the right class names, the text, and an event listener.
 */
const getButton = (namespace: string, { text, value }: ButtonOptions): Node => {
  const buttonContainer: any = stringToNode(buttonMarkup);

  const buttonEl: Element = buttonContainer.querySelector(`.${BUTTON}`);

  const btnNamespaceClass = `${BUTTON}--${namespace}`;
  buttonEl.classList.add(btnNamespaceClass);
  buttonEl.textContent = text;

  buttonEl.addEventListener('click', () => {
    return onButtonClick(value);
  });

  return buttonContainer;
};

/*
 * Create the buttons-container,
 * then loop through the ButtonList object
 * and append every button to it.
 */
const initButtons = (buttons: ButtonList): void => {
  if (!buttons) return;

  const buttonListEl = injectElIntoModal(buttonListMarkup);

  for (let key in buttons) {
    const buttonOpts: ButtonOptions = buttons[key];
    const buttonEl = getButton(key, buttonOpts);
    buttonListEl.appendChild(buttonEl);
  }
};

export default initButtons;