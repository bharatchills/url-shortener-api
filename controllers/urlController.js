const prisma = require('../models/urlModel');
const shortid = require('shortid');

exports.createShortUrl = async (req, res) => {
  let { longUrl } = req.body;
  if (!longUrl) {
    res.status(400).json({ error: 'Bruh URL toh daal' });
    return;
  }
  if (!longUrl.startsWith('http://') && !longUrl.startsWith('https://')) {
    longUrl = 'http://' + longUrl;
  }
  const shortUrl = shortid.generate();
  
  try {
    const newUrl = await prisma.url.create({
      data: { longUrl, shortUrl },
    });

    res.status(201).json(newUrl);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while creating the short URL.' });
  }
};

exports.getLongUrl = async (req, res) => {
  const { shortUrl } = req.params;

  try {
    const url = await prisma.url.findUnique({ where: { shortUrl } });

    if (!url) {
      res.status(404).json({ error: 'Bruh correct url daal' });
    } else {
      res.redirect(url.longUrl);
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while retrieving the long URL.' });
  }
};
