import { useEffect, useState } from 'react';
import api from '../api/axios';
import ImageUploader from './ImageUploader';

export default function ResourceManager({ config }) {
  const { endpoint, title, singular, columns, fields, makeEmpty } = config;
  const [items, setItems] = useState([]);
  const [editing, setEditing] = useState(null);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  const load = () => {
    const url = endpoint === '/reviews' ? `${endpoint}?all=1` : endpoint;
    api.get(url).then((res) => setItems(res.data)).catch(() => setError('Chargement impossible.'));
  };

  useEffect(load, [endpoint]);

  const setField = (key, val) => setEditing((e) => ({ ...e, [key]: val }));

  async function save(e) {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      if (editing._id) await api.put(`${endpoint}/${editing._id}`, editing);
      else await api.post(endpoint, editing);
      setEditing(null);
      load();
    } catch (err) {
      setError(err.response?.data?.message || 'Enregistrement impossible.');
    } finally {
      setSaving(false);
    }
  }

  async function remove(id) {
    if (!window.confirm('Supprimer cet élément ?')) return;
    try {
      await api.delete(`${endpoint}/${id}`);
      load();
    } catch {
      setError('Suppression impossible.');
    }
  }

  function renderField(f) {
    const val = editing[f.key];
    switch (f.type) {
      case 'textarea':
        return (
          <textarea value={val || ''} onChange={(e) => setField(f.key, e.target.value)} />
        );
      case 'number':
        return (
          <input
            type="number"
            value={val ?? ''}
            onChange={(e) => setField(f.key, e.target.value === '' ? '' : Number(e.target.value))}
          />
        );
      case 'checkbox':
        return (
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textTransform: 'none' }}>
            <input
              type="checkbox"
              checked={!!val}
              onChange={(e) => setField(f.key, e.target.checked)}
              style={{ width: 'auto' }}
            />
            <span>{f.checkboxLabel || 'Oui'}</span>
          </label>
        );
      case 'tags':
        return (
          <input
            value={Array.isArray(val) ? val.join(', ') : ''}
            placeholder="séparés par des virgules"
            onChange={(e) =>
              setField(
                f.key,
                e.target.value.split(',').map((s) => s.trim()).filter(Boolean)
              )
            }
          />
        );
      case 'image':
        return (
          <ImageUploader
            multiple={false}
            value={val ? [val] : []}
            onChange={(arr) => setField(f.key, arr[0] || null)}
          />
        );
      case 'images':
        return (
          <ImageUploader
            multiple
            value={Array.isArray(val) ? val : []}
            onChange={(arr) => setField(f.key, arr)}
          />
        );
      default:
        return <input value={val || ''} onChange={(e) => setField(f.key, e.target.value)} />;
    }
  }

  return (
    <div>
      <div className="admin__head">
        <h1>{title}</h1>
        {!editing && (
          <button className="btn-sm btn-sm--primary" onClick={() => setEditing(makeEmpty())}>
            + Ajouter {singular ? `une ${singular}` : ''}
          </button>
        )}
      </div>

      {error && <div className="alert alert--err">{error}</div>}

      {editing ? (
        <form className="panel" onSubmit={save}>
          <h3 style={{ marginBottom: '1rem' }}>
            {editing._id ? 'Modifier' : 'Nouveau'} — {title}
          </h3>
          <div className="admin-grid-2">
            {fields.map((f) => (
              <div
                key={f.key}
                className="field"
                style={f.full ? { gridColumn: '1 / -1' } : undefined}
              >
                <label>{f.label}</label>
                {renderField(f)}
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '0.6rem', marginTop: '1rem' }}>
            <button className="btn-sm btn-sm--primary" type="submit" disabled={saving}>
              {saving ? 'Enregistrement…' : 'Enregistrer'}
            </button>
            <button className="btn-sm" type="button" onClick={() => setEditing(null)}>
              Annuler
            </button>
          </div>
        </form>
      ) : (
        <div className="panel">
          <table className="table">
            <thead>
              <tr>
                {columns.map((c) => (
                  <th key={c.key}>{c.label}</th>
                ))}
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item._id}>
                  {columns.map((c) => (
                    <td key={c.key}>{c.render ? c.render(item) : item[c.key]}</td>
                  ))}
                  <td>
                    <div className="row-actions" style={{ justifyContent: 'flex-end' }}>
                      <button className="btn-sm" onClick={() => setEditing({ ...item })}>
                        Modifier
                      </button>
                      <button
                        className="btn-sm btn-sm--danger"
                        onClick={() => remove(item._id)}
                      >
                        Supprimer
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {items.length === 0 && (
                <tr>
                  <td colSpan={columns.length + 1} style={{ color: '#8990a3' }}>
                    Aucun élément pour l'instant.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
