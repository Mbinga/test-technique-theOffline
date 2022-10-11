import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import ResumeItem from "../components/ResumeItem";

const Report = () => {
    const router = useRouter();
    const mesquery = router.query;
    //* Création d'une array d'objets pour le map
    const result = Object.entries(mesquery).map((entry) => {
        return { [entry[0]]: entry[1] };
    });
    return (
        <div>
            <Head>
                <title>Summary</title>
            </Head>
            <section>
                <div></div> <h2>My Backpack</h2>
                <div className="resumecontainer">
                    {result.map((item, index) => {
                        return <ResumeItem item={item} key={index} />;
                    })}
                </div>
                Total = 0g
            </section>
        </div>
    );
};

export default Report;
