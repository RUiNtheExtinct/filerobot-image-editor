/** External Dependencies */
import PropTypes from 'prop-types';
import { MenuItem } from '@scaleflex/ui/core';

/** Internal Dependencies */
import Styled from './Controls.styled';

const PLAYBACK_OPTIONS = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];

const PlaybackSpeedMenu = ({ value, anchor, onClose, onClick }) => {
  return (
    <Styled.Menu
      open={Boolean(anchor)}
      onClose={onClose}
      anchorEl={anchor}
      value={value}
      position="top-end"
      $isOpen={Boolean(anchor)}
    >
      {PLAYBACK_OPTIONS.map((option) => (
        <MenuItem key={option} onClick={onClick(option)}>
          {option}
        </MenuItem>
      ))}
    </Styled.Menu>
  );
};

PlaybackSpeedMenu.propTypes = {
  value: PropTypes.number,
  anchor: PropTypes.instanceOf(Object),
  onClose: PropTypes.func,
  onClick: PropTypes.func,
};

export default PlaybackSpeedMenu;