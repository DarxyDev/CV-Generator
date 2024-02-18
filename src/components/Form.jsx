import '../styles/Form.css';
import { useState } from 'react';
import { v4 as uuid } from 'uuid';


export default function Form({ formData, setFormData }) {
    const childProps = { setFormData, formData };
    return (
        <div className='left-half main-section Form'>
            <Section title='Contact Info'>
                <ContactInfo {...childProps} />
            </Section>
            <Section title='Skills'>
                <Skills {...childProps} />
            </Section>
            <Section title='Education'>
                <Education {...childProps} />
            </Section>
            <Section title='Previous Employment'>
                <WorkHistory {...childProps} />
            </Section>
        </div>
    )
}
//////
function Section({ title, children }) {
    return (
        <div className='Section'>
            <h1>{title}</h1>
            <div className='Section-content'>
                {children}
            </div>
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
        <div className='ContactInfo grid-2-col'>
            <TitleInput title='First Name' value={formData.firstName} onChange={(e) => { onChange(e, 'firstName') }} />
            <TitleInput title='Last Name' value={formData.lastName} onChange={(e) => { onChange(e, 'lastName') }} />
            <TitleInput title='Email' value={formData.email} onChange={(e) => { onChange(e, 'email') }} />
            <TitleInput title='Phone' value={formData.phone} onChange={(e) => { onChange(e, 'phone') }} />
        </div>
    )
}

function Skills({ formData, setFormData }) {
    function onAddSkill(e) {
        const newFormData = { ...formData };
        newFormData.skills.push({ value: "", id: uuid() })
        setFormData(newFormData);
    }
    return (
        <div className='Skills grid-2-col'>
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
    function onChange(e, index, formKey) {
        const newFormData = { ...formData };
        newFormData.education[index][formKey] = e.target.value;
        setFormData(newFormData);
    }
    function onAddEducation() {
        const newEducation = createBlankCopy(formData.education[0]);
        const newFormData = { ...formData };
        newFormData.education.push(newEducation);
        setFormData(newFormData);
    }
    return (
        <div className='Education'>
            <SelectableCategory onAddItem={onAddEducation}>
                {formData.education.map((item, index) => {
                    return (
                        <div key={item.id} className='grid-2-col'>
                            <TitleInput title='Degree' value={item.degree} onChange={(e) => { onChange(e, index, 'degree') }} />
                            <TitleInput title='School' value={item.school} onChange={(e) => { onChange(e, index, 'school') }} />
                            <TitleInput title='Year Started' value={item.startYear} onChange={(e) => { onChange(e, index, 'startYear') }} />
                            <TitleInput title='Year Completed' value={item.endYear} onChange={(e) => { onChange(e, index, 'endYear') }} />
                        </div>
                    )
                })}

            </SelectableCategory>
        </div>
    )
}
function WorkHistory({ formData, setFormData }) {
    function onChange(e, index, formKey) {
        const newFormData = { ...formData };
        newFormData.workHistory[index][formKey] = e.target.value;
        setFormData(newFormData);
    }
    function onAddWorkHistory(e) {
        const newWorkObj = createBlankCopy(formData.workHistory[0]);
        const newFormData = { ...formData };
        newFormData.workHistory.push(newWorkObj)
        setFormData(newFormData);
    }
    return (
        <div className='WorkHistory'>
            <SelectableCategory onAddItem={onAddWorkHistory}>
                {formData.workHistory.map((item, index) => {
                    return (
                        <div key={item.id} className='grid-2-col'>
                            <TitleInput title='Position' value={item.position} onChange={(e) => { onChange(e, index, 'position') }} />
                            <TitleInput title='Employer' value={item.employer} onChange={(e) => { onChange(e, index, 'employer') }} />
                            <TitleInput title='Phone' value={item.phone} onChange={(e) => { onChange(e, index, 'phone') }} />
                            <TitleInput title='Address' value={item.address} onChange={(e) => { onChange(e, index, 'address') }} />
                            <TitleInput title='City' value={item.city} onChange={(e) => { onChange(e, index, 'city') }} />
                            <TitleInput title='State' value={item.state} onChange={(e) => { onChange(e, index, 'state') }} />
                            <TitleInput title='Year Started' value={item.startYear} onChange={(e) => { onChange(e, index, 'startYear') }} />
                            <TitleInput title='Year Left' value={item.endYear} onChange={(e) => { onChange(e, index, 'endYear') }} />
                            {/*<TitleInput title='Short Description' className='grid-span-2' inputClass='description-input' value={item.description} onChange={(e) => { onChange(e, index, 'description') }} /> */}
                            <TitleInput title='Short Description' className='grid-span-2'>
                                <textarea className='description-input' rows='3' value={item.description} onChange={(e) => { onChange(e, index, 'description') }}></textarea>
                            </TitleInput>
                        </div>
                    )
                })}
            </SelectableCategory>
        </div>
    )
}

//sub Components
function TitleInput({ title, value, type, onChange, inputClass = '', className = '', children }) {
    if (!type) type = 'text';
    if (!children)
        return (
            <div className={'TitleInput ' + className}>
                <h1>{title}</h1>
                <input className={inputClass} type={type} value={value} onChange={onChange}></input>
            </div>
        )
    return (
        <div className={'TitleInput ' + className}>
            <h1>{title}</h1>
            {children}
        </div>
    )
}
function AddItemButton({ onClick }) {
    return (
        <div className='flex-center'>
            <button className='AddItemButton' onClick={onClick}>+</button>
        </div>
    )
}
function SelectableCategory({ children, onAddItem, categoryChildIndex = 0, valueKey = 'value' }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    return (
        <div className='SC'>
            {children.map((child, index) => {
                if (index === currentIndex) {
                    return (
                        <div key={child.key + 'selectedCategory'} className='SC_selected'>
                            {child}
                        </div>
                    )
                }
                return (
                    <div key={child.key + "subCategory"} className='SC_not-selected' onClick={(e) => { setCurrentIndex(index) }}>
                        {child.props.children[categoryChildIndex].props[valueKey]}
                    </div>
                )
            })}
            <AddItemButton onClick={(e) => {
                setCurrentIndex(children.length);
                onAddItem(e);
            }} />
        </div>
    )
}

//generic functions
function createBlankCopy(obj) {
    const newObj = {};
    Object.keys(obj).forEach(key => newObj[key] = '');
    newObj.id = uuid();
    return newObj;
}



