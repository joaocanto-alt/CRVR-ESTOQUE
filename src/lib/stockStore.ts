export type Material = { id:string; nome:string; tamanho:string; categoria:string; descricao:string; createdAt:string };
export type Movement = { id:string; tipo:'ENTRADA'|'RETIRADA'; materialId:string; materialNome:string; tamanho:string; quantidade:number; nomePessoa:string; setor:string; observacao:string; createdAt:string };
const MATERIALS='crvr-materials-v1', MOVES='crvr-movements-v1';
function read<T>(key:string,fallback:T):T { if(typeof window==='undefined') return fallback; try { const v=localStorage.getItem(key); return v?JSON.parse(v):fallback; } catch { return fallback; } }
function write<T>(key:string,v:T){ if(typeof window!=='undefined') localStorage.setItem(key,JSON.stringify(v)); }
export const getMaterials=()=>read<Material[]>(MATERIALS,[]);
export const saveMaterials=(items:Material[])=>write(MATERIALS,items);
export const getMovements=()=>read<Movement[]>(MOVES,[]);
export const saveMovement=(m:Movement)=>write(MOVES,[m,...getMovements()]);
export const makeId=()=>typeof crypto!=='undefined'&&'randomUUID'in crypto?crypto.randomUUID():`${Date.now()}-${Math.random().toString(16).slice(2)}`;
export const demoMaterials:Material[]=[
 {id:'demo-1',nome:'Óculos de segurança preto',tamanho:'Único',categoria:'Proteção ocular',descricao:'',createdAt:'2026-01-01'},
 {id:'demo-2',nome:'Luva de proteção',tamanho:'8',categoria:'Proteção das mãos',descricao:'',createdAt:'2026-01-01'},
 {id:'demo-3',nome:'Botina de segurança',tamanho:'42',categoria:'Calçados',descricao:'',createdAt:'2026-01-01'},
];
