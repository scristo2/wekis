import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {


    const { pathname } = request.nextUrl;
    const response = NextResponse.next();



    return response;
}   