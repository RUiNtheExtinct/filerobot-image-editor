/** External Dependencies */
import React, { useEffect, useMemo, useState } from 'react';
import IconButton from '@scaleflex/ui/core/icon-button';
// import { DeleteOutline, Duplicate, LayerOrder } from '@scaleflex/icons';
import DeleteOutline from '@scaleflex/icons/delete-outline';
import Duplicate from '@scaleflex/icons/duplicate';

/** Internal Dependencies */
import { useStore } from 'hooks';
import { DUPLICATE_ANNOTATIONS, REMOVE_ANNOTATIONS } from 'actions';
import { NODES_TRANSFORMER_ID, WATERMARK_ANNOTATION_ID } from 'utils/constants';
import debounce from 'utils/debounce';
import { StyledNodeControls } from './NodeControls.styled';

const NodeControls = () => {
  const {
    selectionsIds = [],
    designLayer,
    annotations,
    dispatch,
    config = {},
  } = useStore();
  const [position, setPosition] = useState({ left: 0, top: 0 });
  const nodesTransformer = useMemo(
    () => designLayer?.getStage()?.findOne(`#${NODES_TRANSFORMER_ID}`),
    [designLayer],
  );
  const selectionsLength = selectionsIds.length;

  const updatePosition = debounce(() => {
    const anchor =
      selectionsLength === 1
        ? designLayer.getStage()?.findOne(`#${selectionsIds[0]}`)
        : nodesTransformer;

    if (!anchor) {
      return;
    }

    const anchorPosition = anchor.getAbsolutePosition();
    setPosition({
      left: (anchorPosition.x + anchor.width() / 2) * anchor.scaleX(),
      top: (anchorPosition.y + anchor.height()) * anchor.scaleY(),
    });
  }, 10);

  useEffect(() => {
    updatePosition();
  }, [selectionsIds, nodesTransformer, annotations]);

  if (selectionsLength === 0 || !nodesTransformer) return null;

  // TODO: Connect annotation ordering with useAnnotationOrdering hook.
  // const changeAnnotationOrder = () => {};

  const duplicateSelectedNodes = () => {
    dispatch({
      type: DUPLICATE_ANNOTATIONS,
      payload: {
        annotationsIds: selectionsIds,
        onAnnotationAdd: config.onAnnotationAdd,
      },
    });
  };

  const removeSelectedNodes = () => {
    dispatch({
      type: REMOVE_ANNOTATIONS,
      payload: {
        annotationsIds: selectionsIds,
      },
    });
  };

  return (
    <StyledNodeControls
      className="FIE_annotation-controls-overlay"
      left={position.left}
      top={position.top}
    >
      {/* {selectionsLength === 1 && (
        <IconButton color="basic" size="sm" onClick={changeAnnotationOrder}>
          <LayerOrder />
        </IconButton>
      )} */}
      {selectionsIds[0] !== WATERMARK_ANNOTATION_ID && (
        <IconButton color="basic" size="sm" onClick={duplicateSelectedNodes}>
          <Duplicate />
        </IconButton>
      )}
      <IconButton color="basic" size="sm" onClick={removeSelectedNodes}>
        <DeleteOutline />
      </IconButton>
    </StyledNodeControls>
  );
};

export default NodeControls;
