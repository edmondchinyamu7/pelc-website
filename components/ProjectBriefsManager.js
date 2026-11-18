'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import {
  Check,
  Download,
  FileText,
  RefreshCw,
  Trash2,
  Upload,
  X,
} from 'lucide-react';
import {
  ALLOWED_BRIEF_EXTENSIONS,
  ALLOWED_BRIEF_MIME_TYPES,
  MAX_BRIEF_FILE_SIZE,
  formatFileSize,
  getExtension,
} from '@/lib/storage/briefs';

function formatDisplayName(storedName) {
  if (typeof storedName !== 'string') return 'Untitled brief';
  const match = storedName.match(/^\d{10,}-(.+)$/);
  return match ? match[1] : storedName;
}

function formatDateLabel(isoString) {
  if (!isoString) return 'Recently uploaded';
  const date = new Date(isoString);
  if (Number.isNaN(date.getTime())) return 'Recently uploaded';
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export default function ProjectBriefsManager() {
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [downloadingName, setDownloadingName] = useState(null);
  const [confirmDeleteName, setConfirmDeleteName] = useState(null);
  const [deletingName, setDeletingName] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const fileInputRef = useRef(null);

  const fetchFiles = useCallback(async () => {
    const response = await fetch('/api/project-briefs', {
      method: 'GET',
      cache: 'no-store',
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      throw new Error(data.error || 'Unable to load your project briefs.');
    }
    return Array.isArray(data.files) ? data.files : [];
  }, []);

  const loadFiles = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const nextFiles = await fetchFiles();
      setFiles(nextFiles);
    } catch (err) {
      setError(err?.message || 'Network error while loading project briefs.');
    } finally {
      setIsLoading(false);
    }
  }, [fetchFiles]);

  useEffect(() => {
    let cancelled = false;
    fetchFiles()
      .then((nextFiles) => {
        if (!cancelled) {
          setFiles(nextFiles);
          setError(null);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err?.message || 'Network error while loading project briefs.');
        }
      })
      .finally(() => {
        if (!cancelled) {
          setIsLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [fetchFiles]);

  const validateClientFile = (file) => {
    if (!file) return 'Please select a file to upload.';
    if (file.size <= 0) return 'Selected file cannot be empty.';
    if (file.size > MAX_BRIEF_FILE_SIZE) {
      return 'File exceeds the 10 MB maximum size limit.';
    }
    const ext = getExtension(file.name);
    const mime = typeof file.type === 'string' ? file.type.toLowerCase() : '';
    if (!ALLOWED_BRIEF_EXTENSIONS.has(ext) || !ALLOWED_BRIEF_MIME_TYPES.has(mime)) {
      return 'Unsupported file type. Allowed formats: PDF, PNG, JPEG, WebP.';
    }
    return null;
  };

  const handleFileChange = (event) => {
    setError(null);
    setSuccess(null);
    const file = event.target.files?.[0] || null;
    if (!file) {
      setSelectedFile(null);
      return;
    }
    const validationError = validateClientFile(file);
    if (validationError) {
      setSelectedFile(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
      setError(validationError);
      return;
    }
    setSelectedFile(file);
  };

  const handleUpload = (event) => {
    event.preventDefault();
    if (isUploading) return;

    const validationError = validateClientFile(selectedFile);
    if (validationError) {
      setError(validationError);
      return;
    }

    setError(null);
    setSuccess(null);
    setIsUploading(true);
    setUploadProgress(0);

    const formData = new FormData();
    formData.append('file', selectedFile);

    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/api/project-briefs');

    xhr.upload.onprogress = (progressEvent) => {
      if (progressEvent.lengthComputable && progressEvent.total > 0) {
        const pct = Math.min(100, Math.round((progressEvent.loaded / progressEvent.total) * 100));
        setUploadProgress(pct);
      }
    };

    xhr.onload = async () => {
      let payload = {};
      try {
        payload = JSON.parse(xhr.responseText || '{}');
      } catch {
        payload = {};
      }

      if (xhr.status >= 200 && xhr.status < 300) {
        setUploadProgress(100);
        setSelectedFile(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
        setSuccess('Project brief uploaded securely to your private vault.');
        setIsUploading(false);
        await loadFiles();
        return;
      }

      setError(payload.error || 'Upload failed. Please check the file and try again.');
      setIsUploading(false);
      setUploadProgress(0);
    };

    xhr.onerror = () => {
      setError('Network error during upload. Please try again.');
      setIsUploading(false);
      setUploadProgress(0);
    };

    xhr.send(formData);
  };

  const handleDownload = async (fileName) => {
    if (downloadingName) return;
    setDownloadingName(fileName);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch('/api/project-briefs/download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: fileName }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok || !data?.url) {
        setError(data.error || 'Could not generate secure download link.');
        setDownloadingName(null);
        return;
      }

      const anchor = document.createElement('a');
      anchor.href = data.url;
      anchor.download = formatDisplayName(fileName);
      anchor.rel = 'noopener noreferrer';
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      setSuccess('Secure signed download link generated (valid for 60 seconds).');
    } catch {
      setError('Network error while preparing your download.');
    } finally {
      setDownloadingName(null);
    }
  };

  const handleConfirmDelete = async (fileName) => {
    if (deletingName) return;
    setDeletingName(fileName);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch('/api/project-briefs', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: fileName }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        setError(data.error || 'Unable to delete project brief.');
        setDeletingName(null);
        return;
      }

      setConfirmDeleteName(null);
      setFiles((prev) => prev.filter((item) => item.name !== fileName));
      setSuccess('Project brief deleted from private storage.');
    } catch {
      setError('Network error while deleting project brief.');
    } finally {
      setDeletingName(null);
    }
  };

  return (
    <div>
      <form className="np-upload-box" onSubmit={handleUpload}>
        <div className="np-upload-meta">
          <div>
            <strong>Upload a private project brief</strong>
            <span>Accepted: PDF, PNG, JPEG, WebP · Maximum 10 MB · Encrypted private storage</span>
          </div>
          <button
            type="button"
            className="np-btn np-btn--outline"
            onClick={loadFiles}
            disabled={isLoading || isUploading}
            aria-label="Refresh project briefs list"
          >
            <RefreshCw size={14} />
            Refresh
          </button>
        </div>

        <div className="np-file-input-row">
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.png,.jpg,.jpeg,.webp,application/pdf,image/png,image/jpeg,image/webp"
            className="np-file-input"
            onChange={handleFileChange}
            disabled={isUploading}
            aria-label="Choose project brief file"
          />
          <button
            type="submit"
            className="np-btn np-btn--gold"
            disabled={!selectedFile || isUploading}
          >
            <Upload size={14} />
            {isUploading ? `Uploading ${uploadProgress}%` : 'Upload brief'}
          </button>
        </div>

        {selectedFile && !isUploading && (
          <div style={{ fontSize: '12px', color: 'var(--muted)' }}>
            Ready to upload: <strong>{selectedFile.name}</strong> ({formatFileSize(selectedFile.size)})
          </div>
        )}

        {isUploading && (
          <div className="np-progress-wrap" aria-live="polite">
            <div className="np-progress-label">
              <span>Uploading private brief…</span>
              <span>{uploadProgress}%</span>
            </div>
            <div className="np-progress-track">
              <div className="np-progress-fill" style={{ width: `${uploadProgress}%` }} />
            </div>
          </div>
        )}
      </form>

      {error && (
        <div className="np-banner np-banner--error" role="alert">
          {error}
        </div>
      )}
      {success && (
        <div className="np-banner np-banner--success" role="status">
          {success}
        </div>
      )}

      <div className="np-brief-list">
        {isLoading ? (
          <div className="np-empty-state">Loading your private project briefs…</div>
        ) : files.length === 0 ? (
          <div className="np-empty-state">
            No project briefs uploaded yet. Upload a PDF specification, wireframe, or visual
            reference above to share privately with NEOPAD STUDIO.
          </div>
        ) : (
          files.map((file) => {
            const isConfirming = confirmDeleteName === file.name;
            const isDeleting = deletingName === file.name;
            const isDownloading = downloadingName === file.name;

            return (
              <div key={file.name} className="np-brief-row">
                <div className="np-brief-info">
                  <span
                    className="np-brief-name"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                  >
                    <FileText size={15} color="#9c7921" />
                    <span>{formatDisplayName(file.name)}</span>
                  </span>
                  <span className="np-brief-sub">
                    {formatFileSize(file.size)} · Uploaded {formatDateLabel(file.createdAt)}
                  </span>
                </div>

                <div className="np-brief-actions">
                  <button
                    type="button"
                    className="np-btn np-btn--outline"
                    onClick={() => handleDownload(file.name)}
                    disabled={Boolean(downloadingName) || isDeleting}
                  >
                    <Download size={14} />
                    {isDownloading ? 'Preparing…' : 'Download'}
                  </button>

                  {isConfirming ? (
                    <>
                      <button
                        type="button"
                        className="np-btn np-btn--danger"
                        onClick={() => handleConfirmDelete(file.name)}
                        disabled={isDeleting}
                      >
                        <Check size={14} />
                        {isDeleting ? 'Deleting…' : 'Confirm delete'}
                      </button>
                      <button
                        type="button"
                        className="np-btn np-btn--outline"
                        onClick={() => setConfirmDeleteName(null)}
                        disabled={isDeleting}
                      >
                        <X size={14} />
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button
                      type="button"
                      className="np-btn np-btn--danger"
                      onClick={() => {
                        setError(null);
                        setSuccess(null);
                        setConfirmDeleteName(file.name);
                      }}
                      disabled={Boolean(deletingName)}
                    >
                      <Trash2 size={14} />
                      Delete
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
