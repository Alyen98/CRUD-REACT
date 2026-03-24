import { use } from 'react';

export function BookList({ booksPromise, onEdit, onDelete }) {
  const data = use(booksPromise);
  const list = Array.isArray(data) ? data : [];

  if (list.length === 0) {
    return (
      <div className="text-center p-12 italic" style={{ color: 'var(--accent-gold)' }}>
        <p>Nenhuma obra encontrada nos arquivos da biblioteca.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-8 md:grid-cols-2">
      {list.map((item) => (
        <div
          key={item.id}
          className="p-6 rounded flex flex-col justify-between"
          style={{
            backgroundColor: 'var(--surface)',
            border: '1px solid var(--border)',
            boxShadow: '0 4px 10px var(--shadow-warm)'
          }}
        >
          <div>
            <h3 className="mb-4 line-clamp-1">{item.title}</h3>

            {/* Usando o blockquote personalizado! */}
            <blockquote>
              <p className="line-clamp-3 text-sm">{item.body || 'Sem descrição adicional.'}</p>
            </blockquote>
          </div>

          <div className="flex gap-3 pt-6 mt-auto">
            <button
              onClick={() => onEdit(item)}
              className="ghost flex-1"
            >
              Editar
            </button>
            <button
              onClick={() => onDelete(item.id)}
              className="ghost flex-1"
              style={{ color: '#8b0000', borderColor: '#8b0000' }}
            >
              Descartar
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}