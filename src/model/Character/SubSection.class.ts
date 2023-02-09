import { Table } from "./Table.class";

export class SubSection {
    title?: string;
    subSections: SubSection[] = []
    desc: string[] = []
    table!: Table;
}