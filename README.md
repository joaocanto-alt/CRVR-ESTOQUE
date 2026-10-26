# CRVR Estoque — versão simplificada

Este projeto reaproveita a base visual, os assets institucionais e a estrutura Next.js do `CRVR-14-layout-referencia`, adaptados para um catálogo de materiais e registro de movimentações sem controle de saldo.

## Funcionalidades nesta versão
- Catálogo de materiais com cadastro, pesquisa, exclusão e importação Excel/CSV.
- Retiradas com nome simples, setor, um ou vários materiais e quantidades.
- Entradas registradas sem alterar saldo.
- Histórico com pesquisa e filtro por tipo.
- Importação assistida de folha por foto com OCR no navegador e revisão manual antes de confirmar.
- Layout responsivo e navegação simplificada.

## Dados nesta versão
Os dados ficam no `localStorage` do navegador para permitir testar o fluxo sem Supabase. Isso significa que os dados são locais ao navegador/dispositivo e não são sincronizados entre celulares ou computadores. Antes de uso real, conecte o serviço ao Supabase.

## Executar em ambiente compatível com Next.js
1. Importe o ZIP para um ambiente de desenvolvimento compatível com Next.js 15.
2. Instale dependências usando a interface do ambiente, se ele oferecer essa opção.
3. Execute o script `dev` pela interface do ambiente.

O projeto usa `npm run dev` como script padrão, mas não é necessário executar comandos no PC se for usado um ambiente cloud que ofereça execução pelo navegador.

## Importação por foto
A função usa Tesseract.js no navegador para tentar reconhecer texto. Escrita manuscrita pode não ser reconhecida corretamente, então todas as linhas devem ser conferidas e corrigidas antes da confirmação. Esta versão não usa um serviço de IA externo.

## Supabase
A conexão com Supabase não foi ativada nesta versão simplificada. As páginas usam `src/lib/stockStore.ts` como camada local de dados; essa camada deve ser substituída por chamadas ao Supabase quando o schema do banco estiver definido.
