import faker from	"faker"
import _ from "lodash"

export default function() {
	return {
		notes: _.times(100, n => {
			return {
				id: n,
				content: faker.name.findName(),
			}
		})
	}
}