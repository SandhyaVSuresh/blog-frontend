"use client";
import { useState, useEffect } from "react";
import { toast } from 'react-hot-toast';

export default function PostForm({ initialData, onSubmit, buttonText, onClose }) {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    author: "",
    imageFile: null,
    imageUrl: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [preview, setPreview] = useState("");

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.content.trim()) newErrors.content = "Content is required";
    if (!formData.author.trim()) newErrors.author = "Author is required";
    if (!formData.imageFile && !formData.imageUrl) {
      newErrors.image = "Please provide either an image file or URL";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    if (initialData) {
      // Normalize keys to ensure compatibility
      setFormData({
        title: initialData.title || "",
        content: initialData.content || "",
        author: initialData.author || "",
        imageFile: null,
        imageUrl: initialData.imageUrl || initialData.image_url || "",
      });

      setPreview(initialData.imageUrl || initialData.image_url || "");
    }
  }, [initialData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, imageFile: file, imageUrl: "" });
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleImageUrlChange = (e) => {
    const url = e.target.value;
    setFormData({ ...formData, imageUrl: url, imageFile: null });
    setPreview(url);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }

    try {
      setIsSubmitting(true);
      await onSubmit(formData);
      toast.success(buttonText === "Create" ? "Post created successfully!" : "Post updated successfully!");
    } catch (error) {
      console.error("Form submission error:", error);
      toast.error(error.message || "An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative max-w-3xl mx-auto bg-black p-6 rounded-lg shadow-[0_0_15px_rgba(255,255,255,0.1)]"
    >
      {/* Close button */}
      <button
        type="button"
        onClick={onClose}
        className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-2xl font-bold focus:outline-none"
        aria-label="Close"
      >
        &times;
      </button>

      <h2 className="text-2xl text-white font-semibold mb-4">
        {buttonText === "Create" ? "Create a New Post" : "Edit Post"}
      </h2>

      {/* Title */}
      <div className="mb-4">
        <label className="block text-white font-medium mb-1">Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded focus:outline-blue-400"
        />
      </div>

      {/* Content */}
      <div className="mb-4">
        <label className="block text-white font-medium mb-1">Content</label>
        <textarea
          name="content"
          value={formData.content}
          onChange={handleChange}
          required
          rows={5}
          className="w-full border p-2 rounded focus:outline-blue-400"
        ></textarea>
      </div>

      {/* Author */}
      <div className="mb-4">
        <label className="block text-white font-medium mb-1">Author</label>
        <input
          type="text"
          name="author"
          value={formData.author}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded focus:outline-blue-400"
        />
      </div>

      {/* Image Section */}
      <div className="mb-4">
        <label className="block text-white font-medium mb-2">Image</label>

        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full border p-2 rounded mb-2 focus:outline-blue-400"
        />

        <div className="text-center text-gray-500 my-2">— or —</div>

        <input
          type="url"
          name="imageUrl"
          placeholder="Paste image URL..."
          value={formData.imageUrl}
          onChange={handleImageUrlChange}
          className="w-full border p-2 rounded focus:outline-blue-400"
        />

        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="mt-3 rounded-md max-h-48 w-full object-cover"
          />
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className={`${
          isSubmitting 
            ? 'bg-blue-400 cursor-not-allowed'
            : 'bg-blue-500 hover:bg-blue-600'
        } text-white px-4 py-2 rounded-lg flex items-center justify-center min-w-[100px]`}
      >
        {isSubmitting ? (
          <>
            <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></span>
            {buttonText === "Create" ? "Creating..." : "Updating..."}
          </>
        ) : (
          buttonText
        )}
      </button>
    </form>
  );
}
