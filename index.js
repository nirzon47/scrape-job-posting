import axios from 'axios'
import { load } from 'cheerio'
import fs from 'fs'
import path from 'path'

const __dirname = path.resolve()

const products = []

const getData = async () => {
	const page = 0

	// if (page > 100) {
	// 	return
	// }

	try {
		const { data } = await axios.get(
			`https://nirzon47.github.io/scrape-job-posting/`,
			{
				headers: {
					'Content-Type': 'text/html',
					'User-Agent':
						'Mozilla/5.0 (iPad; CPU OS 12_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148',
				},
			}
		)

		fs.writeFileSync(path.join(__dirname, 'console.log'), data)
	} catch (error) {
		console.error(error)
	}

	// const $ = load(data)
}

getData()
