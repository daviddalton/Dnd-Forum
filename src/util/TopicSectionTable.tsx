import { Heading } from "../model/Character/Heading.class";
import { Table } from "../model/Character/Table.class";
import '../components/styles/generalTable.css'

function TopicSectionTable(props: any) {
    return (
        <>
            {props.tempSection.tables.map((table: Table) => (
                <div className="generalTable-indv-table-panel"
                    style={{
                        flexDirection: 'column',
                        alignItems: 'center',
                        opacity: '.6',
                        fontFamily: 'buenard'
                    }}>
                        <div className="generalTable-indv-table-title"
                            style={{
                                width: '100%'
                            }}>
                                {table.title}
                        </div>
                    <div className="generalTable-indv-table-container"
                        style={{
                        }}>

                        <div className="generalTable-table-headings-container">
                            {table.headings.map((heading: Heading) => (
                                <div className="generalTable-table-heading-data">
                                    <div className="generalTable-table-indv-heading">
                                            {heading.title}
                                    </div>
                                    {heading.data.map((dat: string) => (
                                        <div className="generalTable-indv-data">
                                                {dat}
                                        </div>
                                    ))}
                                 </div>
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </>
    )
}

export default TopicSectionTable