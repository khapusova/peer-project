import React from 'react';
import { ReactComponent as AppleLogo } from '@svgs/logos/apple.svg';
import { ReactComponent as GoogleLogo } from '@svgs/logos/google.svg';
import { ReactComponent as FacebookLogo } from '@svgs/logos/facebook.svg';
import { ReactComponent as OrcidLogo } from '@svgs/logos/orcid.svg';

export const logo = (name) => {
  if (name === 'googleLogin') {
    return <GoogleLogo />;
  }
  if (name === 'facebookLogin') {
    return <FacebookLogo />;
  }
  if (name === 'orcidLogin') {
    return <OrcidLogo />;
  }
  return <AppleLogo />;
};
