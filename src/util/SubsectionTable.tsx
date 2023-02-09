import { Heading } from "../model/Character/Heading.class";




function SubsectionTable(props: any) {
    console.log(props)
    return (
        <>
            <div
                style={{
                    width: 'fit-content'
                }}>
                <div className="s-of-s-table-title">
                        {props.subSection.table.title}
                </div>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center'
                    }}>
                        {props.subSection.table.headings.map((heading: Heading) => (
                        <div className="s-of-s-column">
                            <div className="s-of-s-table-heading-title"
                                style={{
                                    
                                }}>
                                    {heading.title}
                            </div>
                            {heading.data.map((dat: string) => (
                                <div className="s-of-s-table-heading-data"
                                    style={{
                                    }}>
                                        {dat}
                                </div>
                            ))}
                        </div>
                        ))}
                </div>
            </div>
        </>
    )

}

export default SubsectionTable