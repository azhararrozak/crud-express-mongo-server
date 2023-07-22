const express = require("express");

const router = express.Router();

const Song = require("../models/Songs");

router.post("/song", (req, res) => {
  const song = new Song({
    title: req.body.title,
    artists: req.body.artists,
    album: req.body.album,
  });

  try {
    const saveSong = song.save();
    res.status(200).json(saveSong);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

router.get("/getAll", async (req, res) => {
  try {
    const songs = await Song.find();
    res.status(200).json(songs);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

router.get("/song/:id", async (req, res) => {
  try {
    const songs = await Song.findById(req.params.id);
    res.status(200).json(songs);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

router.put("/song/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { title, artists, album } = req.body; // Destructure properti yang akan diupdate dari req.body

    // Pastikan untuk memeriksa jika salah satu properti ada sebelum membuat objek song baru
    const updateData = {};
    if (title) updateData.title = title;
    if (artists) updateData.artists = artists;
    if (album) updateData.album = album;

    //const title = req.body;
    const options = { new: true };

    const result = await Song.findByIdAndUpdate(id, updateData, options);
    res.send(result);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

router.delete("/song/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const deleteSong = await Song.findByIdAndDelete(id);
        res.send(`success deleted ${deleteSong}`)
    } catch (e) {
        res.status(400).json({ message: e.message });
    }
})

module.exports = router;
