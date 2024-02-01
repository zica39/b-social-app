const moment = require('moment');
module.exports = {
	differenceInMonths(fromDate, toDate) {
		return moment(new Date(toDate)).diff(new Date(fromDate), 'months', true);
	}
}