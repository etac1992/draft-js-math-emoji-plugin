import React from 'react';

export default ({ decoratedText }) => <span dangerouslySetInnerHTML={{ __html: decoratedText }} />;
