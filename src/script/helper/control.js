export default function Control(component) {
  if (document.querySelectorAll(`.${component.targetClass}`).length > 0) {
    component.render();
  }
}
