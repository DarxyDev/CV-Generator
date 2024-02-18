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
            <PageSettings {...{pageSettings, setPageSettings}}/>
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
    function setScale(value){
        setPageSettings({...pageSettings,scale:value});
    }
    return (
        <div>
            <Slider value={pageSettings.scale} setValue={setScale}/>
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
                <h1>{formData.firstName + ' ' + formData.lastName}</h1>
                <br />
                <ContactInfo {...childProps} />
                <br />
                <h1>Skills</h1>
                <br />
                <Skills {...childProps} />
                <br />
                <h1>Education</h1>
                <br />
                <Education {...childProps} />
                <br />
                <h1>Employment</h1>
                <br />
                <Employment {...childProps} />

            </div>
        </div>
    )
}
function ContactInfo({ formData }) {
    function ContactSection({ title, value }) {
        if (value === '') return (<></>);
        return (
            <div className='ContactInfo'>
                <h2>{title}</h2>
                <p>{value}</p>
            </div>
        )
    }
    return (
        <div>
            <ContactSection title='Phone' value={formData.phone} />
            <br />
            <ContactSection title='Email' value={formData.email} />
        </div>
    )
}
function Skills({ formData }) {
    return (
        <ul className='Skills'>
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
        <ul className='Education'>
            {formData.education.map(item => {
                return (
                    <li key={item.id}>
                        <h2>{item.degree}</h2>
                        <h3>{item.school}</h3>
                        <p>{item.startYear ? item.startYear.toString() + ' - ' : ''}{item.endYear}</p>
                        <br />
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
                        <br />
                    </li>
                )
            })}
        </ul>
    )
}