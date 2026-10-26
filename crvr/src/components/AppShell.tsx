"use client";
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {Home,Boxes,ArrowUpFromLine,ArrowDownToLine,History,Camera} from 'lucide-react';
import {BrandMark} from './BrandMark';
const nav=[['/','Início',Home],['/estoque','Materiais',Boxes],['/nova-entrega','Retiradas',ArrowUpFromLine],['/entrada','Entradas',ArrowDownToLine],['/historico','Histórico',History],['/solicitacoes','Lista por foto',Camera]] as const;
export function AppShell({children}:{children:React.ReactNode}){const p=usePathname();return <div className="crvr-desktop-shell"><aside className="crvr-sidebar"><div className="sidebar-brand"><BrandMark light/></div><nav className="sidebar-nav">{nav.map(([href,label,Icon])=><Link key={href} href={href} className={`sidebar-link ${(href==='/'?p==='/':p.startsWith(href))?'active':''}`}><Icon size={18}/><span>{label}</span></Link>)}</nav><div className="sidebar-user"><div className="user-avatar"><Boxes size={20}/></div><div><b>CRVR Estoque</b><small>Controle de materiais</small></div></div></aside><div className="crvr-workspace"><main>{children}</main></div></div>}
