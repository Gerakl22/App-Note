import { DnD } from "./dnd";

export class Note {
  constructor(button) {
    this.data = [];
    this.button = button;

    this.divCreateNote = document.querySelector(".create-note");
    this.color = document.querySelector("#colorInput");

    this._handleClickButton = this._clickButton.bind(this);
    this.setCoordinats = this._setCoordinats.bind(this);

    this._init();
  }

  _init() {
    this.button.addEventListener("click", this._handleClickButton);
  }

  // Set soordinats our note
  _setCoordinats(note, coordinats) {
    const index = note.getAttribute("note-index");

    this.data[index].left = coordinats.x;
    this.data[index].top = coordinats.y;
    console.log(this.data);
  }

  // Create constructor our note
  _constructorNote(content, top, left, color) {
    return {
      content,
      top,
      left,
      color,
    };
  }

  // Create basic position our note and add information about note in array
  _clickButton() {
    const color = this.color.value;
    const newObjNote = this._constructorNote("My Note", 10, 1000, color);

    this.data.push(newObjNote);

    this.render();
  }

  // Create content note
  _createContentNote(data) {
    const contentNode = document.createElement("div");
    contentNode.classList.add("note-content");
    contentNode.innerHTML = data.content;

    return contentNode;
  }

  _createTextAreaNote() {
    const textAreaNode = document.createElement("textarea");
    textAreaNode.classList.add("note-text", "d-none");

    return textAreaNode;
  }

  // Get button close to delete our note
  _clickCloseBtn(index) {
    this.data.splice(index, 1);

    this.render();
  }

  // Create button for close note
  _createCloseBtn(index) {
    const btnCloseNode = document.createElement("button");
    btnCloseNode.classList.add("note-close");
    btnCloseNode.innerHTML = '<i class="fas fa-times"></i>';

    btnCloseNode.addEventListener("click", () => {
      this._clickCloseBtn(index);
    });

    return btnCloseNode;
  }

  // Get button to open our textarea and write text and than close textarea
  _clickEditBtn(textarea, index) {
    if (textarea.classList.value.includes("d-none")) {
      textarea.classList.remove("d-none");
    } else {
      textarea.classList.add("d-none");
      this.data[index].content = textarea.value;

      this.render();
    }
  }

  // Create button for edit note
  _createEditBtn(textarea, index) {
    const btnEditNode = document.createElement("button");
    btnEditNode.classList.add("note-edit-btn");
    btnEditNode.innerHTML = '<i class="fas fa-user-edit"></i>';
    btnEditNode.addEventListener("click", () => {
      this._clickEditBtn(textarea, index);
    });

    return btnEditNode;
  }

  // Create our Note
  _createNote(data, index) {
    const noteNode = document.createElement("div");
    noteNode.setAttribute("note-index", index);
    noteNode.classList.add("note");
    noteNode.style.cssText = `position: absolute; top: ${data.top}px; left:${data.left}px; background-color: ${data.color}`;
    new DnD(noteNode, this.setCoordinats);

    const btnCloseNode = this._createCloseBtn(index);
    const contentNode = this._createContentNote(data);
    const textAreaNode = this._createTextAreaNote();
    const btnEditNode = this._createEditBtn(textAreaNode, index);

    noteNode.append(btnCloseNode, contentNode, textAreaNode, btnEditNode);

    return noteNode;
  }

  render() {
    this.divCreateNote.innerHTML = "";

    this.data.forEach((noteObj, index) => {
      const noteNode = this._createNote(noteObj, index);

      this.divCreateNote.append(noteNode);
    });
  }
}
