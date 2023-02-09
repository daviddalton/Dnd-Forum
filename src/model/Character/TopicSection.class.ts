import { SubSection } from "./SubSection.class";
import { Table } from "./Table.class";
import { TopicAttribute } from "./TopicAttributes";

export class TopicSection {
    desc: string[] = []
    subSections: SubSection[] = []
    topicAttributes: TopicAttribute[] = []
    bottomTitle!: string;
    bottomDesc: string[] = []
    tables: Table[] = []
    proficiencies: SubSection[] = []

}