export function getTime() {
  const date = new Date();
  const currentTime = date.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
  return currentTime;
}

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

export function getShopItems(array) {
  const shopItemIds = [
    'Beacon',
    'Bow',
    'Diamond Pickaxe',
    'Diamond Sword',
    'Elytra',
    'Enchanted Book',
    'Enchanted Golden Apple',
    'Golden Apple',
    'Golden Carrot',
    'Nether Star',
    'Netherite Sword',
    'Potion of Invisibility',
    'Shulker Box',
    'Totem of Undying',
    'Trident',
  ];

  const result = [];

  shopItemIds.forEach((item) => {
    result.push(binarySearchItem(array, item));
  });

  return result;
}

export function summarizeDescription(string) {
  return string.split('.')[0];
}
