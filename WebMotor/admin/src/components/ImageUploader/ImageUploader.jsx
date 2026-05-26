import React, { useState, useRef } from 'react';
import axios from 'axios';
import './ImageUploader.css';

export default function ImageUploader({ label, value, onUploaded, name }) {
    const [uploading, setUploading] = useState(false);
    const [dragActive, setDragActive] = useState(false);
    const [progress, setProgress] = useState(0);
    const inputRef = useRef(null);

    const handleUpload = async (file) => {
        if (!file) return;
        setUploading(true);
        setProgress(0);
        const formData = new FormData();
        formData.append('image', file);
        try {
            const res = await axios.post('http://localhost:5000/api/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
                onUploadProgress: (e) => {
                    const pct = Math.round((e.loaded * 100) / e.total);
                    setProgress(pct);
                }
            });
            onUploaded(res.data.url);
        } catch (err) {
            console.error(err);
            alert('Lỗi khi upload ảnh!');
        } finally {
            setUploading(false);
            setTimeout(() => setProgress(0), 600);
        }
    };

    const handleFileChange = (e) => {
        handleUpload(e.target.files[0]);
    };

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        } else if (e.type === 'dragleave') {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleUpload(e.dataTransfer.files[0]);
        }
    };

    const handleRemove = (e) => {
        e.stopPropagation();
        onUploaded('');
        if (inputRef.current) inputRef.current.value = '';
    };

    return (
        <div className="image-uploader-wrapper">
            {label && <label className="image-uploader-label">{label}</label>}

            <div
                className={`image-uploader-zone ${dragActive ? 'drag-active' : ''} ${value ? 'has-image' : ''}`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => !uploading && inputRef.current?.click()}
            >
                <input
                    ref={inputRef}
                    type="file"
                    name={name}
                    accept="image/*"
                    onChange={handleFileChange}
                    className="image-uploader-input"
                />

                {value ? (
                    <div className="image-uploader-preview">
                        <img src={value} alt="Preview" />
                        <div className="image-uploader-overlay">
                            <button
                                type="button"
                                className="image-uploader-change"
                                onClick={(e) => { e.stopPropagation(); inputRef.current?.click(); }}
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                                    <circle cx="12" cy="13" r="4"/>
                                </svg>
                                Đổi ảnh
                            </button>
                            <button
                                type="button"
                                className="image-uploader-remove"
                                onClick={handleRemove}
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <polyline points="3 6 5 6 21 6"/>
                                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                                </svg>
                                Xóa
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="image-uploader-placeholder">
                        {uploading ? (
                            <div className="image-uploader-uploading">
                                <div className="upload-spinner"></div>
                                <span>Đang tải lên...</span>
                            </div>
                        ) : (
                            <>
                                <div className="upload-icon-circle">
                                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                                        <polyline points="17 8 12 3 7 8"/>
                                        <line x1="12" y1="3" x2="12" y2="15"/>
                                    </svg>
                                </div>
                                <p className="upload-text-main">
                                    Kéo thả ảnh vào đây hoặc <span>chọn file</span>
                                </p>
                                <p className="upload-text-sub">
                                    PNG, JPG, WEBP — Tối đa 10MB
                                </p>
                            </>
                        )}
                    </div>
                )}

                {/* Progress bar */}
                {progress > 0 && progress < 100 && (
                    <div className="image-uploader-progress">
                        <div className="image-uploader-progress-bar" style={{ width: `${progress}%` }}></div>
                    </div>
                )}
            </div>
        </div>
    );
}
