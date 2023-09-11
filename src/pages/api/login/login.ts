import type { NextApiRequest, NextApiResponse } from "next";
import { setCookie } from 'nookies';
import { verifyEncriptedPassword, encriptPassword } from "@/lib/encriptPasswords";



type Data = {

    status: string,
    messageError: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {



    try {

        if (!req.body?.email || !req.body?.password || typeof req.body?.keepSession !== "boolean") {

            throw new Error("El campo del email o de la contraseña estan vacios");
        }


        return res.status(200).json({ status: "ok", messageError: "" });


    } catch (e: any) {

        return res.status(500).json({ status: "error", messageError: e?.message });
    }
}


