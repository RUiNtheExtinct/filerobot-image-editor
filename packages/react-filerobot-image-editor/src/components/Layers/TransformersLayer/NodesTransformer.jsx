/** External Dependencies */
import React, { useEffect, useState } from 'react';
import { Transformer } from 'react-konva';

/** Internal Dependencies */
import {
  NODES_TRANSFORMER_ID,
  POINTER_ICONS,
  TOOLS_IDS,
} from 'utils/constants';
import { useEditableTextId, useStore } from 'hooks';
import { CHANGE_POINTER_ICON, ENABLE_TEXT_CONTENT_EDIT } from 'actions';
import debounce from 'utils/debounce';
import NodeControls from 'components/NodeControls';

let isUnMounted = false;

const NodesTransformer = (props) => {
  const {
    selectionsIds = [],
    theme,
    designLayer,
    dispatch,
    config: { useCloudimage },
  } = useStore();
  const editableTextId = useEditableTextId();
  const [selections, setSelections] = useState([]);

  const updateSelectionNodes = debounce(() => {
    if (isUnMounted) {
      return;
    }

    const newSelections =
      designLayer?.findOne && selectionsIds.length > 0
        ? selectionsIds
            .map((selectionId) => designLayer.findOne(`#${selectionId}`))
            .filter(Boolean)
        : [];

    setSelections(newSelections);
  }, 5);

  const changePointerIconToMove = () => {
    dispatch({
      type: CHANGE_POINTER_ICON,
      payload: {
        pointerCssIcon: POINTER_ICONS.MOVE,
      },
    });
  };

  const changePointerIconToDraw = () => {
    dispatch({
      type: CHANGE_POINTER_ICON,
      payload: {
        pointerCssIcon: POINTER_ICONS.DRAW,
      },
    });
  };

  const enableTextContentChangeOnDblClick = () => {
    if (selections.length === 1 && selections[0].name() === TOOLS_IDS.TEXT) {
      dispatch({
        type: ENABLE_TEXT_CONTENT_EDIT,
        payload: {
          textIdOfEditableContent: selections[0].id(),
        },
      });
    }
  };

  const getAnchors = (textAnnotations) => {
    if (!textAnnotations[0]) {
      return undefined;
    }

    const isAutoWidth = textAnnotations.some(
      ({ attrs: { autoWidth } }) => autoWidth,
    );
    const isAutoHeight = textAnnotations.some(
      ({ attrs: { autoHeight } }) => autoHeight,
    );

    return !isAutoWidth && !isAutoHeight
      ? undefined
      : [
          ...(isAutoWidth ? [] : ['middle-right', 'middle-left']),
          ...(isAutoHeight ? [] : ['top-center', 'bottom-center']),
        ];
  };

  useEffect(() => {
    isUnMounted = false;

    return () => {
      isUnMounted = true;
    };
  }, []);

  useEffect(() => {
    if (!isUnMounted) {
      updateSelectionNodes();
    }
  }, [selectionsIds]);

  const textAnnotations = selections.filter(
    ({ attrs: { name } = {} } = {}) => name === TOOLS_IDS.TEXT,
  );

  const enabledAnchors = useCloudimage
    ? ['top-left', 'bottom-left', 'top-right', 'bottom-right']
    : getAnchors(textAnnotations);

  if (editableTextId) {
    return null;
  }

  // ALT is used to center scaling
  // SHIFT is used to scaling with keeping ratio
  return (
    <Transformer
      id={NODES_TRANSFORMER_ID}
      centeredScaling={false}
      rotationSnaps={[0, 45, 90, 135, 180, 225, 270, 315]}
      nodes={selections}
      rotateAnchorOffset={50}
      anchorSize={14}
      anchorCornerRadius={7}
      padding={selections.length === 1 ? selections[0].attrs.padding ?? 1 : 1}
      ignoreStroke={false}
      anchorStroke={theme.palette['accent-primary']}
      anchorFill={theme.palette['access-primary']}
      anchorStrokeWidth={2}
      borderStroke={theme.palette['accent-primary']}
      borderStrokeWidth={2}
      borderDash={[4]}
      rotateEnabled={!useCloudimage}
      onMouseOver={changePointerIconToMove}
      onMouseLeave={changePointerIconToDraw}
      onDblClick={enableTextContentChangeOnDblClick}
      onDblTap={enableTextContentChangeOnDblClick}
      enabledAnchors={enabledAnchors}
      flipEnabled={!useCloudimage && !textAnnotations[0]}
      shouldOverdrawWholeArea
      data-testid="FIE-nodes-transformer"
      {...props}
    >
      <NodeControls {...props} />
    </Transformer>
  );
};

export default NodesTransformer;
