export const codeToHostel = {
	wolf: "Wolfenden Hall",
	rich: "Richardson Hall",
	sen: "Sen Hall",
	mac: "MacDonald Hall",
	sengupta: "Sengupta Hall",
	lt: "Lt. Williams Hall",
	pandya: "Pandya Hall",
	nivedita: "Nivedita Hall",
	h7: "Hostel 7",
	h8: "Hostel 8",
	h9: "Hostel 9",
	h10: "Hostel 10",
	h11: "Hostel 11",
	h13: "PG Hostel 13",
	h14: "Hostel 14",
	h15: "Hostel 15",
	h16: "Hostel 16",
};

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

export function getFullTeamName(code: string, aOrB = false) {
	const splitCode = code.split("-");
	let teamName = codeToHostel[splitCode[0]];

	if (aOrB) {
		teamName += ` - Team ${splitCode[1].toUpperCase()}`;
	}

	return teamName;
}

export function getFullPlayerName(code: string, name: string) {
	name = name.toLowerCase();
	const splitName = name.split(" ");
	// capitalise the name
	for (let i = 0; i < splitName.length; i++) {
		splitName[i] = splitName[i][0]?.toUpperCase() + splitName[i]?.slice(1);
	}

	name = splitName.join(" ");
	name += ` (${codeToHostel[code]})`;

	return name;
}
