import { NextRequest, NextResponse } from 'next/server'
import * as jose from 'jose'
export const config = {
    matcher: [ '/product'],
}
interface IAuth {
    name : string;
    value : {
        accessToken : string;
        user : {
            email : string;
            id : number
        }
    }
}
export async function middleware(request: NextRequest) {
    const cookie :  any = request.cookies.get('auth');
   
    if(!cookie || cookie.value == ''){
        return NextResponse.redirect('http://localhost:3000/login');
    }
    try {
        const decoded : any = await jose.jwtVerify(cookie.value, new TextEncoder().encode("refresh_token"),)
        if(decoded.payload.data.role != 1){
            return NextResponse.redirect('http://localhost:3000/login');
        }
      } catch (err) {
        return NextResponse.redirect('http://localhost:3000/login');
      }
}