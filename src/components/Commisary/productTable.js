// DraggableTableRow.js
import React from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { Button }  from "react-bootstrap";

const DraggableTableRow = ({ index, product, handleRemoveProduct, moveRow }) => {
  const [, drag] = useDrag({
    type: 'ROW',
    item: { index },
  });

  const [, drop] = useDrop({
    accept: 'ROW',
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveRow(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  return (
    <tr ref={(node) => drag(drop(node))} key={index}>
      <td>{product.productName}</td>
      <td>
        <Button variant="outline-danger" onClick={() => handleRemoveProduct(index)}>
          Remove
        </Button>
      </td>
    </tr>
  );
};

export default DraggableTableRow;
