"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import PostForm from "../../components/PostForm";
import AnimatedBackground from "../../components/AnimatedBackground";
import { getAPI } from "../../config/get-api";
import { patchAPI } from "../../config//patch-api";
import { toast } from "react-hot-toast";
import { checkAuth } from "../../utils/authCheck";


export default function EditPost() {
  const router = useRouter();
  const params = useParams();
  const postId = parseInt(params.id);

  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(true);

  const fetchPost = async () => {
    setIsLoading(true);
    try {
      console.log('Fetching post with ID:', params.id);
      const response = await getAPI(`post-detail/${params.id}/`);
      // console.log('API Response:', response);
      
      if (response) {
        setPost(response);
        setError(null);
        // console.log('Post set successfully:', response);
      } else {
        console.error('Response was empty');
        setError("Post not found");
      }
    } catch (error) {
      console.error("Error fetching post:", error);
      setError(error.message || "Error fetching post");
      
      // Log more details about the error
      if (error.response) {
        console.error('Error response:', {
          status: error.response.status,
          data: error.response.data
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (params.id) {
      fetchPost();
    }
  }, [params.id]);

 const handleEdit = async (formData) => {
  console.log("Starting edit process...");
  
  if (!checkAuth(router)) return;

  try {
    setIsLoading(true);

    // First, validate the data
    if (!formData.title || !formData.content || !formData.author) {
      throw new Error("Please fill in all required fields");
    }

    // Create the request body
    const requestBody = {
      title: formData.title,
      content: formData.content,
      author: formData.author,
    };

    if (formData.imageFile) {
      // Convert File to base64 string
      const reader = new FileReader();
      const base64Promise = new Promise((resolve) => {
        reader.onload = () => resolve(reader.result);
      });
      reader.readAsDataURL(formData.imageFile);
      requestBody.image = await base64Promise;
    } else if (formData.imageUrl) {
      requestBody.image_url = formData.imageUrl;
    }

    console.log("Sending update request with data:", requestBody);

    // Make the API call
    const response = await patchAPI(`post-update/${params.id}/`, requestBody);
    console.log("Received API response:", response);

    if (response) {
      toast.success("Post updated successfully!");
      
      // Wait a moment before navigating
      setTimeout(() => {
        // Navigate with the updated data as search params
        router.push(`/post/${params.id}?` + new URLSearchParams({
          title: requestBody.title,
          content: requestBody.content,
          author: requestBody.author,
          image: requestBody.image_url || requestBody.image || '',
          created_at: new Date().toISOString()
        }));
      }, 1000);
    } else {
      throw new Error("No response received from server");
    }
  } catch (error) {
    console.error("Update failed:", error);
    
    // Log detailed error information
    if (error.response) {
      console.error("Error details:", {
        status: error.response.status,
        statusText: error.response.statusText,
        data: error.response.data,
        headers: Object.fromEntries(error.response.headers.entries())
      });
    }

    // Show error message to user
    toast.error(
      error.message || "Failed to update post. Please try again."
    );
  } finally {
    setIsLoading(false);
  }
};

  const handleClose = () => {
    setShowForm(false);
    router.push("/");
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <AnimatedBackground />
        <div className="bg-black/80 p-8 rounded-lg shadow-lg text-center">
          <p className="text-red-400 text-xl mb-4">
            {error || "Post not found"}
          </p>
          <button
            onClick={() => router.push('/')}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <AnimatedBackground />
      <div className="p-6">
        {showForm ? (
          <PostForm
            initialData={{
              title: post.title,
              content: post.content,
              author: post.author || "",
              imageUrl: post.image_url || post.image || "",
            }}
            onSubmit={handleEdit}
            buttonText="Edit"
            onClose={handleClose}
          />
        ) : (
          <p className="text-center text-gray-600">Form closed.</p>
        )}
      </div>
    </>
  );
}
