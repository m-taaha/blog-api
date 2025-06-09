import { Blog } from "../models/blog.model.js";

//create blog
const createBlog = async (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ message: `Title and Content are required ` });
  }

  try {
    const newBlog = await Blog.create({
      title,
      content,
      author: req.user._id, //from authenticated middleware
    });
    return res.status(201).json({ message: "Blog created", blog: newBlog });
  } catch (error) {
    return res.status(500).json({ message: `Server Error` });
  }
};

//get all blogs
const getAllBlogs = async (req, res) => {
  try {
    const post = await Blog.find().populate("author", "name email");
    return res.status(200).json({ post });
  } catch (error) {
    return res.status(500).json({ message: `Server Error` });
  }
};

//get blog by ID
const getBlogById = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Blog.findById(id).populate("author", "name email");

    if (!post) {
      return res.status(400).json({ message: `Blog not found` });
    }
    return res.status(200).json({ post });
  } catch (error) {
    return res.status(500).json({ message: `Server Error` });
  }
};

//Update Blog
const updateBlog = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  try {
    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(400).json({ message: `Blog not found` });
    }

    //checking if the loggedIn user is author or not
    if (blog.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: `Not authorized to update` });
    }

    blog.title = title || blog.title;
    blog.content = content || blog.content;

    await blog.save();
    return res.status(200).json({ message: "Blog updated", blog });
  } catch (error) {
    return res.status(500).json({ message: `Server Error` });
  }
};

//delete blog
const deleteBlogById = async (req, res) => {
  const { id } = req.params;
  const blog = await Blog.findById(id);

  try {
    if (!blog) {
      return res.status(404).json({ message: `Blog not found` });
    }

    if (blog.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: `Not authorized to delete` });
    }

    await blog.deleteOne();
    return res.status(200).json({ message: `Blog deleted` });
  } catch (error) {
    return res.status(500).json({ message: `Server Error` });
  }
};

export { createBlog, getAllBlogs, getBlogById, updateBlog, deleteBlogById };
