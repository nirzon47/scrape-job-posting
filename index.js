import axios from 'axios'
import { load } from 'cheerio'
import { utils, writeFile } from 'xlsx'

const products = []

/**
 * Asynchronous function to retrieve data from a specified URL, parse the HTML content, extract job postings, and write the data to an Excel file.
 *
 * @return {Promise} The retrieved data from the specified URL, parsed and written to an Excel file.
 */
const getData = async () => {
	try {
		// Getting data from response object sent by axios
		const { data } = await axios.get(
			`https://nirzon47.github.io/scrape-job-posting/`,
			{
				headers: {
					// Setting content type as html so cheerio can parse it
					'Content-Type': 'text/html',
					// User agent for scraping
					'User-Agent':
						'Mozilla/5.0 (iPad; CPU OS 12_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148',
				},
			}
		)

		// Parsing data using cheerio
		const $ = load(data)

		// Extracting job postings
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

		const workbook = utils.book_new() // Creating a new workbook
		const worksheet = utils.json_to_sheet(products) // Creating a new worksheet with the extracted data
		utils.book_append_sheet(workbook, worksheet, 'Sheet 1') // Adding the worksheet to the workbook
		writeFile(workbook, 'jobs.xlsx') // Writing the workbook to an Excel file
	} catch (error) {
		console.error(error)
	}
}

getData()
