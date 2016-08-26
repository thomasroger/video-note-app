module.exports = {
	root: (req,res) => {
		res.render('home.html', {root:'/public/views'});
	}
}