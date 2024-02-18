import '../styles/Preview.css'
import { useState } from 'react';
import fontCheck from '../FontCheck';


const PAGE_RATIO = 1 / 1.414;
let resizeAdded = false;
export default function Preview({ formData }) {
    const [pageSettings, setPageSettings] = useState({
        scale: .9,
        color1: '#7a84f8',
        color2: '#bac6f5',
        color3: '#f2f4ff',
        font: 'Helvetica',
        fontSize: 18,
    })
    if (!(resizeAdded = false) && onLoadResize(pageSettings))
        window.onresize = (e) => { onWindowResize(pageSettings) };
    return (
        <div className='right-half main-section Preview' style={{ fontFamily: pageSettings.fontFamily }}>
            <PageSettings {...{ pageSettings, setPageSettings, color1: 1, color2: 1, color3: 1 }} />
            <Page {...{ formData, pageSettings }}></Page>
            <PageSettings {...{ pageSettings, setPageSettings, scale: 1, fontSettings: 1 }} />
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
    page.style.fontSize = (newHeight * settings.fontSize / 1000) + 'px';
};

function onLoadResize(settings) {
    const container = document.querySelector('.Page');
    if (!container)
        setTimeout(() => onLoadResize(settings), 10)
    else onWindowResize(settings);
    return true;
}

function PageSettings({ pageSettings, setPageSettings, color1, color2, color3, scale, fontSettings }) {
    function setScale(e) {
        const value = ((e.target.value) / 100);
        setPageSettings({ ...pageSettings, scale: value });
    }
    function setColor1(e) {
        const value = e.target.value;
        setPageSettings({ ...pageSettings, color1: value })
    }
    function setColor2(e) {
        const value = e.target.value;
        setPageSettings({ ...pageSettings, color2: value })
    }
    function setColor3(e) {
        const value = e.target.value;
        setPageSettings({ ...pageSettings, color3: value })
    }
    return (
        <div className='PageSettings'>
            {scale && <Slider value={pageSettings.scale} setValue={setScale} />}
            {color1 && <ColorSelect value={pageSettings.color1} setValue={setColor1} />}
            {color2 && <ColorSelect value={pageSettings.color2} setValue={setColor2} />}
            {color3 && <ColorSelect value={pageSettings.color3} setValue={setColor3} />}
            {fontSettings && <FontSettings {...{ pageSettings, setPageSettings }} />}
        </div>
    )
}
function FontSettings({ pageSettings, setPageSettings }) {
    function setFontSize(e) {
        const value = e.target.value
        setPageSettings({ ...pageSettings, fontSize: value });
    }

    const fontSizes = [];
    for (let i = 10; i < 65; i++) {
        fontSizes.push(<option value={i} key={i + "dslkfsdf94maslkdmfaslkdmc9smv3c"}>{i}</option>)
    }
    function setFontFamily(e) {
        const value = e.target.value;
        setPageSettings({ ...pageSettings, fontFamily: value });
    }
    const fontFamilies = [];
    fontCheck.forEach((fontFamily) => {
        fontFamilies.push(<option value={fontFamily} key={fontFamily + 'akslfjlaskfasldkfja'}>{fontFamily}</option>)
    })
    return (
            <div className='FontSettings'>
                <select value={pageSettings.fontSize} onChange={setFontSize}>
                    {fontSizes.map((item) => item)}
                </select>
                <select value={pageSettings.fontFamily} onChange={setFontFamily}>
                    {fontFamilies.map((item) => item)}
                </select>
            </div>

    )
}

function Slider({ value, setValue }) {
    return (
        <input type='range' min={20} max={98} value={value * 100} onChange={setValue}></input>
    )
}
function ColorSelect({ value, setValue }) {
    return (
        <div>
            <input type='color' className='ColorSelectInput' onChange={setValue} value={value}></input>
        </div>
    )
}
function Page({ formData, pageSettings }) {
    const childProps = { formData }
    return (
        <div className='Page-container'>
            <div className='Page'>
                <div className='section' style={{ backgroundColor: pageSettings.color1 }}></div>
                <div className='section' style={{ backgroundColor: pageSettings.color1 }}>
                    <h1 className='name'>{formData.firstName + ' ' + formData.lastName}</h1>
                </div>

                <div className='flex-spread-col section' style={{ backgroundColor: pageSettings.color2 }}>
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
                <div className='flex-spread-col section' style={{ backgroundColor: pageSettings.color3 }}>
                    <div className='sub-section'>
                        <h3 className='section-title'>About me</h3>
                        <Summary {...childProps} />
                    </div>
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