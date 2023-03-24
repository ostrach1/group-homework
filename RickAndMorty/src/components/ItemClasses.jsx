function ItemClasses({ endpointName }) {
  const character = [
    "id",
    "name",
    "status",
    "species",
    "gender",
    "moreFunction",
  ];
  const locations = ["id", "Name", "Type", "Dimensions", "moreFunction"];
  const episodes = ["id", "name", "Air Date", "Episode", "moreFunction"];
  if (endpointName === "character") {
    return character;
  } else if (endpointName === "location") {
    return locations;
  } else {
    return episodes;
  }
}

export default ItemClasses;
