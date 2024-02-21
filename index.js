import axios from 'axios'
import { load } from 'cheerio'
import { utils, writeFile } from 'xlsx'

const products = []

const getData = async () => {
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

		const $ = load(data)
		const cards = $('.job-card').each((index, element) => {
			const product = {
				job_title: $(element).find('.job-title').text(),
				company_name: $(element).find('.company-name').text(),
				location: $(element).find('.location').text(),
				job_type: $(element).find('.job-type').text(),
				posted_date: $(element).find('.date').text(),
				description: $(element).find('.job-description').text(),
			}

			products.push(product)
		})

		const workbook = utils.book_new()
		const worksheet = utils.json_to_sheet(products)
		utils.book_append_sheet(workbook, worksheet, 'Sheet 1')
		writeFile(workbook, 'jobs.xlsx')
	} catch (error) {
		console.error(error)
	}
}

getData()
