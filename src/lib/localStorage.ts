/*
To use when the page loads, put this in your code:

import { onMount } from 'svelte';
onMount(() => {
    {dataVariable} = getData({dataKey});
});

with "data" being your variable, and "idk" being the data key
*/

export function getData(key: string) {
  const savedData = localStorage.getItem(key);
  if (savedData) {
    return JSON.parse(savedData);
  } else {
    return [];
  }
}

export function setData(key: string, newData: Array<any>) {
  localStorage.setItem(key, JSON.stringify(newData));
}

export function clearData() {
  localStorage.clear();
}

// Check if there's any data saved in localStorage when the component mounts

// Update localStorage whenever the data changes
