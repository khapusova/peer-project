import React from 'react';
import enTexts from '@translations/en.json';
import { ReactComponent as AgricultureAndForestry } from '@svgs/icons/agricultureAndForestry.svg';
import { ReactComponent as Biology } from '@svgs/icons/biology.svg';
import { ReactComponent as Chemistry } from '@svgs/icons/chemistry.svg';
import { ReactComponent as ComputerScience } from '@svgs/icons/computerScience.svg';
import { ReactComponent as Ecology } from '@svgs/icons/ecology.svg';
import { ReactComponent as Economics } from '@svgs/icons/economics.svg';
import { ReactComponent as Engineering } from '@svgs/icons/engineering.svg';
import { ReactComponent as Geoscience } from '@svgs/icons/geoscience.svg';
import { ReactComponent as Humanities } from '@svgs/icons/humanities.svg';
import { ReactComponent as Law } from '@svgs/icons/law.svg';
import { ReactComponent as Management } from '@svgs/icons/management.svg';
import { ReactComponent as MaterialScience } from '@svgs/icons/materialScience.svg';
import { ReactComponent as Mathematics } from '@svgs/icons/mathematics.svg';
import { ReactComponent as Medicine } from '@svgs/icons/medicine.svg';
import { ReactComponent as Pedagogy } from '@svgs/icons/pedagogy.svg';
import { ReactComponent as PhysicsAndAstrophysics } from '@svgs/icons/physicsAndAstrophysics.svg';
import { ReactComponent as Psychology } from '@svgs/icons/psychology.svg';
import { ReactComponent as OtherFields } from '@svgs/icons/otherFields.svg';
import { ReactComponent as Articles } from '@svgs/icons/articles.svg';
import { ReactComponent as Journals } from '@svgs/icons/journals.svg';
import { ReactComponent as Funding } from '@svgs/icons/funding.svg';
import { ReactComponent as Webinars } from '@svgs/icons/webinars.svg';

export const exploringProps = [
  { id: 1, title: enTexts.claims.articles, icon: <Articles /> },
  { id: 2, title: enTexts.claims.journals, icon: <Journals /> },
  { id: 3, title: enTexts.claims.funding, icon: <Funding /> },
  { id: 4, title: enTexts.claims.webinars, icon: <Webinars /> }
];

export const areasProps = [
  {
    id: 1,
    title: enTexts.claims.agricultureAndForestry,
    icon: <AgricultureAndForestry />
  },
  { id: 2, title: enTexts.claims.biology, icon: <Biology /> },
  { id: 3, title: enTexts.claims.chemistry, icon: <Chemistry /> },
  { id: 4, title: enTexts.claims.computerScience, icon: <ComputerScience /> },
  { id: 5, title: enTexts.claims.ecology, icon: <Ecology /> },
  { id: 6, title: enTexts.claims.economics, icon: <Economics /> },
  { id: 7, title: enTexts.claims.engineering, icon: <Engineering /> },
  { id: 8, title: enTexts.claims.geoscience, icon: <Geoscience /> },
  { id: 9, title: enTexts.claims.humanities, icon: <Humanities /> },
  { id: 10, title: enTexts.claims.law, icon: <Law /> },
  { id: 11, title: enTexts.claims.management, icon: <Management /> },
  { id: 12, title: enTexts.claims.materialScience, icon: <MaterialScience /> },
  { id: 13, title: enTexts.claims.mathematics, icon: <Mathematics /> },
  { id: 14, title: enTexts.claims.medicine, icon: <Medicine /> },
  { id: 15, title: enTexts.claims.pedagogy, icon: <Pedagogy /> },
  {
    id: 16,
    title: enTexts.claims.physicsAndAstrophysics,
    icon: <PhysicsAndAstrophysics />
  },
  { id: 17, title: enTexts.claims.psychology, icon: <Psychology /> },
  { id: 18, title: enTexts.claims.otherFields, icon: <OtherFields /> }
];

export const tabsProps = [
  { title: 'What are your areas of interest?', id: 1 },
  { title: 'Which journals would you like to follow?', id: 2 },
  { title: 'Select funding agencies relevant to you', id: 3 },
  { title: 'What are you interested in exploring?', id: 4 }
];
