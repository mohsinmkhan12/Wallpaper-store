const express = require("express");
const app = express();
const path = require("path");
const axios = require('axios');

const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("index");
});



app.get('/wallpapers', async (req, res) => {
    const query = req.query.query; // Get the query parameter from the search form

    let images = [];

    try {
        const response = await axios.get(`https://hoshi-api-f62i.onrender.com/api/wallpaper?query=${query}`);
        images = response.data.images; // Extract the images array from the API response
    } catch (error) {
      console.error(error); // Handle any errors during the API request
}

     // Render the wallpapers.ejs with the search query and fetched images
    res.render('wallpapers', { query, images });
})



app.listen(PORT, () => {
  console.log(`Server is Listening at port ${PORT}`);
});
