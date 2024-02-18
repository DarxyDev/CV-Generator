import '../styles/Preview.css'
export default function Preview({ formData }) {
    return (
        <div className='right-half main-section Preview'>
            <Page formData={formData}></Page>
        </div>
    )
}

function Page({ formData }) {
    const childProps = { formData }
    return (
        <div className='Page-container'>
            <div className='Page' style={{aspectRatio:1/1}}>
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
            <div>
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
        <ul>
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
        <ul>
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