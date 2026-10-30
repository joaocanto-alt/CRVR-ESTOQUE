# CRVR Estoque

Next.js 15 + Supabase (login, perfis admin/consulta e dados no servidor).

## Comandos
```
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Configuração externa
Variáveis de ambiente (`.env.local` e Netlify):
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

Banco: rode `supabase/schema.sql` no SQL Editor do Supabase (pode rodar de novo ao atualizar o app) e siga o `SEGURANCA.md` para criar contas e perfis.
