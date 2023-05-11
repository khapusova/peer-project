const searchInArticles = (input, lst) => {
  const lowerCaseInput = input.toLowerCase();
  const matched = lst.filter(
    (el) =>
      el.name.toLowerCase().includes(lowerCaseInput) ||
      el.area.toLowerCase().includes(lowerCaseInput) ||
      el.year.toLowerCase().includes(lowerCaseInput)
  );
  return matched;
};
const searchInResearchers = (input, lst) => {
  const lowerCaseInput = input.toLowerCase();
  const matched = lst.filter(
    (el) =>
      el.name.toLowerCase().includes(lowerCaseInput) ||
      el.type.toLowerCase().includes(lowerCaseInput) ||
      el.topics.filter((topic) => topic.toLowerCase().includes(lowerCaseInput))
        .length !== 0 ||
      el.journal.toLowerCase().includes(lowerCaseInput) ||
      el.affiliation.toLowerCase().includes(lowerCaseInput) ||
      el.selected_publication.toLowerCase().includes(lowerCaseInput)
  );
  return matched;
};
const searchInJournals = (input, lst) => {
  const lowerCaseInput = input.toLowerCase();
  const matched = lst.filter(
    (el) =>
      el.name.toLowerCase().includes(lowerCaseInput) ||
      el.area.toLowerCase().includes(lowerCaseInput) ||
      el.year.toLowerCase().includes(lowerCaseInput) ||
      el.citescore.actual.toLowerCase().includes(lowerCaseInput)
  );
  return matched;
};
const searchInFunding = (input, lst) => {
  const lowerCaseInput = input.toLowerCase();
  const matched = lst.filter(
    (el) =>
      el.name.toLowerCase().includes(lowerCaseInput) ||
      el.area.toLowerCase().includes(lowerCaseInput) ||
      el.year.toLowerCase().includes(lowerCaseInput)
  );
  return matched;
};
const searchInHubs = (input, lst) => {
  const lowerCaseInput = input.toLowerCase();
  const matched = lst.filter(
    (el) =>
      el.interactionObject.toLowerCase().includes(lowerCaseInput) ||
      el.created_by.toLowerCase().includes(lowerCaseInput) ||
      el.areas.filter((area) => area.toLowerCase().includes(lowerCaseInput))
        .length !== 0
  );
  return matched;
};

export const searchAllData = (input, db) => {
  if (input.length === 0) {
    return db;
  }
  const articles = searchInArticles(input, db.articles);
  const journals = searchInJournals(input, db.journals);
  const hubs = searchInHubs(input, db.hubs);
  const researchers = searchInResearchers(input, db.researchers);
  const funding = searchInFunding(input, db.funding);
  return { articles, journals, hubs, researchers, funding };
};
