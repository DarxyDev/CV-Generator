import '../styles/Form.css';
import { useState } from 'react';
import { v4 as uuid } from 'uuid';


export default function Form({ formData, setFormData }) {
    const childProps = { setFormData, formData };
    return (
        <div className='left-half main-section'>
            <Section title='Contact Info'>
                <ContactInfo {...childProps}/>
            </Section>
            <Section title='Skills'>
                <Skills {...childProps}/>
            </Section>
            <Section title='Education'>
            <Education {...childProps} />
            </Section>
        </div>
    )
}
//////
function Section({title, children}){
    return (
        <div className='Section'>
            <h1>{title}</h1>
            {children}
        </div>
    )
}
function TitleInput({ title, value, type, onChange }) {
    if (!type) type = 'text';
    return (
        <div className='TitleInput'>
            <h1>{title}</h1>
            <input type={type} value={value} onChange={onChange}></input>
        </div>
    )
}

function ContactInfo({ formData, setFormData }) {
    const childProps = { formData, setFormData }
    function onChange(e, formKey) {
        const newFormData = { ...formData };
        newFormData[formKey] = e.target.value;
        setFormData(newFormData);
    }
    return (
        <div className='ContactInfo'>
            <TitleInput title='First Name' value={formData.firstName} onChange={(e) => { onChange(e, 'firstName') }} />
            <TitleInput title='Last Name' value={formData.lastName} onChange={(e) => { onChange(e, 'lastName') }} />
            <TitleInput title='Email' value={formData.email} onChange={(e) => { onChange(e, 'email') }} />
            <TitleInput title='Phone' value={formData.phone} onChange={(e) => { onChange(e, 'phone') }} />
        </div>
    )
}

function AddItemButton({ onClick }) {
    return (
        <button className='AddItemButton' onClick={onClick}>+</button>
    )
}

function Skills({ formData, setFormData }) {
    function onAddSkill(e) {
        const newFormData = { ...formData };
        newFormData.skills.push({ value: "", id: uuid() })
        setFormData(newFormData);
    }
    return (
        <div className='Skills'>
            {formData.skills.map((item, index) => {
                function onChange(e) {
                    const newFormData = { ...formData };
                    newFormData.skills[index] = { value: e.target.value, id: item.id };
                    setFormData(newFormData)
                }
                return (
                    <input type='text' value={item.value} onChange={onChange} key={item.id}></input>
                )
            })}
            <AddItemButton onClick={onAddSkill} />
        </div>
    )
}

function Education({ formData, setFormData }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    function onChange(e, index, formKey) {
        const newFormData = { ...formData };
        newFormData.education[index][formKey] = e.target.value;
        setFormData(newFormData);
    }
    function onAddEducation() {
        const newEducation = {
            school: "",
            degree: "",
            startYear: "",
            endYear: "",
            id: uuid(),
        }
        const newFormData = { ...formData };
        newFormData.education.push(newEducation);
        setFormData(newFormData);
        setCurrentIndex(newFormData.education.length - 1);
    }
    return (
        <div className='Education'>
            {formData.education.map((item, index) => {
                if (index === currentIndex)
                    return (
                        <div key={item.id} className='Education-selected'>
                            <TitleInput title='Degree' value={item.degree} onChange={(e) => { onChange(e, index, 'degree') }} />
                            <TitleInput title='School' value={item.school} onChange={(e) => { onChange(e, index, 'school') }} />
                            <TitleInput title='Year Started' value={item.startYear} onChange={(e) => { onChange(e, index, 'startYear') }} />
                            <TitleInput title='Year Completed' value={item.endYear} onChange={(e) => { onChange(e, index, 'endYear') }} />
                        </div>
                    )
                else return (
                    <div key={item.id} className='Education-not-selected' onClick={(e) => { setCurrentIndex(index) }}>
                        {item.degree}
                    </div>
                )
            })}
            <AddItemButton onClick={onAddEducation} />
        </div>
    )
}




