import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Offer.module.css";

function Offer() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: null
  });
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        image: file
      });
      
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    // Validate form
    if (!formData.title.trim()) {
      setError("Title is required");
      return;
    }
    if (!formData.description.trim()) {
      setError("Description is required");
      return;
    }
    if (!formData.image) {
      setError("Image is required");
      return;
    }

    try {
      setIsSubmitting(true);
      
      // Create FormData for sending file
      const submitData = new FormData();
      submitData.append("title", formData.title);
      submitData.append("description", formData.description);
      submitData.append("image", formData.image);
      
      // TODO: Replace with actual API endpoint
      // For now we'll simulate a successful upload
      console.log("Submitting data:", formData.title, formData.description, formData.image.name);
      
      // Simulate API call delay
      setTimeout(() => {
        setIsSubmitting(false);
        // Simulate successful response with ID
        const mockCreatedItemId = "new" + Date.now();
        navigate(`/crap/${mockCreatedItemId}`);
      }, 1500);
      
      // Actual API call would look like this:
      // const response = await axios.post('http://your-api-url/crap', submitData, {
      //   headers: {
      //     'Authorization': `Bearer ${Cookies.get('token')}`,
      //     'Content-Type': 'multipart/form-data'
      //   }
      // });
      // navigate(`/crap/${response.data.id}`);
      
    } catch (err) {
      setIsSubmitting(false);
      setError("Failed to upload. Please try again.");
      console.error("Error submitting form:", err);
    }
  };

  return (
    <div className={styles.offerPage}>
      <h1 className={styles.pageTitle}>Offer Your Crap</h1>
      <p className={styles.pageDescription}>
        Got something to get rid of? Fill out the form below and someone might take it off your hands!
      </p>
      
      {error && <div className={styles.errorMessage}>{error}</div>}
      
      <form onSubmit={handleSubmit} className={styles.offerForm}>
        <div className={styles.formGroup}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="What are you offering?"
            disabled={isSubmitting}
          />
        </div>
        
        <div className={styles.formGroup}>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Tell us more about your item. Condition, dimensions, etc."
            rows={4}
            disabled={isSubmitting}
          />
        </div>
        
        <div className={styles.formGroup}>
          <label htmlFor="image">Image</label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleImageChange}
            accept="image/*"
            className={styles.fileInput}
            disabled={isSubmitting}
          />
          <div className={styles.uploadInfo}>
            Upload a clear image of your item (Max size: 5MB)
          </div>
        </div>
        
        {preview && (
          <div className={styles.imagePreview}>
            <p>Image Preview:</p>
            <img src={preview} alt="Preview" />
          </div>
        )}
        
        <button 
          type="submit" 
          className={styles.submitButton}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Offer Item"}
        </button>
      </form>
    </div>
  );
}

export default Offer;