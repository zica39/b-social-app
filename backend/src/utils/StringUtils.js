const faker = require('faker');

function generateRandomNumber() {
	return (Math.floor(Math.random() * 10000000) + 10000000).toString().substr(1);
}

module.exports = {
	generateRandomPassword() {
		return Math.random().toString(36).slice(-8);
	},
	generateRandomUsername() {
		return faker.internet.userName() + "_" + generateRandomNumber()
	},
	b2a(a) {
		let c, d, e, f, g, h, i, j, o, b = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", k = 0,
			l = 0, m = "", n = [];
		if (!a) return a;
		do c = a.charCodeAt(k++), d = a.charCodeAt(k++), e = a.charCodeAt(k++), j = c << 16 | d << 8 | e,
			f = 63 & j >> 18, g = 63 & j >> 12, h = 63 & j >> 6, i = 63 & j, n[l++] = b.charAt(f) + b.charAt(g) + b.charAt(h) + b.charAt(i); while (k < a.length);
		return m = n.join(""), o = a.length % 3, (o ? m.slice(0, o - 3) : m) + "===".slice(o || 3);
	},
	a2b(a) {
		let b, c, d, e = {}, f = 0, g = 0, h = "", i = String.fromCharCode, j = a.length;
		for (b = 0; 64 > b; b++) e["ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(b)] = b;
		for (c = 0; j > c; c++) for (b = e[a.charAt(c)], f = (f << 6) + b, g += 6; g >= 8;) ((d = 255 & f >>> (g -= 8)) || j - 2 > c) && (h += i(d));
		return h;
	},
	async replaceBaseUrlWithWildcard(url, wildcard, replacement) {
		return url.replace(wildcard, replacement);
	},
	async extractIpAddressFromHeader(header) {
		return header ?  header.split(',')[0] : null;
	}
}