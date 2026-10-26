import ExcelJS from "exceljs";

export type ExportColumn={header:string;key:string;width:number;left?:boolean};
export type ExportMetric={label:string;value:string|number};

const GREEN="075E3D", GREEN2="0B7A4B", LIGHT="EAF5EF", PALE="F5FAF7";
const BORDER="D6E4DC", TEXT="17352A", MUTED="63756D", WHITE="FFFFFF";

function ptDateTime(d=new Date()){
 return `${d.toLocaleDateString("pt-BR")} às ${d.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"})}`;
}
async function logoDataUrl(){
 const response=await fetch("/crvr-export-logo.png");
 const blob=await response.blob();
 return await new Promise<string>((resolve,reject)=>{
  const reader=new FileReader();reader.onload=()=>resolve(String(reader.result));reader.onerror=reject;reader.readAsDataURL(blob);
 });
}
export function prettyStatus(v:unknown){
 const s=String(v??"");
 return ({EM_ESTOQUE:"Em estoque",ESTOQUE_BAIXO:"Estoque baixo",SEM_ESTOQUE:"Sem estoque",MINIMO_NAO_CONFIGURADO:"Mínimo não configurado",CONFIRMED:"Confirmada",CANCELLED:"Cancelada",DRAFT:"Rascunho",ENTRADA:"Entrada",SAIDA_ENTREGA:"Saída",AJUSTE:"Ajuste",CORRECAO:"Correção"} as Record<string,string>)[s]??s.replaceAll("_"," ");
}
export async function exportStyledXlsx(opts:{
 filename:string;sheetName:string;title:string;subtitle:string;description:string;
 columns:ExportColumn[];rows:Record<string,unknown>[];metrics:ExportMetric[];
}){
 const wb=new ExcelJS.Workbook();
 wb.creator="CRVR - Controle de Estoque";
 wb.created=new Date();
 const ws=wb.addWorksheet(opts.sheetName.slice(0,31),{
  views:[{state:"frozen",ySplit:8}],
  pageSetup:{orientation:"landscape",fitToPage:true,fitToWidth:1,fitToHeight:0,paperSize:9,margins:{left:.25,right:.25,top:.35,bottom:.35,header:.15,footer:.15}}
 });
 const n=Math.max(opts.columns.length,6);
 const end=String.fromCharCode(64+Math.min(n,26));

 // Header / brand area
 ws.mergeCells(`A1:B3`);
 try{
  const imageId=wb.addImage({base64:await logoDataUrl(),extension:"png"});
  ws.addImage(imageId,{tl:{col:.08,row:.15},ext:{width:170,height:70}});
 }catch{}
 ws.mergeCells(`C1:${end}1`); ws.getCell("C1").value=opts.title.toUpperCase();
 ws.getCell("C1").font={name:"Arial",size:20,bold:true,color:{argb:GREEN}};
 ws.getCell("C1").alignment={vertical:"middle"};
 ws.mergeCells(`C2:${end}2`); ws.getCell("C2").value=opts.subtitle.toUpperCase();
 ws.getCell("C2").font={name:"Arial",size:11,bold:true,color:{argb:MUTED}};
 ws.mergeCells(`C3:${end}3`); ws.getCell("C3").value=opts.description;
 ws.getCell("C3").font={name:"Arial",size:9,color:{argb:MUTED}};
 ws.getRow(1).height=27;ws.getRow(2).height=18;ws.getRow(3).height=18;

 // KPI ribbon
 const metricCount=Math.min(opts.metrics.length,4);
 const spans=Math.max(1,Math.floor(n/metricCount));
 for(let i=0;i<metricCount;i++){
  const start=1+i*spans, finish=i===metricCount-1?n:Math.min(n,start+spans-1);
  ws.mergeCells(5,start,5,finish); ws.mergeCells(6,start,6,finish);
  const label=ws.getCell(5,start), value=ws.getCell(6,start);
  label.value=opts.metrics[i].label;value.value=opts.metrics[i].value;
  label.font={name:"Arial",size:8,color:{argb:MUTED},bold:true};
  value.font={name:"Arial",size:12,color:{argb:GREEN},bold:true};
  label.alignment=value.alignment={horizontal:"center",vertical:"middle"};
  for(let c=start;c<=finish;c++){ws.getCell(5,c).fill={type:"pattern",pattern:"solid",fgColor:{argb:LIGHT}};ws.getCell(6,c).fill={type:"pattern",pattern:"solid",fgColor:{argb:LIGHT}};}
 }
 ws.getRow(5).height=18;ws.getRow(6).height=23;

 // Table header
 const headerRow=8;
 opts.columns.forEach((col,index)=>{
  const cell=ws.getCell(headerRow,index+1);cell.value=col.header;
  cell.font={name:"Arial",size:10,bold:true,color:{argb:WHITE}};
  cell.fill={type:"pattern",pattern:"solid",fgColor:{argb:GREEN}};
  cell.alignment={horizontal:col.left?"left":"center",vertical:"middle",wrapText:true};
  cell.border={top:{style:"thin",color:{argb:GREEN2}},bottom:{style:"thin",color:{argb:GREEN2}},left:{style:"thin",color:{argb:"3B8068"}},right:{style:"thin",color:{argb:"3B8068"}}};
  ws.getColumn(index+1).width=col.width;
 });
 ws.getRow(headerRow).height=30;

 opts.rows.forEach((row,ridx)=>{
  const excelRow=headerRow+1+ridx;
  opts.columns.forEach((col,cidx)=>{
   const cell=ws.getCell(excelRow,cidx+1);cell.value=(row[col.key]??"") as ExcelJS.CellValue;
   cell.font={name:"Arial",size:9,color:{argb:TEXT}};
   cell.alignment={horizontal:col.left?"left":"center",vertical:"middle",wrapText:true};
   cell.fill={type:"pattern",pattern:"solid",fgColor:{argb:ridx%2===0?WHITE:PALE}};
   cell.border={bottom:{style:"hair",color:{argb:BORDER}},left:{style:"hair",color:{argb:BORDER}},right:{style:"hair",color:{argb:BORDER}}};
   if(/status|situação|tipo/i.test(col.header)){
    const val=String(cell.value??"").toLocaleLowerCase("pt-BR");
    if(val.includes("baixo")||val.includes("cancel"))cell.font={...cell.font,bold:true,color:{argb:"B7791F"}};
    else if(val.includes("sem estoque"))cell.font={...cell.font,bold:true,color:{argb:"C53030"}};
    else if(val.includes("estoque")||val.includes("confirm")||val.includes("entrada"))cell.font={...cell.font,bold:true,color:{argb:GREEN2}};
   }
  });
  ws.getRow(excelRow).height=22;
 });
 ws.autoFilter={from:{row:headerRow,column:1},to:{row:headerRow,column:n}};

 const footer=headerRow+opts.rows.length+2;
 ws.mergeCells(footer,1,footer,n);
 const fc=ws.getCell(footer,1);fc.value=`CRVR • Sistema de Controle de EPIs e Materiais • São Leopoldo/RS • Relatório gerado em ${ptDateTime()}`;
 fc.fill={type:"pattern",pattern:"solid",fgColor:{argb:GREEN}};
 fc.font={name:"Arial",size:9,bold:true,color:{argb:WHITE}};
 fc.alignment={horizontal:"center",vertical:"middle"};ws.getRow(footer).height=25;

 const buffer=await wb.xlsx.writeBuffer();
 const blob=new Blob([buffer],{type:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"});
 const url=URL.createObjectURL(blob);const a=document.createElement("a");a.href=url;a.download=opts.filename;a.click();URL.revokeObjectURL(url);
}
