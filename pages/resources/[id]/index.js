import Layout from "/components/Layout";
import { useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';
import ResourceLabel from '/components/ResourceLabel';
import moment from 'moment';

const ResourceDetail = ({resource}) => {
    useEffect(() => {

    }, [])

    const activateResource = async () => {
        try {
            const url = "/api/resources/";
            await axios.patch(url, { ...resource, status: "active"})
            location.reload();
        } catch (error) {
            console.log(error);
            alert("cannot activate resource");
        }

    }

    return (
        <Layout>
            <section className="hero ">
                <div className="hero-body">
                    <div className="container">
                        <section className="section">
                            <div className="columns">
                                <div className="column is-8 is-offset-2">
                                    <div className="content is-medium">
                                        <h2 className="subtitle is-4">{moment(resource.createdAt).format("LLLL")}<ResourceLabel status={resource.status}/></h2>
                                        <h1 className="title">{resource.title}</h1>
                                        <p>{resource.description}</p>
                                        <p>Time to Finish: {resource.timeToFinish}</p>
                                        { resource.status === "inactive" &&
                                        <>
                                        <Link href={`/resources/${resource.id}/edit`}>
                                            <a className="button is-warning">
                                            Update
                                            </a>
                                        </Link>
                                        <button className="button is-success ml-1" onClick={activateResource}>Activate</button>
                                        </>
                                        }
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </section>
        </Layout>
    )
};


export async function getServerSideProps({params}) {
    const dataRes = await fetch(`${process.env.API_URL}/resources/` + params.id);
    const data = await dataRes.json()
    return {
        props: {
            resource: data
        }
    }
}

export default ResourceDetail;