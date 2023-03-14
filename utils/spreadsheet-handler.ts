import { GoogleSpreadsheet } from "google-spreadsheet";

import { counter, counterToSortedList } from "./helpers";

const codeToHostel = {
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
};

export const sheetTitleToId = {
	futsal: "0",
	"tug-of-war": "302395988",
	badminton: "1972649252",
	"table-tennis": "170322891",
	basketball: "1416124114",
	volleyball: "1156816434",
	cricket: "1597101565",
	bgmi: "54114902",
	valorant: "1356079247",
	chess: "392768272",
	carrom: "597517947",
	powerlifting: "403514136",
	fifa: "1638944088",
	"strong-woman": "428866073",
};

const credentials = {
	type: "service_account",
	project_id: "wolfame-2023",
	private_key_id: "b31e9dd2a33035389c3ecc227c9d48e69dc5103a",
	private_key:
		"-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC2M+iqvIRO0cNB\n+aA/pb+JIWqBW6NcjpZXeW8NIKBM03JUelfADrVa2KOKUeLgasVLptvu5tobO1MU\nsL1hMTJVeSHpdDgbeIqWqPRlBlgL+Z3fAW/hfWS1jVtDmgSw2CDxXma+qAxc/j2X\nwuMAnkvHBqghmwX8+NHn7HtZI+3FMI/DtB88yZvybl1dPHuYCEf+uNsjRqMY6dIZ\nQIgaIntOvtsZWLGcwokBKJtN0J2gZv0CbIlsswYLjUg7PFxC941AYnsnSlBMoi+w\neGZjwRjhrQmcOLJckJa7Y/N7V4i49PA9T6StcnWg7LfROOE0WaI+HUM6xLUp/mh9\nV1+RBa45AgMBAAECggEAAJGqQ648XjVQKMqWHNzFpltRBn+6GOCRHkt7dKJfcx34\nmMRGYIvV4Sdqtf80zYKdLx6hnTNiBv0TxgLEn02/XH5OWXj1cTsvzkdPdr6i/mvp\nzvfQLkzCncEylxl0s6Cufv0j0QCcA/D/UZQC5XjualFeVmHc45dbVcq/791UMW4e\nCKUvtWMpovYePZLJPjIFT6rEU3OWa/7SLOmiO/wzzTZ+zgDDYxclE6rCaqB+l0zx\nNb8V6SyJDfu0ehQHwuouq+kzsK3Y8d2sZ0lQIEH1bXcIw4I7xKri3cb2rxhcbeKp\nQBT63izgntQmmKtaEqRTFgB15iYRck/inTwZkJxGSQKBgQD1hlzcx6e9bb1XTq2n\na5oZEcdEsGXcIaSxQpoaVDExAweluBFzx1Byo6hlMA6hvrcl2OQ0sR7h72pa20pz\nHkKNDzSbTtQ1AQlmOVSJ63EWHhJibz/gs8YfDqS8F+6YlJsPKBCpVy1mzKGKilmU\ndIy2jmxOkCIcLmWwMcJXpXl66wKBgQC9+fBAEnqlqNrhwI6kP7JYLQ3yvF4EXEhA\nBmt068ExLVMfE28yV7Lrp+utS1C4mA5DieR8byNIJtxOYCT6TnilLtX7gyaGY9b9\nogW+J1ISfqYKj8oxQxLDj8Yk+DNUu5YqXlbPXUJlFgoFDxE86dTEFf3L4ODPiwZ3\nhQ9xxI5qawKBgA+GX3jWZxTjS4Wpw/FCLIxJQ4BkZwx0VCWhQH1JtZKTznf8G55m\ni/+zuYIsd8BiftI11LhAOuOub9su4pZE45Bn1bu8UE7Jsf50wZO2/3+WhzMSNcfP\nlkeAdYovOTcMroFW1zbd/FDzv4MzHFb2x68DcnXFR2LgzC1H+DHylKvhAoGBAKy1\nWJEnO5D3HWY25Ha14bD/5LpUPTTBoH10WKSG36+RgQuzY1flGqfalQuKeOwYcH8+\nERZ/AxhJG+e0yGk2hb/GAIsTBCcRBRa4AXiJzrc5pEHdzvdR/vEC+CQL8L6Le00x\nTsJeCkpT6vAGbqlt+xv40i5TVo3X2h02PoAzLTXZAoGBAJihXJMGHwd5CHSNotgO\n4nyzU2cuqJH6aat8dQHOw+zw8nX/Az94fFNVmUG4ZCTO0uvBiJJCsaIuZ4OB4fz+\nZrPrJvzea7GLkYxCk2DmJvQecwRGUk8dwAzDcDrSk+Tnb3Pw5wh+oasPvOWYdz8U\n9ozN8dzadgngJOl5hh8P9rgn\n-----END PRIVATE KEY-----\n",
	client_email: "wolf-1@wolfame-2023.iam.gserviceaccount.com",
	client_id: "110755022465030284075",
	auth_uri: "https://accounts.google.com/o/oauth2/auth",
	token_uri: "https://oauth2.googleapis.com/token",
	auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
	client_x509_cert_url:
		"https://www.googleapis.com/robot/v1/metadata/x509/wolf-1%40wolfame-2023.iam.gserviceaccount.com",
	spreadsheet_id: "1j0Uf_tCF1HCKa8X9ia-ryKgpE20S9OdFx-r3Mm54psQ",
};

export default (async () => {
	const spreadsheet = new GoogleSpreadsheet(credentials.spreadsheet_id);

	await spreadsheet.useServiceAccountAuth(credentials);
	await spreadsheet.loadInfo();

	async function getSortedList(event: string) {
		const eventSheet = spreadsheet.sheetsById[sheetTitleToId[event]];
		const sheetRows = await eventSheet.getRows();

		const winners: string[] = [];
		sheetRows.forEach((row) => winners.push(codeToHostel[row.WINNER]));

		return counterToSortedList(counter(winners));
	}

	return {
		spreadsheet,
		getSortedList,
	};
})();
