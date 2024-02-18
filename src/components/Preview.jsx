import '../styles/Preview.css'
import { useState } from 'react';


const PAGE_RATIO = 1 / 1.414;
let resizeAdded = false;
export default function Preview({ formData }) {
    const [pageSettings, setPageSettings] = useState({
        scale: .95,
    })
    if (!(resizeAdded = false) && onLoadResize(pageSettings))
        window.onresize = (e) => { onWindowResize(pageSettings) };
    return (
        <div className='right-half main-section Preview'>
            <PageSettings {...{ pageSettings, setPageSettings }} />
            <Page formData={formData}></Page>
        </div>
    )
}
const onWindowResize = (settings) => {
    const page = document.querySelector('.Page');
    const container = document.querySelector('.Page-container');
    const size = container.offsetHeight >= container.offsetWidth ?
        container.offsetWidth :
        container.offsetHeight;
    const newHeight = size * settings.scale;
    const newWidth = size * settings.scale * PAGE_RATIO;

    page.style.height = newHeight + 'px';
    page.style.width = newWidth + 'px';
    page.style.fontSize = (settings.scale * 2) + 'vh';
};

function onLoadResize(settings) {
    const container = document.querySelector('.Page');
    if (!container)
        setTimeout(() => onLoadResize(settings), 10)
    else onWindowResize(settings);
    return true;
}

function PageSettings({ pageSettings, setPageSettings }) {
    function setScale(value) {
        setPageSettings({ ...pageSettings, scale: value });
    }
    return (
        <div>
            <Slider value={pageSettings.scale} setValue={setScale} />
        </div>
    )
}
function Slider({ value, setValue }) {
    function onChange(e) {
        setValue((e.target.value) / 100)
    }
    return (
        <input type='range' min={20} max={98} value={value * 100} onChange={onChange}></input>
    )
}
function Page({ formData }) {
    const childProps = { formData }
    return (
        <div className='Page-container'>
            <div className='Page'>
{/* 
                <div className='section'></div> */}
                <div className='section grid-span-2-col'>
                    <h1 className='name'>{formData.firstName + ' ' + formData.lastName}</h1>
                </div>

                <div className='flex-spread-col section'>
                    <ContactInfo {...childProps} />
                    <div className='sub-section'>
                        <h3 className='section-title align-right'>Education</h3>
                        <Education {...childProps} />
                    </div>
                    <div className='sub-section'>
                        <h3 className='section-title align-right'>Skills</h3>
                        <Skills {...childProps} />
                    </div>
                </div>
                <div className='flex-spread-col section'>
                    <Summary {...childProps} />
                    <div className='sub-section'>
                        <h3 className='section-title'>Employment</h3>
                        <Employment {...childProps} />
                    </div>
                </div>
            </div>
        </div>
    )
}
function Summary({ formData }) {
    return (
        <p className='Summary'>
            {formData.summary};
        </p>
    )
}
function ContactInfo({ formData }) {
    function ContactSection({ title, value }) {
        if (value === '') return (<></>);
        return (
            <div className='sub-section align-right'>
                <h4>{title}</h4>
                <p>{value}</p>
            </div>
        )
    }
    return (
        <div className='ContactInfo'>
            <ContactSection title='Phone' value={formData.phone} />
            <ContactSection title='Email' value={formData.email} />
            <ContactSection title='Address' value={formData.address} />
            <ContactSection title='City' value={formData.city} />
            <ContactSection title='State' value={formData.state} />
        </div>
    )
}
function Skills({ formData }) {
    return (
        <ul className='Skills align-right'>
            {formData.skills.map(item => {
                return (
                    <li key={item.id}>{item.value}</li>
                )
            })}
        </ul>
    )
}
function Education({ formData }) {
    return (
        <ul className='Education align-right'>
            {formData.education.map(item => {
                return (
                    <li key={item.id} className='Education-sub-section'>
                        <h3>{item.degree}</h3>
                        <h5>{item.school}</h5>
                        <p>{item.startYear ? item.startYear.toString() + ' - ' : ''}{item.endYear}</p>
                    </li>
                )
            })}
        </ul>
    )
}
function Employment({ formData }) {
    return (
        <ul className='Employment'>
            {formData.workHistory.map(item => {
                return (
                    <li key={item.id}>
                        <h2>{item.position}</h2>
                        <h3>{item.employer}</h3>
                        <h4>{item.startYear} - {item.endYear}</h4>
                        <p>{item.address}, {item.city}, {item.state}</p>
                        <p>p: {item.phone}</p>
                        <p>{item.description}</p>
                    </li>
                )
            })}
        </ul>
    )
}