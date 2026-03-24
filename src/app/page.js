'use client';
import { useState, Suspense, startTransition } from 'react';
import { fetchBooks, createBook, updateBook, deleteBook } from '../api';
import { BookList } from '../components/BookList';
import { ErrorState } from '../components/ErrorState';

export default function ChronosNotesApp() {
  const [formData, setFormData] = useState({ title: '', body: '' });
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState(null);

  const [booksPromise, setBooksPromise] = useState(() => fetchBooks());

  const refreshData = () => {
    startTransition(() => {
      setError(null);
      setBooksPromise(fetchBooks());
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const currentBooks = await booksPromise;

      if (editingId) {
        const updatedBook = await updateBook(editingId, formData);
        startTransition(() => {
          const newBooks = currentBooks.map(book =>
            book.id === editingId ? { ...updatedBook, id: editingId } : book
          );
          setBooksPromise(Promise.resolve(newBooks));
        });
      } else {
        const newBook = await createBook(formData);
        startTransition(() => {
          const newBooks = [newBook, ...currentBooks];
          setBooksPromise(Promise.resolve(newBooks));
        });
      }
      setFormData({ title: '', body: '' });
      setEditingId(null);
    } catch (err) {
      setError(err);
    }
  };

  return (
    <div className="min-h-screen py-10 px-4 flex justify-center items-start">
      {/* O CSS vai transformar esta tag <main> no pergaminho central */}
      <main className="w-full max-w-5xl">
        <header className="mb-10 text-center">
          <h1>Biblioteca Cronos</h1>
          <p className="mt-2" style={{ color: 'var(--accent-gold)' }}>
            Acervo e Registros • React 19
          </p>
        </header>

        <section className="mb-10">
          <h2>{editingId ? 'Editar Manuscrito' : 'Catalogar Nova Obra'}</h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-6">
            <input
              placeholder="Título da obra"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
            <textarea
              className="min-h-[140px] resize-none"
              placeholder="Escreva a sinopse ou conteúdo aqui..."
              value={formData.body}
              onChange={(e) => setFormData({ ...formData, body: e.target.value })}
              required
            />
            <div className="flex flex-wrap gap-4 pt-4">
              <button type="submit">
                {editingId ? 'Atualizar Registro' : 'Salvar no Acervo'}
              </button>
              {editingId && (
                // Usando a classe ghost criada no CSS
                <button
                  type="button"
                  className="ghost"
                  onClick={() => {
                    setEditingId(null);
                    setFormData({ title: '', body: '' });
                  }}
                >
                  Cancelar
                </button>
              )}
            </div>
          </form>
        </section>

        {/* A linha divisória com o pseudo-elemento ✦ ── ✦ ── ✦ */}
        <hr />

        {/* Bloco de Erro ou Lista */}
        {error ? (
          <ErrorState error={error} reset={() => refreshData()} />
        ) : (
          <Suspense fallback={<div className="text-center py-10 italic" style={{ color: 'var(--accent)' }}>Folheando os arquivos...</div>}>
            <BookList
              booksPromise={booksPromise}
              onEdit={(item) => {
                setEditingId(item.id);
                setFormData({ title: item.title, body: item.body });
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onDelete={async (id) => {
                if (confirm('Tem certeza de que deseja remover esta obra do acervo?')) {
                  try {
                    await deleteBook(id);
                    const currentBooks = await booksPromise;
                    startTransition(() => {
                      const filteredBooks = currentBooks.filter(book => book.id !== id);
                      setBooksPromise(Promise.resolve(filteredBooks));
                    });
                  } catch (err) {
                    setError(err);
                  }
                }
              }}
            />
          </Suspense>
        )}
      </main>
    </div>
  );
}