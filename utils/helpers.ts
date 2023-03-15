/* export const codeToHostel = {
	"wolf-a": "Wolfenden Hall",
	"wolf-b": "Wolfenden Hall",
	"rich-a": "Richardson Hall",
	"rich-b": "Richardson Hall",
	"sen-a": "Sen Hall",
	"sen-b": "Sen Hall",
	"mac-a": "MacDonald Hall",
	"mac-b": "MacDonald Hall",
	"sengupta-a": "Sengupta Hall",
	"sengupta-b": "Sengupta Hall",
	"lt-a": "Lt. Williams Hall",
	"lt-b": "Lt. Williams Hall",
	"pandya-a": "Pandya Hall",
	"pandya-b": "Pandya Hall",
	"nivedita-a": "Nivedita Hall",
	"nivedita-b": "Nivedita Hall",
	"h7-a": "Hostel 7",
	"h7-b": "Hostel 7",
	"h8-a": "Hostel 8",
	"h8-b": "Hostel 8",
	"h9-a": "Hostel 9",
	"h9-b": "Hostel 9",
	"h10-a": "Hostel 10",
	"h10-b": "Hostel 10",
	"h11-a": "Hostel 11",
	"h11-b": "Hostel 11",
	"h13-a": "PG Hostel 13",
	"h13-b": "PG Hostel 13",
	"h14-a": "Hostel 14",
	"h14-b": "Hostel 14",
	"h15-a": "Hostel 15",
	"h15-b": "Hostel 15",
	"h16-a": "Hostel 16",
	"h16-b": "Hostel 16",
}; */
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
