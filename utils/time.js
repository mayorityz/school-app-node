export const isToday = (date) => {
  const today = new Date();
  const sameDate = today.getDate() === date.getDate();
  const diffIsNotUpToADay = today - date <= 1 * 24 * 60 * 60 * 1000;
  // sameDate only checks that it's the same Date and that is not enough
  // e.g 24th of Feb and 24th of Dec is the same Date (24)
  // diffIsNotUpToADay is not enough either
  // because 2 different days can have less than a day between them
  // e.g 11pm on 24th and 2am on 25th
  return sameDate && diffIsNotUpToADay;
};
