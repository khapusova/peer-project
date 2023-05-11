import enTexts from '@translations/en.json';

export const getShowMoreLayoutProps = (fullUserInfo) => [
  {
    id: 1,
    title: enTexts.claims.areasOfInterest,
    content: fullUserInfo.areasOfInterest || ''
  },
  {
    id: 2,
    title: enTexts.claims.position,
    content: fullUserInfo.position || ''
  },
  {
    id: 3,
    title: enTexts.claims.bio,
    content: fullUserInfo.bio || ''
  }
];
