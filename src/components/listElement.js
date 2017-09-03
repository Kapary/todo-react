import React from 'react';
import classNames from 'classnames';

export const ListElement = (props) => {
  const { item, onStateControlClick, onContentChange, onRemoveListElement, onKeyPress } = props;
  const itemId = item.id;
  const itemClassNames = classNames('list-group-item', {
    'inactive': item.isDone,
  });
  const buttonCopy = item.isDone ? 'Mark as undone' : 'Done';

  return (
    <li className={itemClassNames}>
      <a
        className="item-state-control"
        onClick={() => onStateControlClick(props.item)}
        title={buttonCopy}>
        {buttonCopy}
      </a>
      <input
        data-element-id={itemId}
        type="text"
        value={item.name}
        onChange={(e) => onContentChange(e)}
        onKeyPress={(e) => onKeyPress(e, item)}
      />
      <a
        className="item-remove"
        data-element-id={itemId}
        onClick={(e) => onRemoveListElement(e)}
        title="Remove item">
        Remove
      </a>
    </li>
  );
};



