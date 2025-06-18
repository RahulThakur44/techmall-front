import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const ProductForm = () => {
  const [formData, setFormData] = useState({
    name: '', description: '', price: '', category: '', image: null
  });
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  useEffect(() => {
    if (isEdit) {
      fetch(`http://localhost:5000/api/products/${id}`)
        .then(res => res.json())
        .then(data => {
          setFormData({ ...data, image: null });
        });
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData((prev) => ({ ...prev, image: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value) body.append(key, value);
    });

    const method = isEdit ? 'PUT' : 'POST';
    const url = isEdit
      ? `http://localhost:5000/api/products/${id}`
      : `http://localhost:5000/api/products`;

    await fetch(url, { method, body });
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{isEdit ? 'Edit' : 'Add'} Product</h2>
      <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
      <input name="price" value={formData.price} onChange={handleChange} placeholder="Price" type="number" required />
      <input name="category" value={formData.category} onChange={handleChange} placeholder="Category ID" type="number" required />
      <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" />
      <input name="image" type="file" onChange={handleChange} accept="image/*" />
      <button type="submit">{isEdit ? 'Update' : 'Add'}</button>
    </form>
  );
};

export default ProductForm;
