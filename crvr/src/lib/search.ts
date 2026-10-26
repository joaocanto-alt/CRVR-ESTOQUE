export function normalizeSearch(value: string | null | undefined) {
  return (value ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("pt-BR")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function distance(a: string, b: string) {
  if (a === b) return 0;
  if (!a.length) return b.length;
  if (!b.length) return a.length;

  const prev = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    let left = i;
    let diagonal = i - 1;
    for (let j = 1; j <= b.length; j++) {
      const up = prev[j];
      const next = a[i - 1] === b[j - 1]
        ? diagonal
        : 1 + Math.min(diagonal, up, left);
      diagonal = up;
      prev[j] = next;
      left = next;
    }
  }
  return prev[b.length];
}

function directMatch(query: string, hay: string) {
  if (hay.includes(query)) return true;
  const queryTokens = query.split(" ").filter(Boolean);
  const hayTokens = hay.split(" ").filter(Boolean);
  return queryTokens.every(qt => hayTokens.some(ht => ht.startsWith(qt)));
}

function fuzzyTokenMatch(query: string, candidate: string) {
  if (query === candidate) return true;
  if (query.length < 4) return false;

  // Busca aproximada só aceita erros pequenos em palavras de tamanho parecido.
  const tolerance = query.length >= 7 ? 2 : 1;
  if (Math.abs(query.length - candidate.length) > tolerance) return false;
  return distance(query, candidate) <= tolerance;
}

function fuzzyMatch(query: string, hay: string) {
  const queryTokens = query.split(" ").filter(Boolean);
  const hayTokens = hay.split(" ").filter(Boolean);
  return queryTokens.every(qt => hayTokens.some(ht => fuzzyTokenMatch(qt, ht)));
}

// Use esta função quando há uma lista inteira. Primeiro retorna SOMENTE resultados
// normais (ignorando acentos). A busca aproximada só entra se nenhum resultado
// normal existir.
export function smartFilter<T>(
  items: T[],
  query: string,
  getValues: (item: T) => Array<string | null | undefined>
) {
  const q = normalizeSearch(query);
  if (!q) return items;

  const prepared = items.map(item => ({
    item,
    hay: normalizeSearch(getValues(item).filter(Boolean).join(" ")),
  }));

  const direct = prepared.filter(({ hay }) => directMatch(q, hay));
  if (direct.length > 0) return direct.map(({ item }) => item);

  return prepared
    .filter(({ hay }) => fuzzyMatch(q, hay))
    .map(({ item }) => item);
}

// Mantido para usos pontuais fora de listas.
export function smartSearch(
  query: string,
  ...values: Array<string | null | undefined>
) {
  const q = normalizeSearch(query);
  if (!q) return true;
  const hay = normalizeSearch(values.filter(Boolean).join(" "));
  return directMatch(q, hay) || fuzzyMatch(q, hay);
}
