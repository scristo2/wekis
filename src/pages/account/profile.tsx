import { NextPage } from "next";
import Head from "next/head";
import Layout from "@/components/Layout";
interface ProfileProps { }

const Profile: NextPage<ProfileProps> = (props) => {

    return (<>
        <Head>
            <title>my account</title>
        </Head>
        <Layout>
            <div></div>
            <div><p>my account</p></div>
            <div></div>
        </Layout>
    </>)
}

export default Profile;