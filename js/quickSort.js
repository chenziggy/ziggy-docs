export function quickSort(arr, low, high) {
  if (low < high) {
    const pivot = partition(arr, low, high)
    quickSort(arr, low, pivot - 1)
    quickSort(arr, pivot + 1, high)
  }
}

function partition(arr, low, high) {
  const pivot = arr[low]
  while (low < high) {
    while (pivot <= arr[high] && low < high)
      high--
    arr[low] = arr[high]

    while (pivot >= arr[low] && low < high)
      low++
    arr[high] = arr[low]
    arr[low] = pivot
  }
  return low
}
