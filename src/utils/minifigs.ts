/**
 * Return the statistics from the MinifigsList (totalNumber, numberOwned and percentageOwned)
 * @param  {MinifigsList} minifigsList
 */
export const getStatistics = (minifigsList: Minifig[]) => {
  const totalNumber = minifigsList.length;
  const numberOwned = minifigsList.filter(
    (minifig) => minifig.possessed
  ).length;
  const percentageOwned = Math.round((numberOwned / totalNumber) * 10000) / 100;
  return { totalNumber, numberOwned, percentageOwned };
};
/**
 * Return the tags and character names alphabetically sorted lists from a MinifigsList
 * @param  {MinifigsList} minifigsList
 */
export const getTagsAndCharacNames = (minifigsList: Minifig[]) => {
  const tagsAndCharacNamesLists = minifigsList.reduce<
    Record<"tags" | "characNames", TagOrCharacName[]>
  >(
    (accumulator, currentMinifig) => {
      const { characterName, tags } = currentMinifig;

      const characNameIndex = accumulator.characNames.findIndex(
        (el) => el.name === characterName
      );
      // If it is a new character name we had it to the accumulator
      if (characNameIndex === -1) {
        accumulator.characNames.push({ name: characterName, amount: 1 });
      } else {
        // Or else we increment the amount of the existing one
        accumulator.characNames[characNameIndex].amount++;
      }

      if (tags && tags.length) {
        tags.forEach((tag) => {
          const tagIndex = accumulator.tags.findIndex((el) => el.name === tag);
          // If it is a new tag we had it to the accumulator
          if (tagIndex === -1) {
            accumulator.tags.push({ name: tag, amount: 1 });
          } else {
            // Or else we increment the amount of the existing one
            accumulator.tags[tagIndex].amount++;
          }
        });
      }

      return accumulator;
    },
    { tags: [], characNames: [] }
  );
  tagsAndCharacNamesLists.tags.sort((a, b) => (a.name > b.name ? 1 : -1));
  tagsAndCharacNamesLists.characNames.sort((a, b) =>
    a.name > b.name ? 1 : -1
  );
  return tagsAndCharacNamesLists;
};
