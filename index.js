const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

const posts = [
  {
    id: '1',
    title: 'Building the Blog',
    content: 'A simple Express and EJS blog with in-memory posts.',
    createdAt: new Date().toLocaleDateString(),
  },
  {
    id: '2',
    title: 'Why Capstones Matter',
    content: 'Capstone projects help you practice planning, building, and polishing an app.',
    createdAt: new Date().toLocaleDateString(),
  },
];

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('index', {
    posts,
    pageTitle: 'Capstone Blog',
  });
});

app.get('/posts', (req, res) => {
  res.redirect('/');
});

app.get('/posts/:id/edit', (req, res) => {
  const post = posts.find((item) => item.id === req.params.id);

  if (!post) {
    return res.redirect('/');
  }

  res.render('edit', {
    post,
    pageTitle: `Edit ${post.title}`,
  });
});

app.get('/posts/:id', (req, res) => {
  const post = posts.find((item) => item.id === req.params.id);

  if (!post) {
    return res.redirect('/');
  }

  res.render('post', {
    post,
    pageTitle: post.title,
  });
});

app.post('/posts', (req, res) => {
  const title = req.body.title?.trim();
  const content = req.body.content?.trim();

  if (!title || !content) {
    return res.redirect('/');
  }

  posts.unshift({
    id: Date.now().toString(),
    title,
    content,
    createdAt: new Date().toLocaleDateString(),
  });

  res.redirect('/');
});

app.post('/posts/:id/update', (req, res) => {
  const post = posts.find((item) => item.id === req.params.id);

  if (!post) {
    return res.redirect('/');
  }

  const title = req.body.title?.trim();
  const content = req.body.content?.trim();

  if (title && content) {
    post.title = title;
    post.content = content;
  }

  res.redirect('/');
});

app.post('/posts/:id/delete', (req, res) => {
  const postIndex = posts.findIndex((item) => item.id === req.params.id);

  if (postIndex !== -1) {
    posts.splice(postIndex, 1);
  }

  res.redirect('/');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


