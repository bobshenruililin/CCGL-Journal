export type Save = {
 version:1; page:number; choices:number[]; notes:string; clearType:boolean; still:boolean;
 furthestPage?:number; quoteSeen?:boolean;
};
export const initial:Save={version:1,page:0,furthestPage:0,choices:[],notes:'',clearType:false,still:false,quoteSeen:false};
export function isSave(value:unknown):value is Save {
 if(!value||typeof value!=='object')return false;
 const s=value as Save;
 return s.version===1&&Number.isInteger(s.page)&&s.page>=0&&s.page<=6
  &&Array.isArray(s.choices)&&s.choices.length<=3&&s.choices.every(c=>Number.isInteger(c)&&c>=0&&c<3)
  &&s.choices.length>=Math.ceil(s.page/2)&&typeof s.notes==='string'&&s.notes.length<=4000
  &&typeof s.clearType==='boolean'&&typeof s.still==='boolean'
  &&(s.furthestPage===undefined||(Number.isInteger(s.furthestPage)&&s.furthestPage>=s.page&&s.furthestPage<=6&&s.choices.length>=Math.ceil(s.furthestPage/2)))
  &&(s.quoteSeen===undefined||typeof s.quoteSeen==='boolean');
}
export function furthest(state:Save):number {return state.furthestPage??Math.max(state.page,Math.min(6,state.choices.length*2));}
export function choose(state:Save,index:number):Save {
 if(state.page===6||state.page%2===1||!Number.isInteger(index)||index<0||index>2)return state;
 const scene=Math.floor(state.page/2);
 if(state.choices[scene]===index)return state;
 return {...state,choices:[...state.choices.slice(0,scene),index],furthestPage:state.page,...(scene===0?{quoteSeen:false}:{})};
}
export function needsRewriteConfirmation(state:Save,index:number):boolean {
 const scene=Math.floor(state.page/2);
 return state.page<6&&state.page%2===0&&Number.isInteger(index)&&index>=0&&index<3&&state.choices[scene]!==index&&state.choices.length>scene+1;
}
export function advance(state:Save):Save {
 if(state.page===6||state.choices.length<=Math.floor(state.page/2))return state;
 return {...state,page:state.page+1,furthestPage:Math.max(furthest(state),state.page+1)};
}
export function visit(state:Save,page:number):Save {
 if(!Number.isInteger(page)||page<0||page>furthest(state))return state;
 return {...state,page,furthestPage:furthest(state)};
}
