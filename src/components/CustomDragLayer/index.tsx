import React from 'react'
import { XYCoord, useDragLayer } from 'react-dnd'
import Column from '../Column'

import * as S from './styles'

function getItemStyles(currentOffset: XYCoord | null): React.CSSProperties {
  if (!currentOffset) {
    return {
      display: 'none'
    }
  }
  const { x, y } = currentOffset
  const transform = `translate(${x}px, ${y}px)`
  return {
    transform,
    WebkitTransform: transform
  }
}

const CustomDragLayer: React.FC = () => {
  const { isDragging, item, currentOffset } = useDragLayer((monitor) => ({
    item: monitor.getItem(),
    isDragging: monitor.isDragging(),
    currentOffset: monitor.getSourceClientOffset()
  }))

  if (isDragging) {
    console.log(item, currentOffset)
  }

  return isDragging ? (
    <S.CustomDragLayerContainer>
      <div style={getItemStyles(currentOffset)}>
        <Column title={item.title} index={item.index} id={item.id} />
      </div>
    </S.CustomDragLayerContainer>
  ) : null
}

export default CustomDragLayer
