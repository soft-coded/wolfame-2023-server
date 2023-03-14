export function counter(arr: string[]) {
	const count = {};

	arr.forEach((val) => {
		if (count[val] != null) {
			count[val] += 1;
		} else {
			count[val] = 1;
		}
	});

	return count;
}

export function counterToSortedList(counter: { [x: string]: number }) {
	const listOfLists: [string, number][] = [];

	for (let hostel in counter) {
		listOfLists.push([hostel, counter[hostel]]);
	}

	listOfLists.sort((a, b) => b[1] - a[1]);
	return listOfLists;
}
