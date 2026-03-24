const BASE_URL = 'https://jsonplaceholder.typicode.com/posts';

export const fetchBooks = async () => {
  const res = await fetch(`${BASE_URL}?_limit=50`);
  if (!res.ok) throw new Error('Erro ao buscar notas');
  return res.json();
};

export const createBook = async (data) => {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...data, userId: 1 }),
  });

  if (!res.ok) throw new Error('Erro ao criar nota');
  const result = await res.json();

  // Gera ID alto para evitar conflitos
  return {
    ...result,
    id: Date.now() + Math.floor(Math.random() * 1000)
  };
};

export const updateBook = async (id, data) => {
  // Simula sucesso para notas criadas localmente (ID > 1000)
  if (id > 1000) return { ...data, id, userId: 1 };

  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...data, userId: 1 }),
  });
  if (!res.ok) throw new Error('Erro ao atualizar nota');
  return res.json();
};

export const deleteBook = async (id) => {
  // Simula sucesso para notas criadas localmente (ID > 1000)
  if (id > 1000) return true;

  const res = await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Erro ao deletar nota');
  return true;
};