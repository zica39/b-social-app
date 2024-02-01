module.exports = {
	sendResponse(res,data = null, status) {
		res.status(status).json(data);
	}
}