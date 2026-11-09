import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {title:'CCGL Journal — The things we carry',description:'A playable journal about small decisions, real trade-offs, and the people on the other side of your choices.',icons:{icon:'/favicon.svg'}};
export default function RootLayout({children}:{children:React.ReactNode}) {return <html lang="en"><body>{children}</body></html>;}
