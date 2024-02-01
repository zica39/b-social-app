module.exports = {
	toDTOList(array, DtoClass) {
		if(array.length > 0)
			return array.map(element => new DtoClass(element));
		return {};
	},
	toDTO(model, DtoClass) {
		return new DtoClass(model);
	}
}