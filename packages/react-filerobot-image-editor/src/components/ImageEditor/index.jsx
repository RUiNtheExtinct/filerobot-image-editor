/** External Dependencies */
import React, { memo } from 'react';

/** Internal Dependencies */
import App from 'components/App';
import AssemblyPointProviders from 'components/Providers';

const ImageEditor = (props) => (
  <AssemblyPointProviders {...props}>
    <App />
  </AssemblyPointProviders>
);

export default memo(ImageEditor);
