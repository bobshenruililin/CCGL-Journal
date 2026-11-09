type PersonName='Mina'|'Jules'|'Dev';
export function PixelPerson({name,x=0,y=0,scale=1,back=false}:{name:PersonName;x?:number;y?:number;scale?:number;back?:boolean}) {
 const colors={Mina:['#b85b41','#d9a57f','#3e2f34'],Jules:['#638778','#bd8a65','#393332'],Dev:['#d5a354','#c99a79','#303d43']}[name];
 return <g transform={`translate(${x} ${y}) scale(${scale})`} shapeRendering="crispEdges">
 <ellipse cx="10" cy="32" rx="12" ry="3" fill="#212c32" opacity=".25"/>
 <path d="M5 24h6v10H3v-3h2zm8 0h6v7h2v3h-8z" fill="#34454b"/>
 <path d="M3 13h17v13H3zM0 16h4v10H0zm20 0h4v10h-4z" fill={colors[0]}/>
 <path d="M0 25h4v4H0zm20 0h4v4h-4z" fill={colors[1]}/>
 <path d="M5 2h13v12H5zM3 5h3v6H3zm15 0h3v6h-3z" fill={colors[1]}/>
 <path d={name==='Jules'?'M3 1h15v3h3v12h-4V6H7v9H2V4h1z':name==='Mina'?'M5 0h12v2h4v7h-4V5H6v4H3V3h2zM1 8h4v8H1z':'M5 0h13v2h3v6h-4V5H5v3H3V3h2z'} fill={colors[2]}/>
 {!back&&<><path d="M8 7h2v2H8zm7 0h2v2h-2z" fill="#2d2b30"/><path d="M11 11h3v1h-3z" fill="#8e5c49"/></>}
 {back&&<path d="M5 4h13v7H5z" fill={colors[2]}/>}
 </g>
}
export default function PixelRoom({scene=0,aftermath=false}:{scene?:number;aftermath?:boolean}) {
 const day=scene>0; const panel=scene===2;
 return <svg className="pixel-room" viewBox="0 0 320 186" role="img" aria-label={panel?'Mina, Jules and Dev face a panel across a table in a sunlit campus room.':day?'Three teammates gather around a table in a campus seminar room before rehearsal.':'Mina and Jules work on a presentation in a warmly lit library as rain falls beyond the windows.'} shapeRendering="crispEdges">
 <defs><pattern id="floor" width="50" height="18" patternUnits="userSpaceOnUse"><rect width="50" height="18" fill={day?'#a29174':'#7e7564'}/><path d="M0 17h50M1 0v17" stroke={day?'#9b876b':'#71685b'} strokeWidth="1"/></pattern><pattern id="books" width="30" height="22" patternUnits="userSpaceOnUse"><rect width="30" height="22" fill="#4c5b58"/><path d="M2 4h4v15H2z" fill="#b78b61"/><path d="M8 2h5v17H8z" fill="#788b78"/><path d="M15 5h3v14h-3z" fill="#c4aa7e"/><path d="M21 3h6v16h-6z" fill="#9f6352"/></pattern></defs>
 <rect width="320" height="186" fill={day?'#d4cbb4':'#787e73'}/><rect y="105" width="320" height="81" fill="url(#floor)"/><rect y="101" width="320" height="6" fill="#59615a"/>
 <path d="M0 0h320v6H0zM0 0h6v106H0zM314 0h6v106h-6z" fill={day?'#b5b49c':'#4d5e58'}/>
 <rect x="25" y="17" width="155" height="76" fill="#d7c7a1"/><rect x="29" y="21" width="147" height="66" fill={day?'#a8c0be':'#293f4b'}/>
 <path d="M30 61h15V43h21v10h18V31h24v17h16V36h21v18h31v33H30z" fill={day?'#839e9e':'#344b55'}/>
 <path d="M30 76h23V60h29v16h16V55h28v15h29V61h21v26H30z" fill={day?'#82978a':'#243840'}/>
 {[40,64,93,117,144,164].map((x,i)=><g key={x}><rect x={x} y={46+i%3*11} width="3" height="4" fill={day?'#d2d2af':'#bdad6e'} opacity=".7"/><rect x={x} y={58+i%3*7} width="3" height="4" fill="#c6bb88" opacity=".5"/></g>)}
 {!day&&<g className="rain" stroke="#8ba3a8" opacity=".35">{Array.from({length:17},(_,i)=><path key={i} d={`M${34+i*8} ${23+(i*13)%55}l-2 7`}/>)}</g>}
 <path d="M76 21h4v66h-4zm49 0h4v66h-4zM29 52h147v4H29z" fill="#a99c7e"/><rect x="21" y="88" width="163" height="7" fill="#c6b28b"/>
 <rect x="207" y="19" width="76" height="58" fill="#b6a17c"/><rect x="211" y="23" width="68" height="49" fill={panel?'#e5dec6':'#a9ad90'}/>
 {panel?<><path d="M224 39h41v3h-41zm0 8h31v2h-31zm0 7h38v2h-38z" fill="#667971"/><path d="M218 32h8v2h-8z" fill="#ba7a54"/></>:<><path d="M219 31h17v17h-17z" fill="#ead6aa"/><path d="M244 28h21v24h-21z" fill="#c37e5e"/><path d="M228 51h29v15h-29z" fill="#e0cfac"/><path d="M223 37h9m16-3h13m-13 5h10m-26 19h20" stroke="#867a5d"/></>}
 <rect x="207" y="81" width="80" height="31" fill="#594c40"/><rect x="212" y="83" width="70" height="23" fill="url(#books)"/>
 <path d="M304 98v-9h-5v-7h-4v17h-5V86h-5v6h-5v10h14v8h5v-8h11v-9h-5z" fill="#4d7461"/><path d="M289 105h16v13h-16z" fill="#b97b57"/>
 {!day&&<><path d="M183 20v78h4V20z" fill="#4c514b"/><path d="M172 20h25l-5-12h-15z" fill="#dbc184"/><path d="M176 25l-30 85h76l-32-85z" fill="#e9ca83" opacity=".12"/></>}
 <ellipse cx="148" cy="155" rx="95" ry="23" fill="#2d3938" opacity=".16"/>
 {panel?<><PixelPerson name="Mina" x={100} y={94} scale={1.4}/><PixelPerson name="Jules" x={145} y={95} scale={1.4}/><PixelPerson name="Dev" x={193} y={95} scale={1.4}/></>:<><path d="M87 115h28v34H87zM192 117h29v34h-29z" fill="#4a5c56"/><PixelPerson name="Mina" x={83} y={84} scale={1.6}/><PixelPerson name="Jules" x={181} y={88} scale={1.6}/>{day&&<PixelPerson name="Dev" x={249} y={116} scale={1.4}/>}</>}
 <path d="M64 123h174v14H64z" fill="#b8986c"/><path d="M64 137h174v7H64z" fill="#786147"/><path d="M72 144h8v29h-8zm150 0h8v29h-8z" fill="#5d5143"/>
 <path d="M126 105h37v27h-37z" fill="#3f5054"/><path d="M129 108h31v20h-31z" fill={aftermath?'#91b1a2':'#c4cbb8'}/><path d="M121 132h47v4h-47z" fill="#80918b"/><path d="M133 113h18v2h-18zm0 5h23v2h-23zm0 5h13v1h-13z" fill="#788d86"/>
 <path d="M178 124h26v9h-26z" fill="#eee2c5"/><path d="M181 126h16v1h-16zm0 3h13v1h-13z" fill="#a8a18a"/><path d="M209 117h9v13h-9zm9 2h4v8h-4z" fill="#b66e50"/><path d="M87 122h13v5H87z" fill="#ccab65"/>{day&&<g><rect x="180" y="115" width="11" height="8" fill="#cf783e"/><rect x="182" y="117" width="7" height="3" fill="#e6d2a0"/></g>}
 {!day&&<path className="steam" d="M212 112v-3h2v-4h-1" fill="none" stroke="#e9dac0" opacity=".65"/>}
 {panel&&<><PixelPerson name="Mina" x={85} y={148} scale={1.4} back/><PixelPerson name="Dev" x={191} y={149} scale={1.4} back/></>}
 <rect y="181" width="320" height="5" fill="#4c534a" opacity=".4"/>
 </svg>
}
