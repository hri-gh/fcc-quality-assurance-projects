/*
*       Complete the API routing below
*/
'use strict';

const BookModel = require('../models/book.model.js');

module.exports = function (app) {

  app.route('/api/books')
    .get(async function (req, res) {
      //response will be array of book objects
      //json res format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]

      try {
        const books = await BookModel.find({}, 'comments title _id commentcount').exec();
        res.json(books);
      } catch (err) {
        res.status(500).send('Server error');
      }
    })

    .post(async function (req, res) {
      let title = req.body.title;
      //response will contain new book object including atleast _id and title

      if (!title) {
        return res.send('missing required field title');
      }

      try {
        const newBook = new BookModel({ title });
        await newBook.save();
        res.json({ _id: newBook._id, title: newBook.title });
      } catch (err) {
        res.status(500).send('Server error');
      }

    })

    .delete(async function (req, res) {
      //if successful response will be 'complete delete successful'

      try {
        await BookModel.deleteMany({});
        res.send('complete delete successful');
      } catch (err) {
        res.status(500).send('Server error');
      }
    });



  app.route('/api/books/:id')
    .get(async function (req, res) {
      let bookid = req.params.id;
      //json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}

      try {
        const book = await BookModel.findById(bookid).exec();

        if (!book) {
          return res.send('no book exists');
        }

        res.json({ _id: book._id, title: book.title, comments: book.comments, commentcount: book.commentcount });
      } catch (err) {
        res.status(500).send('Server error');
      }
    })

    .post(async function (req, res) {
      let bookid = req.params.id;
      let comment = req.body.comment;
      //json res format same as .get

      if (!comment) {
        return res.send('missing required field comment');
      }

      try {
        const book = await BookModel.findById(bookid).exec();

        if (!book) {
          return res.send('no book exists');
        }

        book.comments.push(comment);
        book.commentcount = book.comments.length;
        await book.save();

        res.json({ _id: book._id, title: book.title, comments: book.comments, commentcount: book.commentcount });
      } catch (err) {
        res.status(500).send('Server error');
      }
    })

    .delete(async function (req, res) {
      let bookid = req.params.id;
      //if successful response will be 'delete successful'

      try {
        const book = await BookModel.findByIdAndDelete(bookid).exec();
        if (!book) {
          return res.send('no book exists');
        }
        res.send('delete successful');
      } catch (err) {
        res.status(500).send('Server error');
      }
    });
};
