const {exec} = require("child_process");
module.exports = {
	executeCommand : (command) => {
		exec(command, (err, stdout, stderr) => {
			if(err) {
				console.log(err);
				return;
			}
			console.log(`stdout: ${stdout}`);
			console.log(`stderr: ${stderr}`);
		})
	}
}