import React, { Component } from 'react';
import classNames from 'classnames';
import { ListElement } from './components/listElement';
import { getLowestPossibleId } from './helpers/uniqueIdHelper';
import { updateList, getList } from './helpers/storageHelper';
import { LIST_ITEMS_EXAMPLE } from './enums/listExample';
import { LIST_TYPE } from './enums/names';

const listItems = getList() ? getList() : LIST_ITEMS_EXAMPLE;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      elementIndex: 0,
      listItems: listItems,
      newElementInputValue: '',
      selectedListType: LIST_TYPE.ALL,
    };

    this.handleContentChange = this.handleContentChange.bind(this);
  }

  componentDidMount() {
    const highestIndex = getLowestPossibleId(this.state.listItems);
    this.updateHighestId(highestIndex);
  }

  updateHighestId(newId) {
    this.setState(prevState => ({
      elementIndex: newId
    }));
  }

  createListElement(e) {
    if (e.key !== 'Enter') {
      return;
    }

    const newElementIndex = this.state.elementIndex + 1;
    const newArrayElement = { name: e.target.value, isDone: false, id: newElementIndex };
    let listItems = this.state.listItems;
    listItems.unshift(newArrayElement);

    this.setState({
      listItems,
      newElementInputValue: '',
    });
    this.updateHighestId(newElementIndex);
    updateList(listItems);
  }

  removeListElement(e) {
    const itemId = Number(e.target.dataset.elementId);
    const listItems = this.state.listItems;

    listItems.forEach((item, index) => {
      if (item.id === itemId) {
        listItems.splice(index, 1);
      }
    });

    this.setState({ listItems });
    updateList(listItems);
  }

  /* Save item on enter */
  handleKeyPress(e) {
    if (e.key !== 'Enter') {
      return;
    }

    // State should be immutable, so take the array and modify the value of certain item
    let listItems = this.state.listItems;

    // Set new array
    this.setState({ listItems });
  }

  handleItemStateChange(element) {
    const itemIndex = this.state.listItems.findIndex((item) => item.id === Number(element.id));
    // State should be immutable, so take the array and modify the value of certain item
    let listItems = this.state.listItems;

    element.isDone = !listItems[itemIndex].isDone;

    // Set new array
    this.setState({ listItems });
    updateList(listItems);
  }

  handleContentChange(e) {
    const elementId = Number(e.target.dataset.elementId);
    const newValue = e.target.value;
    const itemIndex = this.state.listItems.findIndex((item) => item.id === elementId);
    let listItems = this.state.listItems;
    listItems[itemIndex].name = newValue;

    // Set new array
    this.setState({ listItems });
    updateList(listItems);
  }


  getDoneElements() {
    return this.state.listItems.filter((item) => item.isDone);
  }

  getElementsToDo() {
    return this.state.listItems.filter((item) => !item.isDone);
  }

  getAllElements() {
    return this.state.listItems;
  }

  getTodosCountInfo() {
    const count = this.getElementsToDo().length;
    return count ? count + ' to go!' : 'Nothing more to do!';
  }

  renderItemsList(list) {
    return list.map((item) =>
      <ListElement
        key={item.id}
        item={item}
        onRemoveListElement={(e) => this.removeListElement(e)}
        onStateControlClick={() => this.handleItemStateChange(item)}
        onContentChange={(e) => this.handleContentChange(e)}
        onKeyPress={(e) => this.handleKeyPress(e)}
      />
    );
  }

  renderTasksList() {
    const selectedListType = this.state.selectedListType;

    switch (selectedListType) {
      case LIST_TYPE.DONE:
        return this.renderItemsList(this.getDoneElements());
      case LIST_TYPE.TODO:
        return this.renderItemsList(this.getElementsToDo());
      default:
        return this.renderItemsList(this.getAllElements());
    }
  }

  setListDisplayType(selectedListType) {
    this.setState({ selectedListType });
  }

  render() {
    const selectedListType = this.state.selectedListType;

    return (
      <article className="app-wrapper">
        <header className="app-header">
          <h1>TODO list</h1>
        </header>
        <section className="todo-list-wrapper">
          <header className="new-item-wrapper">
            <input
              autoFocus
              type="text"
              placeholder="What's needs to be done today?"
              onKeyPress={(e) => this.createListElement(e)}
              value={this.state.newElementInputValue}
              onChange={(e) => (this.setState({ newElementInputValue: e.target.value }))}
            />
          </header>
          <ul className="items-list list-group">
            {this.renderTasksList()}
          </ul>
          <footer className="list-footer">
            <small className="items-left-count">
              {this.getTodosCountInfo()}
            </small>
            <ul className="buttons-group">
              <li>
                <button
                  className={classNames({ active:selectedListType === LIST_TYPE.ALL })}
                  onClick={() => this.setListDisplayType()}>
                  All items
                </button>
              </li>
              <li>
                <button
                  className={classNames({ active:selectedListType === LIST_TYPE.DONE })}
                  onClick={() => this.setListDisplayType(LIST_TYPE.DONE)}>
                  Already done
                </button>
              </li>
              <li>
                <button
                  className={classNames({ active:selectedListType === LIST_TYPE.TODO })}
                  onClick={() => this.setListDisplayType(LIST_TYPE.TODO)}>
                  To do
                </button>
              </li>
            </ul>
          </footer>
        </section>
      </article>
    );
  }
}

export default App;
