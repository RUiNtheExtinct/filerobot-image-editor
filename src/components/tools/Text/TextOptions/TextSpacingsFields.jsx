/** External Dependencies */
import React from 'react';
import PropTypes from 'prop-types';
import { Label } from '@scaleflex/ui/core';

/** Internal Dependencies */
import restrictNumber from 'utils/restrictNumber';
import { StyledSpacedOptionFields } from 'components/common/AnnotationOptions/AnnotationOptions.styled';
import Slider from 'components/common/Slider';

const MIN_VALUE = 0;
const MAX_VALUE = 100;
const SLIDER_STEP = 1;

const TextSpacingsFields = ({
  annotation: text,
  updateAnnotation: updateText,
}) => {
  const { letterSpacing, lineHeight } = text;

  const updateValue = (prop, val) => {
    updateText({ [prop]: restrictNumber(val, MIN_VALUE, MAX_VALUE) });
  };

  return (
    <StyledSpacedOptionFields>
      <Label>Letter Spacing</Label>
      <Slider
        annotation="px"
        isActive={Boolean(letterSpacing)}
        onChange={(val) => updateValue('letterSpacing', val)}
        value={letterSpacing}
        step={SLIDER_STEP}
      />
      <Label>Line height</Label>
      <Slider
        annotation="px"
        isActive={Boolean(lineHeight)}
        onChange={(val) => updateValue('lineHeight', val)}
        value={lineHeight}
        step={SLIDER_STEP}
      />
    </StyledSpacedOptionFields>
  );
};

TextSpacingsFields.propTypes = {
  annotation: PropTypes.instanceOf(Object).isRequired,
  updateAnnotation: PropTypes.func.isRequired,
};

export default TextSpacingsFields;