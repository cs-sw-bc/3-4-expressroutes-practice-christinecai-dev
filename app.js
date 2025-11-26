import express from "express";
import insta from "./data/insta.json" with {type:'json'}

const app = express();
const PORT = 3000;

/* ---------------------------------------------
   SERVER LISTEN
---------------------------------------------- */
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

app.get('/insta/users',(req,res)=>{
  res.json(insta.users);
});

app.get('/insta/users/:id',(req,res)=>{
  const searchId = Number(req.params.id);
  const result = insta.users.find((user)=>user.id === searchId);
  if (result){
    res.json(result);
  }else{
    res.status(404).send("The user you're looking for does not exist");
  }
});

// Add filtering to /posts using:

// ?hashtag=travel
// Return posts containing the hashtag.

// app.get('/insta/posts',(req,res)=>{
//   let posts = insta.posts;

//   if (req.query.hashtag){
//     posts = posts.filter(post => post.hashtags.includes(req.query.hashtag));
//   }
//   res.json(posts);
// });

// ?minLikes=20
// Return posts with at least 20 likes.

// app.get('/insta/posts', (req,res)=>{

//   let posts = insta.posts;

//   if (req.query.minLikes){
//     const min = Number(req.query.minLikes);
//     posts = posts.filter(p=>p.likes >= min);
//   }
//   res.json(posts);
// });

// app.get('/insta/posts',(req,res)=>{
//   res.json(insta.posts);
// });

app.get('/insta/posts/:id',(req,res)=>{
  const searchId = Number(req.params.id);
  const result = insta.posts.find((post)=>post.id === searchId);
  if(result){
    res.json(result);
  }else{
    res.status(404).send("The post you're looking for does not exist");
  }
});

app.get('/insta/posts/:id/comments',(req,res)=>{
  let searchId = Number(req.params.id);
  let result = insta.posts.find((user)=>user.id == searchId);
  if(result){
    res.json(result.comments);
  }else{
    res.status(404).send("The comment you are looking for does not exist");
  }
});

app.get('/insta/posts/:postId/comments/:commentId', (req,res)=>{
  let postId = Number(req.params.postId);
  let commentId = Number(req.params.commentId);
  let post = insta.posts.find((p)=>p.id == postId);
  let comment = post.comments.find(c=>c.id == commentId);
  if (comment){
    res.json(comment);
  }else{
    res.status(404).send("The comment you are looking for does not exist");
  }
});


// ?user=username
// Return posts by a specific user.

// app.get('/insta/posts',(req,res)=>{
//   let posts = insta.posts;

//   if(req.query.user){
//     const user = insta.users.find(u=>u.username === req.query.user);
//     if (!user) return res.status(404).send("User not found");
//     posts = posts.filter (post => post.userId === user.id);
//   }
//   res.json(posts);

// });


// /posts?hashtag=travel&minLikes=10
app.get('/insta/posts',(req,res)=>{
  let posts = insta.posts;

  if (req.query.hashtag){
    posts = posts.filter(p=>p.hashtags.includes(req.query.hashtag));
  }

  if (req.query.minLikes){
    const min = Number (req.query.minLikes);
    posts = posts.filter(p=>p.likes >= min);
  }

  res.json(posts);
});