const express = require('express');
const app = express();
const request = require('request');
app.use(express.urlencoded({extended: true}));
app.set('view engine' , 'ejs');
const puppeteer = require('puppeteer');

app.get('/' , (req , res) => {
	res.render('food/food.ejs');
})

app.post('/users' , (req , res) => {
	var input = (req.body.name)
	var url = `https://www.google.com/search?q=${input}+calories`;
	(async () => {
	const browser = await puppeteer.launch({headless : true});
	const page = await browser.newPage();
	await page.goto(url);
	const grab = await page.evaluate(() => {
		const pg = document.querySelector("div[aria-live]");
		return pg.innerText;
	})
	console.log(grab);
	res.send(grab)
	await browser.close();
})();

})
app.listen(3000);