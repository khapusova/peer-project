import enTexts from '@translations/en.json';
import { ROUTES } from '@constants';
import { ReactComponent as Webinars } from '@svgs/buttons/webinars.svg';
import { ReactComponent as Hubs } from '@svgs/buttons/hubs.svg';
import { ReactComponent as PeerReviews } from '@svgs/buttons/peerReviews.svg';
import { ReactComponent as Favorites } from '@svgs/buttons/favorites.svg';
import { ReactComponent as Comments } from '@svgs/buttons/comments.svg';
import { ReactComponent as Publications } from '@svgs/buttons/publications.svg';

export const navigationButtonsProps = [
  {
    id: 1,
    title: enTexts.buttonNames.publications,
    component: Publications,
    route: ROUTES.publications
  },
  {
    id: 2,
    title: enTexts.buttonNames.comments,
    component: Comments,
    route: ROUTES.comments
  },
  {
    id: 3,
    title: enTexts.buttonNames.webinars,
    component: Webinars,
    route: ROUTES.webinars
  },
  {
    id: 4,
    title: enTexts.buttonNames.hubs,
    component: Hubs,
    route: ROUTES.hubs
  },
  {
    id: 5,
    title: enTexts.buttonNames.peerReviews,
    component: PeerReviews,
    route: ROUTES.peerReviews
  },
  {
    id: 6,
    title: enTexts.buttonNames.favorites,
    component: Favorites,
    route: ROUTES.favorites
  }
];
