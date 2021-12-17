/** External Dependencies */
import styled from 'styled-components';

const StyledAppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  max-height: 100%;
  width: 100%;
  max-width: 100%;
  overflow: auto;
  position: relative;
`;

const StyledMainContent = styled.div`
  display: flex;
  align-items: flex-start;
  width: 100%;
  padding: 12px;
  box-sizing: border-box;
  height: calc(100% - 95px); // 95px = possible max height of topbar w/ spaces
  flex-grow: 1;

  [data-phone='true'] & {
    padding: 0;
  }
`;

const StyledCanvasAndTools = styled.div`
  height: 100%;
  width: calc(100% - 80px); // 80px = tabsbar's width.
  flex-grow: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
`;

const StyledPhoneToolsAndTabs = styled.div`
  width: 100%;
  flex-grow: 1;
`;

export {
  StyledAppWrapper,
  StyledMainContent,
  StyledCanvasAndTools,
  StyledPhoneToolsAndTabs,
};