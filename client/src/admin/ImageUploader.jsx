import { useRef, useState } from 'react';
import api from '../api/axios';

const MIN_WIDTH = 1200;
const MIN_HEIGHT = 800;

function getDimensions(file) {
  return new Promise((resolve) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve({ w: img.naturalWidth, h: img.naturalHeight });
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      resolve({ w: 0, h: 0 });
    };
    img.src = url;
  });
}

// value : tableau de { url, public_id }
export default function ImageUploader({ value = [], onChange, multiple = true }) {
  const inputRef = useRef(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');
  const [warn, setWarn] = useState('');

  async function handleFiles(e) {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    setWarn('');
    for (const file of files) {
      const { w, h } = await getDimensions(file);
      if (w && (w < MIN_WIDTH || h < MIN_HEIGHT)) {
        setWarn(
          `Attention : photo basse résolution (${w}x${h}) — elle peut paraître floue sur le site. Idéal : 1920px de large (hautes définitions recommandées).`
        );
      }
    }
    setBusy(true);
    setErr('');
    try {
      const uploaded = [];
      for (const file of files) {
        const fd = new FormData();
        fd.append('image', file);
        const res = await api.post('/upload', fd, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        uploaded.push(res.data);
      }
      onChange(multiple ? [...value, ...uploaded] : [uploaded[uploaded.length - 1]]);
    } catch (e) {
      setErr(e.response?.data?.message || 'Échec de l\'upload.');
    } finally {
      setBusy(false);
      if (inputRef.current) inputRef.current.value = '';
    }
  }

  function remove(i) {
    onChange(value.filter((_, idx) => idx !== i));
  }

  return (
    <div>
      <div
        className="uploader"
        onClick={() => !busy && inputRef.current?.click()}
      >
        {busy ? 'Envoi en cours…' : multiple ? 'Cliquer pour ajouter des images' : 'Cliquer pour choisir une image'}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple={multiple}
        style={{ display: 'none' }}
        onChange={handleFiles}
      />
      {err && <div className="alert alert--err" style={{ marginTop: '0.6rem' }}>{err}</div>}
      {warn && <div className="alert alert--warn" style={{ marginTop: '0.6rem' }}>{warn}</div>}
      {value.length > 0 && (
        <div className="thumbs">
          {value.map((img, i) => (
            <div className="thumb" key={img.public_id || img.url || i}>
              <img src={img.url} alt="" />
              <button type="button" onClick={() => remove(i)} aria-label="Retirer">
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
