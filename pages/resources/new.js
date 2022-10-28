import Layout from "components/Layout";
import { useState } from 'react';
import { useRouter} from 'next/router';
import axios from "axios";
import ResourceForm from 'components/ResourceForm';

const ResourceCreate = () => {
    const router = useRouter();

    const createResource = async (form) => {
        try {
            await axios.post("/api/resources", form);
            router.push("/");
        } catch(error) {
            alert(error.response.data);
        }

    }
    return (
        <Layout>
            <div className="container">
                <div className="columns">
                    <div className="column is-8 is-offset-2">
                        <ResourceForm onFormSubmit={createResource} />
                    </div>
                </div>
            </div>
        </Layout>
    )
};

export default ResourceCreate;