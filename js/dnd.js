export class DnD {
  constructor(element, methodSetCoordinats) {
    this.element = element;
    this.methodSetCoordinats = methodSetCoordinats || null;

    this._handleMouseDown = this._mouseDown.bind(this);
    this._handleMouseUp = this._mouseUp.bind(this);
    this._handleMouseMove = this._mouseMove.bind(this);

    this._init();
  }

  _init() {
    this._setPositionAbsolute();

    this.element.addEventListener('mousedown', this._handleMouseDown);
  }

  _setPositionAbsolute() {
    this.element.style.position = 'absolute';
  }

  _mouseDown(event) {
    this.shiftX = event.clientX - this.element.getBoundingClientRect().left;
    this.shiftY = event.clientY - this.element.getBoundingClientRect().top;

    this._trackMouse(event.pageX, event.pageY);

    document.addEventListener('mouseup', this._handleMouseUp);
    document.addEventListener('mousemove', this._handleMouseMove);
  }

  _mouseUp() {
    document.removeEventListener('mouseup', this._handleMouseUp);
    document.removeEventListener('mousemove', this._handleMouseMove);

    if (this.methodSetCoordinats != null) {
      this.methodSetCoordinats(this.element, { x: this.left, y: this.top });
    }
  }

  _mouseMove(event) {
    this._trackMouse(event.pageX, event.pageY);
  }

  _trackMouse(pageX, pageY) {
    this.left = pageX - this.shiftX;
    this.top = pageY - this.shiftY;

    this.element.style.left = `${this.left}px`;
    this.element.style.top = `${this.top}px`;
  }
}
