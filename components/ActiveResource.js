import React from 'react'
import Link from 'next/link'
import { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';

export default function ActiveResource() {

    const [resource, setResource] = useState({});
    const [seconds, setSeconds] = useState();

    const completeResource = async () => {
        try {
            const url = "/api/resources/";
            await axios.patch(url, { ...resource, status: "complete"})
            location.reload();
        } catch (error) {
            console.log(error);
            alert("cannot complete resource");
        }

    }

    useEffect(() => {
        async function fetchResource() {
            const res = await axios.get("/api/activeresource");
            const resource = res.data;
            const timeToFinish = parseInt(resource.timeToFinish, 10);
            const elapsedTime = moment().diff(moment(resource.activationTime), "seconds");
            const updatedTimeToFinish = (timeToFinish * 60) - elapsedTime;
            if (updatedTimeToFinish >= 0) {
                resource.timeToFinish = updatedTimeToFinish;
                setSeconds(updatedTimeToFinish >= 0 ? updatedTimeToFinish : 0);
            }

            setResource(resource);
        }
        fetchResource();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setSeconds(seconds - 1);
            if (seconds <= 0) {
                clearInterval(interval);
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [seconds])

    const hasResource = resource && resource.id

    return (
        <div className="active-resource">
            <h1 className="resource-name">{hasResource ? resource.title : "No active resource"}</h1>
            <div className="time-wrapper">
                { hasResource &&
                    ( seconds > 0 ?
                        <h2 className="elapsed-time">
                            {seconds}
                        </h2> :
                        <h2 className="elapsed-time">
                            <button
                                onClick={completeResource}
                                className="button is-success"
                            >
                                Click and Done!
                            </button>
                        </h2>
                    )
                }
            </div>
            {
                hasResource ?
                <Link href={`/resources/${resource.id}`}>
                    <a className="button">Go to resource</a>
                </Link> :
                <Link href="/resources">
                    <a className="button">Go to resources</a>
                </Link>
            }

        </div>
    )
}
