# Acesso e segurança do CRVR Estoque

## Como funciona
- Ninguém vê nada sem login. Os dados ficam no servidor (Supabase), não no código do site nem no navegador.
- Dois perfis: **admin** (altera tudo) e **viewer** (só consulta: Início, Materiais, Funcionários e Histórico).
- A regra é aplicada pelo banco (RLS). Mesmo que alguém mexa no navegador, o servidor recusa a gravação de quem não é admin.
- Contas só são criadas pelo administrador no painel do Supabase. Conta sem perfil não vê nada.
- Sai sozinho após 30 minutos sem uso. Bloqueio de 30 s após 5 senhas erradas (o Supabase também limita tentativas).
- Cabeçalhos de segurança, site fora do Google e nenhum dado do estoque dentro do código publicado.

## Configuração (uma vez)
1. supabase.com > New project (guarde a senha do banco).
2. SQL Editor > cole `supabase/schema.sql` > Run.
3. Authentication > Sign In / Providers: desligue **Allow new users to sign up**. Em Password, defina senha mínima de 10 caracteres.
4. Authentication > Users > Add user (marque Auto Confirm User) para cada pessoa.
5. SQL Editor: rode o `update auth.users ...` do fim do schema.sql para cada e-mail (admin ou viewer).
6. Project Settings > API: copie **Project URL** e a chave **anon public**.
7. Netlify > Project configuration > Environment variables: `NEXT_PUBLIC_SUPABASE_URL` e `NEXT_PUBLIC_SUPABASE_ANON_KEY`. Depois: Deploys > Trigger deploy > Clear cache and deploy site.
8. Entre como admin e importe a planilha em Materiais > Importar Excel/CSV.
9. GitHub: deixe o repositório **privado** (Settings > Danger Zone > Change visibility).

Nunca use a chave `service_role` no site.

## Ao atualizar o app
Rode `supabase/schema.sql` de novo no SQL Editor (cria as tabelas `closings` e `signatures`, usadas pelo Fechamento diário e pelas Assinaturas). Sem isso, essas duas telas não conseguem salvar.
