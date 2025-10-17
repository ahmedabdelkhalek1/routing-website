const express = require("express");
const fetch = require("node-fetch");
const app = express();

app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send(`
    <form method="GET" action="/browse">
      <input type="text" name="url" placeholder="Enter a website URL..." style="width:350px" />
      <button type="submit">Browse</button>
    </form>
  `);
});

app.get("/browse", async (req, res) => {
  const { url } = req.query;
  if (!url) return res.send("No URL provided.");

  try {
    // Fetch the requested page
    let r = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0" }
    });
    let html = await r.text();
    res.send(html); // Proxy the raw HTML
  } catch (e) {
    res.send(`Error: ${e.message}`);
  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Proxy running on port ${PORT}`));
