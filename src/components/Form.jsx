import '../styles/Form.css';
import { v4 as uuid } from 'uuid';


export default function Form({ formData, setFormData }) {
    const childProps = { setFormData, formData };
    return (
        <div className='left-half main-section'>
            <h1>Contact Info</h1>
            <br />
            <Section title='First Name' formKey='firstName' {...childProps} />
            <Section title='Last Name' formKey='lastName' {...childProps} />
            <Section title='Email' formKey='email' {...childProps} />
            <Section title='Phone' formKey='phone' {...childProps} />
            <br />
            <h1>Skills</h1>
            <br />
            <Skills {...childProps} />
        </div>
    )
}
//////
function Section({ title, formKey, type, formData, setFormData }) {
    if (!type) type = 'text';
    function onChange(e) {
        const value = e.target.value;
        const newFormData = { ...formData };
        newFormData[formKey] = value;
        setFormData(newFormData);
    }
    return (
        <div>
            <h1>{title}</h1>
            <input type={type} value={formData[formKey]} onChange={onChange}></input>
        </div>
    )
}
function Skills({ formData, setFormData }) {
    return (
        <div>
            {formData.skills.map((skill, index) => {
                function onChange(e) {
                    const newFormData = { ...formData };
                    newFormData.skills[index] = { value: e.target.value, id: skill.id };
                    setFormData(newFormData)
                }
                return (
                    <input type='text' value={skill.value} onChange={onChange} key={skill.id}></input>
                )
            })}
        </div>
    )
}

