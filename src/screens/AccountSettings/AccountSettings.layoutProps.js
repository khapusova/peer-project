import enTexts from '@translations/en.json';

export const buttonsProps = (
  editProfile,
  clearCache,
  logout,
  changePassword,
  changeEmail
) => [
  {
    id: 1,
    title: enTexts.claims.editProfile,
    handleOnClick: editProfile
  },
  {
    id: 2,
    title: enTexts.claims.clearCache,
    handleOnClick: clearCache
  },
  {
    id: 3,
    title: enTexts.claims.logOut,
    handleOnClick: logout
  },
  {
    id: 4,
    title: enTexts.claims.changePassword,
    handleOnClick: changePassword
  },
  {
    id: 5,
    title: enTexts.claims.changeEmail,
    handleOnClick: changeEmail
  }
];
