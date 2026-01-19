// bottom right timer
export function getTime() {
  const date = new Date();
  const currentTime = date.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
  return currentTime;
}

// used for picking only the items we need from fetched array
function binarySearchItem(array, item) {
  let low = 0;
  let high = array.length - 1;
  let mid;

  while (high >= low) {
    mid = low + Math.floor((high - low) / 2);

    if (array[mid].name === item) {
      return array[mid];
    }

    if (array[mid].name > item) {
      high = mid - 1;
    } else {
      low = mid + 1;
    }
  }

  return -1;
}

// Items we display on the page + cost
export function getShopItems(array) {
  const shopItems = [
    { name: 'Beacon', cost: 64 },
    { name: 'Bow', cost: 8 },
    { name: 'Diamond Pickaxe', cost: 24 },
    { name: 'Diamond Sword', cost: 20 },
    { name: 'Elytra', cost: 48 },
    { name: 'Enchanted Book', cost: 16 },
    { name: 'Enchanted Golden Apple', cost: 64 },
    { name: 'Golden Apple', cost: 12 },
    { name: 'Golden Carrot', cost: 4 },
    { name: 'Nether Star', cost: 64 },
    { name: 'Netherite Sword', cost: 64 },
    { name: 'Potion of Invisibility', cost: 10 },
    { name: 'Shulker Box', cost: 20 },
    { name: 'Totem of Undying', cost: 32 },
    { name: 'Trident', cost: 28 },
  ];

  const items = [];

  shopItems.forEach((item) => {
    items.push({
      ...binarySearchItem(array, item.name),
      cost: item.cost,
    });
  });

  // remove the "namespacedId" and replace it with "id"
  const result = items.map(({ namespacedId, ...rest }) => {
    return {
      ...rest,
      id: namespacedId,
    };
  });

  return result;
}

export function summarizeDescription(string) {
  return string.split('.')[0];
}

export function clamp(value) {
  return Math.min(100, Math.max(0, value));
}
