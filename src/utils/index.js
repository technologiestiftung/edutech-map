import fetch from "unfetch";
import feature from "topojson-client/src/feature";

export async function fetchJSON(url) {
	return fetch(url).then((res) => res.json());
}

export async function fetchTopoJSON(url) {
	return new Promise(async (resolve, reject) => {
		try {
			const topoData = await fetchJSON(url);
			const data = feature(
				topoData,
				topoData.objects[Object.keys(topoData.objects)[0]],
			);
			return resolve(data);
		} catch (err) {
			return reject(err);
		}
	});
}

export const opacityFromState = (state) => {
	switch (state) {
		case "entering":
			return 1;
		case "entered":
			return 1;
		case "exiting":
			return 0;
		case "exited":
			return 0;
		default:
			return 0;
	}
};

export const isMobile =
	navigator.userAgent.match(/Android/i) ||
	navigator.userAgent.match(/webOS/i) ||
	navigator.userAgent.match(/iPhone/i) ||
	navigator.userAgent.match(/iPad/i) ||
	navigator.userAgent.match(/iPod/i);

export function noop() {}

export default {
	isMobile,
	fetchJSON,
	opacityFromState,
	fetchTopoJSON,
	noop,
};
