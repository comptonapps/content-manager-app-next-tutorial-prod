import { useState } from 'react';

const DEFAULT_DATA = {
    title: "",
    description: "",
    link: "",
    priority: 2,
    timeToFinish: 60
};

const ResourceForm = ({onFormSubmit, initialData}) => {
    const [form, setForm] = useState(initialData || DEFAULT_DATA);

    const handleChange = (evt) => {
        const { name, value } = evt.target;
        setForm({
            ...form,
            [name] : value
        })
    };

    const resetForm = () => setForm(DEFAULT_DATA);
    return (
        <div className="resource-form">
            <h1 className="title">Create New Resource</h1>
            <form>
                <div className="field">
                    <label className="label">Title</label>
                    <div className="control">
                        <input
                            onChange={handleChange}
                            name="title"
                            className="input"
                            type="text"
                            placeholder="Learn Next.js and Sanity IO"
                            value={form.title}
                        />
                    </div>
                </div>
                <div className="field">
                    <label className="label">Description</label>
                    <div className="control">
                        <textarea
                            name="description"
                            onChange={handleChange}
                            value={form.description}
                            className="textarea"
                            placeholder="Learn these technologies because they are very popular for SEO"
                        />
                    </div>
                </div>
                <div className="field">
                    <label className="label">Link</label>
                    <div className="control">
                        <input
                            name="link"
                            onChange={handleChange}
                            value={form.link}
                            className="input"
                            type="text"
                            placeholder="https://academy.eincode.com"
                        />
                    </div>
                </div>
                <div className="field">
                    <label className="label">Priority</label>
                    <div className="control">
                        <div className="select">
                            <select
                                value={form.priority}
                                name="priority"
                                onChange={handleChange}
                            >
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="field">
                    <label className="label">Time to Finish</label>
                    <div className="control">
                        <input
                            value={form.timeToFinish}
                            onChange={handleChange}
                            name="timeToFinish"
                            className="input"
                            type="number"
                            placeholder="60"
                        />
                    </div>
                    <p className="help">Time in Minutes</p>
                </div>
                <div className="field is-grouped">
                <div className="control">
                    <button type="button" onClick={() => onFormSubmit(form)} className="button is-link">Submit</button>
                </div>
                <div className="control">
                    <button type="button" onClick={resetForm} className="button is-link is-light">Cancel</button>
                </div>
                </div>
            </form>
        </div>
    )
};

export default ResourceForm;