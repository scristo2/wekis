import React, { useState } from "react";
import Link from "next/link";
import { NextPage } from "next";
import translate from "../../public/lang/home/login.json";
import translateLoginError from "../../public/lang/home/login/errorLoginText.json"
import { emailFormat } from "@/lib/patterns";
import _fetch from "isomorphic-fetch";
import { useRouter } from "next/router";
interface LoginProps {

    locale: string
}

const Login: NextPage<LoginProps> = (props) => {

    const router = useRouter();

    const [emailOrUsername, setEmailOrUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [checkedKeepSession, setCheckedKeepSession] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [visibleErrorMessage, setVisibleErrorMessage] = useState<boolean>(false);
    const [textErrorMessage, setTextErrorMessage] = useState<string>("");

    const handleCheckBoxChange = () => {

        setCheckedKeepSession(!checkedKeepSession);
        return;
    }


    const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();
        setIsLoading(true);
        setVisibleErrorMessage(false);

        try {

            if (emailOrUsername.length < 1) {
                throw Error("email empty");
            }

            if (password.length < 1) {

                throw Error("password empty")
            }

            if (!emailFormat(emailOrUsername)) {

                throw Error("email invalid");
            }



            const res = await _fetch("/api/login/login", {

                method: "POST",
                body: JSON.stringify({ email: "", password: password, keepSession: checkedKeepSession }),
                headers: {

                    'Content-Type': 'application/json'
                }

            });



            if (res.ok) {

                const data = await res.json()
                    .then((result: { status: string, messageError: string }) => result);

                console.log(data);

            } else {

                throw Error(res.status.toString());
            }



        } catch (e: any) {

            setVisibleErrorMessage(true);

            switch (e.toString()) {

                case "Error: email empty":
                    {/*@ts-ignore*/ }
                    setTextErrorMessage(translateLoginError.emailEmpty[props.locale])
                    break;
                case "Error: password empty":
                    {/*@ts-ignore*/ }
                    setTextErrorMessage(translateLoginError.passwordEmpty[props.locale])
                    break;

                case "Error: email invalid":
                    {/*@ts-ignore*/ }
                    setTextErrorMessage(translateLoginError.invalidEmailFormat[props.locale])
                    break;


                default:
                    setTextErrorMessage(e.toString());
                    break;
            }

        } finally {

            setIsLoading(false);
        }
    }


    return (<form onSubmit={handleSubmitForm} className={`col-md-8 col-lg-6 col-xl-5 mt-5`}>
        <div className={`mt-3`}>
            <input type="text" className={`form-control`} value={emailOrUsername} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setEmailOrUsername(e.target.value);
                setVisibleErrorMessage(false);
                {/*@ts-ignore*/ }
            }} placeholder={`${translate.placeholderEmail[props.locale]}`} />
        </div>
        <div className={`mt-5`}>
            <input type="password" value={password} maxLength={12} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setPassword(e.target.value);
                setVisibleErrorMessage(false);
                {/*@ts-ignore*/ }
            }} className={`form-control`} placeholder={`${translate.placeholderPassword[props.locale]}`} />
        </div>
        <div className={`d-flex align-items-center mt-4`}>
            <div><input type="checkbox" checked={checkedKeepSession} onChange={handleCheckBoxChange} name="" id="" /></div>
            {/*@ts-ignore*/}
            <div className={`mx-2`}><p className="m-0">{translate.keepsessionText[props.locale]}</p></div>
        </div>
        <div className={`mt-4 ${visibleErrorMessage ? "" : "d-none"}`}>
            <div className={`alert alert-danger`} role="alert">
                {textErrorMessage}
            </div>
        </div>
        <div className={`mt-5 ${isLoading ? "d-none" : ""}`}>
            {/*@ts-ignore*/}
            <input type="submit" className="btn btn-success w-100" value={`${translate.submitButtonText[props.locale]}`} />
        </div>
        <div className={`justify-content-center ${isLoading ? "d-flex" : "d-none"}`}>
            <div className={`spinner-border text-primary`} role="status">
                <span className={`visually-hidden`}>Loading...</span>
            </div>
        </div>
        <div className={`d-flex justify-content-center mt-5`}>
            {/*@ts-ignore*/}
            <Link href={"#"}>{translate.resetPasswordText[props.locale]}</Link>
        </div>
    </form>)
}


export default Login;