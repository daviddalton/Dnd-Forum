export class skill {
    name!: string;
    level: string[] = []
    index!: number;
    desc: string[] = []
    subPoint: string[] = []

//     buildLevel() {
//         const charToSplitBy = ['1st','2nd','3rd','4th','5th','6th','7th','8th','9th','10th','11th','12th','13th','14th','15th','16th','17th','18th','19th','20th']
//         charToSplitBy.forEach((n: string) => {
//             var level: string[] = [];
//             this.desc.forEach((s: string) => {
//                 let tempArr = s.split(' ')
//                 tempArr.forEach((char: string) => {
//                     if (char.includes(n)) {
//                         this.level.push(n)
//                     }
//                 } 
//             )
//         })
//     })
// }
}