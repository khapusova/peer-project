import enTexts from '@translations/en.json';

export const getClaim = (typeOfEvent) => {
  if (typeOfEvent === 'follow') {
    return enTexts.claims.followed;
  }
  if (typeOfEvent === 'comment_hub') {
    return enTexts.claims.commentedInTheHub;
  }
  if (typeOfEvent === 'comment_journal') {
    return enTexts.commentedInTheJournal;
  }
  return enTexts.claims.startedANewLiveBoard;
};
