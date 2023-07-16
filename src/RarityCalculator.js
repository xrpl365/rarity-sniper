export function RarityCalculator(nftCollection) {
  // Get the collection count and reserved values
  const collectionCount = nftCollection.length;
  const reservedValues = ['No Attribute', 'None', 'Nothing', ''];

  // Calculate rarity score for each attribute value and count the traits for each NFT and add to traits array.
  const rarityScores = {};
  for (const nft of nftCollection) {
    const filteredAttributes = [];
    for (const { trait_type: key, value } of nft.attributes) {
      if (!reservedValues.includes(value)) {
        const traitIndex = `${key}.${value}`;
        rarityScores[traitIndex] = (rarityScores[traitIndex] || 0) + 1;
        filteredAttributes.push({ key, value });
      }
    }

    // Only keep the filtered attributes, getting rid of reserved values
    nft.attributes = filteredAttributes;

    // Add a trait count to the attributes array
    const traitValue = `traits-${nft.attributes.length}`;
    rarityScores[traitValue] = (rarityScores[traitValue] || 0) + 1;
  }

  // Calculate the rarity score for each NFT
  for (const nft of nftCollection) {
    let rarityScore = 0;
    const traitValues = [];
    for (const { key, value } of nft.attributes) {
      const trait = key + '.' + value;
      const traitScore = collectionCount / rarityScores[trait];
      const traitPercentage = (100 / collectionCount) * rarityScores[trait];
      rarityScore += traitScore;

      traitValues.push(`${trait} - ${traitScore.toFixed(2)} - ${traitPercentage.toFixed(2)}%`);
    }

    // Apply a score for trait count
    const traitCount = nft.attributes.length;
    const traitCountScore = collectionCount / rarityScores['traits-' + traitCount];
    const trait = 'traits-' + traitCount;
    const traitPercentage = (100 / collectionCount) * rarityScores[trait];
    traitValues.push(
      `${traitCount} traits - ${traitCountScore.toFixed(2)} - ${traitPercentage.toFixed(2)}%`
    );
    rarityScore += traitCountScore;

    // Apply score to the NFT
    nft.rarityScore = rarityScore;
    nft.traitValues = traitValues;
  }

  // Sort NFTs by rarity score in descending order
  const sortedNFTs = nftCollection.sort((a, b) => b.rarityScore - a.rarityScore);

  // Create output for the rankings
  let rankings = [];
  for (let i = 0; i < sortedNFTs.length; i++) {
    const nft = sortedNFTs[i];
    const nftRarity = {
      name: nft.name,
      rarityScore: nft.rarityScore.toFixed(2),
      rank: i + 1,
      traits: [...nft.traitValues],
    };
    rankings.push(nftRarity);
  }

  return rankings;
}
